import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

/**
A reusable dialog component with customizable title, button name, and content.
@param {Object} props - The props object containing the following properties:
@param {React.ReactNode} props.children - The content to be displayed within the dialog.
@param {string} props.title - The title of the dialog.
@param {string} props.btnName - The name displayed on the button that triggers the dialog.
@returns {React.ReactNode} The rendered DialogComp component.
*/

const DialogComp = (props) => {
    const { children, title, btnName } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setIsOpen(true);
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

    const handleClose = () => setIsOpen(false);
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { handleClose });
        }
        return child;
    });

    return (
        <>
            <Button onClick={handleClickOpen('paper')}>{btnName}</Button>
            <Dialog
                scroll={scroll}
                open={isOpen}
                onClose={handleClose}
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
