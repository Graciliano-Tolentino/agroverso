// 🌱 Página Home – Estrutura Modular Regenerativa Agroverso
import Navbar from '@components/Navbar'
import Hero from '@components/Hero'
import MarketplaceSection from '@components/MarketplaceSection'
import CoursesSection from '@components/CoursesSection'
import BlogSection from '@components/BlogSection'
import CommunitySection from '@components/CommunitySection'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <>
      {/* Cabeçalho com navegação clara e institucional */}
      <Navbar />

      {/* Hero com identidade regenerativa e emocional */}
      <Hero />

      {/* Conteúdo principal com seções regenerativas */}
      <main role="main" className="bg-white overflow-x-hidden">
        <section id="marketplace" aria-labelledby="marketplace-title">
          <MarketplaceSection />
        </section>

        <section id="courses" aria-labelledby="courses-title">
          <CoursesSection />
        </section>

        <section id="blog" aria-labelledby="blog-title">
          <BlogSection />
        </section>

        <section id="community" aria-labelledby="community-title">
          <CommunitySection />
        </section>
      </main>

      {/* Rodapé ético, filosófico e acessível */}
      <Footer />
    </>
  )
}
