import { describe, it, expect } from 'vitest'
import {
  formatTime,
  parseTime,
  formatGrade,
  getMedalEmoji,
  normalizeForSearch,
  calculateTimeDifference,
  formatTimeDifference,
} from '../format-utils'

describe('format-utils', () => {
  describe('formatTime', () => {
    it('秒数を正しくフォーマットする', () => {
      expect(formatTime(3661)).toBe('01:01:01')
      expect(formatTime(0)).toBe('00:00:00')
      expect(formatTime(7200)).toBe('02:00:00')
    })
  })

  describe('parseTime', () => {
    it('時間文字列を秒数に変換する', () => {
      expect(parseTime('01:01:01')).toBe(3661)
      expect(parseTime('00:00:00')).toBe(0)
      expect(parseTime('30:15')).toBe(1815)
    })
  })

  describe('formatGrade', () => {
    it('学年を丸数字で表示する', () => {
      expect(formatGrade(1)).toBe('①')
      expect(formatGrade(2)).toBe('②')
      expect(formatGrade(3)).toBe('③')
      expect(formatGrade(4)).toBe('④')
      expect(formatGrade(5)).toBe('')
    })
  })

  describe('getMedalEmoji', () => {
    it('順位に応じたメダル絵文字を返す', () => {
      expect(getMedalEmoji(1)).toBe('🥇')
      expect(getMedalEmoji(2)).toBe('🥈')
      expect(getMedalEmoji(3)).toBe('🥉')
      expect(getMedalEmoji(4)).toBe('')
      expect(getMedalEmoji('OP')).toBe('')
    })
  })

  describe('normalizeForSearch', () => {
    it('検索用に文字列を正規化する', () => {
      expect(normalizeForSearch('アオヤマガクイン')).toBe('あおやまがくいん')
      expect(normalizeForSearch('ＡＢＣＤ')).toBe('abcd')
      expect(normalizeForSearch('１２３４')).toBe('1234')
    })
  })

  describe('calculateTimeDifference', () => {
    it('タイム差を正しく計算する', () => {
      expect(calculateTimeDifference('01:10:00', '01:00:00')).toBe(600)
      expect(calculateTimeDifference('01:00:00', '01:10:00')).toBe(-600)
    })
  })

  describe('formatTimeDifference', () => {
    it('タイム差を正しくフォーマットする', () => {
      expect(formatTimeDifference(65)).toBe('+01:05')
      expect(formatTimeDifference(-65)).toBe('-01:05')
      expect(formatTimeDifference(0)).toBe('+00:00')
    })
  })
})

