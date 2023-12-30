import React from "react";
import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import Button from "@mui/material/Button";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";

const CategoryDropdown = ({ title }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    return (
        <div style={{ display: "inline-block", marginRight: 20 }}>
            <Button variant="contained" {...bindHover(popupState)}>
                {title}
            </Button>
            <HoverPopover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography style={{ margin: 10 }}>The content of the Popover.</Typography>
            </HoverPopover>
        </div>
    );
};

export default CategoryDropdown;
