import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {
    BottomNavigationAction,
    AppBar,
    Toolbar,
    Divider,
    Card,
    IconButton,
} from '@mui/material';

export const StyledAppBar = styled(AppBar)({
    alignItems: 'center',
    minHeight: '100px',
    backgroundColor: '#FFFDFA',
    color: '#000',
});

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    height: '100px',
    padding: '0',
});

export const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row-reverse',
});

export const StyledDivider = styled(Divider)({
    margin: '10px 0',
});

// from singleVenue
export const StyledCard = styled(Card)({
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
});

export const StyledBottomNavigationAction = styled(BottomNavigationAction)({
    // paddingRight: ' 0px',
    // border: '1px solid black',
    // borderRadius: '10px',
});

export const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#000',
});
export const StyledIconButton = styled(IconButton)({
    backgroundColor: 'transparent',
    color: '#000',
    width: '100px',
    height: '100px',
    '&:hover': {
        color: '#blue',
        backgroundColor: 'transparent',
    },
});
