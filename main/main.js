const database = require('../main/datbase');
const Cart = require('../main/cart');
const Order = require('../main/order');
const Calculate = require('../main/calculate');
const Print = require('../main/print');
module.exports = function printInventory(inputs) {
    let order = new Order(inputs);
    let orders = order.getOrderInfor();
    let calculate = new Calculate();
    let orderItems = calculate.getOrderInfo(orders);
    let OrderItemsInfo = calculate.calculateFreeCount(orderItems);
    let print = new Print(OrderItemsInfo)
    let res = print.print();
    console.log(res);
};



