import '../Common/Login.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

export default function Login(){
    // 공유 데이터 //
    const {loginSave, setHeaderChange} = useContext(ResortDataContext)
    const navigate = useNavigate();

    // 이메일, 비밀번호 저장 상태변수
    // 아이디 저장 쿠키
    const [emailInput, setEmailInput] = useState(cookie.get('emailInput') || '');
    const [pwInput, setPwInput] = useState('')

    // 아이디 저장 체크박스가 체크되면 => true 아니면 false
    const saveId = cookie.get('emailInput');
    const [emailChk, setEmailChk] = useState(saveId ? true : false);
    
    // 조건을 만족하지 않으면 버튼 비활성회
    const [isDisabledLogin, setIsDisabledLogin] = useState(true);
    // 마우스 변경
    const [mouseCursor, setMouseCursor] = useState(false);
    
    // 비밀번호 찾기 모달
    const [pwModal, setPwModal] = useState(false);
    // 비밀번호 찾기 위한 email, phone
    const [findEmail, setFindEmail] = useState('');
    const [findPhone, setFindPhone] = useState('');
    const [newPw, setNewPw] = useState('');

    // php
    const login = (e) => {
        e.preventDefault();
        axios.post('/api/member/login',{m_email:emailInput,m_pw:pwInput})
         .then((res) => {
            if(res.data && res.data.m_nickName){
                loginSave(res.data.m_nickName,res.data.m_email);
                console.log("$$$$$$$$$" ,res.data);
                if(res.data.m_email !== 'admin@resort.com'){
                    alert(`${res.data.m_nickName}님 환영합니다.`);
                }
                navigate('/');
                setEmailInput('');
                setPwInput('');                
            }else{
                //로그인 실패
                alert("이메일 혹은 비밀번호를 다시 확인해주세요.");
            }
        })
        .catch((error) => {
            console.error("error", error)
        })

        if(emailChk){
            const oneMinute = new Date(Date.now() + 1*60*1000);
            cookie.set('emailInput',emailInput,{expires:oneMinute,path:'/'})
        }else{
            // 이메일 저장 체크를 하지 않으면 cookie삭제
            cookie.remove('emailInput',{path:'/'})
        }
    }

    //이메일 저장 체크박스 핸들러
    const emailChkHandeler = (e) => {
        setEmailChk(e.target.checked);
    }

    // 이메일, 비밀번호 onchange
    const emailHandeler = (e) => {
        const emailValue = e.target.value
        setEmailInput(emailValue)
    }
    const pwHandeler = (e) => {
        const pwValue = e.target.value
        setPwInput(pwValue)
    }

    // 로그인 조건
    useEffect(() => {
        const pwCondition = pwInput.length > 7;

        if( emailInput.includes('@') && (emailInput.includes('.com') || emailInput.includes('.net')) && pwCondition){
            setIsDisabledLogin(false)
            setMouseCursor(true)
        }else{
            setIsDisabledLogin(true)
            setMouseCursor(false)
        }
    },[emailInput, pwInput])

    return(
        <div className="Login_container">
            <h2 className='Login_title'>이메일로 시작하기</h2>
            <form onSubmit={login}>
                <div className='login_form'>
                    {/* 이메일 */}
                    <label htmlFor="userEmail">
                        이메일<span style={{color:'red'}}>*</span>
                    </label>
                    <input type="email" 
                    id="userEmail" 
                    name="userEmail" 
                    placeholder='abc@naver.com'
                    value={emailInput}
                    onChange={emailHandeler}
                    />
                    {/* 비밀번호 */}
                    <label htmlFor="userPw">
                        비밀번호<span style={{color:'red'}}>*</span>
                    </label>
                    <input type="password" 
                    id="userPw" 
                    name="userPw" 
                    placeholder='비밀번호를 입력하세요'
                    value={pwInput}
                    onChange={pwHandeler}
                    />
                    <div className='remember'>
                        {/* 이메일 저장(쿠키) */}
                        <div className='remember_left'>
                            <input type="checkbox" id="rememberMail" name='rememberMail' onChange={emailChkHandeler} />
                            <label htmlFor="rememberMail">이메일 저장</label>
                        </div>
                        <button type="button" className='remember_right' onClick={() => navigate("/forgot-password")}>비밀번호 찾기</button>
                    </div>
                    <button type="submit"
                     className='LoginBtn' 
                     disabled={isDisabledLogin}
                     style={{
                        cursor: mouseCursor ? 'pointer' : 'not-allowed',
                        backgroundColor: mouseCursor ? '#42799b' : '#e7e7e7ff',
                        color: mouseCursor ? '#fff' : '#a5a5a5ff',
                        border:'none'
                     }}
                     >로그인</button>
                </div>
            </form>
            <div className='SignUpGo'>
                {/* 회원가입 폼으로 이동 */}
                <p>계정이 없으신가요?</p>
                <Link to='/signup1'>
                    <button type="button" className='EmailSignUp' onClick={() => setHeaderChange(3)}>이메일로 회원가입</button>
                </Link>
            </div>
        </div>
    )
}