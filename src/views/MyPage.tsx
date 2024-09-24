import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css';

const MyPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login'); // ログインしていない場合はログイン画面にリダイレクト
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login'); // ログアウト後はログイン画面にリダイレクト
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-page-container">
            <div className="user-info">
                <img src={user?.photoURL} alt="Profile" className="profile-image" />
                <h2>{user?.displayName}</h2>
                <p>{user?.email}</p>
            </div>

            <div className="subscription-info">
                <h3>現在の契約プラン</h3>
                {/* ここにユーザーのプラン情報を表示 */}
                <p>1ヶ月契約 - 次回配達日: 2024/09/30</p>
                <button className="change-plan-btn">プランを変更する</button>
            </div>

            <div className="order-history">
                <h3>注文履歴</h3>
                {/* 過去の注文履歴を表示 */}
                <ul>
                    <li>2024/09/15 - 深煎りブレンド (2Lポッド)</li>
                    <li>2024/09/08 - 中煎りブレンド (2Lポッド)</li>
                </ul>
            </div>

            <button onClick={handleLogout} className="logout-btn">ログアウト</button>
        </div>
    );
};

export default MyPage;
