/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let isHovering = false;
let cursorVisible = false;

// Cursor versteckt bis erste Mausbewegung
if (cursorDot) cursorDot.style.opacity = '0';
if (cursorOutline) cursorOutline.style.opacity = '0';

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (!cursorVisible) {
        cursorVisible = true;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
    }

    if (cursorDot) cursorDot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

    if (cursorOutline) cursorOutline.animate({
        transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`
    }, { 
        duration: 150, 
        fill: "forwards",
        easing: "ease-out" 
    });
});

const links = document.querySelectorAll("a, .lookbook-item, .archive-item, h1");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        isHovering = true; 
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        cursorOutline.style.backgroundColor = accentColor;
        cursorOutline.style.opacity = "0.2"; 
        cursorOutline.style.borderColor = "transparent"; 
    });
    link.addEventListener("mouseleave", () => {
        isHovering = false; 
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.opacity = "1"; 
        cursorOutline.style.borderColor = "var(--accent-color)";
    });
});

/* ==========================================
   2. RAW ARCHIVE: PURE RANDOM SCATTER & ZOOM LOGIC
   ========================================== */
const archiveItems = document.querySelectorAll('.archive-item');
const archiveContainer = document.querySelector('.archive-container');
const overlay = document.getElementById('archive-overlay');

let highestZ = 10; 
let selectedItem = null; 

// Container-Höhe dynamisch anpassen (Jetzt viel dichter!)
let totalHeight = 200; 
if (archiveContainer && archiveItems.length > 0) {
    // Vorher * 20, jetzt * 12. Die Seite wird kürzer, die Bilder ballen sich! (8-15 pro Viewport)
    totalHeight = 120 + (archiveItems.length * 12); 
    archiveContainer.style.height = `${totalHeight}vh`;
}

// Bilder ABSOLUT ZUFÄLLIG verteilen
const isMobile = window.innerWidth <= 900;
archiveItems.forEach((item) => {
    const itemWidth = item.classList.contains('landscape') ? (isMobile ? 220 : 460) : (isMobile ? 150 : 320);
    const screenW = window.innerWidth;
    const maxLeftPx = Math.max(0, screenW - itemWidth - 20);

    const randomX = isMobile
        ? Math.floor(Math.random() * maxLeftPx)
        : Math.floor(Math.random() * 70) + 5;
    
    const randomY = Math.floor(Math.random() * (totalHeight - 50)) + 10; 
    const randomRot = isMobile
        ? Math.floor(Math.random() * 20) - 10
        : Math.floor(Math.random() * 40) - 20; 

    item.dataset.origRot = randomRot;
    item.style.left = isMobile ? `${randomX}px` : `${randomX}%`;
    item.style.top = `${randomY}vh`; 
    item.style.transform = `rotate(${randomRot}deg)`;

    let isDragging = false;
    let hasMoved = false; 
    let startX, startY, initialLeft, initialTop;

    item.addEventListener('mousedown', (e) => {
        if(item.classList.contains('enlarged')) return; 
        
        isDragging = true;
        hasMoved = false; 
        highestZ++;
        item.style.zIndex = highestZ;
        
        item.style.transform = `scale(1.05) rotate(0deg)`;

        startX = e.clientX;
        startY = e.clientY;

        if (item.style.left.includes('%') || item.style.top.includes('vh')) {
            const rect = item.getBoundingClientRect();
            const containerRect = document.querySelector('.archive-container').getBoundingClientRect();
            initialLeft = rect.left - containerRect.left;
            initialTop = rect.top - containerRect.top;
            item.style.left = `${initialLeft}px`;
            item.style.top = `${initialTop}px`;
        } else {
            initialLeft = parseFloat(item.style.left);
            initialTop = parseFloat(item.style.top);
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        hasMoved = true; 
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        item.style.left = `${initialLeft + dx}px`;
        item.style.top = `${initialTop + dy}px`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        
        if (hasMoved) {
            const dropRot = Math.floor(Math.random() * 10) - 5; 
            item.style.transform = `rotate(${dropRot}deg)`;
            item.dataset.origRot = dropRot; 
            selectedItem = item; 
        }
    });
    
    item.addEventListener('click', (e) => {
        if (!hasMoved) {
            if (item.classList.contains('enlarged')) {
                item.classList.remove('enlarged');
                overlay.style.display = 'none';
                item.style.transform = `rotate(${item.dataset.origRot}deg)`;
            } else {
                if (selectedItem !== item) {
                    highestZ++;
                    item.style.zIndex = highestZ;
                    selectedItem = item;
                    const dropRot = Math.floor(Math.random() * 10) - 5; 
                    item.style.transform = `rotate(${dropRot}deg)`;
                    item.dataset.origRot = dropRot;
                } 
                else {
                    highestZ++;
                    item.style.zIndex = highestZ; 
                    item.classList.add('enlarged');
                    overlay.style.display = 'block';
                }
            }
        }
    });
});

if (overlay) {
    overlay.addEventListener('click', () => {
        archiveItems.forEach(item => {
            if (item.classList.contains('enlarged')) {
                item.classList.remove('enlarged');
                item.style.transform = `rotate(${item.dataset.origRot}deg)`;
            }
        });
        overlay.style.display = 'none';
    });
}

/* ==========================================
   3. SCROLL REVEAL FÜR PERFORMANCE
   ========================================== */
const observerOptions = {
    root: null,
    rootMargin: '100px', 
    threshold: 0.1 
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

archiveItems.forEach(item => {
    imageObserver.observe(item);
});
/* ==========================================
   4. MOBILE MENU OVERLAY
   ========================================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuLinks = document.getElementById('mobile-menu-links');

// Nav-Links aus der Navbar ins Overlay kopieren
if (hamburger && mobileMenu && mobileMenuLinks) {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(li => {
        const clone = li.cloneNode(true);
        mobileMenuLinks.appendChild(clone);
    });

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ==========================================
   5. ARCHIVE: LANDSCAPE DETECTION
   ========================================== */
window.addEventListener('load', () => {
    document.querySelectorAll('.archive-item img').forEach(img => {
        if (img.naturalWidth > img.naturalHeight) {
            img.closest('.archive-item').classList.add('landscape');
        }
    });
});