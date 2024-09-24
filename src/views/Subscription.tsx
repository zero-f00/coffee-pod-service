import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Subscription.css';

const Subscription: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>('週契約プラン');
    const navigate = useNavigate();

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlan(event.target.value);
    };

    const handleSubscribe = () => {
        navigate(`/order?plan=${selectedPlan}`);
    };

    return (
        <div className="subscription-page">
            <h1>定期配送プラン</h1>
            <p>お好みに合わせて週契約または月契約プランを選択してください。</p>

            <div className="plan-options">
                <label className={`plan-option ${selectedPlan === '週契約プラン' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="subscriptionPlan"
                        value="週契約プラン"
                        checked={selectedPlan === '週契約プラン'}
                        onChange={handlePlanChange}
                        className="radio-input"
                    />
                    <div className="plan-details">
                        <h2>週契約プラン</h2>
                        <p>毎週新鮮なコーヒーをお届けします。<br />料金: 4000円/月</p>
                    </div>
                </label>

                <label className={`plan-option ${selectedPlan === '月契約プラン' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="subscriptionPlan"
                        value="月契約プラン"
                        checked={selectedPlan === '月契約プラン'}
                        onChange={handlePlanChange}
                        className="radio-input"
                    />
                    <div className="plan-details">
                        <h2>月契約プラン</h2>
                        <p>毎月新鮮なコーヒーをお届けします。<br />料金: 3500円/月</p>
                    </div>
                </label>
            </div>

            <button className="subscribe-button" onClick={handleSubscribe}>
                このプランで注文する
            </button>
        </div>
    );
};

export default Subscription;
