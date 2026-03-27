import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HotelInsert(){
    const {userEmail,setRender,render} = useContext(ResortDataContext)
    const [roomservice,setRoomservice] = useState([])
    const [r_value,setR_value] = useState("")
    const [publicservice,setPublicservice] = useState([])
    const [p_value,setP_value] = useState("")
    const [otherservice,setOtherservice] = useState([])
    const [o_value,setO_value] = useState("")
    const [hotel,setHotel] = useState({
        hotelName:'',
        country:'Korea',
        city:'',
        type:'Hotel',
        h_address:'',
        discount:0,
        h_Img:null,
        h_s_Img1:null,
        h_s_Img2:null,
        h_s_Img3:null,
        h_s_Img4:null,
        startDate:'',
        endDate:'',
        roomservice:r_value,
        publicservice:p_value,
        otherservice:o_value,
    })

    const navigate = useNavigate();
    //상품 들록하는 submit 함수
    const submitHandler=()=>{
        if(!window.confirm("입력한 호텔 정보를 등록하시겠습니까?")){
           return;
        }
        console.log('hotel',hotel)
        // React에서 이미지 업로드시 반드시 formData 객체를 생성한다.
        const formData = new FormData();
        
        // 자바의 확장 for문과 비슷한 
        // 리액트의 for ~ in 구문
        // 객체의 key를 하나씩 꺼내는 구문
        /* for(let key in hotel){
            // key중 img 확인
            if(key === 'h_Img' || key === 'h_s_Img1' || key === 'h_s_Img2' || key === 'h_s_Img3' || key === 'h_s_Img4'){
                formData.append('uploadFile', hotel[key]);
            }else if(key === 'discount'){
                formData.append(key,Number(hotel[key]));
            }else if(key === 'startDate' || key === 'endDate'){
                formData.append(key,Date(hotel[key]));
            }else{
                formData.append(key,hotel[key]);
            }
        } */
         /// 파일만 별도로 추가
        formData.append('h_Img', hotel.h_Img);
        formData.append('h_s_Img1', hotel.h_s_Img1);
        formData.append('h_s_Img2', hotel.h_s_Img2);
        formData.append('h_s_Img3', hotel.h_s_Img3);
        formData.append('h_s_Img4', hotel.h_s_Img4);
        // 나머지 텍스트 필드들을 JSON 하나로 묶어서 추가
        const textData = {
            hotelName: hotel.hotelName,
            country: hotel.country,
            city: hotel.city,
            type: hotel.type,
            h_address: hotel.h_address,
            discount:Number( hotel.discount),
            startDate: hotel.startDate,
            endDate: hotel.endDate,
            roomservice: r_value,
            publicservice: p_value,
            otherservice: o_value
        };

        console.log(textData,"00000000000000000000000000000000000000000")

        // JSON 문자열로 변환해서 testData 하나로 묶기
        formData.append('hotelData', JSON.stringify(textData));



        axios.post('/api/hotel/insert',formData)
        .then((res)=>{
            if(res.data === 1){
                alert("호텔상품등록 성공")
                window.scrollTo(0, 0)
                navigate("/adminpage2")
            }
        })
        .catch((error)=>{
            console.log("등록실패")
        })
        setRender(!render)
    }
    // 공통 임력 처리 함수
    const handleChange=(e)=>{
        // input의 name 값을 가져오기
        const inputName = e.target.name;
        if(e.target.type === 'file'){
            // ...car를 반드시 얕은 복사해야함
            // 얕은 복사 하지 않으면 랜더링이 안됨
            //
            setHotel({...hotel,[inputName]:e.target.files[0]})
        }else{
            // file를 제외한 모든 숫자, 문자, 의 input value저장
            setHotel({...hotel,[inputName]:e.target.value}) // 스프레드구문 -> 펼쳐진 상테로 원하는 값
        }
    }

    const maxchk01 = 8;
    const maxchk02 = 3;


    // 체크 박스 선택시 선택한 요소 추가
    const addroomServiceHandler=(e)=>{

        const roomserviceCopy=[...roomservice]

        const chking = roomserviceCopy.includes(e)

        if(chking){
            const arr = roomserviceCopy.filter((f)=>f !== e)
            setRoomservice(arr)
            return
        }

        if(roomserviceCopy.length>=maxchk01){
            alert("최대 선택 갯수는 8개 입니다")
            console.log(roomservice)

            return
        }

        roomserviceCopy.push(e)
        setRoomservice(roomserviceCopy)
        console.log("확인용")
        console.log(roomservice)

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
                <h2 className="admin_title">호텔 상품 추가</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회 <i class="fa-solid fa-caret-down"></i></span>
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
                            <span className="admin_menu">등록  <i class="fa-solid fa-caret-down"></i></span>
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
                            <span className="admin_menu">게시판 <i class="fa-solid fa-caret-down"></i></span>
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
                        {/* <div className="admin_text" style={{textAlign:"left",width:"800px"}}>호텔 상품 추가</div> */}
                        <div className="admin_list">
                            <table className="list_table" style={{width:"800px"}}>
                                <thead className="DB_table">
                                    <tr>
                                        <th width="200px">호텔이름</th>
                                        <th  >
                                            <input type="text" name="hotelName" onChange={handleChange}  style={{width:"500px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">국가</th>
                                        <th  >
                                            {/* <input type="text" name="country" onChange={handleChange} style={{width:"500px",height:"30px"}}/> */}
                                            <select className="select" name="country" onChange={(e)=>setHotel({...hotel,[e.target.name]:e.target.value,city:''})} style={{width:'130px'}}>
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
                                        <th  >
                                            {/* <input type="text" name="city" onChange={handleChange} style={{width:"500px",height:"30px"}}/> */}
                                            <select className="select" name="city" onChange={(e)=>setHotel({...hotel,[e.target.name]:e.target.value})} value={hotel.city} style={{width:'130px'}}>
                                                <option value='' hidden>=== 선택 ===</option>
                                                {hotel.country === 'Korea'?
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
                                                hotel.country === 'Japan'? 
                                                    <>
                                                        <option value="Tokyo">도쿄</option>
                                                        <option value="Sapporo">삿포로</option>
                                                    </>
                                                    :
                                                hotel.country === 'USA'? 
                                                    <>
                                                        <option value="LosAngeles">로스앤젤레스</option>
                                                        <option value="New York">뉴욕</option>
                                                        <option value="Guam">괌</option>
                                                    </>
                                                    :
                                                hotel.country === 'China'? 
                                                    <>
                                                        <option value="Zhangjiajie">장가계</option>
                                                        <option value="Shanghai">상하이</option>
                                                    </>
                                                    :
                                                hotel.country === 'Italy'? 
                                                    <>
                                                        <option value="Rome">로마</option>
                                                        <option value="Venice">베네치아</option>
                                                    </>
                                                    :
                                                hotel.country === 'France'? 
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
                                        <th >
                                            {/* <input type="text" name="type" onChange={handleChange} style={{width:"400px",height:"30px"}}/> */}
                                            <select  className="select" name="type" onChange={(e) => setHotel({...hotel,[e.target.name]:e.target.value})} style={{width:'130px'}}>
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
                                        <th  >
                                            <input type="text" name="h_address" onChange={handleChange} style={{width:"500px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">할인여부</th>
                                        <th  >
                                            {/* <input type="text" name="discount" onChange={handleChange} style={{width:"400px",height:"30px"}}/> */}
                                            {/* <select  className="discount" name="discount" onChange={(e) => setSearchType(e.target.value)}> */}
                                            <select  className="select" name="discount" onChange={(e) => setHotel({...hotel,[e.target.name]:e.target.value})} style={{width:'130px'}}>
                                                {/* setHotel({...hotel,[inputName]:e.target.value}) */}
                                                <option value="1">할인</option>
                                                <option value="0">미할인</option>
                                            </select>
                                        </th>

                                    </tr>
                                    <tr>
                                        <th width="200px">예약시작일</th>
                                        <th  >
                                            <input type="text" name="startDate" onChange={handleChange} style={{width:"500px",height:"30px"}}/>
                                            <p style={{fontWeight:'500', fontSize:'12px',color:'#bbb', marginTop:'10px'}}>{`ex) 2000-01-01`}</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">예약종료일</th>
                                        <th  >
                                            <input type="text" name="endDate" onChange={handleChange} style={{width:"500px",height:"30px"}}/>
                                            <p style={{fontWeight:'500', fontSize:'12px',color:'#bbb', marginTop:'10px'}}>{`ex) 2000-01-01`}</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">메인이미지</th>
                                        <th  >
                                            <input type="file" name="h_Img" onChange={handleChange} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">1번째 서브이미지</th>
                                        <th  >
                                            <input type="file" name="h_s_Img1" onChange={handleChange} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">2번째 서브이미지</th>
                                        <th  >
                                            <input type="file" name="h_s_Img2" onChange={handleChange} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">3번째 서브이미지</th>
                                        <th  >
                                            <input type="file" name="h_s_Img3" onChange={handleChange} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">4번째 서브이미지</th>
                                        <th  >
                                            <input type="file" name="h_s_Img4" onChange={handleChange} />
                                        </th>
                                    </tr>
                                    
                                    <tr>
                                        <th width="200px">객내시설{`(최대 8개)`}</th>
                                        <th  className="cheakboxgr">
                                            {/* <input type="text" name="roomservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="roomservice" id="roomservice1" onChange={()=>{addroomServiceHandler("무선인터넷")}} 
                                            disabled={!roomservice.includes("무선인터넷") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice1">무선인터넷</label>
                                            <input type="checkbox" name="roomservice" id="roomservice2" onChange={()=>{addroomServiceHandler("욕실용품")}}
                                            disabled={!roomservice.includes("욕실용품") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice2">욕실용품</label>
                                            <input type="checkbox" name="roomservice" id="roomservice3" onChange={()=>{addroomServiceHandler("실내수영장")}}
                                            disabled={!roomservice.includes("실내수영장") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice3">실내수영장</label>
                                            <br/>
                                            <input type="checkbox" name="roomservice" id="roomservice4" onChange={()=>{addroomServiceHandler("TV")}}
                                            disabled={!roomservice.includes("TV") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice4">TV</label>
                                            <input type="checkbox" name="roomservice" id="roomservice5" onChange={()=>{addroomServiceHandler("샤워실")}}
                                            disabled={!roomservice.includes("샤워실") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice5">샤워실</label>
                                            <input type="checkbox" name="roomservice" id="roomservice6" onChange={()=>{addroomServiceHandler("욕조")}}
                                            disabled={!roomservice.includes("욕조") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice6">욕조</label>
                                            <input type="checkbox" name="roomservice" id="roomservice7" onChange={()=>{addroomServiceHandler("객실내취사")}}
                                            disabled={!roomservice.includes("객실내취사") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice7">객실내취사</label>
                                            <input type="checkbox" name="roomservice" id="roomservice8" onChange={()=>{addroomServiceHandler("금연")}}
                                            disabled={!roomservice.includes("금연") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice8">금연</label>
                                            <br/>
                                            <input type="checkbox" name="roomservice" id="roomservice9" onChange={()=>{addroomServiceHandler("에어컨")}}
                                            disabled={!roomservice.includes("에어컨") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice9">에어컨</label>
                                            <input type="checkbox" name="roomservice" id="roomservice10" onChange={()=>{addroomServiceHandler("드라이기")}}
                                            disabled={!roomservice.includes("드라이기") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice10">드라이기</label>
                                            <input type="checkbox" name="roomservice" id="roomservice11" onChange={()=>{addroomServiceHandler("냉장고")}}
                                            disabled={!roomservice.includes("냉장고") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice11">냉장고</label>
                                            <input type="checkbox" name="roomservice" id="roomservice12" onChange={()=>{addroomServiceHandler("전기주전자")}}
                                            disabled={!roomservice.includes("전기주전자") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice12">전기주전자</label>
                                            <input type="checkbox" name="roomservice" id="roomservice13" onChange={()=>{addroomServiceHandler("개인콘센트")}}
                                            disabled={!roomservice.includes("개인콘센트") && roomservice.length >= 8}/>
                                            <label htmlFor="roomservice13">개인콘센트</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">공용시설{`(최대 8개)`}</th>
                                        <th   className="cheakboxgr">
                                            {/* <input type="text" name="publicservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="publicservice" id="publicservice1" onChange={()=>{addpublicServiceHandler("피트니스")}}
                                            disabled={!publicservice.includes("피트니스") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice1">피트니스</label>
                                            <input type="checkbox" name="publicservice" id="publicservice2" onChange={()=>{addpublicServiceHandler("레스토랑")}}
                                            disabled={!publicservice.includes("레스토랑") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice2">레스토랑</label>
                                            <input type="checkbox" name="publicservice" id="publicservice3" onChange={()=>{addpublicServiceHandler("사우나")}}
                                            disabled={!publicservice.includes("사우나") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice3">사우나</label>
                                            <br/>
                                            <input type="checkbox" name="publicservice" id="publicservice4" onChange={()=>{addpublicServiceHandler("실내수영장")}}
                                            disabled={!publicservice.includes("실내수영장") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice4">실내수영장</label>
                                            <input type="checkbox" name="publicservice" id="publicservice5" onChange={()=>{addpublicServiceHandler("야외수영장")}}
                                            disabled={!publicservice.includes("야외수영장") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice5">야외수영장</label>
                                            <input type="checkbox" name="publicservice" id="publicservice6" onChange={()=>{addpublicServiceHandler("편의점")}}
                                            disabled={!publicservice.includes("편의점") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice6">편의점</label>
                                            <input type="checkbox" name="publicservice" id="publicservice7" onChange={()=>{addpublicServiceHandler("바")}}
                                            disabled={!publicservice.includes("바") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice7">바</label>
                                            <input type="checkbox" name="publicservice" id="publicservice8" onChange={()=>{addpublicServiceHandler("라운지")}}
                                            disabled={!publicservice.includes("라운지") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice8">라운지</label>
                                            <br/>
                                            <input type="checkbox" name="publicservice" id="publicservice9" onChange={()=>{addpublicServiceHandler("엘리베이터")}}
                                            disabled={!publicservice.includes("엘리베이터") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice9">엘리베이터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice10" onChange={()=>{addpublicServiceHandler("비즈니스센터")}}
                                            disabled={!publicservice.includes("비즈니스센터") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice10">비즈니스센터</label>
                                            <input type="checkbox" name="publicservice" id="publicservice11" onChange={()=>{addpublicServiceHandler("건조기")}}
                                            disabled={!publicservice.includes("건조기") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice11">건조기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice12" onChange={()=>{addpublicServiceHandler("탈수기")}}
                                            disabled={!publicservice.includes("탈수기") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice12">탈수기</label>
                                            <input type="checkbox" name="publicservice" id="publicservice13" onChange={()=>{addpublicServiceHandler("바베큐")}}
                                            disabled={!publicservice.includes("바베큐") && publicservice.length >= 8}/>
                                            <label htmlFor="publicservice13">바베큐</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">기타시설{`(최대 3개)`}</th>
                                        <th   className="cheakboxgr">
                                            {/* <input type="text" name="otherservice" onChange={handleChange} /> */}
                                            <input type="checkbox" name="otherservice" id="otherservice1" onChange={()=>{addotherServiceHandler("스프링클러")}}
                                            disabled={!otherservice.includes("스프링클러") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice1">스프링클러</label>
                                            <input type="checkbox" name="otherservice" id="otherservice2" onChange={()=>{addotherServiceHandler("반려견동반")}}
                                            disabled={!otherservice.includes("반려견동반") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice2">반려견동반</label>
                                            <input type="checkbox" name="otherservice" id="otherservice3" onChange={()=>{addotherServiceHandler("카드결제")}}
                                            disabled={!otherservice.includes("카드결제") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice3">카드결제</label>
                                            <input type="checkbox" name="otherservice" id="otherservice4" onChange={()=>{addotherServiceHandler("짐보관가능")}}
                                            disabled={!otherservice.includes("짐보관가능") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice4">짐보관가능</label>
                                            <br/>
                                            <input type="checkbox" name="otherservice" id="otherservice5" onChange={()=>{addotherServiceHandler("개인사물함")}}
                                            disabled={!otherservice.includes("개인사물함") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice5">개인사물함</label>
                                            <input type="checkbox" name="otherservice" id="otherservice6" onChange={()=>{addotherServiceHandler("픽업서비스")}}
                                            disabled={!otherservice.includes("픽업서비스") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice6">픽업서비스</label>
                                            <input type="checkbox" name="otherservice" id="otherservice7" onChange={()=>{addotherServiceHandler("캠프파이어")}}
                                            disabled={!otherservice.includes("캠프파이어") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice7">캠프파이어</label>
                                            <input type="checkbox" name="otherservice" id="otherservice8" onChange={()=>{addotherServiceHandler("무료주차")}}
                                            disabled={!otherservice.includes("무료주차") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice8">무료주차</label>
                                            
                                            <input type="checkbox" name="otherservice" id="otherservice9" onChange={()=>{addotherServiceHandler("조식제공")}}
                                            disabled={!otherservice.includes("조식제공") && otherservice.length >= 3}/>
                                            <label htmlFor="otherservice9">조식제공</label>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'}>
                                    <button type="button" className="insertBtn">
                                            취소하기 <i class="fa fa-times"></i>
                                    </button>
                                </Link>
                                <button className="insertBtn" type="button" onClick={submitHandler}>추가하기 <i class="bi bi-pencil"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}