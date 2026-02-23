import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MemberUdate(){
    const {m_code} = useParams();
    const {MemberAllData} = useContext(ResortDataContext);
    const [newph,setNewph] = useState(MemberAllData[m_code-1].m_phone)
    const [newNick,setNewNick] = useState(MemberAllData[m_code-1].m_nickName)
    console.log(MemberAllData[m_code-1].m_email)
    const navigate = useNavigate();
    // 공통 임력 처리 함수
    const handleChange = ()=>{
        axios.put('/api/member/updatemember',{
            m_code: m_code,
            m_email:MemberAllData[m_code-1].m_email,
            m_phone: newph,
            m_nickName: newNick
        })
        .then((res) => {
            console.log("수정 성공");
            navigate('/adminpage');
        })
        .catch((error) => {
            console.error(error);
        });

    }

    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">관리자 페이지</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회.관리</span>
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
                                <li className="a_menus">호텔 정보 등록</li>
                                <li className="a_menus">객실 정보 등록</li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin_body">
                        <div className="admin_text">회원 정보 수정</div>
                        <div className="admin_list">
                            <table className="list_table" border="1" style={{width:"600px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">Num</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>{MemberAllData[m_code-1].m_code}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">E_mail</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>{MemberAllData[m_code-1].m_email}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">전화번호</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" value={newph} name="m_phone" onChange={(e)=>setNewph(e.target.value)} maxLength={11}/>
                                            <p style={{color:"#999"}}>{`ex) 01012345678`}</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">생일</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            {MemberAllData[m_code-1].m_birth}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">성별</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            {MemberAllData[m_code-1].m_gender==0?"남성":"여성"}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">별명</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>
                                            <input type="text" name="m_birth" onChange={(e)=>setNewNick(e.target.value)} maxLength={10} 
                                            value={newNick} />
                                        </th>

                                    </tr>
                                    <tr>
                                        <th width="200px">쿠폰 보유</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>{MemberAllData[m_code-1].m_coupon}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">가입일</th>
                                        <th style={{backgroundColor:"#fff",color:"#333"}}>{MemberAllData[m_code-1].m_regDate}</th>
                                    </tr>
                                </thead>
                            </table>
                                <button type="button">취소하기</button>
                                <button type="button" onClick={handleChange}>수정하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}