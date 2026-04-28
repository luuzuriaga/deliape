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
    <div className="group relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
        {instagramEmbedUrl ? (
          <iframe
            src={`${instagramEmbedUrl.split('?')[0].replace(/\/$/, '')}/embed?hidecaption=true`}
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
          <div className="absolute inset-0 flex items-center justify-center text-black/30">
            Sin imagen
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-medium tracking-wider text-black/80 rounded-full shadow-sm uppercase">
            {category}
          </span>
        </div>
      </div>
    </div>
  )
}
