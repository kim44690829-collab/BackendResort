import { useState,useEffect } from "react";
import '../Page/pay.css'
// import { useContext } from "react";
// import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Pay2(){

    // const {payHead,setPayHead,payRoom,setPayRoom,HotelData,RoomData,DayData,customer,setCustomer} = useContext(ResortDataContext)
    
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
                <div className="pay2_info">
                    <h2 className="pay2_title">구매정보</h2>
                    <p className="pay2_coment">고객님 상품예약이 완료되었습니다.</p>
                    <table className="pay2_table">
                        <tbody>
                            <tr>
                                <td className="pay2_list">호텔</td>
                                <td className="pay2_list">{resInfo.hotelName}</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">객실</td>
                                <td className="pay2_list">{resInfo.roomName}</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">체크인/체크아웃</td>
                                <td className="pay2_list">{resInfo.check_in_date} ~ {resInfo.check_out_date}</td>
                                <td className="pay2_list">총 {totalDay}박</td>
                                <td className="pay2_list"></td>
                            </tr>
                            <tr>
                                <td className="pay2_list">결제 금액</td>
                                <td className="pay2_list">{(resInfo.final_price ?? 0).toLocaleString()}원</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">예약자</td>
                                <td className="pay2_list">{resInfo.booker_name} 님</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">예약일</td>
                                <td className="pay2_list">{res_at}</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">예약번호</td>
                                <td className="pay2_list">{resInfo.reservation_no}</td>
                            </tr>
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