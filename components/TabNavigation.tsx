"use client"

import { TabType } from '@/types/ekiden'

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'team', label: 'チーム別成績', icon: '🏃' },
    { id: 'section', label: '区間別成績', icon: '📊' },
    { id: 'search', label: '選手検索', icon: '🔍' },
    { id: 'stats', label: '統計・記録', icon: '📈' },
  ]

  return (
    <div className="bg-white border-b sticky top-20 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div
          role="tablist"
          aria-label="大会成績表示モード"
          className="flex border-b border-gray-200 overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  const currentIndex = tabs.findIndex(t => t.id === tab.id)
                  const nextTab = tabs[(currentIndex + 1) % tabs.length]
                  onTabChange(nextTab.id)
                } else if (e.key === 'ArrowLeft') {
                  const currentIndex = tabs.findIndex(t => t.id === tab.id)
                  const prevTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length]
                  onTabChange(prevTab.id)
                }
              }}
              className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface TabPanelProps {
  id: TabType
  activeTab: TabType
  children: React.ReactNode
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={activeTab !== id}
      className={activeTab === id ? 'block' : 'hidden'}
    >
      {children}
    </div>
  )
}

