document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('magic-word-input');
    const inputWrapper = document.getElementById('input-wrapper');
    const prizeCard = document.getElementById('prize-card');
    const claimBtn = document.getElementById('claim-btn');
    
    // Magic word logic
    const MAGIC_WORD = 'tilka';
    let triggered = false;

    claimBtn.addEventListener('click', () => {
        if (triggered) return;
        
        const value = inputField.value.trim().toLowerCase();
        
        if (value === MAGIC_WORD) {
            triggered = true;
            triggerCelebration();
        }
    });

    function triggerCelebration() {
        // Blur the input
        inputField.blur();
        
        // Disable input to prevent further typing
        inputField.disabled = true;

        // Custom high-energy confetti celebration using canvas-confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Generate confetti from two origins
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#8a2be2', '#00d4ff', '#ff007f', '#ffffff']
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#8a2be2', '#00d4ff', '#ff007f', '#ffffff']
            }));
        }, 250);

        // Transition UI after brief delay to let confetti start
        setTimeout(() => {
            inputWrapper.classList.add('fade-out');
            
            setTimeout(() => {
                prizeCard.classList.remove('hidden');
                prizeCard.classList.add('show');
                
                // Allow clicking anywhere to remove the gift box
                setTimeout(() => {
                    document.addEventListener('click', function dismissCard() {
                        prizeCard.classList.remove('show');
                        setTimeout(() => {
                            prizeCard.classList.add('hidden');
                            // Reset so it can be clicked again
                            inputWrapper.classList.remove('fade-out');
                            inputField.disabled = false;
                            inputField.value = ''; // clear the input for next try
                            triggered = false;
                        }, 800); // Wait for CSS transition
                        document.removeEventListener('click', dismissCard);
                    });
                }, 100);
            }, 600); // Wait for input to fade out before showing card
        }, 500);
    }
});
