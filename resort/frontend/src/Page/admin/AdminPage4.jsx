import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage4(){
    

    const [reservation,setReservation] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    useEffect(()=>{
        axios.get('/api/reservation/list',{
            params: {
                page: page,
                pageSize: 10
            }
        })
        .then((res) => {
            console.log("회원정보 데이터 : ", res.data.list);
            console.log("회원정보 데이터 : ", res.data.ph);
            setReservation(res.data.list);
            setPh(res.data.ph);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
    },[page])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
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
                        <div className="admin_text">예약 정보 조회</div>
                        <div className="admin_list">
                            <table className="list_table" border="1">
                                <thead >
                                    <tr>
                                        <th width="50px">예약번호</th>
                                        <th width="50px">회원번호</th>
                                        <th width="50px">비회원번호</th>
                                        <th width="50px">예약코드</th>
                                        <th width="50px">방코드</th>
                                        <th width="50px">예약자명</th>
                                        <th width="50px">예약시간</th>
                                        <th width="50px">체크인 날짜</th>
                                        <th width="50px">체크아웃 날짜</th>
                                        <th width="50px">원가격</th>
                                        <th width="50px">할인율</th>
                                        <th width="50px">쿠폰사용여부</th>
                                        <th width="50px">최종가격</th>
                                        <th width="50px">취소여부</th>
                                        <th width="50px">취소시간</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.map((item,index)=>{
                                        const member_birth = new Date(item.m_birth)
                                        const birth_Date = member_birth.toLocaleDateString('ko-KR')
                                        const member_reg = new Date(item.m_regDate)
                                        const reg_Date = member_reg.toLocaleString('ko-KR')
                                        return(
                                            <tr key={index}>
                                                <td>{item.re_code}</td>
                                                <td>{item.m_code}</td>
                                                <td>{item.g_code}</td>
                                                <td>{item.reservation_no}</td>
                                                <td>{item.r_code}</td>
                                                <td>{item.booker_name}</td>
                                                <td>{item.reserved_at}</td>
                                                <td>{item.check_in_date}</td>
                                                <td>{item.check_out_date}</td>
                                                <td>{item.original_price.toLocaleString()}</td>
                                                <td>{item.discount_rate}</td>
                                                <td>{item.coupon_used}</td>
                                                <td>{item.final_price.toLocaleString()}</td>
                                                <td>{item.cancel}</td>
                                                <td>{item.cancel_date}</td>
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
                                <form >
                                    <select name="searchType">
                                        <option value="booker_name">예약자명</option>
                                        <option value="reservation_no">예약코드</option>
                                    </select>
                                    
                                    <input type="text" name="searchKeyword" placeholder="검색어를 입력하세요"/>
                                    <input type="submit" value="검색" className="searchBtn"/>
                                    <input type="button" value="전체보기" className="searchBtn" />
                                </form>
					        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}