import React, { useEffect, useState } from "react";
import "./BadgeStyle.css";
import PageHeader from "../../PageHeader";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { getBadgeInfo, getBadgeList } from "../../../utils/badgeInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const BadgeMain = () => {
    const [badge, setBadge] = useState(getBadgeList());
    const usercode = sessionStorage.getItem("usercode");
    const storedId = sessionStorage.getItem("id");
    const [member, setmember] = useState();
    const [achievelist, setAchievelist] = useState([]);
    const [achievenames, setAchievenames] = useState([]);
    const [equipbadge, setEquipbadge] = useState();
    const ReactSwal = withReactContent(Swal);
    const CURRENT_ROUTES = [
        { name: "내 정보", url: "/user" },
        { name: "내 업적", url: "" },
    ];

    // member.registereddate를 Date 객체로 변환
    const registeredDate = new Date(member?.registereddate);
    // const getBadgeinfo = getBadgeInfo();
    // 년, 월, 일을 가져와서 문자열로 변환
    const year = registeredDate.getFullYear();
    const month = String(registeredDate.getMonth() + 1).padStart(2, "0"); // getMonth()의 반환값은 0부터 시작하므로 +1 해줌
    const day = String(registeredDate.getDate()).padStart(2, "0");

    // 년월일 형식으로 조합
    const formattedDate = `${year}-${month}-${day}`;

    const getachievelist = () => {
        const url = "/getachievelist?usercode=" + usercode;
        axios.post(url).then((res) => {
            // achieveNames 배열에 이름들 담기
            const achieveNames = res.data.map((item) => item.achievename);
            setAchievenames(achieveNames);
            setAchievelist(res.data);
        });
    };

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url).then((res) => {
            console.log(res.data);
            setmember(res.data);
            setEquipbadge(res.data.mybadge);
        });
    };

    const selectbadge = (item) => {
        ReactSwal.fire({
            showCancelButton: true,
            html: `<img src="${item.image}"/> <br/><b>${item.name}</b><br/>뱃지를 장착하시겠습니까?`,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#FF7170'
        }).then((res) => {
            if (res.isConfirmed) {
                axios.post("/equipbadge", { mybadge: item.name, userid: storedId })
                    .then(res => {
                        setEquipbadge(item.name);
                    })
            }
        })
    }
    const selectbadge2 = (image, name) => {
        ReactSwal.fire({
            showCancelButton: 'true',
            html: `<img src="${image}"/> <br/><b>뉴비</b><br/> 뱃지를 장착하시겠습니까?`,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#FF7170'
        }).then((res) => {
            if (res.isConfirmed) {
                axios.post("/equipbadge", { mybadge: name, userid: storedId })
                    .then(res => {
                        setEquipbadge(name);
                    })
            }
        })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        borderRadius: "10%",
        border: "2px solid rgba(0, 0, 0, 0.1)", // 테두리 굵기와 색상 설정
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 흐릿한 효과 설정
    }));

    const getAchievementDate = (badgeName) => {
        const badge = achievelist.find((item) => item.achievename === badgeName);
        return badge ? badge.achieveddate : ""; // badge가 존재하면 획득 날짜를 반환하고, 그렇지 않으면 빈 문자열 반환
    };

    useEffect(() => {
        getachievelist();
        getmember();
    }, []);

    const PAGE_TITLE = "내 업적";
    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='mt_10'>
                <Box sx={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Item style={{
                                border: equipbadge === "뉴비" ? '5px solid transparent' : '',
                                boxShadow: equipbadge === "뉴비" ? '0px 0px 10px 5px rgba(82, 121, 253, 0.7)' : '',
                                transition: 'border-color 0.3s, box-shadow 0.3s'
                            }}>

                                {
                                    <>
                                        <img alt='' src="https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/newbie.png"
                                            onClick={() => selectbadge2("https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/newbie.png", "뉴비")} />
                                        <div className='fw_900'>뉴비</div>
                                        <div className='fs_14'>토닥 첫 로그인</div>
                                        <hr />
                                        <div className="fw_600">{formattedDate}</div>
                                    </>
                                }
                            </Item>
                        </Grid>
                        {badge.map((item, index) => (
                            <Grid xs={6} >
                                <Item key={index}
                                    style={{
                                        border: equipbadge === item.name ? '5px solid transparent' : '',
                                        boxShadow: equipbadge === item.name ? '0px 0px 10px 5px rgba(82, 121, 253, 0.7)' : '',
                                        transition: 'border-color 0.3s, box-shadow 0.3s'
                                    }}>

                                    {achievenames.includes(item.name) ? (
                                        <>
                                            <img alt='' src={item.image}
                                                onClick={() => selectbadge(item)}
                                            />
                                            <div className='fw_900'>{item.name}</div>
                                            <div className='fs_14'>{item.description}</div>
                                            <hr />
                                            <div className='fw_600'>{getAchievementDate(item.name)}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img style={{ width: "100px", height: "100px" }} alt='' src={item.image} className="gray" />
                                            <div className='fw_900'>{item.name}</div>
                                            <div className='fs_14'>{item.description}</div>
                                            <hr />
                                            <div style={{ color: "red" }}>미획득</div>
                                        </>
                                    )}
                                </Item>
                            </Grid>
                        ))
                        }
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default BadgeMain;
