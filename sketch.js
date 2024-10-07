class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        stroke(0,0,0.0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(radians(angle));
    }

    show() {
        stroke(0,0,0,0);
        line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10);
    }

    cast(boundary) {
        // boundary segment
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;
        // ray segment
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        // denominator
        const denominator = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const point = createVector();
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        } else {
            return;
        }
    }
}

class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0; // Current direction angle in degrees
        this.initRays();
    }

    // Initialize rays with current heading angle
    initRays() {
        this.rays = [];
        for (let a = -45; a < 45; a += 1) {
            this.rays.push(new Ray(this.pos, a + this.heading));
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    show() {
        for (let ray of this.rays) {
            ray.show();
        }
    }

    rotate(angle) {
        this.heading += angle; // Update heading
        this.initRays(); // Reinitialize rays with new angle
    }

    look(walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                let point = ray.cast(wall);
                if (point) {
                    const distance = p5.Vector.dist(this.pos, point);
                    if (distance < record) {
                        record = distance;
                        closest = point;
                    }
                }
            }
            if (closest) {
                let index = this.rays.indexOf(ray);
                let distanceX = this.pos.x - closest.x;
                let distanceY = this.pos.y - closest.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                rectMode(CENTER);
                stroke(255);
                fill(0, 255 - distance/2 * 2, 0);
                rect(10 * index, height / 2, 10, 15000 / distance);
            }
        }
    }
}

let walls = [];
let particle;
let x = 200;
let y = 200;
let rotationSpeed = 2; // Rotation speed

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    particle = new Particle();
    for (let i = 0; i < 10; i++) {
        walls.push(new Boundary(random(width), random(height), random(width), random(height)));
    }
}

function draw() {
    background(0);
    particle.show();
    for (let wall of walls) {
        wall.show();
    }
    particle.look(walls);
    particle.update(x, y);
}

window.addEventListener("keydown", function (input) {
    // Movement
    if (input.key === "w") { // Move forward
        let forward = p5.Vector.fromAngle(radians(particle.heading));
        x += forward.x * 2; // Adjust speed as needed
        y += forward.y * 2;
    } else if (input.key === "s") { // Move backward
        let backward = p5.Vector.fromAngle(radians(particle.heading));
        x -= backward.x * 2;
        y -= backward.y * 2;
    }

    // Rotation
    if (input.key === "a") { // Rotate left
        particle.rotate(-rotationSpeed);
    } else if (input.key === "d") { // Rotate right
        particle.rotate(rotationSpeed);
    }
});
