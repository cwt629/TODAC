import React, { useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import logo from '../image/todac_logo_temp.png';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RouterStartMain = () => {
    const nav = useNavigate(); // TODO : 임시로 만든 것으로, 아래 버튼 삭제 시 같이 지우기

    useEffect(() => {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1000
        });
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            nav("/login");
        }
    }, [])

    return (
        <div>
            <div className='app container-fluid p-0'>
                <Header />
                {/* <div className='appcontent startpage'> */}
                <div className='startpage'>

                <div className='backgrounds overlay'>
                    <div className='background' data-aos='fade-in' data-aos-duration='1500' data-aos-anchor='.section--hero' style={{backgroundImage: `url('../image/bg_startmain.jpg')`}}></div>
                </div>

                <header className='hero' data-aos='fade-in' data-aos-duration='1500'>
                    <div className='hero-center'>
                        <h1 className='hero__logo' data-aos='zoom-in'>TODAC</h1>
                        <div className='hero__text' data-aos='fade-up' data-aos-easing='ease' data-aos-delay='400'>우리가 <span>궁금하신가요?</span></div>
                    </div>
                    <span className='hero__scroll fw_500' data-aos='fade-up' data-aos-easing='ease' data-aos-delay='800' onClick={handleScroll}>
                        궁금증 해결을 위해 스크롤<br />
                        <i className='chevron bottom'></i>
                    </span>
                </header>

                <section className='section section--code' data-aos='fade-up'>
                    <div className='container'>
                        <h2 className='section-title'>고민이 많으셨나요?</h2>
                            <div className='code code--small code--left' data-aos='fade-up'>
                                1
                            </div>
                            <div className='code code--small code--right' data-aos='fade-down'>
                                1
                            </div>
                            <div className='code code--small code--left' data-aos='fade-right'>
                                1
                            </div>
                            <div className='code code--small code--right' data-aos='fade-left'>
                                1
                            </div>
                            <div className='code code--small code--left' data-aos='fade-up-right'>
                                1
                            </div>
                            <div className='code code--small code--right' data-aos='fade-up-left'>
                                1
                            </div>
                            <div className='code code--small code--left' data-aos='fade-down-right'>
                                1
                            </div>
                            <div className='code code--small code--right' data-aos='fade-down-left'>
                                1
                            </div>
                            <div className='code code--small code--left mb_150i' data-aos='fade-up'>
                                1
                            </div>
                        </div>
                    </section>
                    </div>

                <Footer />
            </div>
        </div>
    );
};

export default RouterStartMain;