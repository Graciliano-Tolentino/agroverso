// ==============================================================================
// 📄 ThemeToggle.test.jsx | Teste Unitário – Botão de Alternância de Tema
// ==============================================================================
// ⚙️ Verifica renderização, clique, localStorage e classe HTML
// ✅ Desenvolvido com sabedoria, força e beleza — Padrão Técnico 12/10 Agroverso
// ==============================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

describe('🔁 ThemeToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('deve renderizar com tema inicial baseado na preferência do sistema', () => {
    // Simula preferência do sistema para modo escuro
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveTextContent(/claro/i);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('deve alternar tema e atualizar localStorage ao clicar', () => {
    render(<ThemeToggle />);
    const botao = screen.getByRole('button');

    fireEvent.click(botao);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('agroverso_tema')).toBe('dark');

    fireEvent.click(botao);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('agroverso_tema')).toBe('light');
  });

  it('deve exibir o rótulo acessível correto', () => {
    render(<ThemeToggle />);
    const botao = screen.getByRole('button');
    expect(botao).toHaveAttribute('aria-label');
    expect(botao.getAttribute('aria-label')).toMatch(/tema/i);
  });
});
