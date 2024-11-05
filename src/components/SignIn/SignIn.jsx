import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function SignIn({ isOpen, onClose, onSignUpClick, handleSignIn }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const onSignInSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSignIn(values);
    }
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onLinkClick={onSignUpClick}
      title="Sign in"
      buttonText="Sign in"
      showLink={true}
      linkText="Sign up"
      isSubmitDisabled={!isValid}
      onSubmit={onSignInSubmit}
    >
      <label htmlFor="email-login" className="modal__label modal__label--email">
        Email{""}
        <span className="modal__error">{errors.email}</span>
        <input
          className="modal__input"
          id="email-login"
          name="email"
          placeholder="Enter email"
          type="email"
          value={values.email || ""}
          required
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="password-login"
        className="modal__label modal__label--password"
      >
        Password{""}
        <span className="modal__error">{errors.password}</span>
        <input
          type="password"
          className="modal__input"
          id="password-login"
          name="password"
          placeholder="Enter password"
          value={values.password || ""}
          required
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SignIn;
