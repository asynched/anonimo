import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export function useObservable<T>(observable: BehaviorSubject<T>) {
  const [state, setState] = useState(observable.value)

  useEffect(() => {
    const subscription = observable.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [observable])

  return state
}
