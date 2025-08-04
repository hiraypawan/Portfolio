document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and effects
    initializePortfolio();
});

function initializePortfolio() {
    // Add entrance animation to portfolio card
    const portfolioCard = document.querySelector('.portfolio-card');
    if (portfolioCard) {
        portfolioCard.style.opacity = '0';
        portfolioCard.style.transform = 'translateY(50px) scale(0.95)';
        
        setTimeout(() => {
            portfolioCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            portfolioCard.style.opacity = '1';
            portfolioCard.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    // Add floating animation to profile circle
    const profileCircle = document.querySelector('.profile-circle');
    if (profileCircle) {
        profileCircle.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Setup interactive effects
    setupInteractiveEffects();
    setupMouseTrail();
}

function setupInteractiveEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRipple(e, button);
        });
    });
    
    // Add social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

function setupMouseTrail() {
    let trailCount = 0;
    const maxTrails = 5;
    
    document.addEventListener('mousemove', (e) => {
        // Limit trail creation to improve performance
        trailCount++;
        if (trailCount % 3 !== 0) return;
        
        const trail = document.createElement('div');
        const symbols = ['✨', '💫', '⭐', '🌟', '💎', '🚀', '⚡', '💥'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        trail.textContent = randomSymbol;
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s ease-out forwards;
            transform: translate(-50%, -50%);
            user-select: none;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1000);
    });
}

function createRipple(event, element) {
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
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navigation functions
function navigateArrow(direction) {
    console.log(`Navigate ${direction}`);
    // Add your navigation logic here
    // This could switch between different portfolio sections
}

function viewWork() {
    // Add smooth scroll or navigation to work section
    console.log('View work clicked');
    // You can add your work portfolio logic here
    window.open('#', '_blank'); // Replace with actual portfolio URL
}

function contactMe() {
    // Add contact functionality
    console.log('Contact me clicked');
    // You can add contact form or email functionality here
    window.location.href = 'mailto:your-email@example.com'; // Replace with actual email
}

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);
