"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import Link from "next/link"
import { useState, useEffect } from "react"
import Head from 'next/head'

// データインポート（これらは後で追加）
import menSprints1 from './data/men/menSprints1.json'
import menSprints2 from './data/men/menSprints2.json'
import menMiddleDistances1 from './data/men/menMiddleDistances1.json'
import menMiddleDistances2 from './data/men/menMiddleDistances2.json'
import menLongDistances from './data/men/menLongDistances.json'
import menHurdles from './data/men/menHurdles.json'
import menJumpsThrowsCombined from './data/men/menJumpsThrowsCombined.json'
import menRoadRunning1 from './data/men/menRoadRunning1.json'
import menRoadRunning2 from './data/men/menRoadRunning2.json'
import menRaceWalkingTrack1 from './data/men/menRaceWalkingTrack1.json'
import menRaceWalkingTrack2 from './data/men/menRaceWalkingTrack2.json'
import menRaceWalkingRoad1 from './data/men/menRaceWalkingRoad1.json'
import menRaceWalkingRoad2 from './data/men/menRaceWalkingRoad2.json'
import menRelays from './data/men/menRelays.json'

import womenSprints1 from './data/women/womenSprints1.json'
import womenSprints2 from './data/women/womenSprints2.json'
import womenMiddleDistances1 from './data/women/womenMiddleDistances1.json'
import womenMiddleDistances2 from './data/women/womenMiddleDistances2.json'
import womenLongDistances from './data/women/womenLongDistances.json'
import womenHurdles from './data/women/womenHurdles.json'
import womenJumpsThrowsCombined from './data/women/womenJumpsThrowsCombined.json'
import womenRoadRunning1 from './data/women/womenRoadRunning1.json'
import womenRoadRunning2 from './data/women/womenRoadRunning2.json'
import womenRaceWalkingTrack1 from './data/women/womenRaceWalkingTrack1.json'
import womenRaceWalkingTrack2 from './data/women/womenRaceWalkingTrack2.json'
import womenRaceWalkingRoad1 from './data/women/womenRaceWalkingRoad1.json'
import womenRaceWalkingRoad2 from './data/women/womenRaceWalkingRoad2.json'
import womenRelays from './data/women/womenRelays.json'

// 型定義
type EventDefinition = {
  key: string
  name: string
  unit: string
  isTime: boolean
  source: any[]
}

type EventGroup = {
  displayName: string
  events: EventDefinition[]
}

type Comparison = {
  id: number
  category: string
  gender: string
  event: string
  points: string
  mark: string
  unit: string
}

// ユーティリティ関数
function timeToSeconds(timeStr: string | number | null): number | null {
  if (timeStr === null || timeStr === undefined) return null
  if (typeof timeStr === 'number') return timeStr
  if (typeof timeStr !== 'string' || !timeStr.includes(':')) {
    return parseFloat(timeStr as string)
  }
  const parts = timeStr.split(':')
  let seconds = 0
  if (parts.length === 3) {
    seconds += parseFloat(parts[0]) * 3600
    seconds += parseFloat(parts[1]) * 60
    seconds += parseFloat(parts[2])
  } else if (parts.length === 2) {
    seconds += parseFloat(parts[0]) * 60
    seconds += parseFloat(parts[1])
  }
  return seconds
}

function secondsToTime(totalSeconds: number, forceMinutes = false): string {
  if (isNaN(totalSeconds) || totalSeconds === null) return '-'

  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  let result = ''
  if (hours > 0) {
    result += `${hours}:`
    result += `${String(minutes).padStart(2, '0')}:`
    result += `${seconds.toFixed(2).padStart(5, '0')}`
  } else if (minutes > 0 || forceMinutes) {
    result += `${minutes}:`
    result += `${seconds.toFixed(2).padStart(5, '0')}`
  } else {
    result = seconds.toFixed(2)
  }
  return result
}

export default function ScoringTablePage() {
  const [category, setCategory] = useState("Outdoor")
  const [gender, setGender] = useState("Men")
  const [event, setEvent] = useState("")
  const [points, setPoints] = useState("")
  const [mark, setMark] = useState("")
  const [markInput, setMarkInput] = useState("") // 記録の手動入力用
  const [unit, setUnit] = useState("秒")
  const [markInSeconds, setMarkInSeconds] = useState("")
  const [recordComparisons, setRecordComparisons] = useState<string[]>([])
  const [comparisons, setComparisons] = useState<Comparison[]>([])
  const [nextId, setNextId] = useState(1)
  const [showTable, setShowTable] = useState(false)
  const [inputMode, setInputMode] = useState<'points' | 'mark'>('points') // 入力モード

  // 種目定義
  const eventDefinitions: Record<string, Record<string, Record<string, EventGroup>>> = {
    "Outdoor": {
      "Men": {
        "Sprints": { 
          displayName: "短距離", 
          events: [ 
            { key: "100m", name: "100m", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "200m", name: "200m", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "300m", name: "300m", unit: "秒", isTime: true, source: menSprints2 }, 
            { key: "400m", name: "400m", unit: "秒", isTime: true, source: menSprints2 }, 
            { key: "500m", name: "500m", unit: "秒", isTime: true, source: menSprints2 } 
          ]
        },
        "MiddleDistances": { 
          displayName: "中距離", 
          events: [ 
            { key: "600m", name: "600m", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "800m", name: "800m", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "1000m", name: "1000m", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "1500m", name: "1500m", unit: "秒", isTime: true, source: menMiddleDistances2 }, 
            { key: "mile", name: "1マイル", unit: "秒", isTime: true, source: menMiddleDistances2 }, 
            { key: "2000m", name: "2000m", unit: "秒", isTime: true, source: menMiddleDistances2 } 
          ]
        },
        "LongDistances": { 
          displayName: "長距離", 
          events: [ 
            { key: "m3000", name: "3000m", unit: "秒", isTime: true, source: menLongDistances }, 
            { key: "miles_2", name: "2マイル", unit: "秒", isTime: true, source: menLongDistances }, 
            { key: "m5000", name: "5000m", unit: "秒", isTime: true, source: menLongDistances }, 
            { key: "m10000", name: "10000m", unit: "秒", isTime: true, source: menLongDistances } 
          ]
        },
        "Hurdles": { 
          displayName: "ハードル・障害", 
          events: [ 
            { key: "110mH", name: "110mハードル", unit: "秒", isTime: true, source: menHurdles }, 
            { key: "400mH", name: "400mハードル", unit: "秒", isTime: true, source: menHurdles }, 
            { key: "2000m_sc", name: "2000m障害", unit: "秒", isTime: true, source: menMiddleDistances2 }, 
            { key: "3000m_sc", name: "3000m障害", unit: "秒", isTime: true, source: menMiddleDistances2 } 
          ]
        },
        "Jumps": { 
          displayName: "跳躍", 
          events: [ 
            { key: "HJ", name: "走高跳", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "PV", name: "棒高跳", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "LJ", name: "走幅跳", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "TJ", name: "三段跳", unit: "m", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "Throws": { 
          displayName: "投てき", 
          events: [ 
            { key: "SP", name: "砲丸投", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "DT", name: "円盤投", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "HT", name: "ハンマー投", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "JT", name: "やり投", unit: "m", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "Combined": { 
          displayName: "混成競技", 
          events: [ 
            { key: "Dec", name: "十種競技", unit: "点", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "RoadRunning": { 
          displayName: "ロードランニング", 
          events: [ 
            { key: "mile", name: "1マイル (ロード)", unit: "秒", isTime: true, source: menRoadRunning1 }, 
            { key: "5km", name: "5km (ロード)", unit: "秒", isTime: true, source: menRoadRunning1 }, 
            { key: "10km", name: "10km (ロード)", unit: "秒", isTime: true, source: menRoadRunning1 }, 
            { key: "15km", name: "15km (ロード)", unit: "秒", isTime: true, source: menRoadRunning1 }, 
            { key: "20km", name: "20km (ロード)", unit: "秒", isTime: true, source: menRoadRunning1 }, 
            { key: "25km", name: "25km (ロード)", unit: "秒", isTime: true, source: menRoadRunning2 }, 
            { key: "30km", name: "30km (ロード)", unit: "秒", isTime: true, source: menRoadRunning2 }, 
            { key: "hm", name: "ハーフマラソン", unit: "秒", isTime: true, source: menRoadRunning2 }, 
            { key: "marathon", name: "マラソン", unit: "秒", isTime: true, source: menRoadRunning2 }, 
            { key: "100km", name: "100km (ロード)", unit: "秒", isTime: true, source: menRoadRunning2 } 
          ]
        },
        "RaceWalkingTrack": { 
          displayName: "競歩 (トラック)", 
          events: [ 
            { key: "3000mW", name: "3000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack1 }, 
            { key: "5000mW", name: "5000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack1 }, 
            { key: "10000mW", name: "10000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack1 }, 
            { key: "15000mW", name: "15000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack1 }, 
            { key: "20000mW", name: "20000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack2 }, 
            { key: "30000mW", name: "30000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack2 }, 
            { key: "35000mW", name: "35000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack2 }, 
            { key: "50000mW", name: "50000m競歩", unit: "秒", isTime: true, source: menRaceWalkingTrack2 } 
          ]
        },
        "RaceWalkingRoad": { 
          displayName: "競歩 (ロード)", 
          events: [ 
            { key: "km3_w", name: "3km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad1 }, 
            { key: "km5_w", name: "5km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad1 }, 
            { key: "km10_w", name: "10km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad1 }, 
            { key: "km15_w", name: "15km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad1 }, 
            { key: "km20_w", name: "20km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad1 }, 
            { key: "30km_W", name: "30km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad2 }, 
            { key: "35km_W", name: "35km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad2 }, 
            { key: "50km_W", name: "50km競歩 (ロード)", unit: "秒", isTime: true, source: menRaceWalkingRoad2 } 
          ]
        },
        "Relays": { 
          displayName: "リレー", 
          events: [ 
            { key: "4x100m", name: "4x100mリレー", unit: "秒", isTime: true, source: menRelays }, 
            { key: "4x200m", name: "4x200mリレー", unit: "秒", isTime: true, source: menRelays }, 
            { key: "4x400m", name: "4x400mリレー", unit: "秒", isTime: true, source: menRelays }, 
            { key: "4x400mix", name: "4x400m混合リレー", unit: "秒", isTime: true, source: menRelays } 
          ]
        }
      },
      "Women": {
        "Sprints": { 
          displayName: "短距離", 
          events: [ 
            { key: "100m", name: "100m", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "200m", name: "200m", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "300m", name: "300m", unit: "秒", isTime: true, source: womenSprints2 }, 
            { key: "400m", name: "400m", unit: "秒", isTime: true, source: womenSprints2 }, 
            { key: "500m", name: "500m", unit: "秒", isTime: true, source: womenSprints2 } 
          ]
        },
        "MiddleDistances": { 
          displayName: "中距離", 
          events: [ 
            { key: "600m", name: "600m", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "800m", name: "800m", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "1000m", name: "1000m", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "1500m", name: "1500m", unit: "秒", isTime: true, source: womenMiddleDistances2 }, 
            { key: "mile", name: "1マイル", unit: "秒", isTime: true, source: womenMiddleDistances2 }, 
            { key: "2000m", name: "2000m", unit: "秒", isTime: true, source: womenMiddleDistances2 } 
          ]
        },
        "LongDistances": { 
          displayName: "長距離", 
          events: [ 
            { key: "3000m", name: "3000m", unit: "秒", isTime: true, source: womenLongDistances }, 
            { key: "2_miles", name: "2マイル", unit: "秒", isTime: true, source: womenLongDistances }, 
            { key: "5000m", name: "5000m", unit: "秒", isTime: true, source: womenLongDistances }, 
            { key: "10000m", name: "10000m", unit: "秒", isTime: true, source: womenLongDistances } 
          ]
        },
        "Hurdles": { 
          displayName: "ハードル・障害", 
          events: [ 
            { key: "100mH", name: "100mハードル", unit: "秒", isTime: true, source: womenHurdles }, 
            { key: "400mH", name: "400mハードル", unit: "秒", isTime: true, source: womenHurdles }, 
            { key: "2000m_SC", name: "2000m障害", unit: "秒", isTime: true, source: womenMiddleDistances2 }, 
            { key: "3000m_SC", name: "3000m障害", unit: "秒", isTime: true, source: womenMiddleDistances2 } 
          ]
        },
        "Jumps": { 
          displayName: "跳躍", 
          events: [ 
            { key: "HJ", name: "走高跳", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "PV", name: "棒高跳", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "LJ", name: "走幅跳", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "TJ", name: "三段跳", unit: "m", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "Throws": { 
          displayName: "投てき", 
          events: [ 
            { key: "SP", name: "砲丸投", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "DT", name: "円盤投", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "HT", name: "ハンマー投", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "JT", name: "やり投", unit: "m", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "Combined": { 
          displayName: "混成競技", 
          events: [ 
            { key: "Hept", name: "七種競技", unit: "点", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "RoadRunning": { 
          displayName: "ロードランニング", 
          events: [ 
            { key: "mile", name: "1マイル (ロード)", unit: "秒", isTime: true, source: womenRoadRunning1 }, 
            { key: "5km", name: "5km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning1 }, 
            { key: "10km", name: "10km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning1 }, 
            { key: "15km", name: "15km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning1 }, 
            { key: "20km", name: "20km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning1 }, 
            { key: "25km", name: "25km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning2 }, 
            { key: "30km", name: "30km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning2 }, 
            { key: "hm", name: "ハーフマラソン", unit: "秒", isTime: true, source: womenRoadRunning2 }, 
            { key: "marathon", name: "マラソン", unit: "秒", isTime: true, source: womenRoadRunning2 }, 
            { key: "100km", name: "100km (ロード)", unit: "秒", isTime: true, source: womenRoadRunning2 } 
          ]
        },
        "RaceWalkingTrack": { 
          displayName: "競歩 (トラック)", 
          events: [ 
            { key: "3000mW", name: "3000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack1 }, 
            { key: "5000mW", name: "5000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack1 }, 
            { key: "10000mW", name: "10000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack1 }, 
            { key: "15000mW", name: "15000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack1 }, 
            { key: "20000mW", name: "20000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack2 }, 
            { key: "30000mW", name: "30000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack2 }, 
            { key: "35000mW", name: "35000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack2 }, 
            { key: "50000mW", name: "50000m競歩", unit: "秒", isTime: true, source: womenRaceWalkingTrack2 } 
          ]
        },
        "RaceWalkingRoad": { 
          displayName: "競歩 (ロード)", 
          events: [ 
            { key: "3km_W", name: "3km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad1 }, 
            { key: "5km_W", name: "5km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad1 }, 
            { key: "10km_W", name: "10km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad1 }, 
            { key: "15km_W", name: "15km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad1 }, 
            { key: "20km_W", name: "20km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad1 }, 
            { key: "HMW", name: "ハーフマラソン競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad2 }, 
            { key: "30km W", name: "30km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad2 }, 
            { key: "35 km W", name: "35km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad2 }, 
            { key: "MarW", name: "マラソン競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad2 }, 
            { key: "50km W", name: "50km競歩 (ロード)", unit: "秒", isTime: true, source: womenRaceWalkingRoad2 } 
          ]
        },
        "Relays": { 
          displayName: "リレー", 
          events: [ 
            { key: "4x100m", name: "4x100mリレー", unit: "秒", isTime: true, source: womenRelays }, 
            { key: "4x200m", name: "4x200mリレー", unit: "秒", isTime: true, source: womenRelays }, 
            { key: "4x400m", name: "4x400mリレー", unit: "秒", isTime: true, source: womenRelays }, 
            { key: "4x400mix", name: "4x400m混合リレー", unit: "秒", isTime: true, source: menRelays } 
          ]
        }
      }
    },
    "Indoor": {
      "Men": {
        "Sprints": { 
          displayName: "短距離 (室内)", 
          events: [ 
            { key: "50m", name: "50m (室内)", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "55m", name: "55m (室内)", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "60m", name: "60m (室内)", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "200m_sh", name: "200m (室内)", unit: "秒", isTime: true, source: menSprints1 }, 
            { key: "300m_sh", name: "300m (室内)", unit: "秒", isTime: true, source: menSprints2 }, 
            { key: "400m_sh", name: "400m (室内)", unit: "秒", isTime: true, source: menSprints2 }, 
            { key: "500m_sh", name: "500m (室内)", unit: "秒", isTime: true, source: menSprints2 } 
          ]
        },
        "MiddleDistances": { 
          displayName: "中距離 (室内)", 
          events: [ 
            { key: "600m_sh", name: "600m (室内)", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "800m_sh", name: "800m (室内)", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "1000m_sh", name: "1000m (室内)", unit: "秒", isTime: true, source: menMiddleDistances1 }, 
            { key: "1500m_sh", name: "1500m (室内)", unit: "秒", isTime: true, source: menMiddleDistances2 }, 
            { key: "mile_sh", name: "1マイル (室内)", unit: "秒", isTime: true, source: menMiddleDistances2 } 
          ]
        },
        "LongDistances": { 
          displayName: "長距離 (室内)", 
          events: [ 
            { key: "2000m_sh", name: "2000m (室内)", unit: "秒", isTime: true, source: menMiddleDistances2 }, 
            { key: "m3000_sh", name: "3000m (室内)", unit: "秒", isTime: true, source: menLongDistances }, 
            { key: "miles_2_sh", name: "2マイル (室内)", unit: "秒", isTime: true, source: menLongDistances }, 
            { key: "m5000_sh", name: "5000m (室内)", unit: "秒", isTime: true, source: menLongDistances } 
          ]
        },
        "Hurdles": { 
          displayName: "ハードル (室内)", 
          events: [ 
            { key: "50mH", name: "50mハードル (室内)", unit: "秒", isTime: true, source: menHurdles }, 
            { key: "55mH", name: "55mハードル (室内)", unit: "秒", isTime: true, source: menHurdles }, 
            { key: "60mH", name: "60mハードル (室内)", unit: "秒", isTime: true, source: menHurdles } 
          ]
        },
        "Jumps": { 
          displayName: "跳躍 (室内)", 
          events: [ 
            { key: "HJ", name: "走高跳 (室内)", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "PV", name: "棒高跳 (室内)", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "LJ", name: "走幅跳 (室内)", unit: "m", isTime: false, source: menJumpsThrowsCombined }, 
            { key: "TJ", name: "三段跳 (室内)", unit: "m", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "Throws": { 
          displayName: "投てき (室内)", 
          events: [ 
            { key: "SP", name: "砲丸投 (室内)", unit: "m", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "Combined": { 
          displayName: "混成競技 (室内)", 
          events: [ 
            { key: "Hept_sh", name: "七種競技 (室内)", unit: "点", isTime: false, source: menJumpsThrowsCombined } 
          ]
        },
        "Relays": { 
          displayName: "リレー (室内)", 
          events: [ 
            { key: "4x200m_sh", name: "4x200mリレー (室内)", unit: "秒", isTime: true, source: menRelays }, 
            { key: "4x400m_sh", name: "4x400mリレー (室内)", unit: "秒", isTime: true, source: menRelays }, 
            { key: "4x400mix_sh", name: "4x400m混合リレー (室内)", unit: "秒", isTime: true, source: menRelays } 
          ]
        }
      },
      "Women": {
        "Sprints": { 
          displayName: "短距離 (室内)", 
          events: [ 
            { key: "50m", name: "50m (室内)", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "55m", name: "55m (室内)", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "60m", name: "60m (室内)", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "200m_sh", name: "200m (室内)", unit: "秒", isTime: true, source: womenSprints1 }, 
            { key: "300m_sh", name: "300m (室内)", unit: "秒", isTime: true, source: womenSprints2 }, 
            { key: "400m_sh", name: "400m (室内)", unit: "秒", isTime: true, source: womenSprints2 }, 
            { key: "500m_sh", name: "500m (室内)", unit: "秒", isTime: true, source: womenSprints2 } 
          ]
        },
        "MiddleDistances": { 
          displayName: "中距離 (室内)", 
          events: [ 
            { key: "600m_sh", name: "600m (室内)", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "800m_sh", name: "800m (室内)", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "1000m_sh", name: "1000m (室内)", unit: "秒", isTime: true, source: womenMiddleDistances1 }, 
            { key: "1500m_sh", name: "1500m (室内)", unit: "秒", isTime: true, source: womenMiddleDistances2 }, 
            { key: "mile_sh", name: "1マイル (室内)", unit: "秒", isTime: true, source: womenMiddleDistances2 } 
          ]
        },
        "LongDistances": { 
          displayName: "長距離 (室内)", 
          events: [ 
            { key: "2000m_sh", name: "2000m (室内)", unit: "秒", isTime: true, source: womenMiddleDistances2 }, 
            { key: "3000m_sh", name: "3000m (室内)", unit: "秒", isTime: true, source: womenLongDistances }, 
            { key: "2_miles_sh", name: "2マイル (室内)", unit: "秒", isTime: true, source: womenLongDistances }, 
            { key: "5000m_sh", name: "5000m (室内)", unit: "秒", isTime: true, source: womenLongDistances } 
          ]
        },
        "Hurdles": { 
          displayName: "ハードル (室内)", 
          events: [ 
            { key: "50mH", name: "50mハードル (室内)", unit: "秒", isTime: true, source: womenHurdles }, 
            { key: "55mH", name: "55mハードル (室内)", unit: "秒", isTime: true, source: womenHurdles }, 
            { key: "60mH", name: "60mハードル (室内)", unit: "秒", isTime: true, source: womenHurdles } 
          ]
        },
        "Jumps": { 
          displayName: "跳躍 (室内)", 
          events: [ 
            { key: "HJ", name: "走高跳 (室内)", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "PV", name: "棒高跳 (室内)", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "LJ", name: "走幅跳 (室内)", unit: "m", isTime: false, source: womenJumpsThrowsCombined }, 
            { key: "TJ", name: "三段跳 (室内)", unit: "m", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "Throws": { 
          displayName: "投てき (室内)", 
          events: [ 
            { key: "SP", name: "砲丸投 (室内)", unit: "m", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "Combined": { 
          displayName: "混成競技 (室内)", 
          events: [ 
            { key: "Pent_sh", name: "五種競技 (室内)", unit: "点", isTime: false, source: womenJumpsThrowsCombined } 
          ]
        },
        "Relays": { 
          displayName: "リレー (室内)", 
          events: [ 
            { key: "4x200m_sh", name: "4x200mリレー (室内)", unit: "秒", isTime: true, source: womenRelays }, 
            { key: "4x400m_sh", name: "4x400mリレー (室内)", unit: "秒", isTime: true, source: womenRelays }, 
            { key: "4x400mix_sh", name: "4x400m混合リレー (室内)", unit: "秒", isTime: true, source: menRelays } 
          ]
        }
      }
    }
  }

  const handleAddComparison = () => {
    setComparisons([...comparisons, {
      id: nextId,
      category: "Outdoor",
      gender: "Men",
      event: "",
      points: points || "", // メインのポイントをコピー
      mark: "",
      unit: "秒"
    }])
    setNextId(nextId + 1)
  }

  const handleRemoveComparison = (id: number) => {
    setComparisons(comparisons.filter(c => c.id !== id))
  }

  const handleComparisonChange = (id: number, field: string, value: string) => {
    setComparisons(comparisons.map(c => {
      if (c.id === id) {
        const updated = { ...c, [field]: value }
        if (field === 'category' || field === 'gender') {
          updated.event = ''
          updated.mark = ''
        }
        if (field === 'points') {
          // ポイントが変更されたら記録を再計算
          const pointsValue = parseInt(value, 10)
          if (value === '' || isNaN(pointsValue) || pointsValue < 800 || pointsValue > 1400) {
            updated.mark = ''
          } else if (updated.event) {
            const result = calculateMark(updated.event, pointsValue, updated.category, updated.gender)
            updated.mark = result.mark
            updated.unit = result.unitValue
          }
        }
        return updated
      }
      return c
    }))
  }

  // 比較セクション用のポイント増減関数
  const handleComparisonIncrement = (id: number) => {
    const comparison = comparisons.find(c => c.id === id)
    if (!comparison) return
    
    const currentPoints = parseInt(comparison.points, 10)
    if (isNaN(currentPoints)) {
      handleComparisonChange(id, 'points', '800')
    } else if (currentPoints >= 1400) {
      handleComparisonChange(id, 'points', '800')
    } else {
      handleComparisonChange(id, 'points', String(currentPoints + 1))
    }
  }

  const handleComparisonDecrement = (id: number) => {
    const comparison = comparisons.find(c => c.id === id)
    if (!comparison) return
    
    const currentPoints = parseInt(comparison.points, 10)
    if (isNaN(currentPoints)) {
      handleComparisonChange(id, 'points', '1400')
    } else if (currentPoints <= 800) {
      handleComparisonChange(id, 'points', '1400')
    } else {
      handleComparisonChange(id, 'points', String(currentPoints - 1))
    }
  }

  // イベント選択肢を取得
  const getEventOptions = (cat: string, gen: string) => {
    const groups = eventDefinitions[cat]?.[gen] || {}
    const options: { group: string; events: EventDefinition[] }[] = []
    Object.keys(groups).forEach(groupKey => {
      const group = groups[groupKey]
      options.push({ group: group.displayName, events: group.events })
    })
    return options
  }

  // 種目に応じたプレースホルダーを取得
  const getPlaceholderForEvent = (eventKey: string): string => {
    if (!eventKey) return '記録を入力 (例: 10.5 または 3:45.2)'
    
    // 短距離 (100m-500m)
    if (['100m', '200m', '300m', '400m', '500m'].includes(eventKey)) {
      return '例: 10.50 (秒単位)'
    }
    
    // 中距離 (600m-2000m)
    if (['600m', '800m', '1000m', '1500m', 'mile', '2000m'].includes(eventKey)) {
      return '例: 1:45.50 (分:秒)'
    }
    
    // 長距離・ハーフマラソン以上
    if (['hm', 'HMW', 'marathon', 'MarW', '100km'].includes(eventKey)) {
      return '例: 1:05:30 (時:分:秒)'
    }
    
    // その他の長距離・ロードランニング
    if (eventKey.includes('m3000') || eventKey.includes('3000m') || 
        eventKey.includes('m5000') || eventKey.includes('5000m') || 
        eventKey.includes('m10000') || eventKey.includes('10000m') ||
        eventKey.includes('miles_2') || eventKey.includes('2_miles') ||
        ['5km', '10km', '15km', '20km', '25km', '30km'].includes(eventKey)) {
      return '例: 13:45.50 (分:秒)'
    }
    
    // ハードル
    if (eventKey.includes('H') || eventKey.includes('h')) {
      return '例: 13.50 (秒単位)'
    }
    
    // 障害走
    if (eventKey.includes('sc') || eventKey.includes('SC')) {
      return '例: 8:15.50 (分:秒)'
    }
    
    // 競歩 (トラック・ロード)
    if (eventKey.includes('W') || eventKey.includes('w')) {
      if (['3000mW', '5000mW', 'km3_w', 'km5_w'].includes(eventKey)) {
        return '例: 11:45.50 (分:秒)'
      }
      return '例: 38:45.50 (分:秒) または 1:18:45 (時:分:秒)'
    }
    
    // リレー
    if (eventKey.includes('x')) {
      if (eventKey === '4x100m') {
        return '例: 38.50 (秒単位)'
      }
      return '例: 3:05.50 (分:秒)'
    }
    
    // 跳躍・投てき
    if (['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT'].includes(eventKey)) {
      return '例: 7.50 (メートル単位)'
    }
    
    // 混成競技
    if (['Dec', 'Hept'].includes(eventKey)) {
      return '例: 8500 (合計点)'
    }
    
    return '記録を入力 (例: 10.5 または 3:45.2)'
  }

  // 記録からポイントを逆算する
  const calculatePointsFromMark = (eventKey: string, markValue: string, cat: string, gen: string): number | null => {
    try {
      const groups = eventDefinitions[cat]?.[gen] || {}
      let eventDef: EventDefinition | undefined
      
      for (const groupKey of Object.keys(groups)) {
        const group = groups[groupKey] as EventGroup
        const found = group.events.find(e => e.key === eventKey)
        if (found) {
          eventDef = found
          break
        }
      }

      if (!eventDef) return null

      // 入力値を数値に変換
      let targetValue: number
      if (eventDef.isTime) {
        targetValue = timeToSeconds(markValue) || 0
      } else {
        targetValue = parseFloat(markValue)
      }

      if (isNaN(targetValue) || targetValue <= 0) return null

      const table: any[] = eventDef.source

      // 二分探索で近似ポイントを見つける
      let bestPoints = null
      let bestDiff = Infinity

      for (const row of table) {
        if (row[eventKey] === null || row[eventKey] === undefined) continue
        
        const rowMark = eventDef.isTime ? timeToSeconds(row[eventKey]) : parseFloat(row[eventKey])
        if (rowMark === null || isNaN(rowMark)) continue

        // 時間種目は小さいほうが良い、距離種目は大きいほうが良い
        const diff = eventDef.isTime 
          ? Math.abs(rowMark - targetValue)
          : Math.abs(rowMark - targetValue)

        if (diff < bestDiff) {
          bestDiff = diff
          bestPoints = row.points
        }

        // 完全一致したら終了
        if (diff === 0) break
      }

      return bestPoints
    } catch (error) {
      console.error('Error calculating points from mark:', error)
      return null
    }
  }

  // 記録を計算する
  const calculateMark = (eventKey: string, pointsValue: number, cat: string, gen: string): { mark: string; unitValue: string; isTime: boolean; seconds: number | null } => {
    try {
      const groups = eventDefinitions[cat]?.[gen] || {}
      let eventDef: EventDefinition | undefined
      
      for (const groupKey of Object.keys(groups)) {
        const group = groups[groupKey] as EventGroup
        const found = group.events.find(e => e.key === eventKey)
        if (found) {
          eventDef = found
          break
        }
      }

      if (!eventDef) {
        return { mark: '', unitValue: '-', isTime: false, seconds: null }
      }

      const table: any[] = eventDef.source
      const foundRow = table.find((row: any) => row.points <= pointsValue && row[eventKey] != null)
      
      if (!foundRow || foundRow[eventKey] === null) {
        return { mark: '', unitValue: eventDef.unit, isTime: eventDef.isTime, seconds: null }
      }

      const rawMark = foundRow[eventKey]
      const numericMark = eventDef.isTime ? timeToSeconds(rawMark) : parseFloat(rawMark)
      
      if (numericMark === null || isNaN(numericMark)) {
        return { mark: '', unitValue: eventDef.unit, isTime: eventDef.isTime, seconds: null }
      }

      const forceMinutes = ['800m', '1500m', 'mile', '2000m', 'm3000', '3000m', 'miles_2', '2_miles', 'm5000', '5000m', 'm10000', '10000m', '2000m_sc', '3000m_sc', '3000m_SC', '4x200m', '4x400m', '4x400mix', 'hm', 'marathon', '100km', 'HMW', 'MarW', '3km_W', '5km_W', '10km_W', '15km_W', '20km_W', '30km W', '35 km W', '50km W'].includes(eventKey.replace(/_sh|_road/i, ''))
      
      const displayMark = eventDef.isTime ? secondsToTime(numericMark, forceMinutes) : numericMark.toFixed(2)

      return { 
        mark: displayMark, 
        unitValue: eventDef.unit, 
        isTime: eventDef.isTime,
        seconds: numericMark
      }
    } catch (error) {
      console.error('Error calculating mark:', error)
      return { mark: '', unitValue: '-', isTime: false, seconds: null }
    }
  }

  // ポイント入力時の処理
  useEffect(() => {
    if (inputMode !== 'points') return

    const pointsValue = parseInt(points, 10)
    if (!event || isNaN(pointsValue) || pointsValue < 800 || pointsValue > 1400) {
      setMark('')
      setMarkInSeconds('')
      setRecordComparisons([])
      setShowTable(false)
      return
    }

    // メインの記録計算
    const result = calculateMark(event, pointsValue, category, gender)
    setMark(result.mark)
    setMarkInput(result.mark)
    setUnit(result.unitValue)
    
    if (result.isTime && result.seconds && result.seconds >= 60) {
      setMarkInSeconds(`(${result.seconds.toFixed(2)} 秒)`)
    } else {
      setMarkInSeconds('')
    }

    // 記録比較は省略（必要に応じて実装）
    setRecordComparisons([])
    setShowTable(pointsValue >= 800 && pointsValue <= 1400)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, event, category, gender, inputMode])

  // 記録入力時の処理
  useEffect(() => {
    if (inputMode !== 'mark' || !event || !markInput) {
      return
    }

    // 記録からポイントを逆算
    const calculatedPoints = calculatePointsFromMark(event, markInput, category, gender)
    
    if (calculatedPoints !== null && calculatedPoints >= 800 && calculatedPoints <= 1400) {
      setPoints(String(calculatedPoints))
      
      // 逆算したポイントで記録を再計算して表示
      const result = calculateMark(event, calculatedPoints, category, gender)
      setMark(result.mark)
      setUnit(result.unitValue)
      
      if (result.isTime && result.seconds && result.seconds >= 60) {
        setMarkInSeconds(`(${result.seconds.toFixed(2)} 秒)`)
      } else {
        setMarkInSeconds('')
      }
      
      setShowTable(true)
    } else {
      setPoints('')
      setMark('')
      setShowTable(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markInput, event, category, gender, inputMode])

  // ポイント入力補正
  const handlePointsChange = (value: string) => {
    if (value === '') {
      setPoints('')
      return
    }

    const pointsValue = parseInt(value, 10)
    if (isNaN(pointsValue)) return

    // 範囲外の値を制限
    if (pointsValue < 800) {
      setPoints('800')
    } else if (pointsValue > 1400) {
      setPoints('1400')
    } else {
      setPoints(value)
    }
  }

  const handlePointsBlur = () => {
    const pointsValue = parseInt(points, 10)
    if (isNaN(pointsValue)) return
    
    if (pointsValue < 800) {
      setPoints('800')
    } else if (pointsValue > 1400) {
      setPoints('1400')
    }
  }

  const handlePointsIncrement = () => {
    if (points === '' || points === '0') {
      setPoints('800')
    } else {
      const pointsValue = parseInt(points, 10)
      if (!isNaN(pointsValue)) {
        if (pointsValue >= 1400) {
          setPoints('800') // 1400からループして800に
        } else {
          setPoints(String(pointsValue + 1))
        }
      }
    }
  }

  const handlePointsDecrement = () => {
    if (points === '' || points === '0') {
      setPoints('1400')
    } else {
      const pointsValue = parseInt(points, 10)
      if (!isNaN(pointsValue)) {
        if (pointsValue <= 800) {
          setPoints('1400') // 800からループして1400に
        } else {
          setPoints(String(pointsValue - 1))
        }
      }
    }
  }

  // 長押し処理
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLongPress, setIsLongPress] = useState(false)

  const startLongPress = (callback: () => void) => {
    setIsLongPress(false)
    // 初回実行を遅延させる
    const timer = setTimeout(() => {
      setIsLongPress(true)
      // 連続実行のインターバルを設定
      const interval = setInterval(callback, 100) // 100msごとに実行
      setIntervalTimer(interval)
    }, 300) // 300ms長押しで開始
    setPressTimer(timer)
  }

  const stopLongPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
    if (intervalTimer) {
      clearInterval(intervalTimer)
      setIntervalTimer(null)
    }
    setIsLongPress(false)
  }

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (pressTimer) clearTimeout(pressTimer)
      if (intervalTimer) clearInterval(intervalTimer)
    }
  }, [pressTimer, intervalTimer])

  const eventOptions = getEventOptions(category, gender)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">スコアリングテーブル</h1>
            <p className="text-lg text-gray-600">世界陸上ポイント計算機</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            
            {/* 説明文 */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded">
              <p className="text-gray-700 leading-relaxed">
                陸上競技のポイントを記録に変換するツールです。ポイントを入力すると、そのポイントに相当する記録が自動で計算されます。<br />
                <strong>注意：このシステムは800ポイント以上の記録にのみ対応しています。</strong><br />
                参考：<a href="https://www.lbfa.be/uploads/pdf/2025/World_Athletics_Scoring_Tables_of_Athletics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">2025年世界陸連得点表</a>
              </p>
            </div>

            {/* メインフォーム */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* カテゴリー */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setEvent('')
                      setPoints('')
                      setMark('')
                      setMarkInput('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Outdoor">屋外</option>
                    <option value="Indoor">室内</option>
                  </select>
                </div>

                {/* 性別 */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    性別
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value)
                      setEvent('')
                      setPoints('')
                      setMark('')
                      setMarkInput('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Men">男性</option>
                    <option value="Women">女性</option>
                  </select>
                </div>

                {/* 種目 */}
                <div>
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-2">
                    種目
                  </label>
                  <select
                    id="event"
                    value={event}
                    onChange={(e) => {
                      setEvent(e.target.value)
                      // 種目変更時に入力をクリア
                      setPoints('')
                      setMark('')
                      setMarkInput('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">種目を選択</option>
                    {eventOptions.map((optgroup) => (
                      <optgroup key={optgroup.group} label={optgroup.group}>
                        {optgroup.events.map((evt) => (
                          <option key={evt.key} value={evt.key}>
                            {evt.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* 入力モード切替 */}
              <div className="mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setInputMode('points')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      inputMode === 'points'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    ポイントから計算
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('mark')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      inputMode === 'mark'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    記録から計算
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ポイント */}
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-2">
                    ポイント
                  </label>
                  <div className="relative flex items-center">
                    {inputMode === 'points' && (
                      <>
                        <button
                          type="button"
                          onClick={handlePointsDecrement}
                          onMouseDown={() => startLongPress(handlePointsDecrement)}
                          onMouseUp={stopLongPress}
                          onMouseLeave={stopLongPress}
                          onTouchStart={() => startLongPress(handlePointsDecrement)}
                          onTouchEnd={stopLongPress}
                          className="absolute left-2 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          aria-label="ポイントを減らす"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handlePointsIncrement}
                          onMouseDown={() => startLongPress(handlePointsIncrement)}
                          onMouseUp={stopLongPress}
                          onMouseLeave={stopLongPress}
                          onTouchStart={() => startLongPress(handlePointsIncrement)}
                          onTouchEnd={stopLongPress}
                          className="absolute right-12 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          aria-label="ポイントを増やす"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </>
                    )}
                    <input
                      type="number"
                      id="points"
                      value={points}
                      onChange={(e) => handlePointsChange(e.target.value)}
                      onBlur={handlePointsBlur}
                      onFocus={() => inputMode === 'mark' && setInputMode('points')}
                      placeholder="800-1400"
                      min="800"
                      max="1400"
                      step="1"
                      readOnly={inputMode === 'mark'}
                      className={`w-full ${inputMode === 'points' ? 'px-12' : 'px-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${inputMode === 'mark' ? 'bg-gray-50' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">pt</span>
                  </div>
                </div>

                {/* 記録 */}
                <div>
                  <label htmlFor="mark" className="block text-sm font-medium text-gray-700 mb-2">
                    記録
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="mark"
                      value={inputMode === 'mark' ? markInput : mark}
                      onChange={(e) => inputMode === 'mark' && setMarkInput(e.target.value)}
                      onFocus={() => inputMode === 'points' && setInputMode('mark')}
                      readOnly={inputMode === 'points'}
                      placeholder={inputMode === 'mark' ? getPlaceholderForEvent(event) : 'ここに記録が表示されます'}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${inputMode === 'points' ? 'bg-gray-50' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{unit}</span>
                  </div>
                  {markInSeconds && (
                    <div className="mt-2 text-sm text-gray-600">
                      {markInSeconds}
                    </div>
                  )}
                  {recordComparisons.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      {recordComparisons.map((comp, idx) => (
                        <div key={idx}>{comp}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 比較種目セクション */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleAddComparison}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                比較種目を追加
              </button>

              {/* 比較行 */}
              <div className="mt-6 space-y-4">
                {comparisons.map((comparison) => {
                  const compEventOptions = getEventOptions(comparison.category, comparison.gender)
                  return (
                    <div key={comparison.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            カテゴリー
                          </label>
                          <select 
                            value={comparison.category}
                            onChange={(e) => handleComparisonChange(comparison.id, 'category', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Outdoor">屋外</option>
                            <option value="Indoor">室内</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            性別
                          </label>
                          <select 
                            value={comparison.gender}
                            onChange={(e) => handleComparisonChange(comparison.id, 'gender', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Men">男性</option>
                            <option value="Women">女性</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            種目
                          </label>
                          <select 
                            value={comparison.event}
                            onChange={(e) => handleComparisonChange(comparison.id, 'event', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">種目を選択</option>
                            {compEventOptions.map((optgroup) => (
                              <optgroup key={optgroup.group} label={optgroup.group}>
                                {optgroup.events.map((evt) => (
                                  <option key={evt.key} value={evt.key}>
                                    {evt.name}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ポイント
                          </label>
                          <div className="relative flex items-center">
                            <button
                              type="button"
                              onClick={() => handleComparisonDecrement(comparison.id)}
                              onMouseDown={() => startLongPress(() => handleComparisonDecrement(comparison.id))}
                              onMouseUp={stopLongPress}
                              onMouseLeave={stopLongPress}
                              onTouchStart={() => startLongPress(() => handleComparisonDecrement(comparison.id))}
                              onTouchEnd={stopLongPress}
                              className="absolute left-1 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                              aria-label="ポイントを減らす"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={comparison.points}
                              onChange={(e) => handleComparisonChange(comparison.id, 'points', e.target.value)}
                              placeholder="800-1400"
                              min="800"
                              max="1400"
                              step="1"
                              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleComparisonIncrement(comparison.id)}
                              onMouseDown={() => startLongPress(() => handleComparisonIncrement(comparison.id))}
                              onMouseUp={stopLongPress}
                              onMouseLeave={stopLongPress}
                              onTouchStart={() => startLongPress(() => handleComparisonIncrement(comparison.id))}
                              onTouchEnd={stopLongPress}
                              className="absolute right-10 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                              aria-label="ポイントを増やす"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">pt</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            記録
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={comparison.mark}
                              readOnly
                              placeholder="記録"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 pr-12"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{comparison.unit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveComparison(comparison.id)}
                        className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        削除
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 結果テーブル */}
            {showTable && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  同等記録 (屋外主要種目 - {gender === 'Men' ? '男性' : '女性'})
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">ポイント</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">100m</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">400m</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">1500m</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">5000m</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">走高跳</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">走幅跳</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const currentPoints = parseInt(points, 10)
                        const standardPoints = [1400, 1300, 1200, 1100, 1000, 900, 800]
                        
                        // 現在のポイントが標準ポイントに含まれていなければ追加
                        let displayPoints = [...standardPoints]
                        if (currentPoints && !isNaN(currentPoints) && currentPoints >= 800 && currentPoints <= 1400) {
                          if (!standardPoints.includes(currentPoints)) {
                            displayPoints.push(currentPoints)
                            displayPoints.sort((a, b) => b - a)
                          }
                        }

                        return displayPoints.map((pt) => {
                          const sprint100 = calculateMark('100m', pt, 'Outdoor', gender)
                          const sprint400 = calculateMark('400m', pt, 'Outdoor', gender)
                          const mid1500 = calculateMark('1500m', pt, 'Outdoor', gender)
                          const long5000Key = gender === 'Men' ? 'm5000' : '5000m'
                          const long5000 = calculateMark(long5000Key, pt, 'Outdoor', gender)
                          const hj = calculateMark('HJ', pt, 'Outdoor', gender)
                          const lj = calculateMark('LJ', pt, 'Outdoor', gender)
                          
                          return (
                            <tr key={pt} className={pt === currentPoints ? "bg-yellow-50 font-semibold" : ""}>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200 font-medium">{pt}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{sprint100.mark || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{sprint400.mark || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{mid1500.mark || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{long5000.mark || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{hj.mark || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">{lj.mark || '-'}</td>
                            </tr>
                          )
                        })
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

