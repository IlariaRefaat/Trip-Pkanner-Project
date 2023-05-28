import { Button, Paper, styled, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AttractionDto } from "../../types/dto/common/AttractionDto";
import styles from "./AttractionInfo.module.css";

interface AttractionInfoProps {
    attraction: AttractionDto;
}
const BuyTicketButton = styled(Button)({
    borderRadius: "20px",
    backgroundColor: "black",
    width: "100%",
    marginTop: "50px",
    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
});
export const AttractionInfo: FC<AttractionInfoProps> = ({ attraction }) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                padding: "20px",
                width: "30%",
            }}
        >
            <Typography variant="h5">{t("attractions.about")}</Typography>
            <Typography className={styles.activityDescription}>{attraction.about}</Typography>
            <Typography variant="h5">{t("attractions.suggestedDuration")}</Typography>
            <div className={styles.suggestedDuration}>
                <Typography>
                    {t("attractions.suggestedDurationFormat", {
                        duration: attraction.suggestedDuration,
                    })}
                </Typography>
            </div>
            <div className={styles.tickets}>
                <Typography variant="body2">
                    {t("attractions.ticketPrice")}{" "}
                    {t("attractions.ticketPriceFormat", { amount: attraction.entryFee })}
                </Typography>
            </div>
            {attraction.reservationLink && (
                <BuyTicketButton
                    className={styles.buyTicketButton}
                    variant="contained"
                    size="large"
                    href={attraction.reservationLink}
                >
                    <Typography variant="button">{t("attractions.buyTicket")}</Typography>
                </BuyTicketButton>
            )}
        </Paper>
    );
};
