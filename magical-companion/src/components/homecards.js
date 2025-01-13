import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
// import Grid from '@mui/material/Grid';
import wand from "../assets/wand.png";
import quill from "../assets/quill.png";
import character from "../assets/character.png";
import house from "../assets/house.png";
import movies from "../assets/train.png";
import { useNavigate } from "react-router-dom";
import styles from "../styles/homecards.module.scss";
import hp from "../assets/hp.png";
import sorting_hat from "../assets/sorting_hat.png";

export default function ActionAreaCard() {
    const navigate = useNavigate();

    const cards = [
        {
            image: wand,
            title: "Spells",
            path: "/spells",
        },
        {
            image: character,
            title: "Characters",
            path: "/characters",
        },
        {
            image: quill,
            title: "Books",
            path: "/books",
        },
        {
            image: movies,
            title: "Movies",
            path: "/movies",
        },
        {
            image: house,
            title: "Houses",
            path: "/houses",
        },
        {
            image: hp,
            title: "Chat",
            path: "/chat",
        },
        {
            image: sorting_hat,
            title: "Sorting",
            path: "/sorting",
        },
    ];

    return (
        <Box className={styles.container}>
            <div className={styles.gridContainer}>
                {cards.map((card, index) => (
                    <Card className={styles.card} key={index}>
                        <CardActionArea
                            className={styles.cardAction}
                            onClick={() => navigate(card.path)}>
                            <CardMedia
                                component="img"
                                image={card.image}
                                alt={card.title}
                                className={styles.cardMedia}
                            />
                            <CardContent className={styles.cardContent}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    align="center">
                                    {card.title}
                                </Typography>
                                {card.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}>
                                        {card.description}
                                    </Typography>
                                )}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </Box>
    );
}
