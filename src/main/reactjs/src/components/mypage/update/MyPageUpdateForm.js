import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./UpdateStyle.css";
import "../../CommonStyle.css";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import {CameraAltOutlined} from "@mui/icons-material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const MyPageUpdateForm = () => {
    const [member, setmember] = useState([]);
    const navi = useNavigate();
    const [photo,setPhoto]=useState('');
    const [idcheck,setIdcheck]=useState(false);//아이디 중복확인을 했는지 체크하기 위한 변수
    const [nickname,setNickname]=useState('');
    const storedId = sessionStorage.getItem("id");
    const userid = sessionStorage.getItem("usercode");
    const [address,setAddress]=useState('');
    const [addressplus,setAddressplus]=useState('');
    const [open, setOpen] = useState(false);//다이얼로그 open/close
    const [openPostcode,setOpenPostcode]=useState(false);//카카오 주소록 open/close
    const ReactSwal = withReactContent(Swal);


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
    const imageUrl="https://kr.object.ncloudstorage.com/guest-hch/TODAC/profile";

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
            const cloudimgurl = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/profile/";
            setPhoto(cloudimgurl+res.data);//사진 변경-스토리지에 업로드된 파일명을 서버가 반환
        })
    }

    const buttonIdCheck=()=>{
        if(nickname===member.nickname) {
            ReactSwal.fire({
                icon: 'success',
                html: '사용가능한 아이디입니다.',
                confirmButtonText: '확인',
                confirmButtonColor: '#FF7170'
            }).then(()=>{
                setIdcheck(true);
            })
            return;
        }

        const url="/member/nicknamecheck?nickname="+nickname;
        axios.post(url)
            .then(res=>{
                if(Number(res.data)===0){
                    ReactSwal.fire({
                        icon: 'success',
                        html: '사용가능한 아이디입니다.',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#FF7170'
                    }).then(()=>{
                        setIdcheck(true);
                    })
                }else{
                    ReactSwal.fire({
                        icon: 'warning',
                        html: '이미 사용중인 아이디입니다.',
                        cancelButtonText: '확인',
                        cancelButtonColor: '#9396A6'
                    }).then(()=>{
                        setNickname('');
                        setIdcheck(false);
                    })
                }
            })
    }

    const saveMemberEvent=()=>{

        if(nickname.length===0){
            ReactSwal.fire({
                icon: 'warning',
                html: '닉네임을 입력해주세요',
                cancelButtonText: '확인',
                confirmButtonColor: '#FF7170'
            })
            return;
        }

        if(!idcheck){
            ReactSwal.fire({
                icon: 'warning',
                html: '중복체크 버튼을 눌러주세요',
                cancelButtonText: '확인',
                confirmButtonColor: '#FF7170'
            })
            return;
        }

        //db에 저장
        axios.post("/member/insert",{nickname:nickname,userid:storedId,address:address+" "+addressplus,photo:photo})
            .then(res=>{
                //멤버 추가 후 이동할 페이지
                ReactSwal.fire({
                    icon: 'success',
                    html: '성공적으로 변경되었습니다',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#FF7170'
                }).then(()=>{
                    navi("/user");
                })

            })
    }

    useEffect(() => {
        // 1. async로 정의한 경우
        //await getmember();

        // 2. then 활용하는 경우(지금 이 함수에 async 안써도됨)
        getmember()
            // .then((res) => {
            //     console.log("불러왔음 ㅋ");
            //     console.log(member);
            //     // setAddress(member.address)
            //     // setNickname(member.nickname)
            //     // setPhoto(member.photo)
            // })
            //
            //

    }, []);

    const getmember = async () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);
                // console.log(res);
                setAddress(res.data.address);
                setNickname(res.data.nickname);
                setPhoto(res.data.photo);
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
                <div className='mt-1 fs_14 col_blue2'>
                    <Link to="/user">마이 홈 {'>'} </Link>
                    <Link to="/user/update">내 정보 관리 </Link>
                </div>
                    <div className='fs_24 fw_700'>
                        내 정보 수정
                    </div>
                </div>
                <div className="profile">
                    <img className="profile" alt='' src={photo}/>
                    <div className='mt_10 fs_20 fw_700'>{member.nickname}</div>
                    <input type='file' id='filephoto' style={{display: 'none'}}
                           onChange={uploadPhoto}/>
                    {/* <CameraAltOutlined style={{fontSize: '2em', cursor: 'pointer'}}
                                       onClick={() => document.getElementById("filephoto").click()}/> */}
                    <img style={{width:'30px',height:"30px",position:'absolute',top:"115px",right:'10px'}} className="img-fluid" alt='이미지변경' src={require('../../../image/ico_camera.png')} onClick={() => document.getElementById("filephoto").click()}/>
                </div>

                <div className='fs_20 fw_700 mt_45'>닉네임</div>
                <div className='d-flex justify-content-between h_35 mt_10'>
                    <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5" type={"text"} value={nickname}
                           onChange={(e) => {
                               setIdcheck(false);//아이디입력시 중복체크 버튼 다시 눌러야함
                               setNickname(e.target.value);
                           }}/>
                    <button type='button' className='btn btn-sm btn-secondary'
                            onClick={buttonIdCheck}>중복확인
                    </button>
                </div>

                <div className='fs_20 fw_700 mt_25'>주소</div>
                <div className='d-flex justify-content-between h_35 mt_10'>
                    <input className="bg_gray bor_gray2 col-9 col_black p-3 br_5" type={"text"} placeholder={"기존 주소"}
                       value={address}/>
                    <button type='button' className='btn btn-sm btn-secondary'
                        onClick={handleClickOpen}>주소검색
                    </button>
                </div>
                
                <input className="bg_gray bor_gray2 col_black br_5 h_35 mt_10 px-3" type={"text"} placeholder={"상세 주소"}
                       value={addressplus}
                       onChange={(e) => {
                           setAddressplus(e.target.value);
                       }}/>
                

            </div>
            <div className='d-flex justify-content-center mt_25'>
                <button className="bg_blue bor_blue1 h_35 br_5 mt_25 px-3"
                onClick={saveMemberEvent}>수정 사항 저장
                </button>
            </div>
            
        </div>
    );
};

export default MyPageUpdateForm;