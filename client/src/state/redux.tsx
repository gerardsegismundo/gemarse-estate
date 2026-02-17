'use client'

import { useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import globalReducer from '@/state'
import { api } from '@/state/api'

//  Combine reducers
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
})

// Create store factory
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}

// Types for the store
export type RootReducer = typeof rootReducer
export type RootState = ReturnType<RootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Provider wrapper
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    setupListeners(storeRef.current.dispatch)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
