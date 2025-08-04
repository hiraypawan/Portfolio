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

    // Mouse trail effect
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('span');
        const chars = ['{', '}', '<', '>', '/', '*', '0', '1', 'λ', '⚡', '🔥'];
        trail.textContent = chars[Math.floor(Math.random() * chars.length)];
        trail.style.position = 'absolute';
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
        trail.style.animation = 'trail 1s linear';
        trail.style.opacity = '0';
        trail.style.color = '#333';
        trail.style.fontSize = '16px';
        trail.style.fontWeight = 'bold';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        
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
