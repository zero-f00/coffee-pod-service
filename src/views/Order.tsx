import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '../components/Dialog';
import Holidays from 'date-holidays'; // 祝日計算のライブラリを使用
import '../styles/Order.css';

const OrderView: React.FC = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const initialQuantities: { [key: string]: { hotMorning: number; hotAfternoon: number; coldMorning: number; coldAfternoon: number } } = {
        'dark-roast': { hotMorning: 0, hotAfternoon: 0, coldMorning: 0, coldAfternoon: 0 },
        'medium-roast': { hotMorning: 0, hotAfternoon: 0, coldMorning: 0, coldAfternoon: 0 },
        'light-roast': { hotMorning: 0, hotAfternoon: 0, coldMorning: 0, coldAfternoon: 0 }
    };

    const [quantities, setQuantities] = useState(initialQuantities);
    const [selectedProductId, setSelectedProductId] = useState<string>('dark-roast');
    const [selectedPlan, setSelectedPlan] = useState<string>('weekly'); // 追加：プランの選択状態
    const [orderDetails, setOrderDetails] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<{ title: string; content: string | JSX.Element }>({
        title: '',
        content: '',
    });
    const [isErrorDialog, setIsErrorDialog] = useState(false);
    const [weeklyTotalPrice, setWeeklyTotalPrice] = useState(0);
    const [monthlyTotalPrice, setMonthlyTotalPrice] = useState(0);

    const products = {
        'dark-roast': { productName: '深煎りブレンド', price: 1200 },
        'medium-roast': { productName: '中煎りブレンド', price: 1000 },
        'light-roast': { productName: '浅煎りブレンド', price: 1100 }
    };

    const currentProduct = products[selectedProductId as keyof typeof products];
    const { hotMorning, hotAfternoon, coldMorning, coldAfternoon } = quantities[selectedProductId];

    const totalPodsAcrossProducts = Object.values(quantities).reduce(
        (sum, { hotMorning, hotAfternoon, coldMorning, coldAfternoon }) =>
            sum + hotMorning + hotAfternoon + coldMorning + coldAfternoon,
        0
    );

    const maxReached = totalPodsAcrossProducts >= 10;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const totalPodCount = hotMorning + hotAfternoon + coldMorning + coldAfternoon;
        const businessDays = calculateBusinessDays(); // 営業日数を計算
        const { weeklyTotalPrice, monthlyTotalPrice } = calculatePrices(totalPodCount, currentProduct.price, businessDays);
        setWeeklyTotalPrice(weeklyTotalPrice);
        setMonthlyTotalPrice(monthlyTotalPrice);
    }, [hotMorning, hotAfternoon, coldMorning, coldAfternoon, currentProduct.price]);

    const calculateBusinessDays = () => {
        const hd = new Holidays('JP'); // 'JP'は日本の祝日
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // 0 が1月
        let businessDays = 0;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            const isWeekend = day.getDay() === 0 || day.getDay() === 6; // 日曜日か土曜日
            const isHoliday = hd.isHoliday(day); // 祝日判定

            if (!isWeekend && !isHoliday) {
                businessDays++;
            }
        }

        return businessDays;
    };

    const calculatePrices = (totalPodCount: number, pricePerPod: number, businessDays: number) => {
        return {
            weeklyTotalPrice: totalPodCount * pricePerPod * (businessDays / 4), // 営業日数を考慮
            monthlyTotalPrice: totalPodCount * pricePerPod * businessDays // 営業日数に基づく料金
        };
    };

    const handleSlideChange = (newProductId: string) => {
        setSelectedProductId(newProductId);
    };

    const handleSliderChange = (newQuantity: number, type: string) => {
        const product = quantities[selectedProductId];
        let newTotalPods = totalPodsAcrossProducts;

        if (type === "hotMorning") newTotalPods = newTotalPods - product.hotMorning + newQuantity;
        if (type === "hotAfternoon") newTotalPods = newTotalPods - product.hotAfternoon + newQuantity;
        if (type === "coldMorning") newTotalPods = newTotalPods - product.coldMorning + newQuantity;
        if (type === "coldAfternoon") newTotalPods = newTotalPods - product.coldAfternoon + newQuantity;

        if (newTotalPods <= 10) {
            setQuantities(prev => ({
                ...prev,
                [selectedProductId]: {
                    ...prev[selectedProductId],
                    [type]: newQuantity
                }
            }));
        }
    };

    const handleAddToOrder = () => {
        const totalPodsSelected = hotMorning + hotAfternoon + coldMorning + coldAfternoon;

        const existingOrderIndex = orderDetails.findIndex((order) => order.productId === selectedProductId);

        if (totalPodsAcrossProducts > 10) {
            setDialogContent({
                title: '数量エラー',
                content: '1日に注文できるポッド数は最大10個までです。',
            });
            setIsErrorDialog(true);
            setIsDialogOpen(true);
            return;
        }

        const updatedOrderDetails = [...orderDetails];

        if (existingOrderIndex > -1) {
            updatedOrderDetails[existingOrderIndex] = {
                ...updatedOrderDetails[existingOrderIndex],
                hotMorning,
                hotAfternoon,
                coldMorning,
                coldAfternoon,
                price: (hotMorning + hotAfternoon + coldMorning + coldAfternoon) * currentProduct.price
            };
        } else {
            updatedOrderDetails.push({
                productId: selectedProductId,
                productName: currentProduct.productName,
                price: (hotMorning + hotAfternoon + coldMorning + coldAfternoon) * currentProduct.price,
                hotMorning,
                hotAfternoon,
                coldMorning,
                coldAfternoon,
                orderDate: new Date().toISOString(),
            });
        }

        setOrderDetails(updatedOrderDetails);
        setDialogContent({
            title: 'カートが更新されました',
            content: (
                <div className="dialog-card">
                    <div className="dialog-card-header">
                        <h4>{currentProduct.productName}</h4>
                    </div>
                    <div className="dialog-card-body">
                        <div className="dialog-card-quantity">
                            <span>午前ホット: {hotMorning}個</span> / <span>午後ホット: {hotAfternoon}個</span><br />
                            <span>午前アイス: {coldMorning}個</span> / <span>午後アイス: {coldAfternoon}個</span>
                        </div>
                        <div className="dialog-card-price">
                            合計価格: {(hotMorning + hotAfternoon + coldMorning + coldAfternoon) * currentProduct.price}円
                        </div>
                    </div>
                </div>
            ),
        });

        setIsErrorDialog(false);
        setIsDialogOpen(true);
    };

    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlan(e.target.value); // プランの変更を反映
    };

    const handleRemoveOrder = (index: number) => {
        const updatedOrderDetails = [...orderDetails];
        const removedOrder = updatedOrderDetails.splice(index, 1)[0]; // 削除された注文

        setQuantities(prev => ({
            ...prev,
            [removedOrder.productId]: {
                hotMorning: prev[removedOrder.productId].hotMorning - removedOrder.hotMorning,
                hotAfternoon: prev[removedOrder.productId].hotAfternoon - removedOrder.hotAfternoon,
                coldMorning: prev[removedOrder.productId].coldMorning - removedOrder.coldMorning,
                coldAfternoon: prev[removedOrder.productId].coldAfternoon - removedOrder.coldAfternoon,
            }
        }));

        setOrderDetails(updatedOrderDetails);
    };

    const handleConfirmOrder = () => {
        if (orderDetails.length === 0) {
            setDialogContent({
                title: 'エラー',
                content: 'カートが空です。商品を追加してください。'
            });
            setIsDialogOpen(true);
            return;
        }

        setDialogContent({
            title: '注文確定',
            content: '注文が確定されました！'
        });

        setIsDialogOpen(true);

        // カートの内容をリセットする処理（オプション）
        setOrderDetails([]);
        setQuantities(initialQuantities); // スライダーの数量もリセット
    };

    return (
        <>
            <button className="back-button" onClick={() => navigate(`/products/${selectedProductId}`)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className="order-container">
                <h1 className="order-title">商品を選択する</h1>
                <div className="product-slide">
                    {Object.keys(products).map((productKey) => (
                        <button
                            key={productKey}
                            className={`product-button ${selectedProductId === productKey ? 'active' : ''}`}
                            onClick={() => handleSlideChange(productKey)}
                        >
                            {products[productKey as keyof typeof products].productName}
                        </button>
                    ))}
                </div>

                {/* 追加: プラン選択 UI */}
                <div className="plan-selection">
                    <label htmlFor="plan-select">プランを選択:</label>
                    <select id="plan-select" value={selectedPlan} onChange={handlePlanChange}>
                        <option value="weekly">週プラン</option>
                        <option value="monthly">月プラン</option>
                    </select>
                </div>

                <h2 className="order-product-name">{currentProduct.productName}</h2>

                <div className="order-summary">
                    <div className="pod-price-info">
                        <p>1ポッドあたりの価格: <strong>{currentProduct.price}円</strong></p>
                    </div>

                    <div className="order-summary-item">
                        <p>1週間の合計金額</p>
                        <h2>{weeklyTotalPrice}円</h2>
                    </div>

                    <div className="order-summary-item">
                        <p>1ヶ月の合計金額</p>
                        <h2>{monthlyTotalPrice}円</h2>
                    </div>

                    <p className="price-detail">土日祝日を除く営業日に基づき計算しています。</p>
                </div>

                {/* 残り選択可能数の表示 */}
                <div className="remaining-info">
                    <p>残り {10 - totalPodsAcrossProducts} 個選択可能です</p>
                    {maxReached && <p className="error-message">これ以上選択できません</p>}
                </div>

                <div className="quantity-box">
                    <label>午前のホットの個数</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={hotMorning}
                        onChange={(e) => handleSliderChange(parseInt(e.target.value), 'hotMorning')}
                        className="quantity-slider"
                        disabled={maxReached && hotMorning === 0}
                    />
                    <span className="quantity-display">{hotMorning}</span>
                </div>

                <div className="quantity-box">
                    <label>午後のホットの個数</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={hotAfternoon}
                        onChange={(e) => handleSliderChange(parseInt(e.target.value), 'hotAfternoon')}
                        className="quantity-slider"
                        disabled={maxReached && hotAfternoon === 0}
                    />
                    <span className="quantity-display">{hotAfternoon}</span>
                </div>

                <div className="quantity-box">
                    <label>午前のアイスの個数</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={coldMorning}
                        onChange={(e) => handleSliderChange(parseInt(e.target.value), 'coldMorning')}
                        className="quantity-slider"
                        disabled={maxReached && coldMorning === 0}
                    />
                    <span className="quantity-display">{coldMorning}</span>
                </div>

                <div className="quantity-box">
                    <label>午後のアイスの個数</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={coldAfternoon}
                        onChange={(e) => handleSliderChange(parseInt(e.target.value), 'coldAfternoon')}
                        className="quantity-slider"
                        disabled={maxReached && coldAfternoon === 0}
                    />
                    <span className="quantity-display">{coldAfternoon}</span>
                </div>

                <p className="order-limit-note">
                    1日に注文できるポッド数は最大10個までです。<br />
                    {totalPodsAcrossProducts > 0 && (
                        <strong>現在 {totalPodsAcrossProducts} 個入っています。</strong>
                    )}
                </p>

                <button className="order-button" onClick={handleAddToOrder} disabled={hotMorning + hotAfternoon + coldMorning + coldAfternoon === 0}>
                    カートに保存
                </button>

                <div className="cart-summary">
                    <h3>カートの内容</h3>
                    {orderDetails.length === 0 ? (
                        <p>カートに商品がありません。</p>
                    ) : (
                        orderDetails.map((order, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-header">
                                    <h4>{order.productName}</h4>
                                    <button onClick={() => handleRemoveOrder(index)} className="remove-button">削除</button>
                                </div>
                                <div className="cart-item-details">
                                    <p>午前ホット: {order.hotMorning}個 / 午後ホット: {order.hotAfternoon}個</p>
                                    <p>午前アイス: {order.coldMorning}個 / 午後アイス: {order.coldAfternoon}個</p>
                                    <p className="cart-item-price">価格: {order.price}円</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {orderDetails.length > 0 && (
                    <button className="confirm-button" onClick={handleConfirmOrder}>
                        注文を確定する
                    </button>
                )}

                <Dialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    title={dialogContent.title}
                >
                    {isErrorDialog ? (
                        <p>{dialogContent.content}</p>
                    ) : (
                        <>{dialogContent.content}</>
                    )}
                </Dialog>
            </div>
        </>
    );
};

export default OrderView;
