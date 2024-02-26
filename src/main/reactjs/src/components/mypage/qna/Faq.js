import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
    const [memberinfo, setMemberinfo] = useState([]);

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


    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user" className='col_blue2'>마이 홈 {'>'} </Link>
                <Link to="/user/faq" className='col_blue2'>도움말</Link>
            </div>
            <div className='fs_25 fw_700'>도움말</div>

            <div className='mt_45 fw_500'><span className='fw_900 col_blue3'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>
            <div className='fs_20 fw_700 mt_45'>FAQ</div>

            <div className="faq accordion mt_10 fw_600" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="true" aria-controls="panelsStayOpen-collapseFive">
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                            <span>TODAC은 무슨 뜻인가요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                            <span>답변1</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                            <span>TODAC은 어떤 어플인가요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                            <span>답변1</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                            <span>회원탈퇴 하는 법을 알고싶어요.</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                            <span>답변2</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                            <span>포인트는 어떻게 얻을 수 있나요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                            <span>답변3</span>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                            <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                            <span>후원한 포인트는 어디에 사용되나요?</span>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                        <div className="accordion-body">
                            <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                            <span>답변4</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;