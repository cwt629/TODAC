import React, { useEffect, useState, useRef  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { popupAchievement } from '../../../utils/achieveAlert';

const GameMain = () => {
    const navi = useNavigate();
    const usercode = sessionStorage.getItem('usercode');

    let urlSet = 'http://175.45.192.182:7777?usercode=' + usercode;
    //urlSet = 'http://localhost:7777?usercode=' + usercode;
    //console.log(' ======================= urlSet : ', urlSet);

    useEffect(() => {
        const receiveMessage = (event) => {
            // 이벤트 객체의 origin 속성을 사용하여 메시지의 출처를 확인
            //if(event.origin !== 'http://175.45.192.182:7777') return; // 원하는 출처 확인
            if(event.data.gameDone) {
                const score = event.data.score;
                const point = score >= 800 ? 100 : 10;
                
                const url = "/game/insertpoint";
                axios.post(url, {
                      score
                    , usercode
                }).then(res => {
                    if(res.data.badge==0){
                        popupAchievement("프로웃음러").then(res => {
                            Swal.fire({
                                title:"축하드립니다!" ,
                                html: `${score}점을 획득하여 <br/>
                                ${point}TP가 적립되었습니다!`,
                                confirmButtonColor: '#5279FD',
                                background: 'white',
                                confirmButtonText: '확인'
                            });
                        })
                    } else {
                        Swal.fire({
                            title:"축하드립니다!" ,
                            html: `${score}점을 획득하여 <br/>
                            ${point}TP가 적립되었습니다!`,
                            confirmButtonColor: '#5279FD',
                            background: 'white',
                            confirmButtonText: '확인'
                        });
                    }
                    
                }).catch(error => {
                    console.error("Error fetching inquiry data:", error);
                });
            }
            //console.log('Message from iframe:', event.data);
        };
    
        // 이벤트 리스너 등록
        window.addEventListener('message', receiveMessage);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
      }, []);

    return (
        <div className='mx_30'>

            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티 {">"} </Link>
                <span>미소팡팡</span>
            </div>

            <div className='fs_25 fw_700'>미소팡팡</div>

            <div style={{width: '100%', position : 'relative', height: '550px'}}>
            <iframe
                style={{
                      width: '100%'
                    , height : '100%'
                }}
                title="Cocos Creator Game"
                src={urlSet}
            ></iframe>
            </div>

        </div>
    );
};

export default GameMain;