import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CommunityStyle.css";

const CommunityMain = () => {
    const nav = useNavigate();

    return (
        <div className='mx_30 com_btn'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티</Link>
            </div>
            <div className='fs_25 fw_700'>소통할까요?</div>

            <button className='bor_blue2 mt_45 w_100p br_5 p_15' onClick={() => nav("/board")}>
                <div className='d-flex'>
                    <div className=''>
                        <span className='col_blue2 fw_700 fs_20'>커뮤니티</span>
                        <div className='mt_10'>
                            다양한 정보를 쉽고 빠르게
                            <br />
                            공유하고 받을 수 있도록
                            <br />
                            게시판을 이용해 보세요.
                        </div>
                    </div>
                    <div className='col text-end align-self-end'>
                        <img alt='게시판' src={require("../../image/ico_comboard.png")} />
                    </div>
                </div>
            </button>

            <button className='bor_blue2 mt_45 w_100p br_5 p_15' onClick={() => nav("donation")}>
                <div className='d-flex'>
                    <div className=''>
                        <span className='col_blue2 fw_700 fs_20'>후원의 전당</span>
                        <div className='mt_10'>
                            작은 마음 여럿이 모여,
                            <br />
                            누군가에게 커다란 기쁨을
                            <br />줄 수 있다는 사실을 아시나요?
                        </div>
                    </div>
                    <div className='col text-end align-self-end'>
                        <img alt='후원 게시판' src={require("../../image/ico_comdona.png")} />
                    </div>
                </div>
            </button>

            <button className='bor_blue2 mt_45 w_100p br_5 p_15' onClick={() => nav("game")}>
                <div className='d-flex'>
                    <div className=''>
                        <span className='col_blue2 fw_700 fs_20'>오늘의 미소</span>
                        <div className='mt_10'>
                            당신도 스마일처럼 웃어보세요.
                            <br />
                            미니게임을 통해 포인트도 얻고,
                            <br />
                            후원도 하고 일석이조!
                        </div>
                    </div>
                    <div className='col text-end align-self-end'>
                        <img alt='오늘의 미소' src={require("../../image/ico_comsmile.png")} />
                    </div>
                </div>
            </button>
        </div>
    );
};

export default CommunityMain;
