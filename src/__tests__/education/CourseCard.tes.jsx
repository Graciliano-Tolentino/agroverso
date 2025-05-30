// 📁 src/__tests__/education/CourseCard.test.jsx

import { render, screen, fireEvent } from '@testing-library/react'
import CourseCard from '@/components/education/CourseCard'

describe('CourseCard', () => {
  const mockCurso = {
    id: '123',
    titulo: 'Curso Agroverso',
    descricao: 'Descrição breve',
    duracaoHoras: 4,
  }

  it('exibe corretamente título e descrição', () => {
    render(<CourseCard curso={mockCurso} onClick={() => {}} />)
    expect(screen.getByText('Curso Agroverso')).toBeInTheDocument()
    expect(screen.getByText(/Descrição breve/)).toBeInTheDocument()
  })

  it('dispara função onClick ao clicar', () => {
    const mockFn = vi.fn()
    render(<CourseCard curso={mockCurso} onClick={mockFn} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockFn).toHaveBeenCalled()
  })
})
