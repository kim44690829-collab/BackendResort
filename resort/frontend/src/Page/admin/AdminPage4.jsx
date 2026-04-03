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

    const [chking,setChking] = useState([{id:1,state:false},{id:2,state:false}])

    useEffect(()=>{
        if(chking[0].state == false && chking[1].state == false){
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
        }else if(chking[0].state == true && chking[1].state == false){ // 비회원만 보이기
            axios.get('/api/reservation/list1',{
                params: {
                    page: page,
                    pageSize: 10,
                    searchType: searchType,
                    searchKeyword: searchKeyword
                }
            })
            .then((res) => {
                console.log("reservation 비회원만 데이터 : ", res.data.list);
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
        }
        else if(chking[0].state == false && chking[1].state == true){ // 회원만 보이기
            axios.get('/api/reservation/list2',{
                params: {
                    page: page,
                    pageSize: 10,
                    searchType: searchType,
                    searchKeyword: searchKeyword
                }
            })
            .then((res) => {
                console.log("reservation 회원만 데이터 : ", res.data.list);
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
        }
    },[page,searchType,searchKeyword,r,chking])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const deleteHandler =(index)=>{
        if(!window.confirm("정말 예약정보를 삭제하시겠습니까?")){
           return;
        }


        axios.put('/api/reservation/delete', null,{
            params :{
                re_code: reservation[index].re_code,
            }
            
        })
        .then((res) => {
            console.log("수정 성공");
            alert("예약정보 삭제가 완료되었습니다")
           
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

    const chkHandler =(num)=>{
        const chkingCopy = [...chking]
        if(num==1){
            chkingCopy[0].state = !chkingCopy[0].state;
            chkingCopy[1].state = false;
            setChking(chkingCopy);
        }else if(num==2){
            chkingCopy[1].state = !chkingCopy[1].state;
            chkingCopy[0].state = false;
            setChking(chkingCopy);
        }

    }

    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">예약 정보 조회</h2>
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
                        {/* <div className="admin_text">예약 정보 조회</div> */}
                        <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select className="searchSelect" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="booker_name" >예약자명</option>
                                        <option value="reservation_no">예약코드</option>
                                    </select>
                                    
                                    <input className="searchbox" type="text" name="searchKeyword" value={serch} placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <button type="submit" className="btn searchBtn" onClick={()=>submitHandler()} >
                                        <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                                    <button type="button" className="btn searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("booker_name"),setSerch(""),setPage(1),setChking([{id:1,state:false},{id:2,state:false}])}} >
                                        <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                                    </button>
                                    {/* <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName"),setSerch(""),setPage(1)}}/> */}
                                </form>
                                <div className="member_chk">
                                    <input type="checkbox" name="chkMember" id="chkMember1" onChange={()=>chkHandler(1)} checked={chking[0].state}/>
                                    <label htmlFor="chkMember1" className="chkMember" >비회원 보기</label>
                                    <input type="checkbox" name="chkMember" id="chkMember2" onChange={()=>chkHandler(2)} checked={chking[1].state}/>
                                    <label htmlFor="chkMember2" className="chkMember" >회원 보기</label>
                                </div>
                                
					        </div>
                        <div className="admin_list">
                            <table className="list_table" >
                                <thead >
                                    <tr className="table_head">
                                        <th width="90px">예약번호</th>
                                        <th width="90px">회원번호</th>
                                        <th width="130px">비회원번호</th>
                                        <th width="70px">회원구분</th>
                                        <th width="225px">예약코드</th>
                                        {/* <th width="65px">방코드</th> */}
                                        <th width="135px">예약자명</th>
                                        <th width="80px">예약상태</th>
                                        <th width="200px">취소시간</th>
                                        <th width="115px">상세보기</th>
                                        <th width="135px">예약수정</th>
                                        <th width="115px">예약취소</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.map((item,index)=>{
                                        const member_birth = new Date(item.m_birth)
                                        const birth_Date = member_birth.toLocaleDateString('ko-KR')
                                        const member_reg = new Date(item.m_regDate)
                                        const reg_Date = member_reg.toLocaleString('ko-KR')
                                        const today = new Date()
                                        today.setHours(0,0,0,0)
                                        const check_out_date = new Date(item.check_out_date)
                                        check_out_date.setHours(0,0,0,0)
                                        console.log(check_out_date)
                                        console.log(today)
                                        console.log(today > check_out_date)
                                        return(
                                            <tr key={index} className="table_head">
                                                <td>{item.re_code}</td>
                                                <td>{item.m_code}</td>
                                                <td>{item.g_code}</td>
                                                <td>{item.g_code === null?
                                                 <span style={{display:'inline-block',width:"65px",backgroundColor:'#4b94f310',color:'#4b94f3ff',border:'1px solid #4b94f3ff',padding:'9px 0',borderRadius:'20px',fontWeight:500}}>회원</span>
                                                 :
                                                 <span style={{display:'inline-block',width:"65px",backgroundColor:'#88888810',color:'#888',border:'1px solid #888',padding:'9px 0',borderRadius:'20px',fontWeight:500}}>비회원</span>}</td>
                                                <td>{item.reservation_no}</td>
                                                {/* <td>{item.r_code}</td> */}
                                                <td>{item.booker_name}</td>
                                                <td>{item.cancel === 1 ?
                                                    <span style={{display:'inline-block',width:"80px",backgroundColor:"#cf454510",border:'1px solid #cf4545ff',color:'#ca2c39ff',padding:'9px 0',borderRadius:'10px',fontWeight:500}}>취소</span> : today > check_out_date?
                                                    <span style={{display:'inline-block',width:"80px",backgroundColor:"#dddddd10",border:'1px solid #7a7a7aff',color:'#7a7a7aff',padding:'9px 0',borderRadius:'10px',fontWeight:500}}>지난 예약</span>: 
                                                    <span style={{display:'inline-block',width:"80px",backgroundColor:"#358f5810",border:'1px solid #358f57ff',color:'#358f57ff',padding:'9px 0',borderRadius:'10px',fontWeight:500}}>예약 중</span>}</td>
                                                <td>{item.cancel_date!==null? `${item.cancel_date.slice(0,10)} - ${item.cancel_date.slice(11,16)}`:''}</td>
                                                <td><button className="table_btn" onClick={()=>{setIsinfo(!isInfo),setNum(index)}}>상세정보</button></td>
                                                <td>{item.m_code === null && item.cancel === 0 && item.g_check===0?  <button className="table_btn" style={{width:"100px"}} onClick={()=>{setIsinfo2(!isInfo2),setNum(index)}}>비회원수정</button>:""}</td>
                                                <td>{item.m_code === null && item.cancel === 0 && item.g_check===0? <button className="table_btn" onClick={()=>deleteHandler(index)}>예약취소</button>:""}</td>
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
                                                        <p><span>예약번호</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].re_code}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>회원번호</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].m_code !== null?reservation[num].m_code:"해당없음"}</span><span>비회원번호</span> : <span style={{fontWeight:400,paddingLeft:'15px'}}>{reservation[num].g_code!==null?reservation[num].g_code:"해당없음"}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약코드</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].reservation_no}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>호텔이름</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].hotelName}</span><span>객실이름</span> : <span style={{fontWeight:400,paddingLeft:'15px'}}>{reservation[num].roomName}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>방코드</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].r_code}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약자명</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].booker_name}</span><span>예약자 전화번호</span> : <span style={{width:'200px',fontWeight:400,paddingLeft:'15px'}}>{reservation[num].g_phone!==null?`${reservation[num].g_phone.slice(0,3)}-${reservation[num].g_phone.slice(3,7)}-${reservation[num].g_phone.slice(7,11)}`:`${reservation[num].m_phone.slice(0,3)}-${reservation[num].m_phone.slice(3,7)}-${reservation[num].m_phone.slice(7,11)}`}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약날짜</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].reserved_at.slice(0,10)}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>체크인 날짜</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].check_in_date}</span><span>체크아웃 날짜</span> : <span style={{fontWeight:400,paddingLeft:'15px'}}>{reservation[num].check_out_date}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>원가격</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].original_price.toLocaleString()}원</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>쿠폰사용여부</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].coupon_used===0? "쿠폰 미사용": "쿠폰 사용"}</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>할인율</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].discount_rate}%</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>최종가격</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].final_price.toLocaleString()}원</span></p>
                                                    </li>
                                                    <li>
                                                        <p><span>예약상태</span> : <span style={{display:"inline-block",width:"300px",fontWeight:400,paddingLeft:'15px'}}>{reservation[num].cancel ===0? "예약": "취소"}</span><span>취소시간</span> :<span style={{width:'200px',fontWeight:400,paddingLeft:'15px'}}> {reservation[num].cancel_date!==null?`${reservation[num].cancel_date.slice(0,10)} - ${reservation[num].cancel_date.slice(11,16)}`:"해당사항없음"}</span></p>
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
                                                
                                                <table className="guset_table" >
                                                    <tbody >

                                                        <tr >
                                                            <th width="200px" style={{backgroundColor:"#c7c7c72e",color:"#333",borderBottom:'1px solid #ddd'}}>예약자명</th>
                                                            <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                                                <input type="text" name="booker_name" onChange={(e)=>setBooker_name(e.target.value)} 
                                                                    value={booker_name === null? reservation[num].booker_name:booker_name} style={{width:"300px",height:"40px",border:'1px solid #ddd'}}
                                                                />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th width="200px" style={{backgroundColor:"#c7c7c72e",color:"#333",borderBottom:'1px solid #ddd'}}>예약자 전화번호</th>
                                                            <th style={{backgroundColor:"#fff",color:"#333",borderBottom:'1px solid #ddd'}}>
                                                                <input type="text" name="maxOccupancy" onChange={(e)=>setG_phone(e.target.value)} 
                                                                    value={g_phone === null? reservation[num].g_phone:g_phone}style={{width:"300px",height:"40px", border:'1px solid #ddd'}}
                                                                />
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="guest_submit_box">

                                                    <button className="guest_submit" onClick={guestSubmit}>수정하기 <i class="bi bi-pencil"></i></button>
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