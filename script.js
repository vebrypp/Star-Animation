window.addEventListener('load', function() {
    let v, h, timeStamp = 0;
    let stars = [];
    const myCanvas = document.querySelector('#myCanvas');
    const ctx = myCanvas.getContext('2d');

    class Star {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = randInit(-2, 2);
            this.vy = randInit(1, 5);
            this.length = 20;
            this.angle = 5;
            this.rotate = 120;
            this.rad = this.length / 3;
            this.mid = this.length - this.rad;
            this.hue = randInit(1, 358);
            this.colorStroke = `hsla(${this.hue}, 100%, 50%)`;
            this.fps = 900;
            this.timeout = 1000/this.fps;
            this.time = 0;
        };
        draw() {
            ctx.strokeStyle = this.colorStroke;
            ctx.save();
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.colorStroke;
            ctx.translate(this.x, this.y);   
            ctx.rotate(this.rotate)         
            ctx.beginPath();
            ctx.moveTo(0, this.length);
            for(let i = 0; i < this.angle; i++) {
                ctx.rotate(Math.PI / this.angle);
                ctx.lineTo(0, this.mid);
                ctx.rotate(Math.PI / this.angle);
                ctx.lineTo(0, this.length);
            };
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        update(deltaTime, index) {
            if(this.time > this.timeout) {
                this.x += this.vx;
                this.y += this.vy;
                this.rotate += 0.05;
                this.mid -= 0.2;
                this.length -= 0.2;
                if(this.mid <= 0) this.mid = 0;
                if(this.length < 0) stars.splice(index, 1)
                this.time = 0;
            } else {
                this.time += deltaTime;
            };
        };
    };

    resizeCanvas();
    animationLoop(0);

    function resizeCanvas() {
        v = myCanvas.width = window.innerWidth;
        h = myCanvas.height = window.innerHeight;
    };
    function mouseMove(e) {
        stars.push(new Star(e.x, e.y))
    };
    function touchMove(e) {
        stars.push(new Star(e.touches[0].clientX, e.touches[0].clientY))
    };
    function randInit(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };
    function animationLoop(x) {
        
        let deltaTime = x - timeStamp;
        timeStamp = x; 
        ctx.clearRect(0, 0, v, h);
        stars.forEach(e => {
            e.draw();
            e.update(deltaTime, e.index);
        });
        requestAnimationFrame(animationLoop);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', touchMove);
});