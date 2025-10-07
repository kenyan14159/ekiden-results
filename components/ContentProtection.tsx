"use client"

import { useEffect } from 'react'

/**
 * コンテンツ保護コンポーネント
 * - 右クリック禁止
 * - テキスト選択禁止
 * - キーボードショートカット（Ctrl+C, Ctrl+S等）禁止
 * - 開発者ツール検知（警告表示）
 * - スクリーンショット抑止（透かし）
 * 
 * 注: 開発中は制限を無効化しています
 */
export function ContentProtection() {
  useEffect(() => {
    // 開発環境では保護機能を無効化
    if (process.env.NODE_ENV === 'development') {
      return
    }
    // 右クリック禁止
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showProtectionNotice('右クリックは無効化されています')
      return false
    }

    // コピー禁止（Ctrl+C, Cmd+C）
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      showProtectionNotice('コンテンツのコピーは禁止されています')
      return false
    }

    // キーボードショートカット禁止
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Cmd+C (コピー)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        showProtectionNotice('コンテンツのコピーは禁止されています')
        return false
      }

      // Ctrl+S, Cmd+S (保存)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        showProtectionNotice('ページの保存は禁止されています')
        return false
      }

      // Ctrl+U, Cmd+U (ソース表示)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        showProtectionNotice('ソースコードの表示は禁止されています')
        return false
      }

      // Ctrl+Shift+I, Cmd+Option+I (開発者ツール)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        showProtectionNotice('開発者ツールの使用は禁止されています')
        return false
      }

      // F12 (開発者ツール)
      if (e.key === 'F12') {
        e.preventDefault()
        showProtectionNotice('開発者ツールの使用は禁止されています')
        return false
      }

      // Ctrl+Shift+C, Cmd+Option+C (要素の検証)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        showProtectionNotice('要素の検証は禁止されています')
        return false
      }

      // PrintScreen (スクリーンショット)
      if (e.key === 'PrintScreen') {
        showProtectionNotice('スクリーンショットは禁止されています')
        // PrintScreenは完全には防げないが、警告を表示
      }
    }

    // ドラッグ禁止
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // テキスト選択禁止（追加の保護）
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // 開発者ツール検知
    let devtoolsOpen = false
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          showProtectionNotice('開発者ツールが検出されました。コンテンツの保護のため、一部機能が制限されます。', true)
        }
      } else {
        devtoolsOpen = false
      }
    }

    // イベントリスナー登録
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('selectstart', handleSelectStart)

    // 開発者ツール検知（定期的にチェック）
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // クリーンアップ
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('selectstart', handleSelectStart)
      clearInterval(devToolsInterval)
    }
  }, [])

  return (
    <>
      {/* 開発環境では保護機能を無効化 */}
      {process.env.NODE_ENV !== 'development' && (
        <>
          {/* CSSでテキスト選択を禁止 */}
          <style jsx global>{`
            body {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-touch-callout: none;
            }

            /* スクリーンショット抑止用の透かし */
            body::before {
              content: "© 駅伝リザルト - ekiden-results.com";
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 4rem;
              color: rgba(0, 0, 0, 0.03);
              pointer-events: none;
              z-index: 9998;
              white-space: nowrap;
              font-weight: bold;
            }

            /* 入力フィールドやボタンは選択可能にする */
            input,
            textarea,
            button,
            a,
            [role="button"],
            [role="link"] {
              -webkit-user-select: text !important;
              -moz-user-select: text !important;
              -ms-user-select: text !important;
              user-select: text !important;
            }
          `}</style>

          {/* 保護通知エリア */}
          <div id="protection-notice" className="hidden"></div>
        </>
      )}
    </>
  )
}

// 保護通知を表示
function showProtectionNotice(message: string, persistent = false) {
  const noticeEl = document.getElementById('protection-notice')
  if (!noticeEl) return

  // 既存の通知を削除
  noticeEl.innerHTML = ''

  // 新しい通知を作成
  const notice = document.createElement('div')
  notice.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[9999] max-w-md animate-slide-in'
  notice.innerHTML = `
    <div class="flex items-start gap-3">
      <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div class="flex-1">
        <p class="font-semibold mb-1">コンテンツ保護</p>
        <p class="text-sm">${message}</p>
      </div>
    </div>
  `

  noticeEl.appendChild(notice)
  noticeEl.classList.remove('hidden')

  // 一定時間後に非表示（persistentでなければ）
  if (!persistent) {
    setTimeout(() => {
      notice.classList.add('animate-slide-out')
      setTimeout(() => {
        noticeEl.classList.add('hidden')
        noticeEl.innerHTML = ''
      }, 300)
    }, 3000)
  }
}

// アニメーション用のCSS
const styles = `
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }

  .animate-slide-out {
    animation: slide-out 0.3s ease-in;
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

