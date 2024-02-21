import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CommentListButtons = ({ needToShow, displayedAll, handleExpandDisplay, handleShrinkDisplay }) => {
    return (
        <div className='mt_25' style={{ textAlign: "center", display: needToShow ? "block" : "none" }}>
            <button
                className='bor_blue1 bg_blue'
                style={{ color: "#536179" }}
                onClick={displayedAll ? handleShrinkDisplay : handleExpandDisplay}
            >
                {displayedAll ? (
                    "간략히 보기"
                ) : (
                    <React.Fragment>
                        댓글 더보기
                        <KeyboardArrowRightIcon style={{ marginLeft: "1px" }} />
                    </React.Fragment>
                )}
            </button>
        </div>
    );
};

export default CommentListButtons;
