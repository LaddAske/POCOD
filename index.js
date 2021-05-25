var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector("#time")
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var isGameStarted = false
var score = 0


$start.addEventListener('click', startGame)
$game.addEventListener('click', clickGame)
$gameTime.addEventListener('input', setGameTime)


function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}


function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')

  isGameStarted = true
  $start.classList.add('hide')
  $game.style.backgroundColor = '#fff'


  var interval = setInterval(function () {
    var time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)


  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}


function setGameTime() {
  var time = parseInt($gameTime.value)
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}


function endGame() {
  isGameStarted = false
  setGameScore()
  show($start)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  show($resultHeader)
  hide($timeHeader)

  $gameTime.removeAttribute('disabled')

}

function clickGame(event) {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score++
    renderBox()

  }
}

function renderBox() {
  $game.innerHTML = ''


  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize



  box.style.width = box.style.height = boxSize + 'px'
  box.style.backgroundColor = 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')';
  box.style.position = 'absolute'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}