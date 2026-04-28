'use client'

import { useEffect, useState } from 'react'

interface TiktokEmbedProps {
  url?: string
}

export function TiktokEmbed({ url }: TiktokEmbedProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load TikTok embed script
    const scriptId = 'tiktok-embed-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement
    
    if (script) {
      // If script exists, remove it and re-add to force re-parsing
      script.remove()
    }
    
    script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = 'https://www.tiktok.com/embed.js'
    document.body.appendChild(script)
  }, [url])

  if (!mounted || !url) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/5 rounded-xl border border-black/10 min-h-[400px]">
        <p className="text-black/50 text-sm">
          {!url ? 'No hay publicación de TikTok configurada.' : 'Cargando TikTok...'}
        </p>
      </div>
    )
  }

  // Determine if it's a video or a profile
  const isVideo = url.includes('/video/')
  const profileMatch = url.match(/tiktok\.com\/@([^\/\?]+)/)
  const username = profileMatch ? profileMatch[1] : ''
  
  const videoMatch = url.match(/\/video\/(\d+)/)
  const videoId = videoMatch ? videoMatch[1] : ''

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden bg-transparent flex justify-center">
      {isVideo ? (
        <blockquote 
          className="tiktok-embed" 
          cite={url} 
          data-video-id={videoId} 
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section></section>
        </blockquote>
      ) : (
        <blockquote 
          className="tiktok-embed" 
          cite={`https://www.tiktok.com/@${username}`} 
          data-unique-id={username} 
          data-embed-type="creator" 
          style={{ maxWidth: '780px', minWidth: '288px' }}
        >
          <section>
            <a target="_blank" href={`https://www.tiktok.com/@${username}?refer=creator_embed`}>
              @{username}
            </a>
          </section>
        </blockquote>
      )}
    </div>
  )
}

// Declare tiktok on the window object to avoid TS errors
declare global {
  interface Window {
    tiktokEmbed: any
  }
}
