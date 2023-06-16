import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import { Paper } from "@mui/material";

interface TripTimelineMapProps {
    trip: TripDto;
}

export const TripTimelineMap: FC<TripTimelineMapProps> = ({ trip }) => {
    // TODO : Add here a map with all the destinations
    return (
        <Paper
            style={{
                height: "100%",
                display: "flex",
                backgroundColor: "#DDD",
                boxSizing: "border-box",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
            }}
        >
            Display Map Here
        </Paper>
    );
};
