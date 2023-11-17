export type stateKey_t<T extends
    "mcu_serial" |
    "mcu_base" |
    "mcu_state" |
    "mcu_net" |
    "mcu_ybl" |
    "mcu_dz003" |
    "mcu_dz003State"|
    "mcu_wsServer"|
    "mcu_esServer"|
    "mcu_webPageServer"
> = (T | `${T}_${string}`) & keyof Window["state_t"]