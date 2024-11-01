import "./SignupSuccessPopup.css";

function SignupSuccessPopup(onSignInClick) {
  return (
    <div className="success-popup__container">
      <h2 className="success-popup__message">
        Registration successfully completed!
      </h2>
      <span className="signin__link--text" onClick={onSignInClick}>
        Sign in
      </span>
    </div>
  );
}

export default SignupSuccessPopup;
