import React from "react";
import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";

const CategoryDropdown = ({ title, categories }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    const navigate = useNavigate();

    return (
        <div style={{ display: "inline-block", marginRight: 20 }}>
            <Button
                variant="contained"
                {...bindHover(popupState)}
                style={{ width: "100%", padding: "5px 20px" }}
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
                <List style={{ width: "100%", padding: "0px 5px", cursor: "pointer" }}>
                    {categories.map((category) => (
                        <ListItem
                            key={category.id}
                            onClick={() => {
                                // handleClose();
                                navigate(`/products/${category.name}`);
                            }}
                        >
                            <ListItemText primary={category.name} />
                        </ListItem>
                    ))}
                </List>
            </HoverPopover>
        </div>
    );
};

export default CategoryDropdown;
