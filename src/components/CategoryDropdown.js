import React from "react";
// import Typography from "@mui/material/Typography";
import messages from "../locales/messages";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";

const CategoryDropdown = ({ title, categories, language }) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "categoryDropdownPopover",
    });

    const navigate = useNavigate();
    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div style={{ display: "inline-block", marginRight: 5, width: "fit" }}>
                <Button
                    variant="text"
                    {...bindHover(popupState)}
                    style={{ width: "fit", padding: "0px 0px", color: "white", fontSize: "18px" }}
                    onClick={() => {
                        navigate(`/${language}/${title}/all`);
                    }}
                >
                    <FormattedMessage id={title} />
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
                                Object.keys(categories).map((key, id) => (
                                    <ListItem
                                        key={id}
                                        onClick={() => {
                                            navigate(`/${language}/${title}/${key}`);
                                        }}
                                    >
                                        <ListItemText
                                            key={id}
                                            primary={categories[key][language]}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </HoverPopover>
                )}
            </div>
        </IntlProvider>
    );
};

export default CategoryDropdown;
