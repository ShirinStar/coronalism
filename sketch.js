const CRYSTAL_SIZE = 25;
const SIDES = 6;
let PALLETE = [];
let corona;
let rocket;
let population;
const lifeSpan = 200;
let lifeP;
let count = 0;
let target;


function setup() {
  // noLoop()
  createCanvas(550, 550);
  PALLETE = [
    color(255, 52, 154), //pink
    color(4, 0, 152) //blue
  ]
  angleMode(DEGREES);

  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(0)
  corona = new Corona();
  population.run();
  lifeP.html(count);
  count++;

  if (count == lifeSpan) {
    count = 0;
    //reset
    population = new Population();
  }

  ellipse(target.x, target.y, 16, 16);

}

function Population() {
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    let maxFit = 0;
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rokects[i].fitness > maxFit) {
        maxFit = this.rokects[i].fitness;
      }
    }
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxFit;
    }

    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.add(this.rockets[i]);
      }
    }
  }

  this.selection = function () {
    let parentA = random(this.matingpool).dna;
    let parentB = random(this.matingpool).dna;
    let child = parentA.crossover(parentB);
  }


  this.run = function () {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();

    }
  }
}


function DNA(genes) {
  if(genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (let i = 0; i < lifeSpan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.3); //speed
  }
}

  this.crossover = function (partner) {
    let newgenes = [];
    let mid = floor(random(genes.length));
    for (let i = 0; i < genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = this.partner[i];
      }
    }
    return new DNA(newgenes);
  }

}







function Rocket() {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.dna = new DNA();
  this.fitness = 0;

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.calcFitness = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
  }

  this.update = function () {
    this.applyForce(this.dna.genes[count]);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }


  this.show = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    corona.render()
    // rectMode(CENTER);
    // rect(0, 0, 25, 5);
    pop();

  }
}



