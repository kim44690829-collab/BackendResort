import { useState,useEffect,useContext } from "react";
import { ResortDataContext } from '../Api/ResortData';
import '../Page/AdminPage.css'

export default function AdminPage(){
    const {} = useContext(ResortDataContext);
    return(
        <>
            <div className="admin_wrap">
                <h2 className="admin_title">관리자 페이지</h2>
                <div className="admin_section">
                    <div className="admin_header">
                        <span className="admin_menu">조회.관리</span>
                        <ul className="admin_submenu">
                            <li className="a_menus">회원 정보 조회</li>
                            <li className="a_menus">호텔 정보 조회</li>
                            <li className="a_menus">객실 정보 조회</li>
                            <li className="a_menus">예약 정보 조회</li>
                        </ul>
                        <span className="admin_menu">등록</span>
                        <ul className="admin_submenu">
                            <li className="a_menus">호텔 정보 등록</li>
                            <li className="a_menus">객실 정보 등록</li>
                        </ul>
                    </div>
                    <div className="admin_body">
                        <div className="admin_text">회원 정보 조회</div>
                        <div className="admin_list">
                            <table className="list_table" border="1">
                                <thead >
                                    <tr>
                                        <th>Num</th>
                                        <th>E_mail</th>
                                        <th>전화번호</th>
                                        <th>생일</th>
                                        <th>성별</th>
                                        <th>별명</th>
                                        <th>쿠폰 보유</th>
                                        <th>가입일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* 페이징이 들어갈 부분 */}
                            <div id="search_wrap">
                                <form >
                                    <select name="searchType">
                                        <option value="subject">제목</option>
                                        <option value="content">내용</option>
                                    </select>
                                    
                                    <input type="text" name="searchKeyword" placeholder="검색어를 입력하세요"/>
                                    <input type="submit" value="검색" class="searchBtn"/>
                                    <input type="button" value="전체보기" class="searchBtn" />
                                </form>
					        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}