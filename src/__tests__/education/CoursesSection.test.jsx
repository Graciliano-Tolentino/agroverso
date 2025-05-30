// 📁 src/__tests__/education/CoursesSection.test.jsx

import { render, screen, waitFor } from '@testing-library/react'
import CoursesSection from '@/components/education/CoursesSection'
import * as hook from '@/hooks/useCursos'

vi.mock('@/hooks/useCursos', () => ({
  default: vi.fn(),
}))

describe('CoursesSection', () => {
  it('deve exibir título corretamente', () => {
    hook.default.mockReturnValue({ cursos: [], loading: false, erro: null })
    render(<CoursesSection />)
    expect(screen.getByTestId('cursos:titulo')).toHaveTextContent(/Cursos/i)
  })

  it('deve exibir loading quando carregando', () => {
    hook.default.mockReturnValue({ cursos: [], loading: true, erro: null })
    render(<CoursesSection />)
    expect(screen.getByTestId('cursos:carregando')).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro quando falha', () => {
    hook.default.mockReturnValue({ cursos: [], loading: false, erro: 'Falha' })
    render(<CoursesSection />)
    expect(screen.getByRole('alert')).toHaveTextContent('Falha')
  })

  it('deve exibir lista de cursos quando disponíveis', async () => {
    hook.default.mockReturnValue({
      cursos: [
        { id: '1', titulo: 'Curso Teste', descricao: 'Descrição' },
      ],
      loading: false,
      erro: null,
    })

    render(<CoursesSection />)
    await waitFor(() => {
      expect(screen.getByTestId('curso:1')).toBeInTheDocument()
    })
  })
})
