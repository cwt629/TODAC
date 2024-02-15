import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

const ReviewAlert = ({ children, reviewShow, handleClose }) => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        if (reviewShow) {
            ReactSwal.fire({
                title: '상담은 어떠셨나요?',
                html: <div ref={(el) => setContainer(el)} />,
                showConfirmButton: false,
                didClose: () => {
                    handleClose();
                }
            })
        }
    }, [reviewShow]);

    if (container) {
        return createPortal(children, container);
    }

    return null;
}

export default ReviewAlert;