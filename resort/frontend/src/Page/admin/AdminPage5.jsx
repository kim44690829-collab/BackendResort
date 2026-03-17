import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage5(){
    
    const {userEmail} = useContext(ResortDataContext)

    const [board,setBoard] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState("m_code");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("");
    const [isInfo,setIsInfo] = useState(false);
    const [num,setNum] = useState([]);
    const [allData,setAllData] = useState([])
    
    useEffect(()=>{
        axios.get('/api/board/adminlist',{
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
            setBoard(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
        // 전체 정보 가져오기
        axios.get('/api/board/adminAlllist')
        .then((res) => {
            console.log("회원정보 데이터 : ", res.data);
            setAllData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)

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
        e.preventDefault()
        setSearchKeyword(serch)
        setPage(1);
    }

    // 삭제를 위한 useEffect
    const delHandler=(email)=>{
        axios.delete('/api/member/deletemember',{
            params: {
                m_email: email
            }
        })
        .then((res) => {
            console.log("회원정보 삭제 성공 : ");
            alert("회원정보 삭제 성공 : ")
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
                        <div className="admin_text">1대1 문의 게시판 조회</div>
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="m_code">회원번호</option>
                                        <option value="b_title">제목</option>
                                        <option value="b_writer">작성자명</option>
                                        <option value="b_content">문의내용</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword"  value={serch} placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("phone"),setSerch(""),setPage(1)}}/>
                                </form>
					        </div>
                        <div className="admin_list">
                            <table className="list_table" >
                                <thead >
                                    <tr className="table_head">
                                        <th style={{width:"5%"}}>No.</th>
                                        <th style={{width:"40%"}}>제목</th>
                                        <th style={{width:"20%"}}>작성자명</th>
                                        <th style={{width:"15%"}}>작성일자</th>
                                        <th style={{width:"10%"}}>상세보기</th>
                                        <th style={{width:"10%"}}>답글여부</th>
                                        {/* <th style={{width:"60px"}}>회원번호</th>
                                        <th style={{width:"250px"}}>제목</th>
                                        <th style={{width:"100px"}}>문의비밀번호</th>
                                        <th style={{width:"80px"}}>조회수</th>
                                        <th style={{width:"160px"}}>문의내용</th>
                                        <th style={{width:"120px"}}>수정일자</th>
                                        <th style={{width:"300px",overflow:"hidden"}}>문의 이미지</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {board.map((item,index)=>{
                                        
                                        const chk = allData.filter((f)=>f.ref === item.ref)
                                        console.log(chk)
                                        return(
                                            <tr key={index} className="table_head">
                                                {item.re_step ===1?
                                                    <>
                                                        <td>{item.re_step === 2?`${item.ref}번 답글`:item.ref}</td>
                                                        <td>{item.b_title}</td>
                                                        <td>{item.b_writer}</td>
                                                        <td>{item.b_date.slice(0,10)}</td>
                                                        <td>
                                                            <button type="button" className="table_btn"  onClick={()=>{setIsInfo(!isInfo),setNum(chk)}}>상세보기</button>
                                                        </td>
                                                        <td>
                                                            {chk.length<2?"":"답글 작성 완료"}
                                                        </td>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {isInfo && <div className="admin_modal">
                                        
                                            <button type="button" onClick={()=>setIsInfo(!isInfo)} className="closeBtn">✖</button>
                                            <h2 style={{fontWeight:600,fontSize:"30px",margin:"0 auto 30px",borderBottom:"2px solid #cececeff",width:"900px",paddingBottom:"30px"}}>1대1 문의 상세</h2>
                                            
                                            <div className="service_box">
                                                <ul className="info_list">
                                                    <li>
                                                        <span>문의 번호 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].ref}</span>
                                                    </li>
                                                    <li>
                                                        <span>제목 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].b_title}</span>
                                                    </li>
                                                    <li>
                                                        <span>비밀번호 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].b_pw}</span>
                                                        <span>조회수 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].readcount}</span>
                                                    </li>
                                                    <li>
                                                        <span>작성일자 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].b_date.slice(0,10)}</span> 
                                                        <span>수정일자 : </span>  <span style={{display:"inline-block",width:"300px"}}>{num[0].b_update.slice(0,10)}</span>
                                                    </li>
                                                    <li style={{margin:"40px 0 0 0"}}>
                                                        <table style={{width:"900px"}}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{width:"15%",height:"180px"}}><span>내용 </span></td>
                                                                    <td style={{width:"85%",height:"180px",backgroundColor:"#e1eaf371",paddingLeft:"15px"}}>
                                                                        <span style={{display:"inline-block",width:"100%"}}>{num[0].b_content}</span>
                                                                    </td>
                                                                    <td>
                                                                        {num[0].b_upload !== null ? <img src={`/img/boardImg/${num[0].b_upload}`} style={{height:"180px",width:"270px",objectFit:"cover"}}/> : null}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </li>
                                                    
                                                    
                                                </ul>
                                            </div>
                                            <div className="service_box" style={{marginTop:"20px"}}>
                                                <table style={{width:"900px"}}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{width:"15%",height:"180px"}}><span>답글내용  </span></td>
                                                            {num[1]!==undefined?
                                                                <td style={{width:"85%" ,height:"180px",backgroundColor:"#e1eaf371",paddingLeft:"15px"}}>
                                                                    <span>{num[1].b_content}</span>
                                                                </td>
                                                                :
                                                                ''
                                                            }
                                                        </tr>
                                                    </tbody>
                                                </table>
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