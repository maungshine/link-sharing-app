'use client'
import { Link } from "@prisma/client"
import { createContext } from "react"


export const DataContext = createContext<Link[] | null>(null)

function DataProvider({children, value}: {children: React.ReactNode, value: Link[] | null}) {
  return (
   <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider