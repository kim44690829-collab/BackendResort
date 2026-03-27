import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage2(){

    const {userEmail} = useContext(ResortDataContext)
    const [hotel,setHotel] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [num,setNum] = useState(0)
    const [searchType, setSearchType] = useState("hotelName");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [isInfo,setIsinfo] = useState(false)
    const [allCount,setAllCount] = useState("")
    useEffect(()=>{
        axios.get('/api/hotel/list',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("호텔정보 데이터 : ", res.data.list);
            console.log("호텔정보 데이터 : ", res.data.ph);
            setHotel(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)

        // 호텔 총 수
        axios.get('/api/hotel/getAllCount')
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
                <h2 className="admin_title">호텔 정보 조회</h2>
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
                        {/* <div className="admin_text">호텔 정보 조회</div> */}
                        <div id="search_wrap">
                                <form  onSubmit={submitHandler}>
                                    <select  className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="hotelName" selected>호텔명</option>
                                        <option value="country">국가</option>
                                        <option value="city">도시</option>
                                        <option value="type">숙소유형</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword" value={serch} placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                        <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                    <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName"),setSerch(""),setPage(1)}} >
                                        <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                                    </button>
                                    {/* <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName"),setSerch(""),setPage(1)}}/> */}
                                </form>
					        </div>
                        <div className="admin_list">
                            <table className="list_table" >
                                <thead >
                                    <tr className="table_head">
                                        <th width="50px">No.</th>
                                        <th width="50px">호텔코드</th>
                                        <th width="200px">호텔명</th>
                                        <th width="100px">국가</th>
                                        <th width="100px">도시</th>
                                        <th width="100px">숙소유형</th>
                                        <th width="200px">주소지</th>
                                        <th width="120px">시작일</th>
                                        <th width="120px">종료일</th>
                                        <th width="100px">상세정보</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotel.map((item,index)=>{
                                        const num = allCount - (10*(page-1)) - index
                                        return(
                                            <tr key={index} className="table_head">
                                                <td>{num}</td>
                                                <td>{item.h_code}</td>
                                                <td>{item.hotelName}</td>
                                                <td>{item.country}</td>
                                                <td>{item.city}</td>
                                                <td>{item.type}</td>
                                                <td>{item.h_address}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                                <td><button className="table_btn" onClick={()=>{setIsinfo(!isInfo),setNum(index)}}>상세정보</button></td>
                                            </tr>                                        
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                            {isInfo && <div className="admin_modal">
                                        
                                            <button type="button" onClick={()=>setIsinfo(!isInfo)} className="closeBtn">✖</button>
                                            <div className="img_box" style={{marginTop:"20px"}}>
                                                <img src={`/img/${hotel[num].h_Img}`} alt={`/img/${hotel[num].h_Img}`} />
                                                <img src={`/img/${hotel[num].h_s_Img1}`} alt={`/img/${hotel[num].h_Img}`} />
                                                <img src={`/img/${hotel[num].h_s_Img2}`} alt={`/img/${hotel[num].h_Img}`} />
                                                <img src={`/img/${hotel[num].h_s_Img3}`} alt={`/img/${hotel[num].h_Img}`} />
                                                <img src={`/img/${hotel[num].h_s_Img4}`} alt={`/img/${hotel[num].h_Img}`} />
                                            </div>
                                            <div className="service_box">
                                                <ul>
                                                    
                                                    <li>
                                                        <p>호텔명 : {hotel[num].hotelName}</p>
                                                    </li>
                                                    <li>
                                                        <p>국가 : {hotel[num].country}</p>
                                                    </li>
                                                    <li>
                                                        <p>도시 : {hotel[num].city}</p>
                                                    </li>
                                                    <li>
                                                        <p>숙소유형 : {hotel[num].type}</p>
                                                    </li>
                                                    <li>
                                                        <p>주소지 : {hotel[num].h_address}</p>
                                                    </li>
                                                    <li>
                                                        <p>시작일 : {hotel[num].startDate}</p>
                                                    </li>
                                                    <li>
                                                        <p>종료일 : {hotel[num].endDate}</p>
                                                    </li>
                                                    <li>
                                                        <p>기타시설 : {hotel[num].otherservice.replace(/[\[\]"]/g, " ")}</p>
                                                    </li>
                                                    <li>
                                                        <p>공용시설 : {hotel[num].publicservice.replace(/[\[\]"]/g, " ")}</p>
                                                    </li>
                                                    <li>
                                                        <p>객내시설 : {hotel[num].roomservice.replace(/[\[\]"]/g, " ")}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <Link to={`/hotelUpdate/${hotel[num].h_code}`}>
                                                <button className="updateBtn" style={{color:"#42799b",marginTop:"20px",border: "2px solid #42799b"}}>
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