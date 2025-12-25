/* AUDIO */
const music = document.getElementById("bgMusic");
const overlay = document.getElementById("soundOverlay");

music.volume = 1.0;

function startMusic() {
  music.play();
  overlay.style.opacity = "0";
  setTimeout(() => overlay.style.display = "none", 500);

  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
  document.removeEventListener("keydown", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
document.addEventListener("keydown", startMusic);

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let particles = [];

function boom(x, y) {
  for (let i = 0; i < 120; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 100,
      color: `hsl(${Math.random()*360},100%,60%)`
    });
  }
}

setInterval(() => {
  boom(Math.random() * canvas.width, Math.random() * canvas.height / 2);
}, 500);

addEventListener("click", e => boom(e.clientX, e.clientY));

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();
