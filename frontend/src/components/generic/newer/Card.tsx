import { CSSProperties, ReactNode } from 'react';
import './Card.css';

const Card = (props: {className?: string, style?: CSSProperties | undefined, children: ReactNode}) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
