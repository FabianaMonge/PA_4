document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes de Materialize
    M.AutoInit();
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120
    });
    
    // Inicializar tabs con swipe
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {
        swipeable: true
    });
    
    // Inicializar acordeón
    var collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
        accordion: false
    });
    
    // Inicializar carrusel de profesores
    var carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel, {
        fullWidth: true,
        indicators: true,
        duration: 200
    });
    
    // Autoplay para el carrusel
    let instance = M.Carousel.getInstance(carousel[0]);
    setInterval(function() {
        instance.next();
    }, 5000);
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
    
    // Mejorar accesibilidad para tabs
    document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Mejorar accesibilidad para acordeón
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const lazyLoad = function() {
            const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
            
            if ('IntersectionObserver' in window) {
                let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove('lazy');
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });
                
                lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            }
        };
        
        document.addEventListener('DOMContentLoaded', lazyLoad);
        window.addEventListener('load', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('scroll', lazyLoad);
    }
    
    // Manejo de ARIA para tabs
    const updateTabAria = function() {
        document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
            panel.setAttribute('aria-hidden', 'true');
        });
        
        const activeTab = document.querySelector('.tab a.active');
        if (activeTab) {
            const activePanel = document.querySelector(activeTab.getAttribute('href'));
            if (activePanel) {
                activePanel.setAttribute('aria-hidden', 'false');
            }
        }
    };
    
    // Actualizar al cambiar tabs
    document.querySelectorAll('.tabs').forEach(tabs => {
        tabs.addEventListener('click', updateTabAria);
    });
    
    // Inicializar
    updateTabAria();
});