"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MobileSwipeContainerProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  showIndicators?: boolean
}

export function MobileSwipeContainer({
  children,
  onSwipeLeft,
  onSwipeRight,
  showIndicators = false
}: MobileSwipeContainerProps) {
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative select-none"
    >
      {children}
      
      {showIndicators && (onSwipeLeft || onSwipeRight) && (
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {onSwipeRight && <ChevronLeft className="w-4 h-4" />}
            <span>スワイプで移動</span>
            {onSwipeLeft && <ChevronRight className="w-4 h-4" />}
          </div>
        </div>
      )}
    </div>
  )
}
