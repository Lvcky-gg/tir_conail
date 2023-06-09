import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import './sidebar.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../store/categories';

export default function TemporaryDrawer() {
    const dispatch = useDispatch()
    const categories = useSelector((state)=>state.categories.allCategories.Categories)

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(()=>{
    dispatch(getAllCategories())
  },[dispatch])
 const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        { categories?.map((category, id) => (
          <ListItem key={id} disablePadding>
            <ListItemButton>
              <ListItemText primary={category.name.toString()} />
            </ListItemButton>
          </ListItem>  
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          
          <IconButton
            className="iconButton"
            size="large"
            edge="start"
            color="secondary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
			onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
			
          </IconButton>
          <Drawer
              PaperProps={{
                sx: {
                  backgroundColor: "#3c3c3c",
                  color: "white",
                }
              }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}