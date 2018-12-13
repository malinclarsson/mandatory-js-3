//_____________________________________________________________________________________________
//                                    VARAIBLES.
//_____________________________________________________________________________________________
//=================== declare varaibles ======================================//
let nav        = document.querySelector("nav"); // where the list of breeds will be
let section    = document.querySelector("section"); // where the list of sub-breeds will be
let main       = document.querySelector("main"); // breed-title, images + button
let h1         = document.querySelector("h1"); // breed-title
h1.textContent = "Random pictures"; // title is "Random picture" by default
let img        = document.querySelector("img"); // images
let button     = document.querySelector("button"); // refresh-button

let parsedData; // parsed data
let breed; // chosen breed - from list
let subBreed; // chosen subbreed - from list
let subString;

//_____________________________________________________________________________________________
//                                    DATA.
//_____________________________________________________________________________________________
//=================== toUpperCase =================================//
function big(string) { // First letter should be UPPER CASE
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//=================== request data ===========================================// <-- WORKS (kind of...)
function getData() {
    let req = new XMLHttpRequest (); //
    req.open("GET", "https://dog.ceo/api/breeds/list/all"); // request "get me data", "from this URL"
    req.addEventListener("load", parse); // when done, start the function 'parse()'
    req.send(); // send the request
  /*console.log(this.status); // shows the statuscode for the request            <-- funkar inte?
    console.log(this.responseText); // shows the requested data                  <-- funkar inte? */
}
getData(); // call function 'getData()'
//=================== check if data is valid =================================//

//=================== parse checked data =====================================// <-- WORKS
function parse() { // function to parse incoming data, from JSON to JS object
  let parsedData = JSON.parse(this.responseText); // save parsed data to 'parsedData'
  renderText(parsedData.message); // calls the function 'renderText()', with the argument 'parsedData'
}
//=================== render to list =========================================// <-- WORKS
function renderText(data) {
    let select = document.querySelector("select"); // points to <select>
    for (let key in data){ // loops through the object 'data'
        let option = document.createElement("option"); // creates a new <option>
        option.textContent = big(key); // put <option>'s content to the current value of 'key'(uppercase) in the loop
        select.appendChild(option); // in <select>, add an <option>
        window.location.hash = "/" + "Random"; // set the #______ to "/Random"
    }
      option.addEventListener('click', getRandomImg, getSubBreed); // when an <option> is clicked, call the function 'getRandomImg()'
  }
//_____________________________________________________________________________________________
//=================== request subbreed data =========================================//
function getSubBreed() {
  let req = new XMLHttpRequest (); //
  req.open('GET', 'https://dog.ceo/api/breed/' + breed + '/list'); // request "get me data", "from this URL"
  req.addEventListener("load", parseSubBreed); // when done, start the function 'parseSubBreed()'
  req.send(); // send the request
}
//=================== parse subbreed data =====================================//
function parseSubBreed() { // function to parse incoming data, from JSON to JS object
  let parsedSub = JSON.parse(this.responseText); // save parsed data to 'parsedSub'
  renderSubText(parsedSub.message); // calls the function 'renderSubText()', with the argument and its value
}
//=================== render subbreed data to list =========================================//
function renderSubText(data) {
  let ul = document.createElement("ul"); // creat an <ul>
  section.appendChild(ul); // place the <ul> in <section>
  for (let key in data){ // loop through the object 'data'
    let li = document.createElement("li"); // create a new <li>
    li.textContent = big(key); // put <li>'s content to the current value of 'key'(uppercase) in the loop
    ul.appendChild(li); // place the <li> in <ul>
    window.location.hash = "/" + breed; // set the #______ to "/name of clicked breed"
  }
  li.addEventListener('click', getSubBreedImg, getSubBreedHash); // when a <li> is clicked, call the function 'getSubBreedImg()'
}
//=================== set loadSubBreedPage-hash =========================================//
/*
function getSubBreedHash () {
  window.location.hash = "/" + breed + "/" subBreed; // set the #______ to "/name of clicked breed + subbreed"
}
*/
//_____________________________________________________________________________________________
//                                    IMAGES.
//_____________________________________________________________________________________________
//=================== request random images =======================================// <-- WORKS
function getRandomImg() {
    let req = new XMLHttpRequest (); //
    req.open("GET", "https://dog.ceo/api/breeds/image/random"); // request images from this URL
    req.addEventListener("load", parseImg); // when done, start the function 'parseImg()'
    req.send(); // send the request
}
//=================== parse random images =======================================//
function parseImg() { // function to parse incoming , from JSON to JS object
   let parsedData = JSON.parse(this.responseText);  // save parsed data to 'parsedData'
   renderImg(parsedData.message); // calls the function 'renderImg()', with the argument and its value
}
//=================== render random images =======================================//
function renderImg (imgData) {
  let checkImg = document.querySelector("img"); // images of random dogs
  if (checkImg){ // IF there already is an image
    main.removeChild(checkImg); // then remove the current one
  }
  let img = document.createElement("img"); // creata e new <img>-element
  img.setAttribute("src", imgData); // set the images sourse in the <img>-tag
  main.appendChild(img); // apply 'img' in 'main'
}
getRandomImg(); // call functionen 'getRandomImg()'

//=================== click for random images =======================================//
button.addEventListener("click", getRandomImg); // when the button is clicked, start the function 'getRandomImg()'
//___________________________________________________________________________________________________________________________________

//=================== request breed pictures =======================================// <--
function getBreedImg(e) {
  let breed = e.target.value; // saving the value of selected breed
  let req = new XMLHttpRequest (); // request images from this URL
  req.open("GET", "https://dog.ceo/api/breed/"+breed+"/images/random"); // request images from this URL
  req.addEventListener("load", parseBreedImg); // when done, start the function 'parseBreedImg()')
  req.send(); // send the request
}
//=================== parse breed images =======================================//
function parseBreedImg() { // function to parse incoming , from JSON to JS object
  let parsedData = JSON.parse(this.responseText);  // save parsed data to 'parsedData'
  renderBreedImg(parsedData.message); // calls the function 'renderImg()', with the argument and its value
}
//=================== render breed images =======================================//
function renderBreedImg (imgData) {
  let checkImg = document.querySelector("img"); // images of random dogs
  if (checkImg){ // IF there already is an image
    main.removeChild(checkImg); // then remove the current one
  }
  let img = document.createElement("img"); // creata e new <img>-element
  img.setAttribute("src", imgData); // set the images sourse in the <img>-tag
  main.appendChild(img); // apply 'img' in 'main'
}
getBreedImg(); // call functionen 'getBreedImg()'

//=================== click for breed images =======================================//
button.addEventListener("click", getBreedImg); // when the button is clicked, start the function 'getRandomImg()'
//___________________________________________________________________________________________________________________________________

//=================== request subbreed pictures =======================================// <--
function getSubBreedImg(e) {
  let subBreed = e.target.value; // sparar värdet av vad som trycks på
  let req = new XMLHttpRequest (); // sparar i en variabel
  req.open("GET", "https://dog.ceo/api/breed/"+breed+ "/" +subBreed+"/images/random"); // request "get me images", "from this URL"
  req.addEventListener("load", parseSubBreedImg); // when done, start the function 'parseSubBreedImg()'
  req.send(); // send the request
}
//=================== parse subbreed images =======================================//
function parseSubBreedImg() { // function to parse incoming , from JSON to JS object
  let parsedData = JSON.parse(this.responseText);  // save parsed data to 'parsedData'
  renderSubBreedImg(parsedData.message); // calls the function 'renderSubBreedImg()', with the argument and its value
}
//=================== render subbreed images =======================================//
function renderSubBreedImg (imgData) {
  let checkImg = document.querySelector("img"); // images of random dogs
  if (checkImg){ // IF there already is an image
    main.removeChild(checkImg); // then remove the current one
  }
  let img = document.createElement("img"); // creata e new <img>-element
  img.setAttribute("src", imgData); // set the images sourse in the <img>-tag
  main.appendChild(img); // apply 'img' in 'main'
}
getSubBreedImg(); // call function 'getSubBreedImg()'

//=================== click for subbreed images =======================================//
button.addEventListener("click", getSubBreedImg); // when the button is clicked, start the function 'getRandomImg()'
//___________________________________________________________________________________________________________________________________
