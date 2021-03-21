import styled, { css } from 'styled-components'
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles'
import { SelectableTile } from '../Shared/Tile'
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid'
import { AppContext } from '../App/AppProvider'

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    ${fontSize3};
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
  `}

  ${props => props.currentFavourite && css`
    ${greenBoxShadow};
    pointer-events: none;
  `}
`
const JustifyRight = styled.div`
  justify-self: right;
`
const JustifyLeft = styled.div`
  justify-self: left;
`
const TickerPrice = styled.div`
  ${fontSizeBig};
`
const PctChange = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`
const numberFormat = number => +(number + '').slice(0,7)

function PriceTile({ sym, data, currentFavourite, setCurrentFavourite}) {
  return (
    <PriceTileStyled currentFavourite={currentFavourite} onClick={setCurrentFavourite}>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <JustifyRight>
          <PctChange red={data.CHANGEPCT24HOUR < 0}>
            {numberFormat(data.CHANGEPCT24HOUR)}
          </PctChange>
        </JustifyRight>
      </CoinHeaderGridStyled>
      <TickerPrice>
        {numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

function PriceTileCompact({ sym, data, currentFavourite, setCurrentFavourite }) {
  return (
    <PriceTileStyled compact currentFavourite={currentFavourite} onClick={setCurrentFavourite}>
      <JustifyLeft>{sym}</JustifyLeft>
      <PctChange red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </PctChange> 
      <div>{numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  )
}

export default function ({ price, index }) {
  let sym = Object.keys(price)[0]
  let data = price[sym]['USD']
  let TileClass = index < 5 ? PriceTile : PriceTileCompact
  return (
    <AppContext.Consumer>
      {({ currentFavourite, setCurrentFavourite }) => 
        <TileClass
          sym={sym}
          data={data}
          currentFavourite={currentFavourite === sym}
          setCurrentFavourite={() => setCurrentFavourite(sym)}
        />
      }
    </AppContext.Consumer>
  )
}