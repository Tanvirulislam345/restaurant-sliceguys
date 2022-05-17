import { useState } from 'react';

const useCart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [ProductsDatas, setProductsDatas] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalsell, setTotalsell] = useState();
    const [open, setOpen] = useState(false);
    const [tooping, setTooping] = useState([]);



    const addToCart = (cart) => {
        setCartItem(pre => [...pre, cart]);
    }

    const removeCart = (indexId) => {
        const newCartItem = cartItem.filter((item, index)=> index !== indexId);
        setCartItem(newCartItem);
    }

    const increaseItem = (indexId) => {
        const newCartItem = cartItem.map((item, index) => index === indexId ? { ...item, quantity: item.quantity + 1, totalQuantityPrice: item.price * (item.quantity + 1)  } : item);
        setCartItem(newCartItem);
        // console.log(newCartItem);
    }

    const decreaseItem = (indexId) => {
        setCartItem(prev => prev.map((item, index) => index === indexId ? { ...item, quantity: item.quantity - 1, totalQuantityPrice: item.price * (item.quantity - 1) } : item));
    }


    return {
        cartItem,
        setCartItem,
        ProductsDatas,
         setProductsDatas,
        addToCart,
        removeCart,
        increaseItem,
        decreaseItem,
        totalPrice,
        setTotalPrice,
        totalsell,
        setTotalsell,
        setOpen,
        open,
        setTooping,
        tooping,
        // setStatus,
        // status

    }
};

export default useCart;