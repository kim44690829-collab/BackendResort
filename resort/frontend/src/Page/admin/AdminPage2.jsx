import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../../Api/ResortData';
import '../admin/AdminPage.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage2(){
    

    const [hotel,setHotel] = useState([]);
    const [ph,setPh] = useState({});
    const [page, setPage] = useState(1);
    
    const [searchType, setSearchType] = useState("hotelName");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [serch,setSerch] = useState("")
    const [isInfo,setIsinfo] = useState(
        new Array(10).fill(false)
    )
    useEffect(()=>{
        axios.get('/api/hotel/list',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("호텔정보 데이터 : ", res.data.list);
            console.log("호텔정보 데이터 : ", res.data.ph);
            setHotel(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
    },[page,searchType,searchKeyword])

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setSearchKeyword(serch)
        setPage(1);
    }

    const setTrue =(index)=>{
        setIsinfo((state)=>{
            const statecopy = [...state]
            statecopy[index] = !statecopy[index]
            return statecopy
        })
    }

    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">관리자 페이지</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <div className="menu_box">
                            <span className="admin_menu">조회.관리</span>
                            <ul className="admin_submenu">
                                <li className="a_menus">
                                    <Link to={`/adminPage` } onClick={() => window.scrollTo(0, 0)}>
                                       <span>회원 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage2` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>호텔 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage3` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>객실 정보 조회</span>
                                    </Link>
                                </li>
                                <li className="a_menus">
                                    <Link to={`/adminPage4` } onClick={() => window.scrollTo(0, 0)}>
                                        <span>예약 정보 조회</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="menu_box">
                            <span className="admin_menu">등록</span>
                            <ul className="admin_submenu">
                                <li className="a_menus">호텔 정보 등록</li>
                                <li className="a_menus">객실 정보 등록</li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin_body">
                        <div className="admin_text">호텔 정보 조회</div>
                        <div className="admin_list">
                            <table className="list_table" border="1">
                                <thead >
                                    <tr>
                                        <th width="50px">Num</th>
                                        <th width="200px">호텔명</th>
                                        <th width="100px">국가</th>
                                        <th width="100px">도시</th>
                                        <th width="100px">숙소유형</th>
                                        <th width="200px">주소지</th>
                                        <th width="150px">시작일</th>
                                        <th width="150px">종료일</th>
                                        <th width="80px">상세정보</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotel.map((item,index)=>{
                                        return(
                                            <>
                                                <tr key={index}>
                                                    <td>{item.h_code}</td>
                                                    <td>{item.hotelName}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.h_address}</td>
                                                    <td>{item.startDate}</td>
                                                    <td>{item.endDate}</td>
                                                    <td><button onClick={()=>setTrue(index)}>상세정보</button></td>
                                                </tr>
                                                {isInfo[index] && 
                                                 <div className="admin_modal">
                                                    
                                                        <button type="button" onClick={()=>setTrue(index)} className="closeBtn">✖</button>
                                                        <div className="img_box">
                                                            <img src={`/img/${item.h_Img}`} alt={`/img/${item.h_Img}`} />
                                                            <img src={`/img/${item.h_s_Img1}`} alt={`/img/${item.h_Img}`} />
                                                            <img src={`/img/${item.h_s_Img2}`} alt={`/img/${item.h_Img}`} />
                                                            <img src={`/img/${item.h_s_Img3}`} alt={`/img/${item.h_Img}`} />
                                                            <img src={`/img/${item.h_s_Img4}`} alt={`/img/${item.h_Img}`} />
                                                        </div>
                                                        <div className="service_box">
                                                            <ul>
                                                                
                                                                <li>
                                                                    <p>호텔명 : {item.hotelName}</p>
                                                                </li>
                                                                <li>
                                                                    <p>국가 : {item.country}</p>
                                                                </li>
                                                                <li>
                                                                    <p>도시 : {item.city}</p>
                                                                </li>
                                                                <li>
                                                                    <p>숙소유형 : {item.type}</p>
                                                                </li>
                                                                <li>
                                                                    <p>주소지 : {item.h_address}</p>
                                                                </li>
                                                                <li>
                                                                    <p>시작일 : {item.startDate}</p>
                                                                </li>
                                                                <li>
                                                                    <p>종료일 : {item.endDate}</p>
                                                                </li>
                                                                <li>
                                                                    <p>기타시설 : {item.otherservice}</p>
                                                                </li>
                                                                <li>
                                                                    <p>공용시설 : {item.publicservice}</p>
                                                                </li>
                                                                <li>
                                                                    <p>객내시설 : {item.roomservice}</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <button className="updateBtn">내용 수정하기</button>
                                                 </div>
                                                }
                                            </>

                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="paging">
                                {/* 페이지가 많을때 좌우 버튼 */}
                                {ph.prev && (
                                    <button onClick={() => setPage(ph.startPage - 1)}>◀</button>
                                )}
                                <div className="pages">{pages}</div>
                                {ph.next && (
                                    <button onClick={() => setPage(ph.endPage + 1)}>▶</button>
                                )}
                            </div>
                            <div id="search_wrap">
                                <form onSubmit={submitHandler}>
                                    <select name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="hotelName">호텔명</option>
                                        <option value="country">국가</option>
                                        <option value="city">도시</option>
                                        <option value="type">숙소유형</option>
                                    </select>
                                    
                                    <input type="text" name="searchKeyword" placeholder="검색어를 입력하세요" onChange={(e) => setSerch(e.target.value)}/>
                                    <input type="submit" value="검색" className="searchBtn" onClick={()=>submitHandler()}/>
                                    <input type="button" value="전체보기" className="searchBtn" onClick={()=>{setSearchKeyword(""),setSearchType("hotelName")}}/>
                                </form>
					        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}