import React,{useState,useEffect, useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import geekslogo from '../images/geekslogo.png'
import User from '../User/User'
import Registereduser from '../RegisteredUser/Registereduser'
import Question from '../Questionpage/Question'
import PendingUser from '../PendingUser/PendingUser'
import HomePage from '../Homepage/Homepage'
import Contest from '../Contest/Contest'
import AdminPage from '../Admin/AdminPage.js';
import {AuthContext} from '../Context/Auth-Context'
import Chat from '../Adminsupport/Chat'
import { useHistory } from 'react-router';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar:{
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history=useHistory()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [activepage,setactivepage]=useState("Homepage")
  
  const handleuserclick=()=>{
    setactivepage("User")
  }
  const handleregistereduser=()=>{
    setactivepage("registereduser")
  }
  const handlependinguser=()=>{
    setactivepage("pendinguser")
  }
  const handlequestion=()=>{
    setactivepage("question")
  }
  const handlecontest=()=>{
    setactivepage("contest")
  }
  const handleadmin=()=>{
    setactivepage("adminPage")
  }
  const handlechatclick=()=>{
    setactivepage("chatPage")
  }
  const auth=useContext(AuthContext)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img  className="logo_geek" src={geekslogo} />
          <Typography variant="h6" noWrap>
            Geeksman
          </Typography>
          <div className="user__name">
          <h2>Parag56</h2>
          <button className="logoutbtn" onClick={()=>{auth.logout() 
            history.push("/")}}>Logout</button>
          </div>
        </Toolbar>
        
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
         
            <ListItem button onClick={handlependinguser}>
              <ListItemIcon > <InboxIcon /> </ListItemIcon>
              <ListItemText>Pending User</ListItemText>
            </ListItem>
            <ListItem button onClick={handlecontest}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>Contest</ListItemText>
            </ListItem>
            <ListItem button onClick={handleregistereduser}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>Registered User</ListItemText>
            </ListItem>
            <ListItem button onClick={handleuserclick}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>User</ListItemText>
            </ListItem>
            <ListItem button onClick={handlequestion}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>Question</ListItemText>
            </ListItem>
            <ListItem button onClick={handleadmin}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>Admin Page</ListItemText>
            </ListItem>
            <ListItem button onClick={handlechatclick}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText>Support</ListItemText>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          {activepage==="Homepage"&&(
            <HomePage/>
          )}
          {activepage==="User"&&(
            <User/>
          )}
          {activepage==="registereduser"&&(
            <Registereduser/>
          )}
          {activepage==="question"&&(
            <Question/>
          )}
          {activepage==="pendinguser"&&(
            <PendingUser/>
          )}
           {activepage==="contest"&&(
            <Contest/>
          )}
           {activepage==="adminPage"&&(
            <AdminPage />
          )}
          {activepage==="chatPage"&&(
            <Chat/>
          )}
        </Typography>
      </main>
    </div>
  );
}