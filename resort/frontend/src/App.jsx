import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import ResortData from './Api/ResortData'
import Modal from './Page/Modal'
import Header from './Common/Header'
import Login from './Common/Login'
import SignUp1 from './Page/SignUp1'
import SignUp2 from './Page/SignUp2'
import SignUp3 from './Page/SignUp3'
import Room from './Page/Room'
import Main from './Page/Main'
import Detail from './Page/Detail'
import Footer from './Common/Footer'
import Guest from './Page/Guest'
import Pay from './Page/Pay'
import Pay2 from './Page/Pay2'
import HelpCenter from './Page/HelpCenter'
import Wish from './Page/Wish'
import HotelSection from './Page/HotelSection'
import HotelSection2 from './Page/HotelSection2'
import AdminPage from './Page/admin/AdminPage'
import MyPage from './Page/mypage/MyPage'

function App() {

  return (
    
    <Modal>
      <ResortData>
         <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup1' element={<SignUp1 />}/>
            <Route path='/signup2' element={<SignUp2 />}/>
            <Route path='/signup3' element={<SignUp3 />}/>
            <Route path='/' element={<Main />} />
            <Route path='/room' element={<Room  />} />
            <Route path='/detail/:h_code' element={<Detail />}/>  
            <Route path='/guest' element={<Guest />}/>  
            <Route path='/pay' element={<Pay />}/>  
            <Route path='/pay2' element={<Pay2 />}/>  
            <Route path='/helpCenter' element={<HelpCenter />} />
            <Route path='/wish' element={<Wish />}/>
            <Route path='/hotelSection' element={<HotelSection />} />
            <Route path='/hotelSection2' element={<HotelSection2 />} />
            <Route path='/adminPage' element={<AdminPage />} />
            <Route path='/myPage' element={<MyPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ResortData>
    </Modal>
  )
}

export default App
