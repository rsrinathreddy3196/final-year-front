import React from 'react';
import style from './dashboardMain.module.css';
import {Grid} from '@material-ui/core';
function DashboardMain({handleToggleSidebar,}){
  return (
    <main className={style.main}>
        <Grid container>
            <Grid item className={style.dashboardContainer}>
                <h1>Dashboard</h1>
            </Grid>
        </Grid>
      
    </main>
  );
}

export default DashboardMain;