import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {
  
  const productData = useSelector( (state) => state.bazar.productData );
  const [totalAmt, setTotalAmt] = useState("");
  const userInfo = useSelector( (state)=>  state.bazar.userInfo);
  const [payNow, setPayNow] = useState(false);


  useEffect(() => {
    let price = 0;
    productData.map((item)=>{
      price += item.price * item.quantity;
      return price
    });
    setTotalAmt(price); 
  }, [productData]);

  const handleCheckout = ()=>{
    if(userInfo){
      setPayNow(true)
    }else{
      toast.error("Por favor inicia sesión para ir al checkout!")
    }
  }
  
  
  return (
    <div>

      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem/>

        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
          <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
            <h2 className='text-2xl font-medium'>Total Carrito</h2>
            <p className='flex items-center gap-4 text-base'>
              Subtotal{" "}
              <span className='font-titleFont font-bold text-lg'>
                $ {totalAmt}
              </span>
            </p>
            <p className='flex items-start gap-4 text-base'>
              Shipping{" "}
              <span>
                lorem ipsum dolor sit amet consectetur adipisicing alit. Quos, veritatis.
              </span>
            </p>
          </div>
          <p className='font-titleFont font-semibold flex justify-between mt-6'>
            Total <span className='text-xl font-bold'>$ {totalAmt}</span>
          </p>
          <button onClick={handleCheckout} className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'>
            Checkout
          </button>
          {
            payNow && <div className='w-full mt-6 flex items-center justify-content'>
              <StripeCheckout
                stripeKey='pk_test_51OjsuuEw31ZWPqfrpD9cbAD7MUFWFksPW2d8unOMDsFveXNQvzZdbELh1zev1NJpPgwylXQwyvpYQMQ3sSatIVZF00Wa2JsigA'
                name='Bazar Online Shopping'
                amount={totalAmt*100}
                label='Ir al pago'
                description={`Tu total a pagar es $${totalAmt}`}
                //token={payment}
                email={userInfo.email}
              />
            </div>
          }
        </div>
      </div>
      
    </div>
  )
}

export default Cart