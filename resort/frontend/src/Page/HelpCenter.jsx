import '../Page/HelpCenter.css'
import { useState } from 'react';

export default function HelpCenter(){
    // 왼쪽 리스트 클릭시 컨텐츠 전환
    const [listType, setListType] = useState(1)

    // caret 버튼 클릭시 자주 묻는 질문 나타나게 하는 상태변수
        const [isContent1, setIsContent1] = useState(false);
        const [isContent2, setIsContent2] = useState(false);
        const [isContent3, setIsContent3] = useState(false);
        const [isContent4, setIsContent4] = useState(false);
        const [isContent5, setIsContent5] = useState(false);
        const [isContent6, setIsContent6] = useState(false);

    // caret 버튼 클릭시 자주 묻는 질문 나타나게 하는 상태변수
        const [isName1, setIsName1] = useState(false);
        const [isName2, setIsName2] = useState(false);
        const [isName3, setIsName3] = useState(false);
        const [isName4, setIsName4] = useState(false);
        const [isName5, setIsName5] = useState(false);
        const [isName6, setIsName6] = useState(false);

    // // caret 버튼 클릭시 자주 묻는 질문을 나타나게 하는 함수
    const contentHandeler1 = () => {
        setIsContent1(!isContent1);
        setIsName1(!isName1);
    }
    const contentHandeler2 = () => {
        setIsContent2(!isContent2);
        setIsName2(!isName2);
    }
    const contentHandeler3 = () => {
        setIsContent3(!isContent3);
        setIsName3(!isName3);
    }
    const contentHandeler4 = () => {
        setIsContent4(!isContent4);
        setIsName4(!isName4);
    }
    const contentHandeler5 = () => {
        setIsContent5(!isContent5);
        setIsName5(!isName5);
    }
    const contentHandeler6 = () => {
        setIsContent6(!isContent6);
        setIsName6(!isName6);
    }

    // 공지사항 목록보기 버튼
    const noticeBtnHandeler = () => {
        setListType(2);
    }

    return(
        <div className="helpCenter_container">
            {/* 왼쪽 메뉴 */}
            <div className='helpCenter_list'>
                <ul>
                    <li className='list_title'>고객센터</li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(1)} style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                            자주 찾는 질문
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(2)} style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                            공지사항
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => setListType(8)} style={{fontWeight: listType === 8 ? 'bold' : 'normal'}}>
                            1 대 1 문의
                        </button>
                    </li>
                </ul>
            </div>
            {/* 자주찾는 질문 */}
            {listType === 1 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>자주 찾는 질문</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <div>
                        <p onClick={contentHandeler1} style={{cursor:'pointer'}}>Q. [숙소] 예약을 취소하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName1 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler1}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                <p className='text_contents'
                style={{height:isContent1 ? '250px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease', 
                        padding:'0'
                    }}>
                    <br/> A. 예약 취소는 EcoStay앱 또는 웹의 ‘내 정보 → 예약/구매 내역’에서 직접 진행하실 수 있습니다. <br/>

                    취소 및 환불은 예약·결제 시 안내된 취소/환불 규정에 따라 처리되며, <br/>
                    취소 수수료가 발생하는 경우 해당 금액을 제외한 금액이 환불됩니다.<br/>

                    일부 숙소의 경우 앱에서 취소가 제한될 수 있으며, <br/>
                    이 경우 고객센터를 통해 취소 요청을 해주시기 바랍니다. 
                </p>

                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler2} style={{cursor:'pointer'}}>Q. [공통] 천재지변 또는 감염병으로 예약을 취소해야 할 경우 어떻게 하나요?</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName2 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler2}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>

                <div className='text_contents' style={{
                        height:isContent2 ? '250px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        padding:'0'
                }}>
                    <br/> A. 기상 악화, 감염병 확산 등 불가항력적인 사유로 숙소 이용이 어려운 경우, <br/>
                    고객센터로 예약 내역과 증빙 서류를 접수해 주시면 확인 후 취소 가능 여부를 안내드립니다. <br/>

                    다만, 당사는 숙소와 고객을 연결하는 중개 플랫폼으로, <br/>
                    취소 및 환불 여부는 각 숙소의 운영 정책에 따라 결정됩니다. <br/>
                    상황에 따라 취소 수수료가 발생하거나 취소가 제한될 수 있는 점 양해 부탁드립니다. 
                </div>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler3} style={{cursor:'pointer'}}>Q. [숙소] 예약 대기 중인 예약을 취소하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName3 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler3}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <p className='text_contents' style={{
                        height:isContent3 ? '170px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        padding:'0'
                }}>
                    <br/> A. 예약이 대기 상태인 경우, <br/>
                    고객센터를 통해 예약 취소 요청을 해주시기 바랍니다. <br/>

                    다만, 예약이 확정된 이후에는 <br/>
                    숙소의 취소 규정에 따라 취소 수수료가 발생하거나 취소가 제한될 수 있습니다.
                </p>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler4} style={{cursor:'pointer'}}>Q. [숙소] 체크인 날짜 또는 객실 타입을 변경하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName4 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler4}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <p className='text_contents' style={{
                        height:isContent4 ? '250px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        padding:'0'
                }}>
                   <br/>  A. 예약 결제가 완료된 이후에는 체크인 날짜 및 객실 타입 변경이 불가능합니다. <br/>

                    변경이 필요한 경우, <br/>
                    예약 취소 및 환불 규정에 따라 기존 예약을 취소한 후 재예약해 주셔야 합니다.<br/>
                    예약 취소가 가능한 기간이라면 취소 후 재결제하여 이용해 주시기 바랍니다.<br/>

                    만약 취소가 어렵거나 취소 수수료가 발생하는 경우에는<br/>
                    고객센터로 문의해 주시면 안내해 드리겠습니다.
                </p>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler5} style={{cursor:'pointer'}}>Q. [공통] 현금영수증을 발급받고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName5 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler5}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <div className='text_contents' style={{
                        height:isContent5 ? '500px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        padding:'0'
                }}>
                    <br/>A. 현금영수증은 현금성 결제 수단으로 결제한 경우에 한해 발급이 가능합니다.<br/>

                    결제 과정에서 현금영수증을 신청하신 경우 자동으로 발급되며,<br/>
                    신청을 누락했거나 발급 내역이 확인되지 않는 경우에는<br/>
                    각 결제 수단별 발급 경로를 통해 확인해 주시기 바랍니다.<br/><br/>

                    <div className='contents5'>
                    [결제 수단별 발급 안내] <br/><br/>

                        네이버페이 <br/>

                        결제 단계에서 현금영수증 신청 시 자동 발급<br/>

                        자진 발급: 네이버페이 → 결제내역 → 주문 상세 → 영수증 발급 내역 확인<br/><br/>

                        간편계좌이체 (TOSS / PAYCO)<br/>

                        결제 단계에서 현금영수증 신청 시 자동 발급<br/>

                        신청 누락 시 고객센터를 통해 문의해 주세요<br/><br/>

                        카카오페이<br/>

                        카카오페이머니 결제 시 자동 발급<br/>

                        카카오톡 → Pay → 이용내역 → 결제 상세 → 현금영수증 확인
                    </div>
                </div>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler6} style={{cursor:'pointer'}}>Q. [공통] 영수증 또는 거래내역서를 발급받고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName6 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler6}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <div className='text_contents' style={{
                        height:isContent6 ? '500px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        padding:'0'
                }}>
                    <br/> A. 예약 및 결제 정보가 포함된 영수증 또는 거래내역서는<br/>
                    아래 경로를 통해 직접 확인 및 발급하실 수 있습니다.<br/><br/>

                    <div className='contents6'>
                    [영수증 발급 방법]<br/>

                    앱/웹 → 내 정보 → 예약 내역 → 예약 상세
                    → 결제 증빙 보기 → 영수증 확인<br/>
                    ※ 네이버페이 결제 건은 네이버페이 결제 페이지에서 확인 가능합니다.<br/><br/>

                    [거래내역서 발급 방법]<br/>

                    앱/웹 → 내 정보 → 예약 내역 → 예약 상세
                    → 결제 증빙 보기 → 거래내역서 발급
                    → 수령할 이메일 주소 입력 후 발송<br/><br/>

                    ※ 거래내역서는 단순 거래 확인용 자료로, 세금계산서 등 법적 효력은 없습니다.<br/>
                    ※ 예약 완료(이용 확정), 이용 완료, 예약 취소 건에 대해서만 발급 가능하며<br/>
                    예약 실패 또는 예약 대기 상태의 건은 발급이 제한됩니다.
                    </div>
                </div>
            </div>)
            }
            {/* 공지사항 메인 */}
            {listType === 2 && 
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts notice' style={{borderTop:'2px solid black'}} onClick={() => setListType(3)}>
                    <p>[신규 가입 이벤트] 지금 가입하면 10,000원 할인 쿠폰 지급!</p>
                </div>
                <div className='helpCenter_texts notice' onClick={() => setListType(4)}>
                    <p>[기간 한정] 전 숙소 10% 할인 이벤트 진행 중</p>
                </div>
                <div className='helpCenter_texts notice' onClick={() => setListType(5)}>
                    <p>[포인트 혜택] 숙소 예약 시 5,000포인트 적립</p>
                </div>
                <div className='helpCenter_texts notice' onClick={() => setListType(6)}>
                    <p>[후기 이벤트] 리얼 후기 작성하고 1,000포인트 받으세요</p>
                </div>
                <div className='helpCenter_texts notice' onClick={() => setListType(7)}>
                    <p>[결제 혜택] 삼성카드 12월 무이자 할부 안내</p>
                </div>
            </div>)
            }
            {/* 공지 1번 */}
            {listType === 3 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <p>[신규 가입 이벤트] 지금 가입하면 10,000원 할인 쿠폰 지급!</p>
                    <p className='notice-date'>작성일 : 2025-12-25</p>
                </div>
                <div className='notice-contents'>
                    EcoStay에 새로 가입하신 회원님께 <br/>
                    10,000원 즉시 사용 가능한 할인 쿠폰을 드립니다.<br/><br/>

                    지급 대상 : EcoStay 신규 회원<br/><br/>

                    지급 혜택 : 10,000원 할인 쿠폰 1매<br/><br/>

                    사용 조건 : 숙소 예약 시 사용 가능<br/><br/>

                    지급 시점 : 회원가입 완료 즉시<br/><br/>

                    ※ 일부 특가 상품에는 사용이 제한될 수 있습니다.
                </div>
                <button type='button' className='noticeContentsBtn' onClick={noticeBtnHandeler}>목록 보기</button>
                
            </div>)
            }
            {/* 공지 2번 */}
            {listType === 4 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <p>[기간 한정] 전 숙소 10% 할인 이벤트 진행 중</p>
                    <p className='notice-date'>작성일 : 2025-12-22</p>
                </div>
                <div className='notice-contents'>
                    지금 EcoStay에서<br/>
                    한 달간 숙소 예약 시 10% 할인 혜택을 받아보세요.<br/><br/>

                    이벤트 기간 : 한 달간 진행<br/><br/>

                    할인 내용 : 결제 금액의 10% 할인<br/><br/>

                    적용 대상 : 국내 · 해외 숙소 전체<br/><br/>

                    ※ 다른 할인 쿠폰과 중복 사용이 제한될 수 있습니다.
                </div>
                <button type='button' className='noticeContentsBtn' onClick={noticeBtnHandeler}>목록 보기</button>
                
            </div>)
            }
            {/* 공지 3번 */}
            {listType === 5 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <p>[포인트 혜택] 숙소 예약 시 5,000포인트 적립</p>
                    <p className='notice-date'>작성일 : 2025-12-21</p>
                </div>
                <div className='notice-contents'>
                    EcoStay에서 숙소를 예약하면 <br/>
                    5,000포인트를 자동 적립해 드립니다.<br/><br/>

                    적립 대상 : 숙소 예약 완료 고객<br/><br/>

                    적립 포인트 : 5,000P<br/><br/>

                    사용 방법 : 다음 예약 시 현금처럼 사용 가능<br/><br/>

                    ※ 포인트는 숙박 완료 후 지급됩니다.<br/><br/>
                </div>
                <button type='button' className='noticeContentsBtn' onClick={noticeBtnHandeler}>목록 보기</button>
            </div>)
            }
            {/* 공지 4번 */}
            {listType === 6 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <p>[후기 이벤트] 리얼 후기 작성하고 1,000포인트 받으세요</p>
                    <p className='notice-date'>작성일 : 2025-12-19</p>
                </div>
                <div className='notice-contents'>
                    숙박 후 리얼 후기를 작성해주시면 1,000포인트를 적립해 드립니다.<br/><br/>

                    참여 방법 : 숙박 완료 후 후기 작성<br/><br/>

                    혜택 : 1,000포인트 지급<br/><br/>

                    지급 시점 : 후기 승인 후 자동 적립<br/><br/>

                    ※ 부적절한 내용의 후기는 지급 대상에서 제외될 수 있습니다.
                </div>
                <button type='button' className='noticeContentsBtn' onClick={noticeBtnHandeler}>목록 보기</button>
            </div>)
            }
            {/* 공지 5번 */}
            {listType === 7 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>공지사항</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <p>[결제 혜택] 삼성카드 12월 무이자 할부 안내</p>
                    <p className='notice-date'>작성일 : 2025-12-15</p>
                </div>
                <div className='notice-contents'>
                    12월 한 달간<br/>
                    삼성카드 결제 시 최대 무이자 할부 혜택을 제공합니다.<br/><br/>

                    대상 카드 : 삼성카드<br/><br/>

                    혜택 내용 : 무이자 할부 제공<br/><br/>

                    적용 기간 : 12월 한정<br/><br/>

                    ※ 카드사 정책에 따라 일부 조건이 변경될 수 있습니다.<br/><br/>
                </div>
                <button type='button' className='noticeContentsBtn' onClick={noticeBtnHandeler}>목록 보기</button>
            </div>)
            }
            {/* 1대1 문의 */}
            {listType === 8 && 
            (<div className='helpCenter_text'>
                <h1 className='text_title'>1 대 1 문의</h1>
                <div>
                    <p className='support-1on1'>현재 문의 사항이 없습니다.</p>
                </div>
                <button type='button' className='sportBtn'>문의하기</button>
            </div>)
            }
            {/* 우측 고객센터 전화번호 등 */}
            <div className='helpCenter_tel'>
                <div className='helpCenter_tel1'>
                    <h1 className='tel1_title'>EcoStay 고객 센터</h1>
                    <ul>
                        <li className='tel_list chatLi'>
                            <button type='button' className='chatBtn'>
                                채팅 상담
                            </button>
                        </li>
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            여행 상담센터
                            <p className='info_tel'>9999-9996</p>
                        </li>
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            국내 숙소 상담센터
                            <p className='info_tel'>9999-9997</p>
                        </li>
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            해외 숙소 상담센터
                            <p className='info_tel'>9999-9998</p>
                        </li>
                        <li className='tel_list' style={{border:'none'}}>
                            <i className="fa-solid fa-phone"></i>
                            고객센터
                            <p className='info_tel'>9999-9999</p>
                        </li>
                    </ul>
                </div>
                <div className='helpCenter_tel2'>
                    <p className='tel2_title'>
                        <i className="fa-solid fa-circle-info"></i>
                        상담시간 안내
                    </p>
                    <ul>
                        <li>
                            <p className='tel2_info'>* 해외/국내 여행 상담</p>
                            <p className='tel2_info2'>평일 9:00 ~ 18:00 (토/일요일 및 공휴일 휴무)</p>
                        </li>
                        <li>
                            <p className='tel2_info'>* 채팅상담</p>
                            <p className='tel2_info2'>24시간 운영</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}