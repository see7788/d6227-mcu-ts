type idInfo_t = {
     id: string;
     type: number;
     state: number;
}
export type mcu_ybl_t = [
     onSendTo: string, 
     datas: Record<string, idInfo_t>, 
     tick: number, 
     tickBig: number
]