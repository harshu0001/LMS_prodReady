import "./globals.css";

export const metadata = {
  title: "Lumina Learning | Empower Your Future",
  description: "Lumina is the all-in-one learning management system designed to make online education more interactive, collaborative, and rewarding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        {/* We can also define Material Symbols here or load them in globals.css */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })()
        ` }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
