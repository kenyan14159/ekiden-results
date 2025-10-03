import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchBox } from '../SearchBox'

describe('SearchBox', () => {
  it('正しくレンダリングされる', () => {
    const onSearch = vi.fn()
    render(<SearchBox placeholder="テスト" onSearch={onSearch} />)
    
    const input = screen.getByPlaceholderText('テスト')
    expect(input).toBeInTheDocument()
  })

  it('入力値が変更されるとonSearchが呼ばれる', async () => {
    const onSearch = vi.fn()
    render(<SearchBox onSearch={onSearch} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '青山学院' } })
    
    // デバウンス(300ms)を待つ
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('青山学院')
    }, { timeout: 500 })
  })

  it('クリアボタンが表示され、クリックすると入力がクリアされる', async () => {
    const onSearch = vi.fn()
    render(<SearchBox onSearch={onSearch} />)
    
    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'テスト' } })
    
    // クリアボタンが表示されるのを待つ
    const clearButton = await screen.findByLabelText('クリア')
    expect(clearButton).toBeInTheDocument()
    
    fireEvent.click(clearButton)
    expect(input.value).toBe('')
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenLastCalledWith('')
    })
  })

  it('フォーカス時にヒントが表示される', () => {
    const onSearch = vi.fn()
    render(<SearchBox onSearch={onSearch} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    
    expect(screen.getByText(/検索のヒント/)).toBeInTheDocument()
  })

  it('フィルターが表示される', () => {
    const onSearch = vi.fn()
    const onFilterChange = vi.fn()
    const filters = [
      {
        id: 'year',
        label: '年度',
        options: [
          { value: '2025', label: '2025年' },
          { value: '2024', label: '2024年' },
        ],
      },
    ]
    
    render(
      <SearchBox
        onSearch={onSearch}
        showFilters={true}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    )
    
    expect(screen.getByText('年度')).toBeInTheDocument()
    expect(screen.getByText('2025年')).toBeInTheDocument()
  })
})

