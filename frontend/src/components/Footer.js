import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* <h3>Created by Vyom Singh</h3> */}
            <div className='socials'>
                <a href='https://www.linkedin.com/in/vyom-singh/' target='_blank'rel='noopener noreferrer'>
                    <LinkedInIcon /> 
                </a>

                <a href='https://github.com/singhvyom' target='_blank'rel='noopener noreferrer'>
                    <GitHubIcon />
                </a> 
            </div>
            <p> &copy; 1992-2024 Olympics Data</p>
        </div>
    );
}

export default Footer;