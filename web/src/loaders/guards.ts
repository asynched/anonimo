import { LoaderFunction, redirect } from 'react-router-dom'

export type Guard = () => boolean | Promise<boolean>

type WithGuardsOption = {
  guards: Guard[]
  onGuardFail: string
  loader?: LoaderFunction
}

export function withGuards({
  guards,
  onGuardFail,
  loader,
}: WithGuardsOption): LoaderFunction {
  return async (args) => {
    for (const guard of guards) {
      console.log(`[INFO] Executing guard ${guard.name}`)

      try {
        const next = await guard()

        if (!next) {
          console.log(`[INFO] Guard ${guard.name} failed`)
          return redirect(onGuardFail)
        }
      } catch (err) {
        console.log(`[INFO] Guard ${guard.name} failed`)
        return redirect(onGuardFail)
      }
    }

    if (loader) {
      return loader(args)
    }

    return {}
  }
}
