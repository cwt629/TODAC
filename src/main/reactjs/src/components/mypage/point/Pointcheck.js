import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PointLogo from "./PointLogo";

const Pointcheck = () => {
    const storedId = sessionStorage.getItem("id");
    const usercode = sessionStorage.getItem("usercode");
    const [member, setmember] = useState([]);
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);
    const ReactSwal = withReactContent(Swal);
    const [price,setPrice] = useState(0);


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
            })
            .catch(error => {
                console.error("포인트 사용내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const pay5000= () =>{
        setPrice(5000);
    }

    const pay10000= () =>{
        setPrice(10000);
    }


    const selectpayment =() =>{
        ReactSwal.fire({
            icon: 'question',
            html: `
                    충전할 금액을 선택해 주세요!<br/>
                    <button onclick=${pay5000()}>5000</button>
                    <button onclick=${pay10000()}>10000</button><br/>
                    충전금액 : ${price}
                  `,
            showCancelButton:true,
            confirmButtonText: '충전',
            confirmButtonColor:'skyblue',
            cancelButtonText: '취소',
        }).then(res=>{
            if(res.isConfirmed){
                nav("/user/point/checkout?price="+{price});
            }
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
                                onClick={() => nav("charge")}>충전
                        </button>
                    </div>
                </div>
                    <PointLogo/>
                <div className="point" style={{textAlign:"center"}}>
                    {/*<img alt="" src={require("../../../image/pointIcon/point.png")}*/}
                    {/*     style={{margin:"40px 0px"}}/>*/}
                    <h4 className="mt_25">보유 포인트 : <span style={{color:"#FF7170"}}>{member.point?.toLocaleString()}</span></h4>
                </div>

                <div className="fs_17 fw_800 mt_45">{member.nickname} 님의 포인트 사용내역</div>
                <table className="table-light table-bordered mt_10">
                    <tr className="bg_red fw_600">
                        <td>내용</td>
                        <td>포인트</td>
                        <td>날짜</td>
                    </tr>
                    {point.map((item, index) => (

                        <tr>
                            <td>{item.type}</td>
                            <td style={{ color: (item.type === '충전' || item.type === '오늘의미소') ? 'blue' : 'red' }}>
                                {(item.type === '충전' || item.type === '오늘의미소') ? `+${item.amount?.toLocaleString()}` : `-${item.amount?.toLocaleString()}`}
                            </td>
                            <td>{item.applieddate}</td>
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