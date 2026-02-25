import './Detail.css';
import '../reset.css';
import { useContext,useState,useEffect,useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
//import cookie from 'js-cookie';
import { ResortDataContext } from '../Api/ResortData';
import { ModalContext } from './Modal';
import LeafletMap from '../Api/LeafletMap';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Detail(){  
    const {h_code} = useParams();
    const navigate = useNavigate();

    //호텔,객실,찜,예약날짜,예약인원,예약객실 데이터  
    const {RoomData,HotelData,ReviewData, setHotelNum, RatingData, RatingAvgData, setReviewData, WishAvg, DayData,wish,wishStar,wishArray,wishHandler,setPayHead,
        // setPayRoom
    } = useContext(ResortDataContext);
    //모달 프로바이더
    const {toggle,setModalContent,AddressCopy, AddressCopyClick} = useContext(ModalContext);
  
    
    //추천호텔 데이터
    const [RecommData , setRecommData] = useState([]);
    //추천호텔 데이터 호텔코드 저장
    const[RecommCode, setRecommCode] = useState([]);
    //추천호텔 데이터 평점평균 저장
    const[RecommAvg, setRecommAvg] = useState([]);
    //달력 
    const [Cal, setCal] = useState(false);

    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()
   
    
    //호텔별점 이미지
    const[starImg, setStarImg] = useState([]);
    //추천호텔 별점 이미지
    const[recommStar, setRecommStar] = useState([]);
    //객실당 스마일 이미지
    //const[smileRoom, setSmileRoom] = useState([]);
    //객실당 별점 이미지
    const[starRoom, setStarRoom] = useState([]);
    //객실당 평균별점 이미지
    const[avgRoom, setAvgRoom] = useState([]);
    //호텔 리뷰 평균
    const[hotelScore,setHotelScore] = useState(0);

    //내용 더보기 버튼
    const [more, setMore] = useState(false);

    //슬라이드 인덱스
    const [current01, setCurrent01] = useState(0);//(추천호텔)
    const [current02, setCurrent02] = useState(0);//(찜한호텔)

    //검색버튼 클릭여부
    const [search, setSearch] = useState(false);

    //날짜 필터링
    const [dateFilter, setDateFilter] = useState(null);
    //인원수 필터링
    const [headFilter, setHeadFilter] = useState([]);

    // 최종 날짜
    const [resultRooms, setResultRooms] = useState([]);

    useEffect(() => {
        searchClick();
    },[h_code])

    
    // const [Room, setRoom] = useState([]);

    //  useEffect(() => {
    
    //     const Room = RoomData.filter((item)=>item.h_code === Hotel.h_code);
    //     setRoom(Room);
      
    // },[Hotel]);
    


    //아이디값 비교
    const Hotel = HotelData.find((item)=>item.h_code === Number(h_code));
    //예외처리
    if(!Hotel) return <p>호텔 정보가 없습니다.</p>
    //호텔코드 비교
    const Room = RoomData.filter((item)=>item.h_code === Hotel.h_code);
    // console.log('rooooooooooooooooooom', Room);
    //예외처리
    if (Room.length === 0) return <p>객실 정보가 없습니다.</p>;

    //객실 전체 리뷰 데이터
    let RoomReview;
    for(let i = 0; i < ReviewData.length; i++){
        if(i === 0){
           RoomReview = ReviewData.filter((item)=>item.r_code === Room[0].r_code);
        }else if(Room[1] !== undefined && i === 1){
            RoomReview = ReviewData.filter((item)=>item.r_code === Room[0].r_code || item.r_code === Room[1].r_code);
        }else if(Room[1] !== undefined && Room[2] !== undefined && i === 2){
            RoomReview = ReviewData.filter((item)=>item.r_code === Room[0].r_code || item.r_code === Room[1].r_code || item.r_code === Room[2].r_code);
        }
    }

    //예외처리
    //if(RoomReview.length === 0) return <p>객실 정보가 없습니다.</p>;
    //1번 객실 리뷰 데이터
    const RoomReview01 = ReviewData.filter((item)=>item.r_code === Room[0].r_code);
    //2번 객실 리뷰 데이터
    const RoomReview02 = Room[1] === undefined ? null : ReviewData.filter((item)=>item.r_code === Room[1].r_code);
    //3번 객실 리뷰 데이터
    const RoomReview03 = Room[2] === undefined ? null : ReviewData.filter((item)=>item.r_code === Room[2].r_code);
    //각 리뷰 데이터 배열화
    const RoomReviewArr = [RoomReview01,RoomReview02,RoomReview03];

    //서비스 정보 배열화
    const otherService01 = JSON.parse(Hotel.otherservice);
    const publicService01 = JSON.parse(Hotel.publicservice);
    const roomservice01 = JSON.parse(Hotel.roomservice);  

    


    useEffect(() => {
        if (Hotel.length === 0) return;
        // 추천호텔 데이터
        axios.get('/api/hotel/recomm', {
            params: {
                hotelcity: Hotel.city,
                hotelcode: Hotel.h_code
            }
            })
            .then(res => {
                console.log("추천 호텔 데이터 : ", res.data);
                setRecommData(res.data);
                //추천호텔 데이터의 호텔코드 저장
                const codes = res.data.map(item => item.h_code);
                setRecommCode(codes);
                setCurrent01(0);
                setCurrent02(0);
            })
            .catch(error => {
                console.error("error", error);
        });
    },[Hotel])

    useEffect(() => {

        if (RecommCode.length === 0) return;

        Promise.all(
            RecommCode.map(code =>
                axios.get("/api/board/recomm", {
                    params: { hotelcode: code }
                })
            )
        )
        .then(responses => { 
            const avgList = responses.map(res =>({
                scoreAvg: res.data[0]?.scoreAvg ?? 0,
                reviewCount: res.data[0]?.reviewCount ?? 0
            }));

            setRecommAvg(avgList);
        })
        .catch(error => {
            console.error("error", error);
        });

    }, [RecommCode]); 


    useEffect(() => {

        if (RecommAvg.length === 0) return;

       //추천호텔 별점
        const recommStar = [];
        const recommStarImg = [];

        for(let i=0; i<RecommAvg.length; i++){
            recommStar.push(RecommAvg[i] === undefined ? 0 : RecommAvg[i].scoreAvg);

            recommStarImg[i] = [];
                        
            //별점 정수
            const starInt = Math.floor(recommStar[i]);
            //별점 소수
            const starFloat = Math.floor(recommStar[i]*10)/10 - starInt;
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

    }, [RecommAvg]); 

    useEffect(()=>{

        if (Hotel.length === 0) return;

        //객실 리뷰의 평균내기
        let HotelScore = 0;

        for(let i=0; i<RoomReview.length; i++){
            HotelScore += RoomReview[i].rb_score;
        }
        
        //해당호텔 별점 가져오기
        const score = HotelScore/RoomReview.length;
        setHotelScore(score);

        //별점 정수
        const scoreInt = Math.floor(score);
        //별점 소수
        const scoreFloat = Math.floor(score*10)/10 - scoreInt;
        //별점 빈칸
        const scoreZero = Math.floor(5 - scoreInt - scoreFloat);

        const star = [];

        for(let i=0; i<scoreInt; i++){
            star.push('/img/star-one.png');
            setStarImg(star);
        }
        if(scoreFloat>=0.5){
            star.push('/img/star-half.png');
            setStarImg(star);
        }else if(scoreFloat>0 && scoreFloat<0.5){
            star.push('/img/star-zero.png');
            setStarImg(star);
        }
        for(let j=0; j<scoreZero; j++){
            star.push('/img/star-zero.png');
            setStarImg(star);
        }

        

        //객실당 스마일 이미지
        //const smileRoom2 = [];
        //객실당 별 이미지
        const starRoom2 = [];

        for(let i=0; i<Room.length; i++){
            //smileRoom2[i] = [];

            starRoom2[i] = [];

            for(let j=0; j<RoomReviewArr[i].length; j++){

                starRoom2[i][j] = [];

                //별점 저장(1개)
                for(let k=0; k<RoomReviewArr[i][j].rb_score; k++){
                    starRoom2[i][j].push('/img/star-one.png');
                    setStarRoom(starRoom2);
                }
                //별점 저장(0개)
                for(let k=0; k< 5-RoomReviewArr[i][j].rb_score; k++){
                    starRoom2[i][j].push('/img/star-zero.png');
                    setStarRoom(starRoom2);
                }

            }
        }
        //console.log(starRoom2);
        //setSmileRoom(smileRoom2);

        
        //객실당 평점평균
        const roomStar = [];
        const RatingAvg = RatingAvgData.filter((item)=>item.h_code === Hotel.h_code);

        for(let i=0; i<Room.length; i++){
            const starTotal = 5;
            roomStar[i] = [];

            //별점 정수
            const scoreInt = RatingAvg[i] === undefined ? 0 : Math.floor(RatingAvg[i].scoreAvg);
            //별점 소수
            const scoreFloat = RatingAvg[i] === undefined ? 0 : Math.floor(RatingAvg[i].scoreAvg*10)/10 - scoreInt;
            //별점 빈칸
            const scoreZero = RatingAvg[i] === undefined ? 0 : Math.floor(starTotal - scoreInt - scoreFloat);

            for(let k=0; k<scoreInt; k++){
                roomStar[i].push(['/img/star-one.png']);
            }
            if(scoreFloat>=0.5){
                roomStar[i].push(['/img/star-half.png']);
            }else if(scoreFloat>0 && scoreFloat<0.5){
                roomStar[i].push(['/img/star-zero.png']);
            }
            for(let j=0; j<scoreZero; j++){
                roomStar[i].push(['/img/star-zero.png']);
            }
        }
        setAvgRoom(roomStar);       
            
    },[Hotel]);
  
// console.log(starRoom);
// console.log(recommStar);


    //공유하기 버튼
    const shareClick = () =>{
        navigator.clipboard.writeText(`${window.location.origin}/detail/${h_code}`);
        setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>링크가 복사되었습니다.</p>);
        toggle();
    }
    //주소복사 버튼
    const addressCopy = () =>{
        navigator.clipboard.writeText(`${Hotel.city === 'Sokcho'?'대한민국, 강원도 속초시':Hotel.city === 'Gyeongju'?'대한민국, 경상북도 경주시':Hotel.city === 'Busan'?'대한민국, 부산시':Hotel.city === 'Gangneung'?'대한민국, 강원도 강릉시':Hotel.city === 'Yeosu'?'대한민국, 전라남도 여수시':Hotel.city === 'Daejeon'?'대한민국, 대전시':Hotel.city === 'Gwangju'?'대한민국, 광주시':Hotel.city === 'Jeju'?'대한민국, 제주도':Hotel.city === 'Pohang'?'대한민국, 경상북도 포항시':Hotel.city === 'Seoul'?'대한민국, 서울시':Hotel.city === 'Tokyo'?'일본, 도쿄':Hotel.city === 'Sapporo'?'일본, 훗카이도 삿포로':Hotel.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':Hotel.city === 'NewYork'?'미국, 뉴욕':Hotel.city === 'Guam'?'미국, 괌':Hotel.city === 'Zhangjiajie'?'중국, 후난성 장가계':Hotel.city === 'Shanghai'?'중국, 상하이':Hotel.city === 'Rome'?'이탈리아, 로마':Hotel.city === 'Venice'?'이탈리아, 베네치아':Hotel.city === 'Paris'?'프랑스, 파리':null} ${Hotel.hotelName}`);
        setModalContent(<p style={{fontSize:'18px',fontWeight:'700'}}>주소가 복사되었습니다.</p>);
        toggle();        
    }
    //주소복사 버튼2
    const addressCopy2 = () =>{
        navigator.clipboard.writeText(`${Hotel.city === 'Sokcho'?'대한민국, 강원도 속초시':Hotel.city === 'Gyeongju'?'대한민국, 경상북도 경주시':Hotel.city === 'Busan'?'대한민국, 부산시':Hotel.city === 'Gangneung'?'대한민국, 강원도 강릉시':Hotel.city === 'Yeosu'?'대한민국, 전라남도 여수시':Hotel.city === 'Daejeon'?'대한민국, 대전시':Hotel.city === 'Gwangju'?'대한민국, 광주시':Hotel.city === 'Jeju'?'대한민국, 제주도':Hotel.city === 'Pohang'?'대한민국, 경상북도 포항시':Hotel.city === 'Seoul'?'대한민국, 서울시':Hotel.city === 'Tokyo'?'일본, 도쿄':Hotel.city === 'Sapporo'?'일본, 훗카이도 삿포로':Hotel.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':Hotel.city === 'NewYork'?'미국, 뉴욕':Hotel.city === 'Guam'?'미국, 괌':Hotel.city === 'Zhangjiajie'?'중국, 후난성 장가계':Hotel.city === 'Shanghai'?'중국, 상하이':Hotel.city === 'Rome'?'이탈리아, 로마':Hotel.city === 'Venice'?'이탈리아, 베네치아':Hotel.city === 'Paris'?'프랑스, 파리':null} ${Hotel.hotelName}`);
    }    

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

    //객실 평점별 갯수저장
    const starCount = {star1:0,star2:0,star3:0,star4:0,star5:0};    
    let RoomReviewCount;

    for(let i = 0; i < ReviewData.length; i++){
        if(i === 0){
           RoomReviewCount = ReviewData.filter((item)=>item.r_code === Room[0].r_code);
        }else if(Room[1] !== undefined && i === 1){
            RoomReviewCount = ReviewData.filter((item)=>item.r_code === Room[0].r_code || item.r_code === Room[1].r_code);
        }else if(Room[1] !== undefined && Room[2] !== undefined && i === 2){
            RoomReviewCount = ReviewData.filter((item)=>item.r_code === Room[0].r_code || item.r_code === Room[1].r_code || item.r_code === Room[2].r_code);
        }
    }

    for(let i=0; i<RoomReviewCount.length; i++){
        RoomReviewCount[i].rb_score === 1 ? starCount.star1++ : RoomReviewCount[i].rb_score === 2 ? starCount.star2++ : RoomReviewCount[i].rb_score === 3 ? starCount.star3++ : RoomReviewCount[i].rb_score === 4 ? starCount.star4++ : starCount.star5++
    }

    //평점 총 갯수저장
    const starCountTotal = starCount.star1+starCount.star2+starCount.star3+starCount.star4+starCount.star5;

    //console.log(starCountTotal);

    

    // 슬라이드 좌측 버튼
    const leftClick = (current,setCurrent)=>{   
        let copyCurrent = current;
        if(current === 0){
            copyCurrent = 0;
        }else{
            copyCurrent--;
        }
        setCurrent(copyCurrent);
    }

    // 슬라이드 우측 버튼
    const rightClick = (current,setCurrent,array)=>{
        let copyCurrent = current;
        //보여지는 갯수(4개)만큼 빼기
        if(current === array.length-4){
            copyCurrent = array.length-4;
        }else{
            copyCurrent++;
        }
        setCurrent(copyCurrent);
    }

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
    
    //필터링후 Room인덱스저장
    const [filterIndex, setFilterIndex] = useState([]);
    //필터링후 Room r_code저장
    const [filterRcode, setFilterRcode] = useState([]);

    //Room에서 필터된 hotel의 r_code 저장
    useEffect(() => {
        if (Hotel === 0) return;

        const filterIndex1 = [];
        for(let i=0;i<Room.length;i++){
            filterIndex1.push(i);
        }
        setFilterIndex(filterIndex1);

        const filterRcode1 = [];
        for(let i=0;i<Room.length;i++){
            filterRcode1.push(Room[i].r_code);
        }
        setFilterRcode(filterRcode1);
    },[Hotel]);

    // //객실검색
    // const searchClick = () =>{        
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     console.log(Hotel);
    //     console.log(DayData[1]);

    //     // DayData[0] = 체크인 DayData[1] = 체크아웃
    //     // 호텔 예약가능 첫날이 체크인보다 크고 호텔 예약 가능 첫날이 마지막날보다 작거나
    //     // Hotel.startDate <= DayData[1] && Hotel.endDate   >= DayData[0]
    //     if((Hotel.startDate >= DayData[0] && Hotel.startDate <= DayData[1]  ) 
    //         || (Hotel.endDate >= DayData[0] && Hotel.endDate <= DayData[1]) 
    //         || (DayData[0]>=Hotel.startDate && DayData[1]<=Hotel.endDate)){
    //         console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    //         setDateFilter(true);

    //         const headFilter2 = Room.filter((item)=>item.maxOccupancy >= head);
    //         setHeadFilter(headFilter2);

    //         //Room에서 필터된 인덱스 저장
    //         const filterIndex2 = Room.map((arr,index) =>
    //             headFilter2.some(item => item.r_code === arr.r_code) ? index : null
    //         ).filter(index => index !== null);

    //         setFilterIndex(filterIndex2);

    //         //Room에서 필터된 인덱스 저장
    //         const filterRcode2 = Room.map((arr) =>
    //             headFilter2.some(item => item.r_code === arr.r_code) ? arr.r_code : null
    //         ).filter(arr => arr !== null);

    //         setFilterRcode(filterRcode2);

    //     }else{
    //         setDateFilter(false);
    //         setHeadFilter([]);
    //     }

    //     setSearch(true);
    //     //console.log(DayData[1]);
    // }

    console.log("========================");
        console.log(filterIndex);

    //예약하기 버튼클릭시 예약정보 보내기
    const payClick = (headCount,roomId) =>{   
        if (search && !dateFilter) {
            setModalContent(
                <>
                <p className="icon" style={{
                    border: '0',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    textAlign: 'center',
                    backgroundColor: '#e7e7e7'
                }}>
                    <i className="fa-solid fa-exclamation" style={{
                    fontSize: '21px',
                    color: '#6b6b6b',
                    lineHeight: '41px'
                    }} />
                </p>
                <p className="txt" style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '15px 0 11px'
                }}>
                    예약날짜를 다시 설정해주세요.
                </p>
                </>
            );
            toggle();
            return;
        } else if (search && dateFilter && headFilter.length === 0) {
            setModalContent(
                <>
                <p className="icon" style={{
                    border: '0',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    textAlign: 'center',
                    backgroundColor: '#e7e7e7'
                }}>
                    <i className="fa-solid fa-exclamation" style={{
                    fontSize: '21px',
                    color: '#6b6b6b',
                    lineHeight: '41px'
                    }} />
                </p>
                <p className="txt" style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '15px 0 11px'
                }}>
                    예약인원을 다시 설정해주세요.
                </p>
                </>
            );
            toggle();
            return;
        } else {
            setPayHead(headCount);
            setHotelNum(roomId);
            navigate('/pay');
            return;
        }        
    }

    const [slider, setSlider] = useState(false);
    const [bigImg, setBigImg] = useState(`/img/${Hotel.h_Img}`);

    useEffect(() => {
        // 날짜/인원 값이 준비된 순간 자동 조회
        if (Hotel?.h_code && DayData?.[0] && DayData?.[1] && head) {
            searchClick(); // axios로 /api/room/available 호출
            setSearch(true); // "검색한 상태"로 취급
        }
    }, []);
        // [Hotel?.h_code, DayData?.[0], DayData?.[1], head]

        // 객실 검색
    const searchClick = async () => {

        const hotelOk =
        new Date(Hotel.startDate) <= new Date(DayData[1]) &&
        new Date(Hotel.endDate)   >= new Date(DayData[0]);

        if (!hotelOk) {
            setDateFilter(false);
            setHeadFilter([]);
            return;
        }

        setDateFilter(true);

        try {
            // 서버에서 “예약 가능한 객실만” 받기
            const res = await axios.get("/api/room/available", {
                params: {
                    h_code : Hotel.h_code,
                    maxOccupancy : head,
                    check_in_date : DayData[0],
                    check_out_date : DayData[1],
                },
            });
            
            const availableRooms = res.data ?? [];
            console.log('availableRooms', availableRooms)
            setResultRooms(availableRooms);

            const headFilter2 = Room.filter((item)=>item.maxOccupancy >= head);
            setHeadFilter(headFilter2);
            console.log('headFilter2', headFilter2)

            const codeToIndex = new Map(Room.map((r, idx) => [r.r_code, idx]));
            const filterIndex2 = availableRooms.map(r => codeToIndex.get(r.r_code)).filter(v => v !== undefined);
            setFilterIndex(filterIndex2);

            const filterRcode2 = availableRooms.map(r => r.r_code);
            setFilterRcode(filterRcode2);

        } catch (error) {
            console.error(error);
            setResultRooms([]);
        }
        setSearch(true);
    }

        

    const roomsToShow =
    search ? 
    (resultRooms.length > 0 ? resultRooms : Room) : Room;
    console.log('roomsToShow', roomsToShow)
    console.log('search', search)
    console.log('resultRooms', resultRooms)


    // set => 중복 제거 배열
    const availableSet = new Set(resultRooms.map(r => r.r_code));

    return(
        <div className="detail" onClick={()=>setCal(false)}>
            <section className="detail-wrap">
                {slider &&
                    <div className='hotel-modal-Overlay'>
                        <div className="hotel-img-slider">
                            <button className='closeBtn' onClick={()=>setSlider(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <div className="hotel-img" style={{borderRadius:'7px',position:'relative'}}>
                                <div className="bigImg">
                                    <img src={bigImg} alt={Hotel.hotelName} />
                                </div>
                                <div className="hotel-thumb">
                                    <img src={`/img/${Hotel.h_Img}`} alt={Hotel.hotelName} onClick={()=>setBigImg(`/img/${Hotel.h_Img}`)} />
                                    <img src={`/img/${Hotel.h_s_Img1}`} alt={Hotel.hotelName} onClick={()=>setBigImg(`/img/${Hotel.h_s_Img1}`)} />
                                    <img src={`/img/${Hotel.h_s_Img2}`} alt={Hotel.hotelName} onClick={()=>setBigImg(`/img/${Hotel.h_s_Img2}`)} />
                                    <img src={`/img/${Hotel.h_s_Img3}`} alt={Hotel.hotelName} onClick={()=>setBigImg(`/img/${Hotel.h_s_Img3}`)} />
                                    <img src={`/img/${Hotel.h_s_Img4}`} alt={Hotel.hotelName} onClick={()=>setBigImg(`/img/${Hotel.h_s_Img4}`)} />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                }
            <ul className="detail-img">
                    <li onClick={()=>setSlider(true)}>
                        <img src={`/img/${Hotel.h_Img}`} alt={Hotel.hotelName} />                    
                    </li>
                    <li onClick={()=>setSlider(true)}>
                        <img src={`/img/${Hotel.h_s_Img1}`} alt={Hotel.hotelName} />                    
                    </li>
                    <li onClick={()=>setSlider(true)}>
                        <img src={`/img/${Hotel.h_s_Img2}`} alt={Hotel.hotelName} />                    
                    </li>
                    <li onClick={()=>setSlider(true)}>
                        <img src={`/img/${Hotel.h_s_Img3}`} alt={Hotel.hotelName} />                    
                    </li>
                    <li onClick={()=>setSlider(true)}>
                        <img src={`/img/${Hotel.h_s_Img4}`} alt={Hotel.hotelName} />                    
                    </li>
            </ul>
            <div className="detail-content">
                    <div className="detail-left" ref={triggerRef}>
                        <div className="detail-title">
                                <div className="title-left">
                                    <p className='hotelType'>{Hotel.type==='Hotel'?'호텔':Hotel.type==='Resort'?'리조트':Hotel.type==='GuestHouse'?'게스트하우스/비앤비':Hotel.type==='Condo'?'콘도':'캠핑장'}</p>
                                    <h1>{Hotel.hotelName}</h1>
                                    <p className='hotelCity'><i className="fa-solid fa-location-dot"></i> {Hotel.city === 'Sokcho'?'대한민국, 강원도 속초시':Hotel.city === 'Gyeongju'?'대한민국, 경상북도 경주시':Hotel.city === 'Busan'?'대한민국, 부산시':Hotel.city === 'Gangneung'?'대한민국, 강원도 강릉시':Hotel.city === 'Yeosu'?'대한민국, 전라남도 여수시':Hotel.city === 'Daejeon'?'대한민국, 대전시':Hotel.city === 'Gwangju'?'대한민국, 광주시':Hotel.city === 'Jeju'?'대한민국, 제주도':Hotel.city === 'Pohang'?'대한민국, 경상북도 포항시':Hotel.city === 'Seoul'?'대한민국, 서울시':Hotel.city === 'Tokyo'?'일본, 도쿄':Hotel.city === 'Sapporo'?'일본, 훗카이도 삿포로':Hotel.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':Hotel.city === 'NewYork'?'미국, 뉴욕':Hotel.city === 'Guam'?'미국, 괌':Hotel.city === 'Zhangjiajie'?'중국, 후난성 장가계':Hotel.city === 'Shanghai'?'중국, 상하이':Hotel.city === 'Rome'?'이탈리아, 로마':Hotel.city === 'Venice'?'이탈리아, 베네치아':Hotel.city === 'Paris'?'프랑스, 파리':null}</p>
                                    {starImg.map((star,index)=>(
                                        <img src={star} alt="score" key={index} />
                                    ))}
                                    {RoomReview.length === 0 ? 
                                    (
                                        <>
                                            <span className='starScore'>
                                                <img alt="score" class="star" src="/img/star-zero.png" />
                                                <img alt="score" class="star" src="/img/star-zero.png" />
                                                <img alt="score" class="star" src="/img/star-zero.png" />
                                                <img alt="score" class="star" src="/img/star-zero.png" />
                                                <img alt="score" class="star" src="/img/star-zero.png" />
                                            </span>
                                            <span className='scoreCount'>{(RoomReview.length).toLocaleString()}명 평가</span>
                                        </>
                                    ) 
                                    : 
                                    (
                                        <>
                                            <span className='starScore'>{(hotelScore - Math.floor(hotelScore) === 0) ? hotelScore+'.0' : Math.trunc(hotelScore * 10) / 10}</span>
                                            <span className='scoreCount'>{(RoomReview.length).toLocaleString()}명 평가</span>
                                        </>
                                    )}
                                    
                                </div>
                                <div className="title-right">
                                    {Hotel.discount === 1 ? (
                                        <>
                                            <p className='discount'><span className='red'>10% 할인</span> <span className='origin-price'>
                                                {Hotel.minPrice.toLocaleString()}
                                                원</span></p>
                                            <p className='final-price'>
                                                {Math.floor(Hotel.minPrice - (Hotel.minPrice*0.1)).toLocaleString()}
                                                원<span>/1박</span></p>
                                        </>
                                    ):(
                                        <>
                                            <p className='discount'><span className='red'>회원가입시 10,000원 할인쿠폰</span></p>
                                            <p className='final-price'>
                                                {Math.floor(Hotel.minPrice).toLocaleString()}
                                                원<span>/1박</span></p>
                                        </>
                                    )}
                                    <div className="btns">
                                        <button type='button' onClick={()=>wishHandler(Hotel.h_code)}>
                                            <i className="fa-solid fa-heart" style={
                                            wish.find((item) => item.h_code === Number(Hotel.h_code)) ?
                                                {color:'#f94239'}
                                            :
                                                {color:'#6b6b6b'}
                                            
                                            }></i>
                                        </button>
                                        <button type='button' onClick={shareClick}>
                                            <i className="fa-solid fa-share-nodes"></i>
                                        </button>
                                        <button type='button' onClick={()=>{setModalContent(
                                            <div className="hotel-map" style={{position:'relative'}}>
                                                <p className='map-title'>위치안내</p>
                                                <LeafletMap city={Hotel.city} hotelName={Hotel.hotelName} style={{width:'800px',height:'600px',border: '1px solid #e7e7e7',borderRadius:'10px'}} key={Hotel.h_code}/>
                                                <p className='map-address'>
                                                    <i className="fa-solid fa-location-dot"></i>&nbsp;
                                                    {Hotel.city === 'Sokcho'?'대한민국, 강원도 속초시':Hotel.city === 'Gyeongju'?'대한민국, 경상북도 경주시':Hotel.city === 'Busan'?'대한민국, 부산시':Hotel.city === 'Gangneung'?'대한민국, 강원도 강릉시':Hotel.city === 'Yeosu'?'대한민국, 전라남도 여수시':Hotel.city === 'Daejeon'?'대한민국, 대전시':Hotel.city === 'Gwangju'?'대한민국, 광주시':Hotel.city === 'Jeju'?'대한민국, 제주도':Hotel.city === 'Pohang'?'대한민국, 경상북도 포항시':Hotel.city === 'Seoul'?'대한민국, 서울시':Hotel.city === 'Tokyo'?'일본, 도쿄':Hotel.city === 'Sapporo'?'일본, 훗카이도 삿포로':Hotel.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':Hotel.city === 'NewYork'?'미국, 뉴욕':Hotel.city === 'Guam'?'미국, 괌':Hotel.city === 'Zhangjiajie'?'중국, 후난성 장가계':Hotel.city === 'Shanghai'?'중국, 상하이':Hotel.city === 'Rome'?'이탈리아, 로마':Hotel.city === 'Venice'?'이탈리아, 베네치아':Hotel.city === 'Paris'?'프랑스, 파리':null}
                                                    &nbsp;{Hotel.hotelName}
                                                    <button type='button' onClick={()=>{AddressCopyClick();addressCopy2();}}>주소복사</button>
                                                </p>
                                            </div>
                                        );
                                        toggle();
                                        }}>
                                            <i className="fa-solid fa-location-dot"></i>
                                        </button>                   
                                    </div>
                                </div>
                        </div>

                        <div className="service">
                            <p className='service-title'>서비스 및 부대시설</p>
                            <div className="service-icon">
                                {publicService01.map((item,index)=>(
                                    <span key={index} className='icon'>
                                        {item === '피트니스' ? <i className="fa-solid fa-dumbbell"> <span>피트니스</span></i>  : item === '레스토랑' ? <i className="fa-solid fa-utensils"> <span>레스토랑</span></i> : item === '사우나' ? <i className="fa-solid fa-hot-tub-person"> <span>사우나</span></i> : item === '실내수영장' ? <i className="fa-solid fa-water-ladder"> <span>실내수영장</span></i> : item === '야외수영장' ? <i className="fa-solid fa-person-swimming"> <span>야외수영장</span></i> : item === '편의점' ? <i className="fa-solid fa-store"> <span>편의점</span></i> : item === '바' ?  <i className="fa-solid fa-wine-glass"> <span>바</span></i> : item === '라운지' ? <i className="fa-solid fa-couch"> <span>라운지</span></i> : item === '엘리베이터' ? <i className="fa-solid fa-elevator"> <span>엘리베이터</span></i> : item === '비즈니스센터' ? <i className="fa-solid fa-briefcase"> <span>비즈니스센터</span></i> : item === '건조기' ? <i className="fa-solid fa-sun"> <span>건조기</span></i> : item === '탈수기' ? <i className="fa-solid fa-droplet"> <span>탈수기</span></i>  : item === '바베큐' ? <i className="fa-solid fa-drumstick-bite"> <span>바베큐</span></i> : null}
                                    </span>
                                ))}
                                {roomservice01.map((item,index)=>(
                                    <span key={index} className='icon'>
                                        {item === '무선인터넷' ? <i className="fa-solid fa-wifi"> <span>무선인터넷</span></i> : item === '욕실용품' ? <i className="fa-solid fa-soap"> <span>욕실용품</span></i> : item === '샤워실' ? <i className="fa-solid fa-shower"> <span>샤워실</span></i> : item === 'TV' ? <i className="fa-solid fa-tv"> <span>텔레비전</span></i> : item === '실내수영장' ? <i className="fa-solid fa-water-ladder"> <span>실내수영장</span></i> : item === '욕조' ? <i className="fa-solid fa-bath"> <span>욕조</span></i> : item === '객실내취사' ? <i className="fa-solid fa-kitchen-set"> <span>객실내취사</span></i> : item === '금연' ? <i className="fa-solid fa-ban-smoking"> <span>금연</span></i> : item === '에어컨' ? <i className="fa-solid fa-fan"> <span>에어컨</span></i> : item === '드라이기' ? <i className="fa-solid fa-wind"> <span>드라이기</span></i> : item === '냉장고' ? <i className="fa-solid fa-snowflake"> <span>냉장고</span></i> : item === '개인콘센트' ? <i className="fa-solid fa-plug"> <span>개인콘센트</span></i> : item === '전기주전자' ? <i className="fa-solid fa-blender"> <span>전기주전자</span></i>:null}
                                    </span>
                                ))}
                                    {otherService01.map((item,index)=>(
                                    <span key={index} className='icon'>
                                        {item === '스프링클러' ? <i className="fa-solid fa-fire-extinguisher"> <span>스프링클러</span></i> : item === '반려견동반' ? <i className="fa-solid fa-dog"> <span>반려견동반</span></i> : item === '카드결제' ? <i className="fa-regular fa-credit-card"> <span>카드결제</span></i> : item === '짐보관가능' ? <i className="fa-solid fa-cart-flatbed-suitcase"> <span>짐보관가능</span></i> : item === '개인사물함' ? <i className="fa-solid fa-lock"> <span>개인사물함</span></i> : item === '픽업서비스' ? <i className="fa-solid fa-taxi"> <span>픽업서비스</span></i> : item === '캠프파이어' ?  <i className="fa-solid fa-campground"> <span>캠프파이어</span></i> : item === '무료주차' ? <i className="fa-solid fa-square-parking"> <span>무료주차</span></i> : item === '조식제공' ? <i className="fa-solid fa-bowl-food"> <span>조식제공</span></i> : null}
                                    </span>
                                ))}                                
                            </div>
                        </div>
                        
                        <div className="room-select">
                            <p className='room-title'>객실 선택</p>
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
                            ): search && dateFilter && resultRooms.length === 0
                            ?(
                                <div className="empty-room">
                                    <p className='x-icon'>
                                        <i className="fa-solid fa-xmark"></i>
                                    </p>
                                    <p className='empty-tit'>설정한 인원/날짜에 부합하는 객실이 없습니다.</p>
                                    <p className='empty-txt'>객실별 투숙 가능 인원을 다시 확인해주세요.</p>
                                    <p className='empty-bottom'>아래 객실들은 설정한 인원보다 투숙 가능한 인원이 적은 객실입니다.</p>
                                </div>
                            ) : null}
                            <ul>
                                {roomsToShow.map((item,index)=>(
                                    <li key={item.r_code ?? index}>
                                        <div className="room-left">
                                            {/* <img src={`/img/${Hotel.h_code}-${index+2}.jpg`} alt={Hotel.hotelName} /> */}
                                            {index === 0 ? 
                                                <img src={`/img/${Hotel.h_s_Img1}`} alt={Hotel.hotelName} /> 
                                                : 
                                                index === 1 ? 
                                                <img src={`/img/${Hotel.h_s_Img2}`} alt={Hotel.hotelName} />
                                                :
                                                index === 2 ? 
                                                <img src={`/img/${Hotel.h_s_Img3}`} alt={Hotel.hotelName} />
                                                :
                                                index === 3 ? 
                                                <img src={`/img/${Hotel.h_s_Img4}`} alt={Hotel.hotelName} />
                                                :
                                                ""
                                                }
                                            
                                        </div>
                                        <div className="room-right">
                                            <h2>{item.roomName}</h2>
                                            <div className="room-intro">
                                                <div className="intro-left">
                                                    {avgRoom[filterIndex[index]] && avgRoom[filterIndex[index]]?.map((star, ind) => (
                                                        <img src={star} alt="roomScore" key={ind} />
                                                    ))}
                                                    <span className='starScore'>
                                                        {
                                                            (() => {
                                                                const score = RatingAvgData.find(it => it.r_code === item.r_code)?.scoreAvg ?? 0;
                                                                return score - Math.floor(score) === 0
                                                                    ? score + '.0'
                                                                    : Math.trunc(score * 10) / 10;
                                                            })()
                                                        }
                                                    </span>
                                                </div>
                                                <div className="intro-right">
                                                    <button type='button' onClick={()=>{
                                                        setModalContent(
                                                            <div className='room-explan'>
                                                                <p className='room-tit'>{item.roomName}</p>
                                                                <div className="room-part">
                                                                    <p className='tit'>객실 정보</p>
                                                                    <ul>
                                                                        <li><span>대실</span> 최대 3시간 이용(마감시간 22시 까지)</li>
                                                                        <li><span>체크인</span> 15:00 ~ <span>체크아웃</span> 11:00</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="room-part">
                                                                    <p className='tit'>할인 쿠폰 안내</p>
                                                                    <ul>
                                                                        <li>할인 쿠폰은 예약페이지에서 사용이 가능합니다.</li>
                                                                        <li>본 혜택은 제휴점 및 에코스테이 사정에 의해 변경/중지될 수 있습니다.</li>
                                                                        <li>방문 결제 및 비회원 예약은 대상에서 제외됩니다.</li>
                                                                    </ul>
                                                                </div>
                                                            </div>                                            
                                                        );
                                                toggle();}}>상세정보 <i className="fa-solid fa-angle-right"></i></button>
                                                </div>
                                            </div>
                                            <div className="room-info">
                                                <p><i className="fa-solid fa-ban"></i> <span className='bold'>무료 취소불가</span></p>
                                                <p><i className="fa-regular fa-clock"></i> 체크인 <span className='bold'>15:00</span> ~ 체크아웃 <span className='bold'>11:00</span></p>
                                                <p><i className="fa-solid fa-user-group"></i> 최대 투숙객 수 : <span className='bold'>{item.maxOccupancy}명</span></p>
                                                <p><i className="fa-solid fa-tag"></i> <span className='bold'>할인혜택 :</span>
                                                    <span className='red'>
                                                        {Hotel.discount === 1 ? 
                                                            '10%할인 이벤트 중'
                                                        :
                                                            '회원가입시 10,000원 할인쿠폰'
                                                        }
                                                    </span>
                                                </p>
                                                <div className="room-pay">
                                                    {Hotel.discount === 1 ? 
                                                        <>
                                                            <span className='origin-price'>
                                                                {(item.price).toLocaleString()}
                                                                원</span>
                                                            <span className='final-price'>
                                                                {((item.price) - ((item.price)*0.1)).toLocaleString()}
                                                                원<span>/1박</span></span>
                                                        </>                                                    
                                                    :                                                    
                                                        <>
                                                            <span className='final-price'>
                                                                {(item.price).toLocaleString()}
                                                                원<span>/1박</span></span>
                                                        </>
                                                    }
                                                    <button type="button" className="pay"
                                                    disabled={search && !availableSet.has(item.r_code)}
                                                    style={{ cursor: (search && !availableSet.has(item.r_code)) ? 'not-allowed' : 'pointer' }}
                                                    onClick={() => {
                                                        payClick(head, item.r_code);
                                                        window.scrollTo(0, 0);
                                                    }}>
                                                    {search && !availableSet.has(item.r_code) ? "예약불가" : "예약하기"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="hotel-map">
                            <p className='map-title'>위치안내</p>
                            <LeafletMap city={Hotel.city} hotelName={Hotel.hotelName} style={{width:'100%',height:'400px',border: '1px solid #e7e7e7',borderRadius:'10px'}} key={Hotel.h_code}/>
                            <p className='map-address'>
                                <i className="fa-solid fa-location-dot"></i>&nbsp;
                                {Hotel.city === 'Sokcho'?'대한민국, 강원도 속초시':Hotel.city === 'Gyeongju'?'대한민국, 경상북도 경주시':Hotel.city === 'Busan'?'대한민국, 부산시':Hotel.city === 'Gangneung'?'대한민국, 강원도 강릉시':Hotel.city === 'Yeosu'?'대한민국, 전라남도 여수시':Hotel.city === 'Daejeon'?'대한민국, 대전시':Hotel.city === 'Gwangju'?'대한민국, 광주시':Hotel.city === 'Jeju'?'대한민국, 제주도':Hotel.city === 'Pohang'?'대한민국, 경상북도 포항시':Hotel.city === 'Seoul'?'대한민국, 서울시':Hotel.city === 'Tokyo'?'일본, 도쿄':Hotel.city === 'Sapporo'?'일본, 훗카이도 삿포로':Hotel.city === 'LosAngeles'?'미국, 캘리포니아 로스앤젤레스':Hotel.city === 'NewYork'?'미국, 뉴욕':Hotel.city === 'Guam'?'미국, 괌':Hotel.city === 'Zhangjiajie'?'중국, 후난성 장가계':Hotel.city === 'Shanghai'?'중국, 상하이':Hotel.city === 'Rome'?'이탈리아, 로마':Hotel.city === 'Venice'?'이탈리아, 베네치아':Hotel.city === 'Paris'?'프랑스, 파리':null}
                                &nbsp;{Hotel.hotelName}
                                <button type='button' onClick={addressCopy}>주소복사</button>
                            </p>
                        </div>
                        <div className="hotel-score">
                            <p className="score-title">이용자 평점</p>
                            {RoomReview.length === 0 ? 
                            (<>
                                <div className='score-wrap'>
                                    <p className='score-noReview'>아직 작성된 리뷰가 없습니다.</p>
                                </div>
                            </>) 
                            : 
                            (<>
                            <div className="score-wrap">
                                <div className="score-left">
                                    <p className='tit'>이용자 평균 평점</p>
                                    <p className='star'>
                                        {starImg.map((star,index)=>(
                                            <img src={star} alt="score" key={index} />
                                        ))}
                                    </p>
                                    <p className='score'>
                                        {(hotelScore - Math.floor(hotelScore) === 0) ? hotelScore+'.0' : Math.trunc(hotelScore * 10) / 10}
                                        <span>/5</span></p>
                                </div>
                                <div className="score-middle">
                                    <p className='tit'>전체 평점 수</p>
                                    <p className='icon'><i className="fa-solid fa-user-group"></i></p>
                                    <p className='count'>{(RoomReview.length).toLocaleString()}</p>
                                </div>
                                <div className="score-right">
                                    <p className='tit'>평점 비율</p>
                                    <div className="graph">
                                        <div className="bar-wrap">
                                            <span>5점</span>
                                            <div className="bar-width">
                                                <div className="bar"  style={{width: `${(starCount.star5/starCountTotal)*100}%`}}></div>
                                            </div>
                                            <span className="percent">{Math.round((starCount.star5/starCountTotal)*100)}%</span>
                                        </div>
                                        <div className="bar-wrap">
                                            <span>4점</span>
                                            <div className="bar-width">
                                                <div className="bar" style={{width: `${starCount.star4/starCountTotal*100}%`}}></div>
                                            </div>
                                            <span className="percent">{Math.round((starCount.star4/starCountTotal)*100)}%</span>
                                        </div>
                                        <div className="bar-wrap">
                                            <span>3점</span>
                                            <div className="bar-width">
                                                <div className="bar" style={{width: `${starCount.star3/starCountTotal*100}%`}}></div>
                                            </div>
                                            <span className="percent">{Math.round((starCount.star3/starCountTotal)*100)}%</span>
                                        </div>
                                        <div className="bar-wrap">
                                            <span>2점</span>
                                            <div className="bar-width">
                                                <div className="bar" style={{width: `${starCount.star2/starCountTotal*100}%`}}></div>
                                            </div>
                                            <span className="percent">{Math.round((starCount.star2/starCountTotal)*100)}%</span>
                                        </div>
                                        <div className="bar-wrap">
                                            <span>1점</span>
                                            <div className="bar-width">
                                                <div className="bar" style={{width: `${starCount.star1/starCountTotal*100}%`}}></div>
                                            </div>
                                            <span className="percent">{Math.round((starCount.star1/starCountTotal)*100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="score-bottom">
                                <div className="bottom-left">
                                    <p className='score-tit'>이용자 평가</p>
                                    <p className='score-review'>한줄리뷰</p>
                                    <p className='score-txt'>※ 실제 이용객분들께서 남겨주신 한줄평입니다.</p>
                                </div>
                                <div className="bottom-right">
                                    <div className="review-wrap">
                                        {Room.map((item,index)=>(
                                            <div className='room-div' key={index}>
                                                <div className="hotel-img-wrap">
                                                    {index === 0 ? 
                                                        <img src={`/img/${Hotel.h_s_Img1}`} className='hotel-img' alt={Hotel.hotelName} /> 
                                                        : 
                                                        index === 1 ? 
                                                        <img src={`/img/${Hotel.h_s_Img2}`} className='hotel-img' alt={Hotel.hotelName} />
                                                        :
                                                        index === 2 ? 
                                                        <img src={`/img/${Hotel.h_s_Img3}`} className='hotel-img' alt={Hotel.hotelName} />
                                                        :
                                                        index === 3 ? 
                                                        <img src={`/img/${Hotel.h_s_Img4}`} className='hotel-img' alt={Hotel.hotelName} />
                                                        :
                                                        ""
                                                    }
                                                </div>

                                                <div className="review-txt-wrap">
                                                    {RoomReviewArr[index].length != 0 ? (
                                                    RoomReviewArr[index]?.map((review,ind)=>(
                                                        //여기서는 객실별 후기 3개씩만 보여지게
                                                        ind <= 2 ?
                                                            <p key={ind}>
                                                                <span className='room'>{item.roomName}</span>
                                                                {starRoom[index] && starRoom[index][ind] && starRoom[index][ind].map((star,i)=>(
                                                                    <img src={star} alt="star" key={i} className='star' />
                                                                ))}
                                                                <span className='review'>{review.rb_score}점</span>
                                                                <i className='comment-wrap'>
                                                                    {review.rb_score === 5 ?(<>
                                                                        <img src="/img/score-5.png" alt="score" className='score' />
                                                                        <span className='comment'>정말 최고에요</span></>
                                                                    ):review.rb_score === 4 ?(<>
                                                                        <img src="/img/score-4.png" alt="score" className='score' />
                                                                        <span className='comment'>만족스러워요</span></>
                                                                    ):review.rb_score === 3 ?(<>
                                                                        <img src="/img/score-3.png" alt="score" className='score' />
                                                                        <span className='comment'>보통이었어요</span></>
                                                                    ):review.rb_score === 2 ?(<>
                                                                        <img src="/img/score-2.png" alt="score" className='score' />
                                                                        <span className='comment'>그저 그랬어요</span></>
                                                                    ):(<><img src="/img/score-1.png" alt="score" className='score' />
                                                                        <span className='comment'>최악이에요</span></>
                                                                    )}
                                                                    {/* {smileRoom[index] && smileRoom[index][ind] && <img src={smileRoom[index][ind]} alt="score" className='score' />}
                                                                    <span className='comment'>{item.comment[ind]}</span> */}
                                                                </i>
                                                            </p>
                                                        :
                                                            null
                                                    ))
                                                    ):(
                                                        <p style={{textAlign: 'center',marginTop: '36px',fontSize: '14px',fontWeight: '600',marginLeft: '86px'}}>
                                                            현재 작성된 리뷰가 없습니다.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="more">
                                                    <p className='more-txt'>더보기</p>
                                                    <button type='button' onClick={()=>{
                                                        setModalContent(
                                                            <>
                                                            <h4 className='room-tit'>전체 객실 이용자 평가</h4>
                                                            <div className='room-div'>
                                                                <div className="hotel-img-wrap">
                                                                    <img src={`/img/${Hotel.h_code}-${index+2}.jpg`} alt={Hotel.hotelName} className='hotel-img'/>
                                                                </div>
                                                                <div className="review-txt-wrap">
                                                                    {RoomReviewArr[index]?.map((review,ind)=>(
                                                                        <p key={ind}>
                                                                            <span className='room'>{item.roomName}</span>
                                                                            {starRoom[index] && starRoom[index][ind] && starRoom[index][ind].map((star,i)=>(
                                                                                <img src={star} alt="star" key={i} className='star' />
                                                                            ))}
                                                                            <span className='review'>{review.rb_score}점</span>
                                                                            <i className='comment-wrap'>
                                                                                {review.rb_score === 5 ?(<>
                                                                                    <img src="/img/score-5.png" alt="score" className='score' />
                                                                                    <span className='comment'>정말 최고에요</span></>
                                                                                ):review.rb_score === 4 ?(<>
                                                                                    <img src="/img/score-4.png" alt="score" className='score' />
                                                                                    <span className='comment'>만족스러워요</span></>
                                                                                ):review.rb_score === 3 ?(<>
                                                                                    <img src="/img/score-3.png" alt="score" className='score' />
                                                                                    <span className='comment'>보통이었어요</span></>
                                                                                ):review.rb_score === 2 ?(<>
                                                                                    <img src="/img/score-2.png" alt="score" className='score' />
                                                                                    <span className='comment'>그저 그랬어요</span></>
                                                                                ):(<><img src="/img/score-1.png" alt="score" className='score' />
                                                                                    <span className='comment'>최악이에요</span></>
                                                                                )}
                                                                            </i>
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            </>
                                                        );
                                                        toggle();}}>
                                                        <i className="fa-solid fa-angle-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </>)}
                        </div>
                        <div className="hotel-info" >
                            <div className="info-wrap" style={{height: more === false ? '500px' : '100%'}}>
                                <h4 className='info-tit'>숙소 이용 정보</h4>

                                <div className="info-part2">
                                    <p className='info-subtit'>
                                        <i className="fa-solid fa-leaf"></i>
                                        &nbsp;일회용품 줄이기 함께 실천해요
                                    </p>
                                    <ul>
                                        <li>자원재활용법에 따라 2024년 3월 29일부터 일부 숙소에서는 일회용 어메니티가 무료로 제공되지 않아요.</li>
                                        <li>일회용 어메니티 별도 구매는 프론트에 문의해주세요.</li>
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>기본정보</p>
                                    <ul>
                                        <li>체크인 : 15:00 / 체크아웃 : 11:00</li>
                                        <li>22시 이후 체크인 시 호텔 프론트 문의</li>
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>인원 추가 정보</p>
                                    <ul>
                                        <li>기준인원 외 투숙시 추가 비용 발생</li>
                                        <li>영유아 인원수 포함 / 최대인원 초과 불가</li>
                                        <li>인원추가로 인한 비용은 현장결제</li>
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>취사 시설</p>
                                    <ul>
                                        <li>객실 내 취사가능한 객실 외 모든 객실에서는 취사가 불가합니다.  </li>
                                        <li>객실 내 육류 , 튀김류, 생선류 조리 금지</li>                                
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>반려견 이용 정책</p>
                                    <ul>
                                        <li>반려견 동반 객실을 제외한 모든 객실은 반려견 동반 입실이 불가합니다.</li>
                                        <li>반려견 동반 투숙 시 반려견의 몸무게 6kg 미만의 소형견만 입실 가능합니다.</li>
                                        <li>1마리 이상의 반려견 추가 시 추가 비용이 발생합니다.(호텔 프론트에 문의)</li>
                                        <li>엘레베이터 탑승 시 반려견을 안고 탑승하여 주시기 바랍니다.</li>
                                        <li>객실 내ᆞ외부에 동반 반려견을 절대 혼자 두어서는 안되며, 보호자의 부주의로 인한 사고 및 동반 반려견 분실에 대해서 호텔은 책임을 지지 않습니다.</li>
                                        <li>다른 반려견 또는 사람에게 심한 짖음과 공격성을 보이는 반려견은 환불없이 퇴실 조치가 취해질 수 있습니다.</li>
                                        <li>동반 반려견이 다른 고객과 반려견에게 피해를 주거나 사고가 발생한 경우 당사자 간의 해결을 원칙으로 하고, 호텔에 책임을 물을 수 없습니다.</li>
                                        <li>호텔에 반려견이 투숙하는 것과 관련하여 발생한 실제 손실, 요구, 피해, 책임, 경비 및 비용(대리인/변호사 수수료 및 소송 비용 포함)에 대하여 “호텔 주체”를 위해 변상함에 동의하는 것으로 간주합니다.</li>
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>취소 및 환불 규정</p>
                                    <ul>
                                        <li>체크인일 기준 5일 전 : 100% 환불</li>
                                        <li>체크인일 기준 4일 전 : 70% 환불</li>
                                        <li>체크인일 기준 3일 전 : 50% 환불</li>
                                        <li>체크인일 기준 2일 전 : 30% 환불</li>
                                        <li>체크인일 기준 1일 전~당일 및 No-show : 환불 불가</li>
                                        <li>취소, 환불 시 수수료가 발생할 수 있습니다.</li>
                                    </ul>
                                </div>
                                <div className="info-part">
                                    <p className='info-subtit'>확인사항 및 기타</p>
                                    <ul>
                                        <li>위의 정보는 호텔의 사정에 따라 변경될 수 있습니다.</li>
                                        <li>미성년자는 보호자 동반 없이 이용이 불가합니다.</li>
                                        <li>이미지는 실제와 상이할 수 있습니다.</li>
                                        <li>체크인 시 배정 상품 또는 베드 타입이 미기재된 상품은 특정 객실과 베드 타입을 보장하지 않습니다.</li>
                                        <li>객실가는 세금, 봉사료가 포함된 금액입니다.</li>
                                    </ul>
                                </div>
                            </div>
                            {more === false ? (
                                <>
                                    <div className="white"></div>
                                    <button type='button' onClick={()=>setMore(true)}>더보기</button>
                                </>
                            ):(
                                null
                            )}                    
                        </div>
                    </div>
                    <div className={`detail-right ${isFixed ? 'fixed' : null}`}>
                        {Cal &&
                            <div className="Cal" style={{position:'absolute',left:'-655px'}} onClick={ e =>{
                                setCal((Cal === true) ? true : false);
                                e.stopPropagation();
                            }}>
                                <Calendar/>
                            </div>
                        }
                        <div className="hotel-day">
                            <p className='day-wrap'>
                                <span className='day-tit'>예약일</span>
                                <span className='day-txt'>{DayData.length < 2 ? `${year}-${month+1}-${date}` : `${DayData[0]}`}</span>
                            </p>
                            <p className='day-wrap'>
                                <span className='day-tit'>종료일</span>
                                <span className='day-txt'>{DayData.length < 2 ? `${year}-${month+1}-${date + 1}` : `${DayData[1]}`}</span>
                            </p>
                            <button type='button' onClick={ e =>{
                                setCal((Cal === true) ? false : true);
                                e.stopPropagation();
                            }}>예약일 변경</button>
                        </div>
                        <div className="hotel-headcount">
                            <p className='head-tit'>예약인원 선택</p>
                            <div className="head-select">
                                <span className='head-txt'>인원</span>
                                <div className="btns">
                                    <button type='button' onClick={minusClick} className={head === 1 ? 'die' : null} ><i className="fa-solid fa-minus"></i></button>
                                    <span>{head}</span>
                                    <button type='button' onClick={plusClick} className={head === 30 ? 'die' : null}><i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <button type='button' className='search' onClick={()=>{searchClick();setCal(false);}}>객실 검색</button>
                        </div>
                        <div className="hotel-select">
                            <p className='select-tit'>예약 전 참고사항</p>
                            <p className='select-txt'>· 좌측 <span className='bold'> '객실선택'</span>란에서 <span className='bold'>객실종류 확인 및 예약</span>이 가능합니다.</p>
                            <p className='select-txt'>· 객실종류별 <span className='bold'>최대 투숙객 수</span>를 참고하셔서 인원변경 해주시기 바랍니다.</p>
                            <p className='select-txt'>· <span className='bold red'>회원가입시 10,000원 할인쿠폰</span>이 지급됩니다.</p>
                        </div>
                    </div>
                </div>
                <div className="recommend">
                    <h2>같은 지역의 다른 호텔추천</h2>
                    <div className="recommend-slider">
                        <ul style={{transform: `translateX(-${307 * current01}px)`}}>
                            {RecommData.map((hotel,index)=>(
                                <li key={index}>
                                    <Link to={`/detail/${hotel.h_code}`} onClick={() => window.scrollTo(0,0)}>
                                        <div className="hotel-img-wrap">
                                            <img src={`/img/${hotel.h_code}-1.jpg`} alt={hotel.hotelName} className='hotel-img'/>
                                        </div>
                                        <div className="hotel-txt">
                                            <p className='hotel-type'>{hotel.type==='Hotel'?'호텔':hotel.type==='Resort'?'리조트':hotel.type==='GuestHouse'?'게스트하우스/비앤비':hotel.type==='Condo'?'콘도':'캠핑장'}</p>
                                            <h3>{hotel.hotelName}</h3>
                                            <div className="intro-left">
                                                {recommStar && recommStar[index] && recommStar[index].map((star,ind)=>(
                                                    <img src={star} alt="score" key={ind} className='star' />
                                                ))}
                                                <span className='starScore'>
                                                    {RecommAvg[index] && ((RecommAvg[index].scoreAvg - Math.floor(RecommAvg[index].scoreAvg) === 0) ? Math.floor(RecommAvg[index].scoreAvg)+'.0' : Math.trunc(RecommAvg[index].scoreAvg * 10) / 10)}
                                                </span>
                                                <span className='scoreCount'>{RecommAvg[index] && RecommAvg[index].reviewCount}명 평가</span>                                    
                                            </div>
                                            <div className="hotel-price">
                                                {hotel.discount === 1 ? (
                                                    <>
                                                        <p className='discount'><span className='red'>10% 할인</span> <span className='origin-price'>
                                                            {hotel.minPrice}
                                                            원</span></p>
                                                        <p className='final-price'>
                                                            {(hotel.minPrice - (hotel.minPrice*0.1)).toLocaleString()}
                                                            원<span>/1박</span></p>
                                                    </>
                                                ):(
                                                    <>
                                                        <p className='discount'><span className='red'>회원가입시 10,000원 할인쿠폰</span></p>
                                                        <p className='final-price'>
                                                            {(hotel.minPrice).toLocaleString()}원
                                                            <span>/1박</span></p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                    <button type='button' onClick={()=>wishHandler(hotel.h_code)}>
                                        <i className="fa-solid fa-heart" style={
                                        wish.find((item) => item.h_code === Number(hotel.h_code)) ?
                                            {color:'#f94239'}
                                        :
                                            {color:'#6b6b6b'}
                                        
                                        }></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type='button' className='left-arrow' onClick={()=>leftClick(current01,setCurrent01)} style={{display: current01 === 0 ? 'none' : 'block'}}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                    <button type='button' className='right-arrow' onClick={()=>rightClick(current01,setCurrent01,RecommData)} style={{display: current01 === RecommData.length-4 ? 'none' : 'block'}}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
                {/* 찜한 리스트가 있을때만 보여짐 */}
                {wishArray && wishArray.length > 0 && WishAvg && WishAvg.length === wishArray.length &&
                    <div className="wish">
                        <h2>내가 찜한 호텔</h2>
                        <div className="wish-slider">
                            <ul style={{transform: `translateX(-${307 * current02}px)`}}>
                                {wishArray.map((hotel,index)=>(
                                    <li key={index}>
                                        {/* <Link to={`/detail/${hotel.h_code}`} onClick={() => window.scrollTo(0,0)}> */}
                                        <div onClick={() => {window.scrollTo(0,0); navigate(`/detail/${hotel.h_code}`);}}>
                                            <div className="hotel-img-wrap">
                                                <img src={`/img/${hotel.h_Img}`} alt={hotel.hotelName} className='hotel-img'/>
                                            </div>
                                            <div className="hotel-txt">
                                                <p className='hotel-type'>{hotel.type==='Hotel'?'호텔':hotel.type==='Resort'?'리조트':hotel.type==='GuestHouse'?'게스트하우스/비앤비':hotel.type==='Condo'?'콘도':'캠핑장'}</p>
                                                <h3>{hotel.hotelName}</h3>
                                                <div className="intro-left">
                                                    {wishStar && wishStar[index] && wishStar[index].map((star,ind)=>(
                                                        <img src={star} alt="score" key={ind} className='star' />
                                                    ))}
                                                    <span className='starScore'>
                                                        {(WishAvg[index].scoreAvg - Math.floor(WishAvg[index].scoreAvg) === 0) ? WishAvg[index].scoreAvg+'.0' : Math.trunc(WishAvg[index].scoreAvg * 10) / 10}
                                                    </span>
                                                    <span className='scoreCount'>{(WishAvg[index].reviewCount).toLocaleString()}명 평가</span>
                                                </div>
                                                <div className="hotel-price">
                                                    {hotel.discount === 1 ? (
                                                        <>
                                                            <p className='discount'><span className='red'>10% 할인</span> <span className='origin-price'>
                                                                {hotel.minPrice.toLocaleString()}
                                                                원</span></p>
                                                            <p className='final-price'>
                                                                {(hotel.minPrice - (hotel.minPrice*0.1)).toLocaleString()}
                                                                원<span>/1박</span></p>
                                                        </>
                                                    ):(
                                                        <>
                                                            <p className='discount'><span className='red'>회원가입시 10,000원 할인쿠폰</span></p>
                                                            <p className='final-price'>
                                                                {(hotel.minPrice).toLocaleString()}
                                                                원<span>/1박</span></p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button type='button' onClick={()=>wishHandler(hotel.h_code)}>
                                            <i className="fa-solid fa-heart" style={
                                            wish.find((item) => item.h_code === Number(hotel.h_code)) ?
                                                {color:'#f94239'}
                                            :
                                                {color:'#6b6b6b'}
                                            
                                            }></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type='button' className='left-arrow' onClick={()=>leftClick(current02,setCurrent02)} style={{display: current02 === 0 || wishArray.length < 5 ? 'none' : 'block'}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                        <button type='button' className='right-arrow' onClick={()=>rightClick(current02,setCurrent02,wishArray)} style={{display: current02 === wishArray.length-4 || wishArray.length < 5 ? 'none' : 'block'}}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                }
            </section>
        </div>
    )
}