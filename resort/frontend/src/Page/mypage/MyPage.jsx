import { useState,useEffect,useContext,useRef,Fragment } from "react";
import Calendar2 from '../Calendar2';
import { ResortDataContext } from '../../Api/ResortData';
import { ModalContext } from '../Modal';
import { Link, useNavigate } from 'react-router-dom';
import '../mypage/MyPage.css'
import axios from "axios";

export default function MyPage(){
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
            // console.log("마이페이지 데이터 : ", res02.data);
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
            // console.log("회원 데이터 : ", res.data);
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

    // 예약취소
    const reserveCancel = (code) => {
        if(!window.confirm("정말 취소하시겠습니까?")){
           return;
        }
        axios.put('/api/reservation/cancel',null,{params:{re_code:code}})
        .then((res) => {
            // console.log("-----------------------------------------");
            // console.log(res.data);
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
    // console.log('activeList', activeList)
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
        //console.log(dateArray);

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
    // console.log('dayClick',dayClick)
    //------------------------------------------------------ 회원정보 수정관련

    // 마우스 변경
    const [mouseCursor, setMouseCursor] = useState(false);

    // 회원가입 폼에서 조건을 만족하지 못했을때 확인버튼 비활성화
    const [isDisabledSignup, setIsDisabledSignup] = useState(true);

    // 도메인 배열
    const ALLOWED_DOMAINS = [
        "naver.com",
        "gmail.com",
        "daum.net",
        "kakao.com",
        "hanmail.net",
        "nate.com",
        "resort.com"
    ];

    //회원수정 버튼 클릭시 실행되는 핸들러 함수 
    const signup = (e) => {
        e.preventDefault();

        if(!window.confirm("정말 수정하시겠습니까?")){
           return;
        }

        //  새 비밀번호가 있으면 그걸 사용
        // 없으면 이전 비밀번호 유지
        const finalPw = userPw && userPw.trim() !== ""
        ? userPw : userPw_before;

        //수정정보 전송
        axios.put('/api/member/updatemember',{m_email:userMail,
            m_pw: finalPw,
            m_gender:userGender,
            m_nickName:nickname,
            m_phone:'010'+userNumFront+userNumBack,
            m_birth: `${BirthYear}-${BirthMonth.padStart(2,'0')}-${BirthDate.padStart(2,'0')}`,
            pw_before: userPw_before
        })
        .then((res) => {
            if(res.data === true){
                alert('회원 정보가 수정 완료 되었습니다.');
                fetchMyInfo();
                setListType(4);
                setListView(true);
                setDetailView(0);
                //setHeaderChange(0);
                loginSave(nickname,userMail);
                navigate('/')
            }else{
                alert('회원 정보수정 실패. 비밀번호를 다시 입력해주세요.');               
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    // 닉네임 중복확인 -> 닉네임이 존재하는지 체크
    const [nickChk, setNickChk] = useState(null);

    const nickNameChk = () => {
        axios.get('/api/member/nicknameSel',{
            params : {
                m_nickName : nickname
            }
        })
        .then((res) => {
            console.log('닉네임 중복확인',res.data)
            if(res.data === -3){
                alert('이미 존재하는 닉네임입니다.')
            }else{
                alert('사용 가능한 닉네임입니다.')
            }
            setNickChk(res.data)
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    // 정규식 .test() => ()안에있는게 앞의 조건에 맞으면 true를 반환 아니면 false를 반환
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValidEmail = emailRegex.test(userMail);
    // emailInput에서 받은 이메일 주소를 @기준으로 잘라서 배열로 만듦
    // ex) aaaa@naver.com => ['aaaa', 'naver.com'] 의 [1] => 'naver.com' => 즉 도메인명을 가져오기 위한 로직(소문자로)
    // 중간의 ?는 없으면 undefined를 반환
    const domain = userMail.split("@")[1]?.toLowerCase();
    // 기존에 위에서 배열에 저장한 도메인 명들 중에 사용자가 입력한 도메인명이 포함되는지 알아보기위한 로직
    const isAllowedDomain = ALLOWED_DOMAINS.includes(domain);

    // 생일
    const m = Number(BirthMonth);
    const d = Number(BirthDate);

    // 정보수정 시 버튼 활성화 조건
    useEffect(() => {
        if(
            (nickChange || userNickName === changeNick) &&
            isValidEmail &&
            isAllowedDomain &&
            userPw_before.length >=8 &&
            ((userPw !== "" && userPw.length >= 8 )||userPw === "") && 
            userPwConfirm === userPw && 
            (/^\d{4}$/.test(userNumFront) && /^\d{4}$/.test(userNumBack)) &&
            BirthYear.length >= 4 && 
            (1 <= m && m <= 12) &&
            (1 <= d && d <= 31) &&
            userGender !== '' &&
            (nickname.length >= 2 && nickname.length <= 20) &&
            (userNickName === changeNick || nickChk === 0)
        ){
                setIsDisabledSignup(false)
                setMouseCursor(true)
            }else{
                setIsDisabledSignup(true)
                setMouseCursor(false)
            }
    }, [userMail, userPw, userPwConfirm, userNumFront, userNumBack, BirthYear, BirthMonth, BirthDate, userGender, nickname, userPw_before, nickChk, nickChange, changeNick])


    const validatePwAlert_before = () => {
        if (!userPw_before) return;
        if(userPw_before.length < 8){
            alert('최소 8자리 이상의 숫자로 입력해주세요')
        }
    }
    const validatePwAlert = () => {
        if (!userPw) return;
        if(userPw.length < 8){
            alert('최소 8자리 이상의 숫자로 입력해주세요')
        }
    }
    const validatePwConfAlert = () => {
        if (!userPwConfirm) return;
        if(userPwConfirm !== userPw){
            alert('위의 비밀번호와 동일한 번호로 입력해주세요')
        }
    }
    const validateNickNameAlert = () => {
        if (!nickname) return;
        else if( 20 < nickname.length || nickname.length < 2){
            alert('닉네임은 2글자 이상, 20글자 이하로 입력해주세요')
        }
    }

    //회원탈퇴 버튼 클릭시 실행되는 핸들러 함수 
    const deleteAccount = (e) => {
        e.preventDefault();

        if(!window.confirm("정말 탈퇴하시겠습니까?")){
           return;
        }

        if(userPw_before.length === 0 || userPw_before === null || userPw_before === ""){
            alert('비밀번호를 입력해주세요');
            return;
        }

        //수정정보 전송
        axios.put('/api/member/deletemember', {m_email: userMail, pw_before: userPw_before})
        .then((res) => {
            if(res.data === true){
                alert('탈퇴가 완료 되었습니다.');
                logout();
                setHeaderChange(0);
                navigate('/');
            }else{
                alert('탈퇴 실패. 비밀번호를 다시 입력해주세요.');               
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    }
    // 리뷰 작성
    const [isOpen, setIsOpen] = useState(false);
    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);
    const [star4, setStar4] = useState(false);
    const [star5, setStar5] = useState(false);
    const [rating, setRating] = useState(0);
    const [roomCode, setRoomCode] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    // console.log('roomCode', roomCode)
    // console.log('reviewIndex', reviewIndex)
    

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

        // console.log('rating', rating)
        // console.log('roomCode', roomCode)
        // console.log('MemberAllData', MemberAllData)
        // console.log('userNickName',userNickName)
        const memberNum = MemberAllData.find(m => m.m_nickName === userNickName)?.m_code;
        // console.log('memberNum', memberNum)
    
        const reviewSend = async () => {

            try{
                const res = await axios.post('/api/board/reviewSend', {rb_score: rating, m_code : memberNum, r_code: roomCode, re_code : reviewIndex})
                if(res.data === 1){
                    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',res.data)
                    setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>리뷰를 작성해주셔서 감사합니다.</p>)
                    toggle();
                    const res02 = await axios.put('/api/reservation/resMod', null,{
                        params:{
                            re_code : reviewIndex
                        }
                    })
                    // console.log(res02.data)
                    setReviewCom(prev => prev + 1);
                    setStar1(false);
                    setStar2(false);
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                    setRating(0)
                    setIsOpen(false);
                }else{
                    setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>리뷰 작성에 실패하였습니다.</p>)
                    toggle();
                }

            }catch(err){
                console.error(err)
            }

        }


        
        const reviewMod = () => {

            axios.put('/api/board/reviewMod', null,{
                params: {
                    re_code: reviewIndex, 
                    rb_score: rating
                }
            })
            .then((res) => {
                if(res.data === 1){
                    setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>리뷰를 수정하셨습니다.</p>)
                    toggle();
                }else{
                    setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>리뷰 수정에 실패하였습니다.</p>)
                    toggle();
                }
                // console.log('리뷰?????????',res.data)
                setReviewCom(prev => prev + 1);
                setStar1(false);
                setStar2(false);
                setStar3(false);
                setStar4(false);
                setStar5(false);
                setRating(0)
                setIsOpen(false)
                
            })
        }
        const [status, setStatus] = useState(null);
        const reviewModalOpen = (item) => {
            setRoomCode(item.r_code);
            setReviewIndex(item.re_code);
            if(item.review_status === 1){
                setStatus(1);
            }else{
                setStatus(0);
            }
            setIsOpen(true);
        }

        const today = new Date().toLocaleDateString('sv-SE');
        // console.log('today', today)

        // console.log('myPagemyPage',myPage)
        // console.log('myPage[reviewIndex].rb_code', reviewIndex)
    return(
        <div className="reserVation_container">
            {/* 왼쪽 메뉴 */}
            <div className='reserVation_list'>
                <ul>
                    <li className='list_title'>마이페이지</li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(1);setListView(true);setDetailView(0);setSearch(false);}} style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                            예약내역
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(2);setListView(true);setDetailView(0);setSearch(false);}} style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                            취소내역
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(3);setListView(true);setDetailView(0);setSearch(false);}} style={{fontWeight: listType === 3 ? 'bold' : 'normal'}}>
                            쿠폰
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(4);setListView(true);setDetailView(0);setSearch(false);}} style={{fontWeight: listType === 4 ? 'bold' : 'normal'}}>
                            회원정보수정/탈퇴
                        </button>
                    </li>
                </ul>
            </div>
            {/* 예약내역 */}
            {listType === 1 && listView && detailView === 0 &&
            (<div className='reserVation_text'>
                <h1 className='text_title'>예약 내역 <span>※ 예약일자가 최신인 순으로 보여집니다. </span></h1>
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

                                                {dateFilter.map((item, index)=>{

                                                        const year = new Date(item.check_out_date).getFullYear();
                                                        const month = new Date(item.check_out_date).getMonth()+1;
                                                        const day = new Date(item.check_out_date).getDate();

                                                    return(
                                                        item.cancel === 0 ? (
                                                        <Fragment key={item.re_code}>
                                                            <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                                <p className='room-title wish'>{item.reserved_at?.slice(0, 10)}({['일','월','화','수','목','금','토'][new Date(item.reserved_at?.slice(0,10)).getDay()]}) 예약건
                                                                    <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                                    {item.check_in_date.slice(0,10) > today && ( 
                                                                        <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                                    )}
                                                                    {item.check_in_date.slice(0,10) <= today && item.check_out_date.slice(0,10) > today && (
                                                                        <span className='del' style={{
                                                                            cursor: 'default',
                                                                            background: '#f1f3f5',
                                                                            border: '1px solid #e9ecef',
                                                                            color: '#495057'
                                                                        }}>
                                                                            🏨 숙소 이용 중
                                                                        </span>
                                                                    )}
                                                                    {item.check_out_date.slice(0,10) <= today && item.review_status === 0 &&  ( 
                                                                        <span className='del' onClick={()=>{reviewModalOpen(item)}}>
                                                                            <i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성
                                                                        </span>
                                                                    )}   
                                                                    {/* 체크아웃 이후 + 리뷰 작성 완료 */}
                                                                    {new Date(year,month,day+30).toLocaleDateString('sv-SE') > today && item.review_status === 1 ? (
                                                                    <span className='del' onClick={() => reviewModalOpen(item)}>
                                                                        <i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰수정
                                                                    </span>
                                                                    )
                                                                    :
                                                                    <span></span>
                                                                    }                                                  
                                                                    {/* 체크아웃 이후 + 리뷰 작성기간 만료 */}
                                                                    {item.check_out_date.slice(0,10) <= today && item.review_status === 2 && (
                                                                    <span className='del' style={{
                                                                        cursor: 'default',
                                                                        background: '#f1f3f5',
                                                                        border: '1px solid #e9ecef',
                                                                        color: '#495057'
                                                                    }}>
                                                                        <i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰기간만료
                                                                    </span>
                                                                    )}                                                    
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
                                                                        <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                                ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                        <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Fragment>
                                                        ):null
                                                    )
                                                    
                                                })}

                                            </ul>
                                        ):null}

                                        {(!search && activeList && activeList.length > 0) ? ( 
                                            <ul>
                                                {activeList.map((item, index)=>{
                                                        const year = new Date(item.check_out_date).getFullYear();
                                                        const month = new Date(item.check_out_date).getMonth()+1;
                                                        const day = new Date(item.check_out_date).getDate();
                                                    return(
                                                        item.cancel === 0 ? (
                                                        <Fragment key={item.re_code}>
                                                        <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                            <p className='room-title wish'>{item.reserved_at?.slice(0, 10)}({['일','월','화','수','목','금','토'][new Date(item.reserved_at?.slice(0,10)).getDay()]}) 예약건
                                                                <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
                                                                {item.check_in_date.slice(0,10) > today && ( 
                                                                    <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                                )}

                                                                {item.check_in_date.slice(0,10) <= today && today < item.check_out_date.slice(0,10) && ( 
                                                                    <span className='del' style={{
                                                                        cursor: 'default',
                                                                        background: '#f1f3f5',
                                                                        border: '1px solid #e9ecef',
                                                                        color: '#495057'
                                                                    }}>
                                                                        🏨 숙소 이용 중
                                                                    </span>
                                                                )}
                                                                {item.check_out_date.slice(0,10) <= today && item.review_status === 0 && ( 
                                                                    <span className='del' onClick={()=>{reviewModalOpen(item)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                                )}

                                                                {new Date(year,month,day+30).toLocaleDateString('sv-SE') > today && item.review_status === 1 ? (
                                                                    <span className='del' onClick={() => reviewModalOpen(item)}>
                                                                        <i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰수정
                                                                    </span>
                                                                    )
                                                                    :
                                                                    <span></span>
                                                                    }
                                                                {item.check_out_date.slice(0,10) <= today &&  item.review_status === 2 && ( 
                                                                    <span className='del' style={{
                                                                        cursor: 'default',
                                                                        background: '#f1f3f5',
                                                                        border: '1px solid #e9ecef',
                                                                        color: '#495057'
                                                                    }}> 리뷰기간만료</span>
                                                                )} 
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
                                                                    <p><i className="fa-regular fa-calendar"></i> 숙박일 : <span className='bold'>{new Date(item.check_in_date)?.toISOString().slice(0, 10)}({new Date(item.check_in_date).getDay()===0?'일':new Date(item.check_in_date).getDay()===1?'월':new Date(item.check_in_date).getDay()===2?'화':new Date(item.check_in_date).getDay()===3?'수':new Date(item.check_in_date).getDay()===4?'목':new Date(item.check_in_date).getDay()===5?'금':new Date(item.check_in_date).getDay()===6?'토':undefined})
                                                                        ~ {new Date(item.check_out_date)?.toISOString().slice(0, 10)}({new Date(item.check_out_date).getDay()===0?'일':new Date(item.check_out_date).getDay()===1?'월':new Date(item.check_out_date).getDay()===2?'화':new Date(item.check_out_date).getDay()===3?'수':new Date(item.check_out_date).getDay()===4?'목':new Date(item.check_out_date).getDay()===5?'금':new Date(item.check_out_date).getDay()===6?'토':undefined})</span></p>
                                                                    <span className='final-price'>{(item.final_price).toLocaleString()}원<span>/{(new Date(item.check_out_date).getTime()-new Date(item.check_in_date).getTime())/(1000*24*60*60)}박</span></span>                                                                
                                                                </div>
                                                            </div>
                                                        </li>
                                                        </Fragment>
                                                        ):null
                                                    )

                                                    
                                                })}
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
                                            <Calendar2/>
                                        </div>
                                    }
                                    <div className="hotel-day" >
                                        <p className='day-wrap'>
                                            {dayClick === true ?
                                            <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 
                                                {DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`} ~ {DayData.length < 2 ? `${year}-${month+1}-${date+1}` : `${DayData[1]}`}
                                            </span>
                                            : <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 조회할 기간을 설정해주세요.</span>}
                                        </p>
                                        {/*  */}
                                        <button type='button' style={{width:'60%'}} onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>조회기간 설정</button>
                                        <button type='button' style={{width:'37%',marginLeft:'6px'}} className='search' onClick={()=>{setDayClick(false);setListType(1);setListView(true);setDetailView(0);setSearch(false);setCal(false);}}><i className="fa-solid fa-arrow-rotate-right"></i> 초기화</button>
                                    </div>
                                    <div className="hotel-headcount">
                                        <button type='button' className='search' onClick={()=>{searchClick();setCal(false);}}>조회하기</button>
                                    </div>
                                    <div className="reserve-select">
                                        <p className='select-tit'>조회 전 참고사항</p>
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
                                        {activeList.map((item)=>{
                                            const year = new Date(item.check_out_date).getFullYear();
                                            const month = new Date(item.check_out_date).getMonth()+1;
                                            const day = new Date(item.check_out_date).getDate();
                                            return(
                                                item.re_code === detailView ? (
                                                <Fragment key={item.re_code}>
                                                <div style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                    <p className='room-title wish'  style={{marginTop:'0'}}>예약호텔 정보</p>
                                                    <div className="hotelInfo">
                                                        <div className="room-left">
                                                            <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                                <img src={`/img/${item.h_Img}`} alt={item.hotelName} />
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
                                                    <p className='room-title wish'>예약 내역</p>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th>호텔명</th>
                                                                <td colSpan={2}>{item.hotelName}</td>
                                                                <th>객실명</th>
                                                                <td colSpan={2}>{item.roomName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>예약일</th>
                                                                <td>{item.reserved_at?.replace('T', ' ').substring(0, 19)}</td>
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
                                                                                                
                                                    <div className="buttons">
                                                        {item.check_in_date.slice(0,10) > today && ( 
                                                            <span className='del' onClick={()=>{reserveCancel(item.re_code)}}><i className="fa-solid fa-ban" style={{color:'#f94239'}}></i> 취소하기</span>
                                                        )}
                                                        {item.check_in_date.slice(0,10) <= today && item.check_out_date.slice(0,10) > today && ( 
                                                            <span className='del' style={{
                                                                cursor: 'default',
                                                                background: '#f1f3f5',
                                                                border: '1px solid #e9ecef',
                                                                color: '#495057'
                                                            }}>
                                                                🏨 숙소 이용 중
                                                            </span>
                                                        )}
                                                        {item.check_out_date.slice(0,10) <= today && item.review_status === 0 && ( 
                                                            <span className='del'  onClick={()=>{reviewModalOpen(item)}}><i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰작성</span>
                                                        )}

                                                        {new Date(year,month,day+30).toLocaleDateString('sv-SE') > today && item.review_status === 1 ? (
                                                        <span className='del' onClick={() => reviewModalOpen(item)}>
                                                            <i className="fa-solid fa-star" style={{color:'#FCC34B'}}></i> 리뷰수정
                                                        </span>
                                                        )
                                                        :
                                                        <span></span>
                                                        }                                                           
                                                        {item.check_out_date.slice(0,10) <= today && item.review_status === 2 && ( 
                                                            <span className='del' style={{
                                                                cursor: 'default',
                                                                background: '#f1f3f5',
                                                                border: '1px solid #e9ecef',
                                                                color: '#495057'
                                                            }}> 리뷰기간만료</span>
                                                        )}                                                           
                                                        <span className='del detail' onClick={()=>{setListType(1);setListView(true);setDetailView(0);}}>전체목록<i className="fa-solid fa-angle-right"></i></span>
                                                    </div>
                                                </div>
                                                </Fragment>
                                            ):null
                                            )
                                        })}
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
                                                                <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>                                                           
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
                                                            <span className='del detail' onClick={()=>contentHandeler(item.re_code)}>상세보기 <i className="fa-solid fa-angle-right"></i></span>
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
                                        <p className='day-wrap day-wrap2'>
                                            {dayClick === true ?
                                            <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 
                                                {DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`} ~ {DayData.length < 2 ? `${year}-${month+1}-${date+1}` : `${DayData[1]}`}
                                            </span>
                                            : <span className='day-txt'><i style={{color:'#6f6f6f'}} className="fa-solid fa-calendar"></i> 조회할 기간을 설정해주세요.</span>}
                                        </p>
                                        <button type='button' style={{width:'60%'}} onClick={ e =>{
                                            setCal((Cal === true) ? false : true);
                                            setDayClick(true);
                                            setSelectday([]);
                                            e.stopPropagation();
                                        }}>조회기간 설정</button>
                                        <button type='button' style={{width:'37%',marginLeft:'6px'}} className='search' onClick={()=>{setDayClick(false);setListType(2);setListView(true);setDetailView(0);setSearch(false);setCal(false);}}><i className="fa-solid fa-arrow-rotate-right"></i> 초기화</button>
                                    </div>
                                    <div className="hotel-headcount">                                        
                                        <button type='button' className='search' onClick={()=>{searchClick2();setCal(false);}}>조회하기</button>
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
                                                <p className='room-title wish'>취소 내역</p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>예약취소일</th>
                                                            <td>{item.cancel_date?.replace('T', ' ').substring(0, 19)}</td>
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
                                                            <th>호텔명</th>
                                                            <td colSpan={2}>{item.hotelName}</td>
                                                            <th>객실명</th>
                                                            <td colSpan={2}>{item.roomName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>예약일</th>
                                                            <td>{item.reserved_at?.replace('T', ' ').substring(0, 19)}</td>
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
            {/* 쿠폰 */}
            {listType === 3 && 
            (<div className='reserVation_text'>
                <h1 className='text_title'>보유 쿠폰</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)}>
                        <section className="reserVation-wrap coupon">
                            <div className="detail-content">
                                <div className="detail-left" ref={triggerRef}>                       
                                    <div className="reserve-select" style={{borderTop:'0px'}}>
                                        {memberInfo.currentCoupon !== 0 ? (
                                            <ul>    
                                                <li style={{padding: '0',background: 'transparent',marginBottom: '10px'}}>
                                                    <p className='room-title wish'>{memberInfo.m_regDate?.slice(0, 10)} 지급</p>
                                                </li>
                                                <li style={{width:'915px'}}>
                                                    <div className="coupon-left">
                                                        <img src={'/coupon.png'} alt='couponImg'/>
                                                    </div>
                                                    <div className="room-right">
                                                        <h2 style={{fontSize:'24px'}}>신규 회원가입 쿠폰</h2>
                                                        <div className="room-info coupon">
                                                            <p className="coupon"><i className="fa-solid fa-address-card"></i> 모든 호텔예약 10,000원 할인혜택</p>                                                                
                                                            <p className="coupon"><i className="fa-solid fa-couch"></i> 소멸예정일 : 
                                                                <span className='bold'> 
                                                                    {memberInfo.m_regDate && (() => {
                                                                    const d = new Date(memberInfo.m_regDate);
                                                                    d.setMonth(d.getMonth() + 1);
                                                                    return d.toLocaleDateString('sv-SE');
                                                                    })()
                                                                }</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        ):(
                                            <p className='room-empty'>보유한 쿠폰 내역이 없습니다.</p>
                                        )}
                                    </div>
                                </div>
                            </div>               
                        </section>
                    </div> 
                </div>
            </div>)
            }
            
            {/* 회원정보수정/탈퇴 */}
            {listType === 4 && 
            <div className='reserVation_text'>
                <h1 className='text_title'>회원 정보수정/탈퇴</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className='signup3_container mypage'>
                        <h2 className='signup3_info'>수정할 정보 재입력 후 수정하기 버튼을 눌러주세요</h2>
                        {/* 회원가입 form */}
                        <form className='signupForm' onSubmit={signup}>
                            {/* 이메일 */}
                            <div className='signup1'>
                                <label htmlFor="userEmail">이메일<span style={{color:'red'}}> * 수정불가</span></label>
                                <input type="email" id='userEmail' name='userEmail' placeholder='abc@naver.com' value={userMail} readOnly/>
                            </div>
                            {/* 비밀번호 */}
                            <div className='signup1'>
                                <label htmlFor="userpw_before">비밀번호 입력<span style={{color:'red'}}> * 필수입력</span></label>
                                <input type="password" id='userpw_before' name='userpw_before' placeholder='최소 8자 이상' value={userPw_before} onChange={(e) => setUserPw_before(e.target.value)} onBlur={validatePwAlert_before} />
                            </div>
                            {/* 비밀번호 */}
                            <div className='signup1'>
                                <label htmlFor="userpw">새 비밀번호<span style={{color:'red'}}> * 미변경시 입력 X</span></label>
                                <input type="password" id='userpw' name='userpw' placeholder='최소 8자 이상' value={userPw} onChange={(e) => setUserPw(e.target.value)} onBlur={validatePwAlert} />
                            </div>
                            {/* 비밀번호 확인 */}
                            <div className='signup1'>
                                <label htmlFor="pwConfirm">새 비밀번호 확인<span style={{color:'red'}}> * 미변경시 입력 X</span></label>
                                <input type="password" id='pwConfirm' name='pwConfirm' placeholder='위 비밀번호와 동일하게 입력해주세요' value={userPwConfirm} onChange={(e) => setUserPwConfirm(e.target.value)} onBlur={validatePwConfAlert} />
                            </div>
                            {/* 전화번호 */}
                            <div className='signup2'>
                                <label>전화번호<span style={{color:'red'}}> * 앞자리(010)는 고정입니다.</span></label><br/>
                                <div className='signup2_sub'>
                                    <input type='text' id='usertel' name='usertel' value='010' disabled style={{color:'black'}} maxLength="3"/> <span>-</span>
                                    <input type='text' id='usertelFront' name='usertel' placeholder='1234' value={userNumFront} onChange={(e) => setUserNumFront(e.target.value)} minLength="4" maxLength="4" /><span>-</span>
                                    <input type='text' id='usertelBack' name='usertel' placeholder='5678' value={userNumBack} onChange={(e) => setUserNumBack(e.target.value)} minLength="4" maxLength="4" />
                                </div>
                            </div>
                            {/* 생년월일 */}
                            <div className='signup2'>
                                <label>생년월일<span style={{color:'red'}}> * 필수입력</span></label><br/>
                                <div className='signup2_sub'>
                                    <input type="text" id='birth_year' name='birth' placeholder='YYYY' value={BirthYear} onChange={(e) => setBirthYear(e.target.value)} maxLength="4" /> <span>/</span>
                                    <input type="text" id='birth_month' name='birth' placeholder='MM' value={BirthMonth} onChange={(e) => setBirthMonth(e.target.value)} maxLength="2" /> <span>/</span>
                                    <input type="text" id='birth_date' name='birth' placeholder='DD' value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} maxLength="2" />
                                </div>
                            </div>
                            {/* 성별 */}
                            <div className='signup3'>
                                <p className='signup3_gender'>성별<span style={{color:'red'}}> * 필수입력</span></p>
                                <input type="radio" id='man' name='gender' value={0} checked={userGender === 0} onChange={(e) => setUserGender(Number(e.target.value))}  />
                                <label htmlFor='man'>남자</label>
                                <input type="radio" id='woman' name='gender' value={1} checked={userGender === 1} onChange={(e) => setUserGender(Number(e.target.value))} />
                                <label htmlFor='woman'>여자</label>                                
                            </div>
                            {/* 닉네임 */}
                            <div className='signup4'>
                                <label htmlFor="nickname">닉네임<span style={{color:'red'}}> * 필수입력</span></label>
                                <div style={{display:'flex'}}>
                                    <input type="text" id='nickname' name='nickname' value={nickname} onChange={nickChangeHandler} placeholder='2글자 이상 적어주세요' onBlur={validateNickNameAlert} />
                                    <button type="button" className="nicknameCheckBtn" onClick={() => {nickNameChk(); setNickChange(true);}}>중복 확인</button>
                                </div>
                            </div>
                            {/* 버튼 */}
                            <div className="buttons">
                                <button type='submit' 
                                className='signupBtn'
                                disabled={isDisabledSignup} 
                                style={{
                                    cursor: mouseCursor ? 'pointer' : 'not-allowed',
                                    backgroundColor: mouseCursor ? '#42799b' : '#e7e7e7ff',
                                    color: mouseCursor ? '#fff' : '#a5a5a5ff',
                                    border:'none'
                                    }}  >수정하기</button>
                                <button type='button'
                                onClick={deleteAccount} 
                                className='signupBtn' 
                                style={{
                                    cursor: 'pointer',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                    border:'1px solid #808080'
                                    }}  >탈퇴하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>            
            }
            
            {/* 리뷰 ------------------------------------------------------------------------------------ */}
            {isOpen && (status === 0 ? (
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
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button type="button" onClick={reviewSend} className="comBtn"
                        style={{
                            backgroundColor : star1 === false ? '#e7e7e7ff' : '#42799b',
                            color:'#fff',
                            cursor:star1 === false ? 'not-allowed' : 'pointer'
                            }}>완료</button>
                    </div>
                </div>
            
            )
            :
            (
                <div className='review_overlay'>
                    <div className='review_wrap'>
                        <p className="reviewTitle">리뷰 수정</p>
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
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button type="button" onClick={reviewMod} className="comBtn"
                        style={{
                            backgroundColor : star1 === false ? '#e7e7e7ff' : '#42799b',
                            color:'#fff',
                            cursor:star1 === false ? 'not-allowed' : 'pointer'
                            }}>완료</button>
                    </div>
                </div>
            ))}
            
            
        </div>
    )
}