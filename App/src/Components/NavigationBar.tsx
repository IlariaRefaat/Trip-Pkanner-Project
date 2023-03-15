import styles from "./NavigationBar.module.css";

import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "./core/Typography";
import { useTranslation } from "react-i18next";

import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { Container } from "./core/layout/Container";
import { IconButton } from "@mui/material";

export const NavigationBar = () => {
    const { t } = useTranslation();

    return (
        <nav>
            <Container className={styles.navbarContainer}>
                <div className={styles.leftSide}>
                    <a href="/">
                        <div className={styles.logo}>{t("navBar.logo")}</div>
                    </a>
                </div>
                <div className={styles.rightSide}>
                    {/*  TODO ADD ICON */}

                    <IconButton className={styles.profilePage}>
                        <PersonIcon className={styles.icon} />
                    </IconButton>
                    <DropDownLanguageMenu />
                </div>
            </Container>
        </nav>
    );
};
