import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';


export const AccountProfileDetails = ({ allitem }) => {
  return (
    <Paper
      elevation={3}>
      <TableContainer
        sx={{ backgroundColor: 'whitesmoke' }}
        style={{ borderRadius: '10px' }}>
        <Table
          aria-label="spanning table">
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid black' }}>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}>Products</TableCell>
                <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}>Toppings</TableCell>
                 <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}>Quantity</TableCell>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allitem ? allitem.map((order) => (
              <TableRow
                key={order.id}
                style={{ backgroundColor: '#FDFEFE', borderBottom: '1.5px solid #E4E4E5' }}
              >
                <TableCell align="center">{order.title}</TableCell>
                {order.topping ? <TableCell align="center">{order.topping}</TableCell>
                :  <TableCell align="center">No topping yet</TableCell>}
                <TableCell align="center">{order.quantity}</TableCell>
                <TableCell align="center">£ {order.totalQuantityPrice}</TableCell>
              </TableRow>
            )) : <TableRow>
              <TableCell align="center">loadding</TableCell>
            </TableRow>}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}></TableCell>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}></TableCell>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900' }}>Total Price</TableCell>
              <TableCell align="center"
                style={{ color: '#3C3C3D', fontWeight: '900'}}>£ {allitem ? allitem.reduce((total, prd) => total + prd?.totalQuantityPrice, 0) : <span>loadding</span>}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
};
