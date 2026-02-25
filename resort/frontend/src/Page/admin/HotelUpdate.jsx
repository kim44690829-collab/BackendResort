import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function HotelUpdate(){
    const {h_code} = useParams();
    const [roomservice,setRoomservice] = useState([])
    const [r_value,setR_value] = useState("")
    const [publicservice,setPublicservice] = useState([])
    const [p_value,setP_value] = useState("")
    const [otherservice,setOtherservice] = useState([])
    const [o_value,setO_value] = useState("")
    const [hotel,setHotel] = useState([])

   


    const currentHotel = hotel.find(h => h.h_code == h_code);

    const[hotelName,setHotelName] = useState(null)
    const[country,setCountry] = useState(null)
    const[city,setCity] = useState(null)
    const[type,setType] = useState(null)
    const[h_address,setH_address] = useState(null)
    const[discount,setDiscount] = useState(null)
    const[startDate,setStartDate] = useState(null)
    const[endDate,setEndDate] = useState(null)

    const navigate = useNavigate();
    //상품 들록하는 submit 함수
    
    useEffect(()=>{
        axios.get('/api/hotel/onlyhotel')
        .then((res) => {
            console.log("호텔 데이터 : ", res.data);
            setHotel(res.data);
            
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[])

    const submitHandler = ()=>{
        axios.put('/api/hotel/adminupdatehotel',{
            h_code: h_code,
            hotelName:hotelName,
            country:country,
            city:city,
            type:type,
            h_address:h_address,
            discount:discount,
            startDate:startDate,
            endDate:endDate,
            roomservice:r_value,
            publicservice:p_value,
            otherservice:o_value,
        })
        .then((res) => {
            console.log("수정 성공");
            alert("호텔정보 수정이 완료되었습니다")
            navigate('/adminpage2'); 
        })
        .catch((error) => {
            console.error(error);
        });
        
        
        
    }



    // 체크 박스 선택시 선택한 요소 추가
    const addroomServiceHandler=(e)=>{
        const roomserviceCopy=[...roomservice]
        if(roomserviceCopy.find((f)=>f===e)===undefined){
            roomserviceCopy.push(e)
            setRoomservice(roomserviceCopy)
        }else{
            const arr = roomserviceCopy.filter((f)=>f !== e)
            setRoomservice(arr)
        }
        console.log(hotel)
        console.log(hotelName)
        console.log(country)
        console.log(city)
    }
    const addpublicServiceHandler=(e)=>{
        const publicserviceCopy=[...publicservice]
        if(publicserviceCopy.find((f)=>f===e)===undefined){
            publicserviceCopy.push(e)
            setPublicservice(publicserviceCopy)
        }else{
            const arr = publicserviceCopy.filter((f)=>f !== e)
            setPublicservice(arr)
        }
    }
    const addotherServiceHandler=(e)=>{
        const otherserviceCopy=[...otherservice]
        if(otherserviceCopy.find((f)=>f===e)===undefined){
            otherserviceCopy.push(e)
            setOtherservice(otherserviceCopy)
        }else{
            const arr = otherserviceCopy.filter((f)=>f !== e)
            setOtherservice(arr)
        }
    }
    // 추가된 요소 텍스트로 변환된값
    useEffect(()=>{
        const text = `[${roomservice.map(v => `"${v}"`).join(',')}]`
        setR_value(text)
        const text2 = `[${publicservice.map(v => `"${v}"`).join(',')}]`
        setP_value(text2)
        const text3 = `[${otherservice.map(v => `"${v}"`).join(',')}]`
        setO_value(text3)
    },[roomservice,publicservice,otherservice])


    useEffect(() => {
    if (!hotel || hotel.length === 0) return; // 데이터 없으면 실행 안함

    const target = hotel[h_code - 1];
    if (!target) return; // 해당 인덱스 없으면 종료

    const nnn = JSON.parse(target.roomservice);
    const bbb = JSON.parse(target.publicservice);
    const ncccnn = JSON.parse(target.otherservice);

    setRoomservice(nnn);
    setPublicservice(bbb);
    setOtherservice(ncccnn);

    console.log(nnn);
}, [hotel, h_code]);

    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">관리자 페이지</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회</span>
                            <ul className="admin_submenu">
                                <li className="a_menus">
                                    <Link to={`/adminPage` } onClick={() => window.scrollTo(0, 0)}>
                                       <span>회원 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage2` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>호텔 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage3` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>객실 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage4` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>예약 정보 조회</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">등록</span>
                            <ul className="admin_submenu">
                                <li className="a_menus">
                                    <Link to={`/hotelinsert` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>호텔 정보 등록</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/roominsert`} onClick={() => window.scrollTo(0, 0)}>
                                        <span>객실 정보 등록</span> 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">게시판</span>
                            <ul className="admin_submenu">
                                <li className="a_menus">
                                    <Link to={`/adminPage5` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>1대1 문의</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage6`} onClick={() => window.scrollTo(0, 0)}>
                                        <span>공지사항</span> 
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage7`} onClick={() => window.scrollTo(0, 0)}>
                                        <span>리뷰</span> 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin_body">
                        <div className="admin_text">{h_code}번 호텔 상품 수정하기</div>
                        <div className="admin_list">
                            <table className="list_table" border="1" style={{width:"800px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">hotelName</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="hotelName" onChange={(e)=>setHotelName(e.target.value)} 
                                            value={hotelName ?? currentHotel?.hotelName ?? ""} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">country</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="country" onChange={(e)=>setCountry(e.target.value)} 
                                            value={country ?? currentHotel?.country ?? ""}  />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">city</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="city" onChange={(e)=>setCity(e.target.value)} 
                                            value={city ?? currentHotel?.city??""} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">type</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="type" onChange={(e)=>setType(e.target.value)} 
                                            value={type ?? currentHotel?.type ?? ""} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">h_address</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="h_address" onChange={(e)=>setH_address(e.target.value)}
                                            value={h_address ?? currentHotel?.h_address ?? ""} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">discount</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="discount" onChange={(e)=>setDiscount(e.target.value)} 
                                            value={discount ?? currentHotel?.discount ?? ""} />
                                        </th>

                                    </tr>
                                    <tr>
                                        <th width="200px">startDate</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="startDate" onChange={(e)=>setStartDate(e.target.value)} 
                                            value={startDate ?? currentHotel?.startDate ?? ""} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">endDate</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="endDate" onChange={(e)=>setEndDate(e.target.value)} 
                                            value={endDate ?? currentHotel?.endDate ?? ""} />
                                        </th>
                                    </tr>
                                    
                                    <tr>
                                        <th width="200px">roomservice{`(최대 8개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            {/* <input type="text" name="roomservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="roomservice" id="roomservice1" onChange={()=>addroomServiceHandler("무선인터넷")} checked={roomservice.includes("무선인터넷")}/>
                                            <label htmlFor="roomservice1">무선인터넷</label>
                                            <input type="checkbox" name="roomservice" id="roomservice2" onChange={()=>addroomServiceHandler("욕실용품")}  checked={roomservice.includes("욕실용품")}/>
                                            <label htmlFor="roomservice2">욕실용품</label>
                                            <input type="checkbox" name="roomservice" id="roomservice3" onChange={()=>addroomServiceHandler("실내수영장")}  checked={roomservice.includes("실내수영장")}/>
                                            <label htmlFor="roomservice3">실내수영장</label>
                                            <input type="checkbox" name="roomservice" id="roomservice4" onChange={()=>addroomServiceHandler("TV")}  checked={roomservice.includes("TV")}/>
                                            <label htmlFor="roomservice4">TV</label>
                                            <input type="checkbox" name="roomservice" id="roomservice5" onChange={()=>addroomServiceHandler("샤워실")}  checked={roomservice.includes("샤워실")}/>
                                            <label htmlFor="roomservice5">샤워실</label>
                                            <input type="checkbox" name="roomservice" id="roomservice6" onChange={()=>addroomServiceHandler("욕조")}  checked={roomservice.includes("욕조")}/>
                                            <label htmlFor="roomservice6">욕조</label>
                                            <input type="checkbox" name="roomservice" id="roomservice7" onChange={()=>addroomServiceHandler("객실내취사")}  checked={roomservice.includes("객실내취사")}/>
                                            <label htmlFor="roomservice7">객실내취사</label>
                                            <input type="checkbox" name="roomservice" id="roomservice8" onChange={()=>addroomServiceHandler("금연")}  checked={roomservice.includes("금연")}/>
                                            <label htmlFor="roomservice8">금연</label>
                                            <input type="checkbox" name="roomservice" id="roomservice9" onChange={()=>addroomServiceHandler("에어컨")}  checked={roomservice.includes("에어컨")}/>
                                            <label htmlFor="roomservice9">에어컨</label>
                                            <input type="checkbox" name="roomservice" id="roomservice10" onChange={()=>addroomServiceHandler("드라이기")}  checked={roomservice.includes("드라이기")}/>
                                            <label htmlFor="roomservice10">드라이기</label>
                                            <input type="checkbox" name="roomservice" id="roomservice11" onChange={()=>addroomServiceHandler("냉장고")}  checked={roomservice.includes("냉장고")}/>
                                            <label htmlFor="roomservice11">냉장고</label>
                                            <input type="checkbox" name="roomservice" id="roomservice12" onChange={()=>addroomServiceHandler("전기주전자")}  checked={roomservice.includes("전기주전자")}/>
                                            <label htmlFor="roomservice12">전기주전자</label>
                                            <input type="checkbox" name="roomservice" id="roomservice13" onChange={()=>addroomServiceHandler("개인콘센트")}  checked={roomservice.includes("개인콘센트")}/>
                                            <label htmlFor="roomservice13">개인콘센트</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">publicservice{`(최대 8개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            {/* <input type="text" name="publicservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="publicservice" id="publicservice1" onChange={()=>addpublicServiceHandler("피트니스")} checked={publicservice.includes("피트니스")}/>
                                            <label htmlFor="publicservice1">피트니스</label>
                                            <input type="checkbox" name="publicservice" id="publicservice2" onChange={()=>addpublicServiceHandler("레스토랑")} checked={publicservice.includes("레스토랑")}/>
                                            <label htmlFor="publicservice2">레스토랑</label>
                                            <input type="checkbox" name="publicservice" id="publicservice3" onChange={()=>addpublicServiceHandler("사우나")} checked={publicservice.includes("사우나")}/>
                                            <label htmlFor="publicservice3">사우나</label>
                                            <input type="checkbox" name="publicservice" id="publicservice4" onChange={()=>addpublicServiceHandler("실내수영장")} checked={publicservice.includes("실내수영장")}/>
                                            <label htmlFor="publicservice4">실내수영장</label>
                                            <input type="checkbox" name="publicservice" id="publicservice5" onChange={()=>addpublicServiceHandler("야외수영장")} checked={publicservice.includes("야외수영장")}/>
                                            <label htmlFor="publicservice5">야외수영장</label>
                                            <input type="checkbox" name="publicservice" id="publicservice6" onChange={()=>addpublicServiceHandler("편의점")} checked={publicservice.includes("편의점")}/>
                                            <label htmlFor="publicservice6">편의점</label>
                                            <input type="checkbox" name="publicservice" id="publicservice7" onChange={()=>addpublicServiceHandler("바")} checked={publicservice.includes("바")}/>
                                            <label htmlFor="publicservice7">바</label>
                                            <input type="checkbox" name="publicservice" id="publicservice8" onChange={()=>addpublicServiceHandler("라운지")} checked={publicservice.includes("라운지")}/>
                                            <label htmlFor="publicservice8">라운지</label>
                                            <input type="checkbox" name="publicservice" id="publicservice9" onChange={()=>addpublicServiceHandler("엘리베이터")} checked={publicservice.includes("엘리베이터")}/>
                                            <label htmlFor="publicservice9">엘리베이터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice10" onChange={()=>addpublicServiceHandler("비즈니스센터")} checked={publicservice.includes("비즈니스센터")}/>
                                            <label htmlFor="publicservice10">비즈니스센터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice11" onChange={()=>addpublicServiceHandler("건조기")} checked={publicservice.includes("건조기")}/>
                                            <label htmlFor="publicservice11">건조기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice12" onChange={()=>addpublicServiceHandler("탈수기")} checked={publicservice.includes("탈수기")}/>
                                            <label htmlFor="publicservice12">탈수기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice13" onChange={()=>addpublicServiceHandler("바베큐")} checked={publicservice.includes("바베큐")}/>
                                            <label htmlFor="publicservice13">바베큐</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">otherservice{`(최대 3개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            {/* <input type="text" name="otherservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="otherservice" id="otherservice1" onChange={()=>addotherServiceHandler("스프링클러")} checked={otherservice.includes("스프링클러")}/>
                                            <label htmlFor="otherservice1">스프링클러</label>
                                            <input type="checkbox" name="otherservice" id="otherservice2" onChange={()=>addotherServiceHandler("반려견동반")} checked={otherservice.includes("반려견동반")}/>
                                            <label htmlFor="otherservice2">반려견동반</label>
                                            <input type="checkbox" name="otherservice" id="otherservice3" onChange={()=>addotherServiceHandler("카드결제")} checked={otherservice.includes("카드결제")}/>
                                            <label htmlFor="otherservice3">카드결제</label>
                                            <input type="checkbox" name="otherservice" id="otherservice4" onChange={()=>addotherServiceHandler("짐보관가능")} checked={otherservice.includes("짐보관가능")}/>
                                            <label htmlFor="otherservice4">짐보관가능</label>
                                            <input type="checkbox" name="otherservice" id="otherservice5" onChange={()=>addotherServiceHandler("개인사물함")} checked={otherservice.includes("개인사물함")}/>
                                            <label htmlFor="otherservice5">개인사물함</label>
                                            <input type="checkbox" name="otherservice" id="otherservice6" onChange={()=>addotherServiceHandler("픽업서비스")} checked={otherservice.includes("픽업서비스")}/>
                                            <label htmlFor="otherservice6">픽업서비스</label>
                                            <input type="checkbox" name="otherservice" id="otherservice7" onChange={()=>addotherServiceHandler("캠프파이어")} checked={otherservice.includes("캠프파이어")}/>
                                            <label htmlFor="otherservice7">캠프파이어</label>
                                            <input type="checkbox" name="otherservice" id="otherservice8" onChange={()=>addotherServiceHandler("무료주차")} checked={otherservice.includes("무료주차")}/>
                                            <label htmlFor="otherservice8">무료주차</label>
                                            <input type="checkbox" name="otherservice" id="otherservice9" onChange={()=>addotherServiceHandler("조식제공")} checked={otherservice.includes("조식제공")}/>
                                            <label htmlFor="otherservice9">조식제공</label>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <button type="button">
                                    <Link to={'/adminpage'}>
                                        취소하기
                                    </Link>
                                </button>
                                <button type="button" onClick={submitHandler}>수정하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}