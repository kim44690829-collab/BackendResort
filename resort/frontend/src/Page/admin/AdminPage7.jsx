import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import { useNavigate } from "react-router-dom";
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage7(){
    const {userEmail} = useContext(ResortDataContext)
    // 
    const navigate = useNavigate();
    const [reviewlist,setReviewlist] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState("rb_score");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [g,setG] = useState(false)
    useEffect(()=>{
        axios.get('/api/board/reviewlist',{
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
            setReviewlist(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
    },[page,searchType,searchKeyword,g])

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
    const delHandler=(rb_code)=>{
        if(!window.confirm("정말 리뷰정보를 삭제하시겠습니까?")){
           return;
        }


        axios.delete('/api/board/deletereview',{
            params: {
                rb_code: rb_code
            }
        })
        .then((res) => {
            console.log("리뷰정보 삭제 성공 : ");
            alert("리뷰정보 삭제 성공 : ")
            setG(!g)
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
                <h2 className="admin_title">리뷰 정보 조회</h2>
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
                        {/* <div className="admin_text">리뷰 정보 조회</div> */}
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select name="searchType" className="searchSelect" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="rb_score">별점</option>
                                        <option value="roomName">객실이름</option>
                                        <option value="m_nickName">작성자닉네임</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword" value={serch} placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                        <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                    <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("rb_score"),setSerch(""),setPage(1)}} >
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
                                        <th width="50px">No.</th>
                                        <th width="50px">별점</th>
                                        <th width="50px">작성일자</th>
                                        <th width="50px">작성자 명</th>
                                        <th width="120px">호텔 이름</th>
                                        <th width="120px">객실 이름</th>
                                        <th width="50px">리뷰 삭제 버튼</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviewlist.map((item,index)=>{
                                        const member_birth = new Date(item.m_birth)
                                        const birth_Date = member_birth.toLocaleDateString('ko-KR')
                                        const member_reg = new Date(item.m_regDate)
                                        const reg_Date = member_reg.toLocaleString('ko-KR')
                                        return(
                                            <tr key={index} className="table_head">
                                                <td>{item.rb_code}</td>
                                                <td>
                                                    {
                                                        (item.rb_score >= 0 && item.rb_score < 0.5) ? <img className='Mainstar1' src='/img/size13-0-0.png' alt="score" /> :
                                                        (item.rb_score >= 1 && item.rb_score < 1.5) ? <img className='Mainstar1' src='/img/size13-1-0.png' alt="score" /> :
                                                        (item.rb_score >= 2 && item.rb_score < 2.5) ? <img className='Mainstar1' src='/img/size13-2-0.png' alt="score" /> :
                                                        (item.rb_score >= 3 && item.rb_score < 3.5) ? <img className='Mainstar1' src='/img/size13-3-0.png' alt="score" /> :
                                                        (item.rb_score >= 4 && item.rb_score < 4.5) ? <img className='Mainstar1' src='/img/size13-4-0.png' alt="score" /> :
                                                        <img className='Mainstar1' src='/img/size13-5-0.png' alt="score" />
                                                    }
                                                    {` / ${item.rb_score}점`}
                                                
                                                </td>
                                                <td>{item.rb_date.slice(0,10)}</td>
                                                <td>{item.m_nickName}</td>
                                                <td>{item.hotelName}</td>
                                                <td>{item.roomName}</td>
                                                <td><button type="button" className="table_btn" onClick={()=>delHandler(item.rb_code)}>리뷰삭제</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
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