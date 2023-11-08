import { useEffect, memo, FC, useState } from "react"
import { Line } from '@ant-design/plots';
const App: FC<{ statekey: `mcu${string}_dz003State` & keyof Window["state_t"] }> = memo(({ statekey }) => {
  const log = window.useStore(s => s.state[statekey]?.frequency.value)
  const i18n = window.useStore(s => s.state.i18n[statekey].frequency.value);
  const [data, setdata] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const x = data.length / 2
    if (log)
      setdata(s => [
        ...s,
        {
          x,
          y: log[0],
          name: i18n[0]
        },
        {
          x,
          y: log[0],
          name: i18n[1]
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