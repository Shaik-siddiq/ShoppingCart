import { CartItemsType } from "../App"
import CartItem from "../CartItem/CartItem"
import {Wrapper} from './Cart.styles'

type Props ={
    cartItems:CartItemsType[];
    AddtoCart:(clickeditem:CartItemsType)=>void
    removeCart:(id:number)=>void
}
const Cart:React.FC<Props> = ({cartItems,AddtoCart,removeCart})=>{
    const calculateTotal = (items:CartItemsType[])=>items.reduce((ack:number, item)=>ack+item.amount * item.price,0)
return(
    <Wrapper>
        <h2>Your cart Shows here</h2>
        {cartItems.length ===0 ? <p>no items added here</p>:null}
        {cartItems.map((item)=>{
            return(
                <CartItem
                key={item.id}
                item={item}
                AddToCart={AddtoCart}
                removeCart={removeCart}
                />
            )
        })}
        <h2>Total Amount : $ {calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
)
}
export default Cart