import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";

export default function AdminPage(){
    const {MemberAllData} = useContext(ResortDataContext);

    const [members,setMembers] = useState([]);
    const [ph,setPh] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(()=>{
        axios.get('/api/member/list',{
            params: {
                page: page,
                pageSize: 10
            }
        })
        .then((res) => {
            console.log("회원정보 데이터 : ", res.data.list);
            console.log("회원정보 데이터 : ", res.data.ph);
            setMembers(res.data.list);
            setPh(res.data.ph);
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[page])


    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">관리자 페이지</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <span className="admin_menu">조회.관리</span>
                        <ul className="admin_submenu">
                            <li className="a_menus">회원 정보 조회</li>
                            <li className="a_menus">호텔 정보 조회</li>
                            <li className="a_menus">객실 정보 조회</li>
                            <li className="a_menus">예약 정보 조회</li>
                        </ul>
                        <span className="admin_menu">등록</span>
                        <ul className="admin_submenu">
                            <li className="a_menus">호텔 정보 등록</li>
                            <li className="a_menus">객실 정보 등록</li>
                        </ul>
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
                                        <th width="120px">탈퇴처리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MemberAllData.map((item,index)=>{
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
                                                <td><button>회원삭제</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="paging">
                                <button type="button">◀</button>
                                <span>
                                    
                                </span>
                                <button type="button">▶</button>
                            </div>
                            <div id="search_wrap">
                                <form >
                                    <select name="searchType">
                                        <option value="subject">제목</option>
                                        <option value="content">내용</option>
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