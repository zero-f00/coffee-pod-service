import OrderService from '../services/OrderService';
import { useNavigate } from 'react-router-dom';

export const useOrderController = () => {
    const navigate = useNavigate();

    // 注文データを保存する関数
    const saveOrder = async (orderData: any) => {
        try {
            await OrderService.saveOrder(orderData);
            navigate('/confirmation');  // 注文完了画面へ遷移
        } catch (error) {
            alert('注文の保存に失敗しました。');
        }
    };

    return { saveOrder };
};
