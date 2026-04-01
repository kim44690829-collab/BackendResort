import { useState,useEffect, use } from "react";
import { useContext } from "react";
import '../Page/Room.css'
import { ResortDataContext } from '../Api/ResortData';
import Calendar from "./Calendar";
import { Link } from "react-router-dom";
import LeafletMap from '../Api/LeafletMap';
import axios from "axios";

export default function Room(){
    // 가져오는 호텔, 개실 데이터
    const {HotelData,selectday,setSelectday,setSelectMonth,selectMonth,RoomData, hotelInput,hotelMerge, HotelRatingDate,townfilter2, setHotelInput, DayData,RatingAvgData,RatingData,ReviewData, hotelMinPrice,HotelPriceDate, setDayData,countryEn,cityEn,town,townfilter,setTown,
        serchHandler,dateFilter,setDateFilter,hotelSort,setHotelSort,myhotel,setmyhotel,wish,wishStar,wishArray,wishHandler, guestCount, setGuestCount} = useContext(ResortDataContext);
    //const {selectDate,setSelectDate,setSelectday} = useContext(calendarAuth)

        // console.log('hotelMinPrice', hotelMinPrice)
    /* console.log(selectDate) */
    /* 필터 목록 */
    const filter_publicService = [{id:1,name:'피트니스'},{id:2,name:'레스토랑'},{id:3,name:'사우나'},{id:4,name:'실내수영장'},{id:5,name:'야외수영장'},{id:6,name:'편의점'},{id:7,name:'바'},{id:8,name:'라운지'},{id:9,name:'엘리베이터'},{id:10,name:'비즈니스센터'},{id:11,name:'건조기'},{id:12,name:'탈수기'},{id:13,name:'바베큐'}]
    const filter_roomservice = [{id:14,name:'무선인터넷'},{id:15,name:'욕실용품'},{id:16,name:'에어컨'},{id:17,name:'드라이기'},{id:18,name:'샤워실'},{id:19,name:'냉장고'},{id:20,name:'TV'},{id:21,name:'객실내취사'},{id:22,name:'욕조'},{id:23,name:'금연'},{id:24,name:'전기주전자'},{id:25,name:'실내수영장'},{id:26,name:'개인콘센트'}]
    const filter_otherService = [{id:27,name:'스프링클러'},{id:28,name:'반려견동반'},{id:29,name:'카드결제'},{id:30,name:'짐보관가능'},{id:31,name:'개인사물함'},{id:32,name:'픽업서비스'},{id:33,name:'캠프파이어'},{id:34,name:'무료주차'},{id:35,name:'조식제공'}]
    /* 필터 된 목록 */
    const [myFilter,setMyfilter] = useState([])
    // 필터 된 호텔 항목
    const [myhotel03,setmyhotel03] = useState([])
    const [myhotel02,setmyhotel02] = useState([])
    //가격 필터의 값
    const [minPrice,setMinPrice] = useState(0)
    const [maxPrice,setMaxPrice] = useState(300000)
    

    //달력을 여닫기 위한 변수
    const [openC,setOpenC]=useState(false)
    useEffect(() => {
        const thisyear = new Date().getFullYear()
        const thisMonth = new Date().getMonth()
        const thisDate = new Date().getDate()
        const formatted = thisyear + "-" + String(thisMonth + 1).padStart(2, "0") + "-" + String(thisDate).padStart(2, "0");
        const formatted2 = thisyear + "-" + String(thisMonth + 1).padStart(2, "0") + "-" + String(thisDate+1).padStart(2, "0");
        if(selectday.length !== 2|| (selectMonth.getMonth() < thisMonth && selectday.length === 2)|| selectMonth.getFullYear() < thisyear){
            setDayData([`${formatted}`,`${formatted2}`])
            setSelectMonth(new Date())
            setSelectday([`${formatted}`,`${formatted2}`])
        }else if(selectday.length === 2){
            setSelectMonth(new Date(`${selectday[0].slice(0,7)}-01`))
        }
        
    },[openC])

    const [test,setTest] = useState('ㅋㅋ')
    //검색어 한국어 , 영문으로 변환

    // 호텔 input 아래 모달 상태변수
    const [isInput, setIsInput] = useState(false);
   
    useEffect(() => {
        console.log('myhotel02@@@@@@@@@@@@@@@@', myhotel02.length)
        console.log('myhotel02@@@@@@@@@@@@@@@@', myhotel02)
    },[myhotel02])
  

    //const [dateFilter,setDateFilter] = useState([])
    //날짜에 따른 목록 필터
    useEffect(()=>{
        let dateFilterCopy = [...dateFilter]
        let imsi ;
        //const townfilter = HotelData.filter((f)=>f.city===cityEn || f.country===countryEn)
        // console.log("cityEn00",cityEn)
        // console.log("countryEn00",countryEn)
        if(cityEn===null && countryEn ===null){
            dateFilterCopy = hotelMerge.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]) || (DayData[0]>=f.startDate && DayData[1]<=f.endDate))
            imsi = HotelData.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]) || (DayData[0]>=f.startDate && DayData[1]<=f.endDate))
        }else{
            dateFilterCopy = townfilter.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]) || (DayData[0]>=f.startDate && DayData[1]<=f.endDate))
            imsi = townfilter2.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]) || (DayData[0]>=f.startDate && DayData[1]<=f.endDate))
        }
        setmyhotel03(imsi)
        setDateFilter(dateFilterCopy)
        // console.log("dateFilterCopy",dateFilterCopy)
        // console.log("DayData",DayData)
        
    },[DayData,cityEn,countryEn])
    
    useEffect(()=>{
        //console.log(myFilter,'현재 마이필터')
        //console.log(myhotel,'현재 마이호텔')
        const myFilterCopy = [...myFilter] // 선택한 서비스 목록이 담길 변수
        const selectfilter01 = myFilterCopy.filter((f)=>f.id>0 && f.id <14) // publicService 항목 구분
        const selectfilter02 = myFilterCopy.filter((f)=>f.id>13 && f.id <27) // roomservice 항목 구분
        const selectfilter03 = myFilterCopy.filter((f)=>f.id>26 && f.id <=35) // otherService 항목 구분

        const hotelmap = myhotel03.map((hotel03) => {
            const match = dateFilter.find(
                (hotel02) => hotel02.h_code === hotel03.h_code
            )

            return match ? { ...hotel03, ...match } : hotel03
        })
        const personfilter = hotelmap.filter((f)=> f.hotelMaxOccupancy >= guestCount);
        const filterHotel = personfilter.filter((data)=>{ // 각 항목별로 만족하는것 필터링
            const f1 = selectfilter02.every((filter)=>data.roomservice.includes(filter.name)); 
            const f2 = selectfilter01.every((filter)=>data.publicservice.includes(filter.name)); 
            const f3 = selectfilter03.every((filter)=>data.otherservice.includes(filter.name));
            return f1&&f2&&f3
        })
        //위의 필터에서 가격이 포함하는 것만 필터링
        const pricefilter = filterHotel.filter((f)=>f.minPrice > minPrice && f.minPrice<=maxPrice) 
    
        

        // console.log("pricefilter",pricefilter)
        let sorted;
        if(hotelSort===1){
            HotelRatingDate.sort((a,b) => a.r_h_code - b.r_h_code)
            sorted =pricefilter.sort((a,b) => a.h_code - b.h_code)
        }else if(hotelSort===2){
            /* HotelRatingDate.sort((a,b) => b.h_rating - a.h_rating)
            console.log(HotelRatingDate)
            sorted = HotelRatingDate.map((item2) => {
                return pricefilter.find((item1) => item1.h_code === item2.r_h_code)
            }).filter(Boolean) */
            sorted =pricefilter.sort((a,b) => b.hotelAvgScore - a.hotelAvgScore)
        }else if(hotelSort===3){
            
            sorted =pricefilter.sort((a,b) => a.hotelAvgScore - b.hotelAvgScore)
        }else if(hotelSort===4){
            sorted =pricefilter.sort((a,b) => b.minPrice - a.minPrice)
        }else{
            sorted =pricefilter.sort((a,b) => a.minPrice - b.minPrice)
        }
        // console.log("pricefilter",pricefilter)

        if( DayData.length===2 && openC === false){
            setmyhotel02(sorted)
            // console.log(myhotel02.length,"랭스확인")
        }
        

    },[myFilter,minPrice,maxPrice,hotelSort,dateFilter,DayData,myhotel])

    // range 에서 최소값이 - 로 넘어가는것돠 최댓값이 최댓값을 초과하는것을 막는 로직
    useEffect(()=>{
        if(minPrice<0){
            setMinPrice(0)
            setMaxPrice(10000)
        }

        if(maxPrice>300000){
            setMaxPrice(300000)
            setMinPrice(290000)
        }
        // console.log(myhotel02)
    },[minPrice,maxPrice])

    

    /* 필터의 항목 클릭시 적용 함수 */
    const filterHandeler=(item)=>{
        const myFilterCopy = [...myFilter]
        //console.log(myFilterCopy.findIndex((myFilterCopy)=>myFilterCopy.id === item.id))
        if(myFilterCopy.findIndex((myFilterCopy)=>myFilterCopy.id === item.id) === -1){// 중복 확인용
            myFilterCopy.push(item)
            setMyfilter(myFilterCopy)
        }else{
            const filtering = myFilterCopy.filter((f)=>f.id !== item.id)
            // console.log(myFilterCopy)
            // console.log(item)
            setMyfilter(filtering)
        }
        
        // console.log(HotelData[0].roomservice)
        //console.log(myFilter,'추가 직후 마이필터')
    }


    /* 필터 해제 함수 */
    const removeFilter =(item)=>{
        const myFilterCopy = [...myFilter]
        const dleFilter = myFilterCopy.filter((myFilterCopy)=>myFilterCopy.id !== item.id) // filter을 이용한 삭제
        setMyfilter(dleFilter)
        //console.log(myFilter,'삭제 직후 마이필터')
    }

    //정렬 함수
    const sortHandeler =(num)=>{
        if(num===1){
            setHotelSort(1)
        }else if(num===2){
            setHotelSort(2)
        }else if(num===3){
            setHotelSort(3)
        }else if(num===4){
            setHotelSort(4)
        }else{
            setHotelSort(5)
        }
    }
    // 가격 최솟값 최대값 조정 함수
    const rangeHandler01 =(e)=>{
        
        if(maxPrice-minPrice<10000){
            setMinPrice(maxPrice-10000)
            setMaxPrice(minPrice+10000)
        }else{
            setMinPrice(Number(e.target.value))
        }
    }
    const rangeHandler02 =(e)=>{
        
        if(maxPrice-minPrice<10000){
            setMinPrice(maxPrice-10000)
            setMaxPrice(minPrice+10000)
        }else{
            setMaxPrice(Number(e.target.value))
        }
    }
    
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    // 검색어 입력한것 저장
    const townHandler =(e)=>{
        setTown(e.target.value)
    }
    
    const closeUl1 = (e) => {
        if (!e.target.closest('.hotelModal')) {
            setIsInput(false);
        }
        if (!e.target.closest('.calenderWrap')) {
            setOpenC(false);
        } 
        
    }

    // 이미지 배너
    const [currentImg, setCurrent] = useState(0);
    const RoomBennerImg = ['/eventbenner/spring.jpg','/eventbenner/summer.jpg','/eventbenner/fall.jpg','/eventbenner/winter.jpg'];

    useEffect(() => {
        const current = setInterval(() => {
            if(currentImg < 3){
                setCurrent(currentImg + 1)
            }else{
                setCurrent(0)
            }
        }, 3000);
        return(() => {clearInterval(current)});
    },[currentImg])

    return(
        <>
          
        <div className="Room_wrap" onClick={closeUl1}>
            {/* 상품 메뉴영역 */}
            <div className="Room_section">
                <div className="serch_box">
                    <div className='hotelModal'>
                        <input type="text" placeholder="도시나 나라를 검색해주세요 ex)파리,속초" className="city_name" onClick={() => setIsInput(true)} onChange={(e)=>townHandler(e)} value={town}/>
                        {/* input 클릭시 나오는 순위 */}
                        {isInput &&
                        <>
                            <ul className='rankBoxRoom'>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoMainRoom'>국내</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('서울')}>서울</li>
                                <li className='rankNameRoom' onClick={() => setTown('부산')}>부산</li>
                                <li className='rankNameRoom' onClick={() => setTown('강릉')}>강릉</li>
                                <li className='rankNameRoom' onClick={() => setTown('속초')}>속초</li>
                                <li className='rankNameRoom' onClick={() => setTown('경주')}>경주</li>
                                <li className='rankNameRoom' onClick={() => setTown('여수')}>여수</li>
                                <li className='rankNameRoom' onClick={() => setTown('대전')}>대전</li>
                                <li className='rankNameRoom' onClick={() => setTown('광주')}>광주</li>
                                <li className='rankNameRoom' onClick={() => setTown('제주')}>제주</li>
                                <li className='rankNameRoom' onClick={() => setTown('포항')}>포항</li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoMainRoom'>해외</span>
                                </li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoRoom'>일본</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('도쿄')}>도쿄</li>
                                <li className='rankNameRoom' onClick={() => setTown('삿포로')}>삿포로</li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoRoom' >미국</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('로스앤젤레스')}>로스앤젤레스</li>
                                <li className='rankNameRoom' onClick={() => setTown('뉴욕')}>뉴욕</li>
                                <li className='rankNameRoom' onClick={() => setTown('괌')}>괌</li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoRoom'>중국</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('장가계')}>장가계</li>
                                <li className='rankNameRoom' onClick={() => setTown('상하이')}>상하이</li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoRoom'>이탈리아</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('로마')}>로마</li>
                                <li className='rankNameRoom' onClick={() => setTown('베네치아')}>베네치아</li>
                                <li className='rankBoxLiRoom'>
                                    <span className='inputInfoRoom'>프랑스</span>
                                </li>
                                <li className='rankNameRoom' onClick={() => setTown('파리')}>파리</li>
                            </ul>
                        </>}
                    </div>
                    <div className="calenderWrap">
                        <button type='button' onClick={(e) => {setOpenC(true)}} style={{border:!openC?'2px solid #42799b55':'2px solid #7ED6E4'}} className='calenertBtn'>
                            <i className="fa-solid fa-calendar" style={{color:!openC?'#42799b55':'#7ED6E4'}}></i>
                            <span style={{marginRight:'5px'}}>{DayData.length < 2 ? '일정을 선택해 주세요': `${DayData[0]} - ${DayData[1]}`}</span>
                        </button>
                        <button type="button" className="serch_btn" onClick={()=>{serchHandler(),setOpenC(false)}}>검색하기</button>
                        {openC && 
                        <div className="calendar_box" onClick={(e) => {setOpenC(true);e.stopPropagation();}}>
                            <Calendar/>
                        </div>
                        }
                    </div>
                </div>
                {/* 상단 필터 영역 */}
                <div className="filter_menu">
                    <div className="left_filter">
                        <div className="filter01">
                            <h4 className="filter_tag">객내시설</h4>
                            {filter_roomservice.map((item,index)=>(
                                <button key={index} className="fil_btn" type="button" onClick={()=>filterHandeler(item)} style={{border:myFilter.findIndex((f)=>f.id===item.id) !== -1?'1px solid #42799b':'1px solid #ccc'}}>
                                    {item.name === '무선인터넷' ? <i className="fa-solid fa-wifi" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>무선인터넷</span></i> 
                                    : item.name === '욕실용품' ? <i className="fa-solid fa-soap" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>욕실용품</span></i> 
                                    : item.name === '샤워실' ? <i className="fa-solid fa-shower" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>샤워실</span></i> 
                                    : item.name === 'TV' ? <i className="fa-solid fa-tv" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>텔레비전</span></i> 
                                    : item.name === '실내수영장' ? <i className="fa-solid fa-water-ladder" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>실내수영장</span></i> 
                                    : item.name === '욕조' ? <i className="fa-solid fa-bath" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>욕조</span></i> 
                                    : item.name === '객실내취사' ? <i className="fa-solid fa-kitchen-set" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>객실내취사</span></i> 
                                    : item.name === '금연' ? <i className="fa-solid fa-ban-smoking" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>금연</span></i> 
                                    : item.name === '에어컨' ? <i className="fa-solid fa-fan" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>에어컨</span></i> 
                                    : item.name === '드라이기' ? <i className="fa-solid fa-wind" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>드라이기</span></i> 
                                    : item.name === '냉장고' ? <i className="fa-solid fa-snowflake" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>냉장고</span></i> 
                                    : item.name === '개인콘센트' ? <i className="fa-solid fa-plug" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>개인콘센트</span></i> 
                                    : item.name === '전기주전자' ? <i className="fa-solid fa-blender" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>전기주전자</span></i>
                                    :null}
                                </button>
                            ))}
                        </div>
                        <div className="filter01">
                            <h4 className="filter_tag">공용시설</h4>
                            {filter_publicService.map((item,index)=>(
                                <button key={index} className="fil_btn" type="button" onClick={()=>filterHandeler(item)} style={{border:myFilter.findIndex((f)=>f.id===item.id) !== -1?'1px solid #42799b':'1px solid #ccc'}}>
                                    {item.name === '피트니스' ? <i className="fa-solid fa-dumbbell" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>피트니스</span></i>  
                                    : item.name === '레스토랑' ? <i className="fa-solid fa-utensils" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>레스토랑</span></i> 
                                    : item.name === '사우나' ? <i className="fa-solid fa-hot-tub-person" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>사우나</span></i> 
                                    : item.name === '실내수영장' ? <i className="fa-solid fa-water-ladder" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>실내수영장</span></i> 
                                    : item.name === '야외수영장' ? <i className="fa-solid fa-person-swimming" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>야외수영장</span></i> 
                                    : item.name === '편의점' ? <i className="fa-solid fa-store" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>편의점</span></i> 
                                    : item.name === '바' ?  <i className="fa-solid fa-wine-glass" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>바</span></i> 
                                    : item.name === '라운지' ? <i className="fa-solid fa-couch" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>라운지</span></i> 
                                    : item.name === '엘리베이터' ? <i className="fa-solid fa-elevator" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>엘리베이터</span></i> 
                                    : item.name === '비즈니스센터' ? <i className="fa-solid fa-briefcase" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>비즈니스센터</span></i> 
                                    : item.name === '건조기' ? <i className="fa-solid fa-sun" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>건조기</span></i>
                                    : item.name === '탈수기' ? <i className="fa-solid fa-droplet" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>탈수기</span></i>  
                                    : item.name === '바베큐' ? <i className="fa-solid fa-drumstick-bite" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>바베큐</span></i> 
                                    : null}
                                </button>
                            ))}
                        </div>
                        <div className="filter01">
                            <h4 className="filter_tag">기타시설</h4>
                            {filter_otherService.map((item,index)=>(
                                <button key={index} className="fil_btn" type="button" onClick={()=>filterHandeler(item)} style={{border:myFilter.findIndex((f)=>f.id===item.id) !== -1?'1px solid #42799b':'1px solid #ccc'}}>
                                    {item.name === '스프링클러' ? <i className="fa-solid fa-fire-extinguisher" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>스프링클러</span></i> 
                                    : item.name === '반려견동반' ? <i className="fa-solid fa-dog" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>반려견동반</span></i> 
                                    : item.name === '카드결제' ? <i className="fa-regular fa-credit-card" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>카드결제</span></i> 
                                    : item.name === '짐보관가능' ? <i className="fa-solid fa-cart-flatbed-suitcase" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>짐보관가능</span></i> 
                                    : item.name === '개인사물함' ? <i className="fa-solid fa-lock" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>개인사물함</span></i> 
                                    : item.name === '픽업서비스' ? <i className="fa-solid fa-taxi" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>픽업서비스</span></i> 
                                    : item.name === '캠프파이어' ?  <i className="fa-solid fa-campground" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>캠프파이어</span></i> 
                                    : item.name === '무료주차' ? <i className="fa-solid fa-square-parking" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>무료주차</span></i> 
                                    : item.name === '조식제공' ? <i className="fa-solid fa-bowl-food" style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#ccc'}}> <span style={{color:myFilter.findIndex((f)=>f.id===item.id) !== -1?'#42799b':'#777',fontWeight:myFilter.findIndex((f)=>f.id===item.id) !== -1?700:400}}>조식제공</span></i> 
                                    : null}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="right_filter">
                        <div className="under_filter">
                            <div className="map" style={{overflow:'hidden', borderRadius:'15px'}}>
                                <img src={RoomBennerImg[currentImg]} className='RoomBennerImg'/>    
                            </div>
                        </div>
                        <div className="top_filter">
                            <div className="price_filter">
                                <h1 style={{marginTop:'10px',fontWeight:600}}>가격 필터</h1>
                                <div className="price_slide">
                                    <div className="price_inner" style={{left:`${minPrice/300000*100}%`,right:`${100-(maxPrice/300000)*100}%`}}></div>
                                    <input type="range" min='0' max='300000' value={minPrice} onChange={(e)=>rangeHandler01(e)} className="slide_input" step={10000}/>
                                    <input type="range" min='0' max='300000' value={maxPrice} onChange={(e)=>rangeHandler02(e)} className="slide_input" step={10000}/>
                                </div>
                                
                                <div className="minprice">
                                    <p className="price_txt">최소금액</p>
                                    <input className="price_input" type="text" value={`${minPrice.toLocaleString()}`} placeholder="최소금액" onChange={(e)=>setMinPrice(e.target.value)}/>
                                    <span>원</span>
                                </div>
                                <div className="maxprice">
                                    <p className="price_txt">최대금액</p>
                                    <input className="price_input" type="text" value={`${maxPrice.toLocaleString()}`} placeholder="최대금액" onChange={(e)=>setMaxPrice(e.target.value)}/>
                                    <span>원</span>
                                </div>
                            </div>
                            <div className="reset">
                                <button type="button" onClick={()=>{setMyfilter([]),setMaxPrice(300000),setMinPrice(0)}} className="reset_btn"><i className="fa-solid fa-arrow-rotate-right"></i><span className="resettxt"> 필터 초기화</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 중단 정렬 영역 */}
                <div className="arr_menu">
                    <span className="arr_total">총 {myhotel02.length}개</span>
                    <ul className="arr_group">
                        <li className="arr_list" onClick={()=>{sortHandeler(1)}} style={{color:hotelSort===1?'white':'#ccc',fontWeight:hotelSort===1?600:400}}>추천수</li>
                        <li className="arr_list" onClick={()=>{sortHandeler(2),console.log(myhotel02,"myhotel02확인용")}} style={{color:hotelSort===2?'white':'#ccc',fontWeight:hotelSort===2?600:400}}>높은평점순</li>
                        <li className="arr_list" onClick={()=>sortHandeler(3)} style={{color:hotelSort===3?'white':'#ccc',fontWeight:hotelSort===3?600:400}}>낮은평점순</li>
                        <li className="arr_list" onClick={()=>sortHandeler(4)} style={{color:hotelSort===4?'white':'#ccc',fontWeight:hotelSort===4?600:400}}>높은가격순</li>
                        <li className="arr_list" onClick={()=>sortHandeler(5)} style={{color:hotelSort===5?'white':'#ccc',fontWeight:hotelSort===5?600:400}}>낮은가격순</li>
                    </ul>
                </div>
                {/* 방정보 영역 */}
                <div className="room_menu">
                    <ul className="room_product">
                        {myhotel02.length !== 0?myhotel02.map((item,index)=>{
                            const otherService01 = JSON.parse(item.otherservice);
                            const publicService01 = JSON.parse(item.publicservice);
                            const roomservice01 = JSON.parse(item.roomservice);
                            const star = HotelRatingDate.filter((f)=>f.r_h_code === item.h_code)
                            return(
                                <>
                                    <li key={item.h_code} className="room_list">
                                        <Link to={`/detail/${item.h_code}` } onClick={() => window.scrollTo(0, 0)}>
                                        <div className="img_box"><img src={`/img/${item.h_Img}`} alt={`${item.h_Img}이미지`} className="hotelimg"/></div>
                                        </Link>
                                        <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0, 0)}> {/*링크 클릭시 윈도우 최상단으로 이동*/}
                                        <div className="room_info">
                                            <h2 className="menu_title">{item.hotelName}</h2>
                                            <p className="menu_city">
                                                {item.city === 'Sokcho'?'대한민국, 강원도 속초시':item.city === 'Gyeongju'?'대한민국, 경상북도 경주시':item.city === 'Busan'?'대한민국, 부산시':item.city === 'Gangneung'?'대한민국, 강원도 강릉시':item.city === 'Yeosu'?'대한민국, 전라남도 여수시':item.city === 'Daejeon'?'대한민국, 대전시':item.city === 'Gwangju'?'대한민국, 광주시':item.city === 'Jeju'?'대한민국, 제주도':item.city === 'Pohang'?'대한민국, 경상북도 포항시':item.city === 'Seoul'?'대한민국, 서울시':item.city === 'Tokyo'?'일본, 도쿄':item.city === 'Sapporo'?'일본, 훗카이도 삿포로':item.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':item.city === 'New York'?'미국, 뉴욕':item.city === 'Guam'?'미국, 괌':item.city === 'Zhangjiajie'?'중국, 후난성 장가계':item.city === 'Shanghai'?'중국, 상하이':item.city === 'Rome'?'이탈리아, 로마':item.city === 'Venice'?'이탈리아, 베네치아':item.city === 'Paris'?'프랑스, 파리':null}
                                            </p>
                                            <p className="menu_score"><i className="fa-solid fa-star" style={{lineHeight:'12px'}}></i> 
                                            {/* {HotelRatingDate[item.h_code-1]===undefined?0: (HotelRatingDate[item.h_code-1].h_rating - Math.floor(HotelRatingDate[item.h_code-1].h_rating) === 0) ? HotelRatingDate[item.h_code-1].h_rating+'.0' : Math.trunc((HotelRatingDate[item.h_code-1].h_rating) * 10) / 10 }점</p> */}
                                            {star[0]?.h_rating===undefined?0:Math.floor(star[0]?.h_rating*10)/10}점</p>
                                            
                                            <div className="service_list">
                                                <p style={{marginBottom:'10px'}}>
                                                    기타시설: 
                                                    {otherService01.map((item,index)=>(
                                                        <span key={index} className="service_item" style={{color:myFilter.findIndex((f)=>f.name===item)>=0?'#42799b':'#333',fontWeight:myFilter.findIndex((f)=>f.name===item)>=0?600:400}}>
                                                            {item === '스프링클러' ? '#스프링클러' : item === '반려견동반' ? '#반려견동반': item === '카드결제' ?'#카드결제': item === '짐보관가능' ?'#짐보관가능': item === '개인사물함' ?'#개인사물함' : item === '픽업서비스' ?'#픽업서비스' : item === '캠프파이어' ? '#캠프파이어' : item === '무료주차' ? '#무료주차': item === '조식제공' ? '#조식제공' : null}
                                                        </span>
                                                    ))}
                                                </p>
                                                <p style={{marginBottom:'10px'}}>
                                                    공용시설: 
                                                    {publicService01.map((item,index)=>(
                                                        <span key={index} className="service_item" style={{color:myFilter.findIndex((f)=>f.name===item)>=0?'#42799b':'#333',fontWeight:myFilter.findIndex((f)=>f.name===item)>=0?600:400}}>
                                                            {item === '피트니스' ? '#피트니스': item === '레스토랑' ?'#레스토랑': item === '사우나' ?'#사우나' : item === '실내수영장' ?'#실내수영장': item === '야외수영장' ?'#야외수영장' : item === '편의점' ? '#편의점' : item === '바' ? '#바' : item === '라운지' ? '#라운지': item === '엘리베이터' ?'#엘리베이터' : item === '비즈니스센터' ?'#비즈니스센터': item === '건조기' ? '#건조기' : item === '탈수기' ?'#탈수기': item === '바베큐' ? '#바베큐' : null}
                                                        </span>
                                                    ))}
                                                </p>
                                                <p style={{}}>
                                                    객내시설: 
                                                    {roomservice01.map((item,index)=>(
                                                        <span key={index} className="service_item" style={{color:myFilter.findIndex((f)=>f.name===item)>=0?'#42799b':'#333',fontWeight:myFilter.findIndex((f)=>f.name===item)>=0?600:400}}>
                                                            {item === '무선인터넷' ? '#무선인터넷': item === '욕실용품' ?'#욕실용품': item === '샤워실' ?'#샤워실' : item === 'TV' ?'#텔레비전': item === '실내수영장' ?'#실내수영장' : item === '욕조' ?'#욕조': item === '객실내취사' ? '#객실내취사' : item === '금연' ? '#금연': item === '에어컨' ?'#에어컨': item === '드라이기' ? '#드라이기': item === '냉장고' ?'#냉장고' : item === '개인콘센트' ? '#개인콘센트' : item === '전기주전자' ? '#전기주전자':null}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                            
                                            <p className="menu_discount">
                                                {item.discount===1?
                                                <span className="disC">
                                                    <span className="s_box">10%할인</span>
                                                    <span className="p_box">{item?.minPrice.toLocaleString()}원</span>
                                                </span>
                                                :
                                                <span className="coupon">회원가입시 10,000원 할인쿠폰</span>
                                                }
                                            </p>
                                            <p className="menu_price">{item.discount===1?Math.floor(item?.minPrice*0.9).toLocaleString():(Math.floor(item?.minPrice)).toLocaleString()}원</p>
                                            
                                            
                                        </div>
                                        </Link>
                                        <button type='button' onClick={()=>wishHandler(item.h_code)} className="menu_wishbtn">
                                            <i className="fa-solid fa-heart" style={
                                            wish.find((items) => items.h_code === Number(item.h_code)) ?
                                                {color:'#f94239'}
                                            :
                                                {color:'#6b6b6b'}
                                            
                                            }></i>
                                        </button>
                                    </li>
                                </>
                            )
                            
                            })
                            : <h2 style={{textAlign:'center',fontSize:'20px',fontWeight:600,marginTop:'100px',marginBottom:"150px",borderBottom:"1px solid #ccc",paddingBottom:"100px"}}>{DayData.length<2?'원하시는 일자를 선택해 주세요':'검색된 상품이 없습니다.'}</h2>}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}