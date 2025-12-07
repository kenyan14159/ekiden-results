import { z } from 'zod'

// 基本的なランナー情報のスキーマ
export const RunnerSchema = z.object({
  section: z.number(),
  dist: z.string(),
  time: z.string(),
  name: z.string(),
  grade: z.number().optional(), // 大学駅伝用
  affiliation: z.string().optional(), // 高校・中学駅伝の所属校
  rank: z.union([z.number(), z.string()]), // 順位（"OP"などの場合があるため文字列も許容）
  isSectionRecord: z.boolean().optional(), // 区間記録かどうか
  isNewRecord: z.boolean().optional(), // 区間新記録かどうか（isSectionRecordの別名）
})

// チーム情報のスキーマ
export const TeamSchema = z.object({
  rank: z.union([z.number(), z.string()]),
  name: z.string(),
  prefecture: z.string().optional(),
  totalTime: z.string(),
  outboundTime: z.string().optional(), // 箱根駅伝のみ
  inboundTime: z.string().optional(),  // 箱根駅伝のみ
  runners: z.array(RunnerSchema),
})

// 大会概要情報のスキーマ
export const RaceOverviewSchema = z.object({
  weather: z.string().optional(),
  temperature: z.string().optional(),
  wind: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  summary: z.string().optional(),
  notes: z.array(z.string()).optional(),
})

// 駅伝データ全体のスキーマ
export const EkidenDataSchema = z.object({
  eventName: z.string(),
  year: z.number(),
  count: z.number().optional(),
  teams: z.array(TeamSchema),
  config: z.object({
    sections: z.number(),
  }).optional(),
  overview: RaceOverviewSchema.optional(),
})

export type EkidenData = z.infer<typeof EkidenDataSchema>
export type Team = z.infer<typeof TeamSchema>
export type Runner = z.infer<typeof RunnerSchema>
export type RaceOverview = z.infer<typeof RaceOverviewSchema>

