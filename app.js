let murderer = ''
const animals = [
  {
    name: 'Leo',
    picture: '🦁',
    isAlive: true,
    weapon: 'teeth',
    diet: ['meat', 'frosted flakes'],
    age: 10
  },
  {
    name: 'Sally',
    picture: '🦥',
    weapon: 'claws',
    isAlive: true,
    diet: ['berries'],
    age: 10
  },
  {
    name: 'Ally',
    picture: '🐊',
    weapon: 'teeth',
    isAlive: true,
    diet: ['floridians', 'meat'],
    age: 10
  },
  {
    name: 'Tyler',
    picture: '🐯',
    weapon: 'claws',
    isAlive: true,
    diet: ['frosted flakes', 'meat'],
    age: 10
  },
  {
    name: 'Larry',
    picture: '🐲',
    weapon: 'magic',
    isAlive: true,
    diet: ['sheep', 'wizards', 'monkey'],
    age: 1000
  },
  {
    name: 'Morris',
    picture: '🐒',
    weapon: 'kung fu',
    isAlive: true,
    diet: ['berries', 'bananas', 'monkeys'],
    age: 30
  },
  {
    name: 'Harry',
    picture: '🧙‍♂️',
    weapon: 'magic',
    isAlive: true,
    diet: ['berries', 'noodles', 'butter beer'],
    age: 48
  },
  {
    name: 'Olivia',
    picture: '🦦',
    weapon: 'magic',
    isAlive: true,
    diet: ['shrimp', 'fish', 'duck'],
    age: 8
  },
  {
    name: 'Master Po',
    picture: '🐼',
    weapon: 'kung fu',
    isAlive: true,
    diet: ['rice', 'noodles', 'bamboo', 'dumplings'],
    age: 192
  },
  {
    name: 'Debrah',
    picture: '🦓🪄',
    weapon: 'magic',
    isAlive: true,
    diet: ['grain', 'garbage'],
    age: 19
  },
  {
    name: 'Sheesh',
    picture: '🐑',
    weapon: 'horns',
    isAlive: true,
    diet: ['garbage'],
    age: 16
  },
  {
    name: 'Turbo',
    picture: '🦃',
    isAlive: true,
    weapon: 'claws',
    diet: ['grain', 'garbage'],
    age: 22
  },
  {
    name: 'Will',
    picture: '🐳',
    weapon: 'sheer weight',
    isAlive: true,
    diet: ['shrimp', 'krill', 'nemo'],
    age: 100
  }
]


function getRandomMurderer() {
  let randomIndex = Math.floor(Math.random() * animals.length)
  let animal = animals[randomIndex]
  murderer = animal.name
}


function accuseOfMurder(suspect) {
  if (!murderer) { return }
  // console.log('you are accusing....', suspect)

  if (suspect == murderer) {
    alert('The Murderer was found Great Job!!!')
    murderer = ''
    // console.log('The Murderer was found Great Job!!!')
    return /// NOTE FULL STOP YOU SHALL NOT PASS
  }
  // TODO BAD STUFF

  // TODO pick a random animal to die
  // cant be the murderer
  // cant be dead already

  // filter out everyone who is dead
  
  //                                                  vvv TRUTHY vs FALSY 
  let livingAnimals = animals.filter(animal => animal.isAlive)
  let killableAnimals = livingAnimals.filter(animal => animal.name != murderer)

  let randomIndex = Math.floor(Math.random() * killableAnimals.length)
  let animalToKill = killableAnimals[randomIndex]
  animalToKill.isAlive = false

  // don't draw before you do your dirty work
  drawAnimals()
  getClue()
}

function drawAnimals() {
  let animalButtons = document.getElementById('animal-buttons')
  let template = ''

  animals.forEach(animal => {

    if (animal.isAlive) {
      template += ` 
      <button class="btn btn-dark mb-3" oncontextmenu="return false;" onclick="accuseOfMurder('${animal.name}')">${animal.picture}</button> `
    } else {
      template += `
      <button class="btn btn-danger mb-3" oncontextmenu="return false;" disabled>${animal.picture}</button> 
      `
    }


  })

  // @ts-ignore
  animalButtons.innerHTML = template
}

function drawClues(clue){
  document.getElementById('clues').innerHTML += `<p >${clue}</p>`
}

function getClue(){
  let guilty = animals.find(animal => animal.name == murderer)
  let properties = ['diet', 'age', 'name', 'weapon']
  let clueProp = properties[Math.floor(Math.random()*properties.length)]
  let clue = ''
  switch(clueProp){
    case 'age' : clue = `this animal is ${guilty.age} years old`
    break;
    case 'name' : clue = `this animal's name starts with ${guilty.name[0]}`
    break;
    case 'diet': clue = `this animal likes to eat ${guilty.diet[Math.floor(Math.random()*guilty.diet.length)]}`
    break;
    case 'weapon': clue = `this animal likes to  kill. Their murder weapon of choice? oh glad you asked, it's their ${guilty.weapon}`
    break;
  }
  console.log('your clue - ', clue);
  drawClues(clue)
}


function resetGame() {
  animals.forEach(animal => {
    animal.isAlive = true
  })

  drawAnimals()
  getRandomMurderer()
  // NOTE reset clues
  document.getElementById('clues').innerHTML = '' 
  getClue()
}


drawAnimals()
getRandomMurderer()
getClue()