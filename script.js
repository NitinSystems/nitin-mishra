/*
    SYSTEM BLUE: Interaction Engine
    Focus: Glow Pulses, Depth Parallax, and Atmospheric Flow
*/

document.addEventListener('DOMContentLoaded', () => {
    initGlowMotion();
    initNavbarScroll();
    initMobileMenu();
    initRevealObserver();
    initSmoothScroll();
    initFAQ();
    initMagneticButtons();
    initSystemModal();
    initIntakeForm();
});

/**
 * FAQ Interaction
 * Handles click-to-toggle for mobile and hover enhancement with ARIA support
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        // Accessibility init
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-expanded', 'false');

        const toggle = () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        };

        trigger.addEventListener('click', toggle);
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
}

/**
 * Magnetic Button Effect
 * Subtly pulls buttons toward the cursor for high-end feel
 */
function initMagneticButtons() {
    const interactives = document.querySelectorAll('.system-node');
    
    interactives.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const multiplier = el.classList.contains('system-node') ? 0.4 : 0.25;
            el.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
            el.style.transition = 'none';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

/**
 * Glow Motion
 * Creates a subtle, atmospheric pulse for the background glow orbs
 */
function initGlowMotion() {
    const orbs = document.querySelectorAll('.glow-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Navbar Scroll Effect
 * Adds a glassmorphic solid state when scrolling
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('span');
            if (icon) {
                icon.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('span');
                if (icon) icon.textContent = '☰';
            });
        });
    }
}

/**
 * Reveal Observer
 * Orchestrates the entry of sections with high-end easing
 */
function initRevealObserver() {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 100;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Update URL to reflect the section for clean shareable links
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * System Inspection Modal Overlay
 * Manages the display and asset navigation of the showcase portfolio
 */
function initSystemModal() {
    const modal = document.getElementById('systemModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    const viewportImg = document.getElementById('modalViewportImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const thumbnailGrid = document.getElementById('modalThumbnailGrid');

    if (!modal || !closeBtn || !viewportImg) return;

    // Attach click listeners to all buttons
    const triggerButtons = document.querySelectorAll('.btn-supporting-systems');
    
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const assets = JSON.parse(btn.getAttribute('data-assets') || '[]');
            const titles = JSON.parse(btn.getAttribute('data-titles') || '[]');
            const descriptions = JSON.parse(btn.getAttribute('data-descriptions') || '[]');
            const title = btn.getAttribute('data-title') || '';
            const desc = btn.getAttribute('data-desc') || '';

            if (assets.length === 0) return;

            // Populate title and description
            modalTitle.textContent = title;
            modalDesc.textContent = descriptions[0] || desc;

            // Clear thumbnails
            thumbnailGrid.innerHTML = '';

            // Generate thumbnails
            assets.forEach((assetPath, idx) => {
                const titleStr = titles[idx] || `Asset 0${idx + 1}`;
                
                const thumbItem = document.createElement('div');
                thumbItem.className = `system-thumb-item${idx === 0 ? ' active' : ''}`;
                thumbItem.innerHTML = `
                    <div class="system-thumb-preview">
                        <img src="${assetPath}" alt="${titleStr}">
                    </div>
                    <div class="system-thumb-title">${titleStr}</div>
                `;

                thumbItem.addEventListener('click', () => {
                    // Update active class
                    thumbnailGrid.querySelectorAll('.system-thumb-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    thumbItem.classList.add('active');

                    // Dynamic description update for active step
                    modalDesc.textContent = descriptions[idx] || desc;

                    // Smooth transition for viewport image load
                    viewportImg.classList.remove('loaded');
                    setTimeout(() => {
                        viewportImg.src = assetPath;
                        viewportImg.alt = titleStr;
                    }, 50);
                });

                thumbnailGrid.appendChild(thumbItem);
            });

            // Set initial viewport image
            viewportImg.classList.remove('loaded');
            viewportImg.src = assets[0];
            viewportImg.alt = titles[0] || 'System Asset';

            // Open modal
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        });
    });

    // Make viewport smooth reveal on load
    viewportImg.addEventListener('load', () => {
        viewportImg.classList.add('loaded');
    });

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    // Close controls
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Escape key bind
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Operational Lead Intake Form Submission Handling
 * Integrates with Make.com webhook, handles validation, prevents double submissions, and manages success/error states.
 */
function initIntakeForm() {
    const form = document.getElementById('operationalForm');
    if (!form) return;

    const submitBtn = document.getElementById('intakeSubmitBtn');
    const feedback = document.getElementById('formFeedback');
    
    // Configurable Make.com webhook URL - easily replaceable by the user
    const webhookUrl = 'https://hook.eu1.make.com/f94swjs7bo3239k6bszr9e5x7uorhepc';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous feedback
        feedback.style.display = 'none';
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        // Form fields
        const nameInput = document.getElementById('intakeName');
        const emailInput = document.getElementById('intakeEmail');
        const businessTypeInput = document.getElementById('intakeBusinessType');
        const helpInput = document.getElementById('intakeHelp');
        const challengeInput = document.getElementById('intakeChallenge');
        const toolsInput = document.getElementById('intakeTools');

        // Validation
        let hasError = false;
        const markInvalid = (el) => {
            el.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            el.style.backgroundColor = 'rgba(239, 68, 68, 0.02)';
        };
        const resetValidationStyle = (el) => {
            el.style.borderColor = '';
            el.style.backgroundColor = '';
        };

        [nameInput, emailInput, businessTypeInput, helpInput, challengeInput].forEach(resetValidationStyle);

        if (!nameInput.value.trim()) {
            markInvalid(nameInput);
            hasError = true;
        }
        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
            markInvalid(emailInput);
            hasError = true;
        }
        if (!businessTypeInput.value.trim()) {
            markInvalid(businessTypeInput);
            hasError = true;
        }
        if (!helpInput.value) {
            markInvalid(helpInput);
            hasError = true;
        }
        if (!challengeInput.value.trim()) {
            markInvalid(challengeInput);
            hasError = true;
        }

        if (hasError) {
            feedback.style.display = 'block';
            feedback.style.color = '#f87171'; // soft red color
            feedback.textContent = 'Please fill out all required fields with a valid email format.';
            return;
        }

        // Prevent duplicates & show loading state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'TRANSMITTING OPERATIONS REQUIREMENT...';
        submitBtn.style.opacity = '0.7';

        // Prepare Make.com Payload
        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            business_type: businessTypeInput.value.trim(),
            help_type: helpInput.value,
            operational_challenge: challengeInput.value.trim(),
            current_tools: toolsInput.value.trim() || 'None Specified',
            submission_timestamp: new Date().toISOString(),
            source_page: window.location.pathname || 'index.html'
        };

        // Convert payload to URLSearchParams to bypass CORS preflight (OPTIONS) request
        const urlEncodedPayload = new URLSearchParams();
        Object.keys(payload).forEach(key => urlEncodedPayload.append(key, payload[key]));

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors', // Bypasses strict local CORS blocks entirely
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedPayload.toString()
            });

            // If mode is 'no-cors', response is opaque (status 0). If it didn't throw a network error, it succeeded.
            if (response.ok || response.status === 200 || response.status === 201 || response.type === 'opaque' || response.status === 0) {
                // Success state
                form.reset();
                feedback.style.display = 'block';
                feedback.style.color = 'var(--system-blue, #0070f3)'; // Clean system-blue theme success accent
                feedback.textContent = 'Operational requirements received successfully. Redirecting you...';
                
                // Premium instant-yet-smooth redirect to Thank You page
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1000);
            } else {
                throw new Error('Network response not OK');
            }
        } catch (error) {
            // Error state
            console.error('Submission failed:', error);
            feedback.style.display = 'block';
            feedback.style.color = '#f87171'; // soft red
            feedback.textContent = 'Something interrupted the submission. Please try again in a moment.';
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '';
        }
    });

    // Helper to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}
