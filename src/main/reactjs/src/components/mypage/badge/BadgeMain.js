import React, {useEffect, useState} from 'react';
import "./BadgeStyle.css"
const BadgeMain = () => {
    const [board5, setBoard5] = useState(false);
    return (
        <div>
            여기는 뱃지 저장소
            {
                board5 === true
                    ? (<img alt='' src={require("../../../image/badge.png")}/>)
                    : (<img alt='' src={require("../../../image/badge.png")} className="gray"/>)
            }
            이건 글 5개이상일때 획득 가능이욤
            <button onClick={() => setBoard5(true)}>획득!</button>
            <button onClick={() => setBoard5(false)}>강탈!</button>

        </div>
    );
};

export default BadgeMain;