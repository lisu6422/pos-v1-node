module.exports = class Cart{
    constructor(barcode, count){
        this.barcode = barcode;
        this.count = count;
    }

    static getCartInfo(input){
        if (input.includes('-')) {
            let cart = input.split('-');
            return new Cart(cart[0], parseInt(cart[1]));
        } 
        return new Cart(input, 1);
    }
}