import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import styles from "./CardAttraction.module.css";

import { Link, useNavigate } from "react-router-dom";

import { AttractionDto } from "../../../types/dto/common/AttractionDto";
import { postData } from "../../../api/PostData";
import { useAuthContext } from "../../../context/authContext";

interface CardAttractionProps {
    attraction: AttractionDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,
});
const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardAttraction: FC<CardAttractionProps> = ({ attraction }) => {
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
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
            setFlag(false);
        } else {
            navigate("/auth/login");
        }
    };
    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ width: 280 }}>
                <FavoriteButton
                    onClick={() => {
                        like(attraction);
                    }}
                    disabled={!flag}
                >
                    <FavoriteBorderOutlinedIcon />
                </FavoriteButton>
                <Link key={attraction.id} to={`/attraction/${attraction.id}`}>
                    <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                        {attraction.imageUrl && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={attraction.imageUrl}
                                alt={attraction.label}
                            />
                        )}

                        <CardContent className={styles.AttractionContent}>
                            <Typography variant="body1" className={styles.label}>
                                {attraction.label}
                            </Typography>

                            {attraction.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={attraction.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                            {attraction.type && (
                                <Typography variant="body2">
                                    {attraction.type} attraction
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
