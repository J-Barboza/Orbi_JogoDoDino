window.onload = function() {
    start();
};

function start() {

    const dino = document.querySelector('.dino');
    const background = document.querySelector('.background');
    
    var isJumping = false;
    let position = 0;
    var speedCactus = 4;
    var speedBackground = 2;
    var seconds = 0;
    var increaseSpeed = 0;
    //var trocaDino = 0;

    var gameKey = {} 
    gameKey.pressed  = [];
    var TECLA = {
        ArrowUp: 38,
		Space: 32
	}

    $(document).keydown(function (e) {
        gameKey.pressed [e.which] = true;
    });
    
    $(document).keyup(function (e) {
        gameKey.pressed [e.which] = false;
    });

    //Game Loop
    gameKey.timer = setInterval(loop, 30);

    function increasePoints(){
        seconds += 1;
        $("#counter").html("Pontos: " + seconds*20);
        if (increaseSpeed < seconds){
            increaseSpeed+=10;
            speedCactus+=0.5;
            speedBackground+=0.5; 
        }
    } 

    var teste = setInterval(increasePoints, 1000);

    function loop(){
        fncMoveBackground();
        fncMoveDino();
    }

    function fncMoveDino(){
        if (gameKey.pressed [TECLA.Space]) {
            if (!isJumping){
                jump();
            }
        }
    }

    function fncMoveBackground() {
        let leftPosition = parseInt($("#background").css("background-position"));
        $("#background  ").css("background-position", leftPosition - speedBackground);
    }

    function jump(){
        isJumping = true;
        let upInterval = setInterval(() => {
            if (position >= 180){
                // descendo
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0){
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 10;
                        dino.style.bottom = position + "px"
                    }
                },20);
            } else {
                //subindo
                position += 25;
                dino.style.bottom = position + "px"
            }
        },20);
    }

    function createCactus(){

        const cactus = document.createElement('div');
        let cactusPosition = 1000;
        let randomTime = Math.random() * 6000;

        cactus.classList.add('cactus');
        cactus.style.left = cactusPosition + "px";
        background.appendChild(cactus);

        let leftInterval = setInterval(() => {
            if ( cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
                clearInterval(leftInterval);
                document.body.innerHTML = '<h1 class="gamer-over">Fim de Jogo!</h1>';
            } else {
                cactusPosition -= speedCactus ;
                cactus.style.left = cactusPosition + "px"
            }
        }, 20);

        setTimeout(createCactus, randomTime);    
    }

     createCactus();
 }