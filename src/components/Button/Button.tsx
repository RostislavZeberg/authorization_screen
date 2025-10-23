import './Button.scss';

interface ButtonProps {
  title: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, style, onClick, disabled = false, }) => {

  return (
    <button
      type='submit'
      className='form__btn'
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};