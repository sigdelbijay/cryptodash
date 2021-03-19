import React from 'react'
import { AppContext } from '../App/AppProvider'
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from '../Shared/CoinImage'

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection ? () => {
    removeCoin(coinKey)
  } : () => {
    addCoin(coinKey)
  }
}

export default function ({ coinKey, topSection }) {
  return <AppContext.Consumer>
    {({ coinList, addCoin, removeCoin, isInFavourites }) => {
      let coin = coinList[coinKey]
      const TileClass = topSection ? DeletableTile : (isInFavourites(coinKey) ? DisabledTile : SelectableTile)
      
      return <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
        <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} topSection={topSection}/>
        <CoinImage coin={coin}/>
      </TileClass>

    }}
  </AppContext.Consumer>
}