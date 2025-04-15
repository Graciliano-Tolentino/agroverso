export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Seção principal com missão do Agroverso"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/images/hero_am_sul_invertida.png')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1
          role="heading"
          aria-level="1"
          className="text-white text-4xl md:text-5xl font-montserrat font-bold leading-tight drop-shadow-md"
        >
          Revolucionando o Agro Sustentável
        </h1>

        <p
          className="mt-4 text-gray-100 text-lg md:text-xl font-roboto leading-relaxed drop-shadow-sm"
          aria-label="Tecnologia avançada conectada à sabedoria ancestral"
        >
          Tecnologia avançada conectada à sabedoria ancestral.
        </p>

        <a
          href="#marketplace"
          aria-label="Conheça nossas soluções disponíveis no Agroverso"
          className="group mt-8 inline-block bg-greenRegenerative text-white font-semibold font-opensans px-8 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-greenRegenerative focus:ring-offset-2"
        >
          Conheça nossas soluções
          {/* <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span> */}
        </a>
      </div>
    </section>
  );
}
