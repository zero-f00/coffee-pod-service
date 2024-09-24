import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Dialog.css';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;  // children を追加
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{title}</h2>
                <div className="dialog-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
export default Dialog;
