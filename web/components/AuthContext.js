import React, { useContext } from 'react'
import { setCookie, parseCookies } from 'nookies'


const AuthContext = React.createContext()

const Provider = AuthContext.Provider

export const useAuth = () => useContext(AuthContext)