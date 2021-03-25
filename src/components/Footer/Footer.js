import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <FooterContainer>
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/* Column 1*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Контакти</h4>
                            <ul className="list-unstyled">
                                <li>София 1000</li>
                                <li>ул. "Тинтява" 14</li>
                                <li>тел: 0888 888888</li>
                            </ul>
                        </div>
                        {/* Column 2*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Линкове</h4>
                            <ul className="list-unstyled">
                                <li><Link to="/">Нещо</Link></li>
                                <li><Link to="/">Друго</Link></li>
                            </ul>
                        </div>
                        {/* Column 3*/}
                        <div className="col-md-6 col-sm-6">
                            <h4>За проекта</h4>
                            <ul className="list-unstyled">
                                <li>Това е изпитният проект на Александър Митев за модула React в СофтУни.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Social */}
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} Sram.bg - Всички права запазени!
                    </p>
                </div>
            </div>
            </div>
        </FooterContainer >
    );
}

export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--blue);
        padding-top: 3rem;
        color: var(--white)
    }

    .footer-bottom {
        padding-top: 3rem;
        padding-bottom: 2rem;
    }

    ul li a {
        color: #B7BFC4;
      }
    
    ul li a:hover {
         color:var(--white)
    }
`;