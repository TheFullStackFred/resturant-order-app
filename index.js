import { menuArray } from './data.js'

let cart = []

document.addEventListener('click', function (event) {
  if (event.target.dataset.add) {
    addToCart(event.target.dataset.add)
  } else if (event.target.dataset.remove) {
    removeFromCart(event.target.dataset.remove)
  }
})

function totalPrice() {
  let total = 0

  cart.forEach(function (item) {
    total += item.price
    console.log(total)
  })
  return total
}

function removeFromCart(itemId) {
  cart = cart.filter(function (item) {
    return item.id !== Number(itemId)
  })
  console.log(cart)
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
    document.getElementById('order-items').classList.remove('hidden')
  } else {
    document.getElementById('order-items').classList.add('hidden')
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
