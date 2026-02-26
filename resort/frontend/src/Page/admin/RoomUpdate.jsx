import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RoomUpdate(){
    const {r_code} = useParams();
    const {RoomData} = useContext(ResortDataContext)

    const [h_code,setH_code] = useState(null)
    const [roomName,setRoomName] = useState(null)
    const [price,setPrice] = useState(null)
    const [maxOccupancy,setMaxOccupancy] = useState(null)

    const [r_img,setR_img] = useState('')
    const navigate = useNavigate();
    //상품 들록하는 submit 함수
    const submitHandler=()=>{
        axios.put('/api/room/update',{
            r_code:r_code,
            h_code: h_code,
            roomName: roomName,
            price: price,
            maxOccupancy: maxOccupancy,
            r_img: r_img,
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("객실정보 수정이 완료되었습니다")
            navigate('/adminpage3'); 
        })
        .catch((error) => {
            console.error(error);
        });
    }
    // 공통 임력 처리 함수
    
    useEffect(()=>{
        // value={h_code === undefined? RoomData[r_code-1].h_code:h_code}
        console.log(h_code)
        console.log(RoomData)
        console.log(RoomData[r_code-1])
        console.log(RoomData[r_code-1].h_code)
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
                        <div className="admin_text">{r_code}번 객실 상품 수정</div>
                        <div className="admin_list">
                            <table className="list_table" border="1" style={{width:"800px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">h_code</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="h_code" onChange={(e)=>{setH_code(e.target.value),setR_img(`["/img/${room.h_code}-1.jpg","/img/${room.h_code}-2.jpg","/img/${room.h_code}-3.jpg","/img/${room.h_code}-4.jpg","/img/${room.h_code}-5.jpg"]`)}} 
                                                value={h_code === null? RoomData[r_code-1].h_code:h_code}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">roomName</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="roomName" onChange={(e)=>setRoomName(e.target.value)} 
                                                value={roomName === null? RoomData[r_code-1].roomName:roomName}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">price</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="price" onChange={(e)=>setPrice(e.target.value)} 
                                                value={price === null? RoomData[r_code-1].price:price}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">maxOccupancy</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="maxOccupancy" onChange={(e)=>setMaxOccupancy(e.target.value)} 
                                                value={maxOccupancy === null? RoomData[r_code-1].maxOccupancy:maxOccupancy}
                                            />
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