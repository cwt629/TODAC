import { useState } from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const Success = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [searchParams] = useSearchParams();
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const storedId = sessionStorage.getItem("id");
    const nav = useNavigate();


    async function confirmPayment() {
        // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
        // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
        // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
        const response = await fetch("/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount,
                storedId
            })
        });

        if (response.ok) {
            setIsConfirmed(true);
        }
    }

    return (
        <div className="wrapper w-100">
            {isConfirmed ? (
                <div
                    className="flex-column align-center confirm-success w-100 max-w-540"
                    style={{
                        display: "flex"
                    }}
                >
                    <img
                        alt=""
                        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                        width="120"
                        height="120"
                    />
                    <h2 className="title">결제를 완료했어요</h2>
                    <div className="response-section w-100">
                        <div className="flex justify-between">
                            <span className="response-label">결제 금액</span>
                            <span id="amount" className="response-text">
                {amount}
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="response-label">주문번호</span>
                            <span id="orderId" className="response-text">
                {orderId}
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="response-label">paymentKey</span>
                            <span id="paymentKey" className="response-text">
                {paymentKey}
              </span>
                        </div>
                    </div>

                    <div className="w-100 button-group">
                        <b class="btn primary" onClick={()=>nav("/user/point")}>내 포인트 확인하기</b>
                    </div>
                </div>
            ) : (
                <div className="flex-column align-center confirm-loading w-100 max-w-540">
                    <div className="flex-column align-center">
                        <img
                            alt=""
                            src="https://static.toss.im/lotties/loading-spot-apng.png"
                            width="120"
                            height="120"
                        />
                        <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
                        <h4 className="text-center description">결제 승인하고 완료해보세요.</h4>
                    </div>
                    <div className="w-100">
                        <button className="btn primary w-100" onClick={confirmPayment}>
                            결제 승인하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Success;