// 🏡 Home.jsx – Interface Principal do Agroverso
import React from 'react'

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
      {/* 🔝 Navegação institucional */}
      <Navbar />

      {/* 🌱 Hero visual com missão */}
      <Hero />

      {/* 🧩 Seções regenerativas */}
      <main role="main" className="bg-white overflow-x-hidden scroll-smooth">
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

      {/* 🧭 Rodapé ético e informativo */}
      <Footer />
    </>
  )
}
