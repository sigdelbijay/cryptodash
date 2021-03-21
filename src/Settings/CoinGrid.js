import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import CoinTile from '../Settings/CoinTile'

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 14px;
  margin-top: 40px;
`
function getCoinsToDisplay(coinList, topSection, favourites, filteredCoins) {
  return topSection ? favourites : (filteredCoins ? Object.keys(filteredCoins) : Object.keys(coinList).slice(0, 100))
  //return topSection ?  favourites : (filteredCoins && Object.keys(filteredCoins) || Object.keys(coinList).slice(0, 100))
  
}

export default function ({topSection}) {
  return (
    <AppContext.Consumer>
      {({ coinList, favourites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favourites, filteredCoins).map(coinKey => 
            <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} >{coinKey}</CoinTile>
            )}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  )
}