import { useState,useEffect } from "react";
import '../Page/pay.css'
import { useContext } from "react";
import { ResortDataContext } from "../Api/ResortData";
import { Link } from "react-router-dom";

export default function Pay2(){

    const {payHead,setPayHead,payRoom,setPayRoom,HotelData,RoomData,DayData,customer,setCustomer} = useContext(ResortDataContext)
    console.log(payHead) // 1
    console.log(payRoom) // null
    console.log(HotelData) // 140개
    console.log(RoomData) //420개
    console.log(DayData) // 선택한 날짜
    const payDay = `${new Date().getFullYear()} - ${new Date().getMonth()+1} - ${new Date().getDate()}`
    const [open,setOpen] = useState(false)
    const myRoom = RoomData.filter((f)=>f.id===payRoom)
    return(
        <>
            <div className="paysection">
                <div className="pay2_info">
                    <h2 className="pay2_title">구매정보</h2>
                    <p className="pay2_coment">고객님 상품예약이 완료되었습니다.</p>
                    <table className="pay2_table">
                        <tbody>
                            <tr>
                                <td className="pay2_list">수령인</td>
                                <td className="pay2_list">{customer} 님</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">구매일자</td>
                                <td className="pay2_list">{payDay}</td>
                            </tr>
                            <tr>
                                <td className="pay2_list">구매코드</td>
                                <td className="pay2_list">{payDay}_1</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="pay2_btns">
                        <button className="pay2_btn pay_chk"type="button" onClick={()=>setOpen(!open)}>주문내역 조회</button>
                        <Link to={'/'}>
                            <button className="pay2_btn move_main" type="button">홈으로 이동</button>
                        </Link>
                    </div>

                </div>
                {open?
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
                </div>:''}
                
            </div>
        </>
    )
}