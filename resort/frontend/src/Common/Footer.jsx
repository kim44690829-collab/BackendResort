import '../Common/Footer.css';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const navigate = useNavigate();
    const {setHeaderChange, setCustomer} = useContext(ResortDataContext);

    const footerLogoBtn = () => {
        setHeaderChange(0);
        setCustomer('');
        navigate('/');
        window.scrollTo(0,0);
    }

    return(
        // 푸터
        <div className="footer_container">
            <div className="footerInfo">
                <div className="footer_link">
                    {/* 메인로고 */}
                    <div className="footer_logo">
                        <img src="/footerLogo2.png" alt="EcoStay 홈으로 바로가기" style={{width:'auto', height:'50px', cursor:'pointer'}} className="mainLogo" onClick={footerLogoBtn} />
                    </div>
                    {/* sns */}
                    <div className="footer_sns">
                        <button type="button" className='youtube_btn'>
                            <i className="fa-brands fa-youtube"></i>
                        </button>
                        <button type="button" className='instar_btn'>
                            <i className="bi bi-instagram"></i>
                        </button>
                    </div>
                </div>
                {/* 회사 소개 */}
                <div className='companyInfoSection'>
                    <p className='companyInfo'>
                        (주)EcoStay <br/>
                        주소 : 서울특별시 환상구 몽환로 123, 5층 (가상동 999-1) | 대표이사 : 김그린 | 사업자 등록번호 : 000-00-00000 
                        <Link to='/' style={{color:'#fff', marginLeft:'20px'}}>사업자정보확인</Link> <br/>
                        전자우편주소 : eco@ecostay-travel.com | 통신판매번호 : 2999-서울환상-0000 | 관광사업자 등록번호 : 제 99999-1004호 | 전화번호 : 9999-9999 | 호스팅서비스제공자의 상호표시 : (주)EcoStay<br/>
                        (주)EcoStay는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
                    </p>
                </div>
                
            </div>
        </div>
    )
}