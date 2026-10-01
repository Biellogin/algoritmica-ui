let particles = [];
let numParticles = 800;
let noiseScale = 0.005;

// Paletas de cores profissionais para o SaaS
let palettes = {
  neon: [[100, 108, 255], [236, 72, 153], [6, 182, 212]], // Azul, Rosa, Ciano
  sunset: [[251, 146, 60], [244, 63, 94], [168, 85, 247]], // Laranja, Vermelho, Roxo
  matrix: [[34, 197, 94], [20, 184, 166], [250, 204, 21]]  // Verde, Verde-Água, Amarelo
};
let currentPalette = 'neon';

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  background(15, 17, 26);
  
  initParticles();

  // Ouve os controles da tela
  document.getElementById('particleCount').addEventListener('input', (e) => {
    numParticles = parseInt(e.target.value);
    initParticles();
  });

  document.getElementById('noiseScale').addEventListener('input', (e) => {
    noiseScale = e.target.value / 4000;
  });

  document.getElementById('paletteSelect').addEventListener('change', (e) => {
    currentPalette = e.target.value;
    background(15, 17, 26); // Limpa o fundo ao trocar de paleta
  });

  document.getElementById('btnNewSeed').addEventListener('click', () => {
    randomSeed(millis());
    background(15, 17, 26);
    initParticles();
  });

  document.getElementById('btnSave').addEventListener('click', () => {
    saveCanvas('algoritmica-arte', 'png');
  });
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(15, 17, 26, 10);
  
  // Escolhe uma cor aleatória da paleta selecionada para cada linha
  let colors = palettes[currentPalette];
  let chosenColor = random(colors);
  stroke(chosenColor[0], chosenColor[1], chosenColor[2], 160);
  strokeWeight(1.5);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let angle = noise(p.x * noiseScale, p.y * noiseScale) * TWO_PI * 4;
    
    let prevX = p.x;
    let prevY = p.y;
    
    p.x += cos(angle) * 2;
    p.y += sin(angle) * 2;
    
    line(prevX, prevY, p.x, p.y);

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
}