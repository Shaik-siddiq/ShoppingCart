import { CartItemsType } from "../App"
import {Button} from '@material-ui/core'
import {Wrapper} from './CartItem.styles'
type Props ={
    item:CartItemsType
    AddToCart:(clickeditem:CartItemsType)=>void
    removeCart:(id:number)=>void
}
const CartItem:React.FC<Props> = ({item, AddToCart, removeCart})=>{
    return(
<Wrapper>
    <div>
        <h3>{item.title}</h3>
        <div className="information">
            <p>Price:${item.price}</p>
            <p>Total:${item.price * item.amount}</p>
        </div>
    </div>
    <div className="buttons">
        <Button disableElevation size="small" variant="contained" onClick={()=>removeCart(item.id)}>
        -
        </Button>
        <Button disableElevation size="small" variant="contained" onClick={()=>AddToCart(item)}>
        +
        </Button>
    </div>
 <img src={item.image} alt={item.category} /> 
</Wrapper>
    )
}
export default CartItem