const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function createPoint(count, canvasHeight, canvasWidth){
    if(count === 0){
        return '';
    }
    const xPos = Math.floor(Math.random() * (canvasWidth - 100)) + 1;
    const yPos = Math.floor(Math.random() * (canvasHeight - 100)) + 1;

    context.fillStyle = colorGenerator();
    context.fillRect(xPos, yPos, 100, 100);

    return {
        x: xPos,
        y: yPos,
        height: 100,
        width: 100
    } + createPoint(count - 1, canvasHeight, canvasWidth);
}

const point = createPoint(10,700,1200);
console.log(point);


function colorGenerator(){
    const color = Math.floor(Math.random() * 3) + 1;

    switch(color){
        case 1:
            return 'red';
            break;
        case 2:
            return 'blue';
            break;
        case 3:
            return 'green';
            break;
    }
}
