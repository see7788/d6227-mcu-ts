import { useEffect, useState } from "react"
import { Line } from '@ant-design/plots';
import useStore from "../../../../useStore"
export default () => {
  const v = useStore(s => s.dz003State?.frequency.value)
  const [log, setLog] = useState<Array<{x:number,y:number,name:string}>>([])
  useEffect(() => {
    const l = log.length / 2
    if(v)
    setLog(s => [
      ...s,
      {
        x: l,
        y: v[0],
        name: "传感器0"
      }, {
        x: l,
        y: v[1],
        name: "传感器1"
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
