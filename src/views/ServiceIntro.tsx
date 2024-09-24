import '../styles/ServiceIntro.css';
import React, { useState } from 'react';
import Dialog from 'components/Dialog';

const ServiceIntro: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({ title: '', content: '' });

    const openDialog = (title: string, content: string) => {
        setDialogContent({ title, content });
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <section className="service-intro">
            <h2>JavaPodとは？</h2>
            <div className="service-content">
                <p className="intro-text">
                    JavaPodは、毎日を彩る新しいコーヒー体験をお届けするサービスです。
                    <br />
                    選べる3つの焙煎、そしてホット・アイスのカスタマイズオプションで、あなたの好みにぴったりの一杯を。
                    <br />
                    オフィスでも自宅でも、手軽に特別なコーヒータイムを楽しめます。
                </p>

                <ul className="service-features">
                    <li onClick={() => openDialog('3つの焙煎', 'コク深い深煎りから、フルーティな浅煎りまで、あなた好みの一杯が選べます。')}>
                        <i className="fas fa-coffee"></i> 自分に合った焙煎を選ぶ
                    </li>
                    <li onClick={() => openDialog('カスタマイズオプション', 'その日の気分に合わせて、ホット・アイスをお選びいただけます。どんなシーンでも最適な一杯をお楽しみいただけます。')}>
                        <i className="fas fa-thermometer-half"></i> ホット・アイスの自由な選択
                    </li>
                    <li onClick={() => openDialog('便利なデリバリー', 'オフィスや自宅へ直接お届け。ライフスタイルに合わせて簡単に楽しめます。')}>
                        <i className="fas fa-shipping-fast"></i> 手軽に届くデリバリー
                    </li>
                    <li onClick={() => openDialog('ポッド形式', '鮮度を保つポッド形式で、いつでも新鮮なコーヒーをお楽しみいただけます。')}>
                        <i className="fas fa-cup-togo"></i> 新鮮さを保つポッド形式
                    </li>
                </ul>


            </div>

            {/* ダイアログの呼び出し */}
            <Dialog isOpen={dialogOpen} onClose={closeDialog} title={dialogContent.title}>
                <p>{dialogContent.content}</p>
            </Dialog>
        </section>
    );
};

export default ServiceIntro;
