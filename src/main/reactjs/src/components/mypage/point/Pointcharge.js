import React, {useState} from 'react';
import PageHeader from "../../PageHeader";
import {useNavigate} from "react-router-dom";

const Pointcharge = () => {
    const PAGE_TITLE = '충전하기';
    const [point,setPoint] = useState();
    const nav = useNavigate();
    const CURRENT_ROUTES = [
        { name: '내 정보', url: '/user' },
        { name: '포인트', url: '/user/point' },
        { name: '충전하기', url: '/user/point/charge' }
    ];
    return (
        <div className="mx_30">
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE}/>
            <button onClick={() => setPoint(5000)}>5000원</button>
            <button onClick={() => setPoint(10000)}>10000원</button>
            <br/>
            <input type={"text"} value={point}
                   onChange={(e) => {
                       setPoint(e.target.value);
                   }}/>
            <button onClick={()=> nav("/user/point/checkout?price="+point)}
            >충전하기</button>
        </div>
    );
};

export default Pointcharge;