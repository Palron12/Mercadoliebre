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
		let visitados = data.filter(producto => producto.category == 'visited');
		let ofertas = data.filter(producto => producto.category == 'in-sale');
		
		res.render('index', {visita: visitados, oferta: ofertas});
		
	},
	search: (req, res) => {
		// Do the magic
	},
	
	
};

module.exports = controller;
