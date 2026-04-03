import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage3(){
    const {userEmail} = useContext(ResortDataContext)

    const [hotel,setHotel] = useState([])
    const [room,setRoom] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [num,setNum] = useState(0)
    const [searchType, setSearchType] = useState("roomName");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [isInfo,setIsinfo] = useState(false)
    const [allCount,setAllCount] = useState("")
    useEffect(()=>{
        axios.get('/api/room/list',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("객실정보 데이터 : ", res.data.list);
            console.log("객실정보 데이터 : ", res.data.ph);
            setRoom(res.data.list || []);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword||"");
        })
        .catch((error) => {
            console.error("error", error)
        })

        axios.get('/api/hotel/onlyhotel')
        .then((res) => {
            // console.log("호텔 데이터 : ", res.data);
            setHotel(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
        
        console.log(page)

        // 호텔 총 수
        axios.get('/api/room/getAllCount')
        .then((res) => {
            setAllCount(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[page,searchType,searchKeyword])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setSearchKeyword(serch)
        setPage(1);
    }

    /* const setTrue =(index)=>{
        setIsinfo((state)=>{
            const statecopy = [...state]
            statecopy[index] = !statecopy[index]
            return statecopy
        })
    } */

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
                <h2 className="admin_title">객실 정보 조회</h2>
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
                        <div className="menu_box">
                            <Link to={`/dashboard`} onClick={() => window.scrollTo(0, 0)}>
                            <span className="admin_menu">통계</span>
                            </Link>
                        </div>
                    </div>
                    <div className="admin_body">
                        {/* <div className="admin_text">객실 정보 조회</div> */}
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="roomName">객실명</option>
                                        <option value="maxOccupancy">최대인원</option>
                                        <option value="hotelName">호텔명</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword" placeholder="검색어를 입력하세요" value={serch} onChange={(e) => setSerch(e.target.value)}/>
                                    <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                        <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                    <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("roomName"),setSerch(""),setPage(1)}} >
                                        <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                                    </button>
                                    {/* <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName"),setSerch(""),setPage(1)}}/> */}
                                </form>
					        </div>
                        <div className="admin_list">
                            <table className="list_table" >
                                <thead className="table_head">
                                    <tr className="table_head">
                                        <th width="50px">No.</th>
                                        <th width="50px">객실코드</th>
                                        <th width="80px">도시명</th>
                                        <th width="200px">호텔명</th>
                                        <th width="100px">객실명</th>
                                        <th width="100px">가격</th>
                                        <th width="100px">최대인원</th>
                                        <th width="80px">상세정보</th>
                                        
                                    </tr>
                                </thead>
                                <tbody >
                                    {room.map((item,index)=>{
                                        const num = allCount - (10*(page-1)) - index
                                        return(

                                            <tr key={index} className="table_head">
                                                <td>{num}</td>
                                                <td>{item.r_code}</td>
                                                <td>{hotel[item.h_code-1]?.city}</td>
                                                <td>{hotel[item.h_code-1]?.hotelName}</td>
                                                <td>{item.roomName}</td>
                                                <td>{item.price.toLocaleString()}원</td>
                                                <td>{item.maxOccupancy}</td>
                                                <td><button className="table_btn" onClick={()=>{setIsinfo(!isInfo),setNum(index)}}>상세정보</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {isInfo && <div className="admin_modal" style={{height:"700px"}}>
                                
                                    <button type="button" onClick={()=>setIsinfo(!isInfo)} className="closeBtn">✖</button>
                                    <div className="img_box" style={{marginTop:"20px"}}>
                                        <img  src={room[num].r_code%3===0?`/img/${hotel[room[num].h_code-1]?.h_s_Img1}`
                                        :room[num].r_code%3===1?`/img/${hotel[room[num].h_code-1].h_s_Img2}`
                                        :`/img/${hotel[room[num].h_code-1].h_s_Img3}`} alt="img" className="roomImg"/>
                                    </div>
                                    <div className="service_box" >
                                        <ul>
                                            {/* <span style={{width:'70px',display:'inline-block',fontWeight:600}}>호텔명</span> : <span>{hotel[num].hotelName}</span> */}
                                            <li>
                                                <p><span style={{width:'70px',display:'inline-block',fontWeight:600}}>호텔명</span> : <span>{hotel[room[num].h_code-1]?.hotelName}</span></p>
                                            </li>
                                            <li>
                                                <p><span style={{width:'70px',display:'inline-block',fontWeight:600}}>방이름</span> : <span>{room[num].roomName}</span></p>
                                            </li>
                                            <li>
                                                <p><span style={{width:'70px',display:'inline-block',fontWeight:600}}>방가격</span> : <span>{room[num].price.toLocaleString()}</span></p>
                                            </li>
                                            <li>
                                                <p><span style={{width:'70px',display:'inline-block',fontWeight:600}}>최대인원</span> : <span>{room[num].maxOccupancy}</span></p>
                                            </li>
                                        </ul>
                                    </div>
                                    <Link to={`/roomUpdate/${room[num].r_code}`}>
                                        <button className="updateBtn" style={{marginTop:"30px",border: "2px solid #42799b",color:"#42799b"}}>
                                            내용 수정하기
                                        </button>
                                    </Link>
                                </div>
                            }
                            <div className="paging">
                                {/* 페이지가 많을때 좌우 버튼 */}
                                {ph.prev && (
                                    <button className="arrowbtn" onClick={() => setPage(ph.startPage - 1)}> ⇦  Prev</button>
                                )}
                                <div className="pages">{pages}</div>
                                {ph.next && (
                                    <button className="arrowbtn" onClick={() => setPage(ph.endPage + 1)}>Next ⇨</button>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}