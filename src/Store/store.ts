import { Instance, applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { useMemo } from 'react'
import { initquiz, quizmodel } from './models/model'


const Rootstore = types.model({
    quizStore:quizmodel
})
.actions(self => {
    let initialState = {}
    return {
      afterCreate: () => {
        initialState = getSnapshot(self)
      },
      reset: () => {
        applySnapshot(self, initialState)
      },
    }
  })


export type RootStoreType = Instance<typeof Rootstore>

let store: RootStoreType

export function resetStore() {
  store.reset()
}

export function initializeStore(snapshot = null) {
    const _store =
      store ??
      Rootstore.create({
        quizStore: initquiz(),
      })
    if (snapshot) {
      applySnapshot(_store, snapshot)
    }
    if (typeof window === 'undefined') {
      return _store
    }
  
    if (!store) {
      store = _store
    }
    return _store
  }
  
  export function useStore(
    initialState: null | undefined
  ): Instance<typeof Rootstore> {
    return useMemo(() => initializeStore(initialState), [initialState])
  }