import '../Page/HotelSection.css';
import { useContext, useState, useEffect } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function HotelSection2(){
    const navigation = useNavigate();
    // 받아온 데이터
    const {HotelData, hotelMerge, wish, hotelRatingAvgData, hotelMinPrice, wishHandler} = useContext(ResortDataContext)
    const [moreSee2, setMoreSee2] = useState(9);
    const [seeBtn2, setSeeBtn2] = useState(0);

    const btnHandeler2 = () => {
        if(seeBtn2 < 8){
            setMoreSee2(moreSee2 + 9)
            setSeeBtn2(seeBtn2 + 1)
        }else{
            setSeeBtn2(0)
        }
    }

    // 해외 filter
    const overseasHotel = hotelMerge.filter(item => item.country !== 'Korea');
    const overseasHotelSort = [...overseasHotel].sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
    // console.log('해외', overseasHotelSort)

    const clickHandeler = () => {
        navigation('/hotelSection');
    }

    return(
        <div className="HotelSection_container">
            <ul className="HotelSection_menu">
                <li className='HotelSection_Hotel HotelAll'>
                    숙소
                </li>
                <li className='HotelSection_Hotel DomesticHotels' onClick={clickHandeler}>
                    국내 숙소
                </li>
                <li className='HotelSection_Hotel overseasHotels' style={{fontWeight:'bold'}}>
                    해외 숙소
                </li>
            </ul>
            <div>
                <p className='HotelSection_title'>해외 숙소</p>
                <div className='HotelSection_wrap'>
                    <ul className='HotelUl' >
                        {overseasHotelSort.slice(0,moreSee2).map((item) => (
                            <li key={item.h_code} style={{cursor:'pointer'}} className='HotelLi'>
                                <Link to = {`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                    {/* <img src={item.img[0]} alt={item.hotelName} className='popularAccomMainImg' /> */}
                                    <img src={`/img/${item.h_Img}`} alt={item.hotelName} className='hotelSectionImg' style={{width:'280px', height:'169px'}}  />
                                    <p className='hotelSection_type'>{item.type}</p>
                                    <p className='hotelSection_name'>{item.hotelName}</p>
                                    <div className='hotelSection_review'>
                                        <span className='hotelSection_score'>
                                            <i className="fa-solid fa-star"></i>
                                            <span className='starScore'>{(hotelRatingAvgData[item.h_code - 1].hotelAvg).toFixed(1)}{item.score}</span>
                                        </span>
                                        <span className='hotelSection_count'>{(hotelRatingAvgData[item.h_code - 1].scoreCount).toLocaleString()}명 참여</span>
                                    </div>
                                    {item.discount === 1 ? (
                                        <>
                                            <p className='discount'><span className='red'>10% 할인</span> <span className='origin-price'>{hotelMinPrice[item.h_code - 1].hotelPrice.toLocaleString()}원</span></p>
                                            <p className='final-price'>{(hotelMinPrice[item.h_code - 1].hotelPrice - ((hotelMinPrice[item.h_code - 1].hotelPrice)*0.1)).toLocaleString()}원<span>/1박</span></p>
                                        </>
                                    ):(
                                        <>
                                            <p className='discount'><span className='red'>회원가입시 10,000원 할인쿠폰</span></p>
                                            <p className='final-price'>{(hotelMinPrice[item.h_code - 1].hotelPrice).toLocaleString()}원<span>/1박</span></p>
                                        </>
                                    )}
                                </Link>
                                <button type='button' className='wishBtn2' onClick={()=>wishHandler(item.h_code)}>
                                <i className="fa-solid fa-heart" style={
                                wish.find((hotel) => hotel.h_code === Number(item.h_code)) ?
                                    {color:'#f94239'}
                                :
                                    {color:'#6b6b6b'}
                                
                                }></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div> 
                {seeBtn2 < 8 && <button type='button' className='moreSeeBtn' onClick={btnHandeler2}>더보기</button>}
            </div>
        </div>
    )
}