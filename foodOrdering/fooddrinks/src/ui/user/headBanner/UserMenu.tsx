"use client"

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import styles from '../headBanner/Slideshow.module.css';

const items = [
    {
        image: '/burger.png',
        title: 'Order Burgers'
    },
    {
        image: '/burgerFries.png',
        title: 'Order Burgers & Fries'
    },
    {
        image: '/cheesepizz.png',
        title: 'Order Pizzas'
    },
    {
        image: '/chicken.png',
        title: 'Order Fried Chicken'
    },
    {
        image: '/fries.png',
        title: 'Order Fries'
    },
    {
        image: '/pizzas.png',
        title: 'Order Pizzas'
    }
];

function Slideshow() {
    return (
        <Carousel
            interval={5000}
            animation="slide"
            indicators={true}
            navButtonsAlwaysVisible={true} >
            {items.map((item, index) => (
                <Paper key={index} className={styles.paper}>
                    <img src={item.image} alt={item.title} className={styles.image} />
                    <div className={styles.caption}>{item.title}</div>
                </Paper>
            ))}
        </Carousel>
    );
}

export default Slideshow;
