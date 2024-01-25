function onReady() {
  console.log("JavaScript is loaded!")
}

onReady();

function submitGuesses(event) {
  event.preventDefault();
  let playerGuesses = {
    p1: document.getElementById('p1').value,
    p2: document.getElementById('p2').value,
    p3: document.getElementById('p3').value
  };

  axios({
    method: 'POST',
    url: '/game',
    data: playerGuesses
  }).then(function(response){
    console.log('response is good', response);
    // check to see if someone got it right

    // display the ids
  }).catch(function(error){
    console.log('error', error);
  });

}