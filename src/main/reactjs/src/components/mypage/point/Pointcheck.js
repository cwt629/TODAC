import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const DISPLAY_PER_UNIT = 5;
    const [showLength, setShowLength] = useState(DISPLAY_PER_UNIT); // 화면에 보여줄 요소의 개수
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열
    const CURRENT_ROUTES = [
        { name: '내 정보', url: '/user' },
        { name: '내 TP', url: '' }
    ];

    const PAGE_TITLE = 'Todac Point';

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
                const sortedPoint = res.data.sort((a, b) => {
                    // 날짜를 내림차순으로 정렬 (가정)
                    return new Date(b.applieddate) - new Date(a.applieddate);
                });
                setPoint(sortedPoint);
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
            confirmButtonColor: '#5279FD',
            cancelButtonText: '취소',
        }).then(res => {
            if (res.isConfirmed) {
                nav("/user/point/checkout?price=" + { price });
            }
        });
    }

    return (
        <div>
            <br></br>
            <div className="myupdatemain">
                <div className="d-flex justify-content-between align-items-center">
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                    <button className="deepblue"
                        onClick={() => nav("charge")}>충전하기
                    </button>
                </div>
                <PointLogo />
                <div className="point" style={{ textAlign: "center" }}>
                    {/*<img alt="" src={require("../../../image/pointIcon/point.png")}*/}
                    {/*     style={{margin:"40px 0px"}}/>*/}
                    <h4 className="mt_45"><span
                        style={{ color: "#FF7170" }}>{member.point?.toLocaleString()}</span> TP</h4>
                </div>

                <div className="fs_17 fw_800 mt_25"><span style={{ color: "#5279FD" }}>{member.nickname}</span> 님의 TP 사용내역</div>
                <table className='chatlog-table mt_25'>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: 'var(--cobaltblue)', width: '10%' }}>번호</th>
                            <th style={{ backgroundColor: 'var(--cobaltblue)', width: '10%' }}>타입</th>
                            <th style={{ backgroundColor: 'var(--cobaltblue)', width: '40%' }}>Todac Point</th>
                            <th style={{ backgroundColor: 'var(--cobaltblue)', width: '40%' }}>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 테이블 내용 */}
                        {
                            point.slice(0, showLength).map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.type}</td>
                                    <td style={{ color: (data.type === '충전' || data.type === '미소팡팡') ? '#5279FD' : 'red' }}>
                                        {(data.type === '충전' || data.type === '미소팡팡') ? `+${data.amount?.toLocaleString()}` : `-${data.amount?.toLocaleString()}`}
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
                <PointCheckButtons needToShow={listDisplay.length > DISPLAY_PER_UNIT}
                    displayedAll={listDisplay.length <= showLength}
                    handleExpandDisplay={handleExpandDisplay}
                    handleShrinkDisplay={handleShrinkDisplay} />
            </div>
        </div>
    );
};

export default Pointcheck;