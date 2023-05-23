import { Box, Modal } from '@mui/material';

const ModalComp = ({ isOpen, onClose, children, title }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-labelledby={title}
        >
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    boxShadow: 5,
                    padding: '2rem 4rem 3rem',
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};

export default ModalComp;
