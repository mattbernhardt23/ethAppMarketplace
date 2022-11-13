import '@styles/globals.css'
import { Web3Provider } from "@components/providers"
import { BaseLayout } from '@components/ui/layout'

 

 
function MyApp({ Component, pageProps }) {
  
  return(
    <>
      <Web3Provider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Web3Provider>
    </>
  ) 
}

export default MyApp