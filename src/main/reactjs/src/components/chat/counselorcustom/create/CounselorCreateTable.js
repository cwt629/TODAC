import React, { useState } from 'react';
import defaultImage from "../../../../image/default_profile_photo_blue.jpg";
import ChatContent from '../../chattingroom/ChatContent';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import CounselorPreview from './CounselorPreview';

const CounselorCreateTable = () => {
    // 각 input의 최대 길이
    const INPUT_MAX_LENGTH = {
        'name': 5,
        'personality': 30,
        'briefintro': 10,
        'introduction': 100,
        'greeting': 50
    };

    // 앞서 상담사 선택에서 받는 형태의 데이터 구조를 가지게 한다.
    const [data, setData] = useState({
        name: '',
        briefintro: '',
        introduction: '',
        photo: '',
        cardcolor: '#EEF0F7',
        personality: '',
        reviewcount: 0,
        averagescore: 0,
        greeting: '안녕하세요!'
    });
    // 포토 파일은 다음과 같이 따로 저장해둔다
    const [photoFile, setPhotoFile] = useState(null);



    // 일부 input의 변경 이벤트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    // 사진 변경 이벤트
    const handlePhotoUpload = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setPhotoFile(file);
                // 미리보기를 위한 이미지 URL 저장
                setData({ ...data, photo: URL.createObjectURL(file) });
            }
            else {
                ReactSwal.fire({
                    icon: 'error',
                    title: '이미지만 업로드 가능!',
                    html: '이미지 파일만 업로드 해주세요.',
                    confirmButtonColor: '#ff7170',
                    confirmButtonText: '확인'
                })
            }
        }
    }

    const ReactSwal = withReactContent(Swal);

    const handlePreview = () => {
        ReactSwal.fire({
            title: '상담사 미리보기',
            html: <CounselorPreview data={data} />,
            confirmButtonColor: '#ff7170',
            confirmButtonText: '확인'
        })
    }

    return (
        <div className='mt_25'>
            <table className='table table-bordered counselor-create'>
                <tbody>
                    <tr>
                        <td width={'20%'}>이름</td>
                        <td width={'80%'}>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="name" value={data.name}
                                onChange={handleInputChange} maxLength={INPUT_MAX_LENGTH['name']} />
                            ({data.name.length} / {INPUT_MAX_LENGTH['name']})
                        </td>
                    </tr>
                    <tr>
                        <td>사진</td>
                        <td style={{ position: 'relative' }}>
                            <img alt='' src={data.photo ? data.photo : defaultImage} style={{ width: '100%', height: '100%' }} />
                            <input type='file' accept='image/*' id='counselor-create-image' style={{ display: 'none' }}
                                onChange={handlePhotoUpload} />
                            <img style={{ width: '30px', height: "30px", position: 'absolute', bottom: "10px", right: '10px' }} className="img-fluid"
                                alt='이미지변경' src={require('../../../../image/ico_camera.png')} onClick={() => document.getElementById("counselor-create-image").click()} />
                        </td>
                    </tr>
                    <tr>
                        <td>성격</td>
                        <td>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="personality" value={data.personality} maxLength={INPUT_MAX_LENGTH['personality']}
                                onChange={handleInputChange} /> 상담사 ({data.personality.length} / {INPUT_MAX_LENGTH['personality']})<br />
                            <div>
                                '~한', '~인'과 같은 형태로 작성하셔야 원하는 대로 동작할 거에요!<br />
                                ex{')'} 얼음처럼 냉철한
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>짧은 소개</td>
                        <td>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="briefintro" value={data.briefintro} maxLength={INPUT_MAX_LENGTH['briefintro']}
                                onChange={handleInputChange} /> ({data.briefintro.length} / {INPUT_MAX_LENGTH['briefintro']})
                        </td>
                    </tr>
                    <tr>
                        <td>상세 소개</td>
                        <td>
                            <textarea className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                name="introduction" value={data.introduction} maxLength={INPUT_MAX_LENGTH['introduction']}
                                onChange={handleInputChange}></textarea> ({data.introduction.length} / {INPUT_MAX_LENGTH['introduction']})
                        </td>
                    </tr>
                    <tr>
                        <td>첫마디</td>
                        <td>
                            <textarea className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                name="greeting" value={data.greeting} maxLength={INPUT_MAX_LENGTH['greeting']}
                                onChange={handleInputChange}></textarea> ({data.greeting.length} / {INPUT_MAX_LENGTH['greeting']})
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <ChatContent log={[
                                {
                                    'role': 'assistant', 'content': data.greeting,
                                    'speaker': 1,
                                    'photo': data.photo ? data.photo : defaultImage
                                }
                            ]} isPreview={true} />
                        </td>
                    </tr>
                    <tr>
                        <td>카드 색깔</td>
                        <td>
                            <input type='color' name='cardcolor' value={data.cardcolor}
                                onChange={handleInputChange} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className='custom-btn-outer'>
                                <div className='custom-btn-div'>
                                    <button type='button' onClick={handlePreview}>미리보기</button>
                                    <button type='button'>제작!</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CounselorCreateTable;