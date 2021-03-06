import styled, { css } from 'styled-components'
const CoinImage = styled.img`
  height: 50px;
  ${props => props.spotlight && css`
    height: 200px;
    margin: auto;
    display: block;s
  `}
`

export default function ({ coin, spotlight }) {
  return <CoinImage
    alt={coin.CoinSymbol}
    spotlight={spotlight}
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
  />
}