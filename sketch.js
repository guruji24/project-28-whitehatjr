
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj,stoneObj,groundObject;
var mango1;
var world,boy;
var chain1;
var time,timer;
var mango2,mango3,mango4,mango5;



function preload(){
	boy=loadImage("images/boy.png");
}

function setup() {
	createCanvas(1300, 800);
	engine = Engine.create();
	world = engine.world;

	mango1 = new Mango(1100,100,30);
	mango2 = new Mango(1150,100,30);
	mango3 = new Mango(1050,100,30);
	mango4 = new Mango(1100,50,30);
	mango5 = new Mango(1100,200,30);

	treeObj=new Tree(1050,580);
	groundObject=new Ground(width/2,600,width,20);
	
	stoneObj = new Stone(68,350);

	chain1 = new SlingShot(stoneObj.body,{x:240,y:420});

	Engine.run(engine);
}



function draw() {

  background(230);
  //Add code for displaying text here!
  image(boy ,200,340,200,300);
  
  treeObj.display();
  groundObject.display();
  stoneObj.display();
  chain1.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  detectCollision(stoneObj,mango1);
  detectCollision(stoneObj,mango2);
  detectCollision(stoneObj,mango3);
  detectCollision(stoneObj,mango4);
  detectCollision(stoneObj,mango5);

}

function mouseDragged(){
    Matter.Body.setPosition(stoneObj.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
    chain1.fly();
}

function keyPressed(){
	if(keyCode===32){
		Matter.Body.setPosition(stoneObj.body,{x:240,y:420});
		chain1.attach(stoneObj.body);
	}
}

function detectCollision(lstone,lmango){
	console.log(lstone.body.circleRadius)
  mangoBodyPosition=lmango.body.position
  stoneBodyPosition=lstone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
  console.log(distance)
  s = lstone.body.circleRadius+lmango.body.circleRadius;
  if(distance<=s)
  {
    Matter.Body.setStatic(lmango.body,false);
  }

}