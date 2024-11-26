import React from 'react';
import './Footer.css'; 

function Footer(propietats) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} {propietats.company || 'FeelReel'}. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/contact">Contact</a>
                    <a href="/help">Help</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
