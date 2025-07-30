const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "It was finally time, time for me to be crowned the world olympic champion in :insertx:. My father's words echoed in my mind... :inserty:, the audience was watching intently as I took a deap breath, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = [ "guessing how many peanut m&m's are in a jar",
"residential mail delivery without vehicle assistance",
""
];

const insertY = [ "'No matter what happens, we love you. But also we didn't drive all this way for you to perform like this'",
"Disneyland",
"the White House",
];

const insertZ = [ "spontaneously combusted",
"melted into a puddle on the sidewalk",
"turned into a slug and crawled away"
];


function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}


function generateStory() {
let newStory = storyText;

const xItem = randomValueFromArray(insertX);
const yItem = randomValueFromArray(insertY);
const zItem = randomValueFromArray(insertZ);

newStory = newStory.replace(/:insertx:/g, xItem);
newStory = newStory.replace(":inserty:", yItem);
newStory = newStory.replace(":insertz:", zItem);


if (customName !== "") {
  newStory = newStory.replace("Bob", customName.value);
}

if (document.getElementById("uk").checked) {
  const weight = Math.round(300 / 14) + " stone";
  const temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";

  newStory = newStory.replace("300 pounds", weight);
  newStory = newStory.replace("94 fahrenheit", temperature);
}

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

randomize.addEventListener('click', generateStory);