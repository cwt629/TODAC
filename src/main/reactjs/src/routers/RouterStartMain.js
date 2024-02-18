import React, { useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import logo from '../image/todac_logo_temp.png';
import { useNavigate } from 'react-router-dom';

const RouterStartMain = () => {
    const nav = useNavigate(); // TODO : 임시로 만든 것으로, 아래 버튼 삭제 시 같이 지우기

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            nav("/login");
        }
    }, [])

    return (
        <div>
            <div className='app container-fluid p-0'>
                <Header />
                <div className='appcontent startpage'>
                <div class="main_ani">
                    <div class="animation">
                        <span class="one_text">T</span>
                        <span class="two_text two_t">his app may</span>
                        <br/>
                        <span class="one_text">O</span>
                        <span class="two_text2 two_t">ffer you</span>
                        <br/>
                        <span class="one_text">D</span>
                        <span class="two_text3 two_t">ream</span>
                        <br/>
                        <span class="one_text">A</span>
                        <span class="two_text4 two_t">nd</span>
                        <br/>
                        <span class="one_text">C</span>
                        <span class="two_text5 two_t">omfort</span>
                    </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default RouterStartMain;