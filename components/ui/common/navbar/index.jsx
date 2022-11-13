import { useWeb3 } from '@components/providers'
import { Button } from '@components/ui/common'
import { ActiveLink } from "@components/ui/common"
import { useAccount } from '@components/web3/hooks/useAccount'


export default function Footer() {
  const { connect, isLoading, requireInstall} = useWeb3()  
  const { account } = useAccount()
  
    return (
      <section>
        
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative" aria-label="Global">
            <div className="flex justify-between items-center">
              <div>
                <ActiveLink 
                  id="link"
                  legacyBehavior
                  href={`/`}
                >
                  <a 
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                  >
                    Home
                  </a>
                </ActiveLink>
                <ActiveLink 
                  legacyBehavior
                  id="link"
                  href={`/marketplace`}
                >
                  <a
                    className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                  >
                    Market Place
                  </a>
                </ActiveLink>
                <ActiveLink 
                  legacyBehavior
                  id="link"
                  href={`/blogs`}
                >
                  <a 
                    className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                  >Blogs 
                  </a>
                  
                </ActiveLink>
                <ActiveLink 
                  legacyBehavior
                  id="link"
                  href={`/wishlist`}
                >
                  <a 
                    className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                  >
                    Wishlist
                  </a>
                </ActiveLink>

                { isLoading ?
                  <Button
                    onClick={connect}
                  >
                    Loading ...
                  </Button> 
                  : requireInstall ?
                  <Button
                    onClick={() => window.open("https://metamask.io/download.html", "_blank")}
                  >
                    Install Metamask
                  </Button> :
                  <Button
                    onClick={connect}
                  >
                      Connected {account.isAdmin && "Admin"}
                  </Button> 
                }

              </div>
            </div>
          </nav>
        </div>
      </section>
    )
  }