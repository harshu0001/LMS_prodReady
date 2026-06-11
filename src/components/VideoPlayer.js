"use client";

import React, { useState, useEffect, useRef } from "react";

export default function VideoPlayer({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // Default 5 mins in seconds
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const playTimerRef = useRef(null);

  // Helper to check if URL is a YouTube link
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(videoUrl);

  // Sync controls with direct video element
  useEffect(() => {
    if (!youtubeId && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, youtubeId]);

  // Handle YouTube simulation timer for progress
  useEffect(() => {
    if (youtubeId) {
      if (isPlaying) {
        playTimerRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= duration) {
              setIsPlaying(false);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        clearInterval(playTimerRef.current);
      }
    }
    return () => clearInterval(playTimerRef.current);
  }, [isPlaying, youtubeId, duration]);

  // Send commands to YouTube Iframe
  const sendYoutubeCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  };

  const togglePlay = () => {
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);

    if (youtubeId) {
      if (nextPlay) {
        sendYoutubeCommand("playVideo");
      } else {
        sendYoutubeCommand("pauseVideo");
      }
    }
  };

  const handleSeekChange = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);

    if (youtubeId) {
      sendYoutubeCommand("seekTo", [time, true]);
    } else if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);

    if (!youtubeId && videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
    } else if (youtubeId) {
      sendYoutubeCommand("setVolume", [vol * 100]);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!youtubeId && videoRef.current) {
      videoRef.current.muted = nextMuted;
    } else if (youtubeId) {
      sendYoutubeCommand(nextMuted ? "mute" : "unMute");
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);

    if (!youtubeId && videoRef.current) {
      videoRef.current.playbackRate = speed;
    } else if (youtubeId) {
      sendYoutubeCommand("setPlaybackRate", [speed]);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.round(videoRef.current.duration));
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.round(videoRef.current.currentTime));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl group border border-outline-variant/20"
    >
      {/* Video Content Layer */}
      {youtubeId ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&showinfo=0&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
          className="w-full h-full border-none pointer-events-none origin-center"
          style={{ transform: "scale(1.08)" }}
          allow="autoplay; encrypted-media"
          title="Course YouTube video player"
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        ></video>
      )}

      {/* Play Overlay Screen (Only visible when paused) */}
      <div 
        onClick={togglePlay}
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${isPlaying ? "bg-black/0" : "bg-black/60 backdrop-blur-md"}`}
      >
        {!isPlaying && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 md:w-20 md:h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[36px] md:text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
        )}
      </div>

      {/* Custom Controls Bar Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-sm md:p-md bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <input 
          type="range" 
          min="0" 
          max={duration} 
          value={currentTime} 
          onChange={handleSeekChange}
          className="w-full h-1 bg-white/20 rounded-full cursor-pointer accent-primary appearance-none outline-none"
        />
        <div className="flex items-center justify-between text-white text-xs mt-1">
          <div className="flex items-center gap-md">
            <button onClick={togglePlay} className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-xl">
              {isPlaying ? "pause" : "play_arrow"}
            </button>
            <button 
              onClick={toggleMute} 
              className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-xl"
            >
              {isMuted ? "volume_off" : "volume_up"}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/30 rounded-full cursor-pointer accent-primary appearance-none outline-none"
            />
            <span className="font-semibold">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-md">
            {/* Speed Selector */}
            <div className="relative group/speed cursor-pointer py-1 font-semibold hover:text-primary transition-colors">
              <span>{playbackSpeed}x</span>
              <div className="absolute bottom-full mb-1 right-0 bg-black/95 border border-outline-variant/30 rounded-lg p-1 hidden group-hover/speed:flex flex-col gap-0.5 z-30">
                {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={`px-3 py-1 hover:bg-primary hover:text-white rounded text-[10px] text-left transition-all ${playbackSpeed === s ? "bg-primary/20 text-primary" : "text-white"}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={toggleFullscreen} 
              className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-xl"
            >
              {isFullscreen ? "fullscreen_exit" : "fullscreen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
