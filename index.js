import { menuArray } from './data.js'

function getMenuHtml() {
  let menuHtml = ''

  menuArray.forEach(function (menuItem) {
    console.log(menuItem)

    menuHtml += `
    <div class="menu-item-container">
    <h2 class="menu-item-emoji">${menuItem.emoji}</h2>
    <h3 class="menu-item-name">${menuItem.name}</h3>
    <p class="menu-item-ingredients">${menuItem.ingredients}</p>
    <p class="menu-item-price">${menuItem.price}$</p>
    <i class="fa-light fa-plus add-icon"></i>
    </div>
    `
  })
  return menuHtml
}

function render() {
  document.getElementById('menu-items').innerHTML = getMenuHtml()
}

render()
