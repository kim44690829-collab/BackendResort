import { useState,useEffect,useContext } from "react";
// import { createContext } from "react";
import './Modal2.css';
import { ResortDataContext } from '../Api/ResortData';

// export const ModalContext = createContext();
//모달 토

export default function Modal2(){
     const {isOpen2, setIsOpen2,toggle2,modalContent2, setModalContent2} = useContext(ResortDataContext);
   
    return(
        <>      
            {/* 부모로 부터 이벤트 전파 막기 */}
            <div className="modalWrap2" onClick={e => e.stopPropagation()}>
                <button className='closeBtn' onClick={toggle2}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {modalContent2}            
            </div>
        </>
        
    )
}