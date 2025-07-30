const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "It was finally time, time for me to be crowned the world olympic champion in :insertx:. I took my starting position, :insertW:, and my father's words echoed in my mind... :inserty:. the audience was watching intently as I took a deap breath. The starter (the person in the olympics that shoots a gun to start the race) shot his gun to start the race. I moved from my :insertPosition: into a full sprint, and immediately :insertz: before getting to the first stage. I was mortified. My coach, Bob, was in the audience and saw the whole thing, but I shouldn't have been surprised. — :insertx: is known for being the most challenging olympic sport. It was also very hot that day, so that probably had something to do with it too.";

const insertX = [ "guessing how many peanut m&m's are in jars of various",
"residential mail delivery on a steep hill without vehicle assistance",
"trimming the nails of an angry cat"
];

const insertW = [ "a one leg-squat with the other leg straight out in front of me",
"laying face-down with my arms by my side like that planking trend from around 2010",
"a full backbend"
];

const insertY = [ "'No matter what happens, we love you. But also we didn't drive all this way for you to fail'",
"'Have you considered college?'",
"I suppose this is a perfectly reasonable life choice, and as long as you're happy then I'm happy'",
];

const insertZ = [ "shattered my leg",
"stubbed all my toes at the same time",
"noclipped through the stadium floor and fell out of bounds"
];


function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}


function generateStory() {
let newStory = storyText;

const xItem = randomValueFromArray(insertX);
const wItem = randomValueFromArray(insertW);
const yItem = randomValueFromArray(insertY);
const zItem = randomValueFromArray(insertZ);

newStory = newStory.replace(/:insertx:/g, xItem);
newStory = newStory.replace(":insertw:", wItem);
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