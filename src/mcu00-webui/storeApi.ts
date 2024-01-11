import { dz003StateReqParam } from "@ui/mcu_dz003/.t"
import { config_t, i18n_t, state_t } from "./config"
export type api_t =
    ((...op: ["i18n_get"]) => Promise<["set", Pick<state_t, "i18n">]>) |
    ((...op: ["i18n_set", i18n_t]) => Promise<["set", Pick<state_t, "i18n">]>) |
    ((...op: ["mcu_state_get"]) => Promise<["set",Pick<state_t, "mcu_state">]>) |
    ((...op: ["config_get"]) => Promise<["config_set", config_t]>) |
    ((...op: ["config_set", Pick<config_t, keyof config_t> | Partial<config_t>]) => Promise<["config_set", config_t]>) |
    // ((...op: ["config_set", Pick<config_t, keyof config_t>]) => Promise<["config_set", config_t]>) |
    // ((...op: ["config_set", Partial<config_t>]) => Promise<["config_set", config_t]>) |
    ((...op: ["config_toFileRestart", Partial<config_t>]) => Promise<["config_set", config_t]>) |
    ((...op: ["config_fromFileRestart"]) => Promise<["config_set", config_t]>) |
    ((...op: dz003StateReqParam) => Promise<["mcu_dz003State_set", Pick<state_t, "mcu_dz003State">]>) |
    ((...op: ["i18n_Subscriber"]) => Promise<["set", Pick<state_t, "i18n">]>) |
    ((...op: ["mcu_dz003State_Subscriber"]) => Promise<["mcu_dz003State_set", Pick<state_t, "mcu_dz003State">]>) |
    ((...op: ["mcu_state_Subscriber"]) => Promise<["set",Pick<state_t, "mcu_state">]>);
// export type reqParam_t =
//     ["i18n_get"] |
//     ["i18n_set", i18n_t] |
//     ["mcu_state_get"] |
//     ["config_get"] |
//     ["config_set", Pick<config_t, keyof config_t> | Partial<config_t>] |
//     ["config_toFileRestart", Partial<config_t>] |
//     ["config_fromFileRestart"] |
//     dz003StateReqParam