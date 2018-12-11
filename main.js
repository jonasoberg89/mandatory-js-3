let div = document.querySelector("#list");
let subBreedList = document.querySelector("#subbredlist");
const button = document.querySelector ("#randombutton");
let myTarget;
let breedType;
// Button that change img.
button.addEventListener ("click", function(){
    if (window.location.hash.includes("/")){
        subBreed (window.location.hash)
    }
    else if (window.location.hash){
        randomBreedImg(window.location.hash)
    }
    else{getRandomDog()};
});

// click on header to reset window.location.hasch.
function resetFunction(){
    let url = window.location.toString();
    if (url.indexOf("#") > 0) {
        let clean_url = url.substring(0, url.indexOf("#"));
        window.history.replaceState({}, document.title, clean_url);
    }
    getRandomDog(); 
}
// request and respone function.
function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .then(response => {return response })
    .catch(error => console.error('Error:', error));
   }
// img in dom.
function reqListener (data){
    let picture = document.querySelector("#randompicture");
    picture.src = data.message;
}

// show random dog 
function getRandomDog (){
    getData("https://dog.ceo/api/breeds/image/random")
    .then(res => reqListener(res))
    .catch(error => console.error('Error:', error));
}
// get a list for all breeds
function allBreeds (){
    getData ("https://dog.ceo/api/breeds/list/all")
    .then(res => buildList(res))
    .catch(error => console.error('Error:', error));
}
// shows random dog of a breed
function randomBreedImg (e){
    if (e === window.location.hash){
        let str = e
        myTarget = str.replace("#","");     //delete the hasch from myTarget to make det request work
    }
    else {myTarget = e.textContent};
    getData ("https://dog.ceo/api/breed/"+myTarget+"/images/random")    
    .then(res => reqListener(res))
    getData ("https://dog.ceo/api/breed/"+myTarget+"/list")
   .then(res => getSubBreed(res));
}
// shows random dog of a subreed
function subBreed (e){
    if (e === window.location.hash){
        getData("https://dog.ceo/api/breed/" + myTarget + '/' + breedType + "/images/random")
    }
    else {breedType = e.textContent};
    getData("https://dog.ceo/api/breed/" + myTarget + '/' + breedType + "/images/random")
    .then(res => reqListener(res))
    .catch(error => console.error('Error:', error));
}

// builds a list for every breed
function buildList (data){
    let obj = data.message;
    for (let key in obj){
        let li = document.createElement("li");
        let aTag = document.createElement("a");
        aTag.textContent = (key);
        aTag.setAttribute("href", "#" + key);
        aTag.setAttribute("onClick", "randomBreedImg(this)");
        div.appendChild(li);
        li.appendChild(aTag);
    }
}
// builds a list for every subbreed
function getSubBreed(obj){
    while (subBreedList.firstChild) {
        subBreedList.removeChild(subBreedList.firstChild);  // delete Sub-Breed list before creating a new one.
    }
    let data = obj;
    let h2 = document.createElement("h2");
    h2.textContent = myTarget + " Sub Breeds:";
    let ulTag = document.createElement("ul");
    ulTag.setAttribute("id", "subBreedUl");
    if (data.length !== 0){
        subBreedList.appendChild(h2);  
    }
    subBreedList.appendChild(ulTag);
    let array;
        for (let key in data){
            array = data[key];
        }
    for (let i = 0; i < array.length;i++){
        let li = document.createElement("li");
        let Atag = document.createElement("a");
        Atag.setAttribute("href", "#"  + myTarget + "/" + array[i]);
        Atag.setAttribute("onClick", "subBreed(this)");
        Atag.textContent = (array[i]);
        ulTag.appendChild(li);
        li.appendChild(Atag);
    }
}
   

allBreeds ();
getRandomDog (); 
