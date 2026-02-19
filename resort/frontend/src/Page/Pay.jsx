import { useState,useEffect } from "react";
import '../Page/pay.css'
import { useContext } from "react";
import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";
import { ModalContext } from './Modal';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Pay(){

    const {payHead,setPayHead,hotelNum, HotelData,RoomData,DayData,customer,setCustomer} = useContext(ResortDataContext)
    const navigate = useNavigate();
    
    const {toggle,setModalContent,AddressCopy, AddressCopyClick} = useContext(ModalContext);
    //전체 동의 변수
    const [chking,setchking] = useState([{id:1,state:false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])
    //예약내역 확인창 변수
    const [open,setOpen] = useState(false)
    //방정보
    // const myRoom = RoomData.filter((f)=>f.r_code===payRoom)
    const myRoom = RoomData.filter((f)=>f.r_code===hotelNum)
    //방에 해당하는 호텔 정보
    const roomprice = HotelData.filter((f)=>f.h_code === myRoom[0].h_code)
    // 고객 전화번호
    const [phone,setPhone] = useState('')
    //전체 선택 함수
    const chkAllHandler=()=>{
        if(chking[0].state===false){
            setchking([{id:1,state:true},{id:2,state:true},{id:3,state:true},{id:4,state:true},{id:5,state:true}])
        }else{
            setchking([{id:1,state:false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])
        }
    }
    //결제 수단 선택
    const [btnNum,setBtnNum] = useState(0)
    //개별 선택 함수
    const chkHandler=(num)=>{
        const chkingCopy = [...chking]
        // num 번호에 때라 input 체크 상태 변환
        if(num===1 && chking[1].state===false){
            chkingCopy[1].state=true
            // 전부 선택시 전체선택 활성화 조건
            if(chkingCopy[1].state===true && chkingCopy[2].state===true && chkingCopy[3].state===true &&chkingCopy[4].state===true){
                chking[0].state=true
            }
            setchking(chkingCopy)
        }else if(num===1 && chking[1].state===true){
            chkingCopy[0].state=false
            chkingCopy[1].state=false
            setchking(chkingCopy)
        }else if(num===2 && chking[2].state===false){
            chkingCopy[2].state=true
            if(chkingCopy[1].state===true && chkingCopy[2].state===true && chkingCopy[3].state===true &&chkingCopy[4].state===true){
                chking[0].state=true
            }
            setchking(chkingCopy)
        }else if(num===2 && chking[2].state===true){
            chkingCopy[0].state=false
            chkingCopy[2].state=false
            setchking(chkingCopy)
        }else if(num===3 && chking[3].state===false){
            chkingCopy[3].state=true
            if(chkingCopy[1].state===true && chkingCopy[2].state===true && chkingCopy[3].state===true &&chkingCopy[4].state===true){
                chking[0].state=true
            }
            setchking(chkingCopy)
        }else if(num===3 && chking[3].state===true){
            chkingCopy[0].state=false
            chkingCopy[3].state=false
            setchking(chkingCopy)
        }else if(num===4 && chking[4].state===false){
            chkingCopy[4].state=true
            if(chkingCopy[1].state===true && chkingCopy[2].state===true && chkingCopy[3].state===true &&chkingCopy[4].state===true){
                chking[0].state=true
            }
            setchking(chkingCopy)
        }else if(num===4 && chking[4].state===true){
            chkingCopy[0].state=false
            chkingCopy[4].state=false
            setchking(chkingCopy)
        }
        
    }
    const payTypeHandler =(num)=>{
        if(num===btnNum){
            setBtnNum(0)
        }else if(num===1){
            setBtnNum(1)
        }else if(num===2){
            setBtnNum(2)
        }else if(num===3){
            setBtnNum(3)
        }else if(num===4){
            setBtnNum(4)
        }else if(num===5){
            setBtnNum(5)
        }else if(num===6){
            setBtnNum(6)
        }else if(num===7){
            setBtnNum(7)
        }else if(num===8){
            setBtnNum(8)
        }else if(num===9){
            setBtnNum(9)
        }
        console.log(roomprice)
    }
    // 호텔의 할인 여부 필터
    const hotelDiscount = HotelData.filter((item) => item.h_code === RoomData[hotelNum].h_code);
    console.log('hotelDiscount : ', hotelDiscount )
    const nights = (new Date(DayData[1]).getTime()-new Date(DayData[0]).getTime())/(1000*24*60*60);
    const myRoomPrice = myRoom[0].price * nights // 일반 호텔 총 금액
    const discountPrice = ((myRoom[0].price) - ((myRoom[0].price)*0.1)) * nights // 할인 호텔 총금액
    const isDiscount = (roomprice[0].discount === 1 ? 10 : 0); // 할인 여부
    const totalPrice = 
    (roomprice[0].discount === 1 ? 
        discountPrice
        : 
        myRoomPrice
    )
    

    //생년월이
    const [birth,setBirth] = useState('')
    const payHandler =()=>{
        if(chking[0].state===true && btnNum !== 0 && phone.length === 11 && customer.length !==0){
            setOpen(!open)
            console.log('확인')
            console.log(open)
        }else if(chking[0].state===false){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>약관에 동의 해주세요.</p>)
            toggle();
        }else if(btnNum===0){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>결제 수단을 선택해 주세요.</p>)
            toggle();
        }else if(phone.length < 11 || birth.length<8 || customer.length <1){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>예약자 정보를 입력해주세요.</p>)
            toggle();
        }
        console.log(chking[0].state)
        console.log(btnNum)
        console.log(phone.length)
    }
    // console.log(payRoom)

    // localStorage의 데이터를 json형식으로 변환
    const DayDataResult = JSON.parse(localStorage.getItem("DayData"));

    console.log('DayDataResult', DayDataResult);

    const submitReservation = () => {
        // 세션스토리지에서 가져온 user정보 user : user, 를 axios에 담아서 감
        // 컨트롤러에서 user의 값이 null이나 아니냐를 if문으로 판별
        // null이면 비회원 insert 및 예약 insert
        // null이 아니면 회원fk를 포함한 예약정보 insert
        axios.post('/api/reservations', { 
            g_name : customer,
            booker_name : customer,
            g_birth : birth, 
            g_phone : phone, 
            r_code : hotelNum, 
            check_in_date : DayDataResult[0], 
            check_out_date : DayDataResult[1],
            original_price : myRoomPrice,
            discount_rate : isDiscount,
            final_price : totalPrice
        })
        .then((res) => {
            if(res.data === 1){
                navigate("/pay2");
            }else{
                alert('예약에 실패하였습니다.')
                navigate("/pay");
            }
        })
    }

    return(
        <>
            <div className="paysection">
                <h2 className="pay_title">{/* <i className="fa-solid fa-arrow-left"></i> */}예약 확인 및 결제</h2>
                <div className="pay_info">
                    <div className="user_info">
                        <h4 className="pay_left_title">예약자 정보</h4>
                        <ul className="guest_info">
                            <li className="guest_list">
                                <p className="guest_sub_title">예약자 이름</p>
                                <input type="text" placeholder="홍길동" className="guest_name" name="g_name" value={customer} onChange={(e)=>{setCustomer(e.target.value)}}/>
                            </li>
                            <li className="guest_list">
                                <p className="guest_sub_title">예약자 생년월일</p>
                                {/* value자리에 삼항연산자 사용해서 user(세션 스토리지에 저장한 유저 정보) === null ? birth : user.m_birth */}
                                <input type="text" className="guest_birth01" placeholder="ex) 19800101" name="g_birth" maxLength={8} onChange={(e)=>setBirth(e.target.value)} value={birth}/>
                                <span> - </span>
                                <input type="text" className="guest_birth02" maxLength={1}/>
                                <span> ● ● ● ● ● ●</span>
                            </li>
                            <li className="guest_list">
                                <p className="guest_sub_title">휴대폰 번호</p>
                                {/* value자리에 삼항연산자 사용해서 user(세션 스토리지에 저장한 유저 정보) === null ? phone : user.m_phone */}
                                <input type="text" placeholder="'-' 를 빼고 작성해 주세요" className="guest_phone" name="g_phone" maxLength={11} onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                                <button type="button" className="phone_btn">인증번호 발송 </button>
                                <div className="phone_txt">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <button type="button" className="phone_under">입력된 휴대폰 번호는 안심번호로 변경되어 숙소에 전달돼요.</button>
                                    <i className="fa-solid fa-angle-right"></i>
                                </div>
                            </li>
                        </ul>
                        <div className="payline"></div>
                        <h4 className="pay_left_title">결제 수단</h4>
                        <ul className="pay_type">
                            <li className="type_list"><button onClick={()=>payTypeHandler(1)} type="button" className="type_btn" style={{backgroundColor:btnNum===1?'#fff':''}}><img src="payLogo5.png" alt="kakao pay" style={{height:'30px',width:'70px', marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(2)} type="button" className="type_btn" style={{backgroundColor:btnNum===2?'#fff':''}}><img src="payLogo4.png" alt="kakao pay" style={{height:'13px',width:'70px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(3)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===3?'#fff':''}}>신용/체크 카드</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(4)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===4?'#fff':''}}>퀵계좌이체</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(5)} type="button" className="type_btn" style={{backgroundColor:btnNum===5?'#fff':''}}><img src="payLogo3.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(6)} type="button" className="type_btn" style={{backgroundColor:btnNum===6?'#fff':''}} ><img src="payLogo2.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(7)} type="button" className="type_btn" style={{backgroundColor:btnNum===7?'#fff':''}}><img src="payLogo1.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(8)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===8?'#fff':''}}>법인 카드</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(9)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===9?'#fff':''}}>휴대폰 결제</button></li>
                        </ul>
                        <div className="paychk">
                            <input type="checkbox" name="pay_chk" id="pay_chk" />
                            <label htmlFor="pay_chk" className="pay_chking">이 결제 수단을 다음에도 사용</label>
                        </div>
                    </div>
                    <div className="room_info">
                        <div className="room_box">
                            {<h2 className="room_name">{HotelData[myRoom[0].h_code-1].hotelName}</h2>}
                            <img src={`/img/${roomprice[0].h_Img}`} alt="roomImg" className="room_img"/>
                            <table className="room_table">
                                <tbody>
                                    <tr>
                                        <td className="ta_list ta_sub">객실</td>
                                        <td className="ta_list">{myRoom[0].roomName}</td>
                                    </tr>
                                    <tr>
                                        <td className="ta_list ta_sub">일정</td>
                                        <td className="ta_list"> {DayData[0]}({new Date(DayData[0]).getDay()===0?'일':new Date(DayData[0]).getDay()===1?'월':new Date(DayData[0]).getDay()===2?'화':new Date(DayData[0]).getDay()===3?'수':new Date(DayData[0]).getDay()===4?'목':new Date(DayData[0]).getDay()===5?'금':new Date(DayData[0]).getDay()===6?'토':undefined})
                                             15:00 ~ <br />
                                             {DayData[1]}({new Date(DayData[1]).getDay()===0?'일':new Date(DayData[1]).getDay()===1?'월':new Date(DayData[1]).getDay()===2?'화':new Date(DayData[1]).getDay()===3?'수':new Date(DayData[1]).getDay()===4?'목':new Date(DayData[1]).getDay()===5?'금':new Date(DayData[1]).getDay()===6?'토':undefined})
                                              11:00 ({(new Date(DayData[1]).getTime()-new Date(DayData[0]).getTime())/(1000*24*60*60)})박</td>
                                    </tr>
                                    <tr>
                                        <td className="ta_list ta_sub">기준인원</td>
                                        <td className="ta_list">{payHead}인기준, 최대 {payHead}인</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="paybox">
                            <h2 className="paybox_title">결제 정보</h2>
                            <table className="paybox_table">
                                <tbody>
                                    <tr style={{borderBottom:'1px solid #e4e4e4'}}>
                                        <td className="paybox_list">객실 가격(1박)</td>
                                        <td className="paybox_list" style={{textAlign:'right'}}>
                                            {hotelDiscount[0].discount === 1 ? (
                                                <>
                                                    {((myRoom[0].price) - ((myRoom[0].price)*0.1)).toLocaleString()}
                                                </>
                                            ):(
                                                <>
                                                    {myRoom[0].price.toLocaleString()}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="paybox_list">총 결제 금액</td>
                                        <td className="paybox_list" style={{color:'red',textAlign:'right',fontWeight:600,fontSize:'24px'}}>{totalPrice.toLocaleString() }원</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            <div className="labelAll_item">
                                <input type="checkbox" name="terms_all" style={{display:'none'}} id="terms" checked={chking[0].state} onChange={()=>chkAllHandler(0)}/>
                                <label htmlFor="terms" className="labelAll_txt">약관 전체동의</label>
                            </div>
                            <div className="label_list">
                                <div className="label_item">
                                    <input type="checkbox" name="chk1" style={{display:'none'}} id="agreement01" checked={chking[1].state} onChange={()=>chkHandler(1)}/>
                                    <label htmlFor="agreement01" className="paybox_item">숙소 이용규칙 및 취소/환불규정 동의 (필수)</label>
                                </div>
                                <div className="label_item">
                                    <input type="checkbox" name="chk2" style={{display:'none'}} id="agreement02" checked={chking[2].state} onChange={()=>chkHandler(2)}/>
                                    <label htmlFor="agreement02" className="paybox_item">개인정보 수집 및 이용 동의 (필수)</label>
                                </div>
                                <div className="label_item">
                                    <input type="checkbox" name="chk3" style={{display:'none'}} id="agreement03" checked={chking[3].state} onChange={()=>chkHandler(3)}/>
                                    <label htmlFor="agreement03" className="paybox_item">개인정보 제3자 제공 동의 (필수)</label>
                                </div>
                                <div className="label_item">
                                    <input type="checkbox" name="chk4" style={{display:'none'}} id="agreement04" checked={chking[4].state} onChange={()=>chkHandler(4)}/>
                                    <label htmlFor="agreement04" className="paybox_item">만 14세 이상 확인 (필수)</label>
                                </div>
                            </div>
                            <button type="button" className="paybox_btn" onClick={payHandler}>{totalPrice.toLocaleString()}원 결제하기</button>
                        </div>
                    </div>
                </div>
                {open?
                <div className="pay_modal">
                    <div className="backimg" onClick={()=>setOpen(!open)}></div>
                    <div className="modal_content">
                        <h2 className="pay_modal_title">예약내역 확인</h2>
                        <div className="modal_info">
                            <h4 className="modal_hotel">{myRoom[0].hotelName}</h4>
                            <p className="modal_room">{myRoom[0].roomName}</p>
                        </div>
                        <table className="modal_table">
                            <tr>
                                <td className="modal_list">체크인</td>
                                <td className="modal_list">{DayData[0]}</td>
                            </tr>
                            <tr>
                                <td className="modal_list">체크아웃</td>
                                <td className="modal_list">{DayData[1]}</td>
                            </tr>
                        </table>
                        <ul className="modal_txt">
                            <li className="modal_txt_list"><p>19세 미만 청소년은 보호자 동반 시 투숙이 가능합니다</p></li>
                            <li className="modal_txt_list"><p><span style={{color:'red'}}>취소/환불 규정</span>에 따라 앱/웹내에서 예약취소 가능한 상품입니다. 예약취소 시 취소수수료가 발생할 수 있습니다.</p></li>
                        </ul>
                        <div className="pay_modal_btn">
                            <button type="button" className="btns" style={{width:'125px'}} onClick={()=>setOpen(!open)}>취소</button>
                            <Link to='/pay2' onClick={()=>{setOpen(!open),alert('결제가 완료되었습니다.'),window.scrollTo(0,0)}}>
                                <button type="button" className="btns"style={{color:'#fff',backgroundColor:'#42799b'}} onClick={submitReservation}>동의 후 결제</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>:''}
            </div>
        </>
    )
}