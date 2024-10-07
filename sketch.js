class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        stroke(100, 255, 100);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(radians(angle));
    }

    show() {
        stroke(255);
        line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10);
    }

    cast(boundary) {
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denominator = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        if (denominator === 0) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            let point = createVector();
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        } else {
            return null;
        }
    }
}

let FOV=45;

class Particle {
    constructor(pos) {
        this.pos = pos;
        this.rays = [];
        this.angle = 0;
        this.speed = 2;  // Speed of movement
        this.direction = createVector(0, 0); // Movement direction vector

        for (let a = -FOV; a < FOV; a += 1) {
            this.rays.push(new Ray(this.pos, a));
        }
    }

    // Movement logic based on angle and keys
    moveForward() {
        const velocity = p5.Vector.fromAngle(radians(this.angle)); // Movement direction
        velocity.setMag(this.speed); // Set speed magnitude
        this.pos.add(velocity); // Move forward
    }

    moveBackward() {
        const velocity = p5.Vector.fromAngle(radians(this.angle)); // Movement direction
        velocity.setMag(this.speed); // Set speed magnitude
        this.pos.sub(velocity); // Move backward (subtract vector)
    }

    updatePos(x, y) {
        this.pos.set(createVector(x, y));
    }

    initRays() {
        this.rays = [];
        for (let a = -45; a < 45; a += 1) {
            this.rays.push(new Ray(this.pos, a + this.angle));
        }
    }

    look(walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;

            for (let wall of walls) {
                let point = ray.cast(wall);
                if (point) {
                    let distanceX = this.pos.x - point.x;
                    let distanceY = this.pos.y - point.y;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    if (distance < record) {
                        record = distance;
                        closest = point;
                    }
                }
            }

            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                let index = this.rays.indexOf(ray);
                rectMode(CENTER);
                fill(0, 255 - record/1.2, 0);
                noStroke();
                rect(width / this.rays.length * index, height / 2, width / this.rays.length, 14000 / record);
            }
        }
    }
}

let walls = [];
let particle;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (let i = 0; i < 20; i++) {
        walls.push(new Boundary(random(width), random(height), random(width), random(height)));
    }
    particle = new Particle(createVector(200, 200));
}

function draw() {
    background(0);

    for (let wall of walls) {
        wall.show();
    }

    particle.look(walls);
    particle.initRays();
}

window.addEventListener("keydown", function (event) {
    if (event.key === "a") {
        particle.angle -= 5; // Rotate counterclockwise
    } else if (event.key === "d") {
        particle.angle += 5; // Rotate clockwise
    } else if (event.key === "w") {
        particle.moveForward(); // Move forward
    } else if (event.key === "s") {
        particle.moveBackward(); // Move backward
    }
});
