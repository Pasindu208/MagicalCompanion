import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

const SortingQ = () => {
    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Typography level="title-md">
                        Outlined card (default)
                    </Typography>
                    <Typography>Description of the card.</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default SortingQ;
