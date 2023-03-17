
const content = {
  whyBlockchain: [
    "Listen up, people! We're using blockchain technology on this site, and let me tell you, it's the best thing since sliced bread. Not only is it secure and transparent, but it's also decentralized, which means no one's pulling the strings behind the scenes. And let's be honest, who wants to deal with middlemen and their pesky fees? Not us, and not you either.",
    "But wait, there's more! The blockchain is immune to censorship, so no one can stop you from doing what you want to do on this site. And it's accessible to anyone with an internet connection, so you can connect with people from all over the world. Plus, it's fast and efficient, so you can make transactions in real-time. And who doesn't want to save time and money?",
    "So, my friends, get excited about using blockchain on this site. It's the future of transactions, and we're thrilled to be at the forefront of it. Let's say goodbye to outdated payment systems and hello to a more secure, transparent, and efficient way of doing things. Join us on this journey, and let's make blockchain the norm."
  ],
  connectingWallet: ["Alright, folks, we're talking crypto wallets now, and if you're not already using one, you're missing out. A crypto wallet is essentially a digital wallet that allows you to store, send, and receive cryptocurrencies like Bitcoin, Ethereum, and more. And the best part? It's easy to use and completely secure.",

  "Now, we're currently using MetaMask as our preferred wallet on this site, and let me tell you, it's the bee's knees. With MetaMask, you can easily connect to our site and make transactions with just a few clicks. And because it's a browser extension, you can use it on any device without having to download anything.",
  
  "But that's not all. MetaMask is also one of the most secure wallets out there, with features like two-factor authentication and seed phrase backups to protect your assets. Plus, it's constantly updating and improving to stay ahead of any potential threats.",
  
  "So, if you're ready to take your crypto game to the next level, give MetaMask a try. It's the perfect companion for our site and will make your transactions smoother and more secure than ever before. Let's embrace the power of crypto wallets and take control of our financial futures.",],
  getEther:[
    "Alright, folks, so you want to get your hands on some Ether (ETH)? Well, you're in luck because it's easier than you might think. The first thing you'll need is a crypto wallet, like MetaMask, which we just talked about. Once you've got that set up, you're ready to go.",

    "The most common way to get Ether is to purchase it on a cryptocurrency exchange. Some popular options include Coinbase, Binance, and Kraken, among others. You can usually buy Ether using a credit card or bank transfer, and the process is pretty straightforward.",
    
    "But, if you prefer to avoid exchanges, you can also earn Ether by providing goods or services to others in exchange for it. This is known as \"mining\" or \"staking,\" and it involves contributing computational power to the Ethereum network in exchange for rewards."
  ]
}



export default function LearnMore({courses}) {
  
  return (  
    <div>
      <div>
        <div className='h-[40vh] bg-cyan-900 flex flex-col items-center'>
          <h1 className="text-[#F0CF90] text-7xl font-bold mx-auto my-4">Learn More</h1>
          <div className='arrow-down bg-[#F0CF90] h-full w-1/4'></div>
        </div>
        <div className="h-[40vh] bg-cyan-900 clip-elipse-top">

        </div>
      </div>
      <div className='flex flex-col items-center w-full' >
      <div className='flex flex-col items-center w-3/4' >
          <div>
            <h2 className="text-cyan-900 text-2xl font-bold my-4">
              Why Blockchain?
            </h2>
            {content.whyBlockchain.map((item) => (
              <p className="text-cyan-600 text-lg font-semibold my-4">
                {item}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-cyan-900 text-2xl font-bold my-4">What's a Wallet?</h2>
          {content.connectingWallet.map((item) => (
              <p className="text-cyan-600 text-lg font-semibold my-4">
                {item}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-cyan-900 text-2xl font-bold my-4">
              How Can I Get Some Eth?
            </h2>
          {content.getEther.map((item) => (
              <p className="text-cyan-600 text-lg font-semibold my-4">
                {item}
              </p>
            ))}
          </div>
      </div> 
      </div>   
    </div>
     )
}

