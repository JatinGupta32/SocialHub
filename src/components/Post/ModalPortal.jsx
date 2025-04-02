import ReactDOM from "react-dom";

const ModalPortal = ({ onClose,children }) => {
  return ReactDOM.createPortal(
    <div onClick={onClose} className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      {children}
    </div>,
    document.body
  );
};

export default ModalPortal;
