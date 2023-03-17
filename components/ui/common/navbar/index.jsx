import { useWeb3 } from "@components/providers";
import React from "react";
import { ActiveLink, Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";



const NavItem = ({ item, index }) => {
  return (
    <li
      className={`${
        index == 0 ? "pr-4" : "px-4"
      } font-medium text-md sm:text-xl text-cyan-700 hover:text-cyan-900`}
    >
      <ActiveLink href={item.href}>
        <a>{item.value}</a>
      </ActiveLink>
    </li>
  );
};

export default function Navbar({ items }) {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  // const { pathname } = useRouter();

  return (
    <section>
      <div className="py-6 sm:px-6 lg:px-8 z-20w-full mx-auto mb-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col sm:flex-row justify-between items-center">
      
              <div>
              <ol className="px-8 flex leading-none text-cyan-600 divide-x divide-cyan-400">
                {items.map((item, i) => (
                  <React.Fragment key={item.href}>
                      <NavItem item={item} index={i} />
                  </React.Fragment>
                ))}
              </ol>
              </div>

              <div className="flex flex-end text-md md:text-xl pt-4 md:pt-0">
              {isLoading ? (
                <div className="font-medium sm:mr-8  text-cyan-600">
                Connecting... 
              </div>
              ) : account.data ? (
                  <div className="font-medium sm:mr-8  text-cyan-500">
                    Account Connected
                  </div>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
              
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
