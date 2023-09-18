import { useEffect, useState } from "react"
import { Line } from '@ant-design/plots';
import { task_config_t, frequency_log_t } from "./t"
import useStore from "../../useStore"

export default () => {
  const config = useStore(s => s.state.mcu00_dz003)
  const log = useStore(s => s.state.mcu00_dz003_state?.frequency.log)
  const [data, setdata] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const x = data.length / 6
    if (log)
      setdata(s => [
        ...s,
        {
          x,
          y: log[task_config_t.v0v1abs],
          name: "短时差值"
        },
        {
          x,
          y: config[task_config_t.v0v1abs],
          name: "短时设定"
        },
        {
          x,
          y: log[frequency_log_t.v0v1absLoop],
          name: "长时差值"
        },
        {
          x,
          y: config[task_config_t.v0v1absLoop],
          name: "长时设定"
        },
        {
          x,
          y: log[frequency_log_t.loopNumber],
          name: "长循环数值"
        },
        {
          x,
          y: config[task_config_t.loopNumber],
          name: "长循环设定"
        }
      ])
  }, [log])
  return <Line {...{
    data,
    smooth: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
  }}
  />
};
