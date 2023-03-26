import { Container, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import styles from "./AttractionPage.module.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { AttractionInfo } from "../Components/core/AttractionInfo";
import { SharePopup } from "../Components/widgets/SharePopup";
import Tooltip from "@mui/material/Tooltip";
import { AttractionDto } from "../types/dto/common/AttractionDto";

import { AttractionReviewDto } from "../types/dto/common/AttractionReviewDto";
import { AttractionReviewList } from "../Components/widgets/AttractionReviewList";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});
const ReviewButton = styled(IconButton)({
    color: "black",
});

export const AttractionPage = () => {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [attraction, setAttraction] = React.useState<AttractionDto | null>(null);
    const [reviews, setReviews] = useState<AttractionReviewDto[] | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getAttraction(id);
                setAttraction(response.attraction);
                setReviews(response.reviews);
            }
        };
        onMount();
    }, [id]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!attraction) {
        return null;
    }
    return (
        <Container>
            <Typography variant="h3">{attraction.label}</Typography>
            <div className={styles.header}>
                <div className={styles.communicate}>
                    <div className={styles.openHours}>
                        <Typography variant="h6">
                            {t("attractions.openHours", {
                                from: dayjs(attraction.openingHours?.from).format("HH:mm"),
                                to: dayjs(attraction.openingHours?.to).format("HH:mm"),
                            })}
                        </Typography>
                    </div>
                    {attraction.website && (
                        <a href={attraction.website}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.visitWebsite")}
                            </Typography>
                        </a>
                    )}
                    {attraction.phone && (
                        <a href={`tel:${attraction.phone}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.call")}
                            </Typography>
                        </a>
                    )}
                    {attraction.email && (
                        <a href={`mailto:${attraction.email}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                Email
                            </Typography>
                        </a>
                    )}
                </div>
                <div className={styles.icons}>
                    <ShareButton className={styles.shareButton} onClick={handleClickOpen}>
                        <IosShareIcon />
                    </ShareButton>
                    <SharePopup url={window.location.href} open={open} onClose={handleClose} />
                    <FavoriteButton className={styles.shareButton}>
                        <FavoriteBorderIcon />
                    </FavoriteButton>
                    <Tooltip title={t("common.review")}>
                        <ReviewButton>
                            <EditIcon className={styles.icon} />
                        </ReviewButton>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <AttractionInfo attraction={attraction} />
                {attraction.imageUrl && (
                    <img
                        src={attraction.imageUrl}
                        className={styles.image}
                        alt={attraction.label}
                    />
                )}
            </div>
            <div className={styles.reviewsContainer}>
                {reviews && <AttractionReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
