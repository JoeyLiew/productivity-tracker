import React from 'react';
import {
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__copyright'>
        <FaCopyright className='footer__copyright-icon' />
        <span className='footer__copyright-text'>All Rights Reserved.</span>
      </div>
      <div className='footer__socials'>
        <a
          href='https://www.facebook.com/'
          alt='facebook'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaFacebook className='footer__social-icon' />
        </a>
        <a
          href='https://www.instagram.com/'
          alt='instagram'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram className='footer__social-icon' />
        </a>
        <a
          href='https://www.twitter.com/'
          alt='twitter'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaTwitter className='footer__social-icon' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
