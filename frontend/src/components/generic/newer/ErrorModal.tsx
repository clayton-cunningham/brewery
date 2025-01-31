import Modal from './Modal';
import Button from '../../form-elements/Button';
import { MouseEventHandler } from 'react';

const ErrorModal = (props: {onClear: MouseEventHandler<HTMLElement>, error: string | null | undefined}) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
