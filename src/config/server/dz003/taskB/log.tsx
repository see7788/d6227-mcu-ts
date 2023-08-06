import { useEffect, useState } from "react"
import { Line } from '@ant-design/plots';
import {TaskBconfigIndex_t} from "./t"
import useStore from "../../../../useStore"
export default () => {
  const v = useStore(s => s.mcuState.dz003?.frequency.value)
  const c = useStore(s => s.mcuConfig.server.dz003.taskB)
  const [log, setLog] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const l = log.length / 6
    if (v)
      setLog(s => [
        ...s,
        {
          x: l,
          y: c[TaskBconfigIndex_t.v0v1abs],
          name: "短时差值"
        },
        {
          x: l,
          y: c[TaskBconfigIndex_t.v0v1abs],
          name: "短时设定"
        },
        {
          x: l,
          y: c[TaskBconfigIndex_t.v0v1absLoop],
          name: "长时差值"
        },
        {
          x: l,
          y: c[TaskBconfigIndex_t.v0v1absLoop],
          name: "长时设定"
        },
        {
          x: l,
          y: c[TaskBconfigIndex_t.loopNumber],
          name: "长时循环数"
        },
        {
          x: l,
          y: c[TaskBconfigIndex_t.loopNumber],
          name: "长时循环设定"
        }
      ])
  }, [v])
  return <Line {...{
    data: log,
    smooth: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
  }}
  />
};
