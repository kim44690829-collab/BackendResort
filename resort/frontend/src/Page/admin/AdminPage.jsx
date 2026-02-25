import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage(){
    

    const [members,setMembers] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState("phone");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
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
                        <div className="admin_text">회원 정보 조회</div>
                        <div className="admin_list">
                            <table className="list_table" border="1">
                                <thead >
                                    <tr>
                                        <th width="50px">Num</th>
                                        <th width="200px">E_mail</th>
                                        <th width="160px">전화번호</th>
                                        <th width="160px">생일</th>
                                        <th width="80px">성별</th>
                                        <th>별명</th>
                                        <th width="80px">쿠폰 보유</th>
                                        <th width="230px">가입일</th>
                                        <th width="120px">회원정보수정</th>
                                        <th width="120px">탈퇴처리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((item,index)=>{
                                        const member_birth = new Date(item.m_birth)
                                        const birth_Date = member_birth.toLocaleDateString('ko-KR')
                                        const member_reg = new Date(item.m_regDate)
                                        const reg_Date = member_reg.toLocaleString('ko-KR')
                                        return(
                                            <tr key={index}>
                                                <td>{item.m_code}</td>
                                                <td>{item.m_email}</td>
                                                <td>{item.m_phone}</td>
                                                <td>{birth_Date}</td>
                                                <td>{item.m_gender === 0? "남":"여"}</td>
                                                <td>{item.m_nickName}</td>
                                                <td>{item.m_coupon}</td>
                                                <td>{reg_Date}</td>
                                                <td><button>
                                                        <Link to={`/memberUdate/${item.m_code}`}>
                                                            회원수정
                                                        </Link>
                                                    </button></td>
                                                <td><button type="button" onClick={()=>delHandler(item.m_email)}>회원삭제</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="paging">
                                {/* 페이지가 많을때 좌우 버튼 */}
                                {ph.prev && (
                                    <button onClick={() => setPage(ph.startPage - 1)}>◀</button>
                                )}
                                <div className="pages">{pages}</div>
                                {ph.next && (
                                    <button onClick={() => setPage(ph.endPage + 1)}>▶</button>
                                )}
                            </div>
                            <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="phone">전화번호</option>
                                        <option value="gender">성별</option>
                                        <option value="nickName">별명</option>
                                        <option value="mail">이메일</option>
                                    </select>
                                    
                                    <input type="text" name="searchKeyword" placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("phone")}}/>
                                </form>
					        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}