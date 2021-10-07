import { createContext, useContext } from 'react'

export type ConfigContextType = { title: string, setTitle: (c:string) => void }
export const ConfigContext = createContext<ConfigContextType>({ title: '', setTitle: () => {} })
export const useConfigContext = () => useContext(ConfigContext)