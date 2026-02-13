import { useState, useEffect } from 'react';
import '../Page/SignUp1.css';
import { Link } from 'react-router-dom';

export default function SignUp1(){
    const [isDisabledAgree, setIsDisabledAgree] = useState(true);
    // 전체 동의 상태저장 변수
    const [allChecked, setAllChecked] = useState(false);
    // 전체 동의 하위 동의들 상태 저장 변수 
    const [checkedItems, setCheckedItems] = useState({
        agreeTermsOfService : false,
        confirmAgeOver14 : false,
        agreePrivacyPolicy : false,
        agreeOptionalPrivacy : false,
        agreeMarketingNotifications : false,
        agreeLocationService : false,
    })
    // caret 버튼 클릭시 이용약관을 나타나게 하는 상태변수
    const [isContent1, setIsContent1] = useState(false);
    const [isContent2, setIsContent2] = useState(false);
    const [isContent3, setIsContent3] = useState(false);
    const [isContent4, setIsContent4] = useState(false);
    const [isContent5, setIsContent5] = useState(false);
    const [isContent6, setIsContent6] = useState(false);

    // caret 버튼 클릭시 버튼 방향 바꾸기
    const [isBtnChange1, setIsBtnChange1] = useState(false);
    const [isBtnChange2, setIsBtnChange2] = useState(false);
    const [isBtnChange3, setIsBtnChange3] = useState(false);
    const [isBtnChange4, setIsBtnChange4] = useState(false);
    const [isBtnChange5, setIsBtnChange5] = useState(false);
    const [isBtnChange6, setIsBtnChange6] = useState(false);

    // 마우스 변경
    const [mouseCursor, setMouseCursor] = useState(false);

    // // caret 버튼 클릭시 이용약관을 나타나게 하는 함수
    const contentHandeler1 = () => {
        setIsContent1(!isContent1);
        setIsBtnChange1(!isBtnChange1);
    }
    const contentHandeler2 = () => {
        setIsContent2(!isContent2);
        setIsBtnChange2(!isBtnChange2);
    }
    const contentHandeler3 = () => {
        setIsContent3(!isContent3);
        setIsBtnChange3(!isBtnChange3);
    }
    const contentHandeler4 = () => {
        setIsContent4(!isContent4);
        setIsBtnChange4(!isBtnChange4);
    }
    const contentHandeler5 = () => {
        setIsContent5(!isContent5);
        setIsBtnChange5(!isBtnChange5);
    }
    const contentHandeler6 = () => {
        setIsContent6(!isContent6);
        setIsBtnChange6(!isBtnChange6);
    }

    // 전체 동의 체크시 하위 동의 전부 체크
    const allAgreeHandeler = () => {
        const allAgreeValue = !allChecked
        setAllChecked(allAgreeValue)

        setCheckedItems({
            agreeTermsOfService : allAgreeValue,
            confirmAgeOver14 : allAgreeValue,
            agreePrivacyPolicy : allAgreeValue,
            agreeOptionalPrivacy : allAgreeValue,
            agreeMarketingNotifications : allAgreeValue,
            agreeLocationService : allAgreeValue,
        })
    }

    // 하나라도 체크 해제시 전체 동의 체크 해제
    const handleSingleChecked = (name) => {
        setCheckedItems((prev) => {
            const updated = {...prev, [name] : !prev[name]};

            const all = Object.values(updated).every((v) => v === true)
            setAllChecked(all);
            return updated;
        })
    }

    // 필수에 해당하는 이용약관이 체크되면 다음버튼 활성화
    useEffect(() => {
        if(checkedItems.agreeTermsOfService === true && checkedItems.confirmAgeOver14 === true && checkedItems.agreePrivacyPolicy === true){
            setIsDisabledAgree(false)
            setMouseCursor(true)
        }else{
            setIsDisabledAgree(true)
            setMouseCursor(false)
        }
    },[checkedItems])


    return(
        // 이용약관 동의 페이지
        <div className="signup_container">
            <h1 className='signup_title'>저희 EcoStay를 찾아와 주셔서 감사합니다! <br/>
                약관에 동의를 부탁드립니다!</h1>
            {/* 이용약관 form */}
            <form className='agreeForm'>
                {/* 이용약관 전체 동의 */}
                <input type="checkbox" id='agreeAllTerms' name='agreeAll' checked={allChecked} onChange={allAgreeHandeler} />
                <label htmlFor="agreeAllTerms">약관 전체동의</label>
                {/* 1번 항목 - 이용약관 */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='agreeTermsOfService' name='agreeTOS' checked={checkedItems.agreeTermsOfService} onChange={() => handleSingleChecked('agreeTermsOfService')} />
                        <label htmlFor="agreeTermsOfService">(필수) 이용약관</label>
                    </div>
                    <button type="button" className={`${isBtnChange1 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`} onClick={contentHandeler1}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                </div>
                {/* 1번 항목 - 이용약관 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent1 ? '1180px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease' 
                        }}>
                    <div className='agreeContent1'>
                        <b className='contentTitle'>제1조 (용어의 정의)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>“이용자”란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                            <li className='agreeContent1Li' style={{lineHeight:'20px'}}>“회원”이란 회사에 개인정보를 제공하고 계정을 생성하여 지속적으로 서비스를 <br/> 
                            이용할 수 있는 자를 말합니다.</li>
                            <li className='agreeContent1Li'>“비회원”이란 회원 가입 없이 서비스를 이용하는 자를 말합니다.</li>
                            <li className='agreeContent1Li'>“숙소”란 회사가 중개하는 호텔, 펜션, 게스트하우스 등 숙박 시설을 의미합니다.</li>
                            <li className='agreeContent1Li' style={{lineHeight:'20px'}}>“예약”이란 이용자가 서비스 내에서 숙소 이용을 신청하고 회사 또는 숙소 운영자가 <br/>
                            이를 승인한 상태를 말합니다.</li>
                        </ol>
                        <b className='contentTitle'>제2조 (약관의 효력 및 변경)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>본 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생합니다.</li>
                            <li className='agreeContent1Li'>회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.</li>
                            <li className='agreeContent1Li'>약관이 변경되는 경우, 적용일자 및 변경 내용을 명시하여 사전 공지합니다.</li>
                            <li className='agreeContent1Li'>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제3조 (서비스의 제공)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>회사는 다음과 같은 서비스를 제공합니다.
                                <ul>
                                    <li className='agreeContent1UlLi'>숙소 정보 제공 및 검색 서비스</li>
                                    <li className='agreeContent1UlLi'>숙박 예약 중개 및 결제 서비스</li>
                                    <li className='agreeContent1UlLi'>이벤트, 할인, 쿠폰 제공 서비스</li>
                                </ul>
                            </li>
                            <li className='agreeContent1Li' style={{lineHeight:'20px'}}>회사는 시스템 점검, 장애, 운영상 필요에 따라 서비스의 전부 또는 일부를 일시적으로<br/>
                            중단할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제4조 (회원가입 및 계정관리)</b>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>회원가입은 이용자가 약관에 동의하고 회사가 정한 가입 절차를 완료함으로써 성립합니다.</li>
                            <li className='agreeContent1Li'>회원은 계정 정보의 정확성과 보안에 대한 책임을 부담합니다.</li>
                            <li className='agreeContent1Li'>회사는 다음 각 호에 해당하는 경우 회원가입을 제한하거나 취소할 수 있습니다.
                                <ul>
                                    <li className='agreeContent1UlLi'>허위 정보를 제공한 경우</li>
                                    <li className='agreeContent1UlLi'>타인의 정보를 도용한 경우</li>
                                    <li className='agreeContent1UlLi'>관련 법령 또는 약관을 위반한 경우</li>
                                </ul>
                            </li>
                        </ol>
                        <b className='contentTitle'>제5조 (예약 및 결제)</b>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>예약은 이용자가 선택한 숙소, 일정, 요금 조건을 확인한 후 진행됩니다.</li>
                            <li className='agreeContent1Li'>결제 금액, 취소 및 환불 조건은 숙소별 정책에 따릅니다.</li>
                            <li className='agreeContent1Li'>회사는 중개자로서 숙소 운영자가 제공한 정보 및 정책에 대해 책임을 제한할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제6조 (취소·환불)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>예약 취소 및 환불은 각 숙소의 취소 정책에 따릅니다.</li>
                            <li className='agreeContent1Li'>회사는 이용자가 정책을 확인하지 않아 발생한 불이익에 대해 책임을 지지 않습니다.</li>
                        </ol>
                        <b className='contentTitle'>제7조 (이용자의 의무)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>이용자는 관계 법령, 본 약관 및 서비스 이용 안내를 준수해야 합니다.</li>
                            <li className='agreeContent1Li'>이용자는 다음 행위를 하여서는 안 됩니다.
                                <ul>
                                    <li className='agreeContent1UlLi'>타인의 권리 침해 또는 불법 행위</li>
                                    <li className='agreeContent1UlLi'>서비스 운영을 방해하는 행위</li>
                                    <li className='agreeContent1UlLi'>허위 예약 또는 부정 결제 행위</li>
                                </ul>
                            </li>
                        </ol>
                        <b className='contentTitle'>제8조 (책임의 제한)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>회사는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
                            <li className='agreeContent1Li'>회사는 숙소 운영자의 귀책 사유로 발생한 분쟁에 대해 중개 범위 내에서만 책임을 부담합니다.</li>
                        </ol>
                        <b className='contentTitle'>제9조 (분쟁 해결 및 관할)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent1Li'>회사와 이용자 간 분쟁은 상호 협의를 통해 해결하도록 노력합니다.</li>
                            <li className='agreeContent1Li'>협의가 이루어지지 않는 경우, 관련 법령에 따른 관할 법원을 제1심 관할 법원으로 합니다.</li>
                        </ol>
                    </div>
                </div>
                {/* 2번 항목 - 14세 이상 */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='confirmAgeOver14' name='age14' checked={checkedItems.confirmAgeOver14} onChange={() => handleSingleChecked('confirmAgeOver14')} />
                        <label htmlFor="confirmAgeOver14">(필수) 만 14세 이상 확인</label>
                    </div>
                    <button type="button" className={`${isBtnChange2 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`} onClick={contentHandeler2}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                </div>
                {/* 2번 항목 - 14세 이상 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent2 ? '155px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease' 
                        }}>
                    <div className='agreeContent2'>
                        <b  style={{color:'red'}}>EcoStay는 만 14세 미만 아동의 서비스 이용을 제한하고 있습니다.</b><br/>
                        개인정보 보호법에는 만 14세미만 아동의 개인정보 수집 시 <br/>
                        법정대리인 동의를 받도록 규정하고 있으며, <br/>
                        만 14세 미만 아동이 법정대리인 동의없이 회원가입을 하는 경우 <br/>
                        회원탈퇴 또는 서비스 이용이 제한될 수 있음을 알려드립니다.
                    </div>
                </div>
                
                {/* 3번 항목 - 개인정보 수집 및 이용 동의 (필수) */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='agreePrivacyPolicy' name='agreePrivacy' checked={checkedItems.agreePrivacyPolicy} onChange={() => handleSingleChecked('agreePrivacyPolicy')} />
                        <label htmlFor="agreePrivacyPolicy">(필수) 개인정보 수집 및 이용 동의</label>
                    </div>
                    <button type="button" className={`${isBtnChange3 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`} onClick={contentHandeler3}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                </div>
                {/* 3번 항목 - 개인정보 수집 및 이용 동의 (필수) 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent3 ? '850px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease' 
                        }}>
                    <div className='agreeContent3'>
                        <b  style={{color:'red'}}>수집 및 이용 목적</b><br/>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li'>서비스 제공 및 이용 관리</li>
                            <li className='agreeContent3Li'>고객 상담 및 문의 대응</li>
                            <li className='agreeContent3Li'>부정 이용 및 비정상 거래 기록 확인</li>
                        </ul>
                        <b className='contentTitle'  style={{color:'red'}}>수집 항목</b><br/>
                        <b style={{display:'inline-block', paddingBottom:'10px', paddingTop:'10px'}}>[일반 회원]</b><br/>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li'>휴대전화번호</li>
                            <li className='agreeContent3Li'>이메일 주소</li>
                            <li className='agreeContent3Li'>닉네임</li>
                            <li className='agreeContent3Li'>생년월일</li>
                            <li className='agreeContent3Li'>성별</li>
                            <li className='agreeContent3Li'>비밀번호(이메일 가입 시)</li>
                            <li className='agreeContent3Li'>SNS 계정 정보(페이스북, 카카오, 네이버, 애플, 구글 계정 가입 시)</li>
                        </ul>
                        <b style={{display:'inline-block', paddingBottom:'10px', paddingTop:'10px'}}>[서비스 이용 및 부정 이용 기록 확인]</b>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li'>서비스 이용 시간 및 이용 기록</li>
                            <li className='agreeContent3Li'>접속 로그</li>
                            <li className='agreeContent3Li'>이용 콘텐츠 정보</li>
                            <li className='agreeContent3Li'>접속 IP 주소</li>
                            <li className='agreeContent3Li'>기기 모델명</li>
                            <li className='agreeContent3Li'>브라우저 정보</li>
                        </ul>
                        <b style={{display:'inline-block', paddingBottom:'10px', paddingTop:'10px'}}>[본인 인증 시]</b>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li'>CI(연계 정보)</li>
                            <li className='agreeContent3Li'>DI(중복 가입 확인 정보)</li>
                        </ul>
                        <b className='contentTitle' style={{color:'red'}}>보유 및 이용 기간</b><br/>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li'>회원 탈퇴 또는 계약 종료 시까지</li>
                            <li className='agreeContent3Li'>회사 내부 정책에 따라 보관이 필요한 경우, 사전 안내된 기간 동안 보유</li>
                            <li className='agreeContent3Li'>관련 법령에 따라 보관 의무가 있는 경우, 해당 법령에서 정한 기간 동안 보유</li>
                        </ul>
                        <b className='contentTitle' style={{color:'red'}}>동의 거부 안내</b><br/>
                        <ul className='agreeContent3Ul'>
                            <li className='agreeContent3Li' style={{lineHeight:'1.5em'}}>
                                본 개인정보 수집 및 이용에 대한 동의는 필수 사항으로, <br/>
                                동의를 거부하실 경우 회원가입 및 서비스 이용이 제한됩니다.</li>
                            <li className='agreeContent3Li'>개인정보 처리와 관련한 자세한 사항은 <b>개인정보처리방침</b>을 통해 확인하실 수 있습니다.</li>
                        </ul>
                    </div>
                </div>
                {/* 4번 항목 - 개인정보 수집 및 이용 동의 (선택) */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='agreeOptionalPrivacy' name='optPrivacy' checked={checkedItems.agreeOptionalPrivacy} onChange={() => handleSingleChecked('agreeOptionalPrivacy')} />
                        <label htmlFor="agreeOptionalPrivacy">(선택) 개인정보 수집 및 이용 동의</label>
                    </div>
                    <button type="button" className={`${isBtnChange4 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`} onClick={contentHandeler4}>
                        <i className="fa-solid fa-caret-down"></i> 
                    </button>
                </div>
                {/* 4번 항목 - 개인정보 수집 및 이용 동의 (선택) 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent4 ? '460px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease' 
                        }}>
                    <div className='agreeContent4'>
                        <b className='contentTitle' style={{color:'red'}}>수집 및 이용 목적</b><br/>
                        <ul className='agreeContent4Ul'>
                            <li className='agreeContent4Li'>서비스 제공 및 이용 관리</li>
                            <li className='agreeContent4Li'>고객 상담 및 문의 대응</li>
                            <li className='agreeContent4Li'>부정 이용 및 비정상 거래 기록 확인</li>
                        </ul>
                        <b className='contentTitle' style={{color:'red'}}>수집 항목</b><br/>
                        <ul className='agreeContent4Ul'>
                            <li className='agreeContent4Li'>이름</li>
                            <li className='agreeContent4Li'>프로필 이미지</li>
                            <li className='agreeContent4Li'>생년월일(기업 담당자가 비즈니스 회원을 직접 등록하는 경우에 한함)</li>
                        </ul>
                        <b className='contentTitle' style={{color:'red'}}>보유 및 이용 기간</b><br/>
                        <ul className='agreeContent4Ul'>
                            <li className='agreeContent4Li'>회원 탈퇴 또는 계약 종료 시까지</li>
                            <li className='agreeContent4Li'>회사 내부 정책에 따라 보관이 필요한 경우, 사전 안내된 기간 동안 보유</li>
                            <li className='agreeContent4Li'>관련 법령에 따라 보관 의무가 있는 경우, 해당 법령에서 정한 기간 동안 보유</li>
                        </ul>
                        <b className='contentTitle' style={{color:'red'}}>동의 거부 안내</b><br/>
                        <ul className='agreeContent4Ul'>
                            <li className='agreeContent4Li' style={{lineHeight:'1.5em'}}>이용자는 위 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으며, <br/>
                                동의를 거부하더라도 기본적인 서비스 이용에는 제한이 없습니다.</li>
                            <li className='agreeContent4Li'>개인정보 처리와 관련한 자세한 사항은 <b>개인정보처리방침</b>을 통해 확인하실 수 있습니다.</li>
                        </ul>
                    </div>
                </div>
                {/* 5번 항목 - 마케팅 알림 수신 */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='agreeMarketingNotifications' name='marketingOk' checked={checkedItems.agreeMarketingNotifications} onChange={() => handleSingleChecked('agreeMarketingNotifications')} />
                        <label htmlFor="agreeMarketingNotifications">(선택) 마케팅 알림 수신 동의</label>
                    </div>    
                    <button type="button" className={`${isBtnChange5 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`}  onClick={contentHandeler5}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                </div>
                {/* 5번 항목 - 마케팅 알림 수신 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent5 ? '250px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease'
                        }}>
                    <div className='agreeContent5'>
                        <b >
                            ㈜EcoStay는 이용자가 개인정보 수집 및 이용에 동의한 범위 내에서 <br/>
                            앱 푸시 알림, 이메일, 문자메시지, 카카오톡 등 전자적 전달 수단을 통해 <br/>
                            혜택 안내, 이벤트 정보, 맞춤형 프로모션 등 마케팅 정보를 제공할 수 있습니다.
                        </b><br/>
                    </div>
                    <p className='agreeContent5-1'>
                        본 동의는 선택 사항으로, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다.
                        다만, 마케팅 수신 동의 이용자에게 제공되는 일부 혜택이나 이벤트 참여가 제한될 수 있습니다.
                    </p>
                    <p className='agreeContent5-2'>
                        마케팅 정보 수신 동의는
                        앱 또는 웹 서비스 내 내 정보 → 알림/마케팅 수신 설정 메뉴를 통해
                        언제든지 변경하거나 철회하실 수 있습니다.
                    </p>
                </div>
                {/* 6번 항목 - 위치기반 서비스 이용약관 */}
                <div className="agree1">
                    <div className='agree2'>
                        <input type="checkbox" id='agreeLocationService' name='locService' checked={checkedItems.agreeLocationService} onChange={() => handleSingleChecked('agreeLocationService')} />
                        <label htmlFor="agreeLocationService">(선택) 위치기반 서비스 이용약관 동의</label>
                    </div>
                    <button type="button" className={`${isBtnChange6 ? 'agreeSeeBtn btnChange' : 'agreeSeeBtn'}`}  onClick={contentHandeler6}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                </div>
                {/* 6번 항목 - 위치기반 서비스 이용약관 상세 */}
                <div className='agreeContentBox' style={{
                        height:isContent6 ? '650px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease' 
                        }}>
                    <div className='agreeContent6'>
                        <b className='contentTitle'>제1조 (위치기반 서비스의 내용)</b><br/>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>회사는 이용자의 위치 정보를 활용하여 다음과 같은 서비스를 제공합니다.
                                <ul>
                                    <li className='agreeContent6UlLi'>현재 위치 기준 주변 숙소 검색</li>
                                    <li className='agreeContent6UlLi'>거리, 이동 시간 기반 숙소 추천</li>
                                </ul>
                            </li>
                            <li className='agreeContent6Li'>위치기반 서비스는 이용자의 단말기 설정 및 네트워크 환경에 따라 제한될 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제2조 (위치정보의 수집 및 이용)</b><br/>
                        <ol className='agreeContent1Ol'>
                            <li className='agreeContent6Li'>회사는 이용자의 동의 하에 위치 정보를 수집·이용합니다.</li>
                            <li className='agreeContent6Li'>위치 정보는 서비스 제공 목적 범위 내에서만 이용됩니다.</li>
                            <li className='agreeContent6Li'>회사는 위치 정보 보호 관련 법령을 준수합니다.</li>
                        </ol>
                        <b className='contentTitle'>제3조 (동의 및 철회)</b><br/>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>이용자는 위치기반 서비스 이용에 대해 동의 또는 거부할 수 있습니다.</li>
                            <li className='agreeContent6Li'>이용자는 언제든지 단말기 설정 또는 서비스 내 기능을 통해 동의를 철회할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제4조 (보유 및 이용기간)</b>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>회사는 위치 정보 이용 목적이 달성된 후 지체 없이 파기합니다.</li>
                            <li className='agreeContent6Li'>법령에 따라 보관이 필요한 경우에는 해당 기간 동안 보관할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제5조 (이용자의 권리)</b>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>이용자는 자신의 위치 정보 이용 내역을 확인할 수 있습니다.</li>
                            <li className='agreeContent6Li'>이용자는 위치 정보 오류에 대해 정정을 요구할 수 있습니다.</li>
                        </ol>
                        <b className='contentTitle'>제6조 (책임의 제한)</b><br/>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>회사는 이용자의 단말기 오류, 네트워크 문제로 인한 위치 정보 오차에 대해 책임을 지지 않습니다.</li>
                            <li className='agreeContent6Li'>회사는 위치기반 서비스를 무료로 제공하는 범위 내에서 관련 법령이 허용하는 한도 내에서 책임을 부담합니다.</li>
                        </ol>
                        <b className='contentTitle'>제7조 (분쟁 해결)</b><br/>
                        <ol className='agreeContent6Ol'>
                            <li className='agreeContent6Li'>본 약관과 관련한 분쟁은 이용약관의 분쟁 해결 조항을 준용합니다.</li>
                        </ol>
                    </div>
                </div>
                {/* 다음 버튼 클릭시 휴대폰 인증 화면으로 이동 */}
                <Link to='/SignUp2'>
                    <button type="submit" 
                    className='agreeBtn' 
                    disabled={isDisabledAgree} 
                    style={{
                        cursor: mouseCursor ? 'pointer' : 'not-allowed', 
                        backgroundColor: mouseCursor ? '#42799b' : '#e7e7e7ff',
                        color: mouseCursor ? '#fff' : '#a5a5a5ff'
                        }}  >다음</button>
                </Link>
            </form>
        </div>
    )
}