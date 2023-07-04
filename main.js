const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ColourArray = [
    "#FF74B1",
    "#815B5B",
    "#DD5353",
    "#F08A5D",
    "#6A2C70",
    "#F9ED69",
    "#95E1D3",
    "#1FAB89",
    "#797A7E",
    "#071A52",
    "#17B978",
];
const ParticleArray = [];
let hue = 0;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ctx.fillStyle = "red";
// ctx.strokeStyle = "green";
// ctx.beginPath();
// ctx.arc(100, 100, 20, 0, Math.PI * 2);
// ctx.fill();

// ctx.stroke();

mouse = {
    x: undefined,
    y: undefined,
};
canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 5; i++) {
        ParticleArray.push(new Praticle());
    }
    // drawCircle();
});

canvas.addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // drawCircle();
    for (let i = 0; i < 8; i++) {
        ParticleArray.push(new Praticle());
    }
});

class Praticle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 1;
        this.sppedX = Math.random() * 6 - 1.5;
        this.sppedY = Math.random() * 6 - 1.5;
        // this.colour = ColourArray[Math.floor(Math.random() * ColourArray.length)];
        this.colour = "hsl(" + hue + ",100% ,50%)";
        // this.colour="hsl(" + Math.random()*hue + ",100% ,50%)";
    }

    Update() {
        this.x += this.sppedX;
        this.y += this.sppedY;
        if (this.size > 1) this.size -= 0.2;
    }

    draw() {
        // ctx.fillStyle = "white";
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
//
// function Init() {
//     for (let i = 0; i < 100; i++) {
//         ParticleArray.push(new Praticle());
//     }
// }
//
// console.log(ParticleArray);
// Init();

function HandleParticle() {
    for (let i = 0; i < ParticleArray.length; i++) {
        ParticleArray[i].Update();
        ParticleArray[i].draw();
        for (let j = i; j < ParticleArray.length; j++) {
            const dx = ParticleArray[i].x - ParticleArray[j].x;
            const dy = ParticleArray[i].y - ParticleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                // console.log(distance)
                ctx.beginPath();
                ctx.strokeStyle = ParticleArray[i].colour;
                ctx.lineWidth = 0.2;
                ctx.moveTo(ParticleArray[i].x, ParticleArray[i].y);
                ctx.lineTo(ParticleArray[j].x, ParticleArray[j].y);
                ctx.stroke();
            }
        }
        if (ParticleArray[i].size <= 1) {
            ParticleArray.splice(i, 1);
        }
        // console.log(ParticleArray.length);
    }
}

// function drawCircle() {
//     ctx.fillStyle = ColourArray[parseInt(Math.random() * ColourArray.length)];
//     // ctx.strokeStyle = "green";
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
//     ctx.fill();
//     // ctx.stroke();
// }

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // ctx.fillStyle = "rgba(0,0,0,0.02)";
    // ctx.fillRect(0,0 ,canvas.width,canvas.height)
    // drawCircle();
    HandleParticle();
    // hue = hue + 0.1
    hue = hue + 0.5;
    // hue = hue + Math.random()*10
    console.log(ParticleArray.length);
    requestAnimationFrame(animate);
}

animate();
