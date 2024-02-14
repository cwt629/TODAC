import React from "react";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./BoardStyle.css";

const BoardRowItem = ({ idx, data }) => {
    console.log(data);
    const navi = useNavigate();

    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    const handleItemClick = () => {
        navi(`/user/community/board/detail/${data.boardcode}`);
    };

    return (
        <div>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <ListItem alignItems='flex-start' onClick={handleItemClick}>
                    <ListItemAvatar>
                        <Avatar alt='' src={imageStorage + data.photo} variant='square' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={data.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                >
                                    {data.memberNickname}
                                </Typography>
                                <Typography style={{ float: "right" }}>{data.registerDate}</Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default BoardRowItem;
