const CRYSTAL_SIZE = 150;
const SIDES = 6;
let PALLETE = [];
let corona;
let rocket;

function setup() {
  // noLoop()
  createCanvas(550, 550);
  PALLETE = [
    color(255, 52, 154), //pink
    color(4, 0, 152) //blue
  ]
  angleMode(DEGREES);
  rocket = new Rocket();
}

function draw() {
  background(0)
  corona = new Corona()
  rocket.update();
  rocket.show();
  
  
  
}


function Rocket() {
  this.pos = createVector(width/2, height);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    push();
    // noStroke();
    // fill(255, 150);
    translate(this.pos.x , this.pos.y);
    rotate(this.vel.heading());
    corona.render()
    // rectMode(CENTER);
    // rect(0, 0, 25, 5);
    pop();

  }
}



