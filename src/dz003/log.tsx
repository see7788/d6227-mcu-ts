import {  } from "react"
import { Line } from '@ant-design/plots';
import useStore from "../useStore"
export default () => {
  const data = useStore(s => s.state.dz003log)
  return <Line {...{
    data,
    smooth:true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
  }}
  />
};
