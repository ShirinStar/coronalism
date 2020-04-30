class Corona {
  constructor(){
    this.shapes = []
  }

  render(){
  let picker = random(1)
  if(picker > 0.3) {
    this.shapes.push(new Circles())
  }
  picker = random(1)
  if(picker > 0.3) {
    this.shapes.push(new DottedLines())
  }
  picker = random(1)
  if(picker > 0.3) {
    this.shapes.push(new CenteredShape())
  }
  this.shapes.forEach(shape => {
    shape.render()
  })
  }
}

function randomSelectTwo() {
  const rando = random(1);
  if (rando > 0.5) {
   return true;
  } else {
   return false; 
  }
 }
 
 function randomColorPallete(){
  const randoColor = floor(random(0 ,PALLETE.length));
  return PALLETE[randoColor];
 }