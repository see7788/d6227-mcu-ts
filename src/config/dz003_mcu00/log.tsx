import { useEffect, useState } from "react"
import { Line } from '@ant-design/plots';
import { task_config_t } from "./t"
import useStore from "../../useStore"
enum frequency_log_t {
  'v0v1abs',//单次差值关阀值
  'v0v1absLoop',//累次差值关阀值
  'loopNumber',//设定次数
}
export default () => {
  const v = useStore(s => s.state.dz003_mcu00?.frequency.value)
  const config = useStore(s => s.config.dz003_mcu00)
  const log = useStore(s => s.state.dz003_mcu00?.frequency.log)
  const [data, setdata] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const l = data.length / 6
    if (config)
      setdata(s => [
        ...s,
        {
          x: l,
          y: log?log[task_config_t.v0v1abs]:0,
          name: "短时差值"
        },
        {
          x: l,
          y: config[task_config_t.v0v1abs],
          name: "短时设定"
        },
        {
          x: l,
          y: log?log[frequency_log_t.v0v1absLoop]:0,
          name: "长时差值"
        },
        {
          x: l,
          y: config[task_config_t.v0v1absLoop],
          name: "长时设定"
        },
        {
          x: l,
          y: log?log[frequency_log_t.loopNumber]:0,
          name: "长循环数值"
        },
        {
          x: l,
          y: config[task_config_t.loopNumber],
          name: "长循环设定"
        }
      ])
  }, [v])
  return <Line {...{
    data,
    smooth: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
  }}
  />
};
