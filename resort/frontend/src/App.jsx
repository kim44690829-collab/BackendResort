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
import AdminPage2 from './Page/admin/AdminPage2'
import AdminPage3 from './Page/admin/AdminPage3'
import AdminPage4 from './Page/admin/AdminPage4'
import AdminPage5 from './Page/admin/AdminPage5'
import AdminPage6 from './Page/admin/AdminPage6'
import AdminPage7 from './Page/admin/AdminPage7'
import MemberUdate from './Page/admin/memberUpdate'
import HotelInsert from './Page/admin/HotelInsert'
import RoomInsert from './Page/admin/RoomInsert'
import RoomUpdate from './Page/admin/RoomUpdate'
import HotelUpdate from './Page/admin/HotelUpdate'
import NoticeInsert from './Page/admin/NoticeInsert'
import NoticeUpdate from './Page/admin/NoticeUpdate'
import MyPage from './Page/mypage/MyPage'
import ForgotPassword from './Page/ForgotPassword'
import ResetPassword from './Page/ResetPassword'
import Dashboard from './Page/admin/Dashboard'


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
            <Route path='/adminPage2' element={<AdminPage2 />} />
            <Route path='/adminPage3' element={<AdminPage3 />} />
            <Route path='/adminPage4' element={<AdminPage4 />} />
            <Route path='/adminPage5' element={<AdminPage5 />} />
            <Route path='/adminPage6' element={<AdminPage6 />} />
            <Route path='/adminPage7' element={<AdminPage7 />} />
            <Route path='/hotelinsert' element={<HotelInsert />} />
            <Route path='/roominsert' element={<RoomInsert />} />
            <Route path='/noticeinsert' element={<NoticeInsert />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/roomUpdate/:r_code' element={<RoomUpdate />} />
            <Route path='/hotelUpdate/:h_code' element={<HotelUpdate />} />
            <Route path='/memberUpdate/:m_code' element={<MemberUdate />} />
            <Route path='/noticeUpdate/:n_code' element={<NoticeUpdate />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ResortData>
    </Modal>
  )
}

export default App
