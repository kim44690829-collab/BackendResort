import './Wish.css';
import { useEffect,useContext, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResortDataContext } from '../Api/ResortData';
import Calendar from './Calendar';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Wish(){
    const navigate = useNavigate();

    const {RoomData, HotelData,DayData,wish,wishList,wishStar,WishAvg,wishArray,wishHandler,setWish,setPayHead,setPayRoom,selectday,setSelectday} = useContext(ResortDataContext);

    //호텔의 객실별 투숙객 인원 불러오기
    //위시리스트의 객실 리스트 필터링
    //const wishHotel = HotelData.filter((item)=> wishArray.some(w => w.h_code === item.h_code));

    const wishHotel = wishArray.map(arr => HotelData.find(item => item.h_code === arr.h_code)).filter(Boolean);
    const wishRoom = wishArray.flatMap(wish =>  RoomData.filter(room => room.h_code === wish.h_code));

    //console.log(wishHotel);
    //console.log(wishRoom);    

    const wishOccupancy = [];
    //새 배열에 호텔명과 객실별 투숙객 수 담기
    for(let j=0;j<wishHotel.length;j++){
        for(let i=0;i<wishRoom.length;i++){
            if(wishHotel[j].h_code === wishRoom[i].h_code){
                wishOccupancy.push({hotelName: wishHotel[j].hotelName,maxOccupancy: wishRoom[i].maxOccupancy});
            }
        }
    }
    console.log(wishOccupancy);

    const wishMinMax = Object.values(
        wishOccupancy.reduce((acc, { hotelName, maxOccupancy }) => {
            acc[hotelName] ??= { hotelName, min: maxOccupancy, max: maxOccupancy };
            acc[hotelName].min = Math.min(acc[hotelName].min, maxOccupancy);
            acc[hotelName].max = Math.max(acc[hotelName].max, maxOccupancy);
            return acc;
        }, {})
    );
console.log(wishArray);
console.log(wishStar);
console.log(WishAvg);
//console.log(wishMinMax);
//console.log(wishRoom);



    //달력 
    const [Cal, setCal] = useState(false);

    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()


    //스크롤 내리면 오른쪽 부분 따라 내려오기
    const triggerRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
                if (!triggerRef.current) return;

                //getBoundingClientRect().top => top으로 부터 얼마나 떨어졌는지 측정
                const top = triggerRef.current.getBoundingClientRect().top;
                setIsFixed(top <= 0);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    //객실 인원수 버튼
    const [head, setHead] = useState(1);

    ////플러스 버튼 클릭
    const plusClick = () =>{
        let copyHead = head;
        if(copyHead === 30){
            copyHead = 30;
        }else{
            copyHead++;
        }
        setHead(copyHead);
    }

    //마이너스 버튼 클릭
    const minusClick = () =>{
        let copyHead = head;
        if(copyHead === 1){
            copyHead = 1;
        }else{
            copyHead--;
        }
        setHead(copyHead);
    }


    //검색버튼 클릭여부
    const [search, setSearch] = useState(false);

    //날짜 필터링
    const [dateFilter, setDateFilter] = useState(false);
    //인원수 필터링
    const [headFilter, setHeadFilter] = useState([]);
    //필터링후 인덱스
    const [filterIndex, setFilterIndex] = useState([]);


    //wishArray에서 필터된 hotel의 인덱스 저장
    useEffect(() => {
        if (wishArray === 0) return;

        const filterIndex1 = [];
        for(let i=0;i<wishArray.length;i++){
            filterIndex1.push(i);
        }
        setFilterIndex(filterIndex1);
    },[wishArray]);

    console.log(filterIndex);

    //객실검색
    const searchClick = () =>{        
        //날짜검색 범위 안에 드는 배열
        // const dateArray = wishArray.filter(item=>(DayData[1] >= item.endDate && item.startDate >= DayData[0]) || (DayData[0] <= item.endDate && item.endDate <= DayData[1]) ? item :null);

        const dateArray = wishArray.filter((item)=>item.startDate <= DayData[1] && item.endDate >= DayData[0] ? item :null);

        console.log(dateArray);
        if(dateArray === null || dateArray.length === 0){
            setDateFilter(false);
            setHeadFilter([]);
            setSearch(true);
            return;
        }

        setDateFilter(true);

        const headArray = dateArray.filter(d=> wishOccupancy.some(w=>w.hotelName === d.hotelName && w.maxOccupancy >= head));

        if(headArray === null || headArray.length === 0){
            setHeadFilter([]);
            setSearch(true);
            return;
        }else{
            setHeadFilter(headArray);
        }       

        //wishArray에서 필터된 hotel의 인덱스 저장
        const filterIndex2 = wishArray.map((arr, index) =>
            headArray.some(item => item.h_code === arr.h_code) ? index : null
        ).filter(index => index !== null);

        setFilterIndex(filterIndex2);

        setSearch(true);
    }

    console.log(wishArray);

    const [dayClick, setDayClick] = useState(false);


    return(
        <div className="wish-wrap" onClick={()=>setCal(false)}>
            <section className="detail-wrap" style={{marginTop:'50px'}}>
                <div className="detail-content">
                    <div className="detail-left" ref={triggerRef}>                       
                        <div className="room-select" style={{borderTop:'0px'}}>
                            <p className='room-title wish'>찜한 목록 <span className='thirty'>※ 찜한 후 7일이 지난 호텔은 목록에서 자동삭제됩니다.</span>
                                <span className='del' onClick={()=>{
                                    setWish([]);
                                    Cookie.remove('wishList');
                                }}>전체 찜 삭제</span>
                            </p>
                            {search && !dateFilter
                            ?(
                                <div className="empty-room">
                                    <p className='x-icon'>
                                        <i className="fa-solid fa-xmark"></i>
                                    </p>
                                    <p className='empty-tit'>설정한 날짜에 부합하는 객실이 없습니다.</p>
                                    <p className='empty-txt'>예약날짜를 다시 설정해주세요.</p>
                                    <p className='empty-bottom'>아래 객실들은 설정한 날짜 외 다른 날짜에 투숙 가능한 객실입니다.</p>
                                </div>
                            ): search && dateFilter && headFilter.length === 0
                            ?(
                                <div className="empty-room">
                                    <p className='x-icon'>
                                        <i className="fa-solid fa-xmark"></i>
                                    </p>
                                    <p className='empty-tit'>설정한 인원에 부합하는 호텔이 없습니다.</p>
                                    <p className='empty-txt'>호텔별 투숙 가능 인원을 다시 확인해주세요.</p>
                                    <p className='empty-bottom'>아래 호텔들은 설정한 인원보다 투숙 가능한 인원이 적은 객실입니다.</p>
                                </div>
                            ) : null}

                            {(wishArray.length > 0 && WishAvg.length === wishArray.length) ? ( 
                                <ul>
                                    {(search && headFilter.length >= 1 ? headFilter : wishArray).map((item,index)=>(
                                        <li key={index}>
                                            <div className="room-left">
                                                <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)} >
                                                    <img src={`/img/${item.h_code}-1.jpg`} alt={item.hotelName} />
                                                </Link>
                                            </div>
                                            <div className="room-right">
                                                <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                                <div className="room-intro">
                                                    <div className="intro-left">
                                                        {wishStar[filterIndex[index]] && wishStar[filterIndex[index]]?.map((star, ind) => (
                                                            <img src={star} alt="roomScore" key={ind} />
                                                        ))}
                                                        <span className='starScore' style={{color:'#000'}}>
                                                            {/* {(WishAvg[filterIndex[index]]?.scoreAvg - Math.floor(WishAvg[filterIndex[index]]?.scoreAvg) === 0) ? WishAvg[filterIndex[index]]?.scoreAvg+'.0' : Math.trunc(WishAvg[filterIndex[index]]?.scoreAvg * 10) / 10} */}
                                                            {WishAvg[filterIndex[index]]?.scoreAvg != null && (
                                                                (WishAvg[filterIndex[index]].scoreAvg % 1 === 0)
                                                                    ? WishAvg[filterIndex[index]].scoreAvg + '.0'
                                                                    : Math.trunc(WishAvg[filterIndex[index]].scoreAvg * 10) / 10
                                                            )}

                                                        </span>
                                                        <span className='scoreCount'>{(WishAvg[filterIndex[index]]?.reviewCount)?.toLocaleString()}명 평가</span>
                                                    </div>
                                                    <div className="intro-right">
                                                        <button type='button' className='pay' onClick={()=>wishHandler(item.h_code)}>
                                                            찜 삭제하기<i className="fa-solid fa-angle-right"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="room-info">
                                                    <p><i className="fa-regular fa-calendar"></i> 예약가능일 : <span className='bold'>{new Date(item.startDate)?.toISOString().slice(0, 10)}~{new Date(item.endDate)?.toISOString().slice(0, 10)}</span></p>
                                                    <p><i className="fa-regular fa-clock"></i> 체크인 <span className='bold'>15:00</span> ~ 체크아웃 <span className='bold'>11:00</span></p>
                                                    <p><i className="fa-solid fa-user-group"></i> 최대 투숙객 수 : <span className='bold'>{wishMinMax.map(w=>w.hotelName===item.hotelName ? w.min:null)}~{wishMinMax.map(w=>w.hotelName===item.hotelName ? w.max:null)}명</span></p>
                                                    <p><i className="fa-solid fa-tag"></i> <span className='bold'>할인혜택 :</span>
                                                        <span className='red'>
                                                            {item.discount === 1 ? 
                                                                '10%할인 이벤트 중'
                                                            :
                                                                '회원가입시 10,000원 할인쿠폰'
                                                            }
                                                        </span>
                                                    </p>
                                                    <div className="room-pay">
                                                        {item.discount === 1 ? 
                                                            <>
                                                                <span className='origin-price'>{WishAvg[filterIndex[index]]?.minPrice.toLocaleString()}원</span>
                                                                <span className='final-price'>{(WishAvg[filterIndex[index]]?.minPrice - (WishAvg[filterIndex[index]]?.minPrice*0.1)).toLocaleString()}원<span>/1박</span></span>
                                                            </>                                                    
                                                        :                                                    
                                                            <>
                                                                <span className='final-price'>{WishAvg[filterIndex[index]]?.minPrice.toLocaleString()}원<span>/1박</span></span>
                                                            </>
                                                        }
                                                        <button type='button' className='cart' onClick={()=>wishHandler(item.h_code)}>
                                                            <i className="fa-solid fa-heart" style={
                                                            wish.find((item) => item.h_code === Number(item.h_code)) ?
                                                                {color:'#f94239'}
                                                            :
                                                                {color:'#6b6b6b'}
                                                            
                                                            }></i>
                                                        </button>
                                                        {/* <button type='button' className='cart'><i className="fa-solid fa-basket-shopping"></i></button> */}
                                                        <Link to={`/detail/${item.h_code}`} className='pay' onClick={() => window.scrollTo(0,0)}>상세보기</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ):(
                                <p className='room-empty'>찜한 목록이 없습니다.</p>
                            )}
                        </div>
                    </div>
                    <div className={`detail-right ${isFixed ? 'fixed' : null} wish`}>
                        {Cal &&
                            <div className="Cal" style={{position:'absolute',left:'-655px'}} onClick={ e =>{
                                setCal((Cal === true) ? true : false);
                                e.stopPropagation();
                            }}>
                                <Calendar/>
                            </div>
                        }
                        <div className="hotel-day" style={{marginTop:'37px'}}>
                            <p className='day-wrap'>
                                <span className='day-tit'>예약일</span>
                                <span className='day-txt'>{dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`) : ('예약날짜를 설정해주세요.')}</span>
                            </p>
                            <p className='day-wrap'>
                                <span className='day-tit'>종료일</span>
                                <span className='day-txt'>
                                    {dayClick === true ? (DayData.length < 2 ? `${year}-${month+1}-${date+1}` : `${DayData[1]}`) : ('예약날짜를 설정해주세요.')}
                                </span>
                            </p>
                            <button type='button' onClick={ e =>{
                                setCal((Cal === true) ? false : true);
                                setDayClick(true);
                                setSelectday([]);
                                e.stopPropagation();
                            }}>예약일 변경</button>
                        </div>
                        <div className="hotel-headcount">
                            <p className='head-tit'>투숙인원 선택</p>
                            <div className="head-select">
                                <span className='head-txt'>인원</span>
                                <div className="btns">
                                    <button type='button' onClick={minusClick} className={head === 1 ? 'die' : null} ><i className="fa-solid fa-minus"></i></button>
                                    <span>{head}</span>
                                    <button type='button' onClick={plusClick} className={head === 30 ? 'die' : null}><i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <button type='button' className='search' onClick={()=>{searchClick();setCal(false);}}>검색 적용</button>
                        </div>
                        <div className="hotel-select">
                            <p className='select-tit'>검색 전 참고사항</p>
                            <p className='select-txt'>· 검색 클릭전에는 찜을 추가하신 모든 호텔이 보여집니다.</p>
                            <p className='select-txt'>· 호텔별 <span className='bold'>예약가능 날짜</span>와 <span className='bold'>최대 투숙객 수</span>를  참고하셔서 검색 해주시기 바랍니다.</p>
                        </div>
                    </div>
                </div>               
            </section>
        </div>    
    )               
}