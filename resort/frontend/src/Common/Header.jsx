import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link,useLocation  } from "react-router-dom";
import '../Common/Header.css';
import { useContext } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { useNavigate } from 'react-router-dom';
import { useClickAway } from 'react-use';

export default function Header(){
    const navigate = useNavigate();
    const {userNickName, setGuestCount, userEmail,setUserEmail,setUserNickName, headerChange, setHeaderChange, setCustomer, setTown, setListType} = useContext(ResortDataContext);
    // const [headerChange, setHeaderChange] = useState(0);
    // 헤더 메뉴바 모달
    // useRef, useClickAway 를 사용하기 전 npm install react-use 를 해야 함.
    // 모달 on / off 는 원래 useState쓰는대로 사용하면 된다.
    // useRef는 무조건 null 상태, null은 현재 위치를 지정하지 않았다는 의미
    // useClickAway를 통해 menuRef를 가져다 놓았을때 setMenuModal(false) 를 실행하겠다는 의미
    // ref={menuRef} 를 모달 안 제일 큰 박스에 넣어두면 menuRef의 위치가 모달로 변경됨.

    const [menuModal, setMenuModal] = useState(false);
    const menuRef = useRef(null);

    useClickAway(menuRef,  () => {
        setMenuModal(false);
    })

    // 로그아웃용 함수
    // const logoutHandeler = () => {
    //     logout();
    //     alert('로그아웃 되었습니다.');
    //     navigate('/');
    //     setCustomer('');
    //     setHeaderChange(0);
    //     setDetail({});
    //     setDetailBoard(false);
    //     setBoardList([]);
    // }
    const [a,setA] =useState(false);
    useEffect(() => {
        console.log('aaaaaaaaaaaaaaa');
    }, [a]);

    const logoutHandeler = async () => {
        try {
            await axios.get('/api/member/logout', { withCredentials: true });

            sessionStorage.clear();

            setUserNickName(null);
            setUserEmail(null);
            setCustomer('');
            setHeaderChange(0);
            setTown('');
            navigate('/', { replace: true });

        } catch (err) {
            console.error(err);
        }
        setA(!a);
    }

    // 컴포넌트 이동시 모달 닫기
    const location = useLocation();

    useEffect(() => {
        setMenuModal(false);
    }, [location.pathname]);

    // 헤더 변경 함수
    const headChangeHandeler = (num) => {
        if(num === 1){
            setHeaderChange(0);
            setGuestCount(1);
            setCustomer('');
            navigate('/');
        }else if(num === 2){
            setHeaderChange(1); 
            setCustomer('');
            navigate('/guest')
        }else if(num === 3){
            setHeaderChange(2);
            setCustomer('');
            navigate('/login')
        }else{
            setHeaderChange(3);
            setCustomer('');
            navigate('/signup1')
        }
        window.scrollTo(0,0);
    }

    // 메뉴 클릭시 모달 닫힘, 컴포넌트 이동
    const menuModalHandeler = (num) => {
        if(num === 1){
            setMenuModal(false);
            setHeaderChange(0);
            setCustomer('');
            navigate('/hotelSection')
        }else if(num === 2){
            setMenuModal(false);
            setHeaderChange(0);
            setCustomer('');
            navigate('/hotelSection2')
        }else if(num === 3){
            setMenuModal(false);
            setHeaderChange(0);
            setCustomer('');
            navigate('/wish')
        }else if(num === 4){
            setMenuModal(false);
            setHeaderChange(0);
            setListType(1)
            setCustomer('');
            navigate('/helpCenter')
        }else if(num === 5){
            setMenuModal(false);
            setHeaderChange(0);
            setCustomer('');
            navigate('/adminPage')
        }else{
            setMenuModal(false);
            setHeaderChange(0);
            setCustomer('');
            navigate('/myPageRes')
        }

        window.scrollTo(0,0)
    }


    return(
        <div className="Header_container">
            {/* 누르면 메인 페이지로 이동하는 로고 */}
                <img src="/mainlogo2.jpg" alt="EcoStay 홈으로 바로가기" style={{width:'auto', height:'50px', cursor:'pointer'}} className="mainLogo" onClick={() => headChangeHandeler(1)} />
            {/* 로그인 전 헤더 */}
            {!userNickName ? 
            <ul className="Header_right">
                {/* 비회원 예약조회 */}
                {headerChange !== 1 && 
                <li className="menu_list">
                        <button type="button" className="HeaderBtn" onClick={() => headChangeHandeler(2)}>
                            비회원 예약조회
                        </button>
                </li>}
                {/* 로그인 */}
                {headerChange !== 2 && 
                    <li className="menu_list" >
                            <button type="button" className="HeaderBtn" onClick={() => headChangeHandeler(3)}>
                                로그인
                            </button>
                    </li>
                }
                {/* 회원가입 */}
                {headerChange !== 3 && 
                    <li className="menu_list" >
                            <button type="button" className="HeaderBtn" onClick={() => headChangeHandeler(4)}>
                                회원가입
                            </button>
                    </li>
                }
                <li className="menu_list menu_btn">
                    {/* 메뉴 */}
                    {/* onMouseDown : 마우스가 눌리는 순간 발생 (1)
                        onMouseUp : 마우스를 눌렀다가 떼는 순간 발생 (2)
                        onClick : 마우스를 눌렀다가 뗀 이후에 발생 (3)
                    */}
                    {/* stopPropagation : 이벤트의 버블링을 막는 함수  / 이 함수를 쓴 것과 동일한 형태의 이벤트에만 적용
                        필요한 이유 : 현재 onClick이 발생하는 순서 
                        mousedown
                        button
                        → header
                        → body
                            → document  ← useClickAway 실행 -> false로 바뀌어서 모달이 닫힘
                        mouseup
                        click
                        button ← onClick 실행 -> true로 다시 바뀌어서 모달이 다시 열림

                        stopPropagation를 사용했을땐 mouseDown의 button에서 부모로 전파되지 못함.
                        그 이후 mouseup실행, click실행 -> 모달 false로 바뀜.
                    */}
                    <button type="button" className="HeaderBtn" 
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setMenuModal(!menuModal)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </li>
            </ul>
            :
            userEmail === 'admin@resort.com' ? (
            // 관리자 로그인 후 헤더
            <ul className="Header_right2">
                <li className="menu_list2" style={{marginRight:'15px'}}>
                    <span className="login_nickName">관리자</span>님</li>
                <li className="menu_list2">
                    <button type='button' onClick={logoutHandeler} className="HeaderBtn logoutBtn">로그아웃</button>
                </li>
                <li className="menu_list2 menu_btn">
                    {/* 메뉴 */}
                    <button type="button" className="HeaderBtn"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setMenuModal((prev) => !prev)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </li>
            </ul>
            ):(
                //일반 회원 로그인 후 헤더
                <ul className="Header_right2">
                    <li className="menu_list2" style={{marginRight:'15px'}}>
                        <span className="login_nickName">{userNickName}</span>님</li>
                    <li className="menu_list2">
                        <button type='button' onClick={logoutHandeler} className="HeaderBtn logoutBtn">로그아웃</button>
                    </li>
                    <li className="menu_list2 menu_btn">
                        {/* 메뉴 */}
                        <button type="button" className="HeaderBtn"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => setMenuModal((prev) => !prev)}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </li>
                </ul>
            )}
            {menuModal && 
                <>
                    <ul className="menus" ref={menuRef}>
                        {!userNickName ? null //로그인 X
                        //관리자
                        : userEmail === 'admin@resort.com' ?
                            <li className="menus_sub">
                                <button type="button" className="domestic-hotels" onClick={() => menuModalHandeler(5)}>관리자페이지</button>
                            </li>
                        : //회원 로그인
                            <li className="menus_sub">
                                <button type="button" className="domestic-hotels" onClick={() => menuModalHandeler(6)}>마이페이지</button>
                            </li>
                        }
                        <li className="menus_sub">
                            <button type="button" className="domestic-hotels" onClick={() => menuModalHandeler(1)}>국내숙소</button>
                        </li>
                        <li className="menus_sub">
                            <button type="button" className="international-hotels" onClick={() => menuModalHandeler(2)}>해외숙소</button>
                        </li>
                        <li className="menus_sub">
                            <button type="button" className="wishList_menu" onClick={() => menuModalHandeler(3)}>찜목록</button>
                        </li>
                        <li className="menus_sub">
                            <button type="button" className="support-center" onClick={() => menuModalHandeler(4)}>고객센터</button>
                        </li>
                    </ul>
                </>
            }
        </div>
    )
}