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
                    <img alt='' src={logo} />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default RouterStartMain;