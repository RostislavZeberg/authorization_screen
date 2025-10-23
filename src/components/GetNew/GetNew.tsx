import { useEffect, useState } from 'react';
import { useSixDigitCode } from '../../hooks/useSixDigitCode';
import { Button } from '../Button';
import { useVerify2FA } from '../../hooks/useAuth';
import './GetNew.scss';
import type { ApiError } from '../../types/auth';

interface GetNewProps {
  onSuccess?: () => void;
}

export const GetNew = ({ onSuccess }: GetNewProps) => {
  const [title, setTitle] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const {
    code,
    fullCode,
    isFormValid,
    handleChange,
    handleKeyDown,
    handlePaste,
    setInputRef,
    resetCode
  } = useSixDigitCode();

  const verify2FAMutation = useVerify2FA();

  useEffect(() => {
    if (showError && fullCode.length > 0) {
      setShowError(false);
      setError('');
    }
  }, [fullCode, showError]);

  useEffect(() => {
    if (isFormValid) {
      setTitle(true);
    } else {
      setTitle(false);
    }
  }, [isFormValid]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      const result = await verify2FAMutation.mutateAsync({ code: fullCode });
      console.log('2FA verification successful:', result);

      resetCode();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('2FA error:', apiError);

      resetCode();
      setShowError(true);

      switch (apiError.code) {
        case 'AUTH_003':
          setError('Invalid code. Please try again.');
          break;
        case 'NET_001':
          setError('Network error. Please check your connection.');
          break;
        case 'SRV_001':
          setError('Server error. Please try again later.');
          break;
        default:
          setError('Verification failed. Please try again.');
      }
    }
  };

  return (
    <div className="module__getNew getNew">
      <div className="getNew__content content">
        <h1 className='content__title'>Two-Factor Authentication</h1>
        <p className='content__descr'>Enter the 6-digit code from the Google Authenticator app</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="getNew__form form"
      >
        <div className="form__input">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              ref={setInputRef(index)}
              type="text"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`${showError ? 'input--error' : ''} input`}
              autoComplete="one-time-code"
              autoFocus={index === 0}
              disabled={verify2FAMutation.isPending}
            />
          ))}
          {showError && (
            <div className="error-message error-message--general">
              {error}
            </div>
          )}
        </div>
        <Button
          title={!title ? 'Get new' : 'Continue'}
          style={{ backgroundColor: 'rgba(22, 119, 255, 1)', color: '#fff' }}
          disabled={!isFormValid || verify2FAMutation.isPending}
        />
      </form>
    </div>
  );
};