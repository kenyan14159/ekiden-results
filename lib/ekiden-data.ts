import { RACE_CONFIGS } from "@/lib/race-configs"

export interface EkidenRace {
  id: string
  name: string
  subtitle: string
  description: string
  category: string
  url: string
}

// RACE_CONFIGSからデータを生成することで、二重管理を防ぐ
export const ekidenRaces: EkidenRace[] = Object.values(RACE_CONFIGS).map(config => ({
  id: config.id,
  name: config.name,
  subtitle: config.subtitle,
  description: config.description,
  category: config.category,
  url: config.url
}))

export function getEkidenById(id: string): EkidenRace | undefined {
  return ekidenRaces.find((race) => race.id === id)
}

export function getEkidenByCategory(category: string): EkidenRace[] {
  return ekidenRaces.filter((race) => race.category === category)
}
