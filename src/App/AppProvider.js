import React from 'react';
import cc from 'cryptocompare'
import apiKey from '../config'
cc.setApiKey(apiKey['cryptocompare-api-key'])

export const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(),
      setPage: this.setPage,
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

  savedSettings() {
    let cryptodash = JSON.parse(localStorage.getItem('Cryptodash'))
    if (!cryptodash) {
      return { page: 'settings', firstVisit: true }
    }
    return {}
  }

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('Cryptodash', JSON.stringify({
      test: 'hello'
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