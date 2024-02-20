import React from "react";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const CommentRowItem = ({ idx, data }) => {
    return (
        <div>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <ListItem alignItems='flex-start'>
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
                                    variant='body2'
                                    color='text.primary'
                                >
                                    {data.registerDate}
                                </Typography>
                                <Typography>{data.content}</Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant='inset' component='li' />
            </List>
        </div>
    );
};

export default CommentRowItem;
