const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	 getdatos: () => {
		let datos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		datos.forEach(element => {
		element.finalPrice = element.price - (element.price * element.discount /100)
		
		});
		
		return datos;
	}, 

	index: (req, res) => {
		let data = controller.getdatos ();
		res.render('products', {data:data});

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let datos = controller.getdatos();
		let productID = req.params.id;
		let product = datos.find(productos => productos.id == productID);
		res.render ('detail', {product:product})

	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
		
	// Create -  Method to store
	store: (req, res) => {

		let data = controller.getdatos();
		let mayor = data[0].id;
		data.forEach(element => {
			if (element.id > mayor) {
				mayor = element.id;

			};
		})

		let newProduct = {
			id: mayor + 1,
  			name: req.body.name, 
  			price: req.body.price,
  			discount: req.body.discount,
  			category: req.body.category,
            description : req.body.description,
			image: req.body.image
		}

		data.push (newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(data, null, " "));
		res.redirect('/products')
		},

	// Update - Form to edit
	edit: (req, res) => {
		let datos = controller.getdatos();
		let productID = req.params.id;
		let product = datos.find(productos => productos.id == productID);
		res.render ('product-edit-form', {product:product})

		
	},
	// Update - Method to update
	update: (req, res) => {
		let datos = controller.getdatos();
		let product = datos.find(productos => productos.id == req.params.id );
		
		let index = datos.indexOf(product); // aca busco donde esta en el array. (posicion del producto dentro del array)
 
		for (let prop in req.body) {               
		  if (req.body[prop] != "") {        //usa el bracket notation, en un ciclo for in. en la propiedad [prop]
			product[prop] = req.body[prop];
		  }
		}
		datos [index] = product; // actualiza el array. 
		fs.writeFileSync(productsFilePath, JSON.stringify(datos, null, " ")); // sobre escribo en el .json
		res.redirect("/products");

	},
	

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let datos = controller.getdatos();
		let temp = datos.filter(p => p.id != req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(temp, null, " "));
		res.redirect("/products");

	}
};

module.exports = controller;