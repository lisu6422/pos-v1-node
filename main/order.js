const Cart = require('./Cart');
module.exports = class Order{
    constructor(inputs){
        this.cartItems = inputs.map(input => Cart.getCartInfo(input));
    }


    getOrderInfor(){
        let orderItems = [];
        
        this.cartItems.forEach(cartitem => {
            let orderitem = orderItems.find(orderitem => orderitem.barcode === cartitem.barcode);
            if (orderitem != undefined) {
                orderitem.count += cartitem.count;
            } else {
                orderItems.push(cartitem);
            }
        });

        //this.promotions = datebase.loadPromotions();

        return orderItems;
    }
}