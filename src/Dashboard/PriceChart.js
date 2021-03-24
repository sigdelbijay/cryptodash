import ReactHighCharts from 'react-highcharts'
import HighChartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import {Tile} from '../Shared/Tile'

export default function() {
  return (
    <AppContext.Consumer>
      {({ }) =>
        <Tile>
          <ReactHighCharts config={HighChartsConfig()}/>
        </Tile>
      }
    </AppContext.Consumer>
  )
}