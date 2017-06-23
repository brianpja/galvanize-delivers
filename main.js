
//this first clickk event does everything when you click a card to build your order
$('.card').on('click', 'a', function(event) {
  console.log('clicking');

  addItemToOrder(getOrderData(event, '.card-title'), getOrderData(event, '.card-price'));
  updateSubtotal(event);
  updateTaxAndTotal(updateSubtotal(event));
});

//this function adds ordered items to the order list on the right side of the page
function addItemToOrder(name, price) {
  const $tr = $('<tr>');
  const $item = $('<td>').text(name)
  const $price = $('<td>').text(price).addClass('right order-price');
  const $orderTable = $('.order-table');
  $tr.append($item);
  $tr.append($price);
  $orderTable.append($tr);
}


//this function grabs the desired data from the clicked card
function getOrderData(event, selector) {
  const orderData = $(event.target).parents('.card').children().children(selector).text();
  return orderData;
}

//this function finds the prices in the order form and updates the subtotal
function updateSubtotal(event) {
  const orderPrices = $('.order-price');
  let pricesArray = [];
  for (let i = 0; i < orderPrices.length; i++){
    pricesArray.push(orderPrices.eq(i).text());
  }
  const subtotalValue = sumPrices(pricesArray);
  console.log(subtotalValue);
  const subtotalLocation = $('.subtotal-amount');
  subtotalLocation.text(subtotalValue);
  return subtotalValue;
}

//this function takes an array of prices and returns a sum formatted as a price
function sumPrices(arr) {
  let sum = 0;
  for (const price of arr) {
    let workingPrice = price.replace('$', '');
    let summingPrice = Number(workingPrice);
    sum += summingPrice;
  }
  return '$' + sum.toFixed(2);
}


//this function will update the tax
function updateTaxAndTotal(price) {
  let workingPrice = price.replace('$', '');
  let numberPrice = Number(workingPrice);
  let tax = numberPrice * 0.1;
  const taxLocation = $('.tax-amount');
  taxLocation.text('$' + tax.toFixed(2));
  const totalLocation = $('.total-amount');
  totalLocation.text('$' + (tax + numberPrice).toFixed(2));
}
