'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ExternalApiAlias } from '@/lib/external-api'
import { Settings } from 'lucide-react'

const STORAGE_KEY = 'external-api-alias'

// Don't allow dev/local to access production
const DEV_EXTERNAL_API_LABELS: Record<Exclude<ExternalApiAlias, 'axonmd'>, string> = {
  ocipmsqa: 'OCIPMS QA',
  ocicliniqpp: 'OCICliniq PP',
}

const EXTERNAL_API_LABELS: Record<ExternalApiAlias, string> = {
  axonmd: 'AxonMD (Production)',
  ...DEV_EXTERNAL_API_LABELS,
}

function isDevLikeEnv(): boolean {
  if (typeof window === 'undefined') return false
  const runtimeEnv = process.env.NEXT_PUBLIC_RUNTIME_ENV
  return runtimeEnv === 'dev' || runtimeEnv === 'local'
}

const ExternalApiContext = React.createContext<{
  alias: ExternalApiAlias | null
  setAlias: (alias: ExternalApiAlias) => void
}>({
  alias: null,
  setAlias: () => {},
})

export function ExternalApiProvider({ children }: { children: React.ReactNode }) {
  const [alias, setAliasState] = React.useState<ExternalApiAlias | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as ExternalApiAlias | null
      // Don't allow dev/local to select production endpoint
      if (stored && stored !== 'axonmd' && DEV_EXTERNAL_API_LABELS[stored as Exclude<ExternalApiAlias, 'axonmd'>]) {
        setAliasState(stored)
      }
    }
  }, [])

  const setAlias = React.useCallback((newAlias: ExternalApiAlias) => {
    setAliasState(newAlias)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newAlias)
    }
  }, [])

  return (
    <ExternalApiContext.Provider value={{ alias, setAlias }}>
      {children}
    </ExternalApiContext.Provider>
  )
}

export function useExternalApiHeader(): Record<string, string> {
  const { alias } = React.useContext(ExternalApiContext)
  if (!alias) return {}
  return { 'x-external-api': alias }
}

export function ExternalApiSwitcher() {
  const { alias, setAlias } = React.useContext(ExternalApiContext)
  const [isOpen, setIsOpen] = React.useState(false)

  if (!isDevLikeEnv()) {
    return null
  }

  const currentAlias = (alias && alias !== 'axonmd' ? alias : 'ocipmsqa') as Exclude<ExternalApiAlias, 'axonmd'>

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-xl shadow-2xl p-4 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <h3 className="text-sm font-medium text-gray-700">API Environment</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Select
            value={currentAlias}
            onValueChange={(value) => {
              setAlias(value as ExternalApiAlias)
            }}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(DEV_EXTERNAL_API_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span className="font-medium">Active:</span>
            <span className="text-gray-700">{DEV_EXTERNAL_API_LABELS[currentAlias]}</span>
          </p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          title="Switch API Environment"
          aria-label="Switch API Environment"
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}
    </div>
  )
}
