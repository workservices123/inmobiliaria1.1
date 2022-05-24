const container = document.getElementById("container-cards")
const selectProducts = document.getElementById("select-products")
const btnCreate = document.getElementById("btn-create")
let imgSelected = " "
let idProduct = 0

const modal = document.querySelector('.modal')
const closeModal = document.getElementById('close-modal')
const newProduct = document. getElementById('new-product')
const newPrice = document.getElementById('new-price')
const newImage = document.getElementById('new-image')
const btnNewProduct = document.getElementById('btn-new-create')
const filterXPrice = document.getElementById('filterXPrice')

window.addEventListener("load",listSelect)
selectProducts.addEventListener('change',renderCards)
btnCreate.addEventListener('click', showModal)
btnNewProduct.addEventListener('click', createNewProduct)
newImage.addEventListener('change', importImg)
closeModal.addEventListener('click', ()=> modal.style.display = 'none')
filterXPrice.addEventListener('change', filterProducts)

function filterProducts(event){
    const responseFilter = event.target.value === 'Menor a 400'
    ? products.filter(product => product.price < 400)
    : event.target.value === 'Entre 400 y 800'
    ? products.filter(product => product.price >= 400 && product.price <= 800)
    : event.target.value === 'Mayores a 800'
    ? products.filter(product => product.price > 800)
    : null

    container.innerHTML = ''
    responseFilter.map(product => createCards(product))
}

function importImg(event){
    const currentImg = event.target.files[0]
    const objectURL = URL.createObjectURL(currentImg)
    imgSelected = objectURL
}

function createNewProduct(){
    idProduct++
    const titleProduct = newProduct.value
    const priceProduct = newPrice.value
    const id = idProduct


    const newFruit = {id:id , name: titleProduct, price: priceProduct,img: imgSelected}

    products.push(newFruit)
    listSelect()
    modal.style.display = 'none'
}

function showModal() {
    modal.style.display = 'flex'
}


function renderCards (){

    products.map( product => {product.name ===  selectProducts.value ? createCards(product): null})
}

function listSelect(){
    selectProducts.innerHTML = '' 
    const anyOption = document.createElement('option')
    selectProducts.appendChild(anyOption)
    anyOption.textContent = 'Select a Product'
    products.map( product => {
        const option = document.createElement('option')
        option.value = product.name
        option.textContent = product.name
        selectProducts.appendChild(option)
        })
}

function createCards(product){
    const{name, img, id, price} = product

    const card = document.createElement("div")
    card.classList.add('card-product')

    const imgCard  = document.createElement('img')
    imgCard.setAttribute('src',img)
    imgCard.setAttribute('alt',name)
    imgCard.classList.add('img-product')

    const nameCard = document.createElement('p')
    nameCard.textContent = name
    nameCard.classList.add()

    const priceCard = document.createElement('p')
    priceCard.textContent = price

    const btnAdd = document.createElement('button')
    btnAdd.setAttribute ('id',id)
    btnAdd.textContent = 'add to the cart'

    card.appendChild(imgCard)
    card.appendChild(nameCard)
    card.appendChild(priceCard)
    card.appendChild(btnAdd)

    container.appendChild(card)

    btnAdd.addEventListener('click', buy)
    const table = document.querySelector('.table1')

    let x = id

    function buy() {
        const tr = document.createElement('tr');
        const id = document.createElement('th');
        const productos = document.createElement('td');
        const counter = document.createElement('td');
        const buttons = document.createElement('td');
        const actionSub = document.createElement('button');
        const actionAdd = document.createElement('button');
        const price = document.createElement('td');
        
        
        id.setAttribute('id',id)
        id.textContent = x

        productos.textContent = nameCard.textContent;
        counter.textContent = 1;
        actionSub.textContent = '-';
        actionAdd.textContent = '+'
        price.textContent = priceCard.textContent;
        buttons.appendChild(actionSub);
        buttons.appendChild(actionAdd);
        tr.appendChild(id); 
        tr.appendChild(productos);     
        tr.appendChild(counter);     
        tr.appendChild(buttons);     
        tr.appendChild(price);
        table.appendChild(tr)

        actionAdd.addEventListener('click',sumarCantidad)
        actionAdd.addEventListener('click',sumarPrecio)
        actionSub.addEventListener('click',restarCantidad)
        actionSub.addEventListener('click',restarPrecio)

        function sumarCantidad(){
            let cantidad = Number(counter.textContent)+1
            return counter.textContent = cantidad
        }
        function sumarPrecio(){
            let precio = Number(price.textContent)+Number(priceCard.textContent)
            return price.textContent = precio
        }
        function restarCantidad(){
            let cantidad = Number(counter.textContent)-1
            if(cantidad < 1){
          table.removeChild(tr) 
        }
        return counter.textContent = cantidad
        }
        function restarPrecio(){
            let precio = Number(price.textContent)-Number(priceCard.textContent)
            return price.textContent = precio
        }

    }
}

// products.map((element=>{console.log(element.name)}));