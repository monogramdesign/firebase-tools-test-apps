import type { ComponentType, ReactNode } from "react"
import { createContext } from "react"

export type ContextValue = {
  dateNow: number
  dateString: string
  number: number
}

export const INITIAL_CONTEXT_VALUE = {
  dateNow: Date.now(),
  dateString: new Date().toString(),
  number: 0,
}

export const Context = createContext<ContextValue>(INITIAL_CONTEXT_VALUE)

export const withContext = <P extends object>(Component: ComponentType<P>) =>
  function ContextWrapper({
    children,
    ...props
  }: {
    children: ReactNode
    props?: Record<string, unknown>
  }) {
    return (
      <Context.Provider value={INITIAL_CONTEXT_VALUE}>
        <Component {...(props as P)}>{children}</Component>
      </Context.Provider>
    )
  }
