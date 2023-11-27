import { useEffect, memo, FC, useState } from "react"
import { Line } from '@ant-design/plots';
import { mcu_dz003State_t, mcu_dz003StateI18n_t } from "./.t"
const App: FC<{
  config: mcu_dz003State_t;
  i18n: mcu_dz003StateI18n_t;
}> = memo(({ i18n, config }) => {
  const log = config.frequency.value
  const [data, setdata] = useState<Array<{ x: number, y: number, name: string }>>([])
  useEffect(() => {
    const x = data.length / 2
    if (log)
      setdata(s => [
        ...s,
        {
          x,
          y: log[0],
          name: i18n.frequency.value[0]
        },
        {
          x,
          y: log[0],
          name: i18n.frequency.value[1]
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