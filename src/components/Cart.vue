<!-- Cart  App -->
<!-- Template -->
<template>
    <div>       
        <!--product-->
        <table id="products">
            <tr>
                <th>Name</th>
                <th>Price</th>
                
            </tr>
            <tr  v-for="product in products" :key="product.id" @click="addProduct(product)">
                <td>{{product.name}}</td>
                <td>${{product.price}}</td>
            </tr>   
        </table> 
        <!--cart-->
         <div class="shopping-cart" >
            <div class="title">
                Shopping Cart
                <table style="width:100%;">
                  <tr>                    
                    <td><div class="final_quantity"><img src="@/assets/cart.png" style="height:22px;width:22px;padding-right:5px;"/> {{this.getQuantity}}</div></td>
                     <td><div class="final_price"><img src="@/assets/earnings.png" style="height:18px;width:18px;padding-right:5px;"/>  ${{this.getTotal}}</div></td>                    
                  </tr>                  
                </table>
            </div>
            <div v-if="cart" >
                <div class="item" v-for="item in cart" :key="item.id" >
                    <div class="buttons">
                    <span class="delete-btn">  </span>
                    </div>                          
                
                    <div class="description" style="width:30%">
                        <span>{{item.name}}</span>
                        <span>${{item.price}}</span>
                    </div>
                
                    <div class="quantity" style="width:30%">
                      <button class="plus-btn" type="button" name="button"  @click="addProduct(item)">
                          +
                      </button>
                      <input type="text" name="name"  v-model="item.quantity" disabled>
                      <button class="minus-btn" type="button" name="button"  @click="removeProduct(item)">
                        -
                      </button>
                    </div>
                
                    <div class="total-price" style="width:30%">${{item.price}}</div>
                </div>
                
            </div>
            <div class="no-item" v-else>No items in cart</div>
        </div>
    </div>
</template>
<!-- Scripts -->
<script>
export default {
    name: 'Cart',    
    computed:{
        cart() {
          return this.$store.getters.cart;
        },
        products() {
            return this.$store.getters.products;
        },
        //Get total of cart
        getTotal(){
          if(this.cart && this.cart.length > 0)
            return this.cart.reduce(function(total, item){
                let t = total + (item.quantity * item.price);  
                return Math.round((t + Number.EPSILON) * 100) / 100;
            },0);
          else
            return 0;
        }, 
         //Get total no of items in cart
        getQuantity(){
          let totalQuantity = 0;
          if(this.cart && this.cart.length > 0)
            this.cart.forEach(cart => {   
                totalQuantity = totalQuantity + cart.quantity;
            });
          return totalQuantity;
        }
    },
    methods:{       
        //Remove item
        removeProduct(obj){
            var removeIndex = this.cart.map(item => item.id)
                       .indexOf(obj.id);
            if(obj.quantity && obj.quantity == 1) {
              this.$store.dispatch("removeFromCart", removeIndex);
              let o =this.$store.state.products.find(product => product.id == obj.id);
              if (o) {
                o.quantity = 0;
              }
            }  
            else{               
              this.cart.splice(removeIndex, 1);
              obj.quantity = obj.quantity -1;
               this.$store.dispatch("addToCart", obj);
            }            
        },
        //Add item
        addProduct (obj) { 
            if(obj && !obj.quantity) {
                obj.quantity = 1;
            }  
            else{
              var removeIndex = this.cart.map(item => item.id)
                       .indexOf(obj.id);
              this.cart.splice(removeIndex, 1);
              obj.quantity = obj.quantity +1;
            }           
            this.$store.dispatch("addToCart", obj);
        }
    }
}
</script>
<!-- Styles -->
<style >
.shopping-cart {
  width: 750px;
  height: 600px;
  margin: 50px auto;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px; 
  display: flex;
  flex-direction: column;
}
.title {
  height: 75px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}
 
.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}
 
.no-item{
  padding: 20px 30px;
  height: 120px;
  
  text-align: center;
}

.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
}
 
.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}
 
.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}
 
.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}
.quantity {
  padding-top: 20px;
  margin-right: 60px;
}
.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
 
button[class*=btn] {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}
 
button:focus,
input:focus {
  outline:0;
}
.total-price {
  width: 83px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
.final_quantity{   
   display: flex; 
   justify-content: flex-start;
    font-size: 15px;
    width: 50%;
    font-weight: bold;
}
    
.final_price{
    font-size: 15px;
    display: flex; 
   justify-content: flex-end;
   font-weight: bold;

}
/* table */
.remove_btn{
    background-color: rgb(241, 116, 85);
    color:rgb(27, 21, 16);
    padding: 5px;
    margin-right: 5px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 40%;
}
.remove_btn:hover {background-color: rgb(248, 232, 90);}
#products {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin-left:50px;
}

#products td, #products th {
  border: 1px solid #ddd;
  padding: 8px;
}

#products tr:nth-child(even){background-color: #f2f2f2;}

#products tr:hover {background-color: rgb(118, 247, 26);}

#products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #676a67;
  color: white;
  text-transform: uppercase;
}
#cart{
    text-align: right;
}
</style>
