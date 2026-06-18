import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request) {
  // Auth check — only instructors/admins can upload
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await verifyToken(token) : null;
  if (!user || (user.role !== "INSTRUCTOR" && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fileName } = await request.json();
    if (!fileName) {
      return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }

    const libraryId = process.env.BUNNY_LIBRARY_ID;
    const apiKey = process.env.BUNNY_API_KEY;

    // 1. Create a new Video object in Bunny Stream
    const createRes = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
      method: "POST",
      headers: {
        "AccessKey": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ title: fileName })
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error("Bunny API Error:", errText);
      throw new Error(`Failed to create video object in Bunny.net: ${createRes.status}`);
    }

    const videoData = await createRes.json();
    const videoId = videoData.guid;

    // 2. Generate TUS upload signature to allow the frontend to upload directly
    // Signature format: SHA256(library_id + api_key + expiration_time + video_id)
    const expirationTime = Math.floor(Date.now() / 1000) + 7200; // 2 hours from now
    
    const signatureString = `${libraryId}${apiKey}${expirationTime}${videoId}`;
    const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

    // Return everything the frontend needs for the TUS upload, plus the final iframe URL
    return NextResponse.json({
      libraryId,
      videoId,
      signature,
      expire: expirationTime,
      publicUrl: `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${videoId}/playlist.m3u8` // We'll save the CDN ID for the player
    });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
