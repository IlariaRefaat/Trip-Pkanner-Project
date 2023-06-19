import { Button, Container, IconButton, styled, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./AttractionPage.module.css";
import dayjs from "dayjs";
import { AttractionInfo } from "../Components/core/AttractionInfo";
import { SharePopup } from "../Components/widgets/SharePopup";
import { AttractionDto } from "../types/dto/common/AttractionDto";
import EditIcon from "@mui/icons-material/Edit";
import { postData } from "../api/PostData";
import { ReviewList } from "../Components/widgets/ReviewList";
import { useAuthContext } from "../context/authContext";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import { ReviewForm } from "../Components/widgets/ReviewForm";
import CloseIcon from "@mui/icons-material/Close";
import { FavoriteItem } from "../types/dto/common/FavoriteItemDto";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});

export const AttractionPage = () => {
    const [sharePopupState, setSharePopupState] = useState(false);
    const [formState, setFormState] = useState(false);
    const { t } = useTranslation();
    const [attraction, setAttraction] = React.useState<AttractionDto | null>(null);
    const [reviews, setReviews] = useState<ReviewDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<FavoriteItem[]>([]);
    const [likedLoc, setLikedLoc] = useState<boolean>(false);
    const { id } = useParams();
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getAttraction(id);
                setAttraction(response.attraction);
                setReviews(response.reviews);
            }
        };
        onMount();
    }, [id]);

    useEffect(() => {
        const getUserLikes = async (id: number, token: string) => {
            const userFavs = await fetchData.getProfileFavorites(id, token);
            setUserFavs(userFavs);
        };
        const token = localStorage.getItem("accessToken");
        console.log(loggedInUser, token);
        if (loggedInUser && token) {
            getUserLikes(loggedInUser.id, token);
        } else {
            setUserFavs([]);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (attraction) {
            const isLocationLiked = userFavs?.some(
                favorite => favorite.item.id === attraction.id && favorite.type === "attraction"
            );
            setLikedLoc(isLocationLiked);
        }
    }, [attraction, userFavs]);

    const handleClickOpen = () => {
        setSharePopupState(true);
    };
    const handleClose = () => {
        setSharePopupState(false);
    };

    if (!attraction) {
        return null;
    }
    const like = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.like(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(true);
        } else {
            navigate("/auth/login");
        }
    };

    const dislike = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.dislike(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(false);
        } else {
            navigate("/auth/login");
        }
    };

    const openForm = () => {
        setFormState(true);
    };
    const closeForm = () => {
        setFormState(false);
    };

    return (
        <Container className={styles.container}>
            <Typography variant="h3">{attraction.label}</Typography>
            <div className={styles.header}>
                <div className={styles.communicate}>
                    {attraction.openingHours && dayjs(attraction.openingHours?.from).isValid() && (
                        <div className={styles.openHours}>
                            <Typography variant="h6">
                                {t("attractions.openHours", {
                                    from: dayjs(attraction.openingHours?.from).format("HH:mm"),
                                    to: dayjs(attraction.openingHours?.to).format("HH:mm"),
                                })}
                            </Typography>
                        </div>
                    )}
                    {attraction.website && (
                        <Link to={attraction.website}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.visitWebsite")}
                            </Typography>
                        </Link>
                    )}
                    {attraction.phone && (
                        <Link to={`tel:${attraction.phone}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.call")}
                            </Typography>
                        </Link>
                    )}
                    {attraction.email && (
                        <Link to={`mailto:${attraction.email}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                            {t("common.email")}
                            </Typography>
                        </Link>
                    )}
                </div>
                <div className={styles.icons}>
                    <ShareButton className={styles.shareButton} onClick={handleClickOpen}>
                        <IosShareIcon />
                    </ShareButton>
                    <SharePopup
                        url={window.location.href}
                        open={sharePopupState}
                        onClose={handleClose}
                    />
                    <FavoriteButton
                        onClick={() => {
                            if (likedLoc) {
                                dislike(attraction);
                            } else {
                                like(attraction);
                            }
                        }}
                    >
                        {likedLoc ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </FavoriteButton>
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
            <Typography variant="h4" className={styles.reviewsTitle}>
                {t("common.reviews")}:
            </Typography>
            {!formState ? (
                <Button
                    variant="text"
                    startIcon={<EditIcon className={styles.icon} />}
                    sx={{ color: "black" }}
                    onClick={() => {
                        loggedInUser ? openForm() : navigate("/auth/login");
                    }}
                >
                    {t("common.writeReview")}
                </Button>
            ) : (
                <IconButton onClick={closeForm} sx={{ color: "red" }}>
                    <CloseIcon />
                </IconButton>
            )}
            <div className={styles.reviewsContainer}>
                {formState && <ReviewForm type="attractionReview" itemId={attraction.id} />}
                {reviews && <ReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
