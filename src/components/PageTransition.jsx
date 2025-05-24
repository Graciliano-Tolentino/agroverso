/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/PageTransition.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente utilitário para transições animadas entre páginas.
     Usa Framer Motion para aplicar animações suaves em cada rota.
     Melhora a UX sem alterar a lógica da aplicação.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

/*
  ============================================
  🔚 Fim do arquivo src/components/PageTransition.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
