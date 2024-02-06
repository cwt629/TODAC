import React from "react";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const BoardRowItem = ({ idx, data }) => {
    const navi = useNavigate();

    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    return (
        <div>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <Avatar alt='' src={imageStorage + data.photo} />
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
                                    {data.registereddate}
                                </Typography>
                                {data.content}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <Avatar alt='' src={imageStorage + data.photo} />
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
                                    {data.registereddate}
                                </Typography>
                                {data.content}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <Avatar alt='' src={imageStorage + data.photo} />
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
                                    {data.registereddate}
                                </Typography>
                                {data.content}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default BoardRowItem;
