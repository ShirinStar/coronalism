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
