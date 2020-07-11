import React, { Component } from 'react'

// Components
import HomeSlider from '../components/Home/HomeSlider';
import Navbar from '../components/layout/Navbar';
import Copyright from '../components/Copyright/Copyright'
import CardBlock from '../util/card_block';

// react-animations
import styled, { keyframes } from 'styled-components';
import { fadeInLeftBig } from 'react-animations';

const FadeInLeftBig = styled.div`animation: 3s ${keyframes`${fadeInLeftBig}`}`;

class landing extends Component {
    
    state = {
        cards: [
            {
                "name": "Roman Empire",
                "images": [
                    { "url": "/images/slider5.jpg" }
                ]
            },
            {
                "name": "American Revolution",
                "images": [
                    { "url": "/images/slider4.jpg" }
                ]
            },
            {
                "name": "World War II",
                "images": [
                    { "url": "/images/slider6.jpg" }
                ]
            }
        ]
    }

    render() {
        return (
            <div>
                <Navbar/>
                <HomeSlider />
                <FadeInLeftBig>
                    <CardBlock
                        list={this.state.cards}
                        title="Featured Timelines"
                    />
                </FadeInLeftBig>
                <Copyright />
            </div>
        )
    }
}

export default landing