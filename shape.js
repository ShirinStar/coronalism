class Shape {
  constructor() {
    this.sides = SIDES
    this.numShapes = this.sides
    this.angle = 360 / this.numShapes
    this.stepsOut = 8
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut
    this.thinStroke = 1
    this.thikStroke = 3
    this.layerColor = randomColorPallete()
    this.weight = randomSelectTwo() ? this.thinStroke : this.thikStroke;
  }
}

class Circles extends Shape {
  constructor() {
    super()
    this.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
    this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2)
  }

  render() {
    noFill()
    stroke(this.layerColor)
    strokeWeight(1)
    push()
    //translate(width / 2, height / 2);
    for (let i = 0; i <= this.numShapes; i++) {
      ellipse(this.position, 0, this.shapeSize, this.shapeSize)
      rotate(this.angle)
    }
    pop()
  }
}

class DottedLines extends Shape {
  constructor() {
    super()
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2
    this.angle = 360 / this.numShapes
    this.shapeSize = 3
    this.centerOffset = this.singleStep
  }

  render() {
    fill(this.layerColor)
    noStroke()
    push()
    //translate(width / 2, height / 2)
    for (let i = 0; i <= this.numShapes; i++) {
      for (let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
        rect(x, 0, this.shapeSize, this.shapeSize)
      }
      rotate(this.angle)
    }
    pop()
  }
}

class CenteredShape extends Shape {
  constructor() {
    super()
    this.randomShape = random(1)
    this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut - 1)) * this.singleStep
  }

  render() {
    fill(this.layerColor)
    noStroke()
    push()
    //translate(width / 2, height / 2)
    ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2)
    pop()
  }
}

class SimpleLine extends Shape {
  constructor() {
    super()
    this.numSteps = randomSelectTwo() ? this.stepsOut : int(this.stepsOut * 1.25);
    this.step = (CRYSTAL_SIZE / 2) / this.numSteps;
    this.start = floor(random(0, this.numSteps));
    this.stop = floor(random(this.start, this.numSteps + 1));
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;

    if (this.layerColor = 1) {
      // stroke(127, 158, 175);
      stroke(0)
    } else {
      stroke(this.layerColor)
    }
  }
    
  render() {
    noFill();
    strokeWeight(this.weight);
    push()
    //translate(width / 2, height / 2);
    for (let i = 0; i <= this.numShapes; i++) {
      line(this.start * this.step, 0, this.stop * this.step, 0)
      rotate(this.angle);
    }
    pop()
  }
}
