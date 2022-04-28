import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'
import {Grid} from '@material-ui/core'
import SchoolImage from '../../assets/hkbkLogo.png';
import { FaHome,FaNewspaper,FaListAlt } from 'react-icons/fa';
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <Toolbar />
      <br/>
      <br/>
      <Grid container className='logo'>
        <Image         
            src={SchoolImage}
            alt="Picture of the author"
            width={150}
            height={150}
        />
      </Grid>
      <br/>
      <br/>
      <Divider />
      <List>
        
        <ListItem button key={"Dashboard"} component={Link} href="/teacher/dashboard">    
          <ListItemIcon>
              <FaHome/>
          </ListItemIcon>
          
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        
        <ListItem button key={"Add Subject"} component={Link} href="/teacher/subject">   
          <ListItemIcon>
              <FaNewspaper/>
          </ListItemIcon> 
          <ListItemText primary={"Add Subject"} color={'white'} />
        </ListItem>
        <ListItem button key={"Question Set"} component={Link} href="/teacher/question">  
          <ListItemIcon>
              <FaListAlt/>
          </ListItemIcon>  
          <ListItemText primary={"Question Set"} />
        </ListItem>
        <ListItem button key={"Paper Generator"} component={Link} href="/teacher/paper">  
        <ListItemIcon>
              <FaNewspaper/>
          </ListItemIcon>   
          <ListItemText primary={"Paper Generator"} />
        </ListItem>
      </List>
    
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
   <div>
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
       {props.children}
       {console.log(props)}
     </div>
 
     
    
  );
}


export default ResponsiveDrawer;
