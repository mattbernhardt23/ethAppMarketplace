import '@styles/globals.css'
import { Web3Provider } from "@components/providers"
import { BaseLayout } from '@components/ui/layout'

 

 
function MyApp({ Component, pageProps }) {
  
  return(
    <div className=''>
      <Web3Provider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Web3Provider>
    </div>
  ) 
}

export default MyApp