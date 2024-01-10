import { FileBox } from 'file-box'
import qrTerm from 'qrcode-terminal'
import {
    Wechaty,
    WechatyBuilder,
    Contact,//所有微信联系人（好友/非好友）都将封装为一个联系人。
    Friendship,//发送、接收好友请求和好友确认事件。
    Message,//所有微信消息都将封装为消息。
    Room,//所有微信聊天室（群）都将封装为一个聊天室。
    RoomInvitation,//接受会议室邀请
    ContactSelf,
    ScanStatus,//类是从 扩展而来的。ContactSelfContact
  } from 'wechaty'
  import {WechatyEventListenerScan,WechatyEventListenerMessage} from "wechaty/src/schemas/wechaty-events"
  import {MessageInterface} from "wechaty/src/user-modules/message"

  const log = console.trace
  //https://wechaty.js.org/docs/using-plugin-with-wechaty/overview //开发插件
  // https://wechaty.js.org/docs/howto/room  微信群操作
// https://wechaty.js.org/docs/howto/friendship 添加好友操作
// https://wechaty.js.org/docs/howto/file-box  文件收发
// https://wechaty.js.org/docs/api/friendship 好友操作api
// https://wechaty.js.org/docs/api/room 群操作api
// https://wechaty.js.org/docs/api/room-invitation 群邀请api


// 事件	login	机器人登录完全成功后发出
// 事件	logout	机器人注销后发出
// 事件	friendship	当有人向机器人发送好友请求时发出
// 事件	message	有新消息时发出
// 事件	room-join	当任何人加入任何房间时发出
// 事件	room-topic	当有人更改房间主题时发出
// 事件	room-leave	当有人离开房间时发出
// 事件	room-invite	当有房间邀请时发出
// 事件	scan	当机器人需要向您显示用于扫描的 QR 码时发出
// 方法	start(): Promise<void>	启动机器人
// 方法	stop(): Promise<void>	停止机器人
// 方法	logonoff(): boolean	机器人登录状态
// 方法	logout(): Promise<void>	注销机器人
// 方法	currentUser(): ContactSelf	获取登录机器人联系人
// 方法	say(text: string): Promise<void>	让机器人对自己说text

function api(){
    const bot = WechatyBuilder.build({
        name: 'ding-dong-bot',
        /**
         * How to set Wechaty Puppet Provider:
         *
         *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-padlocal' }`, see below)
         *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-padlocal`)
         *
         * You can use the following providers:
         *  - wechaty-puppet-wechat (no token required)
         *  - wechaty-puppet-padlocal (token required)
         *  - wechaty-puppet-service (token required, see: <https://wechaty.js.org/docs/puppet-services>)
         *  - etc. see: <https://github.com/wechaty/wechaty-puppet/wiki/Directory>
         */
        puppet: 'wechaty-puppet-wechat',
      })
      const scan:WechatyEventListenerScan=(qrcode, status) => {
        if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
          qrTerm.generate(qrcode)
          const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
          ].join('')
          log('onScan', ScanStatus[status], status, qrcodeImageUrl)
        } else {
          log('onScan', ScanStatus[status], status)
        }
        // console.info(`[${ScanStatus[status]}(${status})] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
      }
    async function onMessage(msg: Message) {
        //msg https://wechaty.js.org/docs/api/message
        //const fi = await bot.Contact.find({ name: '好友昵称' })
        // log({
        //   "发送者是否是自己":msg.self(),
        //   "发送者obj": msg.talker(),
        //   "发送者obj2": msg.from(),//https://wechaty.js.org/docs/api/contact
        //   "消息内容": msg.text(),
        //   "消息类型": msg.type(),
        //   "消息来源": msg.room(), //获取消息所在的群聊对象，如果该消息不是群聊消息则返回 null
        //   "消息日期": msg.date(),
        //   "消息链接": msg.toFileBox().toString(), // 将消息转换为文件对象并获取其字符串表示
        //   "消息联系人": await msg.mentionList(),
        //   "搜索通讯录昵称": fi,
        //   "搜索通讯录关键字": bot.Contact.findAll({ name: /j/i }),
        // //  "接收者obj": msg.to(),
        //   "转发消息": fi ? await msg.forward(fi) : "",
        //   "回复消息": msg.say(await msg.toFileBox()),
        //   "回复消息2": msg.say(FileBox.fromUrl(msg.talker().id))
        // })
        log("message", msg)
        if (msg.type() === bot.Message.Type.Attachment && msg.self()) {
          const strs = msg.text().split('元')
          if (strs.length >= 1) {
            const prices = strs[0].split('微信支付收款')
            if (prices.length >= 1) {
              const priceStr = prices[1]
              sendPayment(parseFloat(priceStr), msg.date().getTime())
            }
          }
        }
      }
}

function sendPayment(priceAmount: number, timestamp: number) {
    const options = {
      method: 'POST',
      url: 'https://api.callbackaddress.com/api/admin/callback',
      headers: { 'content-type': 'application/json', 'token': 'XXXXXX' },
      body: { 'amount': priceAmount, 'timestamp': timestamp },
      json: true
    };
  }