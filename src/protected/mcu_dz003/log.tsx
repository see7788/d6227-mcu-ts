import { useEffect, memo, FC, useState } from "react"
import { Line } from '@ant-design/plots';
import { dz003_configindex_t,dz003_frequency_logindex_t} from './t'
const App: FC<{ statekey: `mcu${string}_dz003State` & keyof Window["state"] }> = memo(({ statekey }) => {
  const config = window.useStore(s => s.state.mcu_dz003)!;
  const log = window.useStore(s => s.state[statekey]?.frequency.log)
  const [data, setdata] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const x = data.length / 6
    if (config && log)
      setdata(s => [
        ...s,
        {
          x,
          y: log[dz003_configindex_t.v0v1abs],
          name: "短时差值"
        },
        {
          x,
          y: config[dz003_configindex_t.v0v1abs],
          name: "短时设定"
        },
        {
          x,
          y: log[dz003_frequency_logindex_t.v0v1absLoop],
          name: "长时差值"
        },
        {
          x,
          y: config[dz003_configindex_t.v0v1absLoop],
          name: "长时设定"
        },
        {
          x,
          y: log[dz003_frequency_logindex_t.loopNumber],
          name: "长循环数值"
        },
        {
          x,
          y: config[dz003_configindex_t.loopNumber],
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
});
export default App;