import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./UpdateStyle.css";
import "../../CommonStyle.css";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import {CameraAltOutlined} from "@mui/icons-material";

const MyPageUpdateForm = () => {
    const [member, setmember] = useState([]);
    const navi = useNavigate();
    const [photo,setPhoto]=useState('');
    const [idcheck,setIdcheck]=useState(false);//아이디 중복확인을 했는지 체크하기 위한 변수
    const [nickname,setNickname]=useState('');
    const storedId = sessionStorage.getItem("id");
    const usercode = sessionStorage.getItem("usercode");
    const [address,setAddress]=useState('');
    const [open, setOpen] = useState(false);//다이얼로그 open/close
    const [openPostcode,setOpenPostcode]=useState(false);//카카오 주소록 open/close
    const [type,setType]=useState('');
    const [pass,setPass]=useState('');
    const [userid,setUserid]=useState('');
    const [token,setToken]=useState('');
    const [point,setPoint]=useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setOpenPostcode(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenPostcode(false);
    };

    //주소 선택 완료시 호출될 이벤트
    const selectAddress=(data)=>{
        console.dir(data);
        setAddress(`(${data.zonecode}) ${data.address} ${data.buildingName} `);

        //주소 선택시 출력후 카카오주 소록과 다이얼로그를 닫는다
        setOpen(false);
        setOpenPostcode(false);
    }

    //네이버 스토리지의 이미지 폴더명
    const imageUrl="https://kr.object.ncloudstorage.com/guest-hch/TODAC/";

    //파일 업로드 이벤트
    const uploadPhoto=(e)=>{
        const uploadFile=new FormData();
        uploadFile.append("upload",e.target.files[0]);
        axios({
            method:'post',
            url:'/member/upload',
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setPhoto(res.data);//사진 변경-스토리지에 업로드된 파일명을 서버가 반환
        })
    }

    const buttonIdCheck=()=>{
        const url="/member/nicknamecheck?nickname="+nickname;
        axios.post(url)
            .then(res=>{
                if(Number(res.data)===0){
                    alert("사용 가능한 아이디입니다");
                    setIdcheck(true);
                }else{
                    alert("이미 사용중인 아이디입니다");
                    setNickname('');
                    setIdcheck(false);
                }
            })
    }

    const saveMemberEvent=()=>{
        if(nickname.length===0){
            alert("아이디를 입력 후 중복학인을 해주세요")
            return;
        }

        if(!idcheck){
            alert("아이디 중복확인 버튼을 눌러주세요");
            return;
        }

        if(nickname.length===0){
            alert("이름를 입력 후 중복학인을 해주세요")
            return;
        }

        //db에 저장
        axios.post("/member/insert",{point,usercode,type,nickname,pass,userid,address,photo,token})
            .then(res=>{
                //멤버 추가 후 이동할 페이지
                navi("/member/list");

            })

    }

    useEffect(() => {
        getmember();
        setNickname(member.nickname);
        setPhoto(member.photo);
        setType(member.type);
        setUserid(member.userid);
        setToken(member.token);
        setPass(member.pass);
        console.log("storedId:", storedId, ", usercode:", usercode);
    }, []);

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);

            })
    }

    return (
        <div>
            {/* 카카오 주소록을 보기위한 다이얼로그 */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"카카오 주소록"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            //카카오 주소창
                            openPostcode &&
                            <DaumPostcodeEmbed
                                onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='강남대로 24길'//팝업을 열때 검색창의 기본 주소
                            />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="myupdatemain">
                <div className='myupdateheader'>
                    <div className='fs_14 fw_500 col_blue2'>
                        <span>마이 홈</span> > <span>내 정보 관리</span>
                    </div>
                    <div className='fs_24 fw_700'>
                        내 정보 수정
                    </div>
                </div>
                <div className="profile">
                    <img className="profile" alt='' src={imageUrl+photo}/>
                    <h4>{member.nickname}</h4>
                    <input type='file' id='filephoto' style={{display: 'none'}}
                           onChange={uploadPhoto}/>
                    <CameraAltOutlined style={{fontSize: '2em', cursor: 'pointer'}}
                                       onClick={() => document.getElementById("filephoto").click()}/>
                </div>

                <h6><b>닉네임</b></h6>
                <input className="bg_red bor_red" type={"text"} value={nickname}
                       onChange={(e)=>{
                           setIdcheck(false);//아이디입력시 중복체크 버튼 다시 눌러야함
                           setNickname(e.target.value);
                       }}/>
                <button type='button' className='btn btn-sm btn-outline-danger'
                        onClick={buttonIdCheck}>중복확인
                </button>

                <h6><b>주소</b></h6>
                <input className="bg_red bor_red" type={"text"} placeholder={"기존 주소"}
                value={address}/>
                <button type='button' className='btn btn-sm btn-secondary'
                        onClick={handleClickOpen}>주소검색
                </button>
                <input className="bg_red bor_red" type={"text"} placeholder={"상세 주소"}/>
                <button className="bg_blue bor_blue1"
                        onClick={saveMemberEvent}>수정 사항 저장</button>

            </div>
        </div>
    );
};

export default MyPageUpdateForm;