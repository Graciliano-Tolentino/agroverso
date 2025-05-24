// =====================================================================================
// 📄 Hero.jsx | Agroverso – Cabeçalho Institucional com Identidade e Acessibilidade
// =====================================================================================
// 🎯 Finalidade:
//     • Apresentar o Agroverso com impacto visual, acessibilidade real e internacionalização pronta.
//     • Estruturado para SEO, dark mode, animação simbólica e expansão modular por tokens.
// =====================================================================================

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeroButton from '@/components/ui/HeroButton';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExplore = () => {
    try {
      navigate?.('/explorar') ?? window.location.assign('/explorar');
    } catch {
      window.location.assign('/explorar');
    }
  };

  return (
    <header
      role="banner"
      aria-label={t('hero.secao', 'Seção inicial Agroverso')}
      data-testid="hero"
      className="relative bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900 dark:to-green-800 py-24 px-6 text-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <h1
          data-testid="hero:title"
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight card-heading"
        >
          {t('hero.titulo', 'Bem-vindo ao')}{" "}
          <span
            className="text-green-600 dark:text-green-300 underline decoration-wavy decoration-2"
            data-testid="hero:identidade"
          >
            {t('hero.identidade', 'Agroverso')}
          </span>
        </h1>

        <p
          data-testid="hero:subtitulo"
          className="mt-4 text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium card-body"
        >
          {t('hero.descricao.inicio', '')}
          <span className="text-tecnologia">{t('hero.descricao.tecnologia', 'tecnologia')}</span>,{" "}
          <span className="text-sabedoria">{t('hero.descricao.sabedoria', 'sabedoria')}</span>{" "}
          e{" "}
          <span className="text-colaboracao">{t('hero.descricao.colaboracao', 'colaboração')}</span>.
        </p>

        <div className="mt-8">
          <HeroButton
            onClick={handleExplore}
            label={t('hero.botao', 'Explorar agora')}
            dataTestId="hero:botao"
          />
        </div>
      </div>

      {/* 🌱 Elemento decorativo com simbolismo de crescimento sustentável */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 animate-growth"
        aria-hidden="true"
      />
    </header>
  );
};

export default memo(Hero);
