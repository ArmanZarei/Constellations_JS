const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const particles = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null,
}

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 3; i++)
        particles.push(new Particle());
});


class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 2;
        this.speedX = Math.random() * 10 - 5;
        this.speedY = Math.random() * 10 - 5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2)
            this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = particles[i].size/10;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        if (particles[i].size <= 1) {
            particles.splice(i, 1);
            i--;
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    hue += 1;

    requestAnimationFrame(animate);
}

animate();
