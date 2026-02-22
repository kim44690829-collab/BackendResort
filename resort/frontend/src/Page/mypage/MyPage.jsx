import { useState,useEffect,useContext,useRef,Fragment } from "react";
import Calendar from '../Calendar';
import { ResortDataContext } from '../../Api/ResortData';
import { Link, useNavigate } from 'react-router-dom';
import '../mypage/MyPage.css'
import axios from "axios";

export default function MyPage(){
    const {DayData,setSelectday,userEmail} = useContext(ResortDataContext);

    const[myPage, setMyPage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyPage(); //마이페이지 DB전체호출
    },[userEmail]);
    

    //마이페이지 DB불러오는 함수
    const fetchMyPage = () => {
        if (!userEmail) return;

        axios.get('/api/member/mypage', {
            params: { m_email: userEmail }
        })
        .then((res) => {
            console.log("마이페이지 데이터 : ", res.data);
            setMyPage(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    // 예약취소
    const reserveCancel = (code) => {
        if(!window.confirm("정말 취소하시겠습니까?")){
           return;
        }
        axios.put('/api/reservation/cancel',null,{params:{re_code:code}})
        .then((res) => {
            console.log("-----------------------------------------");
            console.log(res.data);
            if(res.data === true){
                alert("예약이 취소 되었습니다");
                fetchMyPage();
                setListType(1);
                setListView(true);
                setDetailView(0);
            }else{
                alert("예약취소 실패");
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    }
    

    // 왼쪽 리스트 클릭시 컨텐츠 전환
    const [listType, setListType] = useState(1);

    //리스트 보기
    const [listView, setListView] = useState(true);
    //상세 보기
    const [detailView, setDetailView] = useState(0);

    // 상세보기 버튼
    const contentHandeler = (re_code) => {
        setListView(false);
        setDetailView(re_code);
    }

    // 쿠폰 목록보기 버튼
    const couponsBtnHandeler = () => {
        setListType(2);
    }



     //달력 
    const [Cal, setCal] = useState(false);

    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()


    //스크롤 내리면 오른쪽 부분 따라 내려오기
    const triggerRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
                if (!triggerRef.current) return;

                //getBoundingClientRect().top => top으로 부터 얼마나 떨어졌는지 측정
                const top = triggerRef.current.getBoundingClientRect().top;
                setIsFixed(top <= 0);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //예약내역 필터링
    const activeList = myPage.filter(item => item.cancel === 0);
    console.log('activeList',activeList)
    //취소내역 필터링
    const cancelList = myPage.filter(item => item.cancel === 1);


    //검색버튼 클릭여부
    const [search, setSearch] = useState(false);
    //날짜 필터링
    const [dateFilter, setDateFilter] = useState([]);

    //예약내역 검색
    const searchClick = () =>{        
        //날짜검색 범위 안에 드는 배열
        const dateArray = activeList.filter((item)=>item.reserved_at.slice(0,10) >= new Date(DayData[0]).toLocaleDateString('sv-SE') && item.reserved_at.slice(0,10) <= new Date(DayData[1]).toLocaleDateString('sv-SE') ? item :null);
        
        console.log("------------234234234");
        console.log(dateArray);

        if(dateArray === null || dateArray.length === 0){
            setDateFilter([]);
        }else{
            setDateFilter(dateArray);
        }
        setSearch(true);
        return;
    }

    //취소내역 검색
    const searchClick2 = () =>{        
        //날짜검색 범위 안에 드는 배열
        const dateArray = cancelList.filter((item)=>item.reserved_at.slice(0,10) >= new Date(DayData[0]).toLocaleDateString('sv-SE') && item.reserved_at.slice(0,10) <= new Date(DayData[1]).toLocaleDateString('sv-SE') ? item :null);
        
        console.log("------------234234234");
        console.log(dateArray);

        if(dateArray === null || dateArray.length === 0){
            setDateFilter([]);
        }else{
            setDateFilter(dateArray);
        }
        setSearch(true);
        return;
    }


    const [dayClick, setDayClick] = useState(false); 

    // 리뷰 작성
        const [isOpen, setIsOpen] = useState(false);
        const [star1, setStar1] = useState(false);
        const [star2, setStar2] = useState(false);
        const [star3, setStar3] = useState(false);
        const [star4, setStar4] = useState(false);
        const [star5, setStar5] = useState(false);
        const [rating, setRating] = useState(0);
        const [roomCode, setRoomCode] = useState(0);

        const starHandler = (num) => {
            if(num === 1){
                setStar1(true)
                setStar2(false)
                setStar3(false)
                setStar4(false)
                setStar5(false)
                setRating(1)
            }else if(num === 2){
                setStar1(true)
                setStar2(true)
                setStar3(false)
                setStar4(false)
                setStar5(false)
                setRating(2)
            }else if(num === 3){
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(false)
                setStar5(false)
                setRating(3)
            }else if(num === 4){
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(true)
                setStar5(false)
                setRating(4)
            }else{
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(true)
                setStar5(true)
                setRating(5)
            }
            
        }
    
        const reviewSend = () => {
            axios.post('/api/board/reviewSend', {m_code : activeList[0].m_code, rb_score: rating, r_code: roomCode})
            .then((res) => {
                if(res.data === 1){
                    alert("리뷰를 작성해주셔서 감사합니다.");
                    navigate('/reviewboard');
                }else{
                    alert("리뷰 작성에 실패하였습니다.");
                    navigate('/reviewboard');
                }
            })
        }
    
        const reviewModalOpen = (r_code) => {
            setRoomCode(r_code);
            setIsOpen(true);
        }

    return(
        <div className="reserVation_container">
            {/* 왼쪽 메뉴 */}
            <div className='reserVation_list'>
                <ul>
                    <li className='list_title'>마이페이지</li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(1);setListView(true);setDetailView(0);}} style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                            예약내역
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(2)} style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                            취소내역
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(3)} style={{fontWeight: listType === 3 ? 'bold' : 'normal'}}>
                            쿠폰
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(4)} style={{fontWeight: listType === 4 ? 'bold' : 'normal'}}>
                            정보수정/탈퇴
                        </button>
                    </li>
                </ul>
            </div>
            {/* 예약내역 */}
            {listType === 1 && listView && detailView === 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>예약 내역</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)}>
                        <section className="reserVation-wrap">
                            <div className="detail-content">
                                <div className="detail-left" ref={triggerRef}>                       
                                    <div className="reserve-select" style={{borderTop:'0px'}}>
                                        {(search && dateFilter === null) || (search && dateFilter.length === 0)
                                        ?(
                                            <div className="empty-room">
                                                <p className='x-icon'>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </p>
                                                <p className='empty-tit'>검색한 날짜에 예약한 호텔정보가 없습니다.</p>
                                                <p className='empty-txt'>검색날짜를 다시 설정해주세요.</p>
                                            </div>
                                        ) : (search && dateFilter !== null) || (search && dateFilter.length >= 1) ? (
                                            <ul>
                                                {dateFilter.map((item)=>(
                                                    item.cancel === 0 ? (
                                                    <Fragment key={item.re_code}>
                                                        <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                            <p className='room-title wish'>{item.reserved_at?.slice(0, 10)} 예약
                                                                <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                                {item.check_in_date.slice(0,10) > new Date().toLocaleDateString('sv-SE') && ( 
                                                                    <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                                )}

                                                                {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && ( 
                                                                    <span className='del' onClick={()=>{reviewModalOpen(item.r_code)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                                )}                                                            
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <div className="room-left">
                                                                <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                    <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                                </Link>
                                                            </div>
                                                            <div className="room-right">
                                                                <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                                <div className="room-info">
                                                                    <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                    <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                    <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                            ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                    <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </Fragment>
                                                    ):null
                                                ))}
                                            </ul>
                                        ):null}

                                        {(!search && activeList && activeList.length > 0) ? ( 
                                            <ul>
                                                {activeList.map((item)=>(
                                                    item.cancel === 0 ? (
                                                    <Fragment key={item.re_code}>
                                                    <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                        <p className='room-title wish'>{item.reserved_at?.slice(0, 10)} 예약
                                                            <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                            {item.check_in_date.slice(0,10) > new Date().toLocaleDateString('sv-SE') && ( 
                                                                <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                            )}

                                                            {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && item.rb_score === 0 && ( 
                                                                <span className='del' onClick={()=>{reviewModalOpen(item.r_code)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                            )}

                                                            {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && item.rb_score !== 0 && ( 
                                                                <span className='del' onClick={()=>{reviewModalOpen(item.r_code)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰수정</span>
                                                            )}                                                           
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="room-left">
                                                            <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                            </Link>
                                                        </div>
                                                        <div className="room-right">
                                                            <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                            <div className="room-info">
                                                                <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                     ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                            </div>
                                                        </div>
                                                    </li>
                                                    </Fragment>
                                                    ):null
                                                ))}
                                            </ul>
                                        ): !search && activeList && activeList.length === 0 ?(
                                            <p className='room-empty'>예약한 내역이 없습니다.</p>
                                        ):null}
                                    </div>
                                </div>
                                <div className={`detail-right ${isFixed ? 'fixed' : null} wish`}>
                                    {Cal &&
                                        <div className="Cal" style={{position:'absolute',left:'-655px'}} onClick={ e =>{
                                            setCal((Cal === true) ? true : false);
                                            e.stopPropagation();
                                        }}>
                                            <Calendar/>
                                        </div>
                                    }
                                    <div className="hotel-day" >
                                        <p className='day-wrap'>
                                            <span className='day-tit'>예약일</span>
                                            <span className='day-txt'>{dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`) : ('조회날짜를 설정해주세요.')}</span>
                                        </p>
                                        <p className='day-wrap'>
                                            <span className='day-tit'>예약일</span>
                                            <span className='day-txt'>
                                                {dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date+1}` : `${DayData[1]}`) : ('조회날짜를 설정해주세요.')}
                                            </span>
                                        </p>
                                        <button type='button' onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>조회기간 설정</button>
                                    </div>
                                    <div className="hotel-headcount">
                                        <button type='button' className='search' onClick={()=>{searchClick();setCal(false);}}>조회하기</button>
                                    </div>
                                    <div className="reserve-select">
                                        <p className='select-tit'>검색 전 참고사항</p>
                                        <p className='select-txt'>· 조회기간을 설정하시기 전에는 모든 예약내역이 보여집니다.</p>
                                        <p className='select-txt'>· 예약내역 조회는 숙박일 기준이 아닌, <span className='bold'>예약일(결제일)</span>을 기준으로 검색해주시기 바랍니다.</p>
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>)
            }
            {/* 예약내역 상세조회 */}
            {listType === 1 && !listView && detailView !== 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>예약 내역 상세조회</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)} style={{width:'100%'}}>
                        <section className="reservDetail-wrap">
                            <div className="detail-content">
                                <div className="detail-left" ref={triggerRef}>                       
                                    <div className="reservDetail-select" style={{borderTop:'0px'}}>
                                        {activeList.map((item)=>(
                                            item.re_code === detailView ? (
                                            <Fragment key={item.re_code}>
                                            <div style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                <p className='room-title wish'>예약 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>예약일</th>
                                                            <td>{item.reserved_at?.replace('T', ' ').substring(0, 19)}</td>
                                                            <th>예약자명</th>
                                                            <td>{item.booker_name}</td>
                                                            <th>전화번호</th>
                                                            <td>{item.m_phone}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>호텔명</th>
                                                            <td colSpan={2}>{item.hotelName}</td>
                                                            <th>객실명</th>
                                                            <td colSpan={2}>{item.roomName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>숙박 시작일</th>
                                                            <td>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})</td>
                                                            <th>숙박 종료일</th>
                                                            <td>{new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</td>
                                                            <th>총 숙박 일수</th>
                                                            <td>{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className='room-title wish'>결제 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>총 결제금액</th>
                                                            <td>{(item.original_price).toLocaleString()}원</td>
                                                            <th>할인금액</th>
                                                            <td>-{(item.original_price-item.final_price).toLocaleString()}원</td>
                                                            <th>최종 결제금액</th>
                                                            <td>{(item.final_price).toLocaleString()}원</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className='room-title wish'>예약호텔 정보</p>
                                                <div className="hotelInfo">
                                                    <div className="room-left">
                                                        <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                            <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                        </Link>
                                                    </div>
                                                    <div className="room-right">
                                                        <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                        <div className="intro-right">
                                                            <button type='button' className='pay' onClick={()=>navigate(`/detail/${item.h_code}`)}>
                                                                상세보기<i className="fa-solid fa-angle-right"></i>
                                                            </button>
                                                        </div>
                                                        <div className="room-info">
                                                            <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                            <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                            <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                    ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                            <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div>
                                                    {item.check_in_date.slice(0,10) > new Date().toLocaleDateString('sv-SE') && ( 
                                                        <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                    )}

                                                    {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && item.rb_score === 0 && ( 
                                                        <span className='del' onClick={()=>{reviewModalOpen(item.r_code)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                    )}

                                                    {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && item.rb_score !== 0 && ( 
                                                        <span className='del' onClick={()=>{reviewModalOpen(item.r_code)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰수정</span>
                                                    )}                                                           
                                                    <span className='del detail' onClick={()=>{setListType(1);setListView(true);setDetailView(0);}}>전체목록<i className="fa-solid fa-angle-right"></i></span>
                                                </div>
                                            </div>
                                            </Fragment>
                                            ):null
                                        ))}
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>
            )}
            {/* 취소내역 */}
            {listType === 2 && listView && detailView === 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>취소 내역</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)}>
                        <section className="reserVation-wrap">
                            <div className="detail-content">
                                <div className="detail-left" ref={triggerRef}>                       
                                    <div className="reserve-select" style={{borderTop:'0px'}}>
                                        {(search && dateFilter === null) || (search && dateFilter.length === 0)
                                        ?(
                                            <div className="empty-room">
                                                <p className='x-icon'>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </p>
                                                <p className='empty-tit'>검색한 날짜에 예약한 호텔정보가 없습니다.</p>
                                                <p className='empty-txt'>검색날짜를 다시 설정해주세요.</p>
                                            </div>
                                        ) : (search && dateFilter !== null) || (search && dateFilter.length >= 1) ? (
                                            <ul>
                                                {dateFilter.map((item)=>(
                                                    item.cancel !== 0 ? (
                                                    <Fragment key={item.re_code}>
                                                        <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                            <p className='room-title wish'>{item.reserved_at?.slice(0, 10)} 예약
                                                                <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                                {item.check_in_date.slice(0,10) > new Date().toLocaleDateString('sv-SE') && ( 
                                                                    <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                                )}

                                                                {item.check_in_date.slice(0,10) <= new Date().toLocaleDateString('sv-SE') && ( 
                                                                    <span className='del' onClick={()=>{}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                                )}                                                            
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <div className="room-left">
                                                                <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                    <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                                </Link>
                                                            </div>
                                                            <div className="room-right">
                                                                <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                                <div className="room-info">
                                                                    <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                    <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                    <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                            ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                    <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </Fragment>
                                                    ):null
                                                ))}
                                            </ul>
                                        ):null}

                                        {(!search && cancelList && cancelList.length > 0) ? ( 
                                            <ul>
                                                {cancelList.map((item)=>(
                                                    item.cancel !== 0 ? (
                                                    <Fragment key={item.re_code}>
                                                    <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                        <p className='room-title wish'>{item.reserved_at?.slice(0, 10)} 예약
                                                            <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="room-left">
                                                            <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                            </Link>
                                                        </div>
                                                        <div className="room-right">
                                                            <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                            <div className="room-info">
                                                                <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                     ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                            </div>
                                                        </div>
                                                    </li>
                                                    </Fragment>
                                                    ):null
                                                ))}
                                            </ul>
                                        ): !search && cancelList && cancelList.length === 0 ?(
                                            <p className='room-empty'>취소한 내역이 없습니다.</p>
                                        ):null}
                                    </div>
                                </div>
                                <div className={`detail-right ${isFixed ? 'fixed' : null} wish`}>
                                    {Cal &&
                                        <div className="Cal" style={{position:'absolute',left:'-655px'}} onClick={ e =>{
                                            setCal((Cal === true) ? true : false);
                                            e.stopPropagation();
                                        }}>
                                            <Calendar/>
                                        </div>
                                    }
                                    <div className="hotel-day" >
                                        <p className='day-wrap'>
                                            <span className='day-tit'>취소일</span>
                                            <span className='day-txt'>{dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`) : ('조회날짜를 설정해주세요.')}</span>
                                        </p>
                                        <p className='day-wrap'>
                                            <span className='day-tit'>취소일</span>
                                            <span className='day-txt'>
                                                {dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date+1}` : `${DayData[1]}`) : ('조회날짜를 설정해주세요.')}
                                            </span>
                                        </p>
                                        <button type='button' onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>조회기간 설정</button>
                                    </div>
                                    <div className="hotel-headcount">
                                        <button type='button' className='search' onClick={()=>{searchClick2();setCal(false);}}>조회하기</button>
                                    </div>
                                    <div className="reserve-select">
                                        <p className='select-tit'>검색 전 참고사항</p>
                                        <p className='select-txt'>· 조회기간을 설정하시기 전에는 모든 취소내역이 보여집니다.</p>
                                        <p className='select-txt'>· 취소내역 조회는 예약일 기준이 아닌, <span className='bold'>취소일</span>을 기준으로 검색해주시기 바랍니다.</p>
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>)
            }
            {/* 취소내역 상세조회 */}
            {listType === 2 && !listView && detailView !== 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>취소 내역 상세조회</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)} style={{width:'100%'}}>
                        <section className="reservDetail-wrap">
                            <div className="detail-content">
                                <div className="detail-left" ref={triggerRef}>                       
                                    <div className="reservDetail-select" style={{borderTop:'0px'}}>
                                        {cancelList.map((item)=>(
                                            item.re_code === detailView ? (
                                            <Fragment key={item.re_code}>
                                            <div style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                <p className='room-title wish'>예약 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>예약일</th>
                                                            <td>{item.reserved_at?.replace('T', ' ').substring(0, 19)}</td>
                                                            <th>예약자명</th>
                                                            <td>{item.booker_name}</td>
                                                            <th>전화번호</th>
                                                            <td>{item.m_phone}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>호텔명</th>
                                                            <td colSpan={2}>{item.hotelName}</td>
                                                            <th>객실명</th>
                                                            <td colSpan={2}>{item.roomName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>숙박 시작일</th>
                                                            <td>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})</td>
                                                            <th>숙박 종료일</th>
                                                            <td>{new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</td>
                                                            <th>총 숙박 일수</th>
                                                            <td>{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className='room-title wish'>결제 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>총 결제금액</th>
                                                            <td>{(item.original_price).toLocaleString()}원</td>
                                                            <th>할인금액</th>
                                                            <td>-{(item.original_price-item.final_price).toLocaleString()}원</td>
                                                            <th>최종 결제금액</th>
                                                            <td>{(item.final_price).toLocaleString()}원</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className='room-title wish'>예약호텔 정보</p>
                                                <div className="hotelInfo">
                                                    <div className="room-left">
                                                        <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                            <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                        </Link>
                                                    </div>
                                                    <div className="room-right">
                                                        <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                        <div className="intro-right">
                                                            <button type='button' className='pay' onClick={()=>navigate(`/detail/${item.h_code}`)}>
                                                                상세보기<i className="fa-solid fa-angle-right"></i>
                                                            </button>
                                                        </div>
                                                        <div className="room-info">
                                                            <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                            <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                            <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                    ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                            <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div>                                                        
                                                    <span className='del detail' onClick={()=>{setListType(2);setListView(true);setDetailView(0);}}>전체목록<i className="fa-solid fa-angle-right"></i></span>
                                                </div>
                                            </div>
                                            </Fragment>
                                            ):null
                                        ))}
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>
            )}
            {/* 공지사항 메인 */}
            {listType === 3 && 
            (<div className='reserVation_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='reserVation_texts coupons' style={{borderTop:'2px solid black'}} onClick={() => setListType(3)}>
                    <p>[신규 가입 이벤트] 지금 가입하면 10,000원 할인 쿠폰 지급!</p>
                </div>
                <div className='reserVation_texts coupons' onClick={() => setListType(4)}>
                    <p>[기간 한정] 전 숙소 10% 할인 이벤트 진행 중</p>
                </div>
                <div className='reserVation_texts coupons' onClick={() => setListType(5)}>
                    <p>[포인트 혜택] 숙소 예약 시 5,000포인트 적립</p>
                </div>
                <div className='reserVation_texts coupons' onClick={() => setListType(6)}>
                    <p>[후기 이벤트] 리얼 후기 작성하고 1,000포인트 받으세요</p>
                </div>
                <div className='reserVation_texts coupons' onClick={() => setListType(7)}>
                    <p>[결제 혜택] 삼성카드 12월 무이자 할부 안내</p>
                </div>
            </div>)
            }
            
            {/* 1대1 문의 */}
            {listType === 4 && 
            (<div className='reserVation_text'>
                <h1 className='text_title'>1 대 1 문의</h1>
                <div>
                    <p className='support-1on1'>현재 문의 사항이 없습니다.</p>
                </div>
                <button type='button' className='sportBtn'>문의하기</button>
            </div>)
            }
            {/* 리뷰 ------------------------------------------------------------------------------------ */}
            {isOpen && (
                <div className='review_overlay'>
                    <div className='review_wrap'>
                        <p className="reviewTitle">호텔에 만족하셨나요?</p>
                        <div className="reviewBtn">
                            <button type="button" onClick={() => starHandler(1)} className="starBtn">
                                {star1 ? <img src='/img/star-one.png' alt="score" /> : <img src='/img/star-zero.png' alt="score" />}
                            </button>
                            <button type="button" onClick={() => starHandler(2)} className="starBtn">
                                {star2 ? <img src='/img/star-one.png' alt="score" /> : <img src='/img/star-zero.png' alt="score" />}
                            </button>
                            <button type="button" onClick={() => starHandler(3)} className="starBtn">
                                {star3 ? <img src='/img/star-one.png' alt="score" /> : <img src='/img/star-zero.png' alt="score" />}
                            </button>
                            <button type="button" onClick={() => starHandler(4)} className="starBtn">
                                {star4 ? <img src='/img/star-one.png' alt="score" /> : <img src='/img/star-zero.png' alt="score" />}
                            </button>
                            <button type="button" onClick={() => starHandler(5)} className="starBtn">
                                {star5 ? <img src='/img/star-one.png' alt="score" /> : <img src='/img/star-zero.png' alt="score" />}
                            </button>
                        </div>
                        <div className="review_rating">
                            {rating} 점 : {rating === 0 ? "별점을 선택해주세요." : rating === 1 ? "최악이에요" : rating === 2 ? "그저 그랬어요" : rating === 3 ? "보통이었어요" : rating === 4 ? "만족스러워요" : "정말 최고에요"} 
                        </div>
                        <button type='button' onClick={()=>{setIsOpen(false)}} className='review_Xbtn'>
                            <i class="fa-solid fa-x"></i>
                        </button>
                        <button type="button" onClick={reviewSend} className="comBtn"
                        style={{
                            backgroundColor : star1 === false ? '#e7e7e7ff' : '#42799b',
                            color:'#fff',
                            cursor:star1 === false ? 'not-allowed' : 'pointer'
                            }}>완료</button>
                    </div>
                </div>
            )}
        </div>
    )
}