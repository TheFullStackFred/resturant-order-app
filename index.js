import { menuArray } from './data.js'

const orderItems = document.getElementById('order-items')
const totalPriceSection = document.getElementById('total-price-section')
const completeOrderSection = document.getElementById('complete-order-section')
const orderMessageSection = document.getElementById('order-message-section')
const modal = document.getElementById('modal')
document.getElementById('pay-btn').addEventListener('click', handlePayment)

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

function handlePayment(e) {
  e.preventDefault()

  modal.style.display = 'none'
  orderItems.style.display = 'none'
  totalPriceSection.style.display = 'none'
  completeOrderSection.style.display = 'none'

  const name = document.getElementById('name-input').value

  const orderMessageHtml = `
  <p>Thanks, ${name}! Your order is on its way!</p>
  `
  orderMessageSection.style.display = 'block'
  orderMessageSection.innerHTML = orderMessageHtml

  setInterval(function () {
    orderMessageSection.style.display = 'none'
  }, 3000)
}

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
    orderItems.style.display = 'block'
    totalPriceSection.style.display = 'flex'
    completeOrderSection.style.display = 'block'
  } else {
    orderItems.style.display = 'none'
    totalPriceSection.style.display = 'none'
    completeOrderSection.style.display = 'none'
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
      modal.style.display = 'block'
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
