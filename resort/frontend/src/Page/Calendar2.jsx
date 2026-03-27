import { useState,useEffect } from "react";
import { useContext } from "react";
import '../Page/calendar.css'
import { ResortDataContext } from '../Api/ResortData';
import { data } from "react-router-dom";

export default function Calendar2(){

    const {RoomData, HotelData,DayData,setDayData,selectDate,setSelectDate,selectday,setSelectday,selectMonth,setSelectMonth,selectDateRemoveAll} = useContext(ResortDataContext);
    // 선택한 달
    //const [selectMonth,setSelectMonth] = useState(new Date()) //선택한 달력
    const [calArr,setCalArr] = useState(
        Array.from(Array(6),() => new Array(7).fill(''))
    ) //달력에 들어가는 배열


    const nextMonth= new Date(selectMonth.getFullYear(),selectMonth.getMonth() + 1,1) //선택한 다음달 달력
    const [calArr02,setCalArr02] = useState(
        Array.from(Array(6),() => new Array(7).fill(''))
    ) //달력에 들어가는 배열

    
    /* useEffect(()=>{
        const thisyears = new Date().getFullYear() // 오늘의 연도
        const thismonth = new Date().getMonth() //오늘의 월
        const thisdate = new Date().getDate() //오늘의 날짜

        console.log(thisyears)
        console.log(thisdate)
        console.log(thismonth)
        setSelectMonth(new Date(thisyears,thismonth,thisdate))
    },[]) */

    useEffect(()=>{
        setDayData(selectday)
    },[selectday])


    useEffect(()=>{
        //console.log(selectMonth)
        const years = selectMonth.getFullYear() // 선택 연도
        //console.log(years)
        const month = selectMonth.getMonth() //선택 월
        //console.log(month)
        const day = selectMonth.getDay() // 선택 요일
        //console.log(day)
        const date = selectMonth.getDate() // 선택 일자
        //console.log(date)
        const last = new Date(years,month+1,0) //선택 월의 마지막날
        const lastdate = last.getDate() // 마지막 달
        console.log(lastdate,'마지막일자')
        const firstdate = new Date(years,month,1) // 이번달 첫날
        const firstday = firstdate.getDay() // 이번달 첫 요일 0,1,2,3,4,5,6 으로 표기
        //console.log(calArr)

        let newArr = Array.from({ length: 6 }, () => Array(7).fill(""));
        let week = firstdate.getDay()
        console.log(week)
        console.log(week)

        let row = 0;
        for(let i=1;i<=lastdate;i++){
            
            newArr[row][week] = i;
            if(week<6){
                week++
            }else{
                week=0
                row++
            }
            
        }
        //console.log(newArr)
        setCalArr(newArr)

    },[selectMonth])
    useEffect(()=>{
        //console.log(selectMonth)
        const years = nextMonth.getFullYear() // 선택 연도
        //console.log(years)
        const month = nextMonth.getMonth() //선택 월
        //console.log(month)
        const day = nextMonth.getDay() // 선택 요일
        //console.log(day)
        const date = nextMonth.getDate() // 선택 일자
        //console.log(date)
        const last = new Date(years,month+1,0) //선택 월의 마지막날
        const lastdate = last.getDate() // 마지막 달
        //console.log(lastdate,'마지막일자')
        const firstdate = new Date(years,month,1) // 이번달 첫날
        const firstday = firstdate.getDay() // 이번달 첫 요일 0,1,2,3,4,5,6 으로 표기
        //console.log(calArr02)

        let newArr = Array.from({ length: 6 }, () => Array(7).fill(""));
        let week = firstdate.getDay()

        let row = 0;
        for(let i=1;i<=lastdate;i++){
            
            newArr[row][week] = i;
            if(week<6){
                week++
            }else{
                week=0
                row++
            }
            
        }
        //console.log(newArr)
        setCalArr02(newArr)

    },[selectMonth])
    //다음달 버튼
    const next =()=>{
        const thisyears = new Date().getFullYear() // 달력에 일자를 구하기위한 변수
        const thisdate = new Date().getDate()
        const thismonth = new Date().getMonth()

        if(selectMonth.getMonth()+1 === (thismonth)%12 && selectMonth.getFullYear()<=thisyears){ // 이번달 일때 달력에 오늘 일자가 들어간다
            setSelectMonth(new Date(selectMonth.getFullYear(),selectMonth.getMonth() + 1,1))
            console.log(selectMonth.getMonth()+1,'확인용1')
            console.log((thismonth)%12,'확인용1')
        }else{
            setSelectMonth(new Date(selectMonth.getFullYear(),selectMonth.getMonth() + 1,1)) // 이번달이 아닐때 달력에 오늘이 아닌 달이 들어간다
            console.log(selectMonth.getMonth()+1,'확인용2')
            console.log((thismonth)%12,'확인용2')
        }
    }

    //이전달 버튼
    const back =()=>{
        const thisyears = new Date().getFullYear() // 오늘의 연도
        const thisdate = new Date().getDate() //오늘의 날짜
        const thismonth = new Date().getMonth() //오늘의 월

        console.log(selectMonth.getFullYear())
        console.log(thisyears)

        if(selectMonth.getFullYear() === thisyears /* && selectMonth.getMonth() === thismonth+1 */){
            setSelectMonth(new Date(selectMonth.getFullYear(),selectMonth.getMonth() - 1,1))
        }else if(selectMonth.getFullYear()>=thisyears+1 || selectMonth.getMonth()>=3){
            setSelectMonth(new Date(selectMonth.getFullYear(),selectMonth.getMonth() - 1,1))
        }
        
    }

    //왼쪽달력
    const leftcal =(items,item,years)=>{
        const selectDateCopy = [...selectDate]
        const selectdayCopy = [...selectday]
        if(selectDateCopy.length<2 && selectDateCopy.findIndex((f)=>f===`${selectMonth.getFullYear()}-${selectMonth.getMonth()+1}-${items}`) !== 0){
            selectDateCopy.push(`${selectMonth.getFullYear()}-${selectMonth.getMonth()+1}-${items}`)
        }else{
            console.log(selectDateCopy)
            selectDateCopy.splice(0,2)
        }
       // console.log(selectDateCopy)npm
        selectDateCopy.sort((a,b)=> a-b)
       // console.log(selectDateCopy.sort())
       
       let chking = ''
       if(item<10 && items<10){
            chking = `${years}-0${item}-0${items}`
        }else if(item<10 && items >=10){
            chking = `${years}-0${item}-${items}`
        }else if(item>=10 && items <10){
            chking = `${years}-${item}-0${items}`
        }else{
            chking = `${years}-${item}-${items}`
        }
        
        
        if(selectdayCopy.length<2 && selectdayCopy.findIndex((f)=>f===chking) !== 0){
            //selectdayCopy.push(`${years}-${item}-${items}`)
            if(item<10 && items<10){
                selectdayCopy.push(`${years}-0${item}-0${items}`)
            }else if(item<10 && items >=10){
                selectdayCopy.push(`${years}-0${item}-${items}`)
            }else if(item>=10 && items <10){
                selectdayCopy.push(`${years}-${item}-0${items}`)
            }else{
                selectdayCopy.push(`${years}-${item}-${items}`)
            }
        }else{
            selectdayCopy.splice(0,2)
            console.log('aa')
        }
        console.log(selectdayCopy)
        
        setSelectDate(selectDateCopy.sort())
        setSelectday(selectdayCopy.sort())
        console.log(selectdayCopy.sort())
        console.log(`${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`)
    }
    
    //오른쪽 달력
    const right = (items,item,years)=>{
        const selectDateCopy = [...selectDate]
        const selectdayCopy = [...selectday]
        if(selectDateCopy.length<2 && selectDateCopy.findIndex((f)=>f===`${nextMonth.getFullYear()}-${nextMonth.getMonth()+1}-${items}`) !== 0){
            selectDateCopy.push(`${nextMonth.getFullYear()}-${nextMonth.getMonth()+1}-${items}`);
            
        }else{
            selectDateCopy.splice(0,2)
            //selectDateRemoveAll()
        }
        selectDateCopy.sort((a,b)=> a-b)

        let chking = ''
       if(item<10 && items<10){
            chking = `${years}-0${item}-0${items}`
        }else if(item<10 && items >=10){
            chking = `${years}-0${item}-${items}`
        }else if(item>=10 && items <10){
            chking = `${years}-${item}-0${items}`
        }else{
            chking = `${years}-${item}-${items}`
        }

        
        if(selectdayCopy.length<2 && selectdayCopy.findIndex((f)=>f===chking) !== 0){// selectdayCopy의 요소가 2개보다 작고 중복되는게 없을때 push
            if(item<10 && items<10){
                selectdayCopy.push(`${years}-0${item}-0${items}`)
            }else if(item<10 && items >=10){
                selectdayCopy.push(`${years}-0${item}-${items}`)
            }else if(item>=10 && items <10){
                selectdayCopy.push(`${years}-${item}-0${items}`)
            }else{
                selectdayCopy.push(`${years}-${item}-${items}`)
            }
        }else{
            selectdayCopy.splice(0,2)
        }
        console.log(selectdayCopy)
        setSelectDate(selectDateCopy.sort())
        setSelectday(selectdayCopy.sort())
        console.log(`${selectMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`)
        
    }

    return(
        <>
            <div className="calendar">
                <div className="calendar_manu">
                    <h2 className="cal_title">{selectMonth.getFullYear()}년 {selectMonth.getMonth()+1}월</h2>
                    <table className="week">
                        <thead className="table_head">
                            <tr>
                                <th style={{color:'red'}}><span className="weeks">일</span></th>
                                <th><span className="weeks">월</span></th>
                                <th><span className="weeks">화</span></th>
                                <th><span className="weeks">수</span></th>
                                <th><span className="weeks">목</span></th>
                                <th><span className="weeks">금</span></th>
                                <th style={{color:'blue'}}><span className="weeks">토</span></th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                            {calArr.map((item,index) => (
                                    <tr key={index}>
                                        {item.map((items,index) => (
                                                                                        /* 선택한 일자가 오늘일자보다 클때 클릭 활성화 - 비활성화 처리 */
                                            <td key={index} onClick={()=>items!=='' /* && selectMonth.getDate()<=items */?leftcal(items,selectMonth.getMonth()+1,selectMonth.getFullYear()):''} 
                                            className={
                                                /* 현재 일자 이전 일자 클래스 없음 예외처리 - 비활성화*/
                                                `${/* selectMonth.getDate()>items?''
                                                : */
                                                `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[0] || `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[1]?'choose'
                                                :
                                                `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`>selectday[0] && `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`<selectday[1]?'area'
                                                :'active'} ${
                                                    `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[0] && selectday.length===2?'af'
                                                    :
                                                    `${selectMonth.getFullYear()}-${selectMonth.getMonth()+1<10?`0${selectMonth.getMonth()+1}`:selectMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[1] && selectday.length===2?'bf'
                                                    :
                                                    ''
                                                } table_num`}
                                            style={{
                                                /* 현재 일자 이전 일자 색상 회색처리 - 비활성화 */
                                                color:/* items<selectMonth.getDate()?'gray': */item[0]===items?'red':'black',
                                                cursor:items<selectMonth.getDate()?'default':'pointer',
                                               
                                            }}><span className="cal_num">{items}</span></td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="calendar_manu">
                    <h2 className="cal_title">{nextMonth.getFullYear()}년 {nextMonth.getMonth()+1}월</h2>
                    <table className="week">
                        <thead className="table_head">
                            <tr>
                                <th style={{color:'red'}}><span className="weeks">일</span></th>
                                <th><span className="weeks">월</span></th>
                                <th><span className="weeks">화</span></th>
                                <th><span className="weeks">수</span></th> 
                                <th><span className="weeks">목</span></th>
                                <th><span className="weeks">금</span></th>
                                <th style={{color:'blue'}}><span className="weeks">토</span></th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                            {calArr02.map((item,index) => (
                                    <tr key={index}>
                                        {item.map((items,index) => (
                                            <td key={index} onClick={()=>{items!==''?right(items,nextMonth.getMonth()+1,nextMonth.getFullYear()):''}} style={{color:item[0]===items?'red':'black'}} 
                                            className={
                                                `${items===''?''
                                                :
                                                `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[0] || `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[1]?'choose'
                                                :
                                                `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`>selectday[0] && `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`<selectday[1]?'area'
                                                :
                                                'active'} ${
                                                    `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[0] && selectday.length===2?'af'
                                                    :
                                                    `${nextMonth.getFullYear()}-${nextMonth.getMonth()+1<10?`0${nextMonth.getMonth()+1}`:nextMonth.getMonth()+1}-${items<10?'0'+items:items}`===selectday[1] && selectday.length===2?'bf'
                                                    :''
                                                } table_num` }>
                                                <span className="cal_num">{items}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    
                    
                </div>
                <button type="button" onClick={back} className="prvBtn calBtn"><i className="fa-solid fa-angle-left"></i></button>
                <button type="button" onClick={next} className="nextBtn calBtn"><i className="fa-solid fa-angle-right"></i></button>
                <div className="line"></div>
                <div className="choose_day">
                    <p>{DayData.length===2?`${DayData[0]} 부터 - ${DayData[1]} 까지`:'일정을 선택해 주세요'}</p>
                </div>
            </div>
            
        </>
    )
}