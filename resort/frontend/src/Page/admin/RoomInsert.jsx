import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RoomInsert(){

    const {userEmail,setRender,render ,HotelData} = useContext(ResortDataContext)
    const [hotelData,setHotelData] = useState([])
    const [room,setRoom] = useState({
        h_code:'',
        roomName:'',
        price:'',
        maxOccupancy:'',
        r_img:'',
    })
    const [r_img,setR_img] = useState('')
    const navigate = useNavigate();
    //상품 들록하는 submit 함수

    useEffect(()=>{
        axios.get("/api/hotel/chkAllHotel")
        .then((res)=>{
            console.log(res.data)
            setHotelData(res.data)
        })
        .catch((error)=>{
            console.log("출력실패")
        })
    },[])

    const submitHandler=()=>{
        
        if(hotelData.find((f)=>f.h_code === Number(room.h_code)) === undefined){
            alert("등록된 호텔중 해당하는 호텔이 존재하지 않습니다.");
            return;
        }
        if(room.maxOccupancy>4){
            alert("최대 등록 가능한 인원 수를 다시 확인해주세요.");
            return;
        }

        // React에서 이미지 업로드시 반드시 formData 객체를 생성한다.
        const formData = new FormData();

        
        const textData = {
            h_code:Number(room.h_code),
            roomName:room.roomName,
            price:Number(room.price),
            maxOccupancy:Number(room.maxOccupancy),
            r_img:r_img
        };


        // JSON 문자열로 변환해서 testData 하나로 묶기
        formData.append('roomData', JSON.stringify(textData));



        axios.post('/api/room/insert',formData)
        .then((res)=>{
            if(res.data === 1){
                alert("객실상품등록 성공")
                window.scrollTo(0, 0)
                navigate("/adminpage3")
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
            setRoom({...room,[inputName]:e.target.files[0]})
        }else{
            // file를 제외한 모든 숫자, 문자, 의 input value저장
            setRoom({...room,[inputName]:e.target.value}) // 스프레드구문 -> 펼쳐진 상테로 원하는 값
            setR_img(`["/img/${room.h_code}-1.jpg","/img/${room.h_code}-2.jpg","/img/${room.h_code}-3.jpg","/img/${room.h_code}-4.jpg","/img/${room.h_code}-5.jpg"]`)
        }
    }

    // 추가된 요소 텍스트로 변환된값
    useEffect(()=>{
       if(userEmail !== 'admin@resort.com'){
        return(
            <>
                <div style={{margin:"400px auto",textAlign:"center"}}>
                    <Link to={"/"}>홈으로 돌아가기</Link>

                </div>
            </>
        )
    }
    },[])
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
                            <span className="admin_menu" style={{textAlign:"left",width:"800px"}}>게시판</span>
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
                        <div className="admin_text" style={{textAlign:"left",width:"800px"}}>객실 상품 추가</div>
                        <div className="admin_list">
                            <table className="list_table" style={{width:"800px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">호텔코드</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="h_code" onChange={handleChange} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">객실이름</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="roomName" onChange={handleChange} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">{`가격(최대 300,000원)`}</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="price" onChange={handleChange} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">{`최대인원(4명)`}</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="maxOccupancy" onChange={handleChange} style={{width:"400px",height:"30px"}}/>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'}>
                                    <button type="button" className="insertBtn">
                                        취소하기
                                    </button>
                                </Link>
                                <button type="button" className="insertBtn" onClick={submitHandler}>추가하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}