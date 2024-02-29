import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CommentListButtons = ({ needToShow, displayedAll, handleExpandDisplay, handleShrinkDisplay }) => {
    return (
        <div className='mt_25' style={{ textAlign: "center", display: needToShow ? "block" : "none" }}>
            <button className='white' onClick={displayedAll ? handleShrinkDisplay : handleExpandDisplay}>
                {displayedAll ? (
                    <>
                        간략히보기
                        <ExpandLessIcon style={{ marginLeft: "1px" }} />
                    </>
                ) : (
                    <>
                        댓글 더보기
                        <KeyboardArrowRightIcon style={{ marginLeft: "1px" }} />
                    </>
                )}
            </button>
        </div>
    );
};

export default CommentListButtons;
