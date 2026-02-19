import { createContext } from "react";
import { useState, useEffect,useContext } from "react";
import cookie from 'js-cookie';
import { ModalContext } from "../Page/Modal";
import axios from "axios";

export const ResortDataContext = createContext();

export default function ResortData({children}){
    
    const [HotelData , setHotelData] = useState([]);
    const [RoomData , setRoomData] = useState([]);
    const [ReviewData , setReviewData] = useState([]);
    const [RatingData , setRatingData] = useState([]);
    const [RatingAvgData , setRatingAvgData] = useState([]);
    const [hotelRatingAvgData, setHotelRatingAvgData] = useState([]);
    const [hotelMinPrice, setHotelMinPrice] = useState([]);

    // axios 사용 - 호텔, 객실
    useEffect(() => {
        // HotelData
        axios.get('/api/hotel/context')
        .then((res) => {
            console.log("호텔 데이터 : ", res.data);
            setHotelData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // RoomData
        axios.get('/api/room/context')
        .then((res) => {
            console.log("객실 데이터 : ", res.data);
            setRoomData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // ReviewData
        axios.get('/api/board/review')
        .then((res) => {
            console.log("리뷰(평점) 데이터 : ", res.data);
            setReviewData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // ReviewRating
        axios.get('/api/board/rating')
        .then((res) => {
            console.log("객실(평점) 데이터 : ", res.data);
            setRatingData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // ReviewRatingAvg
        axios.get('/api/board/ratingAvg')
        .then((res) => {
            console.log("객실(평점) 평균 데이터 : ", res.data);
            setRatingAvgData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
        // hotelRatingAvgData
        axios.get('/api/board/hotelRatingAvg')
        .then((res) => {
            console.log("호텔(평점) 평균 데이터 : ", res.data);
            setHotelRatingAvgData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // hotelMinPrice
        axios.get('/api/hotel/price')
        .then((res) => {
            console.log("호텔 가격(최저가) 데이터 : ", res.data);
            setHotelMinPrice(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

    },[])


    // 휴대폰 번호 상태저장 변수
    const [userNumFront, setUserNumFront] = useState('');
    const [userNumBack, setUserNumBack] = useState('');

    const [DayData,setDayData] = useState(()=>{
        const saved = localStorage.getItem('DayData')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })
    useEffect(()=>{
        localStorage.setItem('DayData',JSON.stringify(DayData))
    },[DayData])

    const [selectDate,setSelectDate] = useState(()=>{
        const saved = localStorage.getItem('selectDate')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })

    useEffect(()=>{
        localStorage.setItem('selectDate',JSON.stringify(selectDate))
    },[DayData])

    const [selectday,setSelectday] = useState(()=>{
        const saved = localStorage.getItem('selectday')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })

    useEffect(()=>{
        localStorage.setItem('selectday',JSON.stringify(selectday))
        console.log(selectDate,selectday,'12-19확인ㅇㅅ')
    },[selectday])

    const [selectMonth,setSelectMonth] = useState(()=>{
        const saved = localStorage.getItem('selectMonth')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ===null ?JSON.parse(saved): new Date("2026-03-01") 
    }) 

    useEffect(()=>{
        localStorage.setItem('selectMonth',JSON.stringify(selectMonth));
    },[selectMonth]) 

    //모달 프로바이더
    const {toggle,setModalContent} = useContext(ModalContext);
    
    //찜목록 id
    const [wish, setWish] = useState([]);

    useEffect(()=>{
        //찜목록 불러오기
        let wishList = JSON.parse(cookie.get('wishList') || '[]');          
        let now = Date.now();
        wishList = wishList.filter(item=>item.expires > now);
        cookie.set('wishList', JSON.stringify(wishList), {expires: 30, path:'/'});
        setWish(wishList);
        //console.log(wishList.length);
    },[]);
    //console.log(wish);

    //찜목록 쿠키 저장 및 삭제
    const wishHandler = (hotel) =>{
        let wishList = JSON.parse(cookie.get('wishList') || '[]');          
        let now = Date.now();

        wishList = wishList.filter(item=>item.expires > now);

        //이미 추가된 아이디가 있으면 삭제
        for(let i=0; i<wishList.length; i++){
            if(wishList[i].id === Number(hotel)){
                wishList = wishList.filter((item)=>item.id !== Number(hotel));
                cookie.set('wishList', JSON.stringify(wishList), {expires: 30, path:'/'});
                setWish(wishList);
                return;
            }
        }
        //갯수 50개 제한
        if(wishList.length > 50){
            setModalContent(
                <>
                    <p className='icon' style={{border: '0',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        margin: '0 auto',
                        textAlign: 'center',
                        backgroundColor: '#e7e7e7'}}>
                        <i className="fa-solid fa-exclamation" style={{
                            fontSize: '21px',
                            color: '#6b6b6b',
                            lineHeight: '41px'
                        }}></i>
                    </p>
                    <p className='txt' style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#000',
                        margin: '15px 0 11px'
                    }}>찜은 50개까지 추가 가능합니다.</p>
                </>
            );
            toggle();
            return;
        }
        //30일간 보관(추가한 리스트 개별로)
        wishList.push({id: Number(hotel), expires: now + 30*24*60*60*1000});

        cookie.set('wishList', JSON.stringify(wishList), {expires: 30, path:'/'});   
        setWish(wishList);
    }

    //찜목록 id불러온후 해당 호텔정보 배열로 저장
    const [wishArray, setWishArray] = useState([]);
    //찜한호텔 별점 이미지
    const[wishStar, setWishStar] = useState([]);
    
    useEffect(()=>{
        if(wish.length === 0){
            setWishArray([]);
            return;
        }     
        let wishIdArray = [];
        wishIdArray = wish.map(item=>item.id);

        let wishArray2= [];
        wishArray2 = HotelData.filter(item=>wishIdArray.includes(item.id));
        
        setWishArray(wishArray2);

        //찜한호텔 별점
        const wishStar2 = [];
        const wishStarImg = [];

        for(let i=0; i<wishArray2.length; i++){
            wishStar2.push(wishArray2[i].score);

            wishStarImg[i] = [];
                        
            //별점 정수
            const starInt2 = Math.floor(wishStar2[i]);
            //별점 소수
            const starFloat2 = Math.floor(wishStar2[i]*10)/10 - starInt2;
            //별점 빈칸
            const starZero2 = Math.floor(5 - starInt2- starFloat2);
            
            for(let k=0; k<starInt2; k++){
                wishStarImg[i].push('/img/star-one.png');                  
            }
            if(starFloat2>0){
                wishStarImg[i].push('/img/star-half.png');                    
            }
            for(let j=0; j<starZero2; j++){
                wishStarImg[i].push('/img/star-zero.png');                    
            }
        }
        setWishStar(wishStarImg);
        console.log(wishStarImg);
        
    },[wish]);        
        //console.log(wishArray);
        // 로그인 한 후 닉네임 저장
        const [userNickName, setUserNickName] = useState(null);

        useEffect(() => {
            const saveNickName = localStorage.getItem('userNickName');
            if(saveNickName){
                setUserNickName(JSON.parse(saveNickName))
            }
        },[]);

        // 로그인
        const loginSave = (userData) => {
            setUserNickName(userData);
            localStorage.setItem('userNickName', JSON.stringify(userData));
        }

        // 로그아웃
        const logout = () => {
            setUserNickName(null);
            localStorage.removeItem('userNickName');
        }
    
    //상세페이지- 예약하기 정보
    //인원수
    const [payHead, setPayHead] = useState(1);
    //객실아이디
    const [payRoom, setPayRoom] = useState(null);
    // 도시, 나라이름 검색입력
    const [town,setTown] = useState('')
    // 정렬 번호
    const [hotelSort,setHotelSort] = useState(1)
    // 필터 된 호텔 항목
    const [myhotel,setmyhotel] = useState([])

    // 국내호텔 해외호텔 나누기 위한 변수
    const [Domestic, setDomestic] = useState(0)

    const countryEn = town === '대한민국' || town ===  '한국' || town ===  '한' || town ===  'gksrnr'? 'Korea' : town === '일본' || town ===  '일'? 'Japan' : town === '미국'? 'USA' : town === '중국'? 'China': town === '이탈리아' || town ===  '이테리'? 'Italy' : town === '프랑스'? 'France':null
    const cityEn = town === '속초'? 'Sokcho':town === '경주'? 'Gyeongju':town === '부산'? 'Busan':town === '강릉'? 'Gangneung':town === '여수'? 'Yeosu':town === '대전'? 'Daejeon':town === '광주'? 'Gwangju':town === '제주' || town ===  '제주도'? 'Jeju':town === '포항'? 'Pohang':town === '서울'? 'Seoul':town === '도쿄'? 'Tokyo':town === '삿포로'? 'Sapporo':town === '로스앤젤레스'? 'LosAngeles':town === '뉴욕'? 'New York':town === '괌'? 'Guam':town === '장가계'? 'Zhangjiajie':town === '상하이'? 'Shanghai':town === '로마'? 'Rome':town === '베네치아'? 'Venice':town === '파리'? 'Paris':null
    const townfilter = HotelData.filter((f)=>f.city===cityEn || f.country===countryEn)
    //검색 핸들러
    const serchHandler =()=>{
        const dateFilter = HotelData.filter((f)=>f.startDate>DayData[0] && f.endDate<DayData[1])
    
        let overFilter = []
        if(cityEn !== null){
            overFilter = dateFilter.filter((f)=>f.city===cityEn)
        }else if(countryEn !== null){
            overFilter = dateFilter.filter((f)=>f.country===countryEn)
        }else if(town===''){
            overFilter = dateFilter
        }
        console.log(overFilter)
        // 필터한 내용 정렬
        if(hotelSort===1){
            overFilter.sort((a,b) => a.id - b.id)
        }else if(hotelSort===2){
            overFilter.sort((a,b) => b.score - a.score)
        }else if(hotelSort===3){
            overFilter.sort((a,b) => a.score - b.score)
        }else if(hotelSort===4){
            overFilter.sort((a,b) => b.price - a.price)
        }else{
            overFilter.sort((a,b) => a.price - b.price)
        }
        setmyhotel(overFilter)
    }

    // 해더 변경
    const [headerChange, setHeaderChange] = useState(0);
    
    //날짜 필터 내용
    const [dateFilter,setDateFilter] = useState([]);

    // 예약자명
    const [customer,setCustomer] = useState('')

    

    if(HotelData.length > 0 && RoomData.length > 0 && ReviewData.length >0 && RatingData.length > 0 && RatingAvgData.length > 0 && hotelRatingAvgData.length > 0 && hotelMinPrice.length > 0) {
        return(
            <ResortDataContext.Provider value={{RoomData, HotelData,ReviewData, RatingData, RatingAvgData, hotelRatingAvgData, hotelMinPrice, setReviewData,DayData,setDayData,selectDate,setSelectDate,selectday,setSelectday,selectMonth,setSelectMonth,wish,wishStar,wishArray,wishHandler,setWish, 
            payHead,setPayHead,payRoom,setPayRoom, userNumFront, setUserNumFront, userNumBack, setUserNumBack, userNickName, loginSave, logout,town,setTown,serchHandler,hotelSort,setHotelSort,myhotel,setmyhotel,cityEn,countryEn, Domestic, setDomestic, headerChange, setHeaderChange,dateFilter,setDateFilter,townfilter,customer,setCustomer}}>
                {children}
            </ResortDataContext.Provider>
        );
    }
    
}