import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

const SignupKaKao = () => {
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  useEffect(()=>{
    Swal.fire({
        html: `<b style={{color : "#5279FD",fontSize : "5px"}}>
        등록되지 않은 회원입니다. <br/>
        회원가입을 진행해주세요. <br/><br/>
        사진과 닉네임은 회원가입 후 <br/>마이페이지에서 수정 가능합니다.<br/>
    </b>`,
        confirmButtonColor: '#FF7170',
        background: '#F9EAEB'
    });
  },[]);

  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-2);
  };

  const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#FF7170', // 원하는 색상으로 변경
    borderColor: '#FF7170', // 원하는 색상으로 변경
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#FF5E62', // hover 시 원하는 색상으로 변경
      borderColor: '#FF5E62', // hover 시 원하는 색상으로 변경
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF494D', // 클릭 시 원하는 색상으로 변경
      borderColor: '#FF494D', // 클릭 시 원하는 색상으로 변경
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(255,113,112,.5)',
    },
  });

  const handleSignup = () => {
    setLoading(true);

    axios.post("/login/signupinsert", {
      userid: userInfo.id,
      nickname: userInfo.kakao_account.profile.nickname,
      photo: userInfo.kakao_account.profile.profile_image_url,
      type : "user"
    })
    .then( res => {
      // 회원가입 성공
      if (res.data.result === 'success') {
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공',
          text: '회원가입이 성공적으로 완료되었습니다.',
          confirmButtonColor: '#FF7170',
          background: '#F9EAEB'
        });
        navigate('/user');  
      } 
      else {
        // 회원가입 실패
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: '회원가입에 실패하였습니다. 다시 시도해주세요.',
          confirmButtonColor: '#FF7170',
          background: '#F9EAEB'
        });
      }
    });
  };

  return (
      <div style={{paddingTop : "55px", paddingRight : "55px", paddingLeft : "55px"}}>
          <ArrowBackIcon onClick={goBack} style={{ cursor: 'pointer' }} />
          <br/><br/>
          <h1 style={{color : "#FF494D", textAlign: "center",
                          fontSize : "3em", fontWeight : "1000"
                          }}>TODAC</h1>
          <br/>
          <h6 style={{textAlign: "center",color : "#536179"}}>[프로필 사진]</h6>
          <img alt="User Profile" src={userInfo.kakao_account.profile.profile_image_url} 
          style={{ width: "150px", height : "150px", display: 'block', margin: '0 auto'}}/>
          <br/>
          <h6 style={{textAlign: "center",color : "#536179"}}>[닉네임]</h6>
          <input type='text' className='form-control' 
          style={{ width: "150px",textAlign: "center",margin: '0 auto'}}
          value={userInfo.kakao_account.profile.nickname} placeholder="닉네임" readOnly/>
          <br/><br/>
          
          <CustomButton variant="contained"
              style={{width : "100%"}}
              onClick={handleSignup}
              disabled={loading}
              >{loading ? '회원가입 중...' : '회원가입'}</CustomButton>
          <p onClick={goBack} style={{ cursor: 'pointer' }}>다른 방법으로 로그인</p>
      </div>
      

  );
};

export default SignupKaKao;