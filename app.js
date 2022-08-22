let kittens = []
let kitten = {}
let mood = ""
let affection = 5 

loadKittens()
drawKittens()
setKittenMood(kitten)

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault() //NOTE stopping the page from refreshing when submitted
  let form = event.target
  let kittenName = form.name.value
  let currentKitten = kittens.find ((kitten) => kitten.name == kittenName)
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
  };
  
  if (!currentKitten) {
    if (kittens.length >=3){
      form.reset();
      return;
    }
  }
  
  if (currentKitten) {
    alert("ALL CATS ARE SPECIAL AND UNIQUE!")
    form.reset()
    return
  }
  else {
    
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
  drawKittens()
  
  document.getElementById("cat-meow").play()
}


  

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensTemplate = ""
  
  kittenCard = document.getElementById("kittens")
  kittensTemplate = " "
  kittens.forEach((kitten) => {
    kittensTemplate += `
    <div>
  <div id="catImage" class = "cardKitty   m-2  text-dark p-2  kitten ${kitten.mood}">
  <img src="./MrKitty.webp" alt="kitty" class="w-50 m-3">
  <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-info" type="button" onclick ="pet('${kitten.id}')">Pet</button>
  <button class="btn btn-warning " type="button" onclick = "catnip('${kitten.id}')">Catnip</button>
</div>
  <div id = "kittenStats" >
  <h2>${kitten.name}</h2>
  <h2>Mood: ${kitten.mood}</h2>
  <h2>Affection: ${kitten.affection}</h2>
  </div>
  
  <div> <button class ="btn-cancel" type="button" onclick ="clearKittens('${kitten.id}')"><i class="fa-solid fa-wand-magic-sparkles fa-2xl"></i>
  </button></div>
 
  </div>
  </div>
  `;

});
kittenCard.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((kitten) => kitten.id === id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let rNum = Math.random()
  if (currentKitten.affection == 10) {
    return
  }
  if (currentKitten.affection == 0) {
    return
  }
  if (rNum > 0.5) {
    currentKitten.affection++
    setKittenMood(currentKitten)
    saveKittens()
  }
  if (rNum < 0.5) {
    currentKitten.affection--
    setKittenMood(currentKitten)
    saveKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
let currentKitten = findKittenById(id)
  if (currentKitten.affection == 0) {
    return
  }
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if (kitten.affection >= 8) {kitten.mood = "happy"
  document.getElementById("cat-happy").play()
}
  if (kitten.affection == 5) {kitten.mood =   "tolerant"}
  if (kitten.affection <= 3) {kitten.mood = "angry"}
  if (kitten.affection == 0) {kitten.mood = "gone"
  document.getElementById("cat-gone").play()
}
  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id){
  let  kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  kittens.splice(kittenIndex, 1);
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add("hidden")
  console.log('Good Luck, Take it away')
  document.getElementById("nameInput").classList.remove("hidden")
  document.getElementById("kittens").classList.toggle("hidden")
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
