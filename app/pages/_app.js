import React from 'react'
import { Wrapper } from '../components'
import { StateContext } from '../context/StateContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </StateContext>
  )
}

export default MyApp
