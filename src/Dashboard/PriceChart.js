import ReactHighCharts from 'react-highcharts'
import HighChartsConfig from './HighchartsConfig'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'
import ChartSelect from './ChartSelect'

export default function() {
  return (
    <AppContext.Consumer>
      {({historical, changeChartSelect}) =>
        <Tile>
          <ChartSelect
            defaultValue="months"
            onChange={e => changeChartSelect(e.target.value)}
          >
            <option value="days"> Days </option>
            <option value="weeks"> Weeks </option>
            <option value="months"> Months </option>

          </ChartSelect>
          {historical
            ? <ReactHighCharts config={HighChartsConfig(historical)}/>
            : <div>Loading Historical Data</div>
          }
        </Tile>
      }
    </AppContext.Consumer>
  )
}