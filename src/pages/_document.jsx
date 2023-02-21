import { Html, Head, Main, NextScript } from 'next/document'
import AppHeader from './components/appHeader'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <AppHeader />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
