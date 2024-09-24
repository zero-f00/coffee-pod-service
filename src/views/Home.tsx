import React from 'react';
import '../styles/Home.css';
import Products from './Products';
import ServiceIntro from './ServiceIntro';

interface HomeProps {
    productsSectionRef: React.RefObject<HTMLElement>;
}

const Home: React.FC<HomeProps> = ({ productsSectionRef }) => {
    return (
        <div className="home-page">
            {/* ヒーローセクション */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>あなたの日常に寄り添う、特別なコーヒー。</h1>
                    <p>どこにいても、JavaPodの新鮮で本格的なコーヒーを手軽に楽しめます。オフィスや家庭でも、最高のコーヒー体験をお届けします。</p>
                </div>
            </section>

            {/* サービス紹介セクション */}
            <ServiceIntro />

            {/* Why JavaPod? セクション */}
            <section className="why-javapod">
                <h2>Why JavaPod?</h2>
                <div className="why-content">
                    <div className="why-feature">
                        <h3>新鮮で豊かな味わい</h3>
                        <p>JavaPodでは、厳選されたコーヒー豆を使い、新鮮なドリップコーヒーをポッド形式でお届け。コンビニでは味わえない深みのある体験ができます。</p>
                    </div>
                    <div className="why-feature">
                        <h3>豊富なカスタマイズオプション</h3>
                        <p>3つの焙煎と、ホット・アイスのオプションから自分好みの一杯を選べます。忙しい日常でも、自分だけの一杯を手軽に楽しめるのがJavaPodの魅力です。</p>
                    </div>
                    <div className="why-feature">
                        <h3>手軽さと利便性</h3>
                        <p>家やオフィスに直接デリバリー。注文は簡単で、いつでもどこでも本格的なコーヒーを楽しむことができます。定期配送プランもあり、安定して新鮮なコーヒーをお届けします。</p>
                    </div>
                </div>
            </section>

            {/* 商品紹介セクション */}
            <section ref={productsSectionRef} className="product-section">
                <Products />
            </section>

            {/* 定期配送プラン紹介セクション */}
            <section className="subscription-section">
                <h2>定期配送プラン</h2>
                <p>ライフスタイルに合わせて、毎日新鮮なコーヒーを定期的にお届けします。</p>
                <a href="/subscription" className="cta-button">プランを確認する</a>

                {/* 定期配送のイメージ画像 */}
                <div className="image-container">
                    <img src="../assets/subscription-delivery.png" alt="定期配送イメージ" />
                </div>
            </section>
        </div>
    );
};

export default Home;
