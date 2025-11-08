"use client"

/**
 * コンテンツ保護コンポーネント（軽量版）
 * 
 * 注意: このコンポーネントは著作権表示のための透かしのみを提供します。
 * ユーザビリティとアクセシビリティを考慮し、以下の制限は削除されました:
 * - 右クリック禁止
 * - テキスト選択禁止
 * - キーボードショートカット禁止
 * 
 * これらの制限は、スクリーンリーダーやブラウザ拡張機能の動作を妨げ、
 * ユーザー体験を悪化させるため削除されました。
 */
export function ContentProtection() {
  return (
    <>
      {/* 著作権表示のための透かしのみ（ユーザー操作には影響しません） */}
      <style jsx global>{`
        /* スクリーンショット時の著作権表示用の透かし */
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
          user-select: none;
        }
      `}</style>
    </>
  )
}

