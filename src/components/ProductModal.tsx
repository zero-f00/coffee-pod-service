import React from 'react';
import '../styles/ProductModal.css'; // スタイルを別途用意

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    productDescription: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    productName,
    productDescription,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <h2>{productName}</h2>
                <p>{productDescription}</p>
            </div>
        </div>
    );
};

export default ProductModal;
