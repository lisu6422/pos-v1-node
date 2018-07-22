module.exports = class Print {
    constructor(orderItems) {
        this.orderItems = orderItems;
    }

    print() {
        let result = "***<没钱赚商店>购物清单***\n";
        result += this.getOrderInfos();
        result += "----------------------\n";
        result += "挥泪赠送商品：\n";
        result += this.getFreeInfos();
        result += "----------------------\n";
        result += `总计：${this.getTotalPrice().toFixed(2)}(元)\n`;
        result += `节省：${this.getFreePrice().toFixed(2)}(元)\n`;
        result += "**********************";
        return result;

    }

    getOrderInfos() {
        let str = '';
        for (let i = 0; i < this.orderItems.length; i++) {
            let total = this.orderItems[i].price * (this.orderItems[i].count - this.orderItems[i].freecount);
            str += `名称：${this.orderItems[i].name}，数量：${this.orderItems[i].count}${this.orderItems[i].unit}，单价：${this.orderItems[i].price.toFixed(2)}(元)，小计：${total.toFixed(2)}(元)\n`;
        }

        return str;
    }


    getFreeInfos() {
        let str = '';
        for (let i = 0; i < this.orderItems.length; i++) {
            if (this.orderItems[i].freecount >= 1) {
                str += `名称：${this.orderItems[i].name}，数量：${this.orderItems[i].freecount}${this.orderItems[i].unit}\n`;
            }
        }

        return str;
    }

    getTotalPrice() {
        let totalprice = 0;
        for (let i = 0; i < this.orderItems.length; i++) {
            let total = this.orderItems[i].price * (this.orderItems[i].count - this.orderItems[i].freecount);
            totalprice += total;
        }

        return totalprice;
    }

    getFreePrice() {
        let freeprice = 0;
        for (let i = 0; i < this.orderItems.length; i++) {
            if (this.orderItems[i].freecount >= 1) {
                let total = this.orderItems[i].price * this.orderItems[i].freecount;
                freeprice += total;
            }

        }

        return freeprice;
    }
}