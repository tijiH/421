import { Html, Head, Main, NextScript } from 'next/document'
import AppHeader from './components/appHeader'
import AppFooter from './components/appFooter'

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body style={{margin: "0px"}}>
        <AppHeader/>
        <Main />
        <AppFooter/>
        <NextScript />
      </body>
    </Html>
  )
}
