import { CartItemsType } from "../App";
import {Wrapper} from './Item.styles';
import {Button} from '@material-ui/core'
type Props = {
    item:CartItemsType;
    handleAddtoCart:(ClickedItem:CartItemsType)=>void
}

const Item:React.FC<Props> = ({item, handleAddtoCart})=>{
    return(
        <Wrapper>
                <img src={item.image} alt={item.category} />
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <h4>${item.price}</h4>
                </div>
            <Button onClick={()=>handleAddtoCart(item)}>Add To Cart</Button>
        </Wrapper>
    )
}
export default Item