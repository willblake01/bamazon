var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console-table');
var WordTable = require('word-table');
var colors = require('colors');

// Start set colors theme
colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red'
});

// end set colors theme

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!'.info);
  managerPrompt();
});

function managerPrompt() {
  inquirer
  .prompt({
      type: 'list',
      name: 'manager',
      message: 'What would you like to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]

    })

.then(function (answer) {
    switch (answer.manager) {
      case 'View Products for Sale':
        viewProducts();
        break;

      case 'View Low Inventory':
        viewLowInventory();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':
        addProduct();
        break;
    }
  });
}

function viewProducts() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;
    console.log('****************Items for Sale******************');

    var header = ['ID', 'Product Name', 'Price', 'Quantity'];
    var table = [];
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
    }

    // basic usage
    var wt = new WordTable(header, table);
    console.log(wt.string());
  });
}

function viewLowInventory() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5',
    function (err, res) {
      if (err) throw err;
      console.log('*****************Low Quantity*******************'.warn);

      var header = ['ID', 'Product Name', 'Price', 'Quantity'];
      var table = [];
      for (var i = 0; i < res.length; i++) {
        table.push(Object.values(res[i]));
      }

      // basic usage
      var wt = new WordTable(header, table);
      console.log(wt.string());
    });
}

function addInventory() {

}

function addProduct() {

}
