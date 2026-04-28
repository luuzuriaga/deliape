'use client'

import { useEffect, useState } from 'react'

interface InstagramCarouselProps {
  url?: string
}

export function InstagramCarousel({ url }: InstagramCarouselProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load Instagram embed script if needed
    if (!window.instgrm) {
      const script = document.createElement('script')
      script.async = true
      script.src = '//www.instagram.com/embed.js'
      document.body.appendChild(script)
    } else {
      window.instgrm.Embeds.process()
    }
  }, [url])

  if (!mounted || !url) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/5 rounded-xl border border-black/10 min-h-[400px]">
        <p className="text-black/50 text-sm">
          {!url ? 'No hay publicación de Instagram configurada.' : 'Cargando Instagram...'}
        </p>
      </div>
    )
  }

  // Extract the base URL to ensure proper formatting for the embed
  const baseUrl = url.split('?')[0].replace(/\/$/, '')
  const embedUrl = `${baseUrl}/embed`

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-transparent">
      <iframe
        src={embedUrl}
        className="w-full border-none min-h-[600px] shadow-sm rounded-md"
        scrolling="no"
        allow="encrypted-media"
      ></iframe>
    </div>
  )
}

// Declare instgrm on the window object to avoid TS errors
declare global {
  interface Window {
    instgrm: any
  }
}
