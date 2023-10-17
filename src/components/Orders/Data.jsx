const SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={80}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="Pool__InboxIcon-sc-96c85f63-9 hkiMGa"
    style={{ marginTop: "2em", marginLeft: "30px", color: 'white' }}
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);


const onConnectText=(
  <p className='w3-text-white' style={{fontFamily: 'Basel,sans-serif',fontSize:'15px',fontWeight:'485',marginBottom:"15px"}}>
    Welcome to Benz Swap! Our peer-to-peer (P2P) trading platform allows 
    users to interact directly with each other, eliminating the need for intermediaries 
    and providing a seamless, trustless, and secure trading experience. 
    Connect your wallet to get started.
  </p>
)

const onFetchText=(
  <p className='w3-text-white' style={{fontFamily: 'Basel,sans-serif',fontSize:'15px',fontWeight:'485'}}>
    The 'Order List' matched with the token selected from the 
  navigation bar will be displayed on this page when you click on 
  the 'Fetch Orders' button.</p> 
)
export {SVG, onConnectText,onFetchText}