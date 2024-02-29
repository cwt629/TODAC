import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../PageHeader";

const MemberPostDetail = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const boardcode = params.get("boardcode");
    const [member, setMember] = useState([]);
    const [data, setData] = useState([]);
    const [board, setBoard] = useState([]);
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";

    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: `/admin/MemberManage/MemberProfile?usercode=${usercode}` },
        { name: '회원 게시글', url: `/admin/MemberManage/MemberProfile/MemberPost?usercode=${usercode}` },
        { name: '상세', url: `` }
    ];

    const PAGE_TITLE = (
        <div>
            <span className='col_blue2'>{`${member.nickname} `}</span>님의 게시글
        </div>
    )

    const fetchBoardDetail = (usercode, boardcode) => {
        setLoading(true);
        axios
            .post(`/admin/member/post?usercode=${usercode}`)
            .then((res) => {
                const boardList = res.data;

                setBoard(boardList);
                const selectedBoard = boardList.find((item) => item.boardcode == boardcode);
                setData(selectedBoard);
            })
            .catch((error) => {
                console.error("게시글을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {}).then((res) => {
            setMember(res.data);
        });
    };

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchBoardDetail(usercode, boardcode);
        }
    }, [usercode, boardcode]);

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className="text-center mt_25">
                {data.photo && <img alt='' src={imageStorage + data.photo} style={{ width: '65%', borderRadius: '10px' }} className="img-fluid" />}
            </div>
            <div className="mt_10 fw_600">제목</div>
            <div className='fs_20 fw_700 mt_10 post_title'>{data.title}</div>
            <div className="mt_25 fw_600">내용</div>
            <div className='mt_10 bg_blue3  br_5 p-2'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <span className='fw_600'>{data.content}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberPostDetail;
