import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard(){
    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">통계 대시보드</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회 <i class="fa-solid fa-caret-down"></i>
                                <ul className="admin_submenu">
                                <li className="a_menus">
                                    <Link to={`/adminPage` } onClick={() => window.scrollTo(0, 0)}>
                                       <span>회원 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage2` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>호텔 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage3` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>객실 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage4` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>예약 정보 조회</span>
                                    </Link>
                                </li>
                            </ul>
                            </span>
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">등록  <i class="fa-solid fa-caret-down"></i>
                                <ul className="admin_submenu">
                                    <li className="a_menus">
                                        <Link to={`/hotelinsert` } onClick={() => window.scrollTo(0, 0)}>
                                            <span>호텔 정보 등록</span>
                                        </Link>
                                    </li>
                                    <li className="a_menus">
                                        <Link to={`/roominsert`} onClick={() => window.scrollTo(0, 0)}>
                                            <span>객실 정보 등록</span> 
                                        </Link>
                                    </li>
                                    <li className="a_menus">
                                        <Link to={`/noticeinsert`} onClick={() => window.scrollTo(0, 0)}>
                                            <span>공지사항 작성</span> 
                                        </Link>
                                    </li>
                                </ul>
                            </span>                            
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">게시판 <i class="fa-solid fa-caret-down"></i>
                                <ul className="admin_submenu">
                                    <li className="a_menus">
                                        <Link to={`/adminPage5` } onClick={() => window.scrollTo(0, 0)}>
                                            <span>1대1 문의</span>
                                        </Link>
                                    </li>
                                    <li className="a_menus">
                                        <Link to={`/adminPage6`} onClick={() => window.scrollTo(0, 0)}>
                                            <span>공지사항</span> 
                                        </Link>
                                    </li>
                                    <li className="a_menus">
                                        <Link to={`/adminPage7`} onClick={() => window.scrollTo(0, 0)}>
                                            <span>리뷰</span> 
                                        </Link>
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <div className="menu_box">
                            <Link to={`/dashboard`} onClick={() => window.scrollTo(0, 0)}>
                            <span className="admin_menu">통계</span>
                            </Link>
                        </div>
                    </div>
                    <div className="admin_body">
                        <div className="g_g">
                            <div className="graph">
                                <div className="graph1">
                                    <p className="tit">
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>숙소 유형 점유율</span>
                                    </p>
                                    <img style={{width:'600px'}} src="/img/dashboard/hotelType2.png" alt="hotelType" />
                                    <div className="graybox">
                                        <p className="desc"></p>
                                        <div className="whitebox" style={{paddingBottom:'74px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                            숙소 유형별 점유율을 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                            - 전체의 숙소 중 숙소 유형의 점유율 파악
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                    </div>
                                </div>
                                <div className="graph2">
                                    <p className="tit" style={{marginBottom:'-48px'}}>
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>숙소유형별 예약 점유율</span>
                                    </p>
                                    <img style={{width:'587px'}} src="/img/dashboard/hotelResType2.png" alt="hotelResType" />
                                    <div className="graybox">
                                        <p className="desc"></p>
                                        <div className="whitebox" style={{paddingBottom:'30px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                            숙소 유형별로 사용자의 예약 점유율을 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                            - 숙소 유형별 예약 비중을 시각화하여 주요 수요가 집중된 유형을 파악<br/>
                                                            - 전체 공급 대비 예약 비율을 비교함으로써 유형별 수요-공급 불균형 &nbsp;&nbsp;및 운영 전략 수립에 활용
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="g_g">
                            <div className="graph row">
                                <div className="graph1">
                                    <p className="tit">
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>숙소유형별 선호도 순위</span>
                                    </p>
                                    <div className="row_wrap">
                                        <img style={{height:'410px'}} src="/img/dashboard/hotelResRank2.png" alt="hotelResRank" />
                                        <div className="graybox">
                                            <p className="desc"></p>
                                            <div className="whitebox" style={{paddingBottom:'30px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                            숙소 유형별 사용자의 선호도를 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                            - 인기 숙소 유형 중심 상품 구성<br/>
                                                            - 수요 예측 및 객실 관리
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="g_g">
                            <div className="graph row">
                                <div className="graph1">
                                    <p className="tit">
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>가격대별 호텔 점유율</span>
                                    </p>
                                    <div className="row_wrap">
                                        <img src="/img/dashboard/hotelPriceOccupancyRate2.png" alt="hotelPriceOccupancyRate" style={{marginTop: '-88px',marginBottom: '-93px',marginLeft: '-16px'}}/>
                                        <div className="graybox">
                                            <p className="desc"></p>
                                            <div className="whitebox" style={{paddingBottom:'30px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                            가격대별 호텔의 점유율을 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                                - 수익 극대화를 위한 가격 전략 수립<br/>
                                                                - 경쟁 호텔 대비 가격 포지셔닝 설정
                                                                {/* 3. 타겟 고객 설정
                                                                중저가 호텔을 선호하는 고객층(가성비 중시)이 주요 타겟임을 확인할 수 있어, 마케팅 방향 설정에 활용 가능합니다.

                                                                4. 상품 구성 및 투자 방향
                                                                신규 호텔 개발이나 리모델링 시 10~20만 원대 객실 비중을 확대하는 전략이 유효합니다.

                                                                5. 수익 최적화 기회
                                                                점유율이 낮은 고가 구간은 패키지 상품, 이벤트, 시즌 할인 등을 통해 수요를 끌어올릴 여지가 있습니다. */}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="g_g">
                            <div className="graph" style={{border: '1px solid #ddd',borderRadius: '36px'}}>
                                <div className="graph_wrap">
                                    <div className="graph1" style={{border:0, marginRight:0}}>
                                        <p className="tit" style={{marginBottom:'28px'}}>
                                            <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                            <span>국내 도시별 예약 선호도</span>
                                        </p>
                                        <img style={{width:'550px'}} src="/img/dashboard/koreaCityRank2.png" alt="koreaCityRank2" />
                                    </div>
                                    <div className="graph2" style={{border:0}}>
                                        <p className="tit" style={{marginBottom:'28px'}}>
                                            <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                            <span>해외 도시별 예약 선호도</span>
                                        </p>
                                        <img style={{width:'567.5px'}} src="/img/dashboard/overseasCityRank2.png" alt="overseasCityRank2" />
                                    </div>
                                </div>
                                <div className="graybox" style={{marginTop:'583px'}}>
                                        <p className="desc"></p>
                                        <div className="whitebox">
                                            <table className="txt" style={{width:'100%'}}>
                                                <tr style={{borderBottom:'1px solid #ccc', paddingBottom:'10px', lineHeight:'25px', marginBottom:'10px'}}>
                                                    <td className="graphTd1">
                                                        개요
                                                    </td>
                                                    <td className="graphTd1-1">
                                                        국내 · 해외 도시별 사용자의 예약 선호도를 나타낸 그래프
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="graphTd1">
                                                        활용
                                                    </td>
                                                    <td className="graphTd1-1" style={{paddingTop:'15px'}}>
                                                        - 예약 수가 높은 도시를 통해 현재 고객들이 선호하는 핵심 여행지를 확인<br/>
                                                        - 수요가 높은 도시는 프리미엄 상품 확대, 낮은 도시는 할인·프로모션 전략 수립<br/>
                                                        - 인기 도시에는 신규 호텔 진출을 고려, 수요가 낮은 지역은 시장성 재검토에 활용
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="g_g">
                            <div className="graph row">
                                <div className="graph1">
                                    <p className="tit">
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>호텔별 리뷰 평점 분포</span>
                                    </p>
                                    <div className="row_wrap">
                                        <img style={{height:'410px'}} src="/img/dashboard/hotelReview2.png" alt="hotelReview2" />
                                        <div className="graybox" style={{bottom:'9px'}}>
                                            <p className="desc"></p>
                                            <div className="whitebox" style={{paddingBottom:'30px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                        호텔을 평점과 리뷰수로 구분하여 산점도로 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                            - 고평점 숙소 중심 마캐팅 강화<br />
                                                            - 저평점 숙소 개선 방안 도출<br />
                                                            - 평점 기반 추천 · 노출 알고리즘 개선
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="g_g">
                            <div className="graph row">
                                <div className="graph1">
                                    <p className="tit">
                                        <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                        <span>예약시점 추이</span>
                                    </p>
                                    <div className="row_wrap">
                                        <img style={{height:'410px'}} src="/img/dashboard/leadTime2.png" alt="leadTime2" />
                                        <div className="graybox"  style={{bottom:'15px'}}>
                                            <p className="desc"></p>
                                            <div className="whitebox" style={{paddingBottom:'30px'}}>
                                                <table className="txt" style={{width:'100%'}}>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            개요
                                                        </td>
                                                    </tr>
                                                    <tr style={{display:'block', borderBottom:'1px solid #ccc', paddingBottom:'15px', lineHeight:'25px', marginBottom:'3px'}}>
                                                        <td className="graphTd2-1">
                                                            사용자의 예약 시점에 대한 추이를 기간별로 나타낸 그래프<br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="graphTd2">
                                                            활용
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td className="graphTd2-1">
                                                            - 예약 패턴 기반 수요 예측<br />
                                                            - 조기예약 · 막바지 할인 전략 수립<br />
                                                            - 객실 공급 계획 조정
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g_g">
                            <div className="graph" style={{border: '1px solid #ddd',borderRadius: '36px', width:'1230px'}}>
                                <div className="graph_wrap">
                                    <div className="graph1" style={{border:0, marginRight:0,width:'100%'}}>
                                        <p className="tit" style={{marginBottom:'28px'}}>
                                            <img src="/img/dashboard/title_icon.png" alt="title_icon" />
                                            <span>주별 예약 건수 및 매출 추이</span>
                                        </p>
                                        <img style={{width:'1100px',marginTop:'15px'}} src="/img/dashboard/Revenue2.png" alt="Revenue2" />
                                    </div>
                                </div>
                                <div className="graybox" style={{marginTop:'690px'}}>
                                        <p className="desc"></p>
                                        <div className="whitebox">
                                            <table className="txt" style={{width:'100%'}}>
                                                <tr style={{borderBottom:'1px solid #ccc', paddingBottom:'10px', lineHeight:'25px', marginBottom:'10px'}}>
                                                    <td className="graphTd1">
                                                        개요
                                                    </td>
                                                    <td className="graphTd1-1">
                                                        주간별 예약 건수와 매출을 나타낸 그래프
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="graphTd1">
                                                        활용
                                                    </td>
                                                    <td className="graphTd1-1">
                                                        - 예약 수요가 집중되는 시기에 마케팅 및 노출을 강화하여 매출을 극대화<br />
                                                        - 비수기 구간에는 프로모션 및 할인 전략을 통해 수요를 유도
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}