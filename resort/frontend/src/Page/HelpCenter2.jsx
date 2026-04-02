import '../Page/HelpCenter.css'
import { useState,useContext,useEffect } from 'react';
import { ResortDataContext} from '../Api/ResortData';
import axios from "axios";
import { Link } from "react-router-dom";
export default function HelpCenter2(){
    const {userEmail,userNickName,logout, headerChange, setHeaderChange,  setListType} = useContext(ResortDataContext);

    ///아아아아아아아
    const listType = 2
    // caret 버튼 클릭시 자주 묻는 질문 나타나게 하는 상태변수
        const [isContent1, setIsContent1] = useState(false);
        const [isContent2, setIsContent2] = useState(false);
        const [isContent3, setIsContent3] = useState(false);
        const [isContent4, setIsContent4] = useState(false);
        const [isContent5, setIsContent5] = useState(false);
        const [isContent6, setIsContent6] = useState(false);

    // caret 버튼 클릭시 자주 묻는 질문 나타나게 하는 상태변수
        const [isName1, setIsName1] = useState(false);
        const [isName2, setIsName2] = useState(false);
        const [isName3, setIsName3] = useState(false);
        const [isName4, setIsName4] = useState(false);
        const [isName5, setIsName5] = useState(false);
        const [isName6, setIsName6] = useState(false);

    // // caret 버튼 클릭시 자주 묻는 질문을 나타나게 하는 함수
    const contentHandeler1 = () => {
        setIsContent1(!isContent1);
        setIsName1(!isName1);
    }
    const contentHandeler2 = () => {
        setIsContent2(!isContent2);
        setIsName2(!isName2);
    }
    const contentHandeler3 = () => {
        setIsContent3(!isContent3);
        setIsName3(!isName3);
    }
    const contentHandeler4 = () => {
        setIsContent4(!isContent4);
        setIsName4(!isName4);
    }
    const contentHandeler5 = () => {
        setIsContent5(!isContent5);
        setIsName5(!isName5);
    }
    const contentHandeler6 = () => {
        setIsContent6(!isContent6);
        setIsName6(!isName6);
    }

    // 공지사항 목록보기 버튼
    const noticeBtnHandeler = () => {
        setListType(2);
    }

    const [boardList,setBoardList] = useState([]);//1:1 문의게시글 리스트
    const [detail,setDetail] = useState({});//상세보기 게시글정보
    const [pageHandler, setPageHandler] = useState({});//페이징핸들러
    const [pagePrev, setPagePrev] = useState(pageHandler.prev);
    const [pageNext, setPageNext] = useState(pageHandler.next);
    const [page, setPage] = useState(1); // 페이지번호
    const pageSize = 7; // 페이지사이즈
    const [searchType, setSearchType] = useState('b_title'); // 검색타입 상태
     // 실제 검색 타입 실행용 (버튼 눌렀을 때만 변경)
    const [appliedSearchType, setAppliedSearchType] = useState('b_title');
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색어 상태
    // 실제 검색 실행용 (버튼 눌렀을 때만 변경)
    const [appliedKeyword, setAppliedKeyword] = useState('');
    
    //문의하기 상태
    const [writeBoard, setWriteBoard] =useState(false);
    //상세보기 상태
    const [detailBoard, setDetailBoard] =useState(false);
    //수정하기 상태
    const [modifyBoard, setModifyBoard] =useState(false);

    //작성자
    const [writer, setWriter] = useState(userNickName);
    //제목
    const [title, setTitle] = useState('');
    //비밀번호
    const [password, setPassword] = useState('');
    //글내용
    const [boardText, setBoardText] = useState('');
    //업로드파일
    const [file, setFile] = useState(null);

    const [isMyList, setIsMyList] = useState(false);


    useEffect(() => {
        loadList();
    },[page,appliedKeyword,appliedSearchType,isMyList]);

    //뒤로가기 기능추가
    useEffect(() => {
        const handlePopState = () => {
            if(detailBoard || modifyBoard || writeBoard){
                // 상세, 수정, 작성 화면이면 목록으로 복귀
                setDetailBoard(false);
                setModifyBoard(false);
                setWriteBoard(false);
                setReplStatus(false);
                setListType(8);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [detailBoard, modifyBoard, writeBoard]);



    //전체 게시글 리스트 불러오기
    const loadList = () => {
        axios.get('/api/board/list', {
	        params: {
                my: isMyList ? true : null,
	            searchType: appliedSearchType,
	            searchKeyword: appliedKeyword,
                page: page,
                pageSize: pageSize
	        }
	    }).then((res) => {
            console.log("1:1문의게시글 데이터 : ", res.data);
            setBoardList(res.data.boardList || []);
            setPageHandler(res.data.ph);
            console.log(res.data.ph);
        })
        .catch((error) => {
            console.error("error", error)
        })
    }

    const myloadList = () => {
        setIsMyList(true);
        setPage(1);
    }

    //문의글 작성 버튼 클릭
    const writeSubmit = () => {    
        if (!writer){
            alert("작성자를 입력해주세요");
            return;
        }
        if (!password){
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!boardText){
            alert("내용을 입력해주세요");
            return;
        }
        if (!title){
            alert("제목을 입력해주세요");
            return;
        }

        const formData = new FormData();
        formData.append("b_writer", writer);
        formData.append("b_title", title);
        formData.append("b_pw", password);
        formData.append("b_content", boardText);

        if(file !== null){// 파일 객체
            formData.append("upload", file);
        }

        axios.post('/api/board/write', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        .then((res) => {
            if(res.data === true || res.data === "true"){
                console.log("게시글 작성 성공");
                resetBoard();
            }else{
                console.log("게시글 작성 실패");
            }
        })
        .catch((error) => {
            console.error("error", error)
        })
    };

    //문의하기 클릭
    const writeButton = () => {
        //뒤로가기 기능 추가        
        window.history.pushState(null, "", window.location.href);
        
        if(userEmail !== null){            
            setWriteBoard(true);
            setDetailBoard(false);
            setModifyBoard(false);
            setReplStatus(false);
            setTitle('');
            setPassword('');
            setBoardText('');
            setFile(null);
        }else{
            alert("로그인시 글작성이 가능합니다.");
            setWriteBoard(false);
            setDetailBoard(false);
            setModifyBoard(false);
            setReplStatus(false);
        }
    }

    //문의게시판 리셋(새로고침)후 전체목록 돌아가기
    const resetBoard = () =>{
        setListType(8); setIsMyList(false);  setWriteBoard(false); setDetailBoard(false);setModifyBoard(false);setReplStatus(false);
        setSearchType('b_title'); setSearchKeyword(''); setAppliedKeyword(''); setAppliedSearchType('b_title');
        setPage(1); setWriter(userNickName);setTitle(''); setPassword(''); setBoardText(''); setFile(null); setDelState(false);loadList();
        setReRef(0);setReRestep(0);setReLevel(0);setPreviewUrl(null);
    }

    //게시글 상세보기
    const detailView = (num) => {
        //뒤로가기 기능 추가        
        window.history.pushState(null, "", window.location.href);

        
        axios.get('/api/board/boardInfo', {
	        params: {
	            b_code: num
	        },
            withCredentials: true
	    }).then((res) => {
            console.log(userEmail)
            console.log(userNickName)
            console.log("상세보기 테스트");
            console.log(res.data);
            console.log(num)
            console.log(res.data.b_code)
            if(!res.data){
                alert("본인이 작성한 게시글만 열람가능합니다.");
                setDetail({});       
                setDetailBoard(false);
                setWriteBoard(false);
                setModifyBoard(false);
                setReplStatus(false);
            }else{
                setDetail(res.data);
                setDetailBoard(true);
                setWriteBoard(false);
                setModifyBoard(false);
                setReplStatus(false);
            }
        })
        .catch((error) => {
            console.error("error", error);
            alert("글 작성한 아이디로만 조회가 가능합니다.");
        })
        //console.log(num);
    }
    //게시글 수정버튼 클릭
    const modifyButton = () => {
        //뒤로가기 기능 추가        
        window.history.pushState(null, "", window.location.href);
        
        if(userEmail !== null){            
            setWriteBoard(false);
            setDetailBoard(false);
            setModifyBoard(true);
            setReplStatus(false);
            setWriter(detail.b_writer);
            setTitle(detail.b_title);
            setPassword('');
            setBoardText(detail.b_content);
        }else{
            alert("로그인시 수정가능합니다.");
        }
    }
    //게시글 수정 취소 클릭
    const cancelButton = () => {
        setWriteBoard(false);
        setDetailBoard(true);
        setModifyBoard(false);
        setReplStatus(false);
    }
    
    //게시글 수정 컨펌
    const detailModify = () => {
        if(!userNickName || !userEmail){
            return alert("로그인이 필요합니다");
        } 
        
        if (!writer){
            alert("작성자를 입력해주세요");
            return;
        }
        if (!password){
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!boardText){
            alert("내용을 입력해주세요");
            return;
        }
        if (!title){
            alert("제목을 입력해주세요");
            return;
        }

        const formData = new FormData();
        formData.append("b_writer", writer);
        formData.append("b_title", title);
        formData.append("b_pw", password);
        formData.append("b_content", boardText);
        formData.append("b_code", detail.b_code);

         // 새 파일 선택했을 때만 추가
        if(file){
            formData.append("upload", file);
        }

        axios.put('/api/board/update', formData, {
	        headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
	    }).then((res) => {
            if(res.data === true || res.data === "true"){
                alert("게시글 수정 완료");
                detailView(detail.b_code);
            }else{
                alert("비밀번호가 틀렸거나 본인 글이 아니면 수정할수 없습니다.");
            }
        })
        .catch((error) => {
            console.error("error", error);
        })
    }

    const [noticelist,setNoticelist] = useState([]);
    const [ph,setPh] = useState({});
    const [serch,setSerch] = useState("")
    useEffect(()=>{
        axios.get('/api/board/noticelist',{
            params: {
                page: page,
                pageSize: 10,
                searchType: searchType,
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            console.log("회원정보 데이터 : ", res.data.list);
            console.log("회원정보 데이터 : ", res.data.ph);
            setNoticelist(res.data.list);
            setPh(res.data.ph);
            setSearchType(res.data.searchType);
            setSearchKeyword(res.data.searchKeyword);
        })
        .catch((error) => {
            console.error("error", error)
        })
        console.log(page)
    },[page])
    //삭제클릭 상태
    const [delState, setDelState] = useState(false);

    //게시글 삭제 클릭
    const deleteButton = () => {
        setDelState(true);
    }

    //게시글 삭제하기
    const deleteSubmit = () => {
        if(userEmail !== "admin@resort.com" && password === ""){
            alert("비밀번호를 입력해주세요.")
            return;
        }

        if(!window.confirm("정말 삭제하시겠습니까?")){
           return;
        }
        
        axios.delete('/api/board/delete', {
	        params: {
	            b_code: detail.b_code,
                b_pw: (userEmail === "admin@resort.com" ? detail.b_pw : password)
	        },
            withCredentials: true
	    }).then((res) => {        
           if(res.data > 0){
                alert("게시글 삭제 완료");
                setDelState(false);
                setPassword('');
                resetBoard();                 
            }else{
                alert("비밀번호가 틀렸거나 본인 글이 아니면 삭제할수 없습니다.");
            }
        })
        .catch((error) => {
            console.error("error", error);
        })
    }

    //검색버튼 클릭
    const handleSearch = () => {
        setPage(1);
        setAppliedKeyword(searchKeyword);
        setAppliedSearchType(searchType);
    }

    //댓글작성 상태
    const [replStatus, setReplStatus] = useState(false);
    //댓글달 게시글의 ref
    const [reRef,setReRef] = useState(1);
    //댓글달 게시글의 restep
    const [reRestep,setReRestep] = useState(1);
    //댓글달 게시글의 relevel
    const [reLevel,setReLevel] = useState(1);

    //댓글작성버튼 클릭
    const replyClick = (rref,rrestep,rrelevel) => {
        writeButton();
        setReplStatus(true);
        setReRef(rref);
        setReRestep(rrestep);
        setReLevel(rrelevel);
    }

    //댓글 작성컨펌
    const replySubmit = () => {
        if(!userNickName || !userEmail){
            return alert("로그인이 필요합니다");
        } 
        
        if (!writer){
            alert("작성자를 입력해주세요");
            return;
        }
        if (!password){
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!boardText){
            alert("내용을 입력해주세요");
            return;
        }
        if (!title){
            alert("제목을 입력해주세요");
            return;
        }

        const formData = new FormData();
        formData.append("b_writer", "관리자");
        formData.append("b_title", title);
        formData.append("b_pw", password);
        formData.append("b_content", boardText);
        formData.append("ref", reRef);
        formData.append("re_step", reRestep);
        formData.append("re_level", reLevel);

        if(file !== null){// 파일 객체
            formData.append("upload", file);
        }

        axios.post('/api/board/reply', formData, {
	        headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
	    }).then((res) => {
            if(res.data === true || res.data === "true"){
                alert("댓글작성 완료");
                resetBoard();
            }else{
                alert("댓글작성 실패. 관리자 아이디 로그인이 필요합니다.");
            }
        })
        .catch((error) => {
            console.error("error", error);
        })
    }

    //시간표시
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const pages = [];

    for (let i = ph.startPage; i <= ph.endPage; i++) {
        pages.push(
            <button key={i} onClick={() => {setPage(i), window.scrollTo(0,0)}} className={i === ph.pageNum ? "pageBtn active" : "pageBtn"}>
            {i}
            </button>
        );
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        setSearchKeyword(serch)
        setPage(1);
    }
    const [noticeNum,setNoticeNum] = useState(0);

    //글갯수 필터링(댓글제외)
    const parentPosts = boardList.filter(item => item.re_level === 0);

    //다운로드 클릭시
    const handleDownload = (fileName) => {
        const link = document.createElement("a");
        link.href = `img/boardImg/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //첨부파일 미리보기 상태
    const [previewUrl, setPreviewUrl] = useState(null);

    //첨부파일 확장자명 분류
    const isImageFile = (fileName) => {
        if (!fileName) return false;
        const ext = fileName.toLowerCase().split('.').pop();
        return ext === 'jpg' || ext === 'jpeg' || ext === 'png';
    };
    
    return(
        <div className="helpCenter_container">
            {/* 왼쪽 메뉴 */}
            <div className='helpCenter_list'>
                <ul>
                    <li className='list_title'>고객센터</li>
                    <li className='list_menu'>
                        <Link to={`/helpCenter`} onClick={() => window.scrollTo(0, 0)}>
                            <button type='button' className='list_menuBtn' onClick={() => {setIsMyList(false); setWriteBoard(false); setDetailBoard(false);setModifyBoard(false);setReplStatus(false); setSearchType('b_title'); setSearchKeyword(''); setAppliedKeyword(''); setAppliedSearchType('b_title'); setPage(1); setWriter(userNickName);setTitle(''); setPassword(''); setBoardText(''); setFile(null); setDelState(false);loadList();
            setReRef(0);setReRestep(0);setReLevel(0);setPreviewUrl(null);}} style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                                자주 찾는 질문
                            </button>
                        </Link>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setIsMyList(false); setWriteBoard(false); setDetailBoard(false);setModifyBoard(false);setReplStatus(false); setSearchType('b_title'); setSearchKeyword(''); setAppliedKeyword(''); setAppliedSearchType('b_title'); setPage(1); setWriter(userNickName);setTitle(''); setPassword(''); setBoardText(''); setFile(null); setDelState(false);loadList();
        setReRef(0);setReRestep(0);setReLevel(0);setPreviewUrl(null);}} style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                            공지사항
                        </button>
                    </li>
                    <li className='list_menu'>
                        <Link to={`/helpCenter3`} onClick={() => window.scrollTo(0, 0)}>
                            <button type='button' className='list_menuBtn' onClick={resetBoard} style={{fontWeight: listType === 8 ? 'bold' : 'normal'}}>
                                1 대 1 문의
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            
            {/* 공지사항 메인 */}
            
            {listType === 2 &&
                (<div className='helpCenter_text'>
                    <h1 className='text_title'>공지사항</h1>
                    {noticeNum ===0 && 
                        noticelist.map((item,index)=>(
                            <div key={index} className='helpCenter_texts notice' style={index===0?{borderTop:'2px solid black'}:{}} onClick={()=>setNoticeNum(index+1)}>
                                <p>{item.n_title}</p>
                            </div>
                        )) 
                             
                    }
                    {noticeNum ===0 && 
                        <div className="paging2" style={{width:"673px",marginTop:"10px"}}>
                                {/* 페이지가 많을때 좌우 버튼 */}
                                {ph.prev && (
                                    <button className="arrowbtn" onClick={() => setPage(ph.startPage - 1)}>◀</button>
                                )}
                                <div className="pages">{pages}</div>
                                {ph.next && (
                                    <button className="arrowbtn" onClick={() => setPage(ph.endPage + 1)}>▶</button>
                                )}
                            </div>
                    }
                    {noticeNum !==0 ?
                        (
                        <>
                            <div className='helpCenter_text' style={{width:"673px",borderTop:'2px solid black' }}>
                                <div className='helpCenter_texts'>
                                    <p>{noticelist[noticeNum-1].n_title}</p>
                                    <p className='notice-date'>작성일 : {noticelist[noticeNum-1].n_date.slice(0,10)}</p>
                                </div>
                                <div className='notice-contents' style={{whiteSpace:"pre-wrap",backgroundColor:"rgba(90, 146, 180, 0.12)",borderBottom:"1px solid #333",padding:"50px 10px",margin:"0"}}>
                                    {noticelist[noticeNum-1].n_content}
                                </div>
                                <button type='button' className='noticeContentsBtn' onClick={()=>setNoticeNum(0)}>목록 보기</button>
                            </div>
                            
                        </>
                        
                        )
                        :
                        null
                    }
                </div>
            )}   

            {/* 우측 고객센터 전화번호 등 */}
            <div className='helpCenter_tel'>
                <div className='helpCenter_tel1'>
                    <h1 className='tel1_title'>EcoStay 고객 센터</h1>
                    <ul>
                        {/* <li className='tel_list chatLi'>
                            <button type='button' className='chatBtn'>
                                채팅 상담
                            </button>
                        </li> */}
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            여행 상담센터
                            <p className='info_tel'>9999-9996</p>
                        </li>
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            국내 숙소 상담센터
                            <p className='info_tel'>9999-9997</p>
                        </li>
                        <li className='tel_list'>
                            <i className="fa-solid fa-phone"></i>
                            해외 숙소 상담센터
                            <p className='info_tel'>9999-9998</p>
                        </li>
                        <li className='tel_list' style={{border:'none'}}>
                            <i className="fa-solid fa-phone"></i>
                            고객센터
                            <p className='info_tel'>9999-9999</p>
                        </li>
                    </ul>
                </div>
                <div className='helpCenter_tel2'>
                    <p className='tel2_title'>
                        <i className="fa-solid fa-circle-info"></i>
                        상담시간 안내
                    </p>
                    <ul>
                        <li>
                            <p className='tel2_info'>* 해외/국내 여행 상담</p>
                            <p className='tel2_info2'>평일 9:00 ~ 18:00 (토/일요일 및 공휴일 휴무)</p>
                        </li>
                        <li>
                            <p className='tel2_info'>* 채팅상담</p>
                            <p className='tel2_info2'>24시간 운영</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}