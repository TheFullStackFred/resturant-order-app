import { menuArray } from './data.js'

let cart = []

document.addEventListener('click', function (event) {
  if (event.target.dataset.add) {
    addToCart(event.target.dataset.add)
  }
})

function addToCart(itemId) {
  let addedItem = menuArray.filter(function (item) {
    return item.id === Number(itemId)
  })[0]

  cart.push(addedItem)
  renderCart(cart)
}

function renderCart(cartItems) {
  let cartHtml = ''
  cartHtml += '<h2 class="order-title">Your order</h2>'

  cartItems.forEach(function (item) {
    cartHtml += `<p>${item.name}</p>`
  })

  document.getElementById('order').innerHTML = cartHtml
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
