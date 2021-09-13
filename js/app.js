const loadProducts = () => {
	const url = `https://fakestoreapi.com/products`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
	console.log(products);
	const allProducts = products.map((pd) => pd);
	for (const product of allProducts) {
		const image = product.image;
		const div = document.createElement('div');
		div.classList.add('product');
		div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p> Ratings: <span class="font-weight-bold"> ${product.rating.rate}</span></p>
        <p> Rated by <span class="font-weight-bold"> ${product.rating.count}</span> people</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" onclick="loadDetail(${product.id})" class="btn btn-danger">Details</button></div>
      `;
		document.getElementById('all-products').appendChild(div);
	}
};

const loadDetail = (productId) => {
	const url = `https://fakestoreapi.com/products/${productId}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => productDetail(data.description));
};

const productDetail = (description) => {
	document.getElementById('product-detail').style.display = 'block';
	const detail = document.getElementById('detail');
	detail.innerText = description;
};

let count = 0;
const addToCart = (id, price) => {
	count = count + 1;
	updatePrice('price', price);

	updateTaxAndCharge();
	updateTotal();
	document.getElementById('total-Products').innerText = count;
};

// main price update function
const updatePrice = (id, value) => {
	const convertedOldPrice = getInputValue(id);
	const convertPrice = parseFloat(value);
	const total = convertedOldPrice + convertPrice;
	document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
	document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
	const priceConverted = getInputValue('price');
	if (priceConverted > 200) {
		setInnerText('delivery-charge', 30);
		setInnerText('total-tax', priceConverted * 0.2);
	}
	if (priceConverted > 400) {
		setInnerText('delivery-charge', 50);
		setInnerText('total-tax', priceConverted * 0.3);
	}
	if (priceConverted > 500) {
		setInnerText('delivery-charge', 60);
		setInnerText('total-tax', priceConverted * 0.4);
	}
};

//getting all the cost id
const getInputValue = (id) => {
	const element = document.getElementById(id).innerText;
	const converted = parseFloat(element);
	return converted;
};

//grandTotal update function
const updateTotal = () => {
	const grandTotal =
		getInputValue('price') +
		getInputValue('delivery-charge') +
		getInputValue('total-tax');
	document.getElementById('total').innerText = grandTotal.toFixed(2);
};
