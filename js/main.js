function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
if(detectMob()==true){
    document.write("Please turn on computer mode in your mobile browser.");
}

var scene, camera, renderer, controls;

var color0 = "0xff0000", color1 = "0x0033ff", color2 = "0xeeff00", color3 = "0xffffff", color4 = "0xff7b00", color5 = "0x00ff04";

var cubeMaterials;

var backC = 0x333333;
var backgroundColor = document.getElementById("backgroundColor");

backgroundColor.addEventListener("input", function(event){
    backC = parseInt("0x" + event.target.value.substring(1));
}, false);


var input0 = document.getElementById("color-0");
var input1 = document.getElementById("color-1");
var input2 = document.getElementById("color-2");
var input3 = document.getElementById("color-3");
var input4 = document.getElementById("color-4");
var input5 = document.getElementById("color-5");

input0.addEventListener("input", function(event){
    color0 = parseInt("0x" + event.target.value.substring(1));
}, false);
input1.addEventListener("input", function(event){
    color1 = parseInt("0x" + event.target.value.substring(1));
}, false);
input2.addEventListener("input", function(event){
    color2 = parseInt("0x" + event.target.value.substring(1));
}, false);
input3.addEventListener("input", function(event){
    color3 = parseInt("0x" + event.target.value.substring(1));
}, false);
input4.addEventListener("input", function(event){
    color4 = parseInt("0x" + event.target.value.substring(1));
}, false);
input5.addEventListener("input", function(event){
    color5 = parseInt("0x" + event.target.value.substring(1));
}, false);


var Height = window.innerHeight - 1, Width = window.innerWidth/ 1.5;

var cube;


var SPEED = 0.05;

var rotationX = 1, rotationY = 1, rotationZ = 1;


window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
    Width = window.innerWidth/1.5;
    Height = window.innerHeight - 1;

    camera.aspect = Width / Height;
    camera.updateProjectionMatrix();

    renderer.setSize(Width, Height);
}

function init() {

    scene = new THREE.Scene();

    cubeMaterials = [
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
    ]

    cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), cubeMaterials);
    scene.add(cube);



    camera = new THREE.PerspectiveCamera(75,
    Width / Height,
    0.1,
    1000);
    camera.position.set(3.5, 5.5, 0);
    camera.lookAt(scene.position);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(Width, Height);
    renderer.setClearColor(backC, 1);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    

    document.body.appendChild(renderer.domElement);
}

function update(){
    renderer.setClearColor(backC, 1);

    camera.Height = Height;
    camera.Width = Width;

    if(document.getElementById("rotateSpeed")==""){
        SPEED = 0;
    }
    else{
        SPEED = document.getElementById("rotateSpeed").value/100;
    }

    if(document.getElementById("rotateX").checked == true){
        rotationX = 1;
    }
    else{
        rotationX = 0;
    }  
    if(document.getElementById("rotateY").checked == true){
        rotationY = 1;
    }
    else{
        rotationY = 0;
    }
    if(document.getElementById("rotateZ").checked == true){
        rotationZ = 1;
    }
    else{
        rotationZ = 0;
    }

    

    cube.rotation.x += SPEED * rotationX;
    cube.rotation.y += SPEED * rotationY;
    cube.rotation.z += SPEED * rotationZ;
    
        
    cube.scale.x = document.getElementById("sizeX").value;    
    cube.scale.y = document.getElementById("sizeY").value;    
    cube.scale.z = document.getElementById("sizeZ").value;    

    cube.material[0].color.setHex(color0);
    cube.material[1].color.setHex(color1);
    cube.material[2].color.setHex(color2);
    cube.material[3].color.setHex(color3);
    cube.material[4].color.setHex(color4);
    cube.material[5].color.setHex(color5);

    controls.update();

    renderer.setSize(Width, Height)
}



function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

init();
render();
