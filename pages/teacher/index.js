import Nav from '../../mycomponents/student/Navcomp';
import LoginForm from '../../mycomponents/teacher/LoginForm';
import SchoolImage from '../../assets/teacher.png';
import {Grid} from '@material-ui/core'
import Image from 'next/image'
import Box from '@mui/material/Box';

function StudentLoginPage() {

    return (<>
        <Nav/>
        <Grid container spacing={4}  className='homePageContainer' >
            <Grid item md={6} xs={0} >
               
                  <Box  component="span" sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>
                  <p className="para">For an improved learning and teaching experience!</p>
                  <Image
                  
                        src={SchoolImage}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                     />
                  </Box>
               </Grid>
            <Grid item md={6} xs={10}>
               <LoginForm/>
            </Grid>    
         </Grid>
      </>
    );
}
export default StudentLoginPage;