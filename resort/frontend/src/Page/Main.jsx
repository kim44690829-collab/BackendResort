import '../Page/Main.css';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ResortDataContext } from '../Api/ResortData';
import 'leaflet/dist/leaflet.css';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';

export default function Main(){    
    /// 2026-03-27 오후 2번째 병합
    // 호텔, 객실데이터 useContext로 가져오는 훅
    const {setSelectMonth, 
        hotelMerge, HotelData, hotelRatingAvgData, setListType, setRender,render, selectday,setSelectday,selectMonth,
        DayData, setDayData,town,setTown,serchHandler, wish, wishHandler,cityEn,countryEn,dateFilter,setDateFilter,townfilter, guestCount, setGuestCount} = useContext(ResortDataContext);

    // 달력
    const [openC, setOpenC] = useState(false)
    useEffect(()=>{
        const thisyear = new Date().getFullYear()
        const thisMonth = new Date().getMonth()
        const thisDate = new Date().getDate()
        const selyear = selectMonth.getFullYear()
        const selmonth = selectMonth.getMonth()
        const formatted = thisyear + "-" + String(thisMonth + 1).padStart(2, "0") + "-" + String(thisDate).padStart(2, "0");
        const formatted2 = thisyear + "-" + String(thisMonth + 1).padStart(2, "0") + "-" + String(thisDate+1).padStart(2, "0");
        if(selectday.length !== 2 || (selmonth < thisMonth && selectday.length === 2) || selyear < thisyear || (selyear === thisyear && new Date(selectday[0]).getMonth() === thisMonth && new Date(selectday[0]).getDate()<thisDate)){
            setDayData([`${formatted}`,`${formatted2}`])
            setSelectMonth(new Date(thisyear,thisMonth,thisDate))
            setSelectday([`${formatted}`,`${formatted2}`])
        }else if(selectday.length === 2  && thisMonth===selmonth){
            setSelectMonth(new Date(thisyear,thisMonth,thisDate))
        }
    },[openC])

    const navigate = useNavigate();
    // 호텔 input 아래 모달 상태변수
    const [isInput, setIsInput] = useState(false);
    
    // 관광지 클릭시 모달
    const [RatingModalOpen, setRatingModalOpen] = useState(null);
    const [RatingModalOpen2, setRatingModalOpen2] = useState(0);
    // 도시별 호텔을 담을 변수
    const [cityAndHotel, setCityAndHotel] = useState([]);

    // 슬라이드 상태저장 변수
    // 인기 호텔 슬라이드
    const [slideMove1, setSlideMove1] = useState(0)
    // 관광명소 슬라이드
    const [slideMove2, setSlideMove2] = useState(0)
    
    // 중간 배너 슬라이드
    const [slideMove3, setSlideMove3] = useState(0)

    

    // 호텔 타입별 분류 / 마스크
    const [hotelTypeMask, setHotelTypeMask] = useState(null);
    // 호텔 타입 클릭시 모달
    const [htypeModalOpen, sethTypeModalOpen] = useState(null);
    const [htypeModalOpen2, sethTypeModalOpen2] = useState(0);
    // 타입별 호텔을 담을 변수
    const [typeAndHotel, setTypeAndHotel] = useState([]);
    // 해외 호텔 담을 변수
    const [overseasHotel, setOverSeasHotel] = useState([])
    // 해외 호텔 최소값을 찾기위한 변수
    // const [minPrice, setMinPrice] = useState([]);
    // 국내
    const [internalHotel, setInternalHotel] = useState([])

    const [hotelSale, setHotelSale] = useState([])

    //호텔별점 이미지
    const [hotelStar, setHotelStar] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setRender(!render);
    },[])
    

    /* useEffect(()=>{
        setSelectMonth(new Date('2026-03-01'))
    },[]) */

    // const discountHotel = hotelMerge.filter(item => item.)
    // 호텔 해외 필터
    useEffect(() => {
        if (!hotelMerge || hotelMerge.length === 0 || !HotelData || HotelData.length === 0) return
        const discountHotel = HotelData.filter(item => item.discount === 1);
        // const overseasRate = [...discountHotel].sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
        setHotelSale(discountHotel)
    },[hotelMerge])

    // 호텔 유형별로 접근하기 위한 사진 map돌리기 위한 오브젝트 배열
    const hotelType = [
        {id:1, image:'/mainImg/a-1.jpg', typeName: '호텔'},
        {id:2, image:'/mainImg/a-2.jpg', typeName: '리조트'},
        {id:3, image:'/mainImg/a-3.jpg', typeName: '콘도'},
        {id:4, image:'/mainImg/a-4.jpg', typeName: '게스트 하우스'},
        {id:5, image:'/mainImg/a-5.jpg', typeName: '캠핑'},
    ];

    // 관광명소 map돌리기 위한 오브젝트 배열
    const popularRating = [
        {id:1, image:'/mainImg/b-1.jpg', cityNameE:'Seoul', cityName: '서울', cityInfo:'전통 문화유산과 현대적인 도시 문화가 한곳에 공존하는 도시!'},
        {id:2, image:'/mainImg/c-1.jpg', cityNameE:'Jeju', cityName: '제주도', cityInfo:'아름다운 자연경관과 휴양·체험 관광을 동시에 즐길 수 있는 섬!'},
        {id:3, image:'/mainImg/d-1.jpg', cityNameE:'Busan', cityName: '부산', cityInfo:'바다와 도심이 어우러진 해양 관광! 맛있는 먹거리까지!'},
        {id:4, image:'/mainImg/e-1.jpg', cityNameE:'Sapporo', cityName: '삿포로', cityInfo:'사계절 뚜렷한 자연! 특히 겨울의 축제는 일품!'},
        {id:5, image:'/mainImg/f-1.jpg', cityNameE:'New York', cityName: '뉴욕', cityInfo:'세계적인 문화·예술·엔터테인먼트를 경험할 수 있습니다!'},
        {id:6, image:'/mainImg/g-1.jpg', cityNameE:'Paris', cityName: '파리', cityInfo:'한 도시에 역사적인 건축물과 예술적 분위기를 한번에!'},
    ];

    // 호텔 해외 필터
    useEffect(() => {
        if (!hotelMerge || hotelMerge.length === 0) return
        const overseas = hotelMerge.filter(item => item.country !== 'Korea');
        const overseasRate = [...overseas].sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
        setOverSeasHotel(overseasRate)
        console.log('#################################',overseasHotel)
    },[hotelMerge])

    // 호텔 국내 필터
    useEffect(() => {
        if (!hotelMerge || hotelMerge.length === 0) return
        const internal = hotelMerge.filter(item => item.country === 'Korea');
        const internalHotelSort =internal.sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
        setInternalHotel(internalHotelSort)
    },[hotelMerge])

    // 호텔 타입 모달 - map
    useEffect(() => {
        if (!hotelMerge || hotelMerge.length === 0) return
        const hotel_modal1 = hotelMerge.filter((item) => 
            (item.type === 'Hotel' ? '호텔' : 
            item.type === 'Resort' ? '리조트' : 
            item.type === 'Condo' ? '콘도' : 
            item.type === 'GuestHouse' ? '게스트 하우스' : 
            item.type === 'Camping' ? '캠핑' : 
            null ) === hotelType[htypeModalOpen2].typeName)
            const hotelTypeRating = hotel_modal1.sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
        setTypeAndHotel(hotelTypeRating)
    }, [htypeModalOpen, hotelMerge])

        

    // 지역별 호텔 모달 - map
    useEffect(() => {
        if (!hotelMerge || hotelMerge.length === 0) return
        const hotel_modal2 = hotelMerge.filter((item) => 
            (item.city === 'Seoul' ? '서울' : 
            item.city === 'Jeju' ? '제주도' : 
            item.city === 'Busan' ? '부산' : 
            item.city === 'Sapporo' ? '삿포로' : 
            item.city === 'New York' ? '뉴욕' : 
            item.city === 'Paris' ? '파리' : 
            null ) === popularRating[RatingModalOpen2].cityName)
            const hotelCityRating = hotel_modal2.sort((a,b) => b.hotelAvgScore - a.hotelAvgScore);
        setCityAndHotel(hotelCityRating)
    }, [RatingModalOpen, hotelMerge])
    
    // 버튼을 클릭한 횟수를 저장하는 상태변수
    const [btnCount1, setBtnCount1] = useState(0);
    const [btnCount2, setBtnCount2] = useState(0);
    const [btnCount3, setBtnCount3] = useState(0);

    // 왼쪽, 오른쪽을 클릭했을때 조건을 만족하면 버튼을 없애는 함수
    const handleRightClick = (num) => {
        if(btnCount1 < 8 && num === 1){
            setBtnCount1(prev => prev + 1)
        }else if(btnCount2 < 3 && num === 2){
            setBtnCount2(prev => prev + 1)
        }else if(btnCount3 < 9 && num === 3){
            setBtnCount3(prev => prev + 1)
        }else{
            null
        }
    }

    const handleLeftClick = (num) => {
        if(btnCount1 > 0 && num === 1){
            setBtnCount1(prev => prev - 1)
        }else if(btnCount2 > 0 && num === 2){
            setBtnCount2(prev => prev - 1)
        }else if(btnCount3 > 0 && num === 3){
            setBtnCount3(prev => prev - 1)
        }else{
            null
        }
    }


    // 슬라이드 함수
    const leftSlide = (num) => {
        if(slideMove1 < 0 && num === 1){
            setSlideMove1(slideMove1 + 300)
        }else if(slideMove2 < 0 && num === 2){
            setSlideMove2(slideMove2 + 400)
        }else if(slideMove3 < 0 && num === 3){
            setSlideMove3(slideMove3 + 635)
        }else{
            null
        }
    }
    const rightSlide = (num) => {
        if(slideMove1 > -2400 && num === 1){
            setSlideMove1(slideMove1 - 300)
        }else if(slideMove2 > -1200 && num === 2){
            setSlideMove2(slideMove2 - 400)
        }else if(slideMove3 > -5715 && num === 3){
            setSlideMove3(slideMove3 - 635)
        }else{
            null
        }
    }

    // input 인원수 함수
    const minusBtn = () => {
        if(guestCount > 1){
            const minus = guestCount - 1
            setGuestCount(minus)
        }
    }
    const plusBtn = () => {
        if(guestCount < 8){
            const plus = guestCount + 1
            setGuestCount(plus)
        }
    }

    // e.target.closest(.className) : .className의 하위 클래스들을 범위로 묶어서 한묶음으로 지정
    // 즉, 현재 .className 에 들어간 hotelModal의 하위 input, ul, li 만 묶음으로 지정
    // !e.target.closest('.hotelModal') 를 통해 부정하여 반대로 적용시켜서 input, ul, li 이외에 다른곳을 클릭하면
    // setIsInput(false) 로 모달 닫기
    const closeUl1 = (e) => {
        if (!e.target.closest('.hotelModal')) {
            setIsInput(false);
        }

        if (
            !e.target.closest('.CalendarModal') &&
            !e.target.closest('.calenertBtn')
        ) {
            setOpenC(false);
        }
    }

    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth() + 1;
    // const date = today.getDate();

    // 이미지 배너
    const [currentImg, setCurrent] = useState(0);
    const bennerImg = ['/bennerImg/benner2.webp','/bennerImg/benner6.webp','/bennerImg/benner7.webp'];

    useEffect(() => {
        const current = setInterval(() => {
            if(currentImg < 2){
                setCurrent(currentImg + 1)
            }else{
                setCurrent(0)
            }
        }, 10000);
        return(() => {clearInterval(current)});
    },[currentImg])

    // 이벤트 배너
    const [eventImgS, setEventImgS] = useState(0);
    const [eventImgE, setEventImgE] = useState(3);
    const eventBennerImg = ['/eventbenner/1.jpg', '/eventbenner/2.jpg', '/eventbenner/3.jpg', '/eventbenner/4.jpg', '/eventbenner/5.jpg', '/eventbenner/6.jpg']
    // 이벤트 배너 하단 동그라미
    const [bennerCircle, setBennerCircle] = useState(0);

    // 이벤트 배너 자동회전
    useEffect(() => {
        const play = setInterval(() => {
            if(eventImgS < 3 && eventImgE < 6){
                setEventImgS(eventImgS + 1);
                setEventImgE(eventImgE + 1);
            }else{
                setEventImgS(0);
                setEventImgE(3);
            }
        }, 3000);
        return(() => {clearInterval(play)})
    },[eventImgS, eventImgE])

    // 이벤트 배너 버튼 클릭
    const eventBennerRightHandeler = () => {
        if(eventImgS < 3 && eventImgE < 6){
            setEventImgS(eventImgS + 1);
            setEventImgE(eventImgE + 1);
        }else{
            setEventImgS(0);
            setEventImgE(3);
        }

        if(bennerCircle < 2){
            setBennerCircle(bennerCircle + 1)
        }else{
            setBennerCircle(0)
        }
    }
    const eventBennerLeftHandeler = () => {
        if(eventImgS > 0 && eventImgE > 3){
            setEventImgS(eventImgS - 1);
            setEventImgE(eventImgE - 1);
        }else{
            setEventImgS(3);
            setEventImgE(6);
        }

        if(bennerCircle > 0){
            setBennerCircle(bennerCircle - 1)
        }else{
            setBennerCircle(2)
        }
        
    }

    useEffect(() => {
        const circles = setInterval(() => {
            if(bennerCircle < 2){
                setBennerCircle(bennerCircle + 1);
            }else{
                setBennerCircle(0);
            }
        }, 3000);
        return(() => {clearInterval(circles)})
    }, [eventImgS])

    //날짜에 따른 목록 필터
    useEffect(()=>{
        let dateFilterCopy = [...dateFilter]

        if(cityEn===null && countryEn ===null){
            dateFilterCopy = HotelData.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]))
        }else{
            dateFilterCopy = townfilter.filter((f)=>(f.startDate>=DayData[0] && f.startDate<=DayData[1]) || (f.endDate<=DayData[1] && f.endDate>=DayData[0]))
        }
        
        setDateFilter(dateFilterCopy)
    },[DayData,cityEn,countryEn])

    // 모달이 열리면 화면 전체의 스크롤 제거
    useEffect(() => {
        const isAnyModalOpen = !!RatingModalOpen || !!htypeModalOpen;

        document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";

        // 컴포넌트 언마운트(페이지 이동) 시 무조건 원복
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [RatingModalOpen, htypeModalOpen]);

    useEffect(() => {
        setHotelStar(internalHotel.slice(0,4).map(item => item.hotelAvgScore));
    }, [internalHotel]);
    
    //추천호텔 별점 이미지
    const [recommStar, setRecommStar] = useState(0);
    useEffect(() => {

        if (!internalHotel) return;
        if (!Array.isArray(hotelStar)) return;

       //추천호텔 별점
        const recommStarImg = [];

        for(let i=0; i<hotelStar.length; i++){

            recommStarImg[i] = [];
                        
            //별점 정수
            const starInt = Math.floor(hotelStar[i]);
            //별점 소수
            const starFloat = Math.floor(hotelStar[i]*10)/10 - starInt;
            //별점 빈칸
            const starZero = Math.floor(5 - starInt - starFloat);
            
            for(let k=0; k<starInt; k++){
                recommStarImg[i].push('/img/star-one.png');                  
            }
            if(starFloat>=0.5){
                recommStarImg[i].push('/img/star-half.png');                    
            }else if(starFloat>0 && starFloat<0.5){
                recommStarImg[i].push('/img/star-zero.png');
            }
            for(let j=0; j<starZero; j++){
                recommStarImg[i].push('/img/star-zero.png');                    
            }
        }
        setRecommStar(recommStarImg);
        setIsLoading(true);     

    }, [hotelStar, internalHotel]);

    const moveRoom = () => {
        if (selectday.length < 2){
            alert('날짜를 선택해주세요.')
            return;
        }else{
            serchHandler();
            navigate('/room');
        }
    }

    // if(!isLoading || !internalHotel || recommStar.length === 0) return <div>로딩중...</div>;
    if(!internalHotel || !hotelMerge) return <div>로딩중...</div>;

    return(
        <div className='main_container' onClick={closeUl1} style={{overflowX:'hidden'}}>
            {/* 베너 박스 */}
            <div className='mainImgBenner'>
                {/* 메인 베너 이미지 */}
                <div className='mainBanner'>
                    <img src={bennerImg[currentImg]} className='bennerImgs'/>
                    <div className='bennerMask'></div>
                </div>
                <h1 className='searchTitle'>여행을 고민중이라면?</h1>
                {/* 국내, 해외 숙박 검색 */}
                <div className='hotelSearch'>
                    {/* input form */}
                    <div className='hotelInput'>
                        <div className='hotelModal'>
                            <input type='text' id='citySearch' name='citySearch' 
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            onClick={() => setIsInput(true)}
                            placeholder='나라나 도시를 검색해주세요'
                            />
                            {/* input 클릭시 나오는 순위 */}
                            {isInput &&
                            <>
                                <ul className='rankBox'>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfoMain'>국내</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('서울')}>서울</li>
                                    <li className='rankName' onClick={() => setTown('부산')}>부산</li>
                                    <li className='rankName' onClick={() => setTown('강릉')}>강릉</li>
                                    <li className='rankName' onClick={() => setTown('속초')}>속초</li>
                                    <li className='rankName' onClick={() => setTown('경주')}>경주</li>
                                    <li className='rankName' onClick={() => setTown('여수')}>여수</li>
                                    <li className='rankName' onClick={() => setTown('대전')}>대전</li>
                                    <li className='rankName' onClick={() => setTown('광주')}>광주</li>
                                    <li className='rankName' onClick={() => setTown('제주')}>제주</li>
                                    <li className='rankName' onClick={() => setTown('포항')}>포항</li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfoMain'>해외</span>
                                    </li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfo'>일본</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('도쿄')}>도쿄</li>
                                    <li className='rankName' onClick={() => setTown('삿포로')}>삿포로</li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfo' >미국</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('로스앤젤레스')}>로스앤젤레스</li>
                                    <li className='rankName' onClick={() => setTown('뉴욕')}>뉴욕</li>
                                    <li className='rankName' onClick={() => setTown('괌')}>괌</li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfo'>중국</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('장가계')}>장가계</li>
                                    <li className='rankName' onClick={() => setTown('상하이')}>상하이</li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfo'>이탈리아</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('로마')}>로마</li>
                                    <li className='rankName' onClick={() => setTown('베네치아')}>베네치아</li>
                                    <li className='rankBoxLi'>
                                        <span className='inputInfo'>프랑스</span>
                                    </li>
                                    <li className='rankName' onClick={() => setTown('파리')}>파리</li>
                                </ul>
                            </>}
                        </div>
                        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                        {town !== '' && <i class="fa-solid fa-x search_Xbtn" onClick={() => setTown('')}></i>}
                        <button type='button' onClick={() => {setOpenC(!openC),setSelectDay([])}} className='calenertBtn'>
                            <i className="fa-solid fa-calendar" style={{color:'#42799b'}}></i>
                            <span style={{marginRight:'5px',fontWeight:'600'}}>{DayData.length < 2 ? '일정을 선택해 주세요' : `${DayData[0]} - ${DayData[1]}`}</span>
                        </button>
                        <div className='CalendarModal'>
                            {openC && <Calendar setDayData={setDayData}/>}
                        </div>
                        {/* 인원 */}
                        <div className='guestSum'>
                            {/* 버튼 */}
                            <button type='button' 
                            onClick={minusBtn} 
                            className='minus_btn' 
                            style={{
                                backgroundColor : guestCount === 1 ? '#f3f3f3' : '#42799b',
                                color: guestCount === 1 ? '#898989' : '#fff',
                                cursor:guestCount === 1 ? 'not-allowed' : 'pointer'
                            }}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className='guests'>{guestCount}</span>
                            <button type='button'
                            onClick={plusBtn}
                            className='plus_btn'
                            style={{
                                backgroundColor : guestCount === 8 ? '#f3f3f3' : '#42799b',
                                color: guestCount === 8 ? '#898989' : '#fff',
                                cursor:guestCount === 8 ? 'not-allowed' : 'pointer'
                            }}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        {/* 검색 */} 
                        <button type='button' className='Search_Btn' onClick={()=> {moveRoom(); window.scrollTo(0,0);}}>검색</button>
                    </div>
                </div>
            </div>

            {/* 이벤트 배너 */}
            <div className='eventBenner'>
                <p className='eventTitle'>이벤트</p>
                <button type='button' className='eventLeftBtn' onClick={eventBennerLeftHandeler}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
                {eventBennerImg.slice(eventImgS,eventImgE).map((item, index) => (
                    <Link to='/helpCenter2' onClick={() => {window.scrollTo(0,0); setListType(2);}} key={index}>
                        <img src={item} alt='eventBennerImg' className='event' key={index} />
                    </Link>
                ))}
                <button type='button' className='eventRightBtn' onClick={eventBennerRightHandeler}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
                <div className='circleWrap'>
                    <span className={bennerCircle === 0 ? 'circleMain' : 'circle'}></span>
                    <span className={bennerCircle === 1 ? 'circleMain' : 'circle'}></span>
                    <span className={bennerCircle === 2 ? 'circleMain' : 'circle'}></span>
                </div>
            </div>

            {/* 호텔 유형에 따라 나눔 */}
            <div className='hotelTypeWrap'>
                <div className='hotelTypeTitle'>
                    <p style={{fontSize:'30px', fontWeight:'700'}}>취향에 맞는 숙소</p>
                </div>
                <div>
                    <ul className='hotel_type'>
                        {hotelType.map((item) => (
                            <li key={item.id} className='accomCat'>
                                <img src={item.image} style={{width:'231px', height:'240px', borderRadius:'10px'}} onMouseOver={() => setHotelTypeMask(item.id)} />
                                <span className='HotelImg'>{item.typeName}</span>
                                {hotelTypeMask === item.id && 
                                <div className='hTypeMask'  onMouseLeave={() => setHotelTypeMask(null)} onClick={() => {sethTypeModalOpen(item.id); sethTypeModalOpen2(item.id - 1)}}></div>
                                }
                                {/* 호텔 타입 클릭 후 모달 */}
                                {htypeModalOpen === item.id && 
                                <div className='hotelType_overlay'>
                                    <div className='hTypeModal'>
                                        <h1 style={{textAlign:'center', margin:'30px', fontSize:'30px'}}>{item.typeName}</h1>
                                        <div className='hTypeModal_hotel'>
                                            <ul className='Modal_hType_Ul'>
                                                {typeAndHotel.slice(0,10).map((item) => (
                                                    <li key={item.h_code} className='Modal_hType_Li'>
                                                        <Link to = {`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                                            <div>
                                                                <img src = {`/img/${item.h_Img}`} alt={item.hotelName} className='Modal_hType_Img' />
                                                            </div>
                                                            <div className='Modal_hTypeText'>
                                                                <p className='Modal_hTypeText1'>{item.type}</p>
                                                                <p className='Modal_hTypeText2'>{item.hotelName}</p>
                                                                {item.discount === 1 ? (
                                                                    <>
                                                                        <p className='discount1'><span className='red1'>10% 할인</span> <span className='origin-price1'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원</span></p>
                                                                        <p className='final-price1'>{((hotelMerge[item.h_code-1].hotelPrice) - ((hotelMerge[item.h_code-1].hotelPrice)*0.1)).toLocaleString()}원<span>/1박</span></p>
                                                                    </>
                                                                ):(
                                                                    <>
                                                                        <p className='discount1'><span className='red1'>회원가입시 10,000원 할인쿠폰</span></p>

                                                                        <p className='final-price1'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원<span>/1박</span></p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </Link>
                                                        <button type='button' className='wishBtn1' onClick={()=>wishHandler(item.h_code)}>
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
                                        <button type='button' onClick={()=>{sethTypeModalOpen(null)}} className='hTypeModal_Xbtn'>
                                            <i class="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                </div>
                                }  
                            </li>
                        ))}
                    </ul>
                </div>    
            </div>

            {/* 인기 호텔 모음 - 해외 */}
            <div className='popularAccom'>
                <p className='popularAccomTitle'>해외 인기 스테이 PICK!</p>
                <div className='popularAccomSub1'>
                    {/* 왼쪽 슬라이드 버튼 */}
                    {btnCount1 > 0 &&
                        <button type='button' className='leftBtn1' onClick={() => {leftSlide(1); handleLeftClick(1);}}> 
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                    {/* 해외 호텔 map */}
                    <div className='slideBox'>
                        <ul className='popularAccomSub2' style={{marginLeft:`${slideMove1}px`}} >
                            {overseasHotel.slice(0,12).map((item) => (
                                    <li key={item.h_code} style={{cursor:'pointer'}} className='popularAccomSub3'>
                                        <Link to = {`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                            <div className="popularImgBox">
                                                <img src={`/img/${item.h_Img}`} alt={item.hotelName} className='popularAccomMainImg' />
                                            </div>
                                            <p className='popularAccom_type'>{item.type}</p>
                                            <p className='popularAccom_name'>{item.hotelName}</p>
                                            <div className='popularAccom_review'>
                                                <span className='popularAccom_score'>
                                                    <i className="fa-solid fa-star"></i>
                                                    <span className='starScore'>{(hotelMerge[item.h_code - 1]?.hotelAvgScore - Math.floor(hotelMerge[item.h_code - 1]?.hotelAvgScore) === 0) ? hotelMerge[item.h_code - 1].hotelAvgScore+'.0' : Math.trunc((hotelMerge[item.h_code - 1].hotelAvgScore) * 10) / 10}</span>
                                                </span>
                                                <span className='popularAccom_count'>{(hotelMerge[item.h_code - 1].hotelReviewCount).toLocaleString()}명 참여</span>
                                            </div>
                                            {item.discount === 1 ? (
                                                <>
                                                    <p className='discount'><span className='red'>10% 할인</span> <span className='origin-price'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원</span></p>
                                                    <p className='final-price'>{((hotelMerge[item.h_code-1].hotelPrice) - ((hotelMerge[item.h_code-1].hotelPrice)*0.1)).toLocaleString()}원<span>/1박</span></p>
                                                </>
                                            ):(
                                                <>
                                                    <p className='discount'><span className='red'>회원가입시 10,000원 할인쿠폰</span></p>
                                                    <p className='final-price'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원<span>/1박</span></p>
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
                    {/* 오른쪽 슬라이드 버튼 */}
                    {btnCount1 < 8 && 
                        <button type='button' className='rightBtn1' onClick={() => {rightSlide(1); handleRightClick(1);}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                </div>
            </div>
            
            {/* 국내  인기 스테이 PICK! */}
            <div className="left_main">                       
                <div className="room-select_main" style={{borderTop:'0px'}}>
                    <p className='room-title_main'>국내 인기 스테이 PICK!</p>
                    <ul className='roomUl'>
                        {internalHotel.slice(0,4).map((item,index)=>(
                            <li key={index} style={{display:'flex'}}>
                                <div className="room-left_main">
                                    <Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                        <img src={`/img/${item.h_Img}`} alt={item.hotelName} />
                                    </Link>
                                </div>
                                <div className="room-right_main">
                                    <h2><Link to={`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>{item.hotelName}</Link></h2>
                                    <div className="room-intro_main">
                                        <div className="intro-left_main">
                                            {
                                                (() => {
                                                    const score = hotelMerge.find(it => it.h_code === item.h_code)?.hotelAvgScore ?? 0;
                                                    return (
                                                        (score >= 0 && score < 0.5) ? <img className='Mainstar1' src='/img/size20-0-0.png' alt="score" /> :
                                                        (score >= 0.5 && score < 1) ? <img className='Mainstar1' src='/img/size20-0-5.png' alt="score" /> :
                                                        (score >= 1 && score < 1.5) ? <img className='Mainstar1' src='/img/size20-1-0.png' alt="score" /> :
                                                        (score >= 1.5 && score < 2) ? <img className='Mainstar1' src='/img/size20-1-5.png' alt="score" /> :
                                                        (score >= 2 && score < 2.5) ? <img className='Mainstar1' src='/img/size20-2-0.png' alt="score" /> :
                                                        (score >= 2.5 && score < 3) ? <img className='Mainstar1' src='/img/size20-2-5.png' alt="score" /> :
                                                        (score >= 3 && score < 3.5) ? <img className='Mainstar1' src='/img/size20-3-0.png' alt="score" /> :
                                                        (score >= 3.5 && score < 4) ? <img className='Mainstar1' src='/img/size20-3-5.png' alt="score" /> :
                                                        (score >= 4 && score < 4.5) ? <img className='Mainstar1' src='/img/size20-4-0.png' alt="score" /> :
                                                        (score >= 4.5 && score < 5) ? <img className='Mainstar1' src='/img/size20-4-5.png' alt="score" /> :
                                                        <img className='Mainstar1' src='/img/size20-5-0.png' alt="score" />
                                                    )                                    
                                                })()
                                            }
                                            <span className='starScore2'>{(hotelMerge[item.h_code - 1]?.hotelAvgScore - Math.floor(hotelMerge[item.h_code - 1]?.hotelAvgScore) === 0) ? hotelMerge[item.h_code - 1].hotelAvgScore+'.0' : Math.trunc((hotelMerge[item.h_code - 1].hotelAvgScore) * 10) / 10}</span>
                                        </div>
                                        <div className="intro-right_main">
                                            <Link to = {`/detail/${item.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                                <button type='button'>상세정보 <i className="fa-solid fa-angle-right"></i></button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="room-info_main">
                                        <p><i className="fa-regular fa-clock"></i> 체크인 <span className='bold_main'>15:00</span> ~ 체크아웃 <span className='bold_main'>11:00</span></p>
                                        <p><i className="fa-solid fa-user-group"></i> 최대 투숙객 수 : {item.hotelMinOccupancy} ~ {item.hotelMaxOccupancy}명</p>
                                        <p><i className="fa-solid fa-tag"></i> <span className='bold_main'>할인혜택 :</span>
                                            <span className='red_main'>
                                                {item.discount === 1 ? 
                                                    '10%할인 이벤트 중'
                                                :
                                                    '회원가입시 10,000원 할인쿠폰'
                                                }
                                            </span>
                                        </p>
                                        <div className="room-pay_main">
                                            {item.discount === 1 ? 
                                                <>
                                                    <span className='origin-price_main'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원</span>
                                                    <span className='final-price_main'>{((hotelMerge[item.h_code-1].hotelPrice) - ((hotelMerge[item.h_code-1].hotelPrice)*0.1)).toLocaleString()}원<span>/1박</span></span>
                                                </>                                                    
                                            :                                                    
                                                <>
                                                    <span className='final-price_main'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원<span>/1박</span></span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                            )
                        )}
                    </ul>
                </div>
            </div> 

            {/* 평점 - 호텔 평점순 */}
            <div className='hotelRating'>
                <p className='hotelRatingTitle'>지역별 숙소 찾기</p>
                <div className='hotelRatingAll'>
                    {/* 왼쪽 슬라이드 버튼 */}
                    {btnCount2 > 0 &&
                        <button type='button' className='leftBtn2' onClick={() => {leftSlide(2); handleLeftClick(2)}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                    <div className='hotelRatingBox'>
                        <ul className='hotel_rating_ul' style={{marginLeft:`${slideMove2}px`}}>
                            {popularRating.map((item) => (
                                <li key={item.id} style={{cursor:'pointer'}} className='RatingWrap' >
                                    <div className='ratingItemWrapper'>
                                        <img src={item.image} className='hotelRatingImg' onClick={() => {setRatingModalOpen(item.id); setRatingModalOpen2(item.id - 1)}}/>
                                        <div className='ratingLabel'>
                                            <img src='/label.png' alt='label'/>
                                            <span className='hotelRatingScore'>
                                                고객<br/> Pick<br/>
                                            </span>
                                        </div>
                                        <div className='hotelRating_each_sub2'>
                                            <span style={{display:'inline-block', marginBottom:'5px', fontSize:'13px', color:'#42799b', fontWeight:'700'}}>{item.cityNameE}</span> <br/>
                                            <span style={{display:'inline-block', marginBottom:'10px', fontSize:'23px', color:'#42799b', fontWeight:'700'}}>{item.cityName}</span> <br/>
                                            <span style={{display:'inline-block', marginBottom:'10px', fontSize:'15px'}}>{item.cityInfo}</span>
                                        </div>
                                    </div>
                                    {/* 평점순 클릭 후 모달 */}
                                    {RatingModalOpen === item.id && 
                                    <div className='overlay'>
                                        <div className='ratingModal'>
                                            <div className='ratingModal_in'>
                                                <img src={item.image} alt={item.cityName} className='modalImg'/>
                                                <div className='ratingImgOverlay'>
                                                    <span className='overlayText overlayText1'>{item.cityNameE}</span> <br/>
                                                    <span className='overlayText overlayText2 '>{item.cityName}</span> <br/>
                                                </div>
                                            </div>
                                            <div className='ratingModal_hotel'>
                                                <ul className='Modal_hotel_Ul'>
                                                    {cityAndHotel.map((item) => (
                                                        <li key={item.h_code} className='Modal_hotel_Li'>
                                                            <Link to = {`/detail/${item.h_code}`} className='hotelLink' onClick={() => window.scrollTo(0,0)}>
                                                            <div>
                                                                <img src = {`/img/${item.h_Img}`} alt={item.hotelName} className='Modal_hotel_Img' />
                                                            </div>
                                                            <div className='Modal_hotelText'>
                                                                <p className='Modal_hotelText1'>{item.type}</p>
                                                                <p className='Modal_hotelText2'>{item.hotelName}</p>
                                                                {item.discount === 1 ? (
                                                                    <>
                                                                        <p className='discount2'><span className='red2'>10% 할인</span> <span className='origin-price2'>{(hotelMerge[item.h_code - 1].hotelPrice).toLocaleString()}원</span></p>
                                                                        <p className='final-price2'>{((hotelMerge[item.h_code - 1].hotelPrice) - ((hotelMerge[item.h_code - 1].hotelPrice)*0.1)).toLocaleString()}원<span>/1박</span></p>
                                                                    </>
                                                                ):(
                                                                    <>
                                                                        <p className='discount2'><span className='red2'>회원가입시 10,000원 할인쿠폰</span></p>
                                                                        <p className='final-price2'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원<span>/1박</span></p>
                                                                    </>
                                                                )}
                                                            </div>
                                                            </Link>
                                                            <button type='button' className='wishBtn3' onClick={()=>wishHandler(item.h_code)}>
                                                            <i className="fa-solid fa-heart wishBtn3-1" style={
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
                                            <button type='button' onClick={()=>{setRatingModalOpen(null)}} className='ratingModal_Xbtn'>
                                                <i className="fa-solid fa-x"></i>
                                            </button>
                                        </div>
                                    </div>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 오른쪽 슬라이드 버튼 */}
                    {btnCount2 < 3 &&
                        <button type='button' className='rightBtn2' onClick={() => {rightSlide(2); handleRightClick(2);}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                </div>
            </div>

            {/* EcoStay 회원만의 특별한 혜택 */}
            <div className='EcoMember'>
                <img src='/middleBenner2.png' alt='middleBenner' />
                <div className='EcoMemberInfo'>
                    <p className='EcoMemberInfo-1'><span style={{fontSize:'40px', fontWeight:'bold'}}>[EcoStay]</span> 한정! 지금 뜬 호텔 특가!</p>
                    <p className='EcoMemberInfo-2'>놓치면 끝! 한정 수량 할인 중인 숙소를 모았어요</p>
                </div>
                <div className='EcoMemberHotel'>
                    {btnCount3 > 0 &&
                        <button type='button' className='leftBtn3' onClick={() => {leftSlide(3); handleLeftClick(3);}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                    <div className='EcoMemberUlBox'>
                        <ul className='EcoMemberHotelAll' style={{marginLeft:`${slideMove3}px`}}>
                            {hotelSale.slice(60,70).map((item) => (
                            <li key={item.h_code} className='EcoMemberHotelAllLi'>
                                <Link to = {`/detail/${item.h_code}`} className='EcoMemberA' onClick={() => window.scrollTo(0,0)}>
                                    <img src={`/img/${item.h_Img}`} alt={item.hotelName} style={{width:'285px', height:'230px',borderRadius:'10px 0 0 10px'}}/>
                                    <div className='EcoMemberHotelAll-2'>
                                        <span className='bennerType'>{item.type}</span><br/>
                                        <p className='bennerClub'>[EcoStay]</p>
                                        <span className='bennerHotelName'>{item.hotelName}</span>
                                        <p className='bennerText'>- 가족여행 추천</p>
                                        <p className='bennerText'>- 10% 할인</p>
                                        {hotelMerge[item.h_code] && (
                                            <>
                                                <span className='bennerPrice1'>{((hotelMerge[item.h_code-1].hotelPrice) - ((hotelMerge[item.h_code-1].hotelPrice)*0.1)).toLocaleString()}</span> <span className='bennerPrice1-1'>원 ~</span>
                                                <span className='bennerPrice2'>{(hotelMerge[item.h_code-1].hotelPrice).toLocaleString()}원</span><span className='bennerPrice2-1'>~</span>
                                            </>
                                        )}
                                        
                                    </div>
                                </Link>
                            </li> 
                            ))}
                        </ul>
                    </div>
                    {btnCount3 < 9 &&
                        <button type='button' className='rightBtn3' onClick={() => {rightSlide(3); handleRightClick(3);}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}