import React from "react";
// import Typography from "@mui/material/Typography";
import messages from "../locales/messages";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";

import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { usePopupState, bindHover, bindPopover, bindMenu } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";

const CategoryDropdown = ({ title, categories, language, isMobile, closeDrawer, scrolling }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    const navigate = useNavigate();
    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div style={{ display: "inline-block", marginRight: 5, width: "fit" }}>
                <div
                    {...bindHover(popupState)}
                    className="h-fit flex items-center  text-2xl py-[14px]"
                >
                    <Button
                        variant="text"
                        style={{
                            width: "fit",
                            height: "30px",
                            // padding: "40px 4px",
                            padding: scrolling ? "14px 4px" : "26px 4px",

                            color: "white",
                            fontSize: "16px",
                        }}
                        onClick={() => {
                            popupState.close();
                            if (!isMobile) {
                                navigate(`/${language}/${title}/all`);
                            }
                        }}
                    >
                        <FormattedMessage id={title} />
                    </Button>
                </div>
                {categories && (
                    <HoverMenu
                        {...bindMenu(popupState)}
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
                        <div
                            style={{
                                width: "100%",
                                padding: "0px 5px",
                                cursor: "pointer",
                            }}
                        >
                            {categories &&
                                Object.keys(categories).map((key, id) => (
                                    // <ListItem
                                    //     key={id}
                                    //     onClick={() => {
                                    //         navigate(`/${language}/${title}/${key}`);
                                    //     }}
                                    // >
                                    //     <ListItemText
                                    //         key={id}
                                    //         primary={categories[key][language]}
                                    //     />
                                    // </ListItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            if (isMobile) {
                                                closeDrawer();
                                            }

                                            navigate(`/${language}/${title}/${key}`);
                                        }}
                                        key={id}
                                    >
                                        <Typography className="text-2xl w-full ">
                                            {categories[key][language]}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </div>
                    </HoverMenu>
                )}
                {/* <HoverMenu
                    {...bindMenu(popupState)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <MenuItem onClick={popupState.close}>Cake</MenuItem>
                    <MenuItem onClick={popupState.close}>Death</MenuItem>
                </HoverMenu> */}
            </div>
        </IntlProvider>
    );
};

export default CategoryDropdown;
