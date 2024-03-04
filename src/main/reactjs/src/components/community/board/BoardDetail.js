import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import BoardComment from "./BoardComment";
import heart from "../../../image/heart.svg";
import heartFull from "../../../image/heart_full.svg";
import "./BoardStyle.css";
import ClipboardJS from "clipboard";
import xIcon from "../../../image/icon-twitter.png";
import facebookIcon from "../../../image/icon-facebook.svg";
import kakaoIcon from "../../../image/icon-kakao.svg";
import shareIcon from "../../../image/share.png";
import linkIcon from "../../../image/icon-link.png";
import MoreIcon from "../../../image/icon-more.png";
import "./Share.css";

const BoardDetail = () => {
    const [data, setData] = useState(null);
    const { boardcode } = useParams();
    const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 추가
    const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태 추가
    const userRole = sessionStorage.getItem("id");
    const id = sessionStorage.getItem("id");
    const location = useLocation();
    const [shareVisible, setShareVisible] = useState(false);
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const navi = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/board/detail?boardcode=${boardcode}`);
                setData(response.data);
                setIsLiked(response.data.liked);

                // 좋아요 수 가져오기
                const likeCountResponse = await axios.get(`/post/like/count?boardcode=${boardcode}`);
                setLikeCount(likeCountResponse.data);

                // 좋아요 상태 확인
                const likeStatusResponse = await axios.get(
                    `/post/checkLikeStatus?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`
                );
                setIsLiked(likeStatusResponse.data);
            } catch (error) {
                console.error("Error fetching board details:", error);
            }
        };

        fetchData();
    }, [boardcode]);
    axios.get(`/post/like/count?boardcode=${boardcode}`).then((res) => {
        setLikeCount(res.data);
    });

    const handleLike = async () => {
        if (!id) {
            showLoginPrompt("로그인 하시겠습니까?");
            return;
        }

        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(true);
            setLikeCount((prev) => prev + 1); // 좋아요 수 증가
        } catch (error) {
            console.error("Error liking board:", error);
        }
    };

    const handleUnlike = async () => {
        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(false);
            setLikeCount((prev) => prev - 1); // 좋아요 수 감소
        } catch (error) {
            console.error("Error unliking board:", error);
        }
    };

    const showLoginPrompt = (message) => {
        Swal.fire({
            title: "로그인이 필요합니다",
            text: message,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#5279FD",
            confirmButtonText: "로그인",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                // 로그인 페이지로 이동
                navi("/login");
            }
        });
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
                        navi("/board");
                        Swal.fire({
                            title: "삭제 완료!",
                            text: "게시글이 성공적으로 삭제되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#5279FD",
                            confirmButtonText: "확인",
                        });
                    })
                    .catch((error) => {
                        console.error("삭제 중 오류 발생:", error);
                    });
            }
        });
    };

    const update = () => {
        navi(`/board/updateform/${boardcode}`);
    };

    //관리자 및 사용자 삭제 수정 로직
    const handleMoreView = () => {
        if (userRole === "todac") {
            // 관리자인 경우

            // 삭제 로직 수행
            deletePost(boardcode);
        } else if (data.userCode == sessionStorage.getItem("usercode")) {
            // 글 작성자인 경우
            Swal.fire({
                title: "게시글 관리",
                icon: "question",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "수정",
                confirmButtonColor: "#5279FD",
                denyButtonText: "삭제",
                denyButtonColor: "#ff7170",
                cancelButtonText: "취소",
            }).then((result) => {
                if (result.isConfirmed) {
                    // 수정 로직 수행
                    update();
                } else if (result.isDenied) {
                    // 삭제 로직 수행
                    deletePost(boardcode);
                }
            });
        }
    };

    const shareTwitter = () => {
        // 트위터 공유 로직
        let sendText = "TODAC";
        let sendUrl = window.location.href;
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url" + sendUrl);
    };

    const shareFacebook = () => {
        // 페이스북 공유 로직
        let sendUrl = window.location.href;
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    };

    const shareKakao = () => {
        const { Kakao } = window;
        // 카카오톡 공유 로직
        //초기화
        if (!window.Kakao.isInitialized()) {
            // 호출되지 않았다면 초기화
            window.Kakao.init("511507540b3ec16972ac8cc8290b6e7f");
        }

        //카카오링크 버튼 생성
        Kakao.Link.createDefaultButton({
            container: "#btnKakao",
            objectType: "feed",
            content: {
                title: `${data.memberNickname}님의 게시글로 당신을 초대합니다`,
                description: `"TODAC"에 오신것을 환영합니다.`,
                imageUrl: "https://kr.object.ncloudstorage.com/guest-hch/TODAC/share/TODACbot.png",
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        });
    };

    const handleCopyClipBoard = () => {
        const clipboard = new ClipboardJS(".copy-button", {
            text: function () {
                return `http://175.45.192.182${location.pathname}`;
            },
        });

        clipboard.on("success", function (e) {
            Swal.fire({
                title: "URL이 복사 되었습니다!",
                // text: e.text,
                icon: "success",
                confirmButtonColor: "#5279FD",
                confirmButtonText: "확인",
            });
        });

        clipboard.on("error", function (e) {
            console.error("클립보드 복사 실패", e);
        });

        // 클립보드에 복사를 시도
        clipboard.onClick({ delegateTarget: document.querySelector(".copy-button") });
    };

    //toggle 로직
    const toggleShareVisibility = () => {
        setShareVisible((prev) => !prev);
    };

    return (
        <div>
            {data && (
                <div className='form-group mx_30'>
                    {/* <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} /> */}

                    <div className='mt_10' style={{ fontSize: "30px" }}>
                        {data.title}
                    </div>
                    <div className='mt-1 d-flex'>
                        <div>
                            <img
                                alt=''
                                src={data.memberPhoto}
                                style={{ width: "30px", height: "30px", borderRadius: "75px" }}
                            />
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            <h5>{data.memberNickname}</h5>
                        </div>
                    </div>
                    <div className='mt-1'>
                        <span>
                            {data.registerDate} • 좋아요 {likeCount} • 조회 {data.visitCount}
                        </span>
                    </div>
                    <hr />
                    <div
                        className='mt-4'
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

                    <div className='mt-3' style={{ fontSize: "20px" }}>
                        {data.content.split("\n").map((line, i) => (
                            <div key={i}>
                                {line}
                                {i !== data.content.split("\n").length - 1 && <br />}
                            </div>
                        ))}
                    </div>

                    <div className='mt_25 d-flex justify-content-center' style={{ position: "relative" }}>
                        <div id='deleteupdatebutton'>
                            {userRole === "todac" ? (
                                // 관리자인 경우에는 삭제 기능만 표시
                                <div>
                                    <button
                                        className='button-17'
                                        id='moreview'
                                        style={{ marginRight: "20px" }}
                                        onClick={handleMoreView}
                                    >
                                        <img alt='' src={MoreIcon} style={{ width: "25px" }} />
                                    </button>
                                </div>
                            ) : // 일반 사용자인 경우 글 작성자인지 확인 후 삭제 및 수정 버튼 표시
                            data.userCode == sessionStorage.getItem("usercode") ? (
                                <div>
                                    <button
                                        className='button-17'
                                        id='moreview'
                                        style={{ marginRight: "20px" }}
                                        onClick={handleMoreView}
                                    >
                                        <img alt='' src={MoreIcon} style={{ width: "25px" }} />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        <div id='btnlike' style={{ position: "relative" }}>
                            <button type='button' className='button-17 d-flex justify-content-center'>
                                <span
                                    style={{ marginRight: "5px", cursor: "pointer" }}
                                    onClick={isLiked ? handleUnlike : handleLike}
                                >
                                    {isLiked ? <img alt='' src={heartFull} /> : <img alt='' src={heart} />}
                                </span>
                                <span>{likeCount}</span>
                            </button>
                        </div>
                        <div id='btnshare' style={{ marginLeft: "20px" }}></div>
                        <button className='button-17' id='btnShere' cursor='pointer' onClick={toggleShareVisibility}>
                            <img alt='' src={shareIcon} style={{ width: "25px", height: "25px" }} />
                        </button>

                        {shareVisible && (
                            <div
                                id='sharebundle'
                                className='d-flex'
                                style={{
                                    position: "absolute",
                                    right: "1.5rem",
                                    bottom: "-3.2rem",
                                    gap: "0.8rem",
                                    alignItems: "center",
                                    border: "0.2rem solid transparent",
                                    borderRadius: "50rem",
                                }}
                            >
                                <div id='btnTwitter' onClick={shareTwitter}>
                                    <img alt='xicon' src={xIcon} style={{ width: "34px", height: "34px" }} />
                                </div>
                                <div id='btnFacebook' onClick={shareFacebook}>
                                    <img alt='facebookicon' src={facebookIcon} />
                                </div>
                                <div id='btnKakao' onClick={shareKakao}>
                                    <img alt='kakaoicon' src={kakaoIcon} />
                                </div>
                                <div style={{ position: "relative" }}>
                                    <button
                                        className='button-container copy-button'
                                        style={{
                                            position: "relative",
                                            width: "35.5px",
                                            height: "37.5px",
                                            borderRadius: "",
                                            border: "none",
                                            backgroundColor: "white",
                                        }}
                                        onClick={handleCopyClipBoard}
                                    >
                                        <img
                                            alt=''
                                            src={linkIcon}
                                            style={{
                                                position: "absolute",
                                                right: "0px",
                                                bottom: "0.3px",
                                                width: "35.5px",
                                                height: "35.5px",
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <BoardComment />
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
