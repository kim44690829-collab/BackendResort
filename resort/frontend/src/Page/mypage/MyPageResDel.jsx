import { useState,useEffect,useContext,useRef,Fragment } from "react";
import Calendar2 from '../Calendar2';
import { ResortDataContext } from '../../Api/ResortData';
import { ModalContext } from '../Modal';
import { Link, useNavigate } from 'react-router-dom';
import '../mypage/MyPage.css'
import axios from "axios";

export default function MyPageResDel(){
    // 03-18 -> 39번째줄, 332번째줄
    const {DayData,setSelectday,userEmail,loginSave,logout,setHeaderChange, MemberAllData, userNickName} = useContext(ResortDataContext);
    const {toggle,setModalContent} = useContext(ModalContext);
    // 2026-03-11
    //회원의 예약정보 가져오기
    const[myPage, setMyPage] = useState([]);
    //회원의 회원정보 가져오기
    const[memberInfo, setMemberInfo] = useState({});
    //회원 전화번호 가운데 4자리
    const[userNumFront, setUserNumFront] = useState('');
    //회원 전화번호 끝 4자리
    const[userNumBack, setUserNumBack] = useState('');
    // 이메일
    const [userMail, setUserMail] = useState('');
    // 이전 비밀번호
    const [userPw_before, setUserPw_before] = useState('');
    // 새 비밀번호
    const [userPw, setUserPw] = useState('');
    // 새 비밀번호 확인
    const [userPwConfirm, setUserPwConfirm] = useState('');
    // 생일
    const [BirthYear, setBirthYear] = useState('');
    const [BirthMonth, setBirthMonth] = useState('');
    const [BirthDate, setBirthDate] = useState('');    
    // 성별
    const [userGender, setUserGender] = useState(0);
    // 닉네임
    const [nickname, setNickname] = useState('');
    // 변경 닉네임
    const [changeNick, setChangeNick] = useState(userNickName);

    const navigate = useNavigate();

    // 리뷰 작성 성공
    const [reviewCom, setReviewCom] = useState(0);

    const [nickChange, setNickChange] = useState(true);

    // 왼쪽 리스트 클릭시 컨텐츠 전환
    const [listType, setListType] = useState(2)

    const nickChangeHandler = (e) => {
        setNickname(e.target.value)
        setChangeNick(e.target.value)
        setNickChange(false)
    }

    useEffect(() => {    
        if (!userEmail) return;

        fetchMyPage(); //마이페이지 DB전체호출
        fetchMyInfo(); //회원정보 DB호출
        
    },[userEmail, reviewCom])
    

    //마이페이지 DB불러오는 함수
    const fetchMyPage = async () => {
        if (!userEmail) return;

        try{
            const res = await axios.put('/api/reservation/reviewStatusMod')
            // console.log('리뷰 업데이트 됐나?',res.data)
            const res02 = await axios.get('/api/member/mypage', {
                params: { m_email: userEmail }
            })
            console.log("마이페이지 데이터 : ", res02.data);
            setMyPage(res02.data);
        }catch(error){
            console.error("error", error)
        }
    }

    //회원정보 DB불러오는 함수
    const fetchMyInfo = () => {
        if (!userEmail) return;

        axios.get('/api/member/onemember', {
            params: { m_email: userEmail }
        })
        .then((res) => {
            console.log("회원 데이터 : ", res.data);
            setMemberInfo(res.data);
            const phone = res.data.m_phone;
            const userNumFront = phone.substring(3, 7);
            const userNumBack = phone.substring(7);
            setUserNumFront(userNumFront);
            setUserNumBack(userNumBack);
            setUserMail(res.data.m_email);
            setUserGender(res.data.m_gender);
            setNickname(res.data.m_nickName);
            const birth = res.data.m_birth;
            if(birth) {
                const BirthYear = birth.substring(0, 4);
                const BirthMonth = birth.substring(5, 7);
                const BirthDate = birth.substring(8, 10);
                setBirthYear(BirthYear);
                setBirthMonth(BirthMonth);
                setBirthDate(BirthDate);
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    //리스트 보기
    const [listView, setListView] = useState(true);
    //상세 보기
    const [detailView, setDetailView] = useState(0);

    // 상세보기 버튼
    const contentHandeler = (re_code) => {
        setListView(false);
        setDetailView(re_code);
    }

     //달력 
    const [Cal, setCal] = useState(false);

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

    //취소내역 필터링
    const cancelList = myPage.filter(item => item.cancel === 1);


    //검색버튼 클릭여부
    const [search, setSearch] = useState(false);
    //날짜 필터링
    const [dateFilter, setDateFilter] = useState([]);

    //취소내역 검색
    const searchClick2 = () =>{        
        //날짜검색 범위 안에 드는 배열
        const dateArray = cancelList.filter((item)=>item.cancel_date.slice(0,10) >= new Date(DayData[0]).toLocaleDateString('sv-SE') && item.cancel_date.slice(0,10) <= new Date(DayData[1]).toLocaleDateString('sv-SE') ? item :null);
        //console.log(dateArray);

        if(dateArray === null || dateArray.length === 0){
            setDateFilter([]);
        }else{
            setDateFilter(dateArray);
        }
        setSearch(true);
        return;
    }

    // console.log('-------------------------', dateFilter)
    const [dayClick, setDayClick] = useState(false); 
    
    const cityMap = {
        Sokcho: '강원도 속초시',
        Gyeongju: '경상북도 경주시',
        Busan: '부산시',
        Gangneung: '강원도 강릉시',
        Yeosu: '전라남도 여수시',
        Daejeon: '대전시',
        Gwangju: '광주시',
        Jeju: '제주도',
        Pohang: '경상북도 포항시',
        Seoul: '서울시',
        Tokyo: '도쿄',
        Sapporo: '훗카이도 삿포로',
        LosAngeles: '캘리포니아 로스앤젤레스',
        'New York': '뉴욕',
        Guam: '괌',
        Zhangjiajie: '후난성 장가계',
        Shanghai: '상하이',
        Rome: '로마',
        Venice: '베네치아',
        Paris: '파리'
    };

    useEffect(() => {
        if (search) {
            searchClick();
        }
    }, [myPage]);

    return(
        <div className="reserVation_container">
            {/* 왼쪽 메뉴 */}
            <div className='reserVation_list'>
                <ul>
                    <li className='list_title'>마이페이지</li>
                    <li className='list_menu'>
                        <Link to = '/myPageRes' onClick={() => {setListType(1), setListView(true);setDetailView(0);setSearch(false);}} >
                            <button type='button' className='list_menuBtn' style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                                예약내역
                            </button>
                        </Link>
                    </li>
                    <li className='list_menu'>
                        <Link to = '/myPageResDel' onClick={() => {setListType(2), setListView(true);setDetailView(0);setSearch(false);}} >
                            <button type='button' className='list_menuBtn' style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                                취소내역
                            </button>
                        </Link>
                    </li>
                    <li className='list_menu'>
                        <Link to = '/myPageCoupon' onClick={() => {setListType(3), setListView(true);setDetailView(0);setSearch(false);}} >
                            <button type='button' className='list_menuBtn' style={{fontWeight: listType === 3 ? 'bold' : 'normal'}}>
                                쿠폰
                            </button>
                        </Link>
                    </li>
                    <li className='list_menu'>
                        <Link to = '/myPageMemMod' onClick={() => {setListType(4), setListView(true);setDetailView(0);setSearch(false);}} >
                            <button type='button' className='list_menuBtn' style={{fontWeight: listType === 4 ? 'bold' : 'normal'}}>
                                회원정보수정/탈퇴
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            
            {/* 취소내역 */}
            {listView && detailView === 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>취소 내역 <span>※ 취소일자가 최신인 순으로 보여집니다. </span></h1>
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
                                                <p className='empty-tit'>검색한 날짜에 취소한 호텔정보가 없습니다.</p>
                                                <p className='empty-txt'>검색날짜를 다시 설정해주세요.</p>
                                            </div>
                                        ) : (search && dateFilter !== null) || (search && dateFilter.length >= 1) ? (
                                            <ul>
                                                {dateFilter.map((item)=>(
                                                    item.cancel !== 0 ? (
                                                    <Fragment key={item.re_code}>
                                                        <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                            <p className='room-title wish'>{item.cancel_date?.slice(0, 10)}({['일','월','화','수','목','금','토'][new Date(item.cancel_date?.slice(0,10)).getDay()]}) 취소건
                                                                <span className='del detail' onClick={()=>{contentHandeler(item.re_code);window.scrollTo(0, 0);}}>상세보기 <i className="fa-solid fa-angle-right"></i></span>                                                           
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <div className="room-left">
                                                                <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                    <img src={`/img/${item.h_Img}`} alt={item.hotelName} />
                                                                </Link>
                                                            </div>
                                                            <div className="room-right">
                                                                <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                                <div className="room-info">
                                                                    <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                    <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                    <p><i className="fa-solid fa-star"></i> 나의 별점 :  
                                                                        <span className='bold'>
                                                                            {
                                                                                (item.rb_score >= 0 && item.rb_score < 0.5) ? <img className='img5' src='/img/size20-0-0.png' alt="score" /> :
                                                                                (item.rb_score >= 0.5 && item.rb_score < 1) ? <img className='img5' src='/img/size20-0-5.png' alt="score" /> :
                                                                                (item.rb_score >= 1 && item.rb_score < 1.5) ? <img className='img5' src='/img/size20-1-0.png' alt="score" /> :
                                                                                (item.rb_score >= 1.5 && item.rb_score < 2) ? <img className='img5' src='/img/size20-1-5.png' alt="score" /> :
                                                                                (item.rb_score >= 2 && item.rb_score < 2.5) ? <img className='img5' src='/img/size20-2-0.png' alt="score" /> :
                                                                                (item.rb_score >= 2.5 && item.rb_score < 3) ? <img className='img5' src='/img/size20-2-5.png' alt="score" /> :
                                                                                (item.rb_score >= 3 && item.rb_score < 3.5) ? <img className='img5' src='/img/size20-3-0.png' alt="score" /> :
                                                                                (item.rb_score >= 3.5 && item.rb_score < 4) ? <img className='img5' src='/img/size20-3-5.png' alt="score" /> :
                                                                                (item.rb_score >= 4 && item.rb_score < 4.5) ? <img className='img5' src='/img/size20-4-0.png' alt="score" /> :
                                                                                (item.rb_score >= 4.5 && item.rb_score < 5) ? <img className='img5' src='/img/size20-4-5.png' alt="score" /> :
                                                                                <img className='img5' src='/img/size20-5-0.png' alt="score" />
                                                                            }                                                                         
                                                                        </span>
                                                                        <span className="starScore3">{item.rb_score}.0</span>
                                                                    </p>
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
                                                        <p className='room-title wish'>{item.cancel_date?.slice(0, 10)}({['일','월','화','수','목','금','토'][new Date(item.cancel_date?.slice(0,10)).getDay()]}) 취소건
                                                            <span className='del detail' onClick={()=>{contentHandeler(item.re_code);window.scrollTo(0, 0);}}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="room-left">
                                                            <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                <img src={`/img/${item.h_Img}`} alt={item.hotelName} />
                                                            </Link>
                                                        </div>
                                                        <div className="room-right">
                                                            <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                            <div className="room-info">
                                                                <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                                <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                                <p><i className="fa-solid fa-star"></i> 나의 별점 :  
                                                                    <span className='bold'>
                                                                        {
                                                                            (item.rb_score >= 0 && item.rb_score < 0.5) ? <img className='img5' src='/img/size20-0-0.png' alt="score" /> :
                                                                            (item.rb_score >= 0.5 && item.rb_score < 1) ? <img className='img5' src='/img/size20-0-5.png' alt="score" /> :
                                                                            (item.rb_score >= 1 && item.rb_score < 1.5) ? <img className='img5' src='/img/size20-1-0.png' alt="score" /> :
                                                                            (item.rb_score >= 1.5 && item.rb_score < 2) ? <img className='img5' src='/img/size20-1-5.png' alt="score" /> :
                                                                            (item.rb_score >= 2 && item.rb_score < 2.5) ? <img className='img5' src='/img/size20-2-0.png' alt="score" /> :
                                                                            (item.rb_score >= 2.5 && item.rb_score < 3) ? <img className='img5' src='/img/size20-2-5.png' alt="score" /> :
                                                                            (item.rb_score >= 3 && item.rb_score < 3.5) ? <img className='img5' src='/img/size20-3-0.png' alt="score" /> :
                                                                            (item.rb_score >= 3.5 && item.rb_score < 4) ? <img className='img5' src='/img/size20-3-5.png' alt="score" /> :
                                                                            (item.rb_score >= 4 && item.rb_score < 4.5) ? <img className='img5' src='/img/size20-4-0.png' alt="score" /> :
                                                                            (item.rb_score >= 4.5 && item.rb_score < 5) ? <img className='img5' src='/img/size20-4-5.png' alt="score" /> :
                                                                            <img className='img5' src='/img/size20-5-0.png' alt="score" />
                                                                        }
                                                                    </span>       
                                                                    <span className="starScore3">{item.rb_score}.0</span>                                                         
                                                                </p>
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
                                            <Calendar2/>
                                        </div>
                                    }
                                    <div className="hotel-day" >
                                        <p className='day-wrap day-wrap2' style={{cursor:'pointer'}} onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>
                                            {dayClick === true ?
                                            <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 
                                                {DayData.length < 2 ? ` 조회할 기간을 설정해주세요.` : `${DayData[0]} ~ ${DayData[1]}`}
                                            </span>
                                            : <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 조회할 기간을 설정해주세요.</span>}
                                        </p>
                                        <button type='button' style={{width:'60%'}} onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>조회기간 설정</button>
                                        <button type='button' style={{width:'37%',marginLeft:'6px'}} className='search' onClick={()=>{setDayClick(false);setListType(2);setListView(true);setDetailView(0);setSearch(false);setCal(false);window.scrollTo(0,0);}}><i className="fa-solid fa-arrow-rotate-right"></i> 초기화</button>
                                    </div>
                                    <div className="hotel-headcount">                                        
                                        <button type='button' className='search' onClick={()=>{searchClick2();setCal(false);setDayClick(true);window.scrollTo(0,0);}}>조회하기</button>
                                    </div>
                                    <div className="reserve-select">
                                        <p className='select-tit'>조회 전 참고사항</p>
                                        <p className='select-txt'>· 조회기간을 설정하시기 전에는 모든 취소내역이 보여집니다.</p>
                                        <p className='select-txt'>· 취소내역 조회는 예약일 기준이 아닌, <span className='bold'>취소(신청)일</span>을 기준으로 조회해주시기 바랍니다.</p>
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>)
            }
            {/* 취소내역 상세조회 */}
            {!listView && detailView !== 0 &&
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
                                                <p className='room-title wish' style={{marginTop:'0'}}>예약취소 호텔 정보</p>
                                                <div className="hotelInfo">
                                                    <div className="room-left">
                                                        <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                            <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                        </Link>
                                                    </div>
                                                    <div className="room-right">
                                                        <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                        <div className="intro-right">
                                                            <button type='button' className='pay' onClick={()=>{navigate(`/detail/${item.h_code}`);window.scrollTo(0, 0);}}>
                                                                상세보기<i className="fa-solid fa-angle-right"></i>
                                                            </button>
                                                        </div>
                                                        <div className="room-info">
                                                            <p><i className="fa-solid fa-address-card"></i> 예약자명 : <span className='bold'>{item.booker_name}</span></p>                                                                
                                                            <p><i className="fa-solid fa-couch"></i> 예약객실 : <span className='bold'>{item.roomName}</span></p>
                                                            <p><i className="fa-solid fa-star"></i> 나의 별점 :  
                                                                <span className='bold'>
                                                                    {
                                                                        (item.rb_score >= 0 && item.rb_score < 0.5) ? <img className='img5' src='/img/size20-0-0.png' alt="score" /> :
                                                                        (item.rb_score >= 0.5 && item.rb_score < 1) ? <img className='img5' src='/img/size20-0-5.png' alt="score" /> :
                                                                        (item.rb_score >= 1 && item.rb_score < 1.5) ? <img className='img5' src='/img/size20-1-0.png' alt="score" /> :
                                                                        (item.rb_score >= 1.5 && item.rb_score < 2) ? <img className='img5' src='/img/size20-1-5.png' alt="score" /> :
                                                                        (item.rb_score >= 2 && item.rb_score < 2.5) ? <img className='img5' src='/img/size20-2-0.png' alt="score" /> :
                                                                        (item.rb_score >= 2.5 && item.rb_score < 3) ? <img className='img5' src='/img/size20-2-5.png' alt="score" /> :
                                                                        (item.rb_score >= 3 && item.rb_score < 3.5) ? <img className='img5' src='/img/size20-3-0.png' alt="score" /> :
                                                                        (item.rb_score >= 3.5 && item.rb_score < 4) ? <img className='img5' src='/img/size20-3-5.png' alt="score" /> :
                                                                        (item.rb_score >= 4 && item.rb_score < 4.5) ? <img className='img5' src='/img/size20-4-0.png' alt="score" /> :
                                                                        (item.rb_score >= 4.5 && item.rb_score < 5) ? <img className='img5' src='/img/size20-4-5.png' alt="score" /> :
                                                                        <img className='img5' src='/img/size20-5-0.png' alt="score" />
                                                                    }
                                                                </span>
                                                                <span className="starScore3">{item.rb_score}.0</span>
                                                            </p>
                                                            <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                    ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                            <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                        </div>
                                                    </div>
                                                </div> 
                                                <p className='room-title wish'>취소 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>예약취소시간</th>
                                                            <td>
                                                                {new Date(item.cancel_date)?.toISOString().slice(0, 10)}({new Date(item.cancel_date).getDay()===0?'일':new Date(item.cancel_date).getDay()===1?'월':new Date(item.cancel_date).getDay()===2?'화':new Date(item.cancel_date).getDay()===3?'수':new Date(item.cancel_date).getDay()===4?'목':new Date(item.cancel_date).getDay()===5?'금':new Date(item.cancel_date).getDay()===6?'토':undefined})&nbsp;{item.cancel_date?.replace('T', ' ').substring(11, 19)}
                                                            </td>
                                                            <th>취소여부</th>
                                                            <td>취소완료</td>
                                                            <th>환불금액</th>
                                                            <td>{(item.final_price).toLocaleString()}원</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p className='room-title wish'>취소전 예약 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>숙소명</th>
                                                            <td colSpan={2}>{item.hotelName}</td>
                                                            <th>객실명</th>
                                                            <td colSpan={2}>{item.roomName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>국가</th>
                                                            <td>
                                                                {item.country === 'Korea'? "대한민국":
                                                                item.country === 'Japan'? "일본":
                                                                item.country === 'USA'? "미국":
                                                                item.country === 'China'? "중국":
                                                                item.country === 'Italy'? "이탈리아":
                                                                item.country === 'France'? "프랑스":null
                                                                }
                                                            </td>
                                                            <th>도시</th>
                                                            <td>{cityMap[item.city]}</td>
                                                            <th>숙소유형</th>
                                                            <td>
                                                                {item.type==='Hotel'?'호텔':item.type==='Resort'?'리조트':item.type==='GuestHouse'?'게스트하우스/비앤비':item.type==='Condo'?'콘도':'캠핑장'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>예약시간</th>
                                                            <td>
                                                                {new Date(item.reserved_at)?.toISOString().slice(0, 10)}({new Date(item.reserved_at).getDay()===0?'일':new Date(item.reserved_at).getDay()===1?'월':new Date(item.reserved_at).getDay()===2?'화':new Date(item.reserved_at).getDay()===3?'수':new Date(item.reserved_at).getDay()===4?'목':new Date(item.reserved_at).getDay()===5?'금':new Date(item.reserved_at).getDay()===6?'토':undefined})&nbsp;{item.reserved_at?.replace('T', ' ').substring(11, 19)}
                                                            </td>
                                                            {/* <td>{item.reserved_at?.replace('T', ' ').substring(0, 19)}</td> */}
                                                            <th>예약자명</th>
                                                            <td>{item.booker_name}</td>
                                                            <th>전화번호</th>
                                                            <td>{item.m_phone}</td>
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
                                                <p className='room-title wish'>취소전 결제 내역</p>
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
                                                                                               
                                                <div className="buttons">                                                        
                                                    <span className='del detail' onClick={()=>{setListType(2);setListView(true);setDetailView(0);window.scrollTo(0, 0);}}>전체목록<i className="fa-solid fa-angle-right"></i></span>
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
        </div>
    )
}