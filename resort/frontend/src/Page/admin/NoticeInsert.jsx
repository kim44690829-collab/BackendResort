import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NoticeInsert(){
    const {userEmail} = useContext(ResortDataContext);

    const [textarea,setTextarea] = useState('')
    const [notice,setNotice] = useState('')


    const navigate = useNavigate();
    //상품 들록하는 submit 함수
    const submitHandler=()=>{
        // React에서 이미지 업로드시 반드시 formData 객체를 생성한다.
        const formData = new FormData();

        
        const textData = {
            n_title:notice,
            n_content:textarea
        };


        // JSON 문자열로 변환해서 testData 하나로 묶기
        formData.append('noticeData', JSON.stringify(textData));



        axios.post('/api/board/noticeinsert',formData)
        .then((res)=>{
            if(res.data === 1){
                alert("상품등록 성공")
                navigate("/adminpage6")
            }
        })
        .catch((error)=>{
            console.log("등록실패")
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
                        <div className="admin_text" style={{textAlign:"left",width:"800px"}}>공지사항 작성</div>
                        <div className="admin_list">
                            <table className="list_table"  style={{width:"800px"}}>
                                <thead >
                                    <tr>
                                        <th width="200px">n_title</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="n_title" onChange={(e)=>setNotice(e.target.value)} style={{width:"500px",height:"40px"}}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">n_content</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",height:"300px" ,borderBottom:"1px solid #ddd"}}>
                                            {/* <input type="" name="roomName" onChange={handleChange} /> */}
                                            <textarea name="n_content" id="n_content" cols="30" style={{height:"250px",width:"500px"}}
                                                onChange={(e)=>setTextarea(e.target.value)}
                                            ></textarea>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage'}>
                                    <button type="button" className="insertBtn">
                                        취소하기
                                    </button>
                                </Link>
                                <button type="button" className="insertBtn" onClick={submitHandler}>추가하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}