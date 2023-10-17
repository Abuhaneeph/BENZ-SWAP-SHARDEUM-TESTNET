import { useState,useEffect,useContext } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './components/Navigation/Nav'
import Header from './layouts/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Peer from '../pages/Peer/Peer';
import BottomBar from './components/Navigation/BottomBar';
import Faucet from '../pages/Faucet/Faucet';
import Swap from '../pages/Swap/Swap';
import Loading from './components/Loading/Loading';
import { UserContext } from '../ContextProvider/ContextProvider';
import LiquidityHome from '../pages/Liquidity/LiquidityHome';
import Pool from '../pages/Pools/Pool';
import Orders from '../pages/Orders/Orders';
import './App.css'
function App() {
 const{loading,setLoading}=useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setLoading(false)
    }, 1000); // Adjust the delay as needed
  }, []);

  return (
    <>
  
    <Header/>
  
   <BrowserRouter>

   {isLoading ? (
        <Loading />
      ) : (
      <Routes>
        
          <Route path='/' index element={<Home/>} />
          
          <Route path='/orders' element={<Orders/>}/>
          <Route path="/p2p" element={<Peer/>} />

          <Route path="/faucet" element={<Faucet/>} />

          <Route path="/swap" element={<Swap/>} />

          <Route path="/liquidity" element={<LiquidityHome/>} />

          <Route path="/pool" element={<Pool/>} />

          
         
      </Routes>
      )}
    </BrowserRouter>
    <BottomBar/>
   
    </>
  )
}

export default App
