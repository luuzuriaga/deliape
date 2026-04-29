import Image from 'next/image'

interface ProductCardProps {
  title: string
  price: number
  imageUrl?: string
  reelUrl?: string
  photoUrl?: string
  category: string
}

export function ProductCard({ title, price, imageUrl, reelUrl, photoUrl, category }: ProductCardProps) {
  const instagramEmbedUrl = reelUrl || photoUrl;

  return (
    <div className="group flex flex-col bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-foreground/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#E1D9D1]/50 w-full">
        {instagramEmbedUrl ? (
          <iframe
            src={`${instagramEmbedUrl.split('?')[0].replace(/\/$/, '')}/embed`}
            className="w-full h-full border-none absolute inset-0 z-10"
            scrolling="no"
            allow="encrypted-media"
          ></iframe>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/30 font-medium">
            Sin imagen
          </div>
        )}
        
        {category && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wider text-foreground rounded-full shadow-sm uppercase">
              {category}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
