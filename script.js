document.addEventListener('DOMContentLoaded', () => {
    /* --- Background Hearts Animation --- */
    const bgHearts = document.getElementById('bg-hearts');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        createHeart();
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        bgHearts.appendChild(heart);
    }

    /* --- Envelope Interaction --- */
    const openBtn = document.getElementById('openBtn');
    const envelope = document.querySelector('.envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    let isOpen = false;

    // Add click event to both button and envelope wrapper for better UX
    const toggleEnvelope = () => {
        if (isOpen) return; // Prevent closing for now, or toggle if preferred
        isOpen = true;
        
        envelope.classList.add('open');
        openBtn.style.display = 'none'; // Hide button after opening
        
        // Trigger Confetti
        startConfetti();

        // Optional: Show a specific message or modal if needed
        // For now, the card inside is revealed
    };

    openBtn.addEventListener('click', toggleEnvelope);
    envelopeWrapper.addEventListener('click', toggleEnvelope);

    /* --- Confetti Effect --- */
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiParticles = [];
    const confettiCount = 150;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        { front: '#ff0000', back: '#d30000' },
        { front: '#ffcc00', back: '#d4aa00' },
        { front: '#ffffff', back: '#eeeeee' },
        { front: '#ff66b2', back: '#ff3399' }
    ];

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Confetti {
        constructor() {
            this.randomModifier = Math.random() * 55 + 55;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.tilt = Math.floor(Math.random() * 10) - 10;
            this.tiltAngle = 0;
            this.tiltAngleIncrement = (Math.random() * 0.07) + 0.05;
            this.scale = 1;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.r = Math.random() * 15 + 10;
            this.dx = (Math.random() * 20) - 10;
            this.dy = (Math.random() * 20) - 10;
        }

        draw() {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color.back;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            ctx.stroke();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color.front;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            ctx.stroke();
            ctx.closePath();
        }

        update() {
            this.tiltAngle += this.tiltAngleIncrement;
            this.tilt = Math.sin(this.tiltAngle) * 15;
            this.y = this.y + (Math.cos(this.tiltAngle) + 3 + (this.r / 2)) / 2;
            this.x = this.x + Math.sin(this.tiltAngle) * 2;
            
            if (this.y > canvas.height) {
                // Recycle particle
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.tilt = Math.floor(Math.random() * 10) - 10;
            }

            this.draw();
        }
    }

    function initConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confettiParticles.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach((particle) => particle.update());
        requestAnimationFrame(animateConfetti);
    }

    function startConfetti() {
        initConfetti();
        animateConfetti();
    }
});
