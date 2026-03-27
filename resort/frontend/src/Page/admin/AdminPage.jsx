import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage(){
    // 주석 03-16
    const {userEmail} = useContext(ResortDataContext)

    const [members,setMembers] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState("phone");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [Num,setNum] = useState("")
    const [chking,setChking] = useState(true)
    useEffect(()=>{
        axios.get('/api/member/list',{
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
            setMembers(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)


        // 회원 총 수
        axios.get('/api/member/getAllcount')
        .then((res) => {
            console.log("총원",res.data)
            setNum(res.data);
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
        e.preventDefault()
        setSearchKeyword(serch)
        setPage(1);
    }

    // 삭제를 위한 useEffect
    const delHandler=(m_email)=>{
        axios.delete('/api/member/deletemember',{
            params: {
                m_email: m_email
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
                <h2 className="admin_title">회원 정보 조회</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회 <i class="fa-solid fa-caret-down"></i>
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
                            </span>
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">등록  <i class="fa-solid fa-caret-down"></i>
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
                            </span>                            
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">게시판 <i class="fa-solid fa-caret-down"></i>
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
                            </span>
                        </div>
                    </div>
                    <div className="admin_body">
                        {/* <div className="admin_text" style={{width:"1600px"}}>회원 정보 조회</div> */}
                        <div id="search_wrap" style={{width:"1600px"}}>
                            <form onSubmit={submitHandler}>
                                <select className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                    <option value="phone">전화번호</option>
                                    <option value="gender">성별</option>
                                    <option value="nickName">닉네임</option>
                                    <option value="mail">이메일</option>
                                </select>
                                
                                <input className="searchbox" type="text" name="searchKeyword" placeholder="검색어를 입력하세요" value={serch} onChange={(e) => setSerch(e.target.value)}/>
                                <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                    <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("phone"),setSerch(""),setPage(1)}} >
                                    <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                                </button>
                                {/* <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("phone"),setSerch(""),setPage(1)}}/> */}
                            </form>
                            <div className="member_chk">
                                <input type="checkbox" name="chkMember" id="chkMember" onChange={()=>setChking(!chking)}/>
                                <label htmlFor="chkMember" className="chkMember" style={{marginLeft:'5px'}}>탈퇴한 회원숨기기</label>
                            </div>
                        </div>
                        <div className="admin_list">
                            <table className="list_table" style={{width:"1600px"}}>
                                <thead >
                                    <tr className="table_head">
                                        <th width="90px">No.</th>
                                        <th width="90px">회원번호</th>
                                        <th width="190px">E_mail</th>
                                        <th width="150px">전화번호</th>
                                        <th width="150px">생일</th>
                                        <th width="80px">성별</th>
                                        <th>닉네임</th>
                                        <th width="80px">쿠폰 보유</th>
                                        <th width="230px">가입일</th>
                                        <th width="120px">회원정보수정</th>
                                        <th width="120px">회원탈퇴여부</th>
                                        <th width="230px">회원탈퇴시간</th>
                                        {/* <th width="120px">탈퇴처리</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((item,index)=>{
                                        const num = Num - (10*(page-1)) - index
                                        return(
                                            (item.m_is_deleted===1 && !chking) ?null:

                                                <tr key={index} className="table_head">
                                                    <td>{num}</td>
                                                    <td>{item.m_code}</td>
                                                    <td>{item.m_email}</td>
                                                    <td>
                                                        {`${item.m_phone.slice(0,3)} - ${item.m_phone.slice(3,7)} - ${item.m_phone.slice(7,11)}`}
                                                    </td>
                                                    <td>{item.m_birth.slice(0,10)}</td>
                                                    <td>{item.m_gender === 0? "남":"여"}</td>
                                                    <td style={{width:'101px'}}>{item.m_nickName}</td>
                                                    <td>{item.m_coupon === 0? "미보유":"보유"}</td>
                                                    <td>{`${item.m_regDate.slice(0,10)} - ${item.m_regDate.slice(11,16)}`}</td>
                                                    {item.m_is_deleted===0 ?<td><Link to={`/memberUpdate/${item.m_code}`}><button className="table_btn" onClick>회원수정</button> </Link></td>:<td></td>}
                                                    <td>{item.m_is_deleted===0?"이용중":"탈퇴"}</td>
                                                    <td>{item.m_is_deleted===0?"":`${item.deleted_at.slice(0,10)} - ${item.deleted_at.slice(11,16)} `}</td>
                                                    {/* <td><button type="button" onClick={()=>delHandler(item.m_email)} className="table_btn">회원삭제</button></td> */}
                                                </tr>
                                            
                                        )
                                        
                                    })}
                                </tbody>
                            </table>
                            <div className="paging" style={{width:"1600px"}}>
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