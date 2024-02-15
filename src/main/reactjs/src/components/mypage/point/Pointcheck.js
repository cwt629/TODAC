import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {CameraAltOutlined} from "@mui/icons-material";
import axios from "axios";

const Pointcheck = () => {
    const storedId = sessionStorage.getItem("id");
    const usercode = sessionStorage.getItem("usercode");
    const [member, setmember] = useState([]);
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);

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
        axios.post(`/admin/payment?usercode=${usercode}`)
            .then(res => {
                setPoint(res.data);
            })
            .catch(error => {
                console.error("포인트 사용내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            <br></br>
            <div className="myupdatemain">
                <div className='myupdateheader'>
                    <div className='fs_14 fw_500 col_blue2'>
                        <span>마이 홈</span> > <span>포인트</span>
                    </div>
                    <div className='fs_24 fw_700'>
                        나의 포인트
                        <button className="bg_blue bor_blue1"
                                onClick={() => nav('Checkout')}>충전
                        </button>
                    </div>
                </div>
                <div className="point">
                    <img alt="" src={require("../../../image/pointIcon/point.png")}/>
                    <h4>보유 포인트 : {member.point}</h4>
                </div>

                <div className="fs_17 fw_800">{member.nickname} 님의 포인트 사용내역</div>
                    <table className="table table bordered">
                        <th>
                            <td>내용</td>
                            <td>포인트</td>
                            <td>날짜</td>
                        </th>
                        <tr>
                            <td>zz</td>
                            <td>dd</td>
                            <td>qq</td>
                        </tr>
                        {point.map((item, index) => (
                            <div key={index} className="bg_gray bor_gray1 px-3 py-2">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span className="fw_600">{item.applieddate}</span> &ensp;
                                        <span className="fw_600">{item.type}</span>
                                    </div>
                                </div>
                                <div className="fs_14">{item.recordcode}</div>
                            </div>
                        ))}
                    </table>
                <button className="bg_blue bor_blue1"
                        >더보기
                </button>
            </div>
        </div>
    );
};

export default Pointcheck;