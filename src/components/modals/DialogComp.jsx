import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const DialogComp = ({ children, title, btnName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickDialog = (scrollType) => () => {
        setIsOpen((prev) => !prev);
        setScroll(scrollType);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { handleClose });
        }
        return child;
    });

    return (
        <>
            <Button onClick={handleClickDialog('paper')}>{btnName}</Button>
            <Dialog
                scroll={scroll}
                open={isOpen}
                onClose={handleClickDialog}
                aria-labelledby={`scroll-dialog-${title}`}
            >
                <DialogTitle
                    sx={{ textAlign: 'center' }}
                    id={`scroll-dialog-${title}`}
                >
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent dividers={scroll === 'paper'}>
                    {childrenWithProps}
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogComp;
