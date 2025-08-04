document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[data-target]');
    const flipSound = document.getElementById('pageFlipSound');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.target.dataset.target;
            navigateTo(targetPageId);
        });
    });

    // Enhanced mouse trail effect with business icons and code snippets
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('span');
        const symbols = [
            // Code characters
            '{', '}', '<', '>', '/', '*', '0', '1', 'λ', '!=', '&&', '||', '++', '--',
            // Business & crypto icons
            '💼', '💰', '💎', '📊', '📈', '📉', '💳', '🏦', '🚀', '🎯',
            // Stars and effects
            '⭐', '✨', '🌟', '💫', '⚡', '🔥', '💥', '✦', '❇️', '🔮',
            // Tech symbols
            '⚙️', '🔧', '💻', '📱', '🖥️', '⌨️', '🖱️', '🔌', '📡', '🛸',
            // Additional code snippets
            'fn', 'var', 'let', 'const', '=>', 'if', 'else', 'for', 'while', 'return'
        ];
        
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        trail.textContent = randomSymbol;
        
        // Add different colors based on symbol type
        let symbolColor = '#333';
        if (['💼', '💰', '💎', '📊', '📈', '💳', '🏦'].includes(randomSymbol)) {
            symbolColor = '#2ecc71'; // Green for business
        } else if (['⭐', '✨', '🌟', '💫', '⚡'].includes(randomSymbol)) {
            symbolColor = '#f39c12'; // Orange for stars/effects
        } else if (['🔥', '💥', '🚀'].includes(randomSymbol)) {
            symbolColor = '#e74c3c'; // Red for energy
        } else if (['⚙️', '🔧', '💻', '📱'].includes(randomSymbol)) {
            symbolColor = '#3498db'; // Blue for tech
        }
        
        trail.textContent = randomSymbol;
        // Choose animation based on symbol type
        let animationType = 'trail';
        if (['⭐', '✨', '🌟', '💫', '✦', '❇️'].includes(randomSymbol)) {
            animationType = 'sparkle';
        } else if (['💼', '💰', '💎', '🚀', '🎯'].includes(randomSymbol)) {
            animationType = 'float';
        }
        
        trail.style.position = 'absolute';
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
        trail.style.animation = `${animationType} 1s linear`;
        trail.style.opacity = '0';
        trail.style.color = symbolColor;
        trail.style.fontSize = Math.random() > 0.5 ? '16px' : '18px'; // Random size variation
        trail.style.fontWeight = 'bold';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        trail.style.textShadow = `0 0 5px ${symbolColor}40`; // Glow effect with symbol color
        trail.style.transform = 'translate(-50%, -50%)';
        trail.style.userSelect = 'none';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1000);
    });

    // Page navigation function
    function navigateTo(targetPageId) {
        const currentPage = document.querySelector('.page.active');
        const nextPage = document.getElementById(targetPageId);
        
        if (!nextPage) {
            console.error(`Page with id "${targetPageId}" not found`);
            return;
        }
        
        // Play flip sound (handle cases where audio might not load)
        try {
            flipSound.currentTime = 0;
            flipSound.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio not available:', e);
        }
        
        // Add exit animation to current page
        currentPage.classList.add('exit');
        currentPage.classList.remove('active');
        
        // Show next page
        nextPage.classList.add('active');

        // Clean up exit class after transition
        setTimeout(() => {
            currentPage.classList.remove('exit');
        }, 600);
    }

    // Add click to home page to go to index
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.addEventListener('click', () => {
            navigateTo('index');
        });
    }
});
