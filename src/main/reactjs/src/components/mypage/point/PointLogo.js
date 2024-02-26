import React, { useEffect, useRef } from 'react';
import "./PointLogo.css";

const PointLogo = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // 캔버스 크기 설정
        canvas.width = 500/* 원하는 너비 */;
        canvas.height = 500 /* 원하는 높이 */;

        // 그림 그리기 함수
        const draw = () => {
            // 캔버스 초기화
            context.clearRect(0, 0, canvas.width, canvas.height);

            // TODO: 그림 그리기 코드 작성
        };

        // 애니메이션 프레임 요청
        const animate = () => {
            draw();
            requestAnimationFrame(animate);
        };

        animate();

        // 컴포넌트가 언마운트될 때 애니메이션 정지
        return () => cancelAnimationFrame(animate);
    }, []);

    return (
        <div className="pointLogo">
            <canvas ref={canvasRef} className="point-logo-canvas" />
            <div className="image"></div>
            <h2>Todac</h2>
            <p>Point record</p>
        </div>
    );
};

export default PointLogo;
