import { useState,useEffect } from "react";
import '../Page/pay.css'
import { useContext } from "react";
import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Pay2(){

    const {payHead,setPayHead,payRoom,setPayRoom,HotelData,RoomData,DayData,customer,setCustomer} = useContext(ResortDataContext)
   // console.log(payHead) // 1
   // console.log(payRoom) // null
   // console.log(HotelData) // 140개
   // console.log(RoomData) //420개
   // console.log(DayData) // 선택한 날짜
    const payDay = `${new Date().getFullYear()} - ${new Date().getMonth()+1} - ${new Date().getDate()}`
    const [open,setOpen] = useState(false)
    const myRoom = RoomData.filter((f)=>f.id===payRoom)

    // const [loading, setLoading] = useState(true);
    const [resInfo, setResInfo] = useState([]);

    const customerHandler = () => {
        setCustomer('');
    }

    useEffect(() => {

        if(!customer){
            console.log("데이터 없음");
            setResInfo([]);
            // setLoading(false);
            return;
        }

        axios.get("/api/reservationInfo", {
            params: {
                booker_name : customer
            }
        })
        .then((res) => {

            if(!res.data || res.data.length === 0){
                console.log("데이터 없음");
                setResInfo([]);
                return;
            }
            console.log("예약 1명 데이터 : " , res.data)
            setResInfo(res.data)
        })
        .catch((err) => {
            console.error(err)
            setResInfo([]);
        })
        // .finally(() => {
        //     setLoading(false);
        // })
    },[customer])

    // if (loading) return <div>로딩중...</div>;
    // if (resInfo.length === 0) return <div>예약 없음</div>;

    // const res_at = new Date(resInfo.reserved_at).toLocaleDateString("sv-SE");
    // const chkInDate = new Date(resInfo.check_in_date)
    // const chkOutDate = new Date(resInfo.check_out_date)

    // const totalDay = (chkOutDate.getTime()-chkInDate.getTime())/(1000*24*60*60);


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
                                {/* <td className="pay2_list">{resInfo.hotelName}</td> */}
                            </tr>
                            <tr>
                                <td className="pay2_list">객실</td>
                                {/* <td className="pay2_list">{resInfo.roomName}</td> */}
                            </tr>
                            <tr>
                                <td className="pay2_list">체크인/체크아웃</td>
                                {/* <td className="pay2_list">{resInfo.check_in_date} ~ {resInfo[0].check_out_date}</td> */}
                                {/* <td className="pay2_list">총 {totalDay}박</td> */}
                                <td className="pay2_list"></td>
                            </tr>
                            <tr>
                                <td className="pay2_list">결제 금액</td>
                                {/* <td className="pay2_list">{(resInfo.final_price ?? 0).toLocaleString()}원</td> */}
                            </tr>
                            {/* <tr>
                                <td className="pay2_list">원가</td>
                                <td className="pay2_list"></td>
                                <td className="pay2_list">할인율</td>
                                <td className="pay2_list"></td>
                            </tr> */}
                            <tr>
                                <td className="pay2_list">예약자</td>
                                {/* <td className="pay2_list">{resInfo.booker_name} 님</td> */}
                            </tr>
                            <tr>
                                <td className="pay2_list">예약일</td>
                                {/* <td className="pay2_list">{res_at}</td> */}
                            </tr>
                            <tr>
                                <td className="pay2_list">예약번호</td>
                                {/* <td className="pay2_list">{resInfo.reservation_no}</td> */}
                            </tr>
                        </tbody>
                    </table>
                    <div className="pay2_btns">
                        {/* <button className="pay2_btn pay_chk"type="button" onClick={()=>setOpen(!open)}>주문내역 조회</button> */}
                        <Link to={'/'}>
                            <button className="pay2_btn move_main" type="button" onClick={customerHandler}>홈으로 이동</button>
                        </Link>
                    </div>

                </div>
                {/* {open?
                <div className="pay_modal">
                    <div className="backimg" onClick={()=>setOpen(!open)}></div>
                    <div className="modal_content">
                        <h2 className="pay_modal_title">예약내역 확인</h2>
                        <div className="modal_info">
                            <h4 className="modal_hotel">{myRoom[0].hotelName}</h4>
                            <p className="modal_room">{myRoom[0].roomName}</p>
                        </div>
                        <table className="modal_table">
                            <tr>
                                <td className="modal_list">체크인</td>
                                <td className="modal_list">{DayData[0]}</td>
                            </tr>
                            <tr>
                                <td className="modal_list">체크아웃</td>
                                <td className="modal_list">{DayData[1]}</td>
                            </tr>
                        </table>
                        <div className="pay_modal_btn">
                            <button type="button" className="btns" style={{width:'250px',background:'#42799b',color:'#fff'}} onClick={()=>setOpen(!open)}>닫기</button>                            
                        </div>
                    </div>
                </div>:''} */}
                
            </div>
        </>
    )
}