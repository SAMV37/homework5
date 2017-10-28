///////////////////////////////Instructions///////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////Go to line 56 for to see instructions for exercise number 1////////
//////////////////////////////////////////////////////////////////////////
///////Go to line 109 for to see instructions for exercise number 2///////
//////////////////////////////////////////////////////////////////////////
///////Go to line 111 for to see instructions for exercise number 3///////

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

////////////////////////////////////////////////////Exercise number 1
const colorArray = ['red', 'blue', 'green'];
const deltaArray = [-1, 1];
const point = [];

function rand(max, min) {
    return Math.floor(Math.random() * max) + min;
}
function colorChanger(number){
    const color = colorArray[rand(3, 0)];
    if(color === point[number].color){
        colorChanger(number);
    }else{
        point[number].color = color;
    }
}

function createPoint(count, canvasHeight, canvasWidth){
    if(count === 0){
        return '';
    }

    point.push({
        x: rand(canvasWidth - 100, 0),
        y: rand(canvasHeight - 100, 0),
        height: 100,
        width: 100,
        xDelta: deltaArray[rand(2, 0)],
        yDelta: deltaArray[rand(2, 0)],
        color: colorArray[rand(3, 0)],
        speed: rand(7, 5)
    });

    createPoint(count - 1, canvasHeight, canvasWidth);
}

function pointDrawer(number){
    if(number === point.length){
        return '';
    }
    context.fillStyle = point[number].color;
    context.fillRect(point[number].x, point[number].y, point[number].width, point[number].height);
    pointDrawer(number + 1);
}

createPoint(10, canvas.height, canvas.width);

//Delete 2 slash (/) signs below to draw rectangles for exercise number 1
//pointDrawer(0);

////////////////////////////////////////////////////End of exercise number 1

////////////////////////////////////////////////////Exercise number 2

function drawer(number){
    if(number === point.length){
        return '';
    }
    context.fillStyle = point[number].color;
    context.fillRect(point[number].x, point[number].y, point[number].width, point[number].height);
    drawer(number + 1);
}


function updater(number){
    if(number === point.length){
        return '';
    }
    if(point[number].x >= canvas.width - 100){
        point[number].xDelta = -1;
        colorChanger(number);
    }else if(point[number].x <= 0){
        point[number].xDelta = 1;
        colorChanger(number);
    }

    if(point[number].y >= canvas.height - 100){
        point[number].yDelta = -1;
        colorChanger(number);
    }else if(point[number].y <= 0){
        point[number].yDelta = 1;
        colorChanger(number);
    }

    point[number].x += point[number].speed*point[number].xDelta;
    point[number].y += point[number].speed*point[number].yDelta;
    updater(number + 1);
}


function loop(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawer(0);
    updater(0);

    requestAnimationFrame(loop);
}


//Delete 2 slash (/) signs below to see exercise number 2
//loop();

// ////////////////////////////////////////////////////End of exercise number 2

// ////////////////////////////////////////////////////Exercise 3
const pointArray = {
    hero: {
        x: 0,
        y: 0,
        height: 50,
        width: 50,
        lost: false
    },
    badguys: []
};

function createPoint2(count, canvasHeight, canvasWidth){
    if(count === 0){
        return '';
    }

    pointArray.badguys.push({
        x: rand(canvasWidth - 200, 100),
        y: rand(canvasHeight - 200, 100),
        height: 100,
        width: 100,
        xDelta: deltaArray[rand(2, 0)],
        yDelta: deltaArray[rand(2, 0)],
        color: colorArray[rand(3, 0)],
        speed: rand(5, 2)
    });

    createPoint2(count - 1, canvasHeight, canvasWidth);
}

createPoint2(5, canvas.height, canvas.width);

function drawer2(number){
    if(number === pointArray.badguys.length){
        return '';
    }
    ////drawing hero
    context.fillStyle = 'rgb(255,0,255)';
    context.fillRect(pointArray.hero.x, pointArray.hero.y, pointArray.hero.width, pointArray.hero.height);

    ////drawing enemies
    context.fillStyle = pointArray.badguys[number].color;
    context.fillRect(pointArray.badguys[number].x, pointArray.badguys[number].y, pointArray.badguys[number].width, pointArray.badguys[number].height);
    drawer2(number + 1);
}


function updater2(number){
    if(number === pointArray.badguys.length){
        return '';
    }
    if(pointArray.badguys[number].x >= canvas.width - 100){
        pointArray.badguys[number].xDelta = -1;
        colorChanger(number);
    }else if(pointArray.badguys[number].x <= 0){
        pointArray.badguys[number].xDelta = 1;
        colorChanger(number);
    }

    if(pointArray.badguys[number].y >= canvas.height - 100){
        pointArray.badguys[number].yDelta = -1;
        colorChanger(number);
    }else if(pointArray.badguys[number].y <= 0){
        pointArray.badguys[number].yDelta = 1;
        colorChanger(number);
    }

    pointArray.badguys[number].x += pointArray.badguys[number].speed*pointArray.badguys[number].xDelta;
    pointArray.badguys[number].y += pointArray.badguys[number].speed*pointArray.badguys[number].yDelta;
    updater2(number + 1);
}

function heroChecker(){
    ///////////////////////Checking if the hero is out of the canvas
    if(pointArray.hero.x > canvas.width - pointArray.hero.width){
        pointArray.hero.x = 0;
    }else if(pointArray.hero.x < 0){
        pointArray.hero.x = canvas.width - pointArray.hero.width;
    }

    if(pointArray.hero.y > canvas.height - pointArray.hero.height){
        pointArray.hero.y = 0;
    }else if(pointArray.hero.y < 0){
        pointArray.hero.y = canvas.height - pointArray.hero.height;
    }

    /////////////////////Checking hero's collision with bad guys))
    function collisionChecker(number){
        if(number === pointArray.badguys.length){
            return '';
        }
        if(pointArray.hero.x + pointArray.hero.width - pointArray.badguys[number].speed >= pointArray.badguys[number].x && pointArray.hero.x <= pointArray.badguys[number].x + pointArray.badguys[number].width - pointArray.badguys[number].speed){
            if(pointArray.hero.y + pointArray.hero.height - pointArray.badguys[number].speed >= pointArray.badguys[number].y && pointArray.hero.y <= pointArray.badguys[number].y + pointArray.badguys[number].height - pointArray.badguys[number].speed){
                if(pointArray.hero.lost === false) {
                    alert('Game Over ((');
                    pointArray.hero.lost = true;
                }
            }
        }
        collisionChecker(number + 1);
    }
    collisionChecker(0);
}


function loop2(){
    if(pointArray.hero.lost === false) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawer2(0);
        updater2(0);
        heroChecker();

        requestAnimationFrame(loop2);
    }
}


//Delete 2 slash (/) signs below to see exercise number 3
loop2();

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
    if(event.keyCode === upKey) {
        pointArray.hero.y -= 15;
    }else if(event.keyCode === downKey) {
        pointArray.hero.y += 15;
    }else if(event.keyCode === rightKey) {
        pointArray.hero.x += 15;
    }else if(event.keyCode === leftKey) {
        pointArray.hero.x -= 15;
    }
}, true);




// ////////////////////////////////////////////////////End of exercise 3
