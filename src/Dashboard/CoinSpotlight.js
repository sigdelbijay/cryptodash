import styled from 'styled-components'
import { AppContext } from "../App/AppProvider";
import { Tile } from '../Shared/Tile'
import CoinImage from '../Shared/CoinImage'

const SpotLightName = styled.h2`
  text-align: center;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({ currentFavourite, coinList }) => 
        <Tile>
          <SpotLightName>{coinList[currentFavourite].CoinName}</SpotLightName>
          <CoinImage spotlight coin={coinList[currentFavourite]}/>
        </Tile>
      }
    </AppContext.Consumer>
  )
}