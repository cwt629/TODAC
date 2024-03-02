import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DonationMainStyle.css";
import DonationMainContent from "./DonationMainContent";
import PageHeader from "../../PageHeader";

// 한국식 통화 형식으로 숫자를 형식화하는 함수
function formatCurrency(number) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);
}

const DonationMain = () => {
    const [totaldonation, setTotaldonation] = useState(0);
    const [top3, setTop3] = useState([]);
    const [currentTotalDonation, setCurrentTotalDonation] = useState(0);
    const getAllDonation = () => {
        axios.get("/getall/donation").then((res) => {
            setTotaldonation(res.data);
        });
    };

    const getTop3 = () => {
        axios.get("/get/top3Donor").then((res) => {
            setTop3(res.data);
            console.log(res.data);
        });
    };

    useEffect(() => {
        getAllDonation();
        getTop3();
    }, []);


    useEffect(() => {
        var size = {
            x: document.querySelector('.card2').clientWidth + 0,
            y: document.querySelector('.card2').clientHeight + 0
        };
    
        var spawnArea = {
            x: 20,
            y: 20,
            width: document.querySelector('.card2 .image').clientWidth,
            height: document.querySelector('.card2 .image').clientHeight
        };
    
        var coinRadius = 40;
        var halfCoinRadius = (coinRadius / 2);
    
        var canvas = document.createElement('canvas');
        canvas.width = size.x;
        canvas.height = size.y;
        document.querySelector('.card2').appendChild(canvas);
        var context = canvas.getContext("2d");
    
        var bottomCoins = [];
        var topCoins = [];
    
        function coin(n) {
            this.x = (Math.random() * spawnArea.width) + 40;
            this.y = n == true ? (Math.random() * spawnArea.height) + 20 - coinRadius : 0;
            this.r = Math.random() * (Math.PI * 2);
            this.vx = (Math.random() * 1) - 0.5;
            this.vy = (Math.random() * 3) + 1;
            this.vr = (Math.random() * 0.2) - 0.1;
    
            this.c = Math.floor(Math.random() * 40) >= 1;
            if (this.c) {
                this.id = bottomCoins.length;
                bottomCoins.push(this);
            } else {
                topCoins.push(this);
            }
        }
    
        coin.prototype.draw = function () {
            this.x += this.vx;
            this.y += this.vy;
            this.r += this.vr;
    
            if (this.c && this.y > spawnArea.height + coinRadius * 2) {
                bottomCoins[this.id] = undefined;
            }
    
            if (!this.c && this.y > size.y + coinRadius * 2) {
                topCoins[this.id] = undefined;
            }
    
            context.save();
    
            context.translate(this.x - halfCoinRadius, this.y - halfCoinRadius);
            context.rotate(this.r);
    
            var l = 43 + this.r;
    
            context.beginPath();
            context.arc(0, 0, coinRadius, 0, 2 * Math.PI);
            context.fillStyle = 'hsl(42, 89%, ' + (l + 5) + '%)';
            context.fill();
            context.closePath();
    
            context.beginPath();
            context.arc(0, 0, coinRadius - 5, 0, 2 * Math.PI);
            context.fillStyle = 'hsl(42, 89%, ' + l + '%)';
    
            context.fill();
            context.closePath();
    
            context.font = "35px Georgia";
            context.fillStyle = 'hsl(42, 89%, ' + (l + 10) + '%)';
            context.fillText("TP", -20, 15);
    
            context.translate(-(this.x - halfCoinRadius), -(this.y - halfCoinRadius));
    
            context.restore();
        }
        window.requestFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    
        function loop() {
            context.clearRect(0, 0, size.x, size.y);
            for (var i = 0; i < bottomCoins.length; i++) {
                if (bottomCoins[i] != undefined) {
                    bottomCoins[i].draw();
                }
            }
            context.clearRect(0, 0, spawnArea.x, spawnArea.height + spawnArea.y);
            context.clearRect(spawnArea.width + spawnArea.x, 0, spawnArea.x, spawnArea.height + spawnArea.y);
            context.clearRect(0, spawnArea.height + spawnArea.y, size.x, size.y);
            for (var i = 0; i < topCoins.length; i++) {
                topCoins[i].draw();
            }
            context.clearRect(0, 0, size.x, spawnArea.y);
            requestAnimationFrame(loop);
        }
    
        setInterval(function () {
            new coin(false);
        }, 20)
    
        for (var i = 0; i < 60; i++) {
            new coin(true);
        }
    
        loop();
    
        // number count for stats, using jQuery animate
        document.querySelectorAll('.counting').forEach(function (element) {
            var countTo = element.getAttribute('data-count');
            var countNum = 0;
            var animationInterval = 50;
            var step = countTo / (1000 / animationInterval);
            var timer = setInterval(function () {
                countNum += step;
                element.innerText = Math.floor(countNum);
                if (countNum >= countTo) {
                    clearInterval(timer);
                    element.innerText = countTo;
                }
            }, animationInterval);
        });
    
    }, []);

    // totaldonation이 업데이트될 때마다 값을 갱신
useEffect(() => {
    setCurrentTotalDonation(totaldonation);
}, [totaldonation]);

// 애니메이션의 카운터가 currentTotalDonation을 기반으로 업데이트되도록 수정
useEffect(() => {
    document.querySelectorAll('.counting').forEach(function (element) {
        var countTo = currentTotalDonation;
        var countNum = 0;
        var animationInterval = 50;
        var step = countTo / (1000 / animationInterval);
        var timer = setInterval(function () {
            countNum += step;
            element.innerText = Math.floor(countNum);
            if (countNum >= countTo) {
                clearInterval(timer);
                element.innerText = countTo;
            }
        }, animationInterval);
    });
}, [currentTotalDonation]);
    
const CURRENT_ROUTES = [
    { name: "커뮤니티", url: "/user/community" },
    { name: "후원의 전당", url: "/donation" },
];

const PAGE_TITLE = "후원의 전당";

    return (
        <div className='mx_30' style={{ overflowY: 'auto' }}>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />    
            </div>
            <div>
                <div className="mt_25" style={{ textAlign: "center" }}>
                    {/* <h4 className='mt_25'>
                        총 모금액 : <span style={{ color: "#FF7170" }}>{totaldonation?.toLocaleString()}</span>
                    </h4> */}
                    {/* <img alt='' src={require("../../../image/donationIcon/DonationMainIcon.png")} className='mt_25' /> */}
                    
                    {/* 애니메이션 */}
                    <div class="card2">
	                    <div class="image"></div>
	                    <h2 className="m-0">TODAC 모금액</h2>
	                    <div class="fs_25 col_red fw_700 counting" data-count={totaldonation}>0</div>	
                    </div>

                </div>
                <DonationMainContent />

                {top3.map((item, index) => (
                    <div key={index}
                        className='mt_25 align-items-center'
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <div>
                            <img
                                // style={{ position: "absolute", top: "-7px", left: "-6px" }}
                                alt=''
                                src={require(`../../../image/donationIcon/rank${index}.png`)}
                            />
                            <spna className="fw_700 fs_20">
                                <img
                                style={{ width: "40px", height: "40px", borderRadius: "50px" }}
                                alt='' className="mx-3"
                                src={item.photo}/>'{item.nickname}' 님 :{" "}
                            </spna> 
                        </div>
                       
                        
                        <div className="fw_700 fs_20">
                            <span style={{ color: "#FF7170" }}>{item.total_amount?.toLocaleString()}</span>&nbsp;원
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationMain;
