class Obj {
    //mass=number mass(kg)
    //pos=[number,number] initial position [m,m]
    //vi=[number,number] initial velocity [m/s,m/s]
    constructor(mass, pos, vi) {
        this.mass = mass;
        this.pos = pos;
        this.v = vi;
        this.collidedWith = [];
        this.shape;
        windowObjs.push(this)
    }

    V(){
        return Math.sqrt(this.v[0]*this.v[0]+this.v[1]*this.v[1]);
    }
    P(){
        return this.mass*this.V();
    }
    KE(){
        return this.mass*this.V()*this.V()/2;
    }
    
}
class Square extends Obj{
    constructor(mass, pos, vi,width) {
        super();
        this.mass = mass;
        this.pos = pos;
        this.v = vi;
        this.width = width;
        this.shape="square";
        windowObjs.push(this)
    }
    collision(other, dir){
        //x stuff:
        /*
        const vafx = ((this.mass-other.mass)*this.v[0]+2*other.mass*other.v[0])/(this.mass+other.mass);
        const vbfx = ((other.mass-this.mass)*other.v[0]+2*this.mass*this.v[0])/(this.mass+other.mass);
        this.v[0] = vafx;
        other.v[0] = vbfx;
        const vafy = ((this.mass-other.mass)*this.v[1]+2*other.mass*other.v[1])/(this.mass+other.mass);
        const vbfy = ((other.mass-this.mass)*other.v[1]+2*this.mass*this.v[1])/(this.mass+other.mass);
        this.v[1] = vafy;
        other.v[1] = vbfy;
        */
       //console.log({dir})
       let vy = this.v[1]+other.v[1]
       let vx = this.v[0] + other.v[0]
       
    }
}
function toDegrees(){

}
function init() {
    window.requestAnimationFrame(loop);
}

let lastTime = 0;

function loop(timeStamp) {
    const ctx = document.getElementById("canvas").getContext("2d");
    

    // Calculate deltaTime in seconds (convert from milliseconds)
    let deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 400, 400);

    windowObjs.forEach(i => {
        if(i.shape=="square"){
            ctx.beginPath();
            ctx.rect(i.pos[0], i.pos[1], i.width, i.width);
            ctx.stroke();

            ctx.strokeStyle = "red"
            ctx.beginPath();
            ctx.arc(i.pos[0]+i.width/2,i.pos[1]+i.width/2,1,0,2*Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i.pos[0]+i.width/2,i.pos[1]+i.width/2);
            ctx.lineTo(i.pos[0]+i.v[0]+i.width/2,i.pos[1]+i.v[1]+i.width/2);
            ctx.stroke();
            ctx.strokeStyle = "black";
        }
    });

    // Physics loop
    windowObjs.forEach(i => {
        // Adjust position using deltaTime to ensure consistent movement speed
        i.pos[0] += i.v[0] * deltaTime;
        i.pos[1] += i.v[1] * deltaTime;

        //check collision:
        windowObjs.forEach(j=>{
            
            if(i != j){
                //right side
                if(i.pos[0] + 100 - j.pos[0] > 0 && j.pos[0] > i.pos[0] && !i.collidedWith.includes(j) && Math.abs(i.pos[1]-j.pos[1]) < 100){
                    /* dir_i = Math.atan2(i.v[1],i.v[0])+Math.PI;
                    dir_j = Math.atan2(j.v[1],j.v[0])+Math.PI;
                    console.log(2*(dir_i+dir_j)); */
                    //console.log("COLLIDE")
                    i.collision(j,[i.v[0]+j.v[0],i.v[1]+j.v[1]])
                    i.collidedWith.push(j);
                    j.collidedWith.push(i);
                }
            }
        })
    });

    window.requestAnimationFrame(loop);
}

// Start the loop

const windowObjs = []
const sqr1 = new Square(1,[50,50],[10,0],100)
const sqr2 = new Square(1,[250,50],[-10,0], 100)
init();