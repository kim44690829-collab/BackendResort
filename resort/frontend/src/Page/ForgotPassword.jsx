import { useState } from 'react';
import axios from "axios";
import './ForgotPassword.css';

export default function ForgotPassword(){
    console.log("ForgotPassword 렌더링");
        
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const requestReset = async () => {
        if (!email) {
        alert("이메일을 입력하세요");
        return;
        }

        try {
        await axios.post("/api/request-reset", {
            email: email
        });

        setMessage("비밀번호 재설정 메일이 전송되었습니다.");
        } catch (error) {
        setMessage("존재하지 않는 이메일입니다.");
        }
    };

    return (
        <div className='passFind'>
            <h2>비밀번호 찾기</h2>

            <p className='tit'>가입한 이메일 입력</p>
            <input
                type="email"
                placeholder="abc@naver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {message && <p className='result'>{message}</p>}
            <button onClick={requestReset}>재설정 링크 보내기</button>
            <span className='red'>* 버튼을 누르신 후 5초만 기다려주시면 메시지가 뜹니다.</span>

            
        </div>
    );

}