import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function HotelUpdate(){

    const {userEmail,setRender,render} = useContext(ResortDataContext)

    const {h_code} = useParams();
    const [roomservice,setRoomservice] = useState([])
    const [r_value,setR_value] = useState("")
    const [publicservice,setPublicservice] = useState([])
    const [p_value,setP_value] = useState("")
    const [otherservice,setOtherservice] = useState([])
    const [o_value,setO_value] = useState("")
    const [hotel,setHotel] = useState([])

   

//
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
            window.scrollTo(0, 0)
            navigate('/adminpage2'); 
        })
        .catch((error) => {
            console.error(error);
        });
        
        setRender(!render)
        
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
        setHotelName(currentHotel.hotelName)
        setCountry(currentHotel.country)
        setCity(currentHotel.city)
        setType(currentHotel.type)
        setH_address(currentHotel.h_address)
        setDiscount(currentHotel.discount)
        setStartDate(currentHotel.startDate)
        setEndDate(currentHotel.endDate)

        console.log(nnn);
    }, [hotel, h_code]);
    
    if(userEmail !== 'admin@resort.com'){
        return(
            <>
                <div style={{margin:"400px auto",textAlign:"center"}}>
                    <Link to={"/"}>홈으로 돌아가기</Link>

                </div>
            </>
        )
    }
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
                                <li className="a_menus">
                                    <Link to={`/noticeinsert`} onClick={() => window.scrollTo(0, 0)}>
                                        <span>공지사항 작성</span> 
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
                        <div className="admin_text" style={{textAlign:"left",width:"800px"}}>{h_code}번 호텔 수정하기</div>
                        <div className="admin_list">
                            <table className="list_table" style={{width:"800px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">호텔이름</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="hotelName" onChange={(e)=>setHotelName(e.target.value)} 
                                            value={hotelName ?? currentHotel?.hotelName ?? ""} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">국가</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {/* <input type="text" name="country" onChange={(e)=>setCountry(e.target.value)} 
                                            value={country ?? currentHotel?.country ?? ""} style={{width:"400px",height:"30px"}} /> */}
                                            <select className="select" name="country" value={country ?? currentHotel?.country ?? ""}
                                            onChange={(e)=>{setCountry(e.target.value),setCity("")}} style={{width:'130px'}}>
                                                <option value="Korea">한국</option>
                                                <option value="Japan">일본</option>
                                                <option value="USA">미국</option>
                                                <option value="China">중국</option>
                                                <option value="Italy">이탈리아</option>
                                                <option value="France">프랑스</option>
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">도시</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {/* <input type="text" name="city" onChange={(e)=>setCity(e.target.value)} 
                                            value={city ?? currentHotel?.city??""} style={{width:"400px",height:"30px"}}/> */}
                                            <select className="select" name="city" value={city ?? currentHotel?.city??""}
                                            onChange={(e)=>setCity(e.target.value)} style={{width:'130px'}}>
                                                <option value='' hidden>=== 선택 ===</option>
                                                {country === 'Korea'?
                                                    <>
                                                        <option value="Seoul">서울</option>
                                                        <option value="Busan">부산</option>
                                                        <option value="Gangneung">강원도</option>
                                                        <option value="Sokcho">속초</option>
                                                        <option value="Gyeongju">경주</option>
                                                        <option value="Yeosu">여수</option>
                                                        <option value="Daejeon">대전</option>
                                                        <option value="Gwangju">광주</option>
                                                        <option value="Jeju">제주</option>
                                                        <option value="Pohang">포항</option>
                                                    </>
                                                    :
                                                country === 'Japan'? 
                                                    <>
                                                        <option value="Tokyo">도쿄</option>
                                                        <option value="Sapporo">삿포로</option>
                                                    </>
                                                    :
                                                country === 'USA'? 
                                                    <>
                                                        <option value="LosAngeles">로스앤젤레스</option>
                                                        <option value="New York">뉴욕</option>
                                                        <option value="Guam">괌</option>
                                                    </>
                                                    :
                                                country === 'China'? 
                                                    <>
                                                        <option value="Zhangjiajie">장가계</option>
                                                        <option value="Shanghai">상하이</option>
                                                    </>
                                                    :
                                                country === 'Italy'? 
                                                    <>
                                                        <option value="Rome">로마</option>
                                                        <option value="Venice">베네치아</option>
                                                    </>
                                                    :
                                                country === 'France'? 
                                                    <>
                                                        <option value="Paris">파리</option>
                                                    </>
                                                    :
                                                    <option>국가를 먼저 선택해주세요</option>
                                                }
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">숙소유형</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {/* <input type="text" name="type" onChange={(e)=>setType(e.target.value)} 
                                            value={type ?? currentHotel?.type ?? ""} style={{width:"400px",height:"30px"}}/> */}
                                            <select  className="select" name="type" value={type ?? currentHotel?.type ?? ""}
                                            onChange={(e)=>setType(e.target.value)} style={{width:'130px'}}>
                                                <option value="Hotel">호텔</option>
                                                <option value="Resort">리조트</option>
                                                <option value="GuestHouse">게스트하우스</option>
                                                <option value="Condo">콘도</option>
                                                <option value="Camping">캠핑장</option>
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">주소지</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="h_address" onChange={(e)=>setH_address(e.target.value)}
                                            value={h_address ?? currentHotel?.h_address ?? ""} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">할인여부</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {/* <input type="text" name="discount" onChange={(e)=>setDiscount(e.target.value)} 
                                            value={discount ?? currentHotel?.discount ?? ""} style={{width:"400px",height:"30px"}}/> */}
                                            <select  className="select" name="discount" onChange={(e)=>setDiscount(e.target.value)} style={{width:'130px'}} value={discount ?? currentHotel?.discount ?? ""}>
                                                {/* setHotel({...hotel,[inputName]:e.target.value}) */}
                                                <option value="0">할인</option>
                                                <option value="1">미할인</option>
                                            </select>
                                        </th>

                                    </tr>
                                    <tr>
                                        <th width="200px">예약시작일</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="startDate" onChange={(e)=>setStartDate(e.target.value)} 
                                            value={startDate ?? currentHotel?.startDate ?? ""} style={{width:"400px",height:"30px"}}/>
                                            <p style={{fontWeight:'500', fontSize:'12px',color:'#bbb', marginTop:'10px'}}>{`ex) 2000-01-01`}</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">예약종료일</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="endDate" onChange={(e)=>setEndDate(e.target.value)} 
                                            value={endDate ?? currentHotel?.endDate ?? ""} style={{width:"400px",height:"30px"}}/>
                                            <p style={{fontWeight:'500', fontSize:'12px',color:'#bbb', marginTop:'10px'}}>{`ex) 2000-01-01`}</p>
                                        </th>
                                    </tr>
                                    
                                    <tr>
                                        <th width="200px">객내시설{`(최대 8개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}} className="cheakboxgr">
                                            {/* <input type="text" name="roomservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="roomservice" id="roomservice1" onChange={()=>addroomServiceHandler("무선인터넷")} checked={roomservice.includes("무선인터넷")}
                                            disabled={!roomservice.includes("피트니스") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice1">무선인터넷</label>
                                            <input type="checkbox" name="roomservice" id="roomservice2" onChange={()=>addroomServiceHandler("욕실용품")}  checked={roomservice.includes("욕실용품")}
                                            disabled={!roomservice.includes("욕실용품") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice2">욕실용품</label>
                                            <input type="checkbox" name="roomservice" id="roomservice3" onChange={()=>addroomServiceHandler("실내수영장")}  checked={roomservice.includes("실내수영장")}
                                            disabled={!roomservice.includes("실내수영장") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice3">실내수영장</label>
                                            <input type="checkbox" name="roomservice" id="roomservice4" onChange={()=>addroomServiceHandler("TV")}  checked={roomservice.includes("TV")}
                                            disabled={!roomservice.includes("TV") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice4">TV</label>
                                            <br/>
                                            <input type="checkbox" name="roomservice" id="roomservice5" onChange={()=>addroomServiceHandler("샤워실")}  checked={roomservice.includes("샤워실")}
                                            disabled={!roomservice.includes("샤워실") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice5">샤워실</label>
                                            <input type="checkbox" name="roomservice" id="roomservice6" onChange={()=>addroomServiceHandler("욕조")}  checked={roomservice.includes("욕조")}
                                            disabled={!roomservice.includes("욕조") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice6">욕조</label>
                                            <input type="checkbox" name="roomservice" id="roomservice7" onChange={()=>addroomServiceHandler("객실내취사")}  checked={roomservice.includes("객실내취사")}
                                            disabled={!roomservice.includes("객실내취사") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice7">객실내취사</label>
                                            <input type="checkbox" name="roomservice" id="roomservice8" onChange={()=>addroomServiceHandler("금연")}  checked={roomservice.includes("금연")}
                                            disabled={!roomservice.includes("금연") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice8">금연</label>
                                            <br/>
                                            <input type="checkbox" name="roomservice" id="roomservice9" onChange={()=>addroomServiceHandler("에어컨")}  checked={roomservice.includes("에어컨")}
                                            disabled={!roomservice.includes("에어컨") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice9">에어컨</label>
                                            <input type="checkbox" name="roomservice" id="roomservice10" onChange={()=>addroomServiceHandler("드라이기")}  checked={roomservice.includes("드라이기")}
                                            disabled={!roomservice.includes("드라이기") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice10">드라이기</label>
                                            <input type="checkbox" name="roomservice" id="roomservice11" onChange={()=>addroomServiceHandler("냉장고")}  checked={roomservice.includes("냉장고")}
                                            disabled={!roomservice.includes("냉장고") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice11">냉장고</label>
                                            <input type="checkbox" name="roomservice" id="roomservice12" onChange={()=>addroomServiceHandler("전기주전자")}  checked={roomservice.includes("전기주전자")}
                                            disabled={!roomservice.includes("전기주전자") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice12">전기주전자</label>
                                            <input type="checkbox" name="roomservice" id="roomservice13" onChange={()=>addroomServiceHandler("개인콘센트")}  checked={roomservice.includes("개인콘센트")}
                                            disabled={!roomservice.includes("개인콘센트") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice13">개인콘센트</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">공용시설{`(최대 8개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}} className="cheakboxgr">
                                            {/* <input type="text" name="publicservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="publicservice" id="publicservice1" onChange={()=>addpublicServiceHandler("피트니스")} checked={publicservice.includes("피트니스")}
                                            disabled={!publicservice.includes("피트니스") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice1">피트니스</label>
                                            <input type="checkbox" name="publicservice" id="publicservice2" onChange={()=>addpublicServiceHandler("레스토랑")} checked={publicservice.includes("레스토랑")}
                                            disabled={!publicservice.includes("레스토랑") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice2">레스토랑</label>
                                            <input type="checkbox" name="publicservice" id="publicservice3" onChange={()=>addpublicServiceHandler("사우나")} checked={publicservice.includes("사우나")}
                                            disabled={!publicservice.includes("사우나") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice3">사우나</label>
                                            <input type="checkbox" name="publicservice" id="publicservice4" onChange={()=>addpublicServiceHandler("실내수영장")} checked={publicservice.includes("실내수영장")}
                                            disabled={!publicservice.includes("실내수영장") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice4">실내수영장</label>
                                            <br/>
                                            <input type="checkbox" name="publicservice" id="publicservice5" onChange={()=>addpublicServiceHandler("야외수영장")} checked={publicservice.includes("야외수영장")}
                                            disabled={!publicservice.includes("야외수영장") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice5">야외수영장</label>
                                            <input type="checkbox" name="publicservice" id="publicservice6" onChange={()=>addpublicServiceHandler("편의점")} checked={publicservice.includes("편의점")}
                                            disabled={!publicservice.includes("편의점") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice6">편의점</label>
                                            <input type="checkbox" name="publicservice" id="publicservice7" onChange={()=>addpublicServiceHandler("바")} checked={publicservice.includes("바")}
                                            disabled={!publicservice.includes("바") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice7">바</label>
                                            <input type="checkbox" name="publicservice" id="publicservice8" onChange={()=>addpublicServiceHandler("라운지")} checked={publicservice.includes("라운지")}
                                            disabled={!publicservice.includes("라운지") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice8">라운지</label>
                                            <br/>
                                            <input type="checkbox" name="publicservice" id="publicservice9" onChange={()=>addpublicServiceHandler("엘리베이터")} checked={publicservice.includes("엘리베이터")}
                                            disabled={!publicservice.includes("엘리베이터") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice9">엘리베이터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice10" onChange={()=>addpublicServiceHandler("비즈니스센터")} checked={publicservice.includes("비즈니스센터")}
                                            disabled={!publicservice.includes("비즈니스센터") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice10">비즈니스센터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice11" onChange={()=>addpublicServiceHandler("건조기")} checked={publicservice.includes("건조기")}
                                            disabled={!publicservice.includes("건조기") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice11">건조기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice12" onChange={()=>addpublicServiceHandler("탈수기")} checked={publicservice.includes("탈수기")}
                                            disabled={!publicservice.includes("탈수기") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice12">탈수기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice13" onChange={()=>addpublicServiceHandler("바베큐")} checked={publicservice.includes("바베큐")}
                                            disabled={!publicservice.includes("바베큐") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice13">바베큐</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">기타시설{`(최대 3개)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}} className="cheakboxgr">
                                            {/* <input type="text" name="otherservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="otherservice" id="otherservice1" onChange={()=>addotherServiceHandler("스프링클러")} checked={otherservice.includes("스프링클러")}
                                            disabled={!otherservice.includes("스프링클러") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice1">스프링클러</label>
                                            <input type="checkbox" name="otherservice" id="otherservice2" onChange={()=>addotherServiceHandler("반려견동반")} checked={otherservice.includes("반려견동반")}
                                            disabled={!otherservice.includes("반려견동반") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice2">반려견동반</label>
                                            <input type="checkbox" name="otherservice" id="otherservice3" onChange={()=>addotherServiceHandler("카드결제")} checked={otherservice.includes("카드결제")}
                                            disabled={!otherservice.includes("카드결제") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice3">카드결제</label>
                                            <input type="checkbox" name="otherservice" id="otherservice4" onChange={()=>addotherServiceHandler("짐보관가능")} checked={otherservice.includes("짐보관가능")}
                                            disabled={!otherservice.includes("짐보관가능") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice4">짐보관가능</label>
                                            <br/>
                                            <input type="checkbox" name="otherservice" id="otherservice5" onChange={()=>addotherServiceHandler("개인사물함")} checked={otherservice.includes("개인사물함")}
                                            disabled={!otherservice.includes("개인사물함") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice5">개인사물함</label>
                                            <input type="checkbox" name="otherservice" id="otherservice6" onChange={()=>addotherServiceHandler("픽업서비스")} checked={otherservice.includes("픽업서비스")}
                                            disabled={!otherservice.includes("픽업서비스") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice6">픽업서비스</label>
                                            <input type="checkbox" name="otherservice" id="otherservice7" onChange={()=>addotherServiceHandler("캠프파이어")} checked={otherservice.includes("캠프파이어")}
                                            disabled={!otherservice.includes("캠프파이어") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice7">캠프파이어</label>
                                            <input type="checkbox" name="otherservice" id="otherservice8" onChange={()=>addotherServiceHandler("무료주차")} checked={otherservice.includes("무료주차")}
                                            disabled={!otherservice.includes("무료주차") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice8">무료주차</label>
                                        
                                            <input type="checkbox" name="otherservice" id="otherservice9" onChange={()=>addotherServiceHandler("조식제공")} checked={otherservice.includes("조식제공")}
                                            disabled={!otherservice.includes("조식제공") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice9">조식제공</label>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'}>
                                    <button type="button" className="insertBtn">
                                        취소하기
                                    </button>
                                </Link>
                                <button className="insertBtn" type="button" onClick={submitHandler}>수정하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}