const array = [
  "test",
  { arg: 'question', params: [ 'Oui ?' ] },
  { arg: 'choix', params: [ 'R1', 'R2' ] },
  { arg: 'cible', params: [ 'Groupe 1' ] }
];

let question = array.filter(arg => arg.arg === 'question')[0].params.shift();

console.log(question)