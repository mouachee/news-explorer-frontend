import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({
  buttonText,
  title,
  onClose,
  isOpen,
  showLink,
  linkText,
  onLinkClick,
  children,
  onSubmit,
  isSubmitDisabled,
}) {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal name="with-form" isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        <div className="modal__actions">
          <button
            className={`modal__submit ${
              isSubmitDisabled ? "modal__submit--disabled" : ""
            }`}
            disabled={isSubmitDisabled}
            type="submit"
          >
            {buttonText}
          </button>
          {showLink && (
            <span className="modal__link">
              or{" "}
              <span className="modal__link--text" onClick={onLinkClick}>
                {" "}
                {linkText}
              </span>
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
