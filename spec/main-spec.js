const printInventory = require('../main/main');
const Cart = require('../main/cart');
const Order = require('../main/order');
const Calculate = require('../main/calculate');
const Print = require('../main/print');

describe('pos', function () {
    var inputs;


    it('should output cartitem', function () {

        inputs = 'ITEM000001';
        var expectItem = {
            barcode: 'ITEM000001',
            count: 1
        };

        let cart = Cart.getCartInfo(inputs);
        expect(cart.barcode).toBe(expectItem.barcode);
        expect(cart.count).toBe(expectItem.count);

    });

    it('should output cartitem', function () {

        inputs = 'ITEM000003-2';
        var expectItem = {
            barcode: 'ITEM000003',
            count: 2
        };

        let cart = Cart.getCartInfo(inputs);
        expect(cart.barcode).toBe(expectItem.barcode);
        expect(cart.count).toBe(expectItem.count);
    });

    it('should output orderitems', function () {

        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectItem = {
            barcode: 'ITEM000001',
            count: 5,
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            freecount: 0
        };
        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let res = calculate.getOrderInfo(orders);

        expect(res[0].barcode).toBe(expectItem.barcode);
        expect(res[0].count).toBe(expectItem.count);
        expect(res[0].name).toBe(expectItem.name);
        expect(res[0].unit).toBe(expectItem.unit);
        expect(res[0].price).toBe(expectItem.price);
        expect(res[0].freecount).toBe(expectItem.freecount);

    });

    it('should output orderItems with freecount', function () {

        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectItem = {
            barcode: 'ITEM000001',
            count: 5,
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            freecount: 1
        };
        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let orderItems = calculate.getOrderInfo(orders);
        let res = calculate.calculateFreeCount(orderItems);

        expect(res[0].barcode).toBe(expectItem.barcode);
        expect(res[0].count).toBe(expectItem.count);
        expect(res[0].name).toBe(expectItem.name);
        expect(res[0].unit).toBe(expectItem.unit);
        expect(res[0].price).toBe(expectItem.price);
        expect(res[0].freecount).toBe(expectItem.freecount);

    });

    it('should print correct orderInfo text', function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectText =
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n';
        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let orderItems = calculate.getOrderInfo(orders);
        let OrderItemsInfo = calculate.calculateFreeCount(orderItems);
        let print = new Print(OrderItemsInfo)
        let res = print.getOrderInfos();

        expect(res).toBe(expectText);

    });


    it('should print correct freeInfo text', function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectText =
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n';

        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let orderItems = calculate.getOrderInfo(orders);
        let OrderItemsInfo = calculate.calculateFreeCount(orderItems);
        let print = new Print(OrderItemsInfo)
        let res = print.getFreeInfos();

        expect(res).toBe(expectText);

    });

    it('should print correct totalprice text', function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectText = 51;

        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let orderItems = calculate.getOrderInfo(orders);
        let OrderItemsInfo = calculate.calculateFreeCount(orderItems);
        let print = new Print(OrderItemsInfo)
        let res = print.getTotalPrice();

        expect(res).toBe(expectText);

    });

    it('should print correct freeprice text', function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        var expectText = 7.5;

        let order = new Order(inputs);
        let orders = order.getOrderInfor();
        let calculate = new Calculate();
        let orderItems = calculate.getOrderInfo(orders);
        let OrderItemsInfo = calculate.calculateFreeCount(orderItems);
        let print = new Print(OrderItemsInfo)
        let res = print.getFreePrice();

        expect(res).toBe(expectText);

    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
