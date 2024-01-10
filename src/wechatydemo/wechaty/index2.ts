// set WECHATY_LOG=verbose
// set WECHATY_PUPPET=wechaty-puppet-wechat
const log = console.log//trace
import {
  IoClient,
  config,
  WechatyBuilder,
  ScanStatus//类是从 扩展而来的。ContactSelfContact
} from 'wechaty'

import qrTerm from 'qrcode-terminal'
const bot = WechatyBuilder.build({})
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      qrTerm.generate(qrcode)

      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')

      console.info('onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
      console.info('onScan: %s(%s)', ScanStatus[status], status)
    }
  })
  .on("login", (user) => log('login', user))
  .on('logout', (user) => log('logout', user))
  .on('message', log)
  .on("heartbeat", log)
  .on("friendship", log)
  .on("puppet", log)
  .on("ready", log)
  .on("post", log)
  .on("error", log)
  .on("stop", log)
  .on("room-invite", log)
  .on("room-join", log)
  .on("room-leave", log)
  .on("room-topic", log)
  .start()
  .then(() => log('StarterBot', 'Starter Bot Started.'))
  .catch(e => log('StarterBot', e))