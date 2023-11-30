// set WECHATY_LOG=verbose
// set WECHATY_PUPPET=wechaty-puppet-wechat
const log = console.trace
import {
  Wechaty,
  WechatyBuilder,
  Contact,//所有微信联系人（好友/非好友）都将封装为一个联系人。
  Friendship,//发送、接收好友请求和好友确认事件。
  Message,//所有微信消息都将封装为消息。
  Room,//所有微信聊天室（群）都将封装为一个聊天室。
  RoomInvitation,//接受会议室邀请
  ContactSelf,
  ScanStatus//类是从 扩展而来的。ContactSelfContact
} from 'wechaty'
import qrTerm from 'qrcode-terminal'
WechatyBuilder.build({
  name: 'ding-dong-bot',
  puppet: 'wechaty-puppet-wechat',
})
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      qrTerm.generate(qrcode)
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
      log('onScan', ScanStatus[status], status, qrcodeImageUrl)
      //log(`[${ScanStatus[status]}(${status})] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
  } else {
      log('onScan', ScanStatus[status], status)
    }
  })
  .on("login", (user) => log('login', user))
  .on('logout', (user) => log('logout', user))
  .on('message', log)
 // .on("dong", c => log("dong", c))
  // .on("heartbeat", (...c) => log("heartbeat", c))
  // .on("friendship", (...c) => log("friendship", c))
  // .on("puppet", (...c) => log("puppet", c))
  // .on("ready", (...c) => log("ready", c))
  // .on("post", (...c) => log("post", c))
  // .on("error", (...c) => log("error", c))
  // .on("stop", (...c) => log("stop", c))
  // .on("room-invite", (...c) => log("room-invite", c))
  // .on("room-join", (...c) => log("room-join", c))
  // .on("room-leave", (...c) => log("room-leave", c))
  // .on("room-topic", (...c) => log("room-topic", c))
  .start()
  .then(() => log('StarterBot', 'Starter Bot Started.'))
  .catch(e => log('StarterBot', e))

