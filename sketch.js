const CRYSTAL_SIZE = 25;
const config = {
  pop_size: 200,
  max_force: 0.2,
  life_span: 800
}
const SIDES = 6;
let PALLETE = [];
let corona;
let rocket;
let population;
const lifeSpan = 800;
let lifeP;
let generation = 0;
let genP;
let count = 0;
let target;
const tx = 500;
const ty = 350;
const tw = 720;
const th = 120;

function setup() {
  // noLoop()
  createCanvas(windowWidth, windowHeight);
  PALLETE = [
    color(167, 55, 131), //pink
    color(184, 49, 37) //red
  ]
  angleMode(DEGREES);

  rocket = new Rocket();
  population = new Population();
  // lifeP = createP();
  target = createVector(width / 2, 200);

  let gui_data = new dat.GUI();
  gui_data.add(config, 'pop_size', 0, 200);
  gui_data.add(config, 'max_force', 0, 1);
}

function draw() {
  background(142, 127,124)
  corona = new Corona();
  population.run();
  // lifeP.html(count);
  count++;

  if (count == lifeSpan) {
    count = 0;
    generation++;
    //reset
    // population = new Population();
    population.evaluate();
    population.selection();
  }
  noStroke();
  noFill();
  rect(tx, ty, tw, th);

  let word = 'CAPITALISM';
  // fill(105, 37, 36);
  fill(255);

  textStyle(BOLD);
  textSize(120);
  text(word, tx, ty, [tw], [th]);
  
  //target
  noStroke();
  noFill();
  ellipse(target.x, target.y, 16, 5);

  textStyle(NORMAL);
  fill(195, 214, 235)
  let word2 = 'Generation: ' +generation;
  textSize(16);
  text(word2, 40, 40, 200, 100);
  let word3 = 'Life span: ' +count;
  textSize(16);
  text(word3, 40, 70, 200, 100);
}

function Population() {
  this.popsize = 200;
  this.rockets = [];
  this.matingpool = [];

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    let maxFit = 0;
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    }
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxFit;
    }

    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function () {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingpool).dna;
      let parentB = random(this.matingpool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function () {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes) {
  if (genes) {
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
    let mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function () {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
      }
    }
  }
}


function Rocket(dna) {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.history = [];

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.calcFitness = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 3;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  this.update = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if (this.pos.x > tx && this.pos.x < tx + tw && this.pos.y > ty && this.pos.y < ty + th) {
      this.crashed = true;
    }

    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed =true;
    }

    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed =true;
    }

    this.applyForce(this.dna.genes[count]);
    //physic position
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
    //for the trail
    const objX = this.pos.x;
    const objY = this.pos.y; 
    const coord = {
      x: objX,
      y: objY
    }
    this.history.push(coord);
    if(this.history.length >15) {
      this.history.splice(0, 1)
    }
  }


  this.show = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    corona.render()
    pop();
    fill(160, 200);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      pos = this.history[i];
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}



