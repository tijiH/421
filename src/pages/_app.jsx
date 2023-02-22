import '@/styles/globals.css'
import "/node_modules/primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
