import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MemberUdate(){

    const {userEmail, setRender, render ,MemberAllData} = useContext(ResortDataContext)


    const {m_code} = useParams();
    const [newph,setNewph] = useState(null)
    const [newNick,setNewNick] = useState(null)
    console.log(MemberAllData[m_code-1]?.m_email)
    const find = MemberAllData?.find((f)=>f.m_nickName===newNick)
    const find2 = MemberAllData?.find((f)=>f.m_phone===newph)
    const navigate = useNavigate();
    const [memberData,setMemberData] = useState({})
    const [oneData,setOneData] = useState(null)

    console.log('??????????????',find)
    console.log('??????????????',MemberAllData[m_code-1]?.m_nickName)
    
    useEffect(()=>{
        axios.get(`/api/member/oneMember/${m_code}`)
        .then((res) => {
            console.log(res.data)
            setOneData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[])






    const handleChange = ()=>{
        if(!window.confirm("입력한 회원 정보로 수정하시겠습니까?")){
           return;
        }
        axios.put('/api/member/adminupdatemember',{
            m_code: m_code,
            m_phone:newph===null?oneData?.m_phone:newph,
            m_nickName: newNick===null?oneData?.m_nickName:newNick,
        })
        .then((res) => {
            console.log("수정 성공");
        })
        .catch((error) => {
            console.error(error);
        });
        if(find !== undefined && find.m_nickName !== MemberAllData[m_code-1]?.m_nickName){
            alert("이미 존재하는 닉네임입니다.")
        }else if(find2 !== undefined && find2.m_phone !== MemberAllData[m_code-1]?.m_phone){
            alert("이미 존재하는 전화번호입니다.")
        }else{
            alert("회원정보 수정이 완료되었습니다")
            window.scrollTo(0, 0)
            navigate('/adminpage');
        }
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

    const aaa =() =>{
        console.log("aaa",MemberAllData)
    }
    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">회원 정보 수정</h2>
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
                        {/* <div className="admin_text" style={{textAlign:"left",width:"600px"}}>회원 정보 수정</div> */}
                        <div className="admin_list">
                            <table className="list_table" style={{width:"600px"}}>
                                <thead className="DB_table">
                                    <tr>
                                        <th width="200px">Num</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>{oneData?.m_code}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">E_mail</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>{oneData?.m_email}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">전화번호</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" value={newph===null?oneData?.m_phone:newph} name="m_phone" onChange={(e)=>setNewph(e.target.value)} maxLength={11} style={{width:"300px",height:"30px"}}/>
                                            <p style={{color:"#999"}}>{`ex) 01012345678`}</p>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">생일</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {oneData?.m_birth.slice(0,10)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">성별</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            {oneData?.m_gender==0?"남성":"여성"}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">별명</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>
                                            <input type="text" name="m_birth" onChange={(e)=>setNewNick(e.target.value)} maxLength={15} 
                                            value={newNick===null?oneData?.m_nickName:newNick} style={{width:"300px",height:"30px"}}/>
                                        </th>

                                    </tr>
                                    <tr>
                                        <th width="200px">쿠폰 보유</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>{oneData?.m_coupon===0?"미보유":"보유"}</th>
                                    </tr>
                                    <tr>
                                        <th width="200px">가입일</th>
                                        <th style={{backgroundColor:"#ffffff53",color:"#333",borderBottom:'1px solid #ddd'}}>{oneData?.m_regDate.slice(0,10)}</th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'} onClick={() => window.scrollTo(0, 0)}>
                                    <button className="insertBtn" type="button">
                                        취소하기 <i class="fa fa-times"></i>
                                    </button>
                                </Link>
                                <button className="insertBtn" type="button" onClick={handleChange}>수정하기 <i class="bi bi-pencil"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}