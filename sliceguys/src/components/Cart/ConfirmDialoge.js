import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import thanks from '../../assets/place.png';
import Slide from '@mui/material/Slide';
import useAuth from '../../Context/useAuth';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialoge({ handleSubmit }) {
    const { open, setOpen, setCartItem, cartItem } = useAuth();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        setCartItem([]);
        navigate('/');
    };

    return (
        <div>
            <Button onClick={handleSubmit}
                style={{
                    padding: '5px 20px', background: 'black',
                    color: 'white', margin: '15px 0px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                Confirm £{cartItem.reduce((total, prd) => total + prd?.totalQuantityPrice, 0)}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogContent>
                    <img src={thanks} alt="hlw"
                        style={{ height: '300px', width: '350px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                    style={{color: "black"}}
                    >Go Home</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
