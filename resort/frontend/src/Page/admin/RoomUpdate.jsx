import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RoomUpdate(){

    const {userEmail,setRender,render} = useContext(ResortDataContext)

    const {r_code} = useParams();
    const {RoomData} = useContext(ResortDataContext)
    const [relode,setRelode] = useState(false)
    const [h_code,setH_code] = useState(null)
    const [roomName,setRoomName] = useState(null)
    const [price,setPrice] = useState(null)
    const [maxOccupancy,setMaxOccupancy] = useState(null)
    const [oneData,setOneData] = useState(null)
    const [hotelData,setHotelData] = useState([])
    const [r_img,setR_img] = useState('')
    const navigate = useNavigate();
    
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
    
    
    
    //상품 들록하는 submit 함수
    const submitHandler=()=>{
        if(!window.confirm("입력한 객실 정보로 수정하시겠습니까?")){
           return;
        }
        console.log(hotelData)
        console.log(h_code)
        if(hotelData.find((f)=>f.h_code === Number(h_code)) === undefined){
            alert("등록된 호텔중 해당하는 호텔이 존재하지 않습니다.");
            return;
        }
        if(price>300000){
            alert("최대 가격을 다시 확인해주세요.");
            return;
        }
        if(maxOccupancy>8){
            alert("최대 등록 가능한 인원 수를 다시 확인해주세요.");
            return;
        }


        axios.put('/api/room/update',{
            r_code:r_code,
            h_code: h_code === null? oneData?.h_code:h_code,
            roomName: roomName===null?oneData?.roomName:roomName,
            price: price === null? oneData?.price:price,
            maxOccupancy: maxOccupancy === null? oneData?.maxOccupancy:maxOccupancy,
            r_img: oneData?.r_img,
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("객실정보 수정이 완료되었습니다")
            window.scrollTo(0, 0)
            navigate('/adminPage3'); 
        })
        .catch((error) => {
            console.error(error);
        });
        setRender(!render)
    }
    // 공통 임력 처리 함수
    
    useEffect(()=>{
        axios.get(`/api/room/oneRoom/${r_code}`)
        .then((res) => {
            console.log(res.data);
            setOneData(res.data);
            setH_code(res.data.h_code);
            setPrice(res.data.price);
            setRoomName(res.data.roomName);
            setMaxOccupancy(res.data.maxOccupancy);
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[])

    

    /* useEffect(()=>{
        // value={h_code === undefined? RoomData[r_code-1].h_code:h_code}
        if (!RoomData || RoomData.length === 0) return; // 데이터 없으면 실행 안함

        const target = RoomData[r_code-1];
        if (!target) return; // 해당 인덱스 없으면 종료

        console.log(h_code)
        console.log(RoomData)
        console.log(RoomData[r_code-1])
        console.log(RoomData[r_code-1].h_code)
        setH_code(RoomData[r_code-1].h_code)
        setRoomName(RoomData[r_code-1].roomName)
        setPrice(RoomData[r_code-1].price)
        setMaxOccupancy(RoomData[r_code-1].maxOccupancy)
    },[]) */
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
                <h2 className="admin_title">{r_code}번 객실 상품 수정</h2>
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
                        {/* <div className="admin_text" style={{textAlign:"left",width:"800px"}}>{r_code}번 객실 상품 수정</div> */}
                        <div className="admin_list">
                            <table className="list_table"  style={{width:"800px"}}>
                                <thead className="DB_table">
                                    <tr>
                                        <th width="200px">호텔코드</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="h_code" onChange={(e)=>{setH_code(e.target.value),setR_img(`["/img/${h_code}-1.jpg","/img/${h_code}-2.jpg","/img/${h_code}-3.jpg","/img/${h_code}-4.jpg","/img/${h_code}-5.jpg"]`)}} 
                                                value={h_code === null? oneData?.h_code:h_code} style={{width:"400px",height:"30px"}}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">객실이름</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="roomName" onChange={(e)=>setRoomName(e.target.value)} 
                                                value={roomName === null? oneData?.roomName:roomName} style={{width:"400px",height:"30px"}}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">{`가격(최대 300,000원)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="price" onChange={(e)=>setPrice(e.target.value)} 
                                                value={price === null? oneData?.price:price} style={{width:"400px",height:"30px"}}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">{`최대인원(8명)`}</th>
                                        <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="maxOccupancy" onChange={(e)=>setMaxOccupancy(e.target.value)} 
                                                value={maxOccupancy === null? oneData?.maxOccupancy:maxOccupancy} style={{width:"400px",height:"30px"}}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'}>
                                    <button type="button" className="insertBtn">
                                        취소하기 <i class="fa fa-times"></i>
                                    </button>
                                </Link>
                                <button className="insertBtn" type="button" onClick={submitHandler}>수정하기 <i class="bi bi-pencil"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}