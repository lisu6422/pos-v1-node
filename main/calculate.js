const datebase = require('../main/datbase');
module.exports = class Calculate{
    constructor(){
        this.allItems = datebase.loadAllItems();
        this.promotionsItems = datebase.loadPromotions();
    }

    getInventory(orders){
        let outstr = "***<没钱赚商店>购物清单***\n";
        outstr += this.getOrderInfos(orders).join('\n') + "\n";
        outstr += "----------------------\n";
        outstr += "挥泪赠送商品：\n";
        outstr += this.getPromotionInfos(orders).join('\n') + "\n";
        outstr += "----------------------\n";
        outstr += `总计：${this.getTotalPrice(orders).toFixed(2)}(元)\n`;
        outstr += `节省：${this.getTotalFreePrice(orders).toFixed(2)}(元)\n`;
        outstr += "**********************";
        return outstr;
    }

    getOrderOutstr(orderItems){
        let outstr = orderItems.map(order => {
            let product = this.allItems.find(product => product.barcode === order.barcode);
            let totalPrice = product.price * (order.count - this.getFreeCount(order));
            return `名称：${product.name}，数量：${order.count}${product.unit}，单价：${product.price.toFixed(2)}(元)，小计：${totalPrice.toFixed(2)}(元)`;
        });
        return outstr;
    }

    getPromotionInfos(orders){

    }

    getTotalPrice(orders){

    }

    getTotalFreePrice(orders){

    }

    getFreeCount(order) {
        return this.isBuyTwoAndOneFree(order.barcode) ? parseInt(order.count / 3) : 0;
    }

    isBuyTwoAndOneFree(barcode) {
        return this.promotions.find(prom => prom.type === "BUY_TWO_GET_ONE_FREE").barcodes.includes(barcode);
    }

}