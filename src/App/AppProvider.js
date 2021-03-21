import React from 'react';
import cc from 'cryptocompare'
import apiKey from '../config'
import _ from 'lodash';
cc.setApiKey(apiKey['cryptocompare-api-key'])

const MAX_FAVOURITES = 10;
export const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'dashboard',
      favourites: ['BTC', 'ETH', 'XMR'],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavourites: this.isInFavourites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite,
      confirmFavourites: this.confirmFavourites
    }
  }
  setPage = page => this.setState({ page })

  componentDidMount = () => {
    this.fetchCoins()
    this.fetchPrices()
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data
    console.log("state", this.state)
    console.log("cryptodash", localStorage.getItem('Cryptodash'))
    this.setState({coinList})
  }

  addCoin = key => {
    let favourites = [...this.state.favourites]
    if (favourites.length < MAX_FAVOURITES) {
      favourites.push(key)
      this.setState({favourites})
    }
  }

  removeCoin = key => {
    let favourites = [...this.state.favourites]
    this.setState({favourites: _.pull(favourites, key)})
    // favourites.splice(favourites.indexOf(key), 1)
    // this.setState(favourites)
  }

  isInFavourites = key => _.includes(this.state.favourites, key)
  setFilteredCoins = filteredCoins => this.setState({filteredCoins})

  savedSettings() {
    let cryptodash = JSON.parse(localStorage.getItem('Cryptodash'))
    if (!cryptodash) {
      return { page: 'settings', firstVisit: true }
    }
    let { favourites, currentFavourite } = cryptodash
    return {favourites, currentFavourite}
  }

  fetchPrices = async () => {
    if(this.state.firstVisit) return
    let prices = []
    for (let favourite of this.state.favourites) {
      try {
        let priceData = await cc.priceFull(favourite, 'USD')
        prices.push(priceData)
      } catch (e) {
        console.warn('Fetch price error: ', e)
      }
    }
    prices = prices.filter(price => Object.keys(price).length)
    this.setState({ prices })
  }

  confirmFavourites = () => {
    let currentFavourite = this.state.favourites[0]
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavourite
    }, () => {
      this.fetchPrices()
    });

    localStorage.setItem('Cryptodash', JSON.stringify({
      favourites: this.state.favourites,
      currentFavourite
    }))
  }

  setCurrentFavourite = (sym) => {
    this.setState({
      currentFavourite: sym
    })
    localStorage.setItem('Cryptodash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('Cryptodash')),
      currentFavourite: sym
    }))

  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}





//functional way
  // const [page, setPage] = useState('dashboard')
  // return (
  //   <AppContext.Provider value={page, setPage}>
  //     {props.children}
  //   </AppContext.Provider>
  // )