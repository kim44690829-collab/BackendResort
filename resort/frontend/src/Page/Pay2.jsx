import { useState,useEffect } from "react";
import '../Page/pay.css'
import { useContext } from "react";
import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Pay2(){

    const {userNickName} = useContext(ResortDataContext)
    
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {

        const reservationNo = sessionStorage.getItem("reservation_no");

        if(!reservationNo){
            console.log("예약 번호 없음.");
            return;
        }

        axios.get("/api/reservationInfo", {
            params: {
                reservation_no: reservationNo
            }
        })
        .then((res) => {

            if(!res.data){
                console.log("데이터 없음");
                setResInfo(null);
                return;
            }
            console.log("예약 상세",res.data);
            setResInfo(res.data)
        })
        .catch((err) => {
            console.error(err)
            setResInfo(null);
        })
    },[])

    if(!resInfo) return <div>로딩중...</div>;

    const res_at = new Date(resInfo.reserved_at).toLocaleDateString("sv-SE");
    const chkInDate = new Date(resInfo.check_in_date)
    const chkOutDate = new Date(resInfo.check_out_date)

    const totalDay = (chkOutDate.getTime()-chkInDate.getTime())/(1000*24*60*60);


    return(
        <>
            <div className="paysection2">
                {/* <h2 className="pay2_title">구매가 완료되었습니다.</h2> */}
                <h2 className="pay2_title">상품예약이 완료되었습니다</h2>
                <div className="pay2_info">
                    <table className="pay2_table">
                        <tbody>
                            <tr>
                                <td colSpan='2' style={{height:'150px'}}>
                                    <img src={`/img/${resInfo.h_Img}`} alt={`${resInfo.h_Img}이미지`} className="payHotelimg"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="pay2_list_title " >호텔정보</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">도시</td>
                                <td className="pay2_list2 trHeight">{resInfo.city}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">호텔</td>
                                <td className="pay2_list2 trHeight">{resInfo.hotelName}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">객실</td>
                                <td className="pay2_list2 trHeight">{resInfo.roomName}</td>
                            </tr>
                            <tr>
                                <td colSpan='2' className="line">
                                    <hr/>
                                </td>
                            </tr>
                            <tr>
                                <td className="pay2_list_title" colspan="2">체크인/아웃</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">예약일</td>
                                <td className="pay2_list2 trHeight">{res_at}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">체크인</td>
                                <td className="pay2_list2 trHeight">{resInfo.check_in_date}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">체크아웃</td>
                                <td className="pay2_list2 trHeight">{resInfo.check_out_date}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">숙박 일수</td>
                                <td className="pay2_list2 trHeight"><span  style={{fontSize:'18px', marginRight:'5px', color:'#42799b', fontWeight:'bold'}}>{totalDay}</span>박</td>
                            </tr>
                            <tr>
                                <td colSpan='2' className="line">
                                    <hr/>
                                </td>
                            </tr>
                            <tr>
                                <td className="pay2_list_title" colspan="2" >결제 정보</td>
                            </tr>
                            {userNickName != null ? 
                            (<tr className="trHeight">
                                <td className="pay2_list trHeight">쿠폰 사용</td>
                                <td className="pay2_list2 trHeight">{resInfo.coupon_used == 0 ? '미사용' : '사용'}</td>
                            </tr>) : ''}
                            
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">결제 금액</td>
                                <td className="pay2_list2 trHeight"><span style={{fontSize:'18px', marginRight:'5px', color:'#42799b', fontWeight:'bold'}}>{(resInfo.final_price ?? 0).toLocaleString()}</span>원</td>
                            </tr>
                            <tr>
                                <td colSpan='2' className="line">
                                    <hr/>
                                </td>
                            </tr>
                            <tr>
                                <td className="pay2_list_title" colspan="2">예약자 정보</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">예약자</td>
                                <td className="pay2_list2 trHeight">{resInfo.booker_name}</td>
                            </tr>
                            <tr className="trHeight">
                                <td className="pay2_list trHeight">예약번호</td>
                                <td className="pay2_list2 trHeight">{resInfo.reservation_no}</td>
                            </tr>
                            {userNickName == null ? 
                            (<tr class="empty-row">
                                <td colspan="2" style={{fontWeight:'bold', color:'rgb(64 152 198)'}} className="empty2">※ 비회원 예약 취소는 9999-9999로 문의주세요.</td>
                            </tr>) : (<tr class="empty-row">
                                <td colspan="2" style={{height:'40px'}} className="empty2"></td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div className="pay2_btns">
                        <Link to={'/'}>
                            <button className="pay2_btn move_main" type="button">홈으로 이동</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}