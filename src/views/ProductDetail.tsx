import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';
import RadarChart from '../components/RadarChart';
import { getAuth } from 'firebase/auth';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // 画面遷移時にページを上部にスクロール
        window.scrollTo(0, 0);
    }, []);


    // 商品データ（仮）
    const products = {
        'dark-roast': {
            productName: '深煎りブレンド',
            productDescription: '力強い苦味と豊かなコク。深い味わいをお楽しみください。',
            blendDescription: '深煎りは、力強い苦味と豊かなコクが特徴。ダークチョコレートやスモーキーな風味が楽しめます。',
            flavorProfile: { acidity: 1, bitterness: 4, sweetness: 2, body: 5, aftertaste: 4 },
        },
        'medium-roast': {
            productName: '中煎りブレンド',
            productDescription: '酸味と苦味の絶妙なバランス。ナッツのような香ばしさが広がります。',
            blendDescription: '中煎りは、酸味と苦味のバランスが絶妙で、ナッツの香ばしさが特徴です。',
            flavorProfile: { acidity: 3, bitterness: 3, sweetness: 4, body: 3, aftertaste: 3 },
        },
        'light-roast': {
            productName: '浅煎りブレンド',
            productDescription: 'フルーティな酸味が特徴の軽やかで爽やかな一杯。',
            blendDescription: '浅煎りは、フルーティで爽やかな酸味が特徴。ベリーやシトラスのような風味を楽しめます。',
            flavorProfile: { acidity: 5, bitterness: 1, sweetness: 4, body: 2, aftertaste: 3 },
        }
    };

    const product = products[productId as keyof typeof products];

    const handleOrder = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            navigate(`/order/${productId}`);
        } else {
            navigate(`/login?redirect=/order/${productId}`);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    if (!product) {
        return (
            <div className="product-detail">
                <h1>商品が見つかりませんでした。</h1>
                <button className="back-button" onClick={() => navigate('/')}>戻る</button>
            </div>
        );
    }

    return (
        <>
            <button className="back-button" onClick={handleBackClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className="product-detail card">
                <h1 className="product-title">{product.productName}</h1>
                <p className="product-description">{product.productDescription}</p>

                <div className="blend-description card-section">
                    <h3>ブレンドの特徴</h3>
                    <p>{product.blendDescription}</p>
                </div>

                <div className="flavor-profile card-section">
                    <h3>風味プロフィール</h3>
                    <RadarChart flavorProfile={product.flavorProfile} />
                </div>

                <div className="service-details card-section">
                    <h3>定期便サービスについて</h3>
                    <p>
                        当サービスでは、ホット・アイスのドリップコーヒーをポッドに入れ、指定の場所に配達します。
                        1週間または1ヶ月のプランが選択可能で、1日1回または2回（午前・午後）の配達が希望できます。
                    </p>
                    <p>
                        1日2回の配達を希望された場合、最大で週10回、または月40回の配達が可能です。<br />

                        前もって予約があれば、土日祝日も対応いたします。
                    </p>
                </div>

                <div className="price-details card-section">
                    <h3>料金体系</h3>
                    <ul className="price-list">
                        <li><strong>1ポッドあたり:</strong> 1500円</li>
                        <li><strong>定期便（週プラン）:</strong> 最大5回〜10回の配達</li>
                        <li><strong>定期便（月プラン）:</strong> 最大20回〜40回の配達</li>
                        <li><strong>1日2回（午前・午後）の配達オプションも選択可能です。</strong></li>
                    </ul>
                    <p>プランやオプションの詳細は注文画面でお選びいただけます。</p>
                </div>

                <button className="order-button" onClick={handleOrder}>注文する</button>
            </div>
        </>
    );
}


export default ProductDetail;