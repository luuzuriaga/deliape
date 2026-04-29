import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ProductCard } from "@/components/ProductCard";
import { TiktokEmbed } from "@/components/TiktokEmbed";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollLink } from "@/components/ScrollLink";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

// GROQ Queries
const webContentQuery = groq`*[_type == "contenidoWeb"][0]`;
const productsQuery = groq`*[_type == "producto"] | order(_createdAt desc) {
  _id,
  titulo,
  precio,
  "imageUrl": imagen.asset->url,
  instagramReelUrl,
  instagramPhotoUrl
}`;
const socialsQuery = groq`*[_type == "redes"][0]`;

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let content = null;
  let products = [];
  let socials = null;

  try {
    const [fetchedContent, fetchedProducts, fetchedSocials] = await Promise.all([
      client.fetch(webContentQuery),
      client.fetch(productsQuery),
      client.fetch(socialsQuery),
    ]);
    content = fetchedContent;
    products = fetchedProducts;
    socials = fetchedSocials;
  } catch (error) {
    console.error("Error fetching from Sanity (possibly missing config):", error);
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 py-4 bg-[#E1D9D1]/90 backdrop-blur-md border-b border-foreground/10 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-32 h-10 md:w-48 md:h-12">
              <Image 
                src="/logo-delia.png" 
                alt="Delia Fajas y Lencería Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          
          <nav className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium tracking-widest uppercase text-foreground">
            <ScrollLink href="#coleccion" className="hover:text-primary transition-colors py-2">Colección</ScrollLink>
            <ScrollLink href="#instagram" className="hover:text-primary transition-colors py-2">Síguenos</ScrollLink>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 md:pt-16 w-full max-w-7xl mx-auto px-4 md:px-8 mb-20 animate-in fade-in duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[75vh] md:min-h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-white/50">
          {/* Left Column (Content) */}
          <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-gradient-to-br from-[#E1D9D1] to-white/40 backdrop-blur-sm relative z-10">
            <div className="space-y-8 md:space-y-10">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-foreground leading-[1.1] tracking-tight">
                {content?.heroTitulo || "Una nueva manera de moldear tu figura"}
              </h1>
              <p className="text-lg md:text-xl font-sans font-medium text-foreground/70 max-w-md leading-relaxed">
                {content?.heroDescripcion || "Innovación peruana en cada fibra. Unimos telas inteligentes con diseño esencial para ofrecerte el máximo confort diario."}
              </p>
              
              <div className="pt-6">
                <a 
                  href={content?.catalogoUrl || "#"} 
                  target={content?.catalogoUrl ? "_blank" : "_self"}
                  rel={content?.catalogoUrl ? "noreferrer" : ""}
                  className="group relative inline-flex items-center justify-center bg-foreground text-white px-8 py-4 overflow-hidden rounded-full font-medium tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 uppercase">Ver Catálogo</span>
                  <div className="absolute inset-0 h-full w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </a>
              </div>
            </div>
            
            {/* Footer of Left Column */}
            <div className="mt-16 lg:mt-auto space-y-6">
              <span className="block text-lg font-medium tracking-wide text-foreground">@deliafajasylenceria</span>
              <div className="flex items-center gap-6 text-foreground">
                {socials?.instagram ? (
                  <a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                ) : (
                  <FaInstagram className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                )}
                {socials?.facebook ? (
                  <a href={socials.facebook} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                ) : (
                  <FaFacebook className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                )}
                <a href={socials?.tiktok || "https://www.tiktok.com/@deliafajasylenceria"} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                  <FaTiktok className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden">
            <Image 
              src="/fajas.jpg" 
              alt="Mujer con sombrero, flores y helado" 
              fill 
              className="object-cover object-center lg:object-[center_20%] hover:scale-105 transition-transform duration-1000"
              priority
            />
            {/* Subtle gradient overlay to blend image */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-foreground/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      {content?.mensajeBienvenida && (
        <section className="py-24 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-light italic text-foreground/90 leading-relaxed">
              "{content.mensajeBienvenida}"
            </h2>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section id="coleccion" className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Nuestra Selección</span>
          <h2 className="text-4xl font-serif font-light">Colección Exclusiva</h2>
        </div>
        
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product: any) => (
              <ProductCard 
                key={product._id}
                title={product.titulo}
                price={product.precio}
                imageUrl={product.imageUrl}
                reelUrl={product.instagramReelUrl}
                photoUrl={product.instagramPhotoUrl}
                category={product.categoria}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/50 border border-foreground/10 rounded-2xl">
            <p>Aún no hay productos disponibles en la colección.</p>
          </div>
        )}
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="py-20 px-4 bg-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Síguenos</span>
            <h2 className="text-4xl font-serif font-light mb-6">@deliafajasylenceria</h2>
            <div className="flex justify-center gap-6">
              {socials?.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all">
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}
              {socials?.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all">
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}
              <a href={socials?.tiktok || "https://www.tiktok.com/@deliafajasylenceria"} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all">
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <TiktokEmbed url={content?.tiktokEmbedUrl} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-foreground/10">
        <p className="text-sm tracking-wider text-foreground/60">
          © {new Date().getFullYear()} Delia Fajas y Lencería. Todos los derechos reservados.
        </p>
      </footer>

      {/* WhatsApp Button */}
      <FloatingWhatsApp 
        phoneNumber={content?.whatsapp} 
        message="¡Hola! Quisiera más información sobre los productos."
      />
    </div>
  );
}
