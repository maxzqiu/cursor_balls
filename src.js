class Shape{
    draw(){
        throw new Error("Unimplemented draw() for Shape")
    }
}

class Movement extends Shape{
    tick(){
        throw new Error("Unimplemented tick() for Shape")
    }
}

class Square extends Shape{
    constructor(x,y,side){
        const colors=["rgb(26, 188, 156)",
                          "rgb(46, 204, 113)",
                          "rgb(52, 152, 219)",
                          "rgb(155, 89, 182)",
                          "rgb(241, 196, 15)",
                          "rgb(230, 126, 34)",
                          "rgb(231, 76, 60)"
        ]
        this.pos={x:x,y:y};
        this.side=side;
        this.color=colors[Math.floor(Math.random()*colors.length)]
        
        console.log(this.pos)
    }
    draw(ctx){
        
        
        ctx.beginPath()
                
        ctx.save();
        
     
        ctx.strokeStyle=this.color;
        ctx.fillStyle=this.color;
        ctx.rect(this.pos.x,this.pos.y,this.side,this.side)
        ctx.fill();
        ctx.stroke();
        }
}

class Ball extends Shape{
    constructor(x,y,radius){
        super();
        const colors=["rgb(26, 188, 156)",
                          "rgb(46, 204, 113)",
                          "rgb(52, 152, 219)",
                          "rgb(155, 89, 182)",
                          "rgb(241, 196, 15)",
                          "rgb(230, 126, 34)",
                          "rgb(231, 76, 60)"
        ]
        this.pos={x:x,y:y};
        this.radius=radius;
        this.color=colors[Math.floor(Math.random()*colors.length)]
        
        console.log(this.pos)
    }
    draw(ctx){
        
        
        ctx.beginPath()
                
        ctx.save();
        
     
        ctx.strokeStyle=this.color;
        ctx.fillStyle=this.color;
        ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI)
        ctx.fill();
        ctx.stroke();
        }
    
    
}

class Linear{
    constructor(shape){
        this.shape=shape;
        //super(x,y,radius,pos)
        let angle=Math.random()*2*Math.PI;
        this.dir={x:Math.cos(angle),y:Math.sin(angle)}
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        this.shape.pos.x+=dt*this.dir.x/25;
        this.shape.pos.y+=dt*this.dir.y/25;
    
        this.shape.radius-=dt*0.01
        
    
        
        return this.shape.radius>0;
    }
}
class Bouncing{
    constructor(shape){
        this.shape=shape;
        //super(x,y,radius,pos)
        let angle=Math.random()*2*Math.PI;
        this.vel={x:5*Math.cos(angle),y:5*Math.sin(angle)}
        if (this.vel.y>0){
            this.vel.y*=(-1);
        }
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        // Velocity is change in position over time
        // 
        this.shape.pos.x+=dt*this.vel.x/25;
        this.shape.pos.y+=dt*this.vel.y/25;

        this.vel.y+=dt*0.005;
        if (this.shape.pos.y>window.innerHeight && this.vel.y>0){
            this.vel.y*=-0.7;
        }
        this.shape.radius-=dt*0.003
        
    
        
        return this.shape.radius>0;
    }
}
class BouncingBall extends Bouncing{
    constructor(x,y,radius){
        super(new Ball(x,y,radius));
    }
}

class LinearBall extends Linear{
    constructor(x,y,radius){
        super(new Ball(x,y,radius))
    }
}

class LinearSquare extends Linear{
    constructor(x,y,side){
        super(new Square(x,y,side))
    }
}

class RandomWalk{
    constructor(shape){
        this.shape=shape;
        this.randomizeDirection();
        this.id=setInterval(()=>this.randomizeDirection(),1000)
        
        //super(x,y,radius,pos)
        
    }
    randomizeDirection(){
        this.angle=Math.random()*2*Math.PI;
        this.dir={x:Math.cos(this.angle),y:Math.sin(this.angle)}
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        this.shape.pos.x+=dt*this.dir.x/16;
        this.shape.pos.y+=dt*this.dir.y/16;
        this.shape.radius-=dt*0.05/16
        this.angle+=1/2
        if (this.angle===2){
            this.angle=0;
        }
        if (this.shape.radius<=0){  // :)
            clearInterval(this.id)
        }
        return this.shape.radius>0
   }
}

class RandomWalkBall extends RandomWalk{
    constructor(x,y,radius){
        super(new Ball (x,y,radius))
    }
}

class RandomWalkSquare extends RandomWalk{
    constructor(x,y,side){
        super(new Square (x,y,side))
    }
}



// class Ball{
//     constructor(x,y,radius){
//         
//         this.color=colors[Math.floor(Math.random()*colors.length)]
//         this.radius=radius
//         this.pos={x:x,y:y}
//         this.transparency=1
//         this.randomizeDirection();
//         this.id=setInterval(()=>this.randomizeDirection(),500)
//         this.angle=2
        
        

//     }
//     randomizeDirection(){
//         
//         this.dir={x:random_dir[0],y:random_dir[1]}
//     }
    
//     

// draw(ctx){
//     const ANGLE=Math.PI/this.angle;
    
//     ctx.beginPath()
            
//     ctx.save();
//     ctx.translate(this.pos.x,this.pos.y+10);
//     ctx.rotate(ANGLE);
            
//     ctx.rect(0,0,this.radius,this.radius);
//     ctx.stroke();
//     ctx.restore();
    
//     ctx.shadowColor="black";
//     ctx.shadowBlur=15;
//     ctx.shadowOffsetX=10;
//     ctx.shadowOffsetY=10;
//     ctx.strokeStyle=this.color;
//     ctx.fillStyle=this.color;
//     ctx.globalAlpha=this.transparency;
//     ctx.fill();
//     ctx.stroke();
//     }

    
//     tick(dt){
//         this.pos.x+=dt*this.dir.x/16;
//         this.pos.y+=dt*this.dir.y/16;
//         this.transparency-=0.01
//         this.radius-=dt*0.05/16
//         this.angle+=1/2
//         if (this.angle===2){
//             this.angle=0;
//         }
//         if (this.radius<=0){  // :)
//             clearInterval(this.id)
//         }
//         return this.radius>0
//     }
// }



function run(){
    const canvas = document.querySelector("#cursor_balls");
    const ctx=canvas.getContext("2d");
    ctx.globalCompositeOperation="lighter"
    canvas.style.backgroundColor="#222"
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    let objects=[]
    let prev_ts=0
    // ctx.beginPath();
    // ctx.rect(100,100,50,50);
    // ctx.stroke();
    function loop(timestamp){
        let dt=timestamp-prev_ts
        prev_ts=timestamp
        console.log(dt)
        let kept=[]

        ctx.clearRect(0,0,canvas.width,canvas.height)
        
            for (let obj of objects){
                //let rand=Math.floor(Math.random())
                obj.draw(ctx);
                //obj.dir={x:obj.dir.x+rand,y:obj.dir.y+rand}
                let keep=obj.tick(dt);
                if (keep){
                    kept.push(obj)
                }
                
            }
            objects=kept

        
        requestAnimationFrame(loop);
    }
    loop()
    
    
    ctx.beginPath()
    ctx.rect(100,100,200,200)
    ctx.stroke()
    
    



    canvas.addEventListener("mousemove",(e)=>{

        const rect=canvas.getBoundingClientRect()
        let x=e.clientX-rect.left
        let y=e.clientY-rect.top
        let ball=new BouncingBall(x,y,10)
        objects.push(ball)
     //   ball.draw(ctx)
    
                
    })


    
    
}

run()
