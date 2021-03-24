import ReactHighCharts from 'react-highcharts'
import HighChartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import {Tile} from '../Shared/Tile'

export default function() {
  return (
    <AppContext.Consumer>
      {({historical}) =>
        <Tile>
          {historical
            ? <ReactHighCharts config={HighChartsConfig(historical)}/>
            : <div>Loading Historical Data</div>
          }
        </Tile>
      }
    </AppContext.Consumer>
  )
}