import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import '../styles/Header.css';
import logo from '../assets/logo.png';

interface HeaderProps {
    scrollToProducts: () => void;
    scrollToFAQ: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToProducts, scrollToFAQ }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth(); // Firebase authのインスタンスを取得

    const [shouldScrollToProducts, setShouldScrollToProducts] = useState(false);
    const [shouldScrollToFAQ, setShouldScrollToFAQ] = useState(false);

    // Firebaseのログイン状態を監視
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleProductsClick = () => {
        closeMenu();
        if (location.pathname !== '/') {
            setShouldScrollToProducts(true);
            navigate('/');
        } else {
            scrollToProducts();
        }
    };

    const handleFAQClick = () => {
        closeMenu();
        if (location.pathname !== '/faq') {
            setShouldScrollToFAQ(true);
            navigate('/faq');
        } else {
            scrollToFAQ();
        }
    };

    useEffect(() => {
        if (shouldScrollToProducts && location.pathname === '/') {
            scrollToProducts();
            setShouldScrollToProducts(false);
        }
    }, [location, shouldScrollToProducts, scrollToProducts]);

    useEffect(() => {
        if (shouldScrollToFAQ && location.pathname === '/faq') {
            scrollToFAQ();
            setShouldScrollToFAQ(false);
        }
    }, [location, shouldScrollToFAQ, scrollToFAQ]);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="JavaPod Logo" className="logo-img" />
                    <span className="logo-text">JavaPod</span>
                </Link>
            </div>
            <button className="menu-icon" onClick={toggleMenu}>
                &#9776;
            </button>

            <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <a onClick={handleProductsClick}>商品</a>
                <Link to="/about" onClick={closeMenu}>サービスについて</Link>
                <a onClick={handleFAQClick}>よくある質問</a>
                <Link to="/contact" onClick={closeMenu}>お問い合わせ</Link>
                <Link to="/survey" onClick={closeMenu}>アンケート</Link>

                {/* ログイン状態による表示の切り替え */}
                {user ? (
                    <>
                        {/* ユーザーのアイコンを表示し、タップでマイページへ遷移 */}
                        <div className="user-icon-container" onClick={() => navigate('/my-page')}>
                            <img src={user.photoURL || '/default-avatar.png'} alt="User Icon" className="user-icon" />
                        </div>
                    </>
                ) : (
                    <Link to="/login" onClick={closeMenu}>はじめる</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
