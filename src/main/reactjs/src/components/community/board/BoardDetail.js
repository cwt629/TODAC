import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader";

const BoardDetail = () => {
    const [data, setData] = useState("");
    const { boardcode } = useParams();
    const navi = useNavigate();
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    }, [boardcode]);

    return (
        <div>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            {data && (
                <div style={{ margin: "50px", width: "700px" }}>
                    <div className='input-group' style={{ marginTop: "20px" }}>
                        {data.photo == "" ? (
                            ""
                        ) : (
                            <img alt='' src={imageStorage + data.photo} style={{ maxWidth: "100px" }} />
                        )}
                    </div>
                    <h2>
                        <b>{data.title}</b>
                    </h2>
                    <div className='input-group'>
                        <span style={{ marginLeft: "100px", color: "gray" }}>조회임 {data.memberNickname}</span>
                        <span style={{ marginLeft: "100px", color: "gray" }}>{data.writeday}</span>
                    </div>
                    <pre style={{ fontWeight: "bold", marginTop: "20px" }}>{data.content}</pre>
                    <br />
                    <br />
                    <button
                        type='button'
                        className='btn btn-outline-secondary btn-sm'
                        style={{ width: "80px" }}
                        onClick={() => navi("")}
                    >
                        수정
                    </button>
                    <button
                        type='button'
                        className='btn btn-outline-secondary btn-sm'
                        style={{ width: "80px", marginLeft: "5px" }}
                        onClick={() => navi("")}
                    >
                        삭제
                    </button>{" "}
                    <button
                        type='button'
                        className='btn btn-outline-secondary btn-sm'
                        style={{ width: "80px" }}
                        onClick={() => navi("")}
                    >
                        작성완료
                    </button>
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
