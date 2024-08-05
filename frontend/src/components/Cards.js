import React from 'react';
import './Cards.css'
import CardItem from './CardItem';

function Cards(){
    return (
        <div className = 'cards'>
            <h1>Pick a Year to View Scores</h1>
            <div className = 'cards__container'>
                <div className = 'cards__wrapper'>
                    <ul className = 'cards__items'>
                        <CardItem
                            src = {require('../assets/images/2024-Paris-Olympics.webp')}
                            text = '2024'
                            label = 'Paris'
                            path = '/boxscores/2024'
                        />
                        <CardItem
                            src = {require('../assets/images/2020-Tokyo-Olympics.jpeg')}
                            text = '2020'
                            label = 'Tokyo'
                            path = '/boxscores/2020'
                        />
                        <CardItem
                            src = {require('../assets/images/2016-Rio-Olympics.jpeg')}
                            text = '2016'
                            label = 'Rio de Janeiro'
                            path = '/boxscores/2016'
                        />
                    </ul>
                    <ul className = 'cards__items'>
                        <CardItem
                            src = {require('../assets/images/2012-London-Olympics.jpeg')}
                            text = '2012'
                            label = 'London'
                            path = '/boxscores/2012'
                        />
                        <CardItem
                            src = {require('../assets/images/2008-Beijing-Olympics.avif')}
                            text = '2008'
                            label = 'Beijing'
                            path = '/boxscores/2008'
                        />
                        <CardItem
                            src = {require('../assets/images/2004-Athens-Olympics.jpeg')}
                            text = '2004'
                            label = 'Athens'
                            path = '/boxscores/2004'
                        />
                    </ul>
                    <ul className = 'cards__items'>
                        <CardItem
                            src = {require('../assets/images/2000-Sydney-Olympics.webp')}
                            text = '2000'
                            label = 'Sydney'
                            path = '/boxscores/2000'
                        />
                        <CardItem
                            src = {require('../assets/images/1996-Atlanta-Olympics.webp')}
                            text = '1996'
                            label = 'Atlanta'
                            path = '/boxscores/1996'
                        />
                        <CardItem
                            src = {require('../assets/images/1992-Barcelona-Olympics.avif')}
                            text = '1992'
                            label = 'Barcelona'
                            path = '/boxscores/1992'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;