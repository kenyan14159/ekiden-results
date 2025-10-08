"use client"

import { useEffect } from 'react'
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'

// Web Vitalsのメトリクスを送信する関数
function sendToAnalytics(metric: any) {
  // Google Analyticsに送信
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // コンソールにも出力（開発環境）
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vitals:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals (主要指標)
    onCLS(sendToAnalytics)  // Cumulative Layout Shift (累積レイアウトシフト)
    onINP(sendToAnalytics)  // Interaction to Next Paint (次のペイントまでのインタラクション) - FIDの後継
    onLCP(sendToAnalytics)  // Largest Contentful Paint (最大コンテンツの描画)

    // 補助指標
    onFCP(sendToAnalytics)  // First Contentful Paint (最初のコンテンツ描画)
    onTTFB(sendToAnalytics) // Time to First Byte (最初のバイトまでの時間)
  }, [])

  return null // UIは表示しない
}

// デバッグ用のVisual Web Vitalsコンポーネント
export function WebVitalsDebug() {
  useEffect(() => {
    const metricsDisplay = document.createElement('div')
    metricsDisplay.id = 'web-vitals-debug'
    metricsDisplay.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `
    document.body.appendChild(metricsDisplay)

    const metrics: any = {}

    const updateDisplay = () => {
      const getColor = (name: string, value: number) => {
        if (name === 'LCP') return value < 2500 ? '#0cce6b' : value < 4000 ? '#ffa400' : '#ff4e42'
        if (name === 'FID' || name === 'INP') return value < 100 ? '#0cce6b' : value < 300 ? '#ffa400' : '#ff4e42'
        if (name === 'CLS') return value < 0.1 ? '#0cce6b' : value < 0.25 ? '#ffa400' : '#ff4e42'
        if (name === 'FCP') return value < 1800 ? '#0cce6b' : value < 3000 ? '#ffa400' : '#ff4e42'
        if (name === 'TTFB') return value < 800 ? '#0cce6b' : value < 1800 ? '#ffa400' : '#ff4e42'
        return '#999'
      }

      const formatValue = (name: string, value: number) => {
        if (name === 'CLS') return value.toFixed(3)
        return Math.round(value) + 'ms'
      }

      metricsDisplay.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px; font-size: 14px;">
          📊 Core Web Vitals
        </div>
        ${Object.entries(metrics).map(([name, value]: [string, any]) => `
          <div style="margin: 5px 0; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: ${getColor(name, value)};">●</span>
            <span style="flex: 1; margin: 0 8px;">${name}</span>
            <strong style="color: ${getColor(name, value)};">${formatValue(name, value)}</strong>
          </div>
        `).join('')}
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333; font-size: 10px; color: #888;">
          良好: 緑 | 改善が必要: 橙 | 不良: 赤
        </div>
      `
    }

    const recordMetric = (metric: any) => {
      metrics[metric.name] = metric.value
      updateDisplay()
    }

    onCLS(recordMetric)
    onINP(recordMetric)
    onLCP(recordMetric)
    onFCP(recordMetric)
    onTTFB(recordMetric)

    return () => {
      const element = document.getElementById('web-vitals-debug')
      if (element) {
        element.remove()
      }
    }
  }, [])

  return null
}
