import '../Page/SignUp3.css';
import { useState, useEffect, useContext, use } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp3(){
    const navigate = useNavigate();
    //
    // 핸드폰 데이터 3개 합친 변수
    const {userNumFront, setUserNumFront, userNumBack, setUserNumBack, setHeaderChange, userNickName, /* nickname, setNickname */ setRender, render} = useContext(ResortDataContext);
    // 회원가입 form에 들어가는 상태변수
    // 이메일
    const [userMail, setUserMail] = useState('');
    // 비밀번호
    const [userPw, setUserPw] = useState('');
    // 비밀번호 확인
    const [userPwConfirm, setUserPwConfirm] = useState('');
    // 생일
    const [BirthYear, setBirthYear] = useState('');
    const [BirthMonth, setBirthMonth] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    
    // 성별
    const [userGender, setUserGender ] = useState('');

    const [nickname, setNickname] = useState('');

    // 마우스 변경
    const [mouseCursor, setMouseCursor] = useState(false);

    // 회원가입 폼에서 조건을 만족하지 못했을때 확인버튼 비활성화
    const [isDisabledSignup, setIsDisabledSignup] = useState(true);
    // 회원가입 폼의 모든 작성이 종료된 후 확인버튼 클릭시 모달
    const [signupModalOpen, setSignupModalOpen] = useState(false);

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

    //회원가입 버튼 클릭시 실행되는 핸들러 함수 
    const signup = (e) => {
        e.preventDefault();
        //가입정보 전송
        axios.post('/api/member/insert',{m_email:userMail,m_pw:userPw,m_gender:userGender,m_nickName:nickname,
            m_phone:'010'+userNumFront+userNumBack,
            m_birth: `${BirthYear}-${BirthMonth.padStart(2,'0')}-${BirthDate.padStart(2,'0')}`
        })
        .then((res) => {
            if(res.data === 1){
                setSignupModalOpen(!signupModalOpen);
                setHeaderChange(0);
                setUserNumFront('');
                setUserNumBack('');
            }else if(res.data === 0){
                alert('회원가입 실패');
            }else if(res.data === -1){
                alert('이미 가입된 번호가 있습니다.');
                navigate('/SignUp2');
            }else if(res.data === -2){
                alert('이미 가입한 이메일이 있습니다.');               
            }else{
                alert('이미 가입한 닉네임이 있습니다.');               
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    // 회원가입 종료 후 모달 핸들러
    const modalHandeler = () => {
        setSignupModalOpen(!signupModalOpen);
        navigate('/');
        setHeaderChange(0);
    }

    // 이메일 형식
    // / ~~~ / => 시작과 끝 (이 안에 정규식이 들어갈겁니다.)
    // ^ => 문자열이 시작됩니다.
    // [] : 문자 집합 / ^ (대괄호 안) : 부정(not) / \s : 공백 (스페이스, 탭 등) / @ : 골뱅이 / + : 1글자 이상
    // [^\s@]+ => 공백과 골뱅이를 제외한 문자 집합 한글자 이상
    // @ => 아이디 @ 도메인 구분자
    // \. => .
    // \를 사용하는 이유 => 정규식에서 .은 정말 아무문자나 상관없다는 뜻으로 a~z 1~9 @ 등의 특수기호 스페이스바까지 다 들어갈수있음
    // \를 사용해서 특수한 의미의 .을 문자 그대로의 .으로 바꾸는 것
    // {2,} => 2글자 이상

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

    // 회원가입 시 버튼 활성화 조건
    useEffect(() => {
        if(
            isValidEmail &&
            isAllowedDomain &&
            userPw.length >= 8 && 
            userPwConfirm === userPw && 
            BirthYear.length >= 4 && 
            (1 <= m && m <= 12) &&
            (1 <= d && d <= 31) &&
            userGender !== '' &&
            (nickname.length >= 2 && nickname.length <= 20)
        ){
                setIsDisabledSignup(false)
                setMouseCursor(true)
            }else{
                setIsDisabledSignup(true)
                setMouseCursor(false)
            }
    }, [userMail, userPw, userPwConfirm, BirthYear, BirthMonth, BirthDate, userGender, nickname])

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const validateMailAlert = () => {
        if (!userMail) return;
        if(!isValidEmail){
            alert('aaaa@naver.com과 같은 형식으로 입력해주세요')
            return;
        }
        if(!isAllowedDomain){
            alert('naver.com, gmail.com과 같은 도메인 주소로 입력해주세요')
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

    return(
        <div className='signup3_container'>
            <h1 className='signup3_title'>필수 정보 입력</h1>
            <h2 className='signup3_info'>가입을 위해 필수 정보를 입력해주세요</h2>
            {/* 회원가입 form */}
            <form className='signupForm' onSubmit={signup}>
                {/* 이메일 */}
                <div className='signup1'>
                    <label htmlFor="userEmail">이메일<span style={{color:'red'}}>*</span></label>
                    <input type="email" id='userEmail' name='userEmail' placeholder='abc@naver.com' value={userMail} onChange={(e) => setUserMail(e.target.value)} onBlur={validateMailAlert}/>
                </div>
                {/* 비밀번호 */}
                <div className='signup1'>
                    <label htmlFor="userpw">비밀번호<span style={{color:'red'}}>*</span></label>
                    <input type="password" id='userpw' name='userpw' placeholder='최소 8자 이상' value={userPw} onChange={(e) => setUserPw(e.target.value)} onBlur={validatePwAlert} />
                </div>
                {/* 비밀번호 확인 */}
                <div className='signup1'>
                    <label htmlFor="pwConfirm">비밀번호 확인<span style={{color:'red'}}>*</span></label>
                    <input type="password" id='pwConfirm' name='pwConfirm' placeholder='위 비밀번호와 동일하게 입력해주세요' value={userPwConfirm} onChange={(e) => setUserPwConfirm(e.target.value)} onBlur={validatePwConfAlert} />
                </div>
                {/* 생년월일 */}
                <div className='signup2'>
                    <label>생년월일<span style={{color:'red'}}>*</span></label><br/>
                    <div className='signup2_sub'>
                        <input type="text" id='birth_year' name='birth' placeholder='YYYY' value={BirthYear} onChange={(e) => setBirthYear(e.target.value)} maxLength="4" /> <span>/</span>
                        <input type="text" id='birth_month' name='birth' placeholder='MM' value={BirthMonth} onChange={(e) => setBirthMonth(e.target.value)} maxLength="2" /> <span>/</span>
                        <input type="text" id='birth_date' name='birth' placeholder='DD' value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} maxLength="2" />
                    </div>
                </div>
                {/* 성별 */}
                <div className='signup3'>
                    <p className='signup3_gender'>성별<span style={{color:'red'}}>*</span></p>
                    <input type="radio" id='man' name='gender' value="0" checked={userGender === '0'} onChange={(e) => setUserGender(e.target.value)}  />
                    <label htmlFor='man'>남자</label>
                    <input type="radio" id='woman' name='gender' value="1" checked={userGender === '1'} onChange={(e) => setUserGender(e.target.value)} />
                    <label htmlFor='woman'>여자</label>
                </div>
                {/* 닉네임 */}
                <div className='signup4'>
                    <label htmlFor="nickname">닉네임<span style={{color:'red'}}>*</span></label>
                    <input type="text" id='nickname' name='nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='2글자 이상 적어주세요' onBlur={validateNickNameAlert} style={{width:'500px'}}/>
                </div>
                {/* 버튼 */}
                <button type='submit' 
                className='signupBtn' 
                disabled={isDisabledSignup} 
                style={{
                    cursor: mouseCursor ? 'pointer' : 'not-allowed',
                    backgroundColor: mouseCursor ? '#42799b' : '#e7e7e7ff',
                    color: mouseCursor ? '#fff' : '#a5a5a5ff',
                    border:'none'
                    }}  >확인</button>
            </form>
            {/* 회원가입 종료 후 모달 */}
            {signupModalOpen && 
            <>
                <div className='overlay'></div>
                <div className='signupModal'>
                    {/* <img src='/mainlogo.png' alt='mainlogo' className='logomodal' /> */}
                    <h1>회원가입이 완료되었습니다!</h1>
                    <p className='p1'>{nickname}님 EcoStay로 오신걸 환영합니다!</p>
                    <img src='/coupon.png' alt='couponImg' className='coupon' />
                    <p className='couponDate'><span style={{fontWeight:'700'}}>유효기간 :</span> ~{year}.{month+1}.{date}까지</p>
                    {/* <p className='couponDate'>오늘({year}.{month}.{date})부터 <span style={{color:'red', fontSize:'20px', fontWeight:'600'}}>‘한달’동안</span> 사용하실 수 있습니다!</p> */}
                    <button type='button' 
                    onClick={() => {modalHandeler(); setRender(!render)}} 
                    style={{color:'#fff', backgroundColor:'#42799b', border:'none', cursor:'pointer'}}
                    className='signupModalBtn'>홈으로</button>
                </div> 
            </>
            }
        </div>
    )
}