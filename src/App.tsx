import {useState} from 'react'
import {useQuery} from 'react-query'
import {LinearProgress} from "@material-ui/core"
import {AddShoppingCart} from '@material-ui/icons'
import Item from './Item/Item'
import Cart from './Cart/Cart'
import { Grid,Drawer,Badge } from '@material-ui/core'
import { Wrapper,StyledButton } from './App.styles'
export type CartItemsType = {
  id:number,
  image:string;
  title:string;
  category:string;
  amount:number;
  price:number;
  description:string;
}
const getProduct = async() : Promise<CartItemsType[]> => await (await fetch('https://fakestoreapi.com/products')).json()
  
function App() {
  const [cartopen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemsType[])
  const getTotalItems = (items:CartItemsType[])=>items.reduce((ack:number, item)=>ack + item.amount,0)
 
  const handleAddCart = (clickeditem:CartItemsType)=>{
    setCartItems( prev => {
    // if already item present
    const isitemincart = prev.find((item)=>item.id === clickeditem.id )

    if(isitemincart){
    return prev.map((item)=>item.id === clickeditem.id? {...item, amount:item.amount + 1}:item)
    }
    // for new item
    return [...prev, {...clickeditem, amount:1}]
  })
  }
  const handleRemoveCart = (id:number)=>{
    setCartItems(prev =>
      prev.reduce((ack, item)=>{
       if(item.id === id){
         if(item.amount === 1)return ack;
         return [...ack, {...item, amount:item.amount - 1}]
       }else{
         return [...ack , item]
       }
     },[] as CartItemsType[])
    )
  }
  const {data, isLoading, error} = useQuery<CartItemsType[]>('products',getProduct)
  console.log(data)
  if(isLoading) return <LinearProgress />
  if(error) return <div>Some thing went wrong...</div>
  return (
    <>
    <Wrapper>
      <Drawer anchor="right" open={cartopen} onClose={()=>setCartOpen(false)}>
        <Cart cartItems={cartItems} AddtoCart={handleAddCart} removeCart={handleRemoveCart} />
      </Drawer>
    <Grid container spacing={3}>
    {data?data.map((item)=> <Grid key={item.id} xs={12} sm={4}><Item item={item} handleAddtoCart={handleAddCart}/></Grid>):null}
    </Grid>
    </Wrapper>
    <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)}>
        <AddShoppingCart />
        </Badge>
      </StyledButton>
    </>
  );
}

export default App;
