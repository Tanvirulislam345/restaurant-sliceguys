import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import useAuth from '../../Context/useAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ForgetPassword() {
    const {handleForgetPassword} = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = () =>{
    handleForgetPassword(email);
  }

  return (
    <div>
      <p className="txt mt-2">
                    <small className="regTolog"
                    onClick={handleOpen}
                    >Forget Password</small>
     </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Reset Password
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                placeholder='Enter your email'
                onChange={(e)=>setEmail(e.target.value)}
                />
            <Button variant="contained" style={{backgroundColor: 'black', color: 'white'}}
            onClick={handleSubmit}
            >Send</Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
