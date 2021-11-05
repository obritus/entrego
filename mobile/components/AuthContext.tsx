import { createContext, useContext } from 'react'

export const Contexto = createContext({})
export const useAuth = () => useContext(Contexto)
