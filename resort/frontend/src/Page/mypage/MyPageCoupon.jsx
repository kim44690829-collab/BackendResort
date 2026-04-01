import { useState,useEffect,useContext,useRef,Fragment } from "react";
import Calendar2 from '../Calendar2';
import { ResortDataContext } from '../../Api/ResortData';
import { ModalContext } from '../Modal';
import { Link, useNavigate } from 'react-router-dom';
import '../mypage/MyPage.css'
import axios from "axios";

export default function MyPageCoupon(){
    // 03-18 -> 39번째줄, 332번째줄
    const {userEmail, MemberAllData, userNickName} = useContext(ResortDataContext);
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
    const [listType, setListType] = useState(3)

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

    // useEffect(() => {
    //     if (search) {
    //         searchClick();
    //     }
    // }, [myPage]);

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
            {/* 쿠폰 */}
            <div className='reserVation_text'>
                <h1 className='text_title'>보유 쿠폰</h1>
                <div className='reserVation_texts' style={{borderTop:'2px solid black'}}>
                    <div className="wish-wrap" onClick={()=>setCal(false)}>
                        <section className="reserVation-wrap coupon">
                            <div className="detail-content">
                                <div className="detail-left"> 
                                     {/* ref={triggerRef}                       */}
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
            </div>
        </div>
    )
}