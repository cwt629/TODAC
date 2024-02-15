import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
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
                <div className="point" style={{textAlign:"center"}}>
                    <img alt="" src={require("../../../image/pointIcon/point.png")}
                    style={{margin:"40px 0px"}}/>
                    <h4>보유 포인트 : <span style={{color:"#FF7170"}}>{member.point}</span></h4>
                </div>

                <div className="fs_17 fw_800">{member.nickname} 님의 포인트 사용내역</div>
                    <table className="table table-bordered">
                        <tr>
                            <td>내용</td>
                            <td>포인트</td>
                            <td>날짜</td>
                        </tr>
                        {point.map((item, index) => (

                                    <tr className="bg_red">
                                        <td className="fw_600">{item.type}</td>
                                        <td className="fw_600">{item.amount}</td>
                                        <td className="fw_600">{item.applieddate}</td>
                                    </tr>
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