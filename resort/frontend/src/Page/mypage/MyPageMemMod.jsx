import { useState,useEffect,useContext,useRef,Fragment } from "react";
import Calendar2 from '../Calendar2';
import { ResortDataContext } from '../../Api/ResortData';
import { ModalContext } from '../Modal';
import { Link, useNavigate } from 'react-router-dom';
import '../mypage/MyPage.css'
import axios from "axios";

export default function MyPageMemMod(){
    // 03-18 -> 39번째줄, 332번째줄
    const {userEmail,loginSave,logout,setHeaderChange, userNickName} = useContext(ResortDataContext);

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

    const [nickChange, setNickChange] = useState(true);

    // 왼쪽 리스트 클릭시 컨텐츠 전환
    const [listType, setListType] = useState(4)

    const nickChangeHandler = (e) => {
        setNickname(e.target.value)
        setChangeNick(e.target.value)
        setNickChange(false)
    }

    useEffect(() => {    
        if (!userEmail) return;

        fetchMyPage(); //마이페이지 DB전체호출
        fetchMyInfo(); //회원정보 DB호출
        
    },[userEmail])
    

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

    //검색버튼 클릭여부
    const [search, setSearch] = useState(false);

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
            {/* 회원정보수정/탈퇴 */}
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
        </div>
    )
}