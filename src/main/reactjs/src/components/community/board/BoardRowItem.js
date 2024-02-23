import React from "react";
import { useNavigate } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import noImage from "../../../image/no_image_board_form.png";
import "./BoardStyle.css";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { width } from "@mui/system";

const BoardRowItem = ({ idx, data }) => {
    console.log("여기 데이터가 무엇이냐" + data);
    const navi = useNavigate();

    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    const handleItemClick = () => {
        navi(`/user/community/board/detail/${data.boardcode}`);
    };

    return (
        <div>
            <ImageList
                sx={{ width: "100%", maxWidth: "158px", bgcolor: "blue" }}
                style={{ gridTemplateColumns: "1fr 1fr", gridGap: "0px 0px" }}
            >
                <ImageListItem key={idx} onClick={handleItemClick} sx={{ width: "100%", maxWidth: "158px" }}>
                    <img
                        style={{ width: "159px", height: "159px" }}
                        srcSet={`${
                            data.photo ? imageStorage + data.photo : noImage
                        }?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${data.photo ? imageStorage + data.photo : noImage}?w=248&fit=crop&auto=format`}
                        alt={data.title}
                        loading='lazy'
                    />
                    <ImageListItemBar
                        title={data.title}
                        subtitle={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                >
                                    {data.nickname}
                                </Typography>
                                <Typography style={{ float: "right" }}>{data.registereddate}</Typography>
                                <Typography>
                                    좋아요{data.likecount}
                                    <br />
                                    댓글수{data.commentcount}
                                    <br />
                                    조회수{data.visitcount}
                                </Typography>
                            </React.Fragment>
                        }
                        position='below'
                    />
                </ImageListItem>
            </ImageList>
        </div>
    );
};

export default BoardRowItem;
