// Estructura de datos de los estudios
const studyData = {
    lurisia: {
        title: "Lurisia",
        subtitle: "Bebidas Premium: Agua Mineral, Sodas Artesanales y Aperitivos No Alcohólicos",
        sections: {
            resumen: "Resumen Ejecutivo",
            pestel: "PESTEL / Macroeconómico",
            porter: "Sector / Porter",
            competencia: "Competencia",
            consumidor: "Consumidor",
            tendencias: "Tendencias",
            recomendaciones: "Recomendaciones",
            clientes: "Clientes Potenciales",
            canales: "Canales de Venta"
        }
    },
    meltz: {
        title: "Meltz Dubai",
        subtitle: "Chocolates Premium: Barras con Knafeh y Pistacho",
        sections: {
            resumen: "Resumen Ejecutivo",
            pestel: "PESTEL / Macroeconómico",
            porter: "Sector / Porter",
            competencia: "Competencia",
            consumidor: "Consumidor",
            tendencias: "Tendencias",
            recomendaciones: "Recomendaciones",
            clientes: "Clientes Potenciales",
            canales: "Canales de Venta"
        }
    },
    augusta: {
        title: "Augusta",
        subtitle: "Panettones y Confitería Premium Italiana",
        sections: {
            resumen: "Resumen Ejecutivo",
            pestel: "PESTEL / Macroeconómico",
            porter: "Sector / Porter",
            competencia: "Competencia",
            consumidor: "Consumidor",
            tendencias: "Tendencias",
            recomendaciones: "Recomendaciones",
            clientes: "Clientes Potenciales",
            canales: "Canales de Venta"
        }
    }
};

// Variables globales
let currentSection = 'inicio';
let currentSubsection = null;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateNavigation();
    loadSection('inicio');
});

// Inicialización
function initializeApp() {
    console.log('Global Trade & Market Insights - Aplicación iniciada');
    
    // Verificar que todas las secciones existen
    const requiredSections = ['inicio', 'lurisia', 'meltz', 'augusta', 'comparativo'];
    requiredSections.forEach(section => {
        const element = document.getElementById(section);
        if (!element) {
            console.warn(`Sección faltante: ${section}`);
        }
    });
}

// Configuración de event listeners
function setupEventListeners() {
    // Toggle menú móvil
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });

    // Configurar botones de navegación de estudio
    setupStudyNavigation();

    // Configurar descarga de PDFs
    setupPDFDownload();

    // Scroll spy para navegación activa
    setupScrollSpy();

    // Smooth scrolling para enlaces internos
    setupSmoothScrolling();
}

// Navegación principal
function navigateToSection(sectionId) {
    hideAllSections();
    showSection(sectionId);
    currentSection = sectionId;
    currentSubsection = null;
    updateNavigation();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar/ocultar secciones
function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

function loadSection(sectionId) {
    navigateToSection(sectionId);
}

// Navegación de subsecciones dentro de estudios
function scrollToSubsection(subsectionId) {
    const element = document.getElementById(subsectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const studyNavHeight = document.querySelector('.study-nav').offsetHeight;
        const offset = headerHeight + studyNavHeight + 20;
        
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        currentSubsection = subsectionId;
        updateStudyNavigation();
    }
}

// Configuración de navegación de estudios
function setupStudyNavigation() {
    // Lurisia
    const lurisiaButtons = document.querySelectorAll('#lurisia-nav button');
    lurisiaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = button.getAttribute('onclick').match(/scrollToSubsection\('([^']+)'\)/);
            if (targetId) {
                scrollToSubsection(targetId[1]);
            }
        });
    });

    // Similar configuración para Meltz y Augusta...
}

// Actualizar navegación activa
function updateNavigation() {
    // Actualizar navegación principal
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function updateStudyNavigation() {
    if (!currentSection || currentSection === 'inicio' || currentSection === 'comparativo') {
        return;
    }
    
    const navButtons = document.querySelectorAll(`#${currentSection}-nav button`);
    navButtons.forEach(button => {
        button.classList.remove('active');
        const targetId = button.getAttribute('onclick');
        if (targetId && targetId.includes(currentSubsection)) {
            button.classList.add('active');
        }
    });
}

// Scroll Spy
function setupScrollSpy() {
    let ticking = false;

    function updateScrollSpy() {
        if (currentSection === 'inicio' || currentSection === 'comparativo') {
            ticking = false;
            return;
        }

        const subsections = document.querySelectorAll(`#${currentSection} .subsection`);
        const headerHeight = document.querySelector('.header').offsetHeight;
        const studyNavHeight = document.querySelector('.study-nav').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + studyNavHeight + 100;

        let activeSubsection = null;
        subsections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSubsection = section.id;
            }
        });

        if (activeSubsection && activeSubsection !== currentSubsection) {
            currentSubsection = activeSubsection;
            updateStudyNavigation();
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollSpy);
            ticking = true;
        }
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Solo para enlaces con href que empiecen con #
        if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = headerHeight + 20;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Configuración descarga PDFs
function setupPDFDownload() {
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Los PDFs con listados de contactos están disponibles para descarga. Función en desarrollo - contacte al administrador para acceso a los archivos.');
        });
    }
}

// Utilidades para animaciones y efectos
function animateElement(element, animationType = 'fadeIn') {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Función para animar cards cuando entran en viewport
function setupIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observar cards y subsecciones
    const elementsToAnimate = document.querySelectorAll('.card, .subsection');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Funciones de utilidad para búsqueda y filtrado
function searchContent(query) {
    if (!query || query.length < 3) {
        return [];
    }
    
    const results = [];
    const sections = document.querySelectorAll('.subsection');
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const title = section.querySelector('h3')?.textContent || '';
        
        if (content.includes(query.toLowerCase())) {
            results.push({
                title: title,
                sectionId: section.id,
                element: section
            });
        }
    });
    
    return results;
}

// Funciones para manejo de datos del estudio
function getStudySection(studyId, sectionId) {
    const study = studyData[studyId];
    if (study && study.sections[sectionId]) {
        return study.sections[sectionId];
    }
    return null;
}

function getAllStudies() {
    return Object.keys(studyData).map(key => ({
        id: key,
        ...studyData[key]
    }));
}

// Función para export/import de datos
function exportStudyData() {
    return JSON.stringify(studyData, null, 2);
}

// Funciones de accesibilidad
function setupAccessibility() {
    // Configurar navegación por teclado
    document.addEventListener('keydown', function(e) {
        // ESC para volver al inicio
        if (e.key === 'Escape') {
            navigateToSection('inicio');
        }
        
        // Alt + números para navegación rápida
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    navigateToSection('inicio');
                    break;
                case '2':
                    navigateToSection('lurisia');
                    break;
                case '3':
                    navigateToSection('meltz');
                    break;
                case '4':
                    navigateToSection('augusta');
                    break;
                case '5':
                    navigateToSection('comparativo');
                    break;
            }
        }
    });

    // Configurar ARIA labels dinámicamente
    const navButtons = document.querySelectorAll('.nav a, .study-nav button');
    navButtons.forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
    });
}

// Función para debug y desarrollo
function debugApp() {
    console.log('--- Debug Info ---');
    console.log('Current Section:', currentSection);
    console.log('Current Subsection:', currentSubsection);
    console.log('Study Data:', studyData);
    console.log('Window dimensions:', window.innerWidth, 'x', window.innerHeight);
}

// Configurar debug en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugApp = debugApp;
    console.log('Debug mode enabled. Use debugApp() to inspect application state.');
}

// Configuración adicional cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupIntersectionObserver();
    setupAccessibility();
    
    // Configurar tooltips para elementos con data-tooltip
    setupTooltips();
});

// Tooltips
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        document.body.removeChild(e.target._tooltip);
        e.target._tooltip = null;
    }
}

// Funciones para responsive behavior
function handleResize() {
    const nav = document.getElementById('nav');
    if (window.innerWidth > 768 && nav) {
        nav.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Lazy loading para imágenes (si las hubiera)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application Error:', e.error);
    // En producción, aquí se podría enviar el error a un servicio de monitoreo
});

// Configuración final
console.log('Global Trade & Market Insights v1.0 - Aplicación cargada correctamente');

// Exportar funciones principales para uso externo
window.GTMInsights = {
    navigateToSection,
    scrollToSubsection,
    searchContent,
    getStudySection,
    getAllStudies,
    debugApp
};