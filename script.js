document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.progress');
    const mainContent = document.getElementById('main-content');

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Hide loading, show content
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    initAnimations(); // Start animations after loading
                }
            });
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 30); // Adjust speed here

    // --- Audio Player ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // --- Animations Setup (GSAP) ---
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        gsap.from('.sub-title', { opacity: 0, y: 30, duration: 1, delay: 0.5 });
        gsap.from('.main-title', { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.8, ease: "back.out(1.7)" });
        gsap.from('.date', { opacity: 0, y: 20, duration: 1, delay: 1.2 });

        // Gallery Animations
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.2, // Animate one by one
            duration: 1
        });

        // Envelope Interaction
        const envelope = document.getElementById('envelope');
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
            // Play sound effect could go here
        });

        // Gift Box Interaction
        const giftBox = document.getElementById('gift-box');
        const giftContent = document.getElementById('gift-content');

        giftBox.addEventListener('click', () => {
            if (!giftBox.classList.contains('open')) {
                giftBox.classList.add('open');

                // Show content with animation
                giftContent.classList.remove('hidden');
                gsap.from(giftContent, { opacity: 0, y: 20, duration: 1 });

                // Trigger Confetti
                triggerConfetti();
            }
        });
    }

    // --- Confetti Effect ---
    function triggerConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

});
