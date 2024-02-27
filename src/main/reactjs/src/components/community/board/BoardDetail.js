import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import BoardComment from "./BoardComment";
import heart from "../../../image/heart.svg";
import heartFull from "../../../image/heart_full.svg";
import "./Share.css";

const BoardDetail = () => {
    const [data, setData] = useState(null);
    const { boardcode } = useParams();
    const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 추가
    const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태 추가
    const userRole = sessionStorage.getItem("id");
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const navi = useNavigate();

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    useEffect(() => {
        console.log("조회수 렌더링");
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            setData(res.data);
            setIsLiked(res.data.liked); // 서버에서 받아온 데이터에서 좋아요 여부를 설정
            console.log(res.data);
        });
        // 좋아요 수 가져오기
        axios.get(`/post/like/count?boardcode=${boardcode}`).then((res) => {
            setLikeCount(res.data);
        });
        // 좋아요 상태 확인
        axios
            .get(`/post/checkLikeStatus?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`)
            .then((res) => {
                setIsLiked(res.data);
            });
    }, [boardcode]);

    //Like
    const handleLike = async () => {
        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(true);
            setLikeCount((prev) => prev + 1); // 좋아요 수 증가
        } catch (error) {
            console.error("Error liking board:", error);
        }
    };
    //unLike
    const handleUnlike = async () => {
        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(false);
            setLikeCount((prev) => prev - 1); // 좋아요 수 감소
        } catch (error) {
            console.error("Error unliking board:", error);
        }
    };

    // 게시글 삭제
    const deletePost = (boardcode) => {
        Swal.fire({
            title: "게시글 삭제",
            text: "해당 게시글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF7170",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/post/delete?boardcode=${boardcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 추가 성공 후 목록으로 이동
                        navi("/user/community/board");
                        Swal.fire({
                            title: "삭제 완료",
                            text: "게시글이 성공적으로 삭제되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#FF7170",
                        });
                    })
                    .catch((error) => {
                        console.error("삭제 중 오류 발생:", error);
                    });
            }
        });
    };

    const update = () => {
        Swal.fire({
            title: "게시글 수정",
            text: "해당 게시글을 수정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#FF7170",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        }).then((result) => {
            if (result.isConfirmed) {
                navi(`/user/community/board/updateform/${boardcode}`);
            }
        });
    };

    const shareTwitter = () => {
        // 트위터 공유 로직
        let sendText = "하이염";
        let sendUrl = "175.45.192.182/";
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url" + sendUrl);
    };

    const shareFacebook = () => {
        // 페이스북 공유 로직
        let sendUrl = "175.45.192.182/";
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    };

    const shareKakao = () => {
        const { Kakao } = window;
        // 카카오톡 공유 로직
        //초기화
        if (!window.Kakao.isInitialized()) {
        // 호출되지 않았다면 초기화
        window.Kakao.init('511507540b3ec16972ac8cc8290b6e7f');
    }
        
        //카카오링크 버튼 생성
        Kakao.Link.createDefaultButton({
            container: '#btnKakao',
            objectType: 'feed',
            content: {
                title: data.title,
                description: data.content,
                imageUrl: data.photo ? imageStorage + data.photo : undefined,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl:window.location.href,
                }
            }
        })
    };

    return (
        <div>
            {data && (
                <div className='form-group mx_30'>
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />

                    <div
                        className='col-4'
                        style={{
                            marginTop: "15px",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {data.photo && (
                            <img
                                className='img-fluid'
                                alt=''
                                src={imageStorage + data.photo}
                                style={{
                                    width: "100%",
                                    // height: "100%",
                                    // maxHeight: "600px", 제한을 줄지는 아직 미지수 !
                                    borderRadius: "0.8rem",
                                    // objectFit: "cover", // object-fit: cover 추가
                                }}
                            />
                        )}
                    </div>

                    <div className='mt_10'>
                        <h2>{data.title}</h2>
                        <span>
                            <img
                                alt=''
                                src={data.memberPhoto}
                                style={{ width: "30px", height: "30px", borderRadius: "75px" }}
                            />{" "}
                            {data.memberNickname}
                        </span>
                        <div>
                            <span>
                                {data.registerDate} • 좋아요 {likeCount} • 조회 {data.visitCount}
                            </span>
                        </div>
                    </div>
                    <div className='mt-3'>{data.content}</div>
                    <hr />
                    <div className='mt-4' style={{ textAlign: "center" }}>
                        <h2>상담사 정보</h2>
                        <div className='bg_blue rounded-circle'>{`${data.counselorCode}번 상담사`}</div>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <div id='btnTwitter' className='linkIcon twitter' href='#' onClick={shareTwitter}>
                                트위터
                            </div>
                            <div id='btnFacebook' className='linkIcon facebook' href='#' onClick={shareFacebook}>
                                페이스북
                            </div>
                            <div id='btnKakao' className='linkIcon kakao' href='#' onClick={shareKakao}>
                                카카오톡
                            </div>
                            <button onclick="sharePage()">현재 페이지 공유하기</button>
                        </div>
                    </div>
                    <div className='mt-5' style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type='button'
                            style={{
                                alignItems: "center",
                                borderRadius: "1.5rem",
                                backgroundColor: "rgb(255,255,255)",
                                color: "gray",
                                justifyContent: "center",
                                boxShadow: "rgba(0,0,0,0.3) 0px 0px 6px",
                            }}
                        >
                            <span
                                style={{ marginRight: "16px", cursor: "pointer" }}
                                onClick={isLiked ? handleUnlike : handleLike}
                            >
                                {isLiked ? <img alt='' src={heartFull} /> : <img alt='' src={heart} />}
                                <span className='comment-action' style={{ marginLeft: "4px" }}>
                                    {likeCount}
                                </span>
                            </span>
                        </Button>
                    </div>
                    {userRole === "todac" ? (
                        // 관리자인 경우에는 삭제 기능만 표시
                        <div>
                            <button onClick={() => deletePost(boardcode)} style={{ cursor: "pointer" }}>
                                삭제
                            </button>
                        </div>
                    ) : // 일반 사용자인 경우 글 작성자인지 확인 후 삭제 및 수정 버튼 표시
                    data.userCode == sessionStorage.getItem("usercode") ? (
                        <div>
                            <button onClick={() => deletePost(boardcode)} style={{ cursor: "pointer" }}>
                                삭제
                            </button>
                            <button onClick={update}>수정</button>
                        </div>
                    ) : null}
                    <BoardComment />
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
