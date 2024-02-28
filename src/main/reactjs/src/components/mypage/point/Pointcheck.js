import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PointLogo from "./PointLogo";
import PageHeader from "../../PageHeader";
import "../../chat/chattinglog/ChattingLogStyle.css";
import PointCheckButtons from "./PointCheckButtons";

const Pointcheck = () => {
    const storedId = sessionStorage.getItem("id");
    const usercode = sessionStorage.getItem("usercode");
    const [member, setmember] = useState([]);
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);
    const ReactSwal = withReactContent(Swal);
    const [price, setPrice] = useState(0);
    const DISPLAY_PER_UNIT = 3;
    const [showLength, setShowLength] = useState(DISPLAY_PER_UNIT); // 화면에 보여줄 요소의 개수
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열
    const CURRENT_ROUTES = [
        {name: '내 정보', url: '/user'},
        {name: '포인트', url: ''}
    ];

    const PAGE_TITLE = '내 포인트';

    const handleExpandDisplay = () => {
        setShowLength(showLength + DISPLAY_PER_UNIT);
    };

    const handleShrinkDisplay = () => {
        setShowLength(DISPLAY_PER_UNIT);
    }

    useEffect(() => {
        getmember();
        fetchPoint();
    }, []);

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);

            })
    }

    const fetchPoint = () => {
        setLoading(true);
        axios.post(`/admin/point?usercode=${usercode}`)
            .then(res => {
                setPoint(res.data);
                setListDisplay(res.data);
            })
            .catch(error => {
                console.error("포인트 사용내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const pay5000 = () => {
        setPrice(5000);
    }

    const pay10000 = () => {
        setPrice(10000);
    }


    const selectpayment = () => {
        ReactSwal.fire({
            icon: 'question',
            html: `
                    충전할 금액을 선택해 주세요!<br/>
                    <button onclick=${pay5000()}>5000</button>
                    <button onclick=${pay10000()}>10000</button><br/>
                    충전금액 : ${price}
                  `,
            showCancelButton: true,
            confirmButtonText: '충전',
            confirmButtonColor: 'skyblue',
            cancelButtonText: '취소',
        }).then(res => {
            if (res.isConfirmed) {
                nav("/user/point/checkout?price=" + {price});
            }
        });
    }

    return (
        <div>
            <br></br>
            <div className="myupdatemain">
                <div className="d-flex justify-content-between align-items-center">
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE}/>
                    <button className="deepblue"
                            onClick={() => nav("charge")}>충전하기
                    </button>
                </div>
                <PointLogo/>
                <div className="point" style={{textAlign: "center"}}>
                    {/*<img alt="" src={require("../../../image/pointIcon/point.png")}*/}
                    {/*     style={{margin:"40px 0px"}}/>*/}
                    <h4 className="mt_45">보유 포인트 : <span
                        style={{color: "#FF7170"}}>{member.point?.toLocaleString()}</span></h4>
                </div>

                <div className="fs_17 fw_800 mt_25">{member.nickname} 님의 포인트 사용내역</div>
                {/*원태형 코드*/}
                <table className='chatlog-table mt_25'>
                    <thead>
                    <tr>
                        <th width='50' style={{backgroundColor: '#F9EAEB'}}>타입</th>
                        <th width='130' style={{backgroundColor: '#F9EAEB'}}>포인트</th>
                        <th width='200' style={{backgroundColor: '#F9EAEB'}}>날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* 테이블 내용 */}
                    {
                        point.slice(0, showLength).map((data, index) => (
                            <tr key={index}>
                                <td>{data.type}</td>
                                <td style={{color: (data.type === '충전' || data.type === '오늘의미소') ? 'blue' : 'red'}}>
                                    {(data.type === '충전' || data.type === '오늘의미소') ? `+${data.amount?.toLocaleString()}` : `-${data.amount?.toLocaleString()}`}
                                </td>
                                <td>
                                    {/* <img alt={data.counselorname} src={data.counselorphoto}
                                        width={20} height={20} /> */}
                                    {data.applieddate}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {/*원태형 코드*/}
                <PointCheckButtons needToShow={listDisplay.length > DISPLAY_PER_UNIT}
                                 displayedAll={listDisplay.length <= showLength}
                                 handleExpandDisplay={handleExpandDisplay}
                                 handleShrinkDisplay={handleShrinkDisplay} />
            </div>
        </div>
    );
};

export default Pointcheck;