import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage4(){
    
    const {userEmail} = useContext(ResortDataContext)

    const [reservation,setReservation] = useState([]);
    const [ph,setPh] = useState({});
    const [isInfo,setIsinfo] = useState(false)
    const [isInfo2,setIsinfo2] = useState(false)
    const [page, setPage] = useState(1);
    const [num,setNum] = useState(0)
    const [searchType, setSearchType] = useState("booker_name");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [booker_name,setBooker_name] = useState(null)
    const [g_phone,setG_phone] = useState(null)
    const [r,setR] = useState(false);
    useEffect(()=>{
        axios.get('/api/reservation/list',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("reservation 데이터 : ", res.data.list);
            console.log("회원정보 데이터 : ", res.data.ph);
            setReservation(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
    },[page,searchType,searchKeyword,r])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const deleteHandler =(index)=>{
        axios.put('/api/reservation/delete', null,{
            params :{
                re_code: reservation[index].re_code,
            }
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("예약정보 수정이 완료되었습니다")
           
            setR(!r)
        })
        .catch((error) => {
            console.error(error);
        });
        
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setSearchKeyword(serch)
        setPage(1);
    }

    const guestSubmit=()=>{

        if(booker_name === null){
            setBooker_name(reservation[num].booker_name)
            console.log(reservation[num].booker_name)
        }
        if(g_phone === null){
            setG_phone(reservation[num].g_phone)
            console.log(reservation[num].g_phone)
        }
        axios.put('/api/reservation/update', null,{
            params :{
                re_code: reservation[num].re_code,
                booker_name:  booker_name===null?reservation[num].booker_name:booker_name,
                g_phone:  g_phone===null?reservation[num].g_phone:g_phone
            }
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("비회원정보 수정이 완료되었습니다")
            setR(!r)
        })
        .catch((error) => {
            console.error(error);
        });
        setIsinfo2(!isInfo2)
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
                        <div className="admin_text">예약 정보 조회</div>
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="booker_name" >예약자명</option>
                                        <option value="reservation_no">예약코드</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword" value={serch} placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <input  type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("booker_name"),setSerch(""),setPage(1)}}/>
                                </form>
					        </div>
                        <div className="admin_list">
                            <table className="list_table" >
                                <thead >
                                    <tr className="table_head">
                                        <th width="50px">예약번호</th>
                                        <th width="50px">회원번호</th>
                                        <th width="50px">비회원번호</th>
                                        <th width="180px">예약코드</th>
                                        <th width="50px">방코드</th>
                                        <th width="100px">예약자명</th>
                                        <th width="50px">취소여부</th>
                                        <th width="150px">취소시간</th>
                                        <th width="50px">상세보기</th>
                                        <th width="50px">예약수정</th>
                                        <th width="50px">예약삭제</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.map((item,index)=>{
                                        const member_birth = new Date(item.m_birth)
                                        const birth_Date = member_birth.toLocaleDateString('ko-KR')
                                        const member_reg = new Date(item.m_regDate)
                                        const reg_Date = member_reg.toLocaleString('ko-KR')
                                        return(
                                            <tr key={index} className="table_head">
                                                <td>{item.re_code}</td>
                                                <td>{item.m_code}</td>
                                                <td>{item.g_code}</td>
                                                <td>{item.reservation_no}</td>
                                                <td>{item.r_code}</td>
                                                <td>{item.booker_name}</td>
                                                <td>{item.cancel}</td>
                                                <td>{item.cancel_date!==null? `${item.cancel_date.slice(0,10)} - ${item.cancel_date.slice(11,16)}`:''}</td>
                                                <td><button className="table_btn" onClick={()=>{setIsinfo(!isInfo),setNum(index)}}>상세정보</button></td>
                                                <td>{item.m_code === null? <button className="table_btn" style={{width:"100px"}} onClick={()=>{setIsinfo2(!isInfo2),setNum(index)}}>비회원수정</button>:""}</td>
                                                <td>{item.m_code === null? <button className="table_btn" onClick={()=>deleteHandler(index)}>예약삭제</button>:""}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {isInfo && <div className="admin_modal" style={{height:"700px"}}>
                                        
                                            <button type="button" onClick={()=>setIsinfo(!isInfo)} className="closeBtn">✖</button>
                                            <h2 style={{fontWeight:600,fontSize:"30px",margin:"0 auto 30px",borderBottom:"2px solid #cececeff",width:"900px",paddingBottom:"30px"}}>예약 정보</h2>
                                            
                                            <div className="service_box">
                                                <ul className="info_list">
                                                    
                                                    <li>
                                                        <p><span>예약번호</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].re_code}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>회원번호</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].m_code}</span><span>비회원번호 :</span>  {reservation[num].g_code}</p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약코드</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].reservation_no}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>방코드</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].r_code}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약자명</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].booker_name}</span><span>예약자 전화번호 :</span> {reservation[num].g_phone!==null?reservation[num].g_phone:reservation[num].m_phone}</p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약시간</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].reserved_at.slice(0,10)}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>체크인 날짜</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].check_in_date}</span><span>체크아웃 날짜 :</span>{reservation[num].check_out_date}</p>
                                                    </li>
                                                    <li>
                                                        <p><span>원가격</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].original_price.toLocaleString()}원</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>쿠폰사용여부</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].coupon_used}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>할인율</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].discount_rate}%</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>최종가격</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].final_price.toLocaleString()}원</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>취소여부</span> : <span style={{display:"inline-block",width:"300px"}}>{reservation[num].cancel ===0? "X": "O"}</span><span>취소시간 :</span>  {reservation[num].cancel_date!==null?`${reservation[num].cancel_date.slice(0,10)} - ${reservation[num].cancel_date.slice(11,16)}`:""}</p>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                            {/* <Link to={`/hotelUpdate/${hotel[num].h_code}`}>
                                                <button className="updateBtn" style={{color:"#fff",fontWeight:600,marginTop:"20px"}}>
                                                    내용 수정하기
                                                </button>
                                            </Link> */}
                                        </div>
                                    }
                            {isInfo2 && <div className="admin_modal" style={{width:"600px",height:"700px"}}>
                                        
                                            <button type="button" style={{marginLeft:"520px"}} onClick={()=>setIsinfo2(!isInfo2)} className="closeBtn">✖</button>
                                            <h2 style={{fontWeight:600,fontSize:"30px",margin:"0 auto 30px",borderBottom:"2px solid #cececeff",width:"500px",paddingBottom:"30px"}}>비회원 정보 수정</h2>
                                            
                                            <div className="service_box" >
                                                
                                                <table className="guset_table">
                                                    <tbody>

                                                        <tr>
                                                            <th width="200px">예약자명</th>
                                                            <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:'1px solid #ddd'}}>
                                                                <input type="text" name="booker_name" onChange={(e)=>setBooker_name(e.target.value)} 
                                                                    value={booker_name === null? reservation[num].booker_name:booker_name} style={{width:"300px",height:"40px"}}
                                                                />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th width="200px">예약자 전화번호</th>
                                                            <th style={{backgroundColor:"#f6f8fc",color:"#333",borderBottom:'1px solid #ddd'}}>
                                                                <input type="text" name="maxOccupancy" onChange={(e)=>setG_phone(e.target.value)} 
                                                                    value={g_phone === null? reservation[num].g_phone:g_phone}style={{width:"300px",height:"40px"}}
                                                                />
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="guest_submit_box">

                                                    <button className="guest_submit" onClick={guestSubmit}>수정하기</button>
                                                </div>
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