import React, { useState } from 'react';

export const AppContext = React.createContext()

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'dashboard',
      setPage: this.setPage
    }
  }
  setPage = page => this.setState({ page })
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
  // const [page, setPage] = useState('dashboard')
  // return (
  //   <AppContext.Provider value={page, setPage}>
  //     {props.children}
  //   </AppContext.Provider>
  // )
}