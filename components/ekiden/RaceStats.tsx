import { ResponsiveTable } from "@/components/ResponsiveTable"
import { removeLeadingZero } from "@/lib/format-utils"
import { SectionTimeChart } from "@/components/charts/SectionTimeChart"
import type { RunnerWithTeam } from "@/types/ekiden"

interface SectionAward {
  section: number
  runner: string
  time: string
  isSectionRecord: boolean
}

interface RaceStatsProps {
  sectionAwards: SectionAward[]
  sectionData?: {
    section: number
    runners: RunnerWithTeam[]
  }[]
  title?: string
}

export function RaceStats({ sectionAwards, sectionData, title = "統計・記録" }: RaceStatsProps) {
  return (
    <div className="space-y-8">
      {/* チャートがあれば表示 */}
      {sectionData && (
        <SectionTimeChart
          data={sectionData.map(section => ({
            section: section.section,
            teams: section.runners.slice(0, 5).map(runner => ({
              name: runner.teamName,
              time: runner.time,
              color: runner.color
            }))
          }))}
          title="区間タイム比較（上位5チーム）"
        />
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">区間賞一覧</h3>
        <ResponsiveTable
          headers={['区間', '選手 (大学)', 'タイム', '区間新']}
          rows={sectionAwards.map((award) => [
            `${award.section}区`,
            award.runner,
            removeLeadingZero(award.time),
            award.isSectionRecord ? '★' : ''
          ])}
        />
      </div>
    </div>
  )
}

