import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Products.css';

const Products = () => {
    const navigate = useNavigate();

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>商品一覧</h1>
                <p>すべての商品はホットとアイスから選べます。</p>
            </div>

            <div className="products-container">
                {/* コーヒー豆の種類1 - 深煎り */}
                <div
                    className="product-item"
                    onClick={() => handleCardClick('/products/dark-roast')}
                >
                    <h2>深煎りブレンド</h2>
                </div>

                {/* コーヒー豆の種類2 - 中煎り */}
                <div
                    className="product-item"
                    onClick={() => handleCardClick('/products/medium-roast')}
                >
                    <h2>中煎りブレンド</h2>
                </div>

                {/* コーヒー豆の種類3 - 浅煎り */}
                <div
                    className="product-item"
                    onClick={() => handleCardClick('/products/light-roast')}
                >
                    <h2>浅煎りブレンド</h2>
                </div>
            </div>
        </div>
    );
};

export default Products;
