import { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams,useNavigate } from 'react-router-dom';
import './ResetPassword.css';

export default function ResetPassword(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
        setMessage("잘못된 접근입니다.");
        }
    }, [token]);

    const changePassword = async () => {

        if (!newPassword) {
        alert("새 비밀번호를 입력하세요");
        return;
        }

        try {
        await axios.post("/api/reset-password", {
            token: token,
            newPassword: newPassword
        });

        alert("비밀번호가 변경되었습니다.");
        navigate("/login");

        } catch (error) {
        setMessage("토큰이 만료되었거나 유효하지 않습니다.");
        }
    };
//
    return (
        <div className='resetPass'>
            <h2>새 비밀번호 설정</h2>

            <input
                type="password"
                placeholder="새 비밀번호 입력"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={changePassword}>비밀번호 변경</button>

            {message && <p>{message}</p>}
        </div>
    );
}