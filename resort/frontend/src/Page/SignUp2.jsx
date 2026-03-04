import '../Page/SignUp2.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ResortDataContext } from '../Api/ResortData';

export default function SignUp2(){
    // 가져오는 유저 핸드폰 데이터 
    const {userNumFront, setUserNumFront, userNumBack, setUserNumBack} = useContext(ResortDataContext);
    // 휴대폰 인증번호 전송 버튼 클릭 후 인증번호 나타나게하는 상태변수
    const [phoneVerificationCode, setPhoneVerificationCode] = useState(false);
    // 휴대폰 번호를 작성해야 인증번호 전송 버튼을 활성화하는 상태변수
    const [phoneNum, setPhoneNum] = useState(true);
    // 인증번호 상태변수
    const [VerificationCode, setVerificationCode] = useState('');
    // 버튼 비활성화
    const [isDisabled, setIsDisabled] = useState(true);
    
    // 마우스 변경
    const [mouseCursor1, setMouseCursor1] = useState(false);
    const [mouseCursor2, setMouseCursor2] = useState(false);

    // 버튼을 활성화 하기 위한 조건
    useEffect(() => {
        if(userNumFront.length === 4 && userNumBack.length === 4){
            setPhoneNum(false)
            setMouseCursor2(true)
        }else{
            setPhoneNum(true)
            setMouseCursor2(false)
        }
    },[userNumFront, userNumBack])
    

    // 휴대폰 인증번호 전송버튼 클릭시 true로 변경하며 인증번호 input이 나타남
    const telBtnHandeler = () => {
        setPhoneVerificationCode(true);
    }

    // 인증번호가 if문에 만족하면 버튼 활성화
    const VerificationCodeHandeler = (e) => {
        const value = e.target.value;
        setVerificationCode(value)
        
        if(value === '1111' || value === '2222' || value === '3333' || value === '5555' || value === '6666' || value === '1234'){
            setIsDisabled(false)
            setMouseCursor1(true)
        }else{
            setIsDisabled(true)
            setMouseCursor1(false)
        }
    }



    return(
        <div className='signup2_container'>
            <h1 className='signup2_title'>휴대폰 인증 </h1>
            {/* 휴대폰 번호 form */}
            <form className='tel_form'>
                <label>
                    휴대폰 번호<span style={{color:'red'}}>*</span></label>
                <div className='userPhone'>
                    <input type='text' id='usertel' name='usertel' value='010' disabled style={{color:'black'}} maxLength="3"/> <span>-</span>
                    <input type='text' id='usertelFront' name='usertel' placeholder='1234' value={userNumFront} onChange={(e) => setUserNumFront(e.target.value)} maxLength="4" /><span>-</span>
                    <input type='text' id='usertelBack' name='usertel' placeholder='5678' value={userNumBack} onChange={(e) => setUserNumBack(e.target.value)} maxLength="4" />
                </div>
                {/* 휴대폰 번호를 입력하면 나타나는 인증번호 코드 */}
                {phoneVerificationCode &&
                <>
                    <label htmlFor="smsCode">
                        인증번호<span style={{color:'red'}}>*</span></label>
                    <input type='text' id='smsCode' name='smsCode' placeholder='인증번호 4자리' value={VerificationCode} onChange={VerificationCodeHandeler} />
                </>
                }
                {/* 휴대폰번호, 인증번호 등의 버튼 */}
                {phoneVerificationCode ?
                <Link to='/signup3'>
                    <button type='button' 
                    className='telBtn' 
                    disabled={isDisabled} 
                    style={{
                        cursor: mouseCursor1 ? 'pointer' : 'not-allowed',
                        backgroundColor: mouseCursor1 ? '#42799b' : '#e7e7e7ff',
                        color: mouseCursor1 ? '#fff' : '#a5a5a5ff',
                        border:'none'
                        }}>확인</button>
                </Link>
                : 
                <button type='submit' 
                className='telBtn' 
                onClick={telBtnHandeler} 
                disabled={phoneNum} 
                style={{
                    cursor: mouseCursor2 ? 'pointer' : 'not-allowed',
                    backgroundColor: mouseCursor2 ? '#42799b' : '#e7e7e7ff',
                    color: mouseCursor2 ? '#fff' : '#a5a5a5ff',
                    border:'none'
                    }} >인증번호 전송</button>}
                <p style={{color:'red'}}>* 임시 인증번호 : 1111</p>
            </form>
        </div>
    )
}