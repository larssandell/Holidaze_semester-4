import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalComp = ({ children, title, btnName, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <Button onClick={handleOpen}>{btnName}</Button>
            <Modal
                open={isOpen}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                aria-labelledby={title}
            >
                <Box sx={style}>{children}</Box>
            </Modal>
        </>
    );
};

export default ModalComp;
