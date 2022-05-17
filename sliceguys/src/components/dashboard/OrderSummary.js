import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import Today from './Today';

const OrderSummary = () => {
    
    return (
        <Card>
        <CardHeader
        sx={{py: 2}}
          title="Orders Summary"
       
        />
        <Box
        sx={{mx: 2, px: 1}}
        style={{
         maxWidth: '150px',
         backgroundColor: '#EAEDFC',
         borderRadius: '3px'
    }}
        >
       
        <Button
           style={{
            color: "black",
          }}
        >Today</Button> 
        </Box>
        <Today></Today>
      </Card>
    );
};

export default OrderSummary;