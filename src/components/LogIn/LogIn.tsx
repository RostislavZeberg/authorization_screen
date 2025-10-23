import { Button } from '../Button';
import { useLoginForm } from '../../hooks/useLoginForm';
import email from '../../assets/images/email.svg';
import password from '../../assets/images/password.svg';
import './LogIn.scss';

interface LogInProps {
  onSuccess?: (requires2FA: boolean) => void;
}

export const LogIn = ({ onSuccess }: LogInProps) => {
  const {
    errors,
    formData,
    loginMutation,
    handleChange,
    handleSubmit,
    getErrorMessage,
    isFormFilled,
    apiError,
    showValidationErrors
  } = useLoginForm({ onSuccess });

  return (
    <div className="module__login login">
      <h1 className='login__title'>Sign in to your account to continue</h1>
      
      {/* Общие ошибки валидации */}
      {showValidationErrors && (
        <div className="error-message error-message--general">
          Please correct the errors below
        </div>
      )}

      {/* API ошибки */}
      {apiError && (
        <div className="error-message error-message--general">
          {getErrorMessage(apiError)}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="login__form form"
        noValidate
      >
        <div className={`form__input ${(errors.email && showValidationErrors) ? 'form__input--error' : ''}`}>
          <img src={email} alt="Icon email" className="icon" />
          <input
            value={formData.email}
            onChange={handleChange}
            id="user-email"
            name="email"
            type="text"
            className="input"
            placeholder='Email'
            autoComplete="email"
          />
          {errors.email && showValidationErrors && (
            <div className="error-message error-message--field">
              {errors.email}
            </div>
          )}
        </div>

        <div className={`form__input ${(errors.password && showValidationErrors) ? 'form__input--error' : ''}`}>
          <img src={password} alt="Icon password" className="icon" />
          <input
            value={formData.password}
            onChange={handleChange}
            id="user-password"
            name="password"
            type="password"
            className="input"
            placeholder='Password'
            autoComplete="current-password"
          />
          {errors.password && showValidationErrors && (
            <div className="error-message error-message--field">
              {errors.password}
            </div>
          )}
        </div>

        <Button
          title={loginMutation.isPending ? 'Signing in...' : 'Log in'}
          style={{
            backgroundColor: isFormFilled ? 'rgba(22, 119, 255, 1)' : '',
            color: isFormFilled ? '#fff' : ''
          }}
          disabled={loginMutation.isPending}
        />
      </form>
    </div>
  )
}