import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function SignUp({ isOpen, onClose, onSignInClick }) {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  const onSingUpSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onLinkClick={onSignInClick}
      title="Sign up"
      buttonText="Sign up"
      showLink={true}
      linkText="Sign in"
      onSubmit={onSingUpSubmit}
    >
      <label
        htmlFor="email-singup"
        className="modal__label modal__label--email"
      >
        Email {""}
        <span className="modal__error">{errors.email}</span>
        <input
          type="email"
          className="modal__input"
          id="email-singup"
          name="email"
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="password-singup"
        className="modal__label modal__label--password"
      >
        Password {""}
        <span className="modal__error">{errors.password}</span>
        <input
          type="password"
          className="modal__input"
          id="password-singup"
          name="password"
          placeholder="Enter password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="username-singup"
        className="modal__label modal__label--username"
      >
        Username {""}
        <span className="modal__error">{errors.username}</span>
        <input
          type="text"
          className="modal__input"
          id="username-singup"
          name="username"
          placeholder="Enter username"
          required
          value={values.username || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SignUp;
