// Gestion du menu de navigation responsive
document.addEventListener('DOMContentLoaded', () => {
    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .hero-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation du header au scroll
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Détection de la plateforme pour les boutons de téléchargement
    const detectPlatform = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const downloadButtons = document.querySelector('.download-buttons');
        
        if (userAgent.includes('android')) {
            downloadButtons.querySelector('[data-platform="android"]').classList.add('highlight');
        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            downloadButtons.querySelector('[data-platform="ios"]').classList.add('highlight');
        }
    };

    // Initialisation
    window.addEventListener('scroll', animateOnScroll);
    detectPlatform();
    animateOnScroll(); // Animation initiale pour les éléments visibles

    // Menu hamburger pour mobile
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        
        hamburger.addEventListener('click', () => {
            nav.querySelector('.nav-links').classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        nav.insertBefore(hamburger, nav.querySelector('.nav-links'));
    };

    // Création du menu mobile si l'écran est petit
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.hamburger')) {
                createMobileMenu();
            }
        } else {
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.remove();
            }
            document.querySelector('.nav-links').classList.remove('active');
        }
    });

    // Gestion du formulaire de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                // Simulation d'envoi (à remplacer par votre logique d'API)
                showNotification('Merci de votre inscription !', 'success');
                emailInput.value = '';
            } else {
                showNotification('Veuillez entrer une adresse email valide', 'error');
            }
        });
    }

    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Gestion des notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Suppression après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 