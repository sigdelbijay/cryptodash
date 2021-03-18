import React from 'react'
import {AppContext} from '../App/AppProvider'

export default function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) => 
        firstVisit ? <div>
          Welcome to Cryptodash, please select your favourite coins to begin.{' '}
        </div> : null
      }
    </AppContext.Consumer>
  )
}