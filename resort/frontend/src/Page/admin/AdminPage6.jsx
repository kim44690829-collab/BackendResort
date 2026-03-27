import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage6(){
    
    const {userEmail} = useContext(ResortDataContext)

    const [noticelist,setNoticelist] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState("n_title");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [r,setR] = useState(false) // 삭제후 바로 렌더링을 위한 변수
    const [isInfo,setIsinfo] = useState(false)
    const [num,setNum] = useState(0)
    useEffect(()=>{
        axios.get('/api/board/noticelist',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("회원정보 데이터 : ", res.data.list);
            console.log("회원정보 데이터 : ", res.data.ph);
            setNoticelist(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
        console.log(r,"rr")
    },[page,searchType,searchKeyword,r])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        setSearchKeyword(serch)
        setPage(1);
    }
    
    // 삭제를 위한 useEffect
    const delHandler=(n_code)=>{
        if(!window.confirm("정말 공지사항을 삭제하시겠습니까?")){
           return;
        }


        axios.delete('/api/board/deletenotice',{
            params: {
                n_code: n_code
            }
        })
        .then((res) => {
            console.log("공지사항 삭제 성공 : ");
            alert("공지사항 삭제 성공 : ")
            setR(!r)
            console.log(r)
        })
        .catch((error) => {
            console.error("error", error)
        })
        
    }
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
                <h2 className="admin_title">공지사항 조회</h2>
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
                        {/* <div className="admin_text">공지사항 조회</div> */}
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select name="searchType" className="searchbox" style={{width:'200px'}} value={searchType} onChange={(e) => {setSearchType(e.target.value),console.log(searchType)}}>
                                        <option value="n_title">제목</option>
                                        <option value="n_content">내용</option>
                                    </select>
                                    
                                    <input type="text" className="searchbox" name="searchKeyword" placeholder="검색어를 입력하세요" value={serch} onChange={(e) => setSerch(e.target.value)}/>
                                    <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                        <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                    <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("n_title"),setSerch(""),setPage(1)}} >
                                        <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                                    </button>
                                    {/* <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName"),setSerch(""),setPage(1)}}/> */}
                                </form>
					        </div>
                        <div className="admin_list">
                            <table className="list_table">
                                <thead >
                                    <tr className="table_head">
                                        <th style={{width:"50px"}}>No.</th>
                                        <th style={{width:"50px"}}>공지번호</th>
                                        <th width="200px">제목</th>
                                        <th width="100px">작성일자</th>
                                        <th width="100px">내용</th>
                                        <th width="100px">수정일자</th>
                                        {/* <th width="50px">자세히보기</th> */}
                                        <th width="100px">수정하기</th>
                                        <th width="100px">삭제하기</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {noticelist.map((item,index)=>{
                                        return(
                                            <tr key={index} className="table_head">
                                                <td>{item.n_code}</td>
                                                <td>{item.n_code}</td>
                                                <td>{item.n_title}</td>
                                                <td>{item.n_date.slice(0,10)}</td>
                                                <td><button className="table_btn" onClick={()=>{setIsinfo(!isInfo),setNum(index)}}>상세정보</button></td>
                                                <td>{item.n_update.slice(0,10)}</td>
                                                
                                                {/* <td><button type="button" onClick={()=>delHandler(item.n_code)}>자세히</button></td> */}
                                                <td>
                                                    <Link to={`/noticeUpdate/${item.n_code}`}>
                                                        <button className="table_btn">
                                                            공지수정
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td><button type="button" className="table_btn" onClick={()=>delHandler(item.n_code)}>공지삭제</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {isInfo && <div className="admin_modal">
                                        
                                            <button type="button" onClick={()=>setIsinfo(!isInfo)} className="closeBtn">✖</button>
                                            
                                            <div className="service_box">
                                                <ul>
                                                    
                                                    <li>
                                                        <p style={{fontSize:"30px",fontWeight:600,marginBottom:"40px"}}>제목 : {noticelist[num].n_title}</p>
                                                    </li>
                                                    <li>
                                                        <p style={{marginBottom:"40px",paddingBottom:"40px",borderBottom:"2px solid #333"}}>작성일자 : {noticelist[num].n_date.slice(0,10)}</p>
                                                    </li>
                                                    <li>
                                                        
                                                        <p style={{height:"350px", whiteSpace:"pre-wrap"}}>내용 : {noticelist[num].n_content}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            
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