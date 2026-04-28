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
      {/* Header / Nav */}
      <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 md:px-8 flex justify-center md:justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <Image 
              src="/logo-delia.png" 
              alt="Delia Fajas y Lencería Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <nav className="hidden md:flex gap-6 text-sm tracking-widest uppercase">
          <ScrollLink href="#coleccion" className="hover:text-primary transition-colors">Colección</ScrollLink>
          <ScrollLink href="#instagram" className="hover:text-primary transition-colors">Síguenos</ScrollLink>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mt-44 md:mt-56 w-full max-w-7xl mx-auto px-4 md:px-8 mb-20 animate-in fade-in duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] border border-foreground">
          {/* Left Column (Content) */}
          <div className="flex flex-col justify-between p-8 md:p-16 bg-[#E1D9D1]">
            <div className="space-y-10 mt-4 lg:mt-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground leading-tight tracking-tight">
                {content?.heroTitulo || "Una nueva manera de moldear tu figura"}
              </h1>
              <p className="text-xl md:text-2xl font-sans font-light text-foreground/80 max-w-md leading-relaxed">
                {content?.heroDescripcion || "Somos una marca peruana dedicada a elevar tu experiencia diaria. Combinamos telas inteligentes de última tecnología con diseños vanguardistas para ofrecerte la comodidad y calidad que mereces."}
              </p>
              
              <div className="pt-4">
                <a 
                  href={content?.catalogoUrl || "#"} 
                  target={content?.catalogoUrl ? "_blank" : "_self"}
                  rel={content?.catalogoUrl ? "noreferrer" : ""}
                  className="inline-block bg-[#4A3326] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#3A281E] transition-colors duration-300"
                >
                  Ver Catálogo
                </a>
              </div>
            </div>
            
            {/* Footer of Left Column */}
            <div className="mt-24 lg:mt-auto space-y-6">
              <span className="block text-xl font-medium tracking-wide text-foreground">@deliafajasylenceria</span>
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
                {socials?.tiktok ? (
                  <a href={socials.tiktok} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                    <FaTiktok className="w-6 h-6" />
                  </a>
                ) : (
                  <FaTiktok className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="relative min-h-[60vh] lg:min-h-full border-t lg:border-t-0 lg:border-l border-foreground overflow-hidden">
            <Image 
              src="/fajas.jpg" 
              alt="Mujer con sombrero, flores y helado" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
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
              {socials?.tiktok && (
                <a href={socials.tiktok} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all">
                  <FaTiktok className="w-6 h-6" />
                </a>
              )}
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
