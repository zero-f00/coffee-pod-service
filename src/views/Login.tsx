import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(true); // 新規ユーザーをデフォルトに
    const auth = getAuth();
    const navigate = useNavigate();

    // スクロールを無効化するロジック
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            const params = new URLSearchParams(window.location.search);
            const redirectTo = params.get('redirect') || '/my-page'; // デフォルトはマイページ
            navigate(redirectTo); // ログイン成功後、リダイレクトパスに遷移
        } catch (error) {
            setError(isNewUser ? "アカウントの作成に失敗しました。もう一度お試しください。" : "ログインに失敗しました。もう一度お試しください。");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-overlay">
                    <div className="login-content">
                        {/* アカウント作成をデフォルトで表示 */}
                        <h1 className="login-title">{isNewUser ? 'アカウントを作成' : 'ログイン'}</h1>
                        <p className="login-description">
                            JavaPodへようこそ。<br />
                            続行するにはGoogleで{isNewUser ? 'アカウントを作成' : 'ログイン'}してください。
                        </p>
                        <button className="google-login-btn" onClick={handleGoogleLogin}>
                            <img src="https://www.google.com/favicon.ico" alt="Googleファビコン" className="google-icon" />
                            <span>Googleで{isNewUser ? 'アカウントを作成' : 'ログイン'}</span>
                        </button>
                        {error && <p className="error-message">{error}</p>}

                        <div className="toggle-auth-option">
                            {isNewUser ? (
                                <>
                                    <p>すでにアカウントをお持ちですか？</p>
                                    <button onClick={() => setIsNewUser(false)} className="switch-auth-btn">ログインはこちら</button>
                                </>
                            ) : (
                                <>
                                    <p>アカウントをお持ちでないですか？</p>
                                    <button onClick={() => setIsNewUser(true)} className="switch-auth-btn">アカウント作成はこちら</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
