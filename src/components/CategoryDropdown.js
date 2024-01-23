import React from "react";
import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CategoryDropdown = ({ title, categories }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    const navigate = useNavigate();
    const location = useLocation();

    let { language } = useParams();

    return (
        <div style={{ display: "inline-block", marginRight: 5, width: "fit" }}>
            <Button
                variant="text"
                {...bindHover(popupState)}
                style={{ width: "fit", padding: "2px 5px", color: "white", fontSize: "16px" }}
            >
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
                style={{ width: "100%", marginTop: "0px" }}
            >
                <List
                    style={{
                        width: "100%",
                        padding: "0px 5px",
                        cursor: "pointer",
                    }}
                >
                    {categories &&
                        categories.map((category, id) => (
                            <ListItem
                                key={id}
                                onClick={() => {
                                    // handleClose();
                                    navigate(`/${language}/products/${category}`);
                                }}
                            >
                                <ListItemText key={id} primary={category} />
                            </ListItem>
                        ))}
                </List>
            </HoverPopover>
        </div>
    );
};

export default CategoryDropdown;
