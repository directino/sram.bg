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
                            <h4>Адрес</h4>
                            <ul className="list-unstyled">
                                <li>София 1799</li>
                                <li>ж.к. Младост 4, бул.</li>
                                <li>Александър Малинов № 78</li>
                                <li>+359899 55 55 92</li>
                            </ul>
                        </div>
                        {/* Column 2*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Информация</h4>
                            <ul className="list-unstyled">
                                <li><Link to="/contact">Връзка с нас</Link></li>
                                <li><Link to="/info">Как работи сайта?</Link></li>
                            </ul>
                        </div>
                        {/* Column 3*/}
                        <div className="col-md-6 col-sm-6">
                            <h4>За проекта</h4>
                            <ul className="list-unstyled">
                                <li>Това е изпитният проект на Александър Митев за модула React (Single Page Application) в СофтУни.</li>
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
        color: #B8C1CD;
      }
    
    ul li a:hover {
         color: #B8C1CD;
    }
`;