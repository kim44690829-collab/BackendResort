import '../Page/Guest.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { ModalContext } from './Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Guest(){
    const navigate = useNavigate();
    const {setHeaderChange} = useContext(ResortDataContext);
    const {toggle,setModalContent} = useContext(ModalContext);

    // 이메일, 비밀번호 저장 상태변수
    const [reservationNum, setReservationNum] = useState('')
    const [isDisabledGuest, setIsDisabledGuest] = useState(true);

    // 휴대폰 번호 상태저장 변수
    const [guestNumFront, setGuestNumFront] = useState('');
    const [guestNumBack, setGuestNumBack] = useState('');

    // 예약조회 모달
    const [modalOpen, setModalOpen] = useState(false);

    // axios로 가져온 데이터 보관
    const [guestData , setGuestData] = useState(null);
    const [guestUpdateResult, setGuestUpdateResult] = useState(null);

    // 이메일, 비밀번호 onchange
    const reservationHandeler = (e) => {
        const reservationValue = e.target.value
        setReservationNum(reservationValue)
    }

    // 회원 예약 조회로 변경 클릭시 로그인 화면으로 전환 -> 해더 변경
    const loginGo = () => {
        navigate('/login');
        setHeaderChange(2);
    }

    // 마우스 커서 변경
    const [mouseCursor, setMouseCursor] = useState(false);

    // 예약번호, 휴대폰 번호 조건
    useEffect(() => {
        if(guestNumFront.length === 4 &&  guestNumBack.length === 4){
            setIsDisabledGuest(false)
            setMouseCursor(true)
        }else{
            setIsDisabledGuest(true)
            setMouseCursor(false)
        }
    },[reservationNum, guestNumFront, guestNumBack])

    const guestRes = async () => {
        
        try{
            const res = await axios.put("/api/guestResUpdate", null, {
                params : {
                    reservation_no : reservationNum,
                    g_phone : `010${guestNumFront}${guestNumBack}`,
                }
            })
            console.log("비회원 정보 수정용 : ", res.data)
            setGuestUpdateResult(res.data)
            const res2 = await axios.get("/api/guestResSelect", {
                params : {
                    reservation_no : reservationNum
                }
            })
            console.log("비회원 있어? : ", res2.data)
            if(res.data === 1 || res2.data === -1){
                console.log("예약정보 없음")
                setGuestData(null);
                setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>예약 정보가 없습니다.</p>)
                toggle();
                setGuestUpdateResult(null)
                setGuestNumFront('');
                setGuestNumBack('');
                setReservationNum('');
            }
            if(res.data === 0){
                console.log("현재 존재하는 예약 번호")
                const res02 = await axios.get("/api/reservationGuest", {
                    params : {
                        reservation_no : reservationNum,
                        g_phone : `010${guestNumFront}${guestNumBack}`,
                    }
                })
                console.log("비회원 정보 수정용2 : ", res02.data)
                setGuestData(res02.data);
            }
            if(res.data === -1){
                setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>예약 번호 혹은 핸드폰 번호를 확인해주세요.</p>)
                toggle();
                setGuestUpdateResult(null)
                setGuestData(null);
                setGuestNumFront('');
                setGuestNumBack('');
                setReservationNum('');
            }
            setModalOpen(true);
            
        }catch(err){
            console.error(err)
            setGuestData(null);
            alert("조회 실패")
        }
        
    }
    
    const res_at02 = new Date(guestData?.reserved_at).toLocaleDateString("sv-SE");
    const chkInDate02 = new Date(guestData?.check_in_date)
    const chkOutDate02 = new Date(guestData?.check_out_date)

    const totalDay02 = (chkOutDate02.getTime()-chkInDate02.getTime())/(1000*24*60*60);

    return(
        <div className="Guest_container">
            <h2 className='Guest_title'>비회원 예약조회</h2>
            {/* 비회원 form */}
            <div className='Guest_form'>
                {/* 예약번호 */}
                <label htmlFor="reservation_no">
                    예약번호<span style={{color:'red'}}>*</span>
                </label>
                <input type="text" 
                id="reservation_no"
                name="reservation_no"
                placeholder='예약번호를 입력해주세요'
                value={reservationNum}
                onChange={reservationHandeler}
                />
                <p className='guestIdInfo'>이메일, 알림톡, 또는 문자로 전송된 예약 번호를 입력해주세요.</p>

                {/* 휴대폰 번호 */}
                <label>
                    휴대폰 번호<span style={{color:'red'}}>*</span>
                </label>
                <div className='guestPhone'>
                    <input type='text' id='guesttel' name='g_phone' value='010' disabled style={{color:'black'}}/> <span>-</span>
                    <input type='text' id='guesttelFront' name='g_phone' placeholder='1234' value={guestNumFront} onChange={(e) => setGuestNumFront(e.target.value)} maxLength={4} /><span>-</span>
                    <input type='text' id='guesttelBack' name='g_phone' placeholder='5678' value={guestNumBack} onChange={(e) => setGuestNumBack(e.target.value)} maxLength={4} />
                </div>
                {/* 인증번호 */}
                <button type="button" 
                className='guestBtn'
                disabled={isDisabledGuest} 
                onClick={guestRes}
                style={{
                    cursor:mouseCursor? 'pointer' : 'not-allowed',
                    backgroundColor:mouseCursor? '#42799b' : '#e7e7e7ff',
                    color:mouseCursor? '#fff': '#a5a5a5ff'
                }} >예약 조회</button>
            </div>
            { modalOpen && (guestUpdateResult === 0 ? 
            (
            <div className="Guest_modal_overlay">
                <div className="Guest_modal">
                    <h2 className="Guest_title">예약 정보</h2>
                    <table className="Guest_table">
                        <tbody>
                            <tr>
                                <td className="Guest_list">호텔</td>
                                <td className="Guest_list">{guestData?.hotelName}</td>
                            </tr>
                            <tr>
                                <td className="Guest_list">객실</td>
                                <td className="Guest_list">{guestData?.roomName}</td>
                            </tr>
                            <tr>
                                <td className="Guest_list">체크인/체크아웃</td>
                                <td className="Guest_list">{guestData?.check_in_date} ~ {guestData?.check_out_date}</td>
                                <td className="Guest_list">총 {totalDay02}박</td>
                                <td className="Guest_list"></td>
                            </tr>
                            <tr>
                                <td className="Guest_list">결제 금액</td>
                                <td className="Guest_list">{(guestData?.final_price ?? 0).toLocaleString()}원</td>
                            </tr>
                            <tr>
                                <td className="Guest_list">예약자</td>
                                <td className="Guest_list">{guestData?.booker_name} 님</td>
                            </tr>
                            <tr>
                                <td className="Guest_list">예약일</td>
                                <td className="Guest_list">{res_at02}</td>
                            </tr>
                            <tr>
                                <td className="Guest_list">예약번호</td>
                                <td className="Guest_list">{guestData?.reservation_no}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="Guest_btns">
                        <Link to={'/'} onClick={() => {setModalOpen(false); setHeaderChange(0)}}>
                            <button className="Guest__btn move_main" type="button">홈으로 이동</button>
                        </Link>
                    </div>
                </div>
            </div>
            ) 
            : '')}
            {/* 회원이라면 로그인 */}
            <div className='LoginGo' onClick={loginGo}>
                <p>회원 예약은 로그인 후 조회할 수 있어요</p>
                <button type="button" className='userLogin'>로그인하기</button>
            </div>
        </div>
    )
}