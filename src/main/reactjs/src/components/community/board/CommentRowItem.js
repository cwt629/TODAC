import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import newbie from "../../../image/badge/newbie.png";
import { getBadgeInfo } from "../../../utils/badgeInfo";

// 날짜를 로그에 맞게 포매팅하는 함수
function getDateFormatPieces(str) {
    if (!str) return null;

    const date = new Date(str);

    // 년, 월, 일, 시, 분 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const now = new Date();
    const timeDiff = Math.floor((now - date) / (1000 * 60)); // 작성 시간과 현재 시간의 차이 (분

    // 오전/오후 구분
    const ampm = hour >= 12 ? "오후" : "오전";

    // 12시간 형식으로 변환
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    // 작성된지 몇 분 전 또는 몇 일 전인지 계산
    let timeAgo = "";
    if (timeDiff < 1) {
        // 1분 이내
        timeAgo = "방금 전";
    } else if (timeDiff < 60) {
        // 60분 이내
        timeAgo = `${timeDiff}분 전`;
    } else if (timeDiff < 24 * 60) {
        // 24시간 이내
        timeAgo = `${Math.floor(timeDiff / 60)}시간 전`;
    } else {
        // 24시간 이후일 경우
        timeAgo = `${Math.floor(timeDiff / (24 * 60))}일 전`;
    }

    return {
        year: year,
        month: month,
        day: day,
        ampm: ampm,
        hour: formattedHour,
        minute: minute,
        timeAgo: timeAgo,
    };
}

const CommentRowItem = ({ idx, data, deleteComment }) => {
    // 날짜 포맷팅
    const datePieces = getDateFormatPieces(data.registerDate);
    const userRole = sessionStorage.getItem("id");

    return (
        <div>
            <div>
                <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
                    <ListItem alignItems='flex-start' style={{ paddingLeft: "0", borderBottom: "1px solid #CBCBCB" }}>
                        <ListItemAvatar>
                            <Avatar alt='' src={data.memberPhoto} sx={{ width: 49, height: 49 }} />
                        </ListItemAvatar>
                        <ListItemText
                            style={{ marginTop: "-3px" }}
                            primary={
                                <>
                                    <div className='d-flex justify-content-between'>
                                        <Typography
                                            sx={{ display: "inline", fontWeight: "650", fontSize: "14.8px" }}
                                            component='span'
                                            variant='body1' //크기 조절 가능 mui
                                            color='text.primary'
                                        >
                                            <div
                                                id='badge'
                                                style={{ position: "relative", top: "5px", alignItems: "center" }}
                                            >
                                                <img
                                                    alt=''
                                                    src={
                                                        data.mybadge === "뉴비"
                                                            ? newbie
                                                            : getBadgeInfo(data.mybadge).image
                                                    }
                                                    style={{
                                                        width: "18px",
                                                        height: "18px",
                                                        borderRadius: "50px",
                                                    }}
                                                />

                                                <span>{data.memberNickname}</span>
                                            </div>
                                        </Typography>
                                        {userRole === "todac" ? (
                                            // 관리자인 경우에는 삭제 기능만 표시
                                            <div>
                                                <button
                                                    onClick={() => deleteComment(data.commentCode)}
                                                    style={{ cursor: "pointer", background: "none", border: "none" }}
                                                >
                                                    <ClearRoundedIcon sx={{ fontSize: "15px" }} />
                                                </button>
                                            </div>
                                        ) : // 일반 사용자인 경우 글 작성자인지 확인 후 삭제 버튼 표시
                                        data.userCode == sessionStorage.getItem("usercode") ? (
                                            <div>
                                                <button
                                                    onClick={() => deleteComment(data.commentCode)}
                                                    style={{ cursor: "pointer", background: "none", border: "none" }}
                                                >
                                                    <ClearRoundedIcon sx={{ fontSize: "15px" }} />
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            }
                            secondary={
                                <React.Fragment>
                                    <div>
                                        <Typography
                                            sx={{ display: "inline", fontSize: "12px" }}
                                            component='span'
                                            variant='body2'
                                            color='text.primary'
                                        >
                                            {`${datePieces.year}. ${datePieces.month}. ${datePieces.day} ${datePieces.ampm} ${datePieces.hour}:${datePieces.minute} ${datePieces.timeAgo}`}
                                        </Typography>
                                    </div>
                                    <Typography
                                        sx={{ display: "inline", fontWeight: "600", fontSize: "14.5px" }}
                                        component='span'
                                        variant='body1'
                                        color='text.primary'
                                    >
                                        {data.content}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    );
};

export default CommentRowItem;
