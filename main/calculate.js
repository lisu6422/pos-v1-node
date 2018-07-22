const datebase = require('../main/datbase');
module.exports = class Calculate{
    constructor(){
        this.allItems = datebase.loadAllItems();
        this.promotionsItems = datebase.loadPromotions();
    }

    getOrderInfo(orders){
        let orderItems = [];
        for(let i=0; i<orders.length; i++){
            let orderItem = {};
            let targetItem = this.allItems.find(item => item.barcode === orders[i].barcode);
            orderItem.barcode = targetItem.barcode;
            orderItem.count = orders[i].count;
            orderItem.name = targetItem.name;
            orderItem.unit = targetItem.unit;
            orderItem.price = targetItem.price;
            orderItem.freecount = 0;
            orderItems.push(orderItem);
        }
       
        return orderItems;
    }

    calculateFreeCount(orderItems){
        for(let i=0; i<orderItems.length; i++){
            if(this.promotionsItems[0].barcodes.includes(orderItems[i].barcode)){
                orderItems[i].freecount = parseInt(orderItems[i].count / 3);
            }
        }
        return orderItems;
    }
    
}