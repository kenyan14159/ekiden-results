import { ResponsiveTable } from "@/components/ResponsiveTable"
import { getMedalEmoji, formatGrade, removeLeadingZero, shortenUniversityName } from "@/lib/format-utils"
import type { RunnerWithTeam } from "@/types/ekiden"

interface EkidenResultTableProps {
  runners: RunnerWithTeam[]
  type: 'team' | 'section' | 'search'
  isOP?: boolean // オープン参加かどうか
}

export function EkidenResultTable({ runners, type, isOP = false }: EkidenResultTableProps) {
  if (type === 'team') {
    return (
      <ResponsiveTable
        headers={['区間', '選手', 'タイム', '順位']}
        rows={runners.map((runner) => [
          `${runner.section}区`,
          <span key={runner.section}>
            {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
          </span>,
          <span key={`time-${runner.section}`}>
            {removeLeadingZero(runner.time)}
            {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★</span>}
          </span>,
          isOP ? '-' : `${runner.rank}位${getMedalEmoji(runner.rank)}`
        ])}
        mobileCardView={false}
      />
    )
  }

  if (type === 'section') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white section-results-table">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-2 md:px-4 text-left">順位</th>
              <th className="py-3 px-2 md:px-4 text-left hidden md:table-cell">選手</th>
              <th className="py-3 px-2 md:px-4 text-left">大学</th>
              <th className="py-3 px-2 md:px-4 text-left">タイム</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {runners.map((runner, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-2 md:px-4 md:whitespace-nowrap">
                  <div className="flex flex-col md:block gap-1">
                    <span className="font-bold text-sm md:text-base">{runner.rank}位 {getMedalEmoji(runner.rank)}</span>
                    <span className="text-xs md:hidden text-gray-700 break-words">{runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}</span>
                  </div>
                </td>
                <td className="py-2 px-2 md:px-4 whitespace-nowrap hidden md:table-cell">
                  {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                </td>
                <td className="py-2 px-2 md:px-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                      style={{ backgroundColor: runner.color }}
                    ></div>
                    <span className="text-xs md:text-sm break-words md:break-normal">{shortenUniversityName(runner.teamName)}</span>
                    <span className="hidden md:inline ml-1">{runner.teamName !== shortenUniversityName(runner.teamName) ? runner.teamName : ''}</span>
                  </div>
                </td>
                <td className="py-2 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm">
                  {removeLeadingZero(runner.time)}
                  {runner.isSectionRecord && <span className="ml-1 md:ml-2 text-orange-600 font-bold">★</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (type === 'search') {
    return (
      <ResponsiveTable
        headers={['選手', '大学', '区間', 'タイム', '区間順位']}
        rows={runners.map((runner, index) => [
          <span key={`name-${index}`}>
            {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
          </span>,
          <span key={`team-${index}`}>
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: runner.color }}></span>
            {runner.teamName}
          </span>,
          `${runner.section}区`,
          <span key={`time-${index}`}>
            {removeLeadingZero(runner.time)}
            {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★</span>}
          </span>,
          String(runner.rank)
        ])}
      />
    )
  }

  return null
}

