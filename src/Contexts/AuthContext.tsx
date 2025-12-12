import React, { createContext, useContext, useState } from 'react'

type AuthCtx = { user: { role: 'admin' | 'user' } | null; setRole: (r: 'admin' | 'user') => void }
const AuthContext = createContext<AuthCtx | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user')
  return (
    <AuthContext.Provider value={{ user: { role: userRole }, setRole: setUserRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx }