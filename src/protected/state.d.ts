export type stateKey_t<T extends string> = (T|`${T}_${string}`)&keyof Window["state_t"]
