import "./SignupSuccessPopup.css";

function SignupSuccessPopup(onSignInClick, onClose) {
  return (
    <div className="success-popup">
      <div className="success-popup__container">
        <button className="success-popup__close-btn" onClick={onClose}></button>
        <div className="success-popup__content">
          <h2 className="success-popup__message">
            Registration successfully completed!
          </h2>
          <span className="success-popup__link" onClick={onSignInClick}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccessPopup;
