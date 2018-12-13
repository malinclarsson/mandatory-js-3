//______________________________________________________________________________
//                                    VARAIBLES.
//______________________________________________________________________________
//=================== declare varaibles ======================================//
let nav        = document.querySelector("nav");
let section    = document.querySelector("section");
let main       = document.querySelector("main");
let h1         = document.querySelector("h1"); // breed-title
h1.textContent = ""; // title is empty by default
let img        = document.querySelector("img"); // images
let button     = document.querySelector("button"); // refresh-button

let parsedData;
let breed;
let subBreed;
let subString;
//______________________________________________________________________________
//                                    DATA.
//______________________________________________________________________________
//=================== toUpperCase ============================================//
function big(string) { // First letter should be UPPER CASE
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//=================== toLowerCase ============================================//
function small(string) { // First letter should be lower case
    return string.charAt(0).toLowerCase() + string.slice(1);
}
//=================== request data ===========================================//
function getData() {
    let currentBreed = window.location.hash.substring(1);
    let req = new XMLHttpRequest (); //
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getData();

//=================== parse checked data =====================================//
function parse() {
  let parsedData = JSON.parse(this.responseText);
  renderText(parsedData.message);
}
//=================== render to list =========================================//
function renderText(data) {
    let ul = document.createElement("ul");
    nav.appendChild(ul);
    for (let key in data){
        let li = document.createElement("li");
        li.textContent = big(key);
        li.addEventListener('click', function (e) {
        window.location.hash = small(e.target.textContent);

        getBreedImg();
        getSubBreed();
      });
      ul.appendChild(li);
    }
  }
//______________________________________________________________________________
//=================== request subbreed data ==================================//
function getSubBreed() {
  let currentBreed = window.location.hash.substring(1);
  let req = new XMLHttpRequest (); //
  req.open('GET', 'https://dog.ceo/api/breed/' + currentBreed + '/list');
  req.addEventListener("load", parseSubBreed);
  req.send();
}
//=================== parse subbreed data ====================================//
function parseSubBreed() {
  let parsedSub = JSON.parse(this.responseText);
  renderSubText(parsedSub.message);
}
//=================== render subbreed data to list ===========================//
function renderSubText(data) {
  if (data.length > 0) {
    section.innerHTML = "";
    let currentBreed = window.location.hash.substring(1);
    let ul = document.createElement("ul");
    section.appendChild(ul);
    for (let key of data){
      let li = document.createElement("li");
      li.textContent = big(key);
      ul.appendChild(li);
      li.addEventListener('click', function (e) {
        window.location.hash = currentBreed + "/" + small(e.target.textContent);
        getBreedImg();
      });
    }
  } else {
    section.innerHTML = "";
  }
}
//______________________________________________________________________________
//                                    IMAGES.
//______________________________________________________________________________
//=================== request random images ==================================//
function getRandomImg() {
  let currentBreed = window.location.hash.substring(1);
    let req = new XMLHttpRequest ();
    req.open("GET", "https://dog.ceo/api/breeds/image/random");
    req.addEventListener("load", parseImg);
    req.send();
}
//=================== parse random images ====================================//
function parseImg() {
   let parsedData = JSON.parse(this.responseText);
   renderImg(parsedData.message);
}
//=================== render random images ===================================//
function renderImg (imgData) {
  let checkImg = document.querySelector("img");
  if (checkImg){
    main.removeChild(checkImg);
  }
  let img = document.createElement("img");
  img.setAttribute("src", imgData);
  main.appendChild(img);
}

//=================== click for random images ================================//
button.addEventListener("click", function() {
  if (window.location.hash !== "") {
      getBreedImg();
  } else {
      getRandomImg();
  }
});
//______________________________________________________________________________
//=================== request breed pictures =================================//
function getBreedImg() {
  let currentBreed = window.location.hash.substring(1);
  let req = new XMLHttpRequest ();
  req.open("GET", "https://dog.ceo/api/breed/"+currentBreed+"/images/random");
  req.addEventListener("load", parseBreedImg);
  req.send();

}
//=================== parse breed images =====================================//
function parseBreedImg() {
  let parsedData = JSON.parse(this.responseText);
  renderBreedImg(parsedData.message);
}
//=================== render breed images ====================================//
function renderBreedImg (imgData) {
  let checkImg = document.querySelector("img");
  if (checkImg){
    main.removeChild(checkImg);
  }
  let img = document.createElement("img");
  img.setAttribute("src", imgData);
  main.appendChild(img);

  setCurrentBreed();
}
//______________________________________________________________________________
//=================== set title ==============================================//
function setCurrentBreed() {
  let hash = window.location.hash.substring(1).split("/");

  h1.textContent = "";
  if (hash.length === 2) {
    h1.textContent = big(hash[0]) + " (" + big(hash[1]) + ")";
  } else {
    h1.textContent = big(hash[0]);
  }
}
//______________________________________________________________________________
//=================== call functions IF hash is empty ========================//
if (window.location.hash !== "") {
  getBreedImg();
} else {
  getRandomImg();
}
