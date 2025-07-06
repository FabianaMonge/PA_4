document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes de Materialize
    M.AutoInit();
    
    // Inicializar el carrusel con autoplay
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
    
    // Pausar carrusel al interactuar
    carousel[0].addEventListener('mouseenter', function() {
        instance.pause();
    });
    
    carousel[0].addEventListener('mouseleave', function() {
        instance.next();
    });
    
    // Inicializar tabs
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {
        swipeable: true
    });
    
    // Inicializar menú móvil
    var sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
    
    // Validación de formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            if (nombre && email && mensaje) {
                M.toast({
                    html: 'Gracias por tu mensaje. Nos pondremos en contacto pronto.',
                    classes: 'green',
                    displayLength: 4000,
                    ariaLabel: 'Mensaje enviado con éxito'
                });
                contactForm.reset();
                
                // Enfoque accesible después del envío
                setTimeout(() => {
                    document.querySelector('h1').focus();
                }, 100);
            } else {
                M.toast({
                    html: 'Por favor completa todos los campos.',
                    classes: 'red',
                    displayLength: 4000,
                    ariaLabel: 'Error en el formulario'
                });
                
                // Enfocar el primer campo con error
                if (!nombre) {
                    document.getElementById('nombre').focus();
                } else if (!email) {
                    document.getElementById('email').focus();
                } else {
                    document.getElementById('mensaje').focus();
                }
            }
        });
    }
    
    // Validación de formulario de admisión
    const admisionForm = document.getElementById('admision-form');
    if (admisionForm) {
        admisionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la validación real
            M.toast({
                html: 'Solicitud enviada con éxito. Revisa tu correo para más instrucciones.',
                classes: 'green',
                displayLength: 5000,
                ariaLabel: 'Solicitud de admisión enviada'
            });
            admisionForm.reset();
        });
    }
    
    // Mejorar accesibilidad del carrusel
    setInterval(function() {
        var activeItem = document.querySelector('.carousel .active');
        if (activeItem) {
            activeItem.setAttribute('aria-hidden', 'false');
            document.querySelectorAll('.carousel .carousel-item:not(.active)').forEach(function(item) {
                item.setAttribute('aria-hidden', 'true');
            });
        }
    }, 100);
    
    // Manejo de teclado para tabs
    document.querySelectorAll('[role="tab"]').forEach(function(tab) {
        tab.addEventListener('keydown', function(e) {
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
        // Polyfill para lazy loading
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
    
    // Mejorar accesibilidad para usuarios de teclado
    document.addEventListener('keyup', function(e) {
        // Saltar al contenido principal con tecla 'S'
        if (e.key === 'S' || e.key === 's') {
            document.querySelector('.skip-link').focus();
        }
    });
});