import React from "react";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

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
    console.log("data는 무엇이?" + data);

    // 날짜 포맷팅
    const datePieces = getDateFormatPieces(data.registerDate);

    return (
        <div>
            <div>
                <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
                    <ListItem alignItems='flex-start' style={{ paddingLeft: "0", borderBottom: "1px solid gray" }}>
                        <ListItemAvatar>
                            <Avatar alt='' src={data.photo} sx={{ width: 49, height: 49 }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={data.memberNickname}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component='span'
                                        variant='body3'
                                        color='text.primary'
                                    >
                                        {`${datePieces.year}. ${datePieces.month}. ${datePieces.day}. ${datePieces.ampm} ${datePieces.hour}:${datePieces.minute}`}
                                    </Typography>
                                    <Typography>{data.content}</Typography>
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
