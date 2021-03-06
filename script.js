const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const div_points = document.querySelector('.points');
let points = 0

let is_jumping = false;
let position = 0;

document.addEventListener('keyup', (event)=> {
    if (event.key === ' '){
        if(!is_jumping){
            jump();
        }
    }
});

function jump(){
    position = 0;
    is_jumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    is_jumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position +'px';
                }
            },20);
        }else{
            position += 20;
            dino.style.bottom = position +'px';
        }
    }, 20);    
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random()*6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            points += 10;
            div_points.innerHTML = points;
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Game Over - Try Again!</h1>";
            const tryagain = document.querySelector('.game-over');
            tryagain.addEventListener('click', (event) => {
                window.location.reload();
            });
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20);

    setTimeout(createCactus, randomTime);
}

createCactus();