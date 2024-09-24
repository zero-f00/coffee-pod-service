import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';


// サービス層：データをFirestoreに保存する
const OrderService = {
    saveOrder: async (orderData: any) => {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("ユーザーがログインしていません。");
        }

        const orderRef = doc(db, 'orders', user.uid);  // ユーザーIDごとに注文を保存

        try {
            await setDoc(orderRef, orderData, { merge: true });
            console.log("注文データが保存されました。");
        } catch (error) {
            console.error("注文データの保存に失敗しました: ", error);
            throw error;
        }
    }
};

export default OrderService;
