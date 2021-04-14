const express = require('express');
const app = express();
const items = require('./js/item');
app.use(express.static('public'));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/getItems", (req, res) => {
  let allItems = items.getAll();
  res.set('Cache-Control', 'no-cache');
  res.json(allItems);
});

app.get("/", (req, res) => {
  // Note: If you are using other methods to serve HTML content,
  // feel free to change the following line of code.
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/items", (req, res) => {
  // Note: If you are using other methods to serve HTML content,
  // feel free to change the following line of code.
  res.sendFile(__dirname + "/public/html/items.html");
});

app.get("/add_item", (req, res) => {
  // Note: If you are using other methods to serve HTML content,
  // feel free to change the following line of code.
  res.sendFile(__dirname + "/public/html/add_item.html");
});

app.get("/item", function (req, res) {
  let itemid = req.query.id;
  let i = items.getAll();
  let item = items.findById(parseInt(itemid));
  res.send(item.id+'<br/>'+item.title+'<br/>'+item.price+'<br/>'+'<img src = "./img/' + item.imageUrl + '"/>');
})



// Insert your code here ...
app.post('/additem', function (req, res) {
  let result = req.body
  console.log(result)
  let newItem = { title: result.title, imageUrl: result.imageUrl, price: parseInt(result.price) } ;
  items.create(newItem);
  res.redirect('/items');
})


// For any unmatched path, return the file with the same path in
// "public" folder.
app.use(express.static('public'));

app.listen(8080);
