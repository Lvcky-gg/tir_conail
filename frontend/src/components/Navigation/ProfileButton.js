import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { login } from '../../store/session';
import { Button, formHelperTextClasses, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';


const StyledMenu = styled((props) => (
  
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(3.5),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? '#3c3c3c' : '#3c3c3c',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());

        // added
        closeMenu();
    };

    const closeMenu = () => setShowMenu(false);
    const demoUserLogin = () => {
        const credential = {
            email: 'demo@aa.io',
            password: 'password',
        };
        dispatch(login(credential));
        closeMenu();
    };
 

    return (
        <div
        className="profile-provider">
            <button 
                    aria-controls={open ? 'demo-customized-button' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                     className="modalButton">
                <i className="fas fa-user-circle" />
            </button>
            <StyledMenu 
                    
            anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li className="button-container">
                            <Button
                            variant="contained"
                                className="modalButton"
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="button-container">
                            <OpenModalButton
                                buttonText="Log In"
                                // onItemClick={closeMenu}
                                onModalClose={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>

                        <li className="button-container">
                            <OpenModalButton
                                buttonText="Sign Up"
                                // onItemClick={closeMenu}
                                onModalClose={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>

                        <li className="button-container">
                            <MenuItem
                              variant="contained"
                                className="modalButton"
                                onClick={demoUserLogin}
                            >
                                DemoUser
                            </MenuItem>
                        </li>
                    </>
                )}
            </StyledMenu>
        </div>
    );
}

export default ProfileButton;