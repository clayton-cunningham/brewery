import { CSSProperties } from 'react';
import './Avatar.css';

const Avatar = (props: {image: string, alt: string, className: string, width: number, style: CSSProperties | undefined}) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
