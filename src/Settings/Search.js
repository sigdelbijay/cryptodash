import styled from 'styled-components'
import { backgroundColor2, fontSize1, fontSize2 } from '../Shared/Styles'
import { AppContext } from '../App/AppProvider'
import _ from 'lodash'
import fuzzy from 'fuzzy'

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`
const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  color: #1163c9;
  border: 1px solid;
  height: 25px;
  place-self: center left;
`
const handleFilter = _.debounce((inputValue, setFilteredCoins, coinList) => {
  //get coin symbols
  let coinSymbols = Object.keys(coinList)
  //get coin names
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)

  let allStringsToSearch = coinSymbols.concat(coinNames)
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string)
  
  let filteredCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName
    return(_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)) 
  })
  setFilteredCoins(filteredCoins)

}, 500)

function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null)
    return
  }
  handleFilter(inputValue, setFilteredCoins, coinList)
}

export default function () {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) =>
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}></SearchInput>
        </SearchGrid>
      }
    </AppContext.Consumer>
  )
}