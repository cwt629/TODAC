import React, { useState } from 'react';
import PageHeader from "../../PageHeader";
import { useNavigate } from "react-router-dom";
import "./Point.css";
import PointChargeContent from "./PointChargeContent";

const Pointcharge = () => {
    const PAGE_TITLE = '충전하기';
    const [point, setPoint] = useState();
    const nav = useNavigate();
    const CURRENT_ROUTES = [
        { name: '내 정보', url: '/user' },
        { name: '포인트', url: '/user/point' },
        { name: '충전하기', url: '/user/point/charge' }
    ];
    return (
        <div className="mx_30">
            <div className="d-flex justify-content-between align-items-center">
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                <button className="deepblue mt_25"
                    onClick={() => nav("/user/point/checkout?price=" + point)}>충전하기
                </button>
            </div>
            <br />
            <PointChargeContent setPoint5000={() => setPoint(5000)}
                setPoint10000={() => setPoint(10000)}
                setPoint50000={() => setPoint(50000)}
                setPointAmount={(amount) => setPoint(amount)}
                point={point} />
            <div className="mt_25" style={{ textAlign: "center" }}>
                <input type={"text"} value={point}
                    onChange={(e) => {
                        setPoint(e.target.value);
                    }} />
                <br />
                <button onClick={() => nav("/user/point/checkout?price=" + point)}
                >충전하기
                </button>
            </div>
        </div>
    );
};

export default Pointcharge;