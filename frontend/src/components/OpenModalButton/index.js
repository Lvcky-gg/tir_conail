import React from 'react';
import { useModal } from '../../context/Modal';
import { Button } from '@mui/material';
import {MenuItem} from '@mui/material';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <MenuItem variant="contained" 
    onClick={onClick}
   
    >{buttonText}</MenuItem>
  );
}

export default OpenModalButton;