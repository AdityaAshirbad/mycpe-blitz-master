import React from 'react';
import '../../styles/Common.css';

export const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-ring"></div>
    </div>
  );
};

export const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            x
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export const Toast = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={`toast toast-${type}`}>{message}</div>;
};

export const ErrorBoundary = ({ error, retry }) => {
  return (
    <div className="error-boundary">
      <div className="error-icon">!</div>
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
      <button className="btn btn-primary" onClick={retry}>
        Try Again
      </button>
    </div>
  );
};
