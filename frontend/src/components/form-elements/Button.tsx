import { Link } from 'react-router-dom';

import './Button.css';
import { MouseEventHandler, ReactNode } from 'react';

type Button = {
  href?: string, 
  size?: string, 
  type?: "submit" | "reset" | "button" | undefined, 
  to?: string, 
  inverse?: boolean, 
  danger?: boolean, 
  disabled?: boolean, 
  onClick?: MouseEventHandler<HTMLElement>, 
  children?: ReactNode
}

const Button = (props: Button) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
