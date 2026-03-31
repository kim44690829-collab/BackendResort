import { useState,useEffect } from "react";
import '../Page/pay.css'
import { useContext } from "react";
import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";
import { ModalContext } from './Modal';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Pay(){
    
    const {payHead,setPayHead,hotelNum, HotelData,RoomData, userNickName, MemberAllData, DayData,customer,setCustomer} = useContext(ResortDataContext)
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
    // 쿠폰 모달
    const [couponModal, setCouponModal] = useState(false);
    // 쿠폰 선택
    const [useCoupon, setUseCoupon] = useState("쿠폰 사용 안함");
    const [useCouponNum, setUseCouponNum] = useState(0);
    const [couponUse, setCouponUse] = useState(0);
    const [memberSel, setMemberSel] = useState(undefined); 
    const [isLoading, setIsLoading] = useState(false);

    // 회원코드
    // const memberNum = MemberAllData.find((item) => item.m_nickName === userNickName);
    

    useEffect(() => {
        if (!userNickName) {
            return;
        }

        setIsLoading(true);

        axios.get("/api/member/onememberSelect", {
            params : {
                m_nickName : userNickName
            }
        })
        .then((res) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~', res.data)
            setMemberSel(res.data);
        })
        .catch((err) => {
            console.error(err);
            setMemberSel(null);
        })
        .finally(() => {
            setIsLoading(false);
        })

    },[])

    

    useEffect(() => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",memberSel)
    },[])

    const couponSel = (num) => {
        if(num === 0){
            setUseCoupon("쿠폰 사용 안함");
            setUseCouponNum(0);
            setCouponUse(0);
        }else if(num === 1){
            setUseCoupon("회원가입 환영 쿠폰 - 10000원");
            setUseCouponNum(10000);
            setCouponUse(1);
        }else{
            setUseCoupon('');
            setUseCouponNum(null);
            setCouponUse(null);
        }
    }

    console.log("zzzzzzzzzzzz", useCouponNum)

    //전체 선택 함수
    const chkAllHandler=()=>{
        if(chking[0].state===false){
            setchking([{id:1,state:true},{id:2,state:true},{id:3,state:true},{id:4,state:true},{id:5,state:true}])
        }else{
            setchking([{id:1,state:false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])
        }
    }
    useEffect(()=>{
        console.log("myRoom",myRoom)
        console.log("roomprice",roomprice)
    },[])
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
        // console.log(roomprice)
    }
    // 호텔의 할인 여부 필터
    const hotelDiscount = HotelData.filter((item) => item.h_code === RoomData[hotelNum-1].h_code);
    // console.log('hotelDiscount : ', hotelDiscount )
    const nights = (new Date(DayData[1]).getTime()-new Date(DayData[0]).getTime())/(1000*24*60*60); // 금액 * nights = 총금액
    const myRoomPrice = myRoom[0].price * nights // 일반 호텔 총 금액
    const isDiscount = (roomprice[0].discount === 1 ? 10 : 0); // 할인 여부
    const discountPrice = ((myRoom[0].price) - ((myRoom[0].price)*0.1)) * nights // 할인 호텔 총금액
    const basePrice = roomprice[0].discount === 1 ? discountPrice : myRoomPrice;
    const totalPrice = 
    (useCouponNum === 0 ? 
        basePrice
        : 
        basePrice - useCouponNum
    )

    // 비회원 생년월일
    const [birth,setBirth] = useState('')
    
    const birthYear = birth.substring(0, 4);
    const birthMonth = birth.substring(4, 6);
    const birthDate = birth.substring(6, 8);

    // 회원 생일 저장 19990303 이런 형식
    let birthMember = '';
    // 회원 생일 출력
    function birthToNumber(b){
        if(!b) return "";

        const memberBirth = new Date(b);

        const y = memberBirth.getFullYear();
        const m = String(memberBirth.getMonth()+1).padStart(2,"0");
        const d = String(memberBirth.getDate()).padStart(2,"0");

        birthMember = `${y}${m}${d}`

        return birthMember;
    }

    const payHandler =()=>{
        let phoneDigits = '';
        if(memberSel){
            phoneDigits = memberSel.m_phone;
        }    

        if((chking[0].state===true && btnNum !== 0 && birthMember.length === 8 && phoneDigits.length === 11 && customer.length !==0) 
            || (chking[0].state===true && btnNum !== 0 && birth.length === 8 && phone.length === 11 && customer.length !==0)){
            setOpen(!open)
            // console.log('확인')
            // console.log(open)
        }else if(chking[0].state===false){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>약관에 동의 해주세요.</p>)
            toggle();
        }else if(btnNum===0){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>결제 수단을 선택해 주세요.</p>)
            toggle();
        }else if((!memberSel && (phone.length < 11 || birth.length < 8 || customer.length < 1)) || (memberSel && customer.length < 1)){
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>예약자 정보를 입력해주세요.</p>)
            toggle();
        }else{
            setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>정보를 정확하게 입력해주세요</p>)
            toggle();
        }
    }

    

    // localStorage의 데이터를 json형식으로 변환
    const DayDataResult = JSON.parse(localStorage.getItem("DayData"));

    const submitReservation = async() => {
        // 세션스토리지에서 가져온 user정보 user : user, 를 axios에 담아서 감
        // 컨트롤러에서 user의 값이 null이나 아니냐를 if문으로 판별
        // null이면 비회원 insert 및 예약 insert
        // null이 아니면 회원fk를 포함한 예약정보 insert
        try{
            const resChk = await axios.get("/api/reservationChk", {
                params:{
                    r_code : hotelNum,
                    check_in_date : DayDataResult[0], 
                    check_out_date : DayDataResult[1],
                }
            })
            console.log('resChk', resChk.data)

            if(resChk.data > 0){
                alert(`이미 예약이 완료된 일정입니다. 상세페이지로 이동합니다.`);
                setCustomer('')
                navigate(`/detail/${HotelData[myRoom[0].h_code-1].h_code}`)
                return;
            }

            if(!memberSel){
                // 비로그인
                const res = await axios.post("/api/guest", {
                    g_name : customer,
                    g_birth : `${birthYear}-${birthMonth}-${birthDate}`, 
                    g_phone : phone
                });
                // setCurGuest(res.data.g_code)
                console.log('비회원 fk', res.data)

                const res01 = await axios.post("/api/reservations",{
                    g_code : res.data,
                    r_code : hotelNum,
                    booker_name : customer,
                    check_in_date : DayDataResult[0], 
                    check_out_date : DayDataResult[1],
                    original_price : myRoomPrice,
                    discount_rate : isDiscount,
                    final_price : totalPrice
                })
                console.log(res01.data)
                // 비회원 예약번호 꺼내기
                const reservationNo = res01.data.reservation_no;

                // sessionStorage 저장 => 새로고침시 사라짐 방지
                sessionStorage.setItem("reservation_no", reservationNo);

                alert("결제가 완료되었습니다.");
                setCustomer('');
                // 페이지 이동
                navigate("/pay2");
            }else{
                // 로그인
                const res02 = await axios.post("/api/reservations",{
                    m_code : memberSel.m_code,
                    r_code : hotelNum,
                    booker_name : customer,
                    check_in_date : DayDataResult[0], 
                    check_out_date : DayDataResult[1],
                    original_price : myRoomPrice,
                    discount_rate : isDiscount,
                    coupon_used : couponUse,
                    final_price : totalPrice
                })
                console.log(res02.data)

                const res03 = await axios.put("/api/member/couponMod", null, {
                    params : {
                        m_code : memberSel.m_code,
                        coupon_used : couponUse
                    }
                })
                console.log("121212123e123124124124123er1",res03.data)

                // 회원 예약 번호 꺼내기 
                const reservationNo = res02.data.reservation_no;
                // sessionStorage 저장 => 새로고침시 사라짐 방지
                sessionStorage.setItem("reservation_no", reservationNo);

                alert("결제가 완료되었습니다.");
                setCustomer('');
                navigate("/pay2");
            }
            
        }catch(err){
            console.error(err)
            alert("결제 실패")
        }
        
    }

    const closeCoupon = (e) => {
        if (!e.target.closest('.couponUse')) {
            setCouponModal(false);
        }
    }

    console.log('1',customer)
    console.log('2',phone.length )
    console.log('3',birth.length)
    console.log('4',customer.length)
    // console.log('5', memberNum)
    console.log('6', memberSel)
    console.log('7', userNickName)

    // ! 혹은 !!는 값을 boolean 타입으로 변환해서 true 혹은 false로 표시함
    // ! => 값의 반전 = !true === false
    // !! => 반전의 반전 = !!true === true
    const isMember = !!userNickName;

    if (isMember && (isLoading || memberSel === undefined))
    return <div>로딩중...</div>;

    return(
        <div className="pay_wrap" onClick={closeCoupon}>
            <div className="paysection">
                <h2 className="pay_title">예약 확인 및 결제</h2>
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
                                {!memberSel ? 
                                    (<>
                                        <input type="text" className="guest_birth01" placeholder="ex) 19800101" name="g_birth" maxLength={8} onChange={(e)=>setBirth(e.target.value)} value={birth}/>    
                                    </>)
                                    : 
                                    (<>
                                        <input type="text" className="guest_birth01" value={birthToNumber(memberSel?.m_birth)} onChange={(e)=>setBirth(e.target.value)} readOnly/>    
                                    </>)}
                                
                                <span> - </span>
                                <input type="text" className="guest_birth02" maxLength={1}/>
                                <span> ● ● ● ● ● ●</span>
                            </li>
                            <li className="guest_list">
                                <p className="guest_sub_title">휴대폰 번호</p>
                                {/* value자리에 삼항연산자 사용해서 user(세션 스토리지에 저장한 유저 정보) === null ? phone : user.m_phone */}
                                {!memberSel ? 
                                    (<>
                                        <input type="text" placeholder="'-' 를 빼고 작성해 주세요" className="guest_phone" name="g_phone" maxLength={11} onChange={(e)=>setPhone(e.target.value)} value={phone}/> 
                                    </>)
                                    : 
                                    (<>
                                        <input type="text" className="guest_phone" value={memberSel?.m_phone} onChange={(e)=>setPhone(e.target.value)} readOnly/> 
                                    </>)}
                                <div className="phone_txt">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <button type="button" className="phone_under">입력된 휴대폰 번호는 안심번호로 변경되어 숙소에 전달돼요.</button>
                                </div>
                            </li>
                        </ul>
                        <div className="payline"></div>
                        <div className="couponUse">
                            <h4 className="pay_left_title">쿠폰</h4>
                            <input type="text" value={useCoupon} placeholder="쿠폰을 선택해주세요." className="coupon_name" readOnly onClick={() => setCouponModal(true)}/>
                            <button type="button" className="couponSearch" onClick={() => setCouponModal(!couponModal)}>보유중인 쿠폰</button>
                            {couponModal && (
                                <div className="couponModal">
                                    {/* <button type="button" className="pay_x_btn" onClick={() => setCouponModal(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button> */}
                                    <ul>
                                        <li>
                                            <button type="button" value={couponUse} onClick={() => {couponSel(0); setCouponModal(false);}}>쿠폰 사용 안함</button>
                                        </li>
                                        {(memberSel && memberSel.m_coupon === 1) ? 
                                        (<>
                                            <li>
                                                <button type="button" onClick={() => {couponSel(1); setCouponModal(false);}}>회원가입 쿠폰</button>
                                            </li>
                                        </>) : ''
                                        }
                                    </ul>
                                </div>
                            )}
                            
                        </div>
                        <div className="payline"></div>
                        <h4 className="pay_left_title2">결제 수단</h4>
                        <ul className="pay_type">
                            <li className="type_list"><button onClick={()=>payTypeHandler(1)} type="button" className="type_btn" style={{backgroundColor:btnNum===1?'#a5a5a54b':'#fff'}}><img src="payLogo5.png" alt="kakao pay" style={{height:'30px',width:'70px', marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(2)} type="button" className="type_btn" style={{backgroundColor:btnNum===2?'#a5a5a54b':'#fff'}}><img src="payLogo4.png" alt="kakao pay" style={{height:'13px',width:'70px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(3)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===3?'#a5a5a54b':'#fff'}}>신용/체크 카드</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(4)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===4?'#a5a5a54b':'#fff'}}>퀵계좌이체</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(5)} type="button" className="type_btn" style={{backgroundColor:btnNum===5?'#a5a5a54b':'#fff'}}><img src="payLogo3.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(6)} type="button" className="type_btn" style={{backgroundColor:btnNum===6?'#a5a5a54b':'#fff'}} ><img src="payLogo2.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(7)} type="button" className="type_btn" style={{backgroundColor:btnNum===7?'#a5a5a54b':'#fff'}}><img src="payLogo1.png" alt="kakao pay" style={{height:'30px',width:'70px',marginTop:'10px'}}></img></button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(8)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===8?'#a5a5a54b':'#fff'}}>법인 카드</button></li>
                            <li className="type_list"><button onClick={()=>payTypeHandler(9)} type="button" className="type_btn" style={{fontWeight:500,backgroundColor:btnNum===9?'#a5a5a54b':'#fff'}}>휴대폰 결제</button></li>
                        </ul>
                        {/* <div className="paychk">
                            <input type="checkbox" name="pay_chk" id="pay_chk" />
                            <label htmlFor="pay_chk" className="pay_chking">이 결제 수단을 다음에도 사용</label>
                        </div> */}
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
                            <button type="button"
                            className="btns"
                            style={{color:'#fff',backgroundColor:'#42799b'}}
                            onClick={() => {submitReservation(),window.scrollTo(0,0);}}>
                            동의 후 결제
                            </button>
                        </div>
                    </div>
                </div>:''}
            </div>
        </div>
    )
}