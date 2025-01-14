const getBeerInfo = () => {
  let beerObject = {}
  let fields = document.querySelectorAll("form input[type='text']");

  fields.forEach(field => {
      beerObject[field.name] = field.value
  })
  let select = document.getElementById("category")
  let category = select.options[select.selectedIndex].value


  beerObject = { ...beerObject, category }

  saveBeer(beerObject)
  fields.forEach(field => {
      field.value = ""
  })
}


document.getElementById("save-Beer").addEventListener("click", getBeerInfo)

const saveBeer = beer => {
  let xhttp = new XMLHttpRequest(); /**/

  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

          $('#save-succesful').modal('show')
          printTable(getBeersCollection())
      }
  }
  xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers.json", true);
  xhttp.send(JSON.stringify(beer));
}

const getBeersCollection = () => {
  let beersCollection;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

          beersCollection = JSON.parse(xhttp.response)
      }
  }
  xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers.json", false);
  xhttp.send();
  return beersCollection
}

const deleteBeer = event => {

  let beerKey = event.target.dataset.beerKey

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

          printTable(getBeersCollection())
      }
  }
  xhttp.open("DELETE", `https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers/${beerKey}/.json`, false);
  xhttp.send();
}


const printTable = dataToPrint => {

  let table = document.getElementById("beer-table")
  let index = 1


  while (table.lastElementChild) {
      table.removeChild(table.lastElementChild);
  }
  for (key in dataToPrint) {


      let { name, description, price, url, category } = dataToPrint[key]

      let beerRow = document.createElement("tr")

      let indexTd = document.createElement("td")
      let nameTd = document.createElement("td")
      let descriptionTd = document.createElement("td")
      let priceTd = document.createElement("td")
      let imageTd = document.createElement("td")
      let categoryTd = document.createElement("td")
      let buttonTd = document.createElement("td")
      let image = document.createElement('IMG')
      image.src = url
      image.classList.add("img-fluid")

      // descriptionTd.classList = "text-truncate"
      // descriptionTd.style.maxWidth = "100px"

      // imageTd.classList = "text-truncate"
      // imageTd.style.maxWidth = "100px"

      let indexText = document.createTextNode(index)
      let nameText = document.createTextNode(name)
      let descriptionText = document.createTextNode(description)
      let priceText = document.createTextNode(price)
      let categoryText = document.createTextNode(category)

      let deleteButton = document.createElement("button")
      deleteButton.classList = "btn btn-primary delete-button mt-1"
      deleteButton.dataset.beerKey = key

      let buttonText = document.createTextNode("Borrar")

      deleteButton.appendChild(buttonText)

      indexTd.appendChild(indexText)
      nameTd.appendChild(nameText)
      descriptionTd.appendChild(descriptionText)
      priceTd.appendChild(priceText)
      imageTd.appendChild(image)
      categoryTd.appendChild(categoryText)
      buttonTd.appendChild(deleteButton)

      beerRow.appendChild(indexTd)
      beerRow.appendChild(nameTd)
      beerRow.appendChild(descriptionTd)
      beerRow.appendChild(priceTd)
      beerRow.appendChild(imageTd)
      beerRow.appendChild(categoryTd)
      beerRow.appendChild(buttonTd)

      table.appendChild(beerRow)
      index++
  }
  /*agrupamos todos los botones*/
  let buttons = document.querySelectorAll(".delete-button")

  /*agregamos el listener a cada botón*/
  buttons.forEach(button => {
      button.addEventListener("click", deleteBeer)
  })
}

printTable(getBeersCollection())
