import React, { useEffect } from 'react';
import logo from '../image/todac_logo_temp.png';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
//import background from "../image/bg_startmain.jpg";
import background2 from "../image/bg_startmain2.png";

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

    // useEffect(() => {
    //     if (!sessionStorage.getItem("token")) {
    //         nav("/login");
    //     }
    // }, [])

    return (
        <div>
            <div className='app container-fluid p-0'>
                {/* <div className='appcontent startpage'> */}
                <div className='startpage'>

                    <div className='backgrounds overlay'>
                        <div className='background' data-aos='fade-in' data-aos-duration='1500' data-aos-anchor='.section--hero' style={{ backgroundImage: `url(${background2})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 87%' }}></div>
                    </div>

                    <header className='hero' data-aos='fade-in' data-aos-duration='1500'>
                        <div className='hero-center'>
                            <div className='babytodac_bubble'>
                                <h1 className='hero__logo' data-aos='zoom-in'>TODAC</h1>
                                <div className='hero__text' data-aos='fade-up' data-aos-easing='ease' data-aos-delay='400'>우리가 <span>궁금하신가요?</span></div>
                            </div>
                            <img alt='토닥베이비봇' src={require('../image/ico_babytodac2.png')} className='img-fluid mt_45' style={{width:"45%"}}/>
                        </div>
                        <span className='hero__scroll fw_500' data-aos='fade-up' data-aos-easing='ease' data-aos-delay='800' onClick={handleScroll}>
                            궁금증 해결을 위해 스크롤<br />
                            <i className='chevron bottom'></i>
                        </span>
                    </header>

                    <section className='section section--code' data-aos='fade-up'>
                        <div className='container'>
                            <h2 className='section-title'>요즘 고민 많으셨죠?</h2>
                            <div className='code code--small code--left' data-aos='fade-up'>
                                <div className='fw_700 col_blue2'>취업이 어려우신가요?</div><br />
                                "취업이 어려워서 미래가 불안한 거야.<br />
                                내가 원하는 직장을 찾기가 힘들어서 계속 불안한 기분이 들어."
                            </div>
                            <div className='code code--small code--right' data-aos='fade-down'>
                                <div className='fw_700 col_blue2'>집값도 만만찮죠.</div><br />
                                "집 문제는 정말 날 괴롭히는 거야. <br />집을 마련하기 위해서는 얼마나 돈이 필요하고, 그걸 어떻게 마련해야 할지 감이 안와."
                            </div>
                            <div className='code code--small code--left' data-aos='fade-right'>
                                <div className='fw_700 col_blue2'>저도 평범한 연애를 원해요.</div><br />
                                "남들처럼 연애하고파. <br />소소한 행복이 큰 욕심일까?
                                <br />결혼은 또 언제? 주변에서는 다들 결혼하고 있어서 나만 뒤쳐지는 느낌이 들어."
                            </div>
                            <div className='code code--small code--right' data-aos='fade-left'>
                                <div className='fw_700 col_blue2'>나만 제자리같나요?</div><br />
                                "자기 자신을 찾고 있는데, 뭘 해야 할지 감이 안와. <br />다른 사람들은 자기 취미나 꿈을 찾았는데, 나는 왜 이렇게 막막한 거지?"
                            </div>
                            <div className='code code--small code--left' data-aos='fade-up-right'>
                                <div className='fw_700 col_blue2'>건강은 언제나 걱정되죠!</div><br />
                                "스트레스 때문에 몸 상태도 안 좋아져가고 있어. <br />어떻게 하면 일상에서 스트레스를 덜 받을 수 있을까?"
                            </div>
                            <div className='code code--small code--right' data-aos='fade-up-left'>
                                <div className='fw_700 col_blue2'>왜.. 내 월급만 적지?</div><br />
                                "돈 문제 때문에 정말 스트레스야. <br />적게 번 돈으로 살면서도 여유롭게 살 수 있는 방법이 있을까?"
                            </div>
                            <div className='code code--small code--left' data-aos='fade-down-right'>
                                <div className='fw_700 col_blue2'>내 길, 성공할 수 있을까?</div><br />
                                "주변에는 다들 성공한 것 같아. <br />내가 하는 일이 맞는 건지, 제대로 하고 있는 건지 자꾸 의문이 들어. 어떻게 하면 자신감을 갖고 나아갈 수 있을까?"
                            </div>
                            <div className='code code--small code--right' data-aos='fade-down-left'>
                                <div className='fw_700 col_blue2'>친구 사이가 문제군요?</div><br />
                                "정말 친한 친구가 있었는데 최근에 소원해졌어요. <br />별일이 있었던 것도 아닌데.. 어떡하죠?"
                            </div>
                            <div className='code code--small code--left mb_300i' data-aos='fade-up'>
                                "당신도 고민이 있나요?<br/>
                                &nbsp;뭐든 좋아요!<br />
                                &nbsp;지금 물어볼까요?"<br /><br />
                                <div className='text-center'>
                                     {/* <Link to="/user/chat"><button className='text-center start_btn bg_blue2 br_5 text-white fs_14'>토닥봇 만나러가기</button></Link> */}
                                     <Link to="/user/chat" className='col_blue2 fw_700 fs_14'>
                                        토닥봇 만나려면
                                        <br/><span className='fw_900 fs_18'>"Click"</span>
                                     </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RouterStartMain;