import { useState,useEffect } from "react";
import { createContext } from "react";
import './Modal.css';

export const ModalContext = createContext();

export default function Modal({children}){
    //모달창 상태
    const[isOpen, setIsOpen] = useState(false);
    //모달 컨텐츠
    const[modalContent, setModalContent] = useState(``);

    //모달 토글
    const toggle = () =>{
        setIsOpen(!isOpen);
    }
   
    const [AddressCopy, setAddressCopy] = useState(false);
    const [timer, setTimer] = useState(null); // 타이머 상태 추가

    const AddressCopyClick = () => {
        setAddressCopy(true);
        
        // 기존 타이머가 있다면 정리
        if (timer) {
            clearTimeout(timer);
        }

        // 새로운 타이머 설정
        const newTimer = setTimeout(() => {
            setAddressCopy(false);
        }, 2000);
        
        setTimer(newTimer); // 타이머 ID 저장
    };

    // 컴포넌트가 언마운트 될 때 타이머를 정리
    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return(
        <ModalContext.Provider value={{toggle,setModalContent,AddressCopy,AddressCopyClick}}>
            {children}

            {isOpen &&
                <div className='modalOverlay' onClick={toggle}>
                    {/* 부모로 부터 이벤트 전파 막기 */}
                    <div className="modalWrap" onClick={e => e.stopPropagation()}>
                        <button className='closeBtn' onClick={toggle}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        {modalContent}            
                    </div>
                </div>
            }
            {AddressCopy && <p className='copytext' style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',zIndex:'11111111111',backgroundColor:'#ffffffed',padding:'25px 33px',fontSize:'18px',fontWeight:'600',borderRadius:'10px'}}>주소가 복사되었습니다.</p>}
        </ModalContext.Provider>
    )
}