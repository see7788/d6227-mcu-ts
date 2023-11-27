
import { name, version } from "../../package.json"
import { md5 } from "js-md5"
import {
    mcu_dz003_t, mcu_dz003I18n_t, mcu_dz003I18n,
    mcu_dz003State_t, mcu_dz003StateI18n_t, mcu_dz003StateI18n
} from "../protected/mcu_dz003/.t";
import { mcu_base_t, mcu_baseI18n_t, mcu_baseI18n } from "../protected/mcu_base/.t"
import {
    mcu_net_t, mcu_netI18n_t, mcu_netI18n,
    mcu_net_useI18n_t, mcu_net_useI18n
} from "../protected/mcu_net/.t"
import { mcu_state_t, mcu_stateI18n_t, mcu_stateI18n } from "../protected/mcu_state/.t"
import { mcu_serial_t, mcu_serialI18n_t, mcu_serialI18n } from "../protected/mcu_serial/.t"
import { mcu_ybl_t, mcu_yblI18n_t, mcu_yblI18n } from "../protected/mcu_ybl/.t"
import {
    mcu_webPageServer_t, mcu_webPageServerI18n_t, mcu_webPageServerI18n,
    mcu_wsServer_t, mcu_wsServerI18n_t, mcu_wsServerI18n,
    mcu_esServer_t, mcu_esServerI18n_t, mcu_esServerI18n
} from "../protected/mcu_webServer/.t"
export interface configBase_t {
    mcu_dz003: mcu_dz003_t;
    mcu_base: mcu_base_t;
    mcu_net: mcu_net_t;
    mcu_serial: mcu_serial_t;
    mcu_ybl: mcu_ybl_t;
    mcu_webPageServer: mcu_webPageServer_t;
    mcu_esServer: mcu_esServer_t;
    mcu_wsServer: mcu_wsServer_t;
}
export const configBase: configBase_t = {
    mcu_base: [name, version, "mcu00", "mcu_serial", md5([name, version, "mcu00"].join("."))],
    mcu_serial: ["mcu_serial", 115200, "\n"],
    mcu_net: ["eth", ["apname"], ["shuzijia", "80508833"]],
    mcu_ybl: ["mcu_serial", {}, 500, 500000],
    mcu_dz003: [3000, 100, 10000, 1000, "mcu_serial"],
    mcu_webPageServer: ["http://1.com"],
    mcu_esServer: ["/es"],
    mcu_wsServer: ["/ws", "mcu_serial"],
}
interface i18n_t{
    mcu_dz003I18n: mcu_dz003I18n_t;
    mcu_dz003StateI18n: mcu_dz003StateI18n_t;
    mcu_baseI18n: mcu_baseI18n_t;
    mcu_netI18n: mcu_netI18n_t;
    mcu_stateI18n: mcu_stateI18n_t;
    mcu_serialI18n: mcu_serialI18n_t;
    mcu_yblI18n: mcu_yblI18n_t;
    mcu_webPageServerI18n: mcu_webPageServerI18n_t;
    mcu_wsServerI18n: mcu_wsServerI18n_t;
    mcu_esServerI18n: mcu_esServerI18n_t
}
export const i18n:i18n_t={
    mcu_dz003I18n,
    mcu_dz003StateI18n,
    mcu_baseI18n,
    mcu_netI18n,
    mcu_stateI18n,
    mcu_serialI18n,
    mcu_yblI18n,
    mcu_webPageServerI18n,
    mcu_wsServerI18n,
    mcu_esServerI18n
}
export interface state_t extends Partial<configBase_t> ,i18n_t{
    mcu_dz003State?: mcu_dz003State_t
    mcu_state?: mcu_state_t
}
//console.log(md5([name, version, "mcu00"].join(".")))
