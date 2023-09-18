export enum task_config_t {
    'sendTo_name' = 0,//转发方式
    'v0v1abs',//单次差值关阀值
    'v0v1absLoop',//累次差值关阀值
    'loopNumber',//设定次数
    'set0tick',//设定间隔
}
export enum frequency_log_t {
    'v0v1abs',//单次差值关阀值
    'v0v1absLoop',//累次差值关阀值
    'loopNumber',//设定次数
}
export const frequency_logdef = [0, 0, 0];