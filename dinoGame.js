document.addEventListener('DOMContentLoaded', () =>{
	const dino = document.getElementById('dino')
	const game = document.querySelector('.game')
	const body = document.querySelector('body')
	const notification = document.getElementById('notif')
	const scoreText = document.getElementById('score')
	const recordText = document.getElementById('record')
	let isJumping = false
	let gravity = 0.9
	let isGameOver = false
	let score = 0
	let highscore = 0
	let keys = {}
	let gameSpeed = 6;
	var player = dino.getBoundingClientRect()
	console.log(player.bottom, player.right)

if(localStorage.getItem('highscore')){
	highscore = localStorage.getItem('highscore')
}

document.addEventListener('keydown', jump)
document.addEventListener('keydown', sit)
document.addEventListener('keyup', sit)

let position = 0

function jump(event){
  if(event.keyCode === 32 || event.keyCode == 87){
  isJumping = true
  let count = 0
  let timerId = setInterval(() => {
    //move down
    if (count === 15) {
      clearInterval(timerId)
      let downTimerId = setInterval(() => {
        if (count === 0) {
          clearInterval(downTimerId)
          isJumping = false
        }
        position -= 5
        count--
        position = position * gravity
        dino.style.bottom = position + 'px'
      },20)    
    }
    //move up
    position +=30
    count++
    position = position * gravity
    dino.style.bottom = position + 'px'
  },20)
}
}

function sit(event){
  if(event.type == 'keydown' && event.keyCode === 16){
    console.log(event.keyCode)
    position = 40
    dino.style.width = position + 'px'
    dino.style.height = position + 'px'
  }
  if(event.type == 'keyup' && event.keyCode === 16){
    console.log(event.keyCode)
    dino.style.width = 80 + 'px'
    dino.style.height = 80 + 'px'
    position = 0
  } 
}


function Update (){
	requestAnimationFrame(Update)
	score++
	if(score > highscore){
		highscore = score
	}
	gameSpeed += 0.003
	recordText.innerHTML = "Record :" + highscore
	scoreText.innerHTML = "Score :" + score
}


function generateObstacles() {
  let randomTime = Math.random() * 8000
  let obstaclePosition = 700
  const obstacle = document.createElement('div')
  const obstacletype = randomize(2)
  console.log(obstacletype)
  if (!isGameOver){
  	obstacle.classList.add('obstacle')
  	console.log(obstacle.classList)
  	if(obstacletype == 0){
  		obstacle.classList.add('cactus')
  		console.log(obstacle.classList)
  	}
  	if(obstacletype == 1){
  		obstacle.classList.add('bird')
  		console.log(obstacle.classList)
  	}
  }
  game.appendChild(obstacle)
  obstacle.style.left = obstaclePosition + 'px'


  let timerId = setInterval(function() {
    if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
      clearInterval(timerId)
      notification.innerHTML = 'Game Over'
      window.localStorage.setItem('highscore' , highscore)
      isGameOver = true
      //remove all children
      body.removeChild(body.firstChild)
      while (game.firstChild) {
        game.removeChild(game.lastChild)
      }
      
    }
    obstaclePosition -=  gameSpeed

    obstacle.style.left = obstaclePosition + 'px'
  },40)
  if (!isGameOver) setTimeout(generateObstacles, randomTime)
}

function randomize (max){
  return Math.floor(Math.random() * Math.floor(max))
}

Update()
generateObstacles()
})
