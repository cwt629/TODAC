import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

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

    // 오전/오후 구분
    const ampm = hour >= 12 ? "오후" : "오전";

    // 12시간 형식으로 변환
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return {
        year: year,
        month: month,
        day: day,
        ampm: ampm,
        hour: formattedHour,
        minute: minute,
    };
}

const CommentRowItem = ({ idx, data }) => {
    // 날짜 포맷팅
    const datePieces = getDateFormatPieces(data.registerDate);

    return (
        <div>
            <div>
                <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
                    <ListItem alignItems='flex-start' style={{ paddingLeft: "0", borderBottom: "1px solid gray" }}>
                        <ListItemAvatar>
                            <Avatar alt='' src={data.memberPhoto} sx={{ width: 49, height: 49 }} />
                        </ListItemAvatar>
                        <ListItemText
                            style={{ marginTop: "-3px" }}
                            primary={
                                <Typography
                                    sx={{ display: "inline", fontWeight: "650", fontSize: "14.8px" }}
                                    component='span'
                                    variant='body1' //크기 조절 가능 mui
                                    color='text.primary'
                                >
                                    {data.memberNickname}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline", fontSize: "12px" }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        {`${datePieces.year}. ${datePieces.month}. ${datePieces.day}. ${datePieces.ampm} ${datePieces.hour}:${datePieces.minute}`}
                                    </Typography>
                                    <br />
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
