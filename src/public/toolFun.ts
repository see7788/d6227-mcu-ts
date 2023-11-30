type ip_t = `${number}.${number}.${number}.${number}`
export function tokenIp(ip: string): (ip_t | void) {
    const regExp = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ip && regExp.test(ip)) {
        return ip as ip_t;
    }
}