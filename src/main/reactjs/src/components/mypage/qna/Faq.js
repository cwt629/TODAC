import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import background from "../../../image/bg_startmain2.png";

const Faq = () => {
    const [memberinfo, setMemberinfo] = useState([]);
    const [activeItem, setActiveItem] = useState(null); // 현재 활성화된 아이템의 ID를 저장할 state 추가

    const id = sessionStorage.getItem("id");

    const getmemberinfo = () => {
        axios.post("/member/info?userid="+id).then((res)=>{
            console.log(res.data);
            setMemberinfo(res.data);
        })
    }

    useEffect(()=>{
        getmemberinfo();
    }, []);

    // 클릭 이벤트 핸들러를 통해 현재 활성화된 아이템 업데이트
    const handleItemClick = (itemId) => {
        if (itemId === activeItem) {
            setActiveItem(null); // 현재 클릭된 아이템이 이미 열려있으면 닫음
        } else {
            setActiveItem(itemId); // 현재 클릭된 아이템을 열도록 설정
        }
    }

    const CURRENT_ROUTES = [
        { name: "마이 홈", url: "/user" },
        { name: "도움말", url: "/user/faq" },
    ];
    
    const PAGE_TITLE = "도움말";

    return (
        <div className='mx_30'
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "auto 160px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: 'right top 10px'
        }}>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>

            {/* <div className='mt_25 fw_500'><div><span className='fw_900 col_blue2'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>
            <div><img alt='' src={require('../../../image/bg_startmain2.png')} style={{width:'150px'}} className='img-fluid'/></div>
            </div> */}
            <div className='mt_25 fw_500'><div><span className='fw_900 col_blue2'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>
            </div>
            <div className='fs_20 fw_700 mt_25'>FAQ</div>

            <div className="faq accordion mt_10 fw_600" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className={`accordion-button ${activeItem === 'item1' ? '' : 'collapsed'}`} type="button" onClick={() => handleItemClick('item1')} aria-expanded={activeItem === 'item1'} aria-controls="panelsStayOpen-collapseOne">
                            {/* 아이템 1에 대한 아이디를 부여하고, 클릭 시 해당 아이디로 업데이트 */}
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mr_10'/>
                            <span>TODAC은 무슨 뜻인가요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className={`accordion-collapse collapse ${activeItem === 'item1' ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mr_10'/>
                            <span>토닥(TODAC)은<br/>
                            <span className='col_blue2'>'T'his app may 'O'ffer you 'D'ream 'A'nd 'C'omfort</span>
                            의 약자로 '이 앱은 당신에게 꿈과 편안을 제공합니다' 라는 의미를 담고 있습니다.</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className={`accordion-button ${activeItem === 'item2' ? '' : 'collapsed'}`} type="button" onClick={() => handleItemClick('item2')} aria-expanded={activeItem === 'item2'} aria-controls="panelsStayOpen-collapseTwo">
                            {/* 아이템 1에 대한 아이디를 부여하고, 클릭 시 해당 아이디로 업데이트 */}
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mr_10'/>
                            <span>TODAC은 어떤 어플인가요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className={`accordion-collapse collapse ${activeItem === 'item2' ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mr_10'/>
                            <span>간직해왔던 마음 속 깊은 고민들을 누군가에게 쉽게 털어 놓기란 쉽지않죠.<br/>토닥은 지쳐있는 여러분의 마음을 다독여 주기위해 탄생했습니다.<br/>
                            남들에게 꺼내기 힘들었던 고민들을 AI상담사와 상담해보세요.<br/>
                            차가운 기계언어처럼 보여도, 도움이 필요한 누군가에겐 한줄기 따듯한 빛이 되고 싶습니다. 토닥을 통해 편안한 하루를 받아가세요.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className={`accordion-button ${activeItem === 'item3' ? '' : 'collapsed'}`} type="button" onClick={() => handleItemClick('item3')} aria-expanded={activeItem === 'item3'} aria-controls="panelsStayOpen-collapseThree">
                            {/* 아이템 1에 대한 아이디를 부여하고, 클릭 시 해당 아이디로 업데이트 */}
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mr_10'/>
                            <span>회원탈퇴를 하고싶어요.</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className={`accordion-collapse collapse ${activeItem === 'item3' ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mr_10'/>
                            <span>고민을 다 털어놓으셨다면, 토닥을 언제든 떠나셔도 좋습니다.<br/>
                            페이지 우측 하단에 보이시는 '마이페이지' 아이콘을 클릭하신 후,
                            마이페이지 하단에 보이시는 '회원탈퇴' 항목을 통해 언제든 자유롭게 탈퇴하실 수 있습니다.</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button className={`accordion-button ${activeItem === 'item4' ? '' : 'collapsed'}`} type="button" onClick={() => handleItemClick('item4')} aria-expanded={activeItem === 'item4'} aria-controls="panelsStayOpen-collapseFour">
                            {/* 아이템 1에 대한 아이디를 부여하고, 클릭 시 해당 아이디로 업데이트 */}
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mr_10'/>
                            <span>포인트는 어떻게 얻을 수 있나요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className={`accordion-collapse collapse ${activeItem === 'item4' ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingFour">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mr_10'/>
                            <span>토닥의 포인트를 얻는 방식은 여러가지가 있습니다.
                            <br/>결제를 통해 직접 충전하실 수도 있고,<br/>
                            이 외에도 업적쌓기나 미니 게임을 통해서 무료로 손쉽게 포인트를 얻으실 수 있습니다.</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button className={`accordion-button ${activeItem === 'item5' ? '' : 'collapsed'}`} type="button" onClick={() => handleItemClick('item5')} aria-expanded={activeItem === 'item5'} aria-controls="panelsStayOpen-collapseFive">
                            {/* 아이템 1에 대한 아이디를 부여하고, 클릭 시 해당 아이디로 업데이트 */}
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mr_10'/>
                            <span>후원한 포인트는 어디에 사용되나요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className={`accordion-collapse collapse ${activeItem === 'item5' ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingFive">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mr_10'/>
                            <span>토닥은 여러분의 마음을 따듯하게 하기 위해 탄생한 어플인만큼<br/>
                            토닥으로 후원주신 포인트는 심리상담이 필요한 여러 이웃분들께 전달됩니다.<br/>또한 뜻을 같이하는 여러 자선단체에 토닥의 이름으로 전달됩니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;