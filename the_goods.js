let text;
let tree;
let col1;
let col2;
let amnt=.05;
let dir;  //used to know if amnt is counting up(true), or down(false)
let show_col;
let system;

function preload(){
    text=loadModel('text.obj', true);
    tree=loadModel('spruce.obj',true);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    system = new ParticleSystem(createVector(width / 2, 50));
    dir=true;
   
    
   
    let amnt=.05; 
  }

  function draw(){  
    //colorMode(RGB);

    col1=color("red");
    col2=color("green"); 
    orbitControl();
    rotateX(-PI/2);
    background('rgba(141,104,176,1)');


    if(amnt>=1)
      dir=false;
    else if(amnt<=0)
      dir=true;

    if(dir)
      amnt+=.01;
    else  
      amnt-=.01;

    

    //console.log(col1,col2);
   // console.log((lerpColor(col1,col2,1)));


    push();
    rotateX(PI/2);
    translate(-(windowWidth/2),(-windowHeight/1.7),0);
    system.addParticle();
    system.run();
    pop();

    push();
    rotateX(PI/2);
    translate(-(windowWidth/2)-400,(-windowHeight/1.7),0);
    system.addParticle();
    system.run();
    pop();

    push();
    rotateX(PI/2);
    translate(-(windowWidth/2)+400,(-windowHeight/1.7),0);
    system.addParticle();
    system.run();
    pop();
    
    console.log(amnt); 
    //normalMaterial(); // For effect
    stroke(lerpColor(col1,col2,amnt));
    strokeWeight(3);
    push()
    scale(1.5);
    noFill();
 
    
    
    translate(0,0,-150);
    model(text);
    pop();
    push();
    scale(1.5);
    rotateX(-PI/2);
  
    normalMaterial();
    model(tree);
    pop();

    

  }


  // A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.01);
  this.velocity = createVector(random(-2, 2), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 600;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(155, this.lifespan);
  strokeWeight(1);
  fill(255 , this.lifespan);
  ellipse(this.position.x, this.position.y, 6, 6);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
