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
    // const [HotelPriceDate , setHotelPriceDate] = useState([]);
    const [HotelRatingDate , setHotelRatingDate] = useState([]);
    // 비회원 데이터 업데이트
    const [guestUpdateResult, setGuestUpdateResult] = useState(null);

    const [hotelRatingAvgData, setHotelRatingAvgData] = useState([]);
    const [hotelMinPrice, setHotelMinPrice] = useState([]);
    const [hotelMerge,setHotelMerge] = useState([])
    const [MemberAllData,setMemberAllData] = useState([])

    // 인원 상태변수
    const [guestCount, setGuestCount] = useState(1)

    const [render,setRender] = useState(false);

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
            // console.log("객실 데이터 : ", res.data);
            setRoomData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // ReviewData
        axios.get('/api/board/review')
        .then((res) => {
            // console.log("리뷰(평점) 데이터 : ", res.data);
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
            // console.log("객실(평점) 평균 데이터 : ", res.data);
            setRatingAvgData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // // hotelPrice
        // axios.get('/api/hotel/hotelPrice')
        // .then((res) => {
        //     console.log("호텔가격 데이터 : ", res.data);
        //     setHotelPriceDate(res.data);})
        // // hotelRatingAvgData
        // .catch((error) => {
        //     console.error("error", error)
        // })
        axios.get('/api/board/hotelRatingAvg')
        .then((res) => {
            // console.log("호텔(평점) 평균 데이터 : ", res.data);
            setHotelRatingAvgData(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // hotelRating
        axios.get("/api/hotel/hotelRating")
        .then((res) => {
            // console.log("호텔평점 데이터 : ", res.data);
            setHotelRatingDate(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })
        
            // hotelMinPrice
        axios.get('/api/hotel/price')
        .then((res) => {
            //  console.log("호텔 가격(최저가) 데이터 : ", res.data);
            setHotelMinPrice(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // HotelMergeData
        axios.get('/api/hotel/hotelMarge')
        .then((res) => {
            console.log("호텔총합 데이터 : ", res.data);
            setHotelMerge(res.data);
        })
        .catch((error) => {
            console.error("error", error)
        })

        // MemberAllData
        axios.get('/api/member/allmember')
        .then((res) => {
            // console.log("회원전체 데이터 : ", res.data);

            if (!res.data || res.data.length === 0) {
                console.warn("회원 데이터 없음");
                setMemberAllData([]);   // 그래도 상태는 넣어줘야 함
                return;
            }

            setMemberAllData(res.data);
        })
        .catch((error) => {
            console.error("회원 데이터 요청 실패", error);
            setMemberAllData([]); // 실패해도 최소 빈 배열 넣기 (중요)
        });

    },[render])


    // 휴대폰 번호 상태저장 변수
    const [userNumFront, setUserNumFront] = useState('');
    const [userNumBack, setUserNumBack] = useState('');

    const [DayData,setDayData] = useState(()=>{
        const saved = sessionStorage.getItem('DayData')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })
    useEffect(()=>{
        sessionStorage.setItem('DayData',JSON.stringify(DayData))
    },[DayData])

    const [selectDate,setSelectDate] = useState(()=>{
        const saved = sessionStorage.getItem('selectDate')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })

    useEffect(()=>{
        sessionStorage.setItem('selectDate',JSON.stringify(selectDate))
    },[DayData])

    const [selectday,setSelectday] = useState(()=>{
        const saved = sessionStorage.getItem('selectday')
        //저장된 value가 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    })
    //

    useEffect(()=>{
        sessionStorage.setItem('selectday',JSON.stringify(selectday))
        // console.log(selectDate,selectday,'12-19확인ㅇㅅ')
    },[selectday])

    const [selectMonth,setSelectMonth] = useState(()=>{
        const saved = localStorage.getItem('selectMonth')
        //저장된 value가 없으면 복원, 없으면 기본 
        const thisMonth = new Date().getMonth()
        return saved ===null ?JSON.parse(saved): new Date(`2026-${thisMonth+1}-01`) 
        //return saved !== null ?JSON.parse(saved): new Date("2026-03-01") 
    }) 

    useEffect(()=>{
        localStorage.setItem('selectMonth',JSON.stringify(selectMonth));
    },[selectMonth]) 


    /// 로그인 한 후 닉네임 저장
    const [userNickName, setUserNickName] = useState(null);
    // 로그인 한 후 이메일 저장
    const [userEmail, setUserEmail] = useState(null);

    //모달 프로바이더
    const {toggle,setModalContent} = useContext(ModalContext);
    
    //찜목록 id
    const [wish, setWish] = useState([]);

    useEffect(()=>{

        //찜목록 불러오기
        let wishList;
        try{
            wishList = JSON.parse(cookie.get('wishList') || '[]');
        }catch{
            wishList = [];
        }          
        let now = Date.now();
        wishList = wishList.filter(item=>item.expires > now);
        
        const userEmailValue = userEmail ?? null;

        // 이메일 기준 필터
        const filtered = wishList.filter(item => item.email === userEmailValue);

        setWish(filtered);

        //cookie.set('wishList', JSON.stringify(wishList), {expires: 7, path:'/'});
        //setWish(wishList);
        //console.log(wishList.length);
    },[userEmail]);
    //console.log(wish);

    //찜목록 쿠키 저장 및 삭제
    const wishHandler = (h_code) =>{
        let wishList;
        try{
            wishList = JSON.parse(cookie.get('wishList') || '[]');
        }catch{
            wishList = [];
        }        
        let now = Date.now();

        wishList = wishList.filter(item=>item.expires > now);

        const userEmailValue = userEmail ?? null;

        //이미 추가된 호텔이 있으면 삭제
        for(let i=0; i<wishList.length; i++){
            if(
                wishList[i].h_code === Number(h_code) &&
                wishList[i].email === userEmailValue
            ){
                wishList = wishList.filter(
                    (item)=> !(item.h_code === Number(h_code) && item.email === userEmailValue)
                );

                cookie.set('wishList', JSON.stringify(wishList), {expires: 7, path:'/'});

                const filtered = wishList.filter(item => item.email === userEmailValue);
                setWish(filtered);
                //setWish(wishList);
                return;
            }
        }
        // for(let i=0; i<wishList.length; i++){
        //     if(wishList[i].h_code === Number(h_code)){
        //         wishList = wishList.filter((item)=>item.h_code !== Number(h_code));
        //         cookie.set('wishList', JSON.stringify(wishList), {expires: 7, path:'/'});
        //         setWish(wishList);
        //         return;
        //     }
        // }

        const userWishCount = wishList.filter(item => item.email === userEmailValue).length;

        //갯수 30개 제한
        if(userWishCount >= 30){
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
                    }}>찜은 30개까지 추가 가능합니다.</p>
                </>
            );
            toggle();
            return;
        }
        
        //7일간 보관(추가한 리스트 개별로)
        const EXPIRE_DAYS = 7;
        wishList.push({h_code: Number(h_code), expires: now + EXPIRE_DAYS*24*60*60*1000, email: userEmailValue});

        // cookie.set('wishList', JSON.stringify(wishList), {expires: EXPIRE_DAYS, path:'/'});   
        // setWish(wishList);

        cookie.set('wishList', JSON.stringify(wishList), {expires: EXPIRE_DAYS, path:'/'});   

        const filtered = wishList.filter(item => item.email === userEmailValue);
        setWish(filtered);
    }

    //찜목록 h_code불러온후 해당 호텔정보 배열로 저장
    const [wishArray, setWishArray] = useState([]);
    //찜한호텔 별점 이미지
    const[wishStar, setWishStar] = useState([]);
    //추천호텔 데이터 평점평균 저장
    const[WishAvg, setWishAvg] = useState([]);
    
    useEffect(()=>{
        if(wish.length === 0 || HotelData.length === 0){
            setWishArray([]);
            return;
        }     
        let wishIdArray = [];
        wishIdArray = wish.map(item=>item.h_code);

        let wishArray2 = wishIdArray.map(id => HotelData.find(item => item.h_code === id))
        .filter(Boolean);
        
        setWishArray(wishArray2);
        // console.log(wish);
        // console.log(wishIdArray);
        // console.log(wishArray2);

        Promise.all(
            wishIdArray.map(code =>
                axios.get("/api/board/recomm", {
                    params: { hotelcode: code }
                })
            )
        )
        .then(responses => { 
            const avgList = responses.map(res =>({
                scoreAvg: res.data[0]?.scoreAvg ?? 0,
                reviewCount: res.data[0]?.reviewCount ?? 0,
                minPrice : res.data[0]?.minPrice ?? 0
            }));

            setWishAvg(avgList);
            // console.log("-----------------------------------");
            // console.log(responses.data)
        })
        .catch(error => {
            console.error("error", error);
        });
        
    },[wish,HotelData]);        
        
        
    useEffect(()=>{
        if (WishAvg.length === 0) return;

        //찜한호텔 별점
        const wishStar2 = [];
        const wishStarImg = [];

        for(let i=0; i<WishAvg.length; i++){
            wishStar2.push(WishAvg[i].scoreAvg);

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
            if(starFloat2>=0.5){
                wishStarImg[i].push('/img/star-half.png');                    
            }else if(starFloat2>0 && starFloat2<0.5){
                wishStarImg[i].push('/img/star-zero.png');
            }
            for(let j=0; j<starZero2; j++){
                wishStarImg[i].push('/img/star-zero.png');                    
            }
        }
        setWishStar(wishStarImg);
        // console.log(WishAvg);
        // console.log(wishStarImg);
        
    },[WishAvg]); 
    
    
    
        //console.log(wishArray);
        

        useEffect(() => {
            const saveNickName = sessionStorage.getItem('userNickName');
            const saveEmail = sessionStorage.getItem('userEmail');
            if(saveNickName && saveEmail){
                setUserNickName(JSON.parse(saveNickName));
                setUserEmail(JSON.parse(saveEmail));
            }
        },[]);

        // 로그인
        const loginSave = (nickName,email) => {
            sessionStorage.setItem('userNickName', JSON.stringify(nickName));
            sessionStorage.setItem('userEmail', JSON.stringify(email));
            setUserNickName(nickName);
            setUserEmail(email);
        }

        // 로그아웃
        const logout = () => {
            sessionStorage.removeItem('userNickName');
            sessionStorage.removeItem('userEmail');
            setUserNickName(null);
            setUserEmail(null);
        }
    
    //상세페이지- 예약하기 정보
    //인원수
    const [payHead, setPayHead] = useState(1);
    //객실아이디
    // const [payRoom, setPayRoom] = useState(null);
    // 도시, 나라이름 검색입력
    const [town,setTown] = useState('')
    // 정렬 번호
    const [hotelSort,setHotelSort] = useState(1)
    // 필터 된 호텔 항목
    const [myhotel,setmyhotel] = useState([])

    // 국내호텔 해외호텔 나누기 위한 변수
    const [Domestic, setDomestic] = useState(0)

    useEffect(() => {
        setTown(town.charAt(0).toUpperCase() + town.slice(1).toLowerCase())
    },[town])

    const countryEn = town === '대한민국' || town ===  '한국' || town ===  '한' || town ===  'gksrnr'? 'Korea' : town === '일본' || town ===  '일'? 'Japan' : town === '미국' || town === 'Usa' ? 'USA' : town === '중국'? 'China': town === '이탈리아' || town ===  '이테리'? 'Italy' : town === '프랑스'? 'France': town === '' ? null : town
    const cityEn = town === '속초'? 'Sokcho':town === '경주'? 'Gyeongju':town === '부산'? 'Busan':town === '강릉'? 'Gangneung':town === '여수'? 'Yeosu':town === '대전'? 'Daejeon':town === '광주'? 'Gwangju':town === '제주' || town ===  '제주도'? 'Jeju':town === '포항'? 'Pohang':town === '서울'? 'Seoul':town === '도쿄'? 'Tokyo':town === '삿포로'? 'Sapporo':town === '로스앤젤레스'? 'LosAngeles':town === '뉴욕'? 'New York':town === '괌'? 'Guam':town === '장가계'? 'Zhangjiajie':town === '상하이'? 'Shanghai':town === '로마'? 'Rome':town === '베네치아'? 'Venice':town === '파리'? 'Paris': town === '' ? null : town
    const townfilter = hotelMerge.filter((f)=>f.city===cityEn || f.country===countryEn)
    const townfilter2 = HotelData.filter((f)=>f.city===cityEn || f.country===countryEn)
    //검색 핸들러
    const serchHandler =()=>{
        const dateFilter = hotelMerge.filter((f)=>f.startDate>DayData[0] && f.endDate<DayData[1])
        let overFilter = []
        if(cityEn !== null){
            overFilter = dateFilter.filter((f)=>f.city===cityEn && f.hotelMaxOccupancy >= guestCount)
        }else if(countryEn !== null){
            overFilter = dateFilter.filter((f)=>f.country===countryEn && f.hotelMaxOccupancy >= guestCount)
        }else if(town===''){
            overFilter = dateFilter
        }
        // console.log(overFilter)
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

    const [hotelNum, setHotelNum] = useState(() => {
        const saved = sessionStorage.getItem('hotelNum');
        return saved ? JSON.parse(saved) : 0
    })
    useEffect(() => {
        sessionStorage.setItem('hotelNum', JSON.stringify(hotelNum))
    },[hotelNum])

    // 왼쪽 리스트 클릭시 컨텐츠 전환
    const [listType, setListType] = useState(8)

    if(HotelData.length > 0 && RoomData.length > 0) {
        return(
            <ResortDataContext.Provider value={{
                listType, setListType,
                setRender,render,
                guestCount, setGuestCount,
                setUserEmail,setUserNickName,townfilter2,
                userEmail,MemberAllData,setHotelMerge,
                hotelMerge,hotelNum, setHotelNum, 
                WishAvg, hotelMinPrice,HotelRatingDate,
                RoomData, HotelData,ReviewData, RatingData, 
                RatingAvgData, hotelRatingAvgData, setReviewData,
                DayData,setDayData,selectDate,
                setSelectDate,selectday,setSelectday,
                selectMonth,setSelectMonth,
                wish,wishStar,wishArray,
                wishHandler,setWish, payHead,setPayHead,
                userNumFront, setUserNumFront, userNumBack, 
                setUserNumBack, userNickName, loginSave, 
                logout,town,setTown,serchHandler,
                hotelSort,setHotelSort,myhotel,
                setmyhotel,cityEn,countryEn, Domestic, 
                setDomestic, headerChange, setHeaderChange,
                dateFilter,setDateFilter,townfilter,customer,setCustomer}}>
                {children}
            </ResortDataContext.Provider>
        );
    }
    
}