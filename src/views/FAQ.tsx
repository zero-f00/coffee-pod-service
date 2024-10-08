import '../styles/FAQ.css';

const FAQ = () => {
    return (
        <div className="faq-page">
            <h1>よくある質問</h1>

            <div className="faq-item">
                <h2>配達エリアはどこですか？</h2>
                <p>現在は地域限定での配達を行っています。サービス対象地域内でのみご注文を承りますが、今後エリアの拡大を検討しています。</p>
            </div>

            <div className="faq-item">
                <h2>どのように注文できますか？</h2>
                <p>注文はオンラインで簡単に行えます。ご希望のコーヒーの種類と個数を選び、配達日を指定して注文を確定してください。</p>
            </div>

            <div className="faq-item">
                <h2>注文後どれくらいで届きますか？</h2>
                <p>通常、ご注文いただいた翌日の朝にコーヒーを配達いたします。朝の配達後、夕方にポッドの回収または交換を行います。</p>
            </div>

            <div className="faq-item">
                <h2>支払い方法はどのようになりますか？</h2>
                <p>現在、支払いは現金のみ対応しています。初回配達時に料金をお支払いいただき、以降の支払いは毎週または毎月まとめて現金で受け付けます。</p>
            </div>

            <div className="faq-item">
                <h2>定期契約は可能ですか？</h2>
                <p>はい、1週間ごとの契約と1ヶ月ごとの契約からお選びいただけます。契約内容に応じて、定期的にコーヒーを配達し、使用済みポッドを回収いたします。</p>
            </div>

            <div className="faq-item">
                <h2>ホットとアイスの両方を注文できますか？</h2>
                <p>はい、3つの焙煎（深煎り、中煎り、浅煎り）から選び、ホットとアイスの両方をご注文いただけます。</p>
            </div>

        </div>
    );
};

export default FAQ;
