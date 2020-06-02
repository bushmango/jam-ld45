import * as midboss from 'midboss'

const registeredSoss: string[] = []

export function createSos<T>(
  sosKey: string,
  version: string,
  initialState: T,
  options?: {
    useLocalStorage?: boolean
    localStorageFields?: (keyof T)[]
  },
) {
  // This is bugged but old code
  // if (registeredSoss[sosKey]) {
  //   throw new Error(
  //     `This sos key is already registered! Please use a unique one for your sos. ${sosKey}`,
  //   )
  // }
  registeredSoss.push(sosKey)

  if (!options) {
    options = {
      useLocalStorage: true,
    }
  }
  if (options.useLocalStorage !== false) {
    options.useLocalStorage = true
  }

  const stateManager = midboss.createMidboss(sosKey, version, initialState, {
    useLocalStorage: options.useLocalStorage,
    localStorageFields: options.localStorageFields,
  })
  const useSubscribe = () => midboss.useSubscription(stateManager)
  return { stateManager, useSubscribe }
}
