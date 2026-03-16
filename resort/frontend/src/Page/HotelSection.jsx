import { useContext, useState, useEffect } from 'react';
import { ResortDataContext } from '../Api/ResortData';
import { Link } from 'react-router-dom';
import '../Page/HotelSection.css';
import { useNavigate } from 'react-router-dom';

export default function HotelSection(){
    const navigation = useNavigate();
    // 받아온 데이터
    const {HotelData, hotelMerge, wish, wishHandler, hotelRatingAvgData, hotelMinPrice, Domestic, setDomestic} = useContext(ResortDataContext)
    const [moreSee1, setMoreSee1] = useState(9);
    const [seeBtn1, setSeeBtn1] = useState(0);

    // 더보기 버튼
    const btnHandeler1 = () => {
        if(seeBtn1 < 6){
            setMoreSee1(moreSee1 + 9)
            setSeeBtn1(seeBtn1 + 1)
        }else{
            setSeeBtn1(0)
        }
    }
    
    // 국내 filter
    const domesticHotel = hotelMerge.filter(item => item.country === 'Korea');
    const domesticHotelSort = [...domesticHotel].sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
    // console.log('국내', domesticHotelSort)

    const clickHandeler = () => {
        navigation('/hotelSection2');
    }



    return(
        <div className="HotelSection_container">
            {/* 좌측 메뉴 */}
            <ul className="HotelSection_menu">
                <li className='HotelSection_Hotel HotelAll'>
                    숙소
                </li>
                <li className='HotelSection_Hotel DomesticHotels'style={{fontWeight:'bold'}}>
                    국내 숙소
                </li>
                <li className='HotelSection_Hotel overseasHotels' onClick={clickHandeler}>
                    해외 숙소
                </li>
            </ul>
            <div>
                <p className='HotelSection_title'>국내 숙소</p>
                <div className='HotelSection_wrap'>
                    <ul className='HotelUl' >
                        {domesticHotelSort.slice(0,moreSee1).map((item) => (
                            <li key={item.h_code} style={{cursor:'pointer'}} className='HotelLi'>
                                <Link to = {`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                    <img src={`/img/${item.h_Img}`} alt={item.hotelName} className='hotelSectionImg' style={{width:'280px', height:'169px'}} />
                                    <p className='hotelSection_type'>{item.type}</p>
                                    <p className='hotelSection_name'>{item.hotelName}</p>
                                    <div className='hotelSection_review'>
                                        <span className='hotelSection_score'>
                                            <i className="fa-solid fa-star"></i>
                                            <span className='starScore'>{(hotelRatingAvgData[item.h_code - 1].hotelAvg).toFixed(1)}</span>
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
                {seeBtn1 < 6 && <button type='button' className='moreSeeBtn' onClick={btnHandeler1}>더보기</button>}
                
            </div>
        </div>
    )
}