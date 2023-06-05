import { menuArray } from './data.js'

let cart = []

document.addEventListener('click', function (event) {
  if (event.target.dataset.add) {
    addToCart(event.target.dataset.add)
  } else if (event.target.dataset.remove) {
    removeFromCart(event.target.dataset.remove)
  } else if (event.target.dataset.complete) {
    alert()
  }
})

function totalPrice() {
  let total = 0

  cart.forEach(function (item) {
    total += item.price
  })
  return total
}

function removeFromCart(itemId) {
  cart = cart.filter(function (item) {
    return item.id !== Number(itemId)
  })
  renderCart(cart)
}

function addToCart(itemId) {
  let addedItem = menuArray.filter(function (item) {
    return item.id === Number(itemId)
  })[0]

  cart.push(addedItem)
  renderCart(cart)
}

function renderCart(cartItems) {
  if (cartItems.length > 0) {
    document.getElementById('order-items').style.display = 'block'
    document.getElementById('total-price-section').style.display = 'flex'
    document.getElementById('complete-order-section').style.display = 'block'
  } else {
    document.getElementById('order-items').style.display = 'none'
    document.getElementById('total-price-section').style.display = 'none'
    document.getElementById('complete-order-section').style.display = 'none'
  }
  let cartHtml = ''
  cartHtml += '<h2 class="order-title">Your order</h2>'

  cartItems.forEach(function (item) {
    cartHtml += `
    <div class="order-item">
        <p class="item-name">${item.name}</p>
        <button class="remove-btn" data-remove="${item.id}">remove</button>
    </div>
    `
  })
  document.getElementById('order-items').innerHTML = cartHtml

  const total = totalPrice()
  let totalPriceHtml = ''

  totalPriceHtml = `
  <p class="total-price-text">Total price:</p><p class="total-price-text">$${total}</p>
  `
  document.getElementById('total-price-section').innerHTML = totalPriceHtml

  let completeOrderHtml = ''
  completeOrderHtml = `
  <button id="complete-order-btn" class="btn">Complete order</button>
  `
  document.getElementById('complete-order-section').innerHTML =
    completeOrderHtml

  document
    .getElementById('complete-order-btn')
    .addEventListener('click', function () {
      document.getElementById('modal').style.display = 'block'
    })
}

function getMenuHtml() {
  let menuHtml = ''

  menuArray.forEach(function (item) {
    menuHtml += `
    <div class="menu-item">
        <div class="menu-info">
            <div class="item-emoji">
                ${item.emoji}
            </div>
            <div>
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
        </div>
<button class="add-btn" data-add="${item.id}">+</button>
    </div>`
  })
  return menuHtml
}

function render() {
  document.getElementById('menu-items').innerHTML = getMenuHtml()
}

render()
