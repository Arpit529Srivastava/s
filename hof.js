const products = [
    { name: "Laptop", price: 60000 },
    { name: "Mouse", price: 500 },
    { name: "Keyboard", price: 1500 },
    { name: "Monitor", price: 12000 }
];

const filteredProducts = products.filter(product => product.price > 1000);
const productNames = filteredProducts.map(product => product.name);
const totalPrice = filteredProducts.reduce((sum, product) => sum + product.price, 0);

console.log(productNames);
console.log(totalPrice);
