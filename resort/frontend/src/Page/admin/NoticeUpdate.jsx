import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NoticeUpdate(){

    const {userEmail} = useContext(ResortDataContext)

    const {n_code} = useParams();
    const [noticelist,setNoticelist] = useState([]);
    const [n_title,setN_title] = useState("");
    const [n_content,setN_content] = useState("");
    const [r,setR] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('/api/board/onenotice',{
            params: {
                n_code: n_code
            }
        })
        .then((res) => {
            console.log("공지사항 데이터 : ", res.data);
            setNoticelist(res.data);
            setN_title(res.data.n_title)
            setN_content(res.data.n_content)
        })
        .catch((error) => {
            console.error("error", error)
        })
    },[])

    const submitHandler=()=>{
        if(!window.confirm("입력한 공지사항을 수정하시겠습니까?")){
           return;
        }
        setR(!r)
        axios.put('/api/board/adminupdatenotice',{
            n_code:n_code,
            n_title: n_title,
            n_content: n_content
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("공지사항이 수정이 완료되었습니다")
            window.scrollTo(0, 0)
            navigate('/adminPage6'); 
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(()=>{
        // value={h_code === undefined? RoomData[r_code-1].h_code:h_code}
        console.log(n_code)
        console.log(noticelist)
        console.log(noticelist.n_title)
        //setN_title(noticelist.n_title)
        //setN_content(noticelist.n_content)
    },[])
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
                <h2 className="admin_title">{n_code}번 공지사항 수정</h2>
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
                        {/* <div className="admin_text" style={{textAlign:"left",width:"800px"}}>{n_code}번 공지사항 수정</div> */}
                        <div className="admin_list">
                            <table className="list_table"  style={{width:"800px"}}>
                                <thead className="DB_table">
                                    <tr>
                                        <th width="200px">제목</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:"1px solid #ddd"}}>
                                            <input type="text" name="n_title" onChange={(e)=>setN_title(e.target.value)} style={{width:"500px",height:"40px"}}
                                            value={n_title === null? noticelist.n_title:n_title}/>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th width="200px">내용</th>
                                        <th style={{backgroundColor:"#f6f8fc",color:"#333",height:"300px" ,borderBottom:"1px solid #ddd"}}>
                                            {/* <input type="" name="roomName" onChange={handleChange} /> */}
                                            <textarea name="n_content" id="n_content" cols="30" style={{height:"250px",width:"500px"}}
                                                onChange={(e)=>setN_content(e.target.value) } value={n_content === null? noticelist.n_content:n_content}
                                            ></textarea>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                                <Link to={'/adminpage6'}>
                                    <button type="button" className="insertBtn">
                                        취소하기 <i class="fa fa-times"></i>
                                    </button>
                                </Link>
                                <button className="insertBtn" type="button" onClick={submitHandler} >수정하기 <i class="bi bi-pencil"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}