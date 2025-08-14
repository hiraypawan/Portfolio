// Enhanced Portfolio JavaScript with Sound Effects and Animations
class EnhancedPortfolio {
    constructor() {
        this.currentFloor = 0;
        this.floors = ['home', 'about', 'projects', 'skills', 'contact'];
        this.isTransitioning = false;
        this.sounds = {
            hover: null,
            click: null
        };
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.initializeSounds();
        this.initializeParticleSystem();
        this.setupEventListeners();
        this.startAnimationLoop();
        this.initializeAnimations();
        this.startRotatingText();
        this.animateCounter();
        this.showCurrentFloor();
    }

    // Sound System
    initializeSounds() {
        try {
            // Create audio context for better control
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Initialize sound effects with base64 encoded audio
            this.sounds.hover = document.getElementById('hoverSound');
            this.sounds.click = document.getElementById('clickSound');
            
            // Set volume
            if (this.sounds.hover) this.sounds.hover.volume = 0.3;
            if (this.sounds.click) this.sounds.click.volume = 0.4;
        } catch (error) {
            console.log('Audio initialization failed:', error);
        }
    }
    
    playSound(soundName) {
        try {
            if (this.sounds[soundName] && this.audioContext?.state === 'running') {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(e => console.log('Sound play failed:', e));
            }
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }

    // Particle System
    initializeParticleSystem() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas?.getContext('2d');
        
        if (this.canvas && this.ctx) {
            this.resizeCanvas();
            this.createParticles();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        // Optimize particle count based on device capabilities
        const baseCount = Math.floor(window.innerWidth / 25);
        const numParticles = Math.min(baseCount, 60); // Cap at 60 for performance
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                hue: Math.random() * 120 + 200, // Wider color range
                life: Math.random() * 200 + 100 // Add particle lifecycle
            });
        }
    }
    
    updateParticles() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
    }
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                    this.ctx.strokeStyle = '#667eea';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation arrows
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.navigateFloor('left');
            } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.navigateFloor('right');
            }
        });
        
        // Click navigation
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.navigateToFloor(index);
                this.playSound('click');
            });
        });
        
        // Enhanced interactive effects
        this.setupInteractiveEffects();
        this.setupMouseEffects();
        this.enableAudioOnFirstInteraction();
    }
    
    setupInteractiveEffects() {
        // Enhanced button effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.createButtonParticles(button);
            });
            
            button.addEventListener('click', (e) => {
                this.playSound('click');
                this.createRippleEffect(e, button);
            });
        });
        
        // Social links with sound
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
            
            link.addEventListener('click', () => {
                this.playSound('click');
            });
        });
        
        // Badge hover effects
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });
        
        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });
    }

    setupMouseEffects() {
        let trailCount = 0;
        
        document.addEventListener('mousemove', (e) => {
            trailCount++;
            if (trailCount % 8 !== 0) return; // Reduce frequency for performance
            
            this.createMouseTrail(e.clientX, e.clientY);
        });
    }
    
    createMouseTrail(x, y) {
        const trail = document.createElement('div');
        // ENHANCED Money bags and coding symbols - MORE DRAMATIC!
        const moneySymbols = [
            String.fromCodePoint(0x1F4B0), // 💰
            String.fromCodePoint(0x1F4B5), // 💵
            String.fromCodePoint(0x1F4B4), // 💴
            String.fromCodePoint(0x1F4B6), // 💶
            String.fromCodePoint(0x1F4B7), // 💷
            String.fromCodePoint(0x1F4B8), // 💸
            String.fromCodePoint(0x1F4B3), // 💳
            String.fromCodePoint(0x1F3E6), // 🏦
            String.fromCodePoint(0x1F911), // 🤑
            String.fromCodePoint(0x1F4B2), // 💲
            '$$$', '€€€', '¥¥¥'
        ];
        const codingSymbols = ['{', '}', '(', ')', '[', ']', '<', '>', ':', ';', '/', '\\', '=', '+', '-', '*', '%', '&', '|', '!', '?', '~', '^', '@', '#', '$', '€', '¥', '£', '₹', '₿'];
        const techSymbols = [
            String.fromCodePoint(0x1F525), // 🔥
            String.fromCodePoint(0x26A1),  // ⚡
            String.fromCodePoint(0x1F4BB), // 💻
            String.fromCodePoint(0x1F5A5), // 🖥️
            String.fromCodePoint(0x1F4F1), // 📱
            String.fromCodePoint(0x1F680), // 🚀
            String.fromCodePoint(0x1F48E), // 💎
            String.fromCodePoint(0x1F31F), // 🌟
            String.fromCodePoint(0x2728),  // ✨
            String.fromCodePoint(0x1F4AB), // 💫
            String.fromCodePoint(0x2B50),  // ⭐
            String.fromCodePoint(0x1F3AF), // 🎯
            String.fromCodePoint(0x1F3AE)  // 🎮
        ];
        
        const allSymbols = [...moneySymbols, ...codingSymbols, ...techSymbols];
        const randomSymbol = allSymbols[Math.floor(Math.random() * allSymbols.length)];
        
        trail.textContent = randomSymbol;
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 6 + 7.5}px; /* REDUCED 70% - 7.5-13.5px */
            pointer-events: none;
            z-index: 1000;
            animation: ${Math.random() > 0.5 ? 'sparkle' : 'trail'} 1.6s ease-out forwards;
            transform: translate(-50%, -50%);
            user-select: none;
            font-weight: 900; /* Extra bold */
            color: ${this.getRandomTrailColor()};
            text-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
            filter: drop-shadow(0 0 8px currentColor);
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1600);
    }
    
    getRandomTrailColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
            '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
            '#ffd700', '#ff1744', '#00e676', '#2196f3', '#ff5722',
            '#9c27b0', '#00bcd4', '#4caf50', '#ffeb3b', '#e91e63'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(103, 126, 234, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        const particles = 5;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 4px;
                height: 4px;
                background: #667eea;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: float 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Floor Navigation System
    navigateFloor(direction) {
        if (this.isTransitioning) return;
        
        const newFloor = direction === 'left' ? 
            Math.max(0, this.currentFloor - 1) : 
            Math.min(this.floors.length - 1, this.currentFloor + 1);
            
        if (newFloor !== this.currentFloor) {
            this.navigateToFloor(newFloor);
            this.playSound('click');
        }
    }
    
    navigateToFloor(floorIndex) {
        if (this.isTransitioning || floorIndex === this.currentFloor) return;
        
        this.isTransitioning = true;
        
        // Hide current floor
        const currentFloorElement = document.getElementById(`floor-${this.floors[this.currentFloor]}`);
        if (currentFloorElement) {
            currentFloorElement.classList.remove('active');
        }
        
        // Update navigation indicators
        this.updateNavigationIndicators(floorIndex);
        
        setTimeout(() => {
            // Show new floor
            const newFloorElement = document.getElementById(`floor-${this.floors[floorIndex]}`);
            if (newFloorElement) {
                newFloorElement.classList.add('active');
            }
            
            this.currentFloor = floorIndex;
            
            // Re-initialize animations for new floor
            this.initializeFloorAnimations(this.floors[floorIndex]);
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
        }, 400);
    }
    
    updateNavigationIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.indicator');
        const floorNames = ['HOME', 'ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'];
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
        
        // Update elevator floor display
        const currentFloorDisplay = document.querySelector('.current-floor');
        const floorLabel = document.querySelector('.floor-label');
        
        if (currentFloorDisplay && floorLabel) {
            currentFloorDisplay.textContent = `F${activeIndex + 1}`;
            floorLabel.textContent = floorNames[activeIndex];
            
            // Add floor change animation
            currentFloorDisplay.style.animation = 'none';
            currentFloorDisplay.offsetHeight; // Trigger reflow
            currentFloorDisplay.style.animation = 'floorChange 0.6s ease-out';
        }
    }

    // Animation Systems
    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    initializeAnimations() {
        // Initial entrance animation
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
        });
        
        setTimeout(() => {
            portfolioCards.forEach(card => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            });
        }, 300);
    }
    
    initializeFloorAnimations(floorName) {
        const floor = document.getElementById(`floor-${floorName}`);
        if (!floor) return;
        
        switch (floorName) {
            case 'home':
                this.animateCounter();
                this.startRotatingText();
                break;
            case 'about':
                this.animateTimeline();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'skills':
                this.animateSkillBars();
                break;
            case 'contact':
                this.initializeContactForm();
                break;
        }
    }

    // Specific Animations
    animateCounter() {
        const counter = document.querySelector('.counter');
        if (!counter) return;
        
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    }
    
    startRotatingText() {
        const items = document.querySelectorAll('.rotate-item');
        if (items.length === 0) return;
        
        let currentIndex = 0;
        
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 3000);
    }
    
    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }
    
    animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
                const level = bar.getAttribute('data-level');
                bar.style.setProperty('--skill-width', level + '%');
            }, index * 100);
        });
    }
    
    initializeContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
        
        // Enhanced input animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.playSound('hover');
            });
        });
    }
    
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        this.playSound('click');
        
        // Simulate form submission with animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
        
        console.log('Form submitted:', data);
    }
    
    showCurrentFloor() {
        const currentFloorElement = document.getElementById(`floor-${this.floors[this.currentFloor]}`);
        if (currentFloorElement) {
            currentFloorElement.classList.add('active');
        }
    }
    
    enableAudioOnFirstInteraction() {
        const enableAudio = () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };
        
        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);
    }
}

// Global functions for navigation (called by HTML)
function navigateArrow(direction) {
    if (window.portfolio) {
        window.portfolio.navigateFloor(direction);
    }
}

function viewWork() {
    if (window.portfolio) {
        window.portfolio.navigateToFloor(2); // Projects floor
        window.portfolio.playSound('click');
    }
}

function contactMe() {
    if (window.portfolio) {
        window.portfolio.navigateToFloor(4); // Contact floor
        window.portfolio.playSound('click');
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new EnhancedPortfolio();
    console.log('Enhanced Portfolio initialized! 🚀');
});

// Add enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary:hover,
    .btn-secondary:hover {
        animation: pulse 1s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0% { transform: translateY(-3px) scale(1.05); }
        50% { transform: translateY(-3px) scale(1.08); }
        100% { transform: translateY(-3px) scale(1.05); }
    }
    
    /* Enhanced loading animation */
    .portfolio-card {
        animation: cardEntrance 1s ease-out;
    }
    
    @keyframes cardEntrance {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9) rotateX(10deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }
    
    /* Improved text animations */
    .typing-container {
        animation: fadeInUp 0.8s ease-out 0.5s both;
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Skill bar animation improvement */
    .skill-level::before {
        animation: skillFill 1.5s ease-out;
    }
    
    @keyframes skillFill {
        0% {
            width: 0;
            box-shadow: 0 0 5px rgba(103, 126, 234, 0.3);
        }
        100% {
            box-shadow: 0 0 15px rgba(103, 126, 234, 0.6);
        }
    }
    
    /* Enhanced particle effects */
    .particle {
        position: fixed;
        pointer-events: none;
        border-radius: 50%;
        z-index: 1000;
    }
    
    /* ENHANCED Mouse Trail Animations for Bigger Symbols */
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg) scale(0.8);
            filter: blur(0px) drop-shadow(0 0 8px currentColor);
        }
        25% {
            opacity: 0.9;
            transform: translate(-50%, -50%) rotate(90deg) scale(1.3);
            filter: blur(0px) drop-shadow(0 0 15px currentColor);
        }
        50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) rotate(180deg) scale(1.5);
            filter: blur(1px) drop-shadow(0 0 20px currentColor);
        }
        75% {
            opacity: 0.5;
            transform: translate(-50%, -50%) rotate(270deg) scale(1.2);
            filter: blur(2px) drop-shadow(0 0 12px currentColor);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(360deg) scale(0.3);
            filter: blur(3px) drop-shadow(0 0 5px currentColor);
        }
    }
    
    @keyframes trail {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.9);
            filter: blur(0px) drop-shadow(0 0 8px currentColor);
        }
        20% {
            opacity: 0.95;
            transform: translate(-50%, -50%) translateY(-15px) scale(1.4);
            filter: blur(0px) drop-shadow(0 0 18px currentColor);
        }
        40% {
            opacity: 0.8;
            transform: translate(-50%, -50%) translateY(-25px) scale(1.6);
            filter: blur(1px) drop-shadow(0 0 22px currentColor);
        }
        60% {
            opacity: 0.6;
            transform: translate(-50%, -50%) translateY(-35px) scale(1.3);
            filter: blur(2px) drop-shadow(0 0 15px currentColor);
        }
        80% {
            opacity: 0.3;
            transform: translate(-50%, -50%) translateY(-45px) scale(0.8);
            filter: blur(3px) drop-shadow(0 0 8px currentColor);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-55px) scale(0.2);
            filter: blur(4px) drop-shadow(0 0 3px currentColor);
        }
    }
    
    /* ELEVATOR FLOOR CHANGE ANIMATION */
    @keyframes floorChange {
        0% {
            transform: scale(1);
            color: #00ff88;
        }
        25% {
            transform: scale(1.2);
            color: #ffff00;
            text-shadow: 0 0 15px currentColor;
        }
        50% {
            transform: scale(1.3);
            color: #ff6b6b;
            text-shadow: 0 0 20px currentColor;
        }
        75% {
            transform: scale(1.1);
            color: #00bcd4;
            text-shadow: 0 0 12px currentColor;
        }
        100% {
            transform: scale(1);
            color: #00ff88;
            text-shadow: 0 0 8px #00ff88;
        }
    }
`;
document.head.appendChild(style);
