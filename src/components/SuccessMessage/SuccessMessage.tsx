import './SuccessMessage.scss';

export const SuccessMessage = () => {
  return (
    <div className="module__success success">
      <div className="success__icon">✓</div>
      <h1 className="success__title">Success!</h1>
      <p className="success__message">You have successfully logged into your account</p>
    </div>
  );
};