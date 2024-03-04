import React from "react";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import noImage from "../../../image/no_image_board_form.png";
import "./BoardStyle.css";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import commentImg from "../../../image/comment.svg";
import heartImg from "../../../image/heart_full.svg";
import viewImg from "../../../image/view_icon.svg";
import { getBadgeInfo } from "../../../utils/badgeInfo";
import newbie from "../../../image/badge/newbie.png";

const BoardRowItem = ({ idx, data }) => {
    console.log("여기 데이터가 무엇이냐" + data);
    const navi = useNavigate();

    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    const handleItemClick = () => {
        navi(`/board/detail/${data.boardcode}`);
    };

    return (
        <div>
            <ImageList sx={{ width: "100%", maxWidth: "159px", bgcolor: "white" }}>
                <ImageListItem key={idx} onClick={handleItemClick} sx={{ width: "100%", maxWidth: "155px" }}>
                    <img
                        style={{
                            width: "155px",
                            height: "159px",
                            borderRadius: "0.2rem",
                        }}
                        srcSet={`${
                            data.photo ? imageStorage + data.photo : noImage
                        }?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${data.photo ? imageStorage + data.photo : noImage}?w=248&fit=crop&auto=format`}
                        alt={data.title}
                        loading='lazy'
                    />
                    <div>
                        <ImageListItemBar
                            sx={{ backgroundColor: "", opacity: "0.8", borderRadius: "0.2rem" }}
                            subtitle={
                                <>
                                    <div>
                                        <Typography
                                            style={{
                                                marginTop: "-3px",
                                                marginBottom: "-5px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {data.title}
                                        </Typography>
                                    </div>
                                    <div style={{ marginTop: "3px" }}>
                                        <div
                                            className='d-flex justify-content-between'
                                            style={{ position: "relative", top: "2.5px", alignItems: "center" }}
                                        >
                                            <div id='badge'>
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
                                                <span>{data.nickname}</span>
                                            </div>

                                            <div style={{ position: "relative", top: "-2px" }}>
                                                <Typography style={{ fontSize: "10px" }}>
                                                    {data.registereddate}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Typography style={{ fontSize: "8px", float: "right" }}>
                                            <div className='d-flex'>
                                                <img
                                                    alt=''
                                                    src={heartImg}
                                                    style={{ width: "13px", height: "11.38", marginRight: "2px" }}
                                                />
                                                {data.likecount}
                                                <img
                                                    alt=''
                                                    src={commentImg}
                                                    style={{
                                                        width: "13px",
                                                        height: "13px",
                                                        marginRight: "2px",
                                                        marginLeft: "2px",
                                                    }}
                                                />
                                                {data.commentcount}
                                                <img
                                                    alt=''
                                                    src={viewImg}
                                                    style={{
                                                        width: "13px",
                                                        height: "11.38",
                                                        marginRight: "2px",
                                                        marginLeft: "2px",
                                                    }}
                                                />
                                                {data.visitcount}
                                            </div>
                                        </Typography>
                                    </div>
                                </>
                            }
                            position='below'
                        />
                    </div>
                </ImageListItem>
            </ImageList>
        </div>
    );
};

export default BoardRowItem;
