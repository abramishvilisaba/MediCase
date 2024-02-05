import React from "react";
// import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";

const CategoryDropdown = ({ title, categories, language }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    const navigate = useNavigate();
    return (
        <div style={{ display: "inline-block", marginRight: 5, width: "fit" }}>
            <Button
                variant="text"
                {...bindHover(popupState)}
                style={{ width: "fit", padding: "2px 5px", color: "white", fontSize: "16px" }}
                onClick={() => {
                    // handleClose();
                    navigate(`/${language}/${title}/all`);
                }}
            >
                {title}
            </Button>
            {categories && (
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
                            // categories.names.map((category, id) => (
                            Object.keys(categories).map((key, id) => (
                                <ListItem
                                    key={id}
                                    onClick={() => {
                                        // handleClose();
                                        navigate(`/${language}/${title}/${key}`);
                                    }}
                                >
                                    <ListItemText key={id} primary={categories[key][language]} />
                                </ListItem>
                            ))}
                    </List>
                </HoverPopover>
            )}
        </div>
    );
};

export default CategoryDropdown;
