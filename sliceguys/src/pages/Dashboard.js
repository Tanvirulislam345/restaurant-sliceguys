import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TodaysSells from '../components/dashboard/TodaysSells';
import { DashboardLayout } from '../components/layout/dashboard-layout'
import TotalMenu from '../components/dashboard/TotalMenu';
import TotalProducts from '../components/dashboard/TotalProducts';
import TodaysOrders from '../components/dashboard/TodaysOrders';
import OrderSummary from '../components/dashboard/OrderSummary';
import OrderSummary2 from '../components/dashboard/OrderSummary2';
import TodaysCardSell from '../components/dashboard/TodaysCardSell';
import TodaysCashSell from '../components/dashboard/TodaysCashSell';
import TotalSell from '../components/dashboard/TotalSell';

const Dashboard = () => {

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 3
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xl={4}
                        lg={4}
                        sm={6}
                        xs={12}
                    >
                        <TodaysOrders />
                    </Grid>
                    <Grid
                        item
                        xl={4}
                        lg={4}
                        sm={6}
                        xs={12}
                    >
                        <TotalMenu></TotalMenu>
                    </Grid>
                    <Grid
                        item
                        xl={4}
                        lg={4}
                        sm={6}
                        xs={12}
                    >
                        <TotalProducts />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <TodaysSells />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <TodaysCardSell />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <TodaysCashSell />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <TotalSell />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <OrderSummary />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <OrderSummary2 />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};
Dashboard.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);


export default Dashboard;