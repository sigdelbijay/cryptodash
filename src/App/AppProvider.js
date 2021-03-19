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
      confirmFavourites: this.confirmFavourites
    }
  }
  setPage = page => this.setState({ page })

  componentDidMount = () => {
    this.fetchCoins()
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data
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

  savedSettings() {
    let cryptodash = JSON.parse(localStorage.getItem('Cryptodash'))
    if (!cryptodash) {
      return { page: 'settings', firstVisit: true }
    }
    let { favourites } = cryptodash
    return {favourites}
  }

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('Cryptodash', JSON.stringify({favourites: this.state.favourites}))
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