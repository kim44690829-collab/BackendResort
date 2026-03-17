import '../Page/HelpCenter.css'
import { useState,useContext,useEffect } from 'react';
import { ResortDataContext} from '../Api/ResortData';
import axios from "axios";

export default function HelpCenter(){
    const {userEmail,userNickName,logout, headerChange, setHeaderChange, listType, setListType} = useContext(ResortDataContext);

    //

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
            
            console.log("상세보기 테스트");
            console.log(res.data);
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
        console.log(num);
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
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(1);setIsMyList(false); setWriteBoard(false); setDetailBoard(false);setModifyBoard(false);setReplStatus(false); setSearchType('b_title'); setSearchKeyword(''); setAppliedKeyword(''); setAppliedSearchType('b_title'); setPage(1); setWriter(userNickName);setTitle(''); setPassword(''); setBoardText(''); setFile(null); setDelState(false);loadList();
        setReRef(0);setReRestep(0);setReLevel(0);setPreviewUrl(null);}} style={{fontWeight: listType === 1 ? 'bold' : 'normal'}}>
                            자주 찾는 질문
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={() => {setListType(2);setIsMyList(false); setWriteBoard(false); setDetailBoard(false);setModifyBoard(false);setReplStatus(false); setSearchType('b_title'); setSearchKeyword(''); setAppliedKeyword(''); setAppliedSearchType('b_title'); setPage(1); setWriter(userNickName);setTitle(''); setPassword(''); setBoardText(''); setFile(null); setDelState(false);loadList();
        setReRef(0);setReRestep(0);setReLevel(0);setPreviewUrl(null);}} style={{fontWeight: listType === 2 ? 'bold' : 'normal'}}>
                            공지사항
                        </button>
                    </li>
                    <li className='list_menu'>
                        <button type='button' className='list_menuBtn' onClick={resetBoard} style={{fontWeight: listType === 8 ? 'bold' : 'normal'}}>
                            1 대 1 문의
                        </button>
                    </li>
                </ul>
            </div>
            {/* 자주찾는 질문 */}
            {listType === 1 &&
            (<div className='helpCenter_text'>
                <h1 className='text_title'>자주 찾는 질문</h1>
                <div className='helpCenter_texts' style={{borderTop:'2px solid black'}}>
                    <div>
                        <p onClick={contentHandeler1} style={{cursor:'pointer'}}>Q. [숙소] 예약을 취소하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName1 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler1}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                <p className='text_contents'
                style={{height:isContent1 ? '245px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease', 
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                    }}>
                    <br/> A. 예약 취소는 EcoStay앱 또는 웹의 ‘내 정보 → 예약/구매 내역’에서 직접 진행하실 수 있습니다. <br/>

                    취소 및 환불은 예약·결제 시 안내된 취소/환불 규정에 따라 처리되며, <br/>
                    취소 수수료가 발생하는 경우 해당 금액을 제외한 금액이 환불됩니다.<br/>

                    일부 숙소의 경우 앱에서 취소가 제한될 수 있으며, <br/>
                    이 경우 고객센터를 통해 취소 요청을 해주시기 바랍니다. 
                </p>

                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler2} style={{cursor:'pointer'}}>Q. [공통] 천재지변 또는 감염병으로 예약을 취소해야 할 경우 어떻게 하나요?</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName2 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler2}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>

                <div className='text_contents' style={{
                        height:isContent2 ? '220px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                }}>
                    <br/> A. 기상 악화, 감염병 확산 등 불가항력적인 사유로 숙소 이용이 어려운 경우, <br/>
                    고객센터로 예약 내역과 증빙 서류를 접수해 주시면 확인 후 취소 가능 여부를 안내드립니다. <br/>

                    다만, 당사는 숙소와 고객을 연결하는 중개 플랫폼으로, <br/>
                    취소 및 환불 여부는 각 숙소의 운영 정책에 따라 결정됩니다. <br/>
                    상황에 따라 취소 수수료가 발생하거나 취소가 제한될 수 있는 점 양해 부탁드립니다. 
                </div>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler3} style={{cursor:'pointer'}}>Q. [숙소] 예약 대기 중인 예약을 취소하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName3 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler3}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <p className='text_contents' style={{
                        height:isContent3 ? '185px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                }}>
                    <br/> A. 예약이 대기 상태인 경우, <br/>
                    고객센터를 통해 예약 취소 요청을 해주시기 바랍니다. <br/>

                    다만, 예약이 확정된 이후에는 <br/>
                    숙소의 취소 규정에 따라 취소 수수료가 발생하거나 취소가 제한될 수 있습니다.
                </p>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler4} style={{cursor:'pointer'}}>Q. [숙소] 체크인 날짜 또는 객실 타입을 변경하고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName4 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler4}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <p className='text_contents' style={{
                        height:isContent4 ? '250px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                }}>
                   <br/>  A. 예약 결제가 완료된 이후에는 체크인 날짜 및 객실 타입 변경이 불가능합니다. <br/>

                    변경이 필요한 경우, <br/>
                    예약 취소 및 환불 규정에 따라 기존 예약을 취소한 후 재예약해 주셔야 합니다.<br/>
                    예약 취소가 가능한 기간이라면 취소 후 재결제하여 이용해 주시기 바랍니다.<br/>

                    만약 취소가 어렵거나 취소 수수료가 발생하는 경우에는<br/>
                    고객센터로 문의해 주시면 안내해 드리겠습니다.
                </p>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler5} style={{cursor:'pointer'}}>Q. [공통] 현금영수증을 발급받고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName5 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler5}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <div className='text_contents' style={{
                        height:isContent5 ? '500px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                }}>
                    <br/>A. 현금영수증은 현금성 결제 수단으로 결제한 경우에 한해 발급이 가능합니다.<br/>

                    결제 과정에서 현금영수증을 신청하신 경우 자동으로 발급되며,<br/>
                    신청을 누락했거나 발급 내역이 확인되지 않는 경우에는<br/>
                    각 결제 수단별 발급 경로를 통해 확인해 주시기 바랍니다.<br/><br/>

                    <div className='contents5'>
                    [결제 수단별 발급 안내] <br/><br/>

                        네이버페이 <br/>

                        결제 단계에서 현금영수증 신청 시 자동 발급<br/>

                        자진 발급: 네이버페이 → 결제내역 → 주문 상세 → 영수증 발급 내역 확인<br/><br/>

                        간편계좌이체 (TOSS / PAYCO)<br/>

                        결제 단계에서 현금영수증 신청 시 자동 발급<br/>

                        신청 누락 시 고객센터를 통해 문의해 주세요<br/><br/>

                        카카오페이<br/>

                        카카오페이머니 결제 시 자동 발급<br/>

                        카카오톡 → Pay → 이용내역 → 결제 상세 → 현금영수증 확인
                    </div>
                </div>
                
                <div  className='helpCenter_texts'>
                    <div>
                        <p onClick={contentHandeler6} style={{cursor:'pointer'}}>Q. [공통] 영수증 또는 거래내역서를 발급받고 싶어요.</p>
                    </div>
                    <div>
                        <button type="button" className={`${isName6 ? 'textDownBtn BtnChange' : 'textDownBtn'}`} onClick={contentHandeler6}>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                    </div>
                </div>
                
                <div className='text_contents' style={{
                        height:isContent6 ? '400px' : '0px',
                        overflow:'hidden', 
                        transition:'height 0.3s ease',
                        backgroundColor:'rgba(97, 149, 182, 0.12)',
                        padding:'0 20px 0 20px'
                }}>
                    <br/> A. 예약 및 결제 정보가 포함된 영수증 또는 거래내역서는<br/>
                    아래 경로를 통해 직접 확인 및 발급하실 수 있습니다.<br/><br/>

                    <div className='contents6'>
                    [영수증 발급 방법]<br/>

                    앱/웹 → 내 정보 → 예약 내역 → 예약 상세
                    → 결제 증빙 보기 → 영수증 확인<br/>
                    ※ 네이버페이 결제 건은 네이버페이 결제 페이지에서 확인 가능합니다.<br/><br/>

                    [거래내역서 발급 방법]<br/>

                    앱/웹 → 내 정보 → 예약 내역 → 예약 상세
                    → 결제 증빙 보기 → 거래내역서 발급
                    → 수령할 이메일 주소 입력 후 발송<br/><br/>

                    ※ 거래내역서는 단순 거래 확인용 자료로, 세금계산서 등 법적 효력은 없습니다.<br/>
                    ※ 예약 완료(이용 확정), 이용 완료, 예약 취소 건에 대해서만 발급 가능하며<br/>
                    예약 실패 또는 예약 대기 상태의 건은 발급이 제한됩니다.
                    </div>
                </div>
            </div>)
            }
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
            {/* 1대1 문의 게시글 작성*/}
            {listType === 8 && writeBoard === true && detailBoard === false && modifyBoard === false &&(
                <div className="helpCenter_text">
                    <h1 className="text_title">1 대 1 문의</h1>
                    <div id="board_wrap2" style={{borderTop:'2px solid black'}}>
                    {replStatus === false ? (
                        <div className="word"><h2>문의글 작성</h2></div>
                    ): (
                        <div className="word"><h2>문의답변 작성</h2></div>
                    )}
                        <div className="content">
                            <table style={{ width: '100%'}}>
                                <tbody>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderTop:'0' }}>작성자</td>
                                        {replStatus === false ? (
                                            <td style={{ width: '450px',borderTop:'0' }}><input type="text" name="writer" value={writer} onChange={(e) => setWriter(e.target.value)} /></td>
                                        ):(
                                            <td style={{ width: '450px',borderTop:'0' }}><input type="text" name="writer" value="관리자" readOnly /></td>
                                        )}
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>제목</td>
                                        <td style={{ width: '450px' }}><input type="text" name="subject" className="b_subject" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>비밀번호</td>
                                        <td style={{ width: '450px' }}><input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>글내용</td>
                                        <td style={{ width: '561px' }}><textarea rows="10" cols="55" name="content" className="b_contents" value={boardText} onChange={(e) => setBoardText(e.target.value)}></textarea></td>
                                    </tr>
                                    {previewUrl && (
                                        <tr height="40">
                                            <td align="center" style={{ width: '150px' }}>미리보기</td>
                                            <td style={{ width: '450px',padding:'10px' }}>
                                                <img src={previewUrl} alt="미리보기" style={{ maxWidth: "30%"}}/>
                                            </td>
                                        </tr>
                                    )}
                                    {/* 파일 업로드 */}
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderBottom:'0' }}>첨부파일</td>
                                        <td style={{ width: '450px',border:'0' }}>
                                            <input type="file" name="upload" style={{ border:'0' }} onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    setFile(selectedFile);

                                                    if (selectedFile && selectedFile.type.startsWith("image/")) {
                                                    setPreviewUrl(URL.createObjectURL(selectedFile));
                                                    } else {
                                                    setPreviewUrl(null);
                                                    }
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr height="40" className='ans_btn'>
                                        <td align="center" colSpan="2" style={{ border:'0',backgroundColor:'#fff'}}>
                                        {replStatus === false ? (
                                            <input type="button" onClick={writeSubmit} value="확인" />
                                        ):(
                                            <input type="button" onClick={replySubmit} value="확인" />
                                        )}
                                        <input type="button" onClick={resetBoard} value="취소" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}     

            {/* 1대1 문의 게시글 전체 */}
            {listType === 8 && writeBoard === false && detailBoard === false && modifyBoard === false &&(
                <div id="board" className="helpCenter_text">
                    <h1 className="text_title">1 대 1 문의</h1>

                    {boardList && boardList.length > 0 ? (
                    <div id="board_wrap">
                        <div className="word">
                            <h2>전체 문의글</h2>
                            <button type="button" className="sportBtn" onClick={writeButton} style={{marginLeft:'15px'}}>
                                <i className="fa-regular fa-circle-question" style={{color:'#42799b'}}></i> 문의하기
                            </button>
                            {!(userEmail == "" || userEmail == null) &&
                                <button type="button" className="sportBtn" onClick={()=>{myloadList();}}>
                                    <i className="fa-regular fa-user" style={{color:'#42799b'}}></i> 나의 문의글
                                </button>
                            }                        
                        </div>
                        <div className="content">
                        <table>
                            <tbody>
                            {/* 테이블 헤더 */}
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일자</th>
                                <th>조회수</th>
                            </tr>
                            
                            {/* 게시글 반복 */}
                            {boardList.map((item, index) => (
                                <tr key={item.b_code} className={item.re_level > 1 ? 'reple' : null}>
                                    <td>
                                        {!isMyList ?
                                        (pageHandler.totalCnt - ((page - 1) * pageSize) - index)
                                        :
                                        (item.re_level === 1 ? pageHandler.totalCnt - ((page - 1) * pageSize) - (index - boardList.slice(0, index).filter(v => v.re_level > 1).length)
                                            : ""
                                        )}
                                    </td>
                                    <td className='boardTitle'> 
                                        <button onClick={()=>{detailView(item.b_code)}}>
                                            {/* 답글인 경우 */}
                                            {item.re_level > 1 ? (
                                                // <span style={{ paddingLeft: `${(item.re_level - 1) * 20}px` }}>
                                                <span className='answer-wrap'>
                                                   └<span className='answer'>답변완료</span> {item.b_title}
                                                </span>
                                            ) : (
                                            item.b_title
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        {item.b_writer}
                                    </td>
                                    <td>
                                        {formatDateTime(item.b_date).slice(0, 10)}
                                    </td>
                                    <td>
                                        {item.readcount}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    ) : (
                    <div>
                        <p className="support-1on1">현재 문의 사항이 없습니다.</p>
                    </div>
                    )}

                    {boardList && boardList.length > 0 ? (
                    <div className="pagination">
                        <button onClick={() => {setPage(1);}}>첫 페이지</button> 

                        
                        {/* 이전 블록 */}
                        {pageHandler.prev && (
                            <button
                            onClick={() =>
                                setPage(pageHandler.startPage - pageHandler.pageBlock)
                            }
                            >
                            ◀
                            </button>
                        )}

                        {/* 페이지 번호 */}
                        {Array.from(
                            { length: pageHandler.endPage - pageHandler.startPage + 1 },
                            (_, i) => pageHandler.startPage + i
                        ).map((num) => (
                            <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={page === num ? "active" : ""}
                            >
                            {num}
                            </button>
                        ))}

                        {/* 다음 블록 */}
                        {pageHandler.next && (
                            <button
                            onClick={() =>
                                setPage(pageHandler.startPage + pageHandler.pageBlock)
                            }
                            >
                            ▶
                            </button>
                        )}

                        {page !== pageHandler.totalPage && (
                            <button onClick={() => setPage(pageHandler.totalPage)}>
                                마지막 페이지
                            </button>
                        )}

                    </div>
                    ):null}

                    <div className="search-wrap">
                        <select name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)} style={{ width: "100px", padding: "0 10px", height: "37px" }}>
                            <option value="b_title">제목</option>
                            {/* <option value="b_content">내용</option> */}
                            <option value="b_writer">작성자</option>
                        </select>
                        <input type="text" name="searchKeyword" placeholder="검색어를 입력하세요." value={searchKeyword} onChange={(e) => {e.preventDefault();setSearchKeyword(e.target.value)}}
                         onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault();handleSearch();}}}
                            style={{ height: "37px", width: "250px", padding: "0 10px" }}/>
                        <button type="button" className="btn searchBtn" onClick={handleSearch} >
                            <i className="fa-solid fa-magnifying-glass" style={{color:'#42799b'}}></i> 검색</button>
                        <button type="button" className="btn searchBtn" onClick={resetBoard} >
                            <i className="fa-solid fa-list" style={{color:'#42799b'}}></i> 전체목록
                        </button>
                    </div>                    
                </div>
            )}

            {/* 1대1 문의 게시글 상세*/}
            {listType === 8 && writeBoard === false && detailBoard === true && modifyBoard === false &&(
                <div className="helpCenter_text">
                    <h1 className="text_title">1 대 1 문의</h1>
                    <div id="board_wrap4" style={{borderTop:'2px solid black'}}>
                    <div className="word"><h2>문의글 상세보기</h2></div>
                        <div className="content">
                            <table style={{ width: '100%'}}>
                                <tbody>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderTop:'0' }}>제목</td>
                                        <td style={{ width: '100%',borderTop:'0' }}>{detail.b_title}</td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>작성일자</td>
                                        <td style={{ width: '100%' }}>{formatDateTime(detail.b_date)}
                                            {detail.b_update != detail.b_date ?
                                                " (수정일자: "+formatDateTime(detail.b_update)+")" :                                                
                                                null
                                            }
                                        </td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>조회수</td>
                                        <td style={{ width: '100%' }}>{detail.readcount}</td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>작성자</td>
                                        <td style={{ width: '100%' }}>{detail.b_writer}</td>
                                    </tr>
                                    <tr height="240">
                                        <td align="center" style={{ width: '150px' }}>글내용</td>
                                        <td style={{ width: '100%' }}>{detail.b_content}</td>
                                    </tr>
                                                                          
                                    {/* 첨부파일 업로드시 */}
                                    {detail.b_upload && isImageFile(detail.b_upload) && (
                                        <tr height="40">
                                            <td align="center" style={{ width: '150px' }}>미리보기</td>
                                            <td style={{ width: '100%',padding:'10px' }}>
                                                <img src={`/img/boardImg/${detail.b_upload}`} alt="첨부이미지"
                                                    style={{ maxWidth: "30%", borderRadius: "6px" }}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                    {/* 파일 업로드 */}
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderBottom:'0' }}>첨부파일</td>
                                        <td style={{ width: '100%',borderBottom:'0' }}>
                                            {detail.b_upload ? (
                                                <button className='download' onClick={() => handleDownload(detail.b_upload)}>
                                                    <i className="fa-solid fa-download"></i> {detail.b_upload}
                                                </button>
                                            ) : (
                                                "첨부파일 없음"
                                            )}
                                        </td>
                                    </tr>
                                    {delState && 
                                    (<tr height="40">
                                        <td align="center" style={{backgroundColor:'#ae4444'}}>비밀번호</td>
                                        <td style={{ width: '100%' }}>
                                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <input type="button" onClick={deleteSubmit} value="확인" />
                                        </td>                                        
                                    </tr>)}
                                    <tr height="40" className='ans_btn'>
                                        <td align="center" colSpan="2" style={{backgroundColor:'#fff', border:'0'}}>
                                        <input type="button" onClick={modifyButton} value="수정하기" />
                                        {/* 삭제하기 눌렀을때 관리자가 아니면 비밀번호 입력 */}
                                        {!delState && userEmail !== "admin@resort.com" &&
                                            <input type="button" onClick={()=>{deleteButton();setPassword();}} value="삭제하기" />
                                        }
                                        {/* 삭제하기 눌렀을때 관리자면 비밀번호 입력안해도 삭제 */}
                                        {!delState && userEmail === "admin@resort.com" &&
                                            <input type="button" onClick={deleteSubmit} value="삭제하기" />
                                        }
                                        {userEmail === "admin@resort.com" ? (
                                            <input type="button" onClick={()=>replyClick(detail.ref,detail.re_step,detail.re_level)} value="댓글작성" />
                                        ):null}
                                        {!isMyList &&
                                            <>
                                                <input type="button" onClick={()=>{resetBoard();setPage(page);}} value="이전으로" />
                                                {/* <input type="button" onClick={resetBoard} value="전체목록" /> */}
                                            </>
                                        }
                                        {isMyList &&
                                            <>
                                                <input type="button" onClick={()=>{resetBoard();setIsMyList(true);setPage(page);}} value="이전으로" />
                                                {/* <input type="button" onClick={resetBoard} value="전체목록" /> */}
                                            </>
                                        }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )} 

            {/* 1대1 문의 게시글 수정*/}
            {listType === 8 && writeBoard === false && detailBoard === false &&  modifyBoard === true &&(
                <div className="helpCenter_text">
                    <h1 className="text_title">1 대 1 문의</h1>
                    <div id="board_wrap3" style={{borderTop:'2px solid black'}}>
                    <div className="word"><h2>게시글 수정</h2></div>
                        <div className="content">
                            <table style={{ width: '100%'}}>
                                <tbody>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderTop:'0' }}>작성자</td>
                                        <td style={{ width: '450px',borderTop:'0' }}><input type="text" name="writer" value={writer} onChange={(e) => setWriter(e.target.value)} /></td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>제목</td>
                                        <td style={{ width: '450px' }}><input type="text" name="subject" className="b_subject" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>비밀번호
                                        </td>
                                        <td style={{ width: '450px' }}><input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />{userEmail === "admin@resort.com" && <span style={{color:'#ff0000',lineHeight:'24px',fontSize:'14px'}}>* 관리자는 아무거나 한글자 이상 입력</span>}</td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>글내용</td>
                                        <td style={{ width: '561px' }}>
                                            <textarea rows="10" cols="55" name="content" className="b_contents" value={boardText} onChange={(e) => setBoardText(e.target.value)}></textarea>                                        
                                        </td>
                                    </tr>
                                    
                                    {previewUrl && (
                                        <tr height="40">
                                            <td align="center" style={{ width: '150px' }}>미리보기</td>
                                            <td style={{ width: '450px',padding:'10px' }}>
                                                <img src={previewUrl} alt="미리보기" style={{ maxWidth: "30%"}}/>
                                            </td>
                                        </tr>
                                    )}

                                    {/* 파일 업로드 */}
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px' }}>첨부파일</td>
                                        <td style={{ width: '450px' }}>
                                            {detail.b_upload ? (
                                                <button className='download' onClick={() => handleDownload(detail.b_upload)}>
                                                    <i className="fa-solid fa-download"></i> {detail.b_upload}
                                                </button>
                                            ) : (
                                                "첨부파일 없음"
                                            )}
                                        </td>
                                    </tr>
                                    <tr height="40">
                                        <td align="center" style={{ width: '150px',borderBottom:'0' }}>변경할 파일</td>
                                        <td style={{ width: '450px',border:'0' }}>
                                            {/* <input type="file" name="upload" onChange={(e) => setFile(e.target.files[0])} style={{ border:'0' }}/> */}
                                            <input type="file" name="upload" style={{ border:'0' }} onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    setFile(selectedFile);

                                                    if (selectedFile && selectedFile.type.startsWith("image/")) {
                                                    setPreviewUrl(URL.createObjectURL(selectedFile));
                                                    } else {
                                                    setPreviewUrl(null);
                                                    }
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr height="40" className='ans_btn'>
                                        <td align="center" colSpan="2" style={{backgroundColor:'#fff',border:'0'}}>
                                            <input type="button" onClick={detailModify} value="수정" />
                                            <input type="button" onClick={cancelButton} value="취소" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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