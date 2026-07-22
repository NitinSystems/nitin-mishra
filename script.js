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
    initCertModal();
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
            const isDev = btn.getAttribute('data-status') === 'in-development';
            const title = btn.getAttribute('data-title') || '';
            const desc = btn.getAttribute('data-desc') || '';

            // Clean any existing in-development wrapper from viewport
            const oldDevWrapper = viewportImg.parentElement.querySelector('.dev-modal-wrapper');
            if (oldDevWrapper) oldDevWrapper.remove();

            if (isDev) {
                const statusText = btn.getAttribute('data-status-text') || 'In Development';
                const roadmapItems = JSON.parse(btn.getAttribute('data-roadmap') || '[]');

                // Inject animation keyframes for pulse if not already present
                if (!document.getElementById('dev-modal-pulse-style')) {
                    const style = document.createElement('style');
                    style.id = 'dev-modal-pulse-style';
                    style.textContent = `
                        @keyframes bp-pulse {
                            0% { transform: scale(0.95); opacity: 0.6; }
                            50% { transform: scale(1.05); opacity: 1; }
                            100% { transform: scale(0.95); opacity: 0.6; }
                        }
                    `;
                    document.head.appendChild(style);
                }

                // Create beautiful custom in-development info wrapper
                const devWrapper = document.createElement('div');
                devWrapper.className = 'dev-modal-wrapper';
                devWrapper.style.cssText = "display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; padding: 40px 24px; text-align: center; background: rgba(4, 6, 18, 0.4); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 12px; margin: 0 auto; max-width: 520px; box-sizing: border-box;";
                
                devWrapper.innerHTML = `
                    <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(59, 130, 246, 0.06); border: 1px solid rgba(59, 130, 246, 0.20); color: #3D82F6; font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);">
                        <span style="width: 6px; height: 6px; background-color: #3D82F6; border-radius: 50%; display: inline-block; animation: bp-pulse 1.5s infinite ease-in-out;"></span>
                        ${statusText}
                    </div>
                    
                    <h2 style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 12px; letter-spacing: -0.01em; line-height: 1.3;">${title}</h2>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #a1a1aa; line-height: 1.5; margin-bottom: 24px;">${desc}</p>
                    
                    <div style="width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent); margin-bottom: 24px;"></div>
                    
                    <div style="width: 100%; text-align: left;">
                        <h4 style="font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;">Planned System Modules</h4>
                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                            ${roadmapItems.map(item => {
                                const parts = item.split(': ');
                                const term = parts[0] || '';
                                const definition = parts.slice(1).join(': ') || '';
                                return `
                                    <li style="display: flex; align-items: flex-start; gap: 10px; font-family: 'Inter', sans-serif; font-size: 12px; color: #e4e4e7; line-height: 1.4;">
                                        <span style="color: #3D82F6; font-weight: 700; margin-top: 1px;">✓</span>
                                        <div>
                                            <strong style="color: #ffffff; font-weight: 600;">${term}</strong>${definition ? ': ' + definition : ''}
                                        </div>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </div>
                `;

                // Set content and adjust view bounds (hide sidebar and borders)
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                thumbnailGrid.parentElement.style.display = 'none';
                viewportImg.parentElement.style.borderRight = 'none';
                viewportImg.style.display = 'none';
                viewportImg.parentElement.appendChild(devWrapper);
            } else {
                // Completed System - standard modal flow
                const assets = JSON.parse(btn.getAttribute('data-assets') || '[]');
                const titles = JSON.parse(btn.getAttribute('data-titles') || '[]');
                const descriptions = JSON.parse(btn.getAttribute('data-descriptions') || '[]');

                if (assets.length === 0) return;

                // Reset standard view structures
                thumbnailGrid.parentElement.style.display = '';
                viewportImg.parentElement.style.borderRight = '';
                viewportImg.style.display = '';

                // Populate title and description
                modalTitle.textContent = title;
                modalDesc.textContent = descriptions[0] || desc;

                // Clear and rebuild thumbnail grid
                thumbnailGrid.innerHTML = '';
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
                        thumbnailGrid.querySelectorAll('.system-thumb-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        thumbItem.classList.add('active');
                        modalDesc.textContent = descriptions[idx] || desc;

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
            }

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
    
    // Configurable Make.com webhook URLs
    const webhookUrl = 'https://hook.eu1.make.com/f94swjs7bo3239k6bszr9e5x7uorhepc';
    const checkEmailUrl = 'https://hook.eu1.make.com/m7rmq58ynkjl9pwic5w8edv4ya39f5dt';
    const DUPLICATE_THRESHOLD_HOURS = 24;

    // Modal elements
    const modal = document.getElementById('inquiryModal');
    const modalLastSubmissionDate = document.getElementById('modalLastSubmissionDate');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const modalEmailBtn = document.getElementById('modalEmailBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');

    // Inputs (Cached)
    const nameInput = document.getElementById('intakeName');
    const emailInput = document.getElementById('intakeEmail');
    const businessTypeInput = document.getElementById('intakeBusinessType');
    const helpInput = document.getElementById('intakeHelp');
    const challengeInput = document.getElementById('intakeChallenge');
    const toolsInput = document.getElementById('intakeTools');

    // Accessibility focus tracking
    let previousActiveElement = null;

    // Submission states
    let currentSubmissionId = null;
    let normalizedEmail = '';
    let originalBtnText = submitBtn.textContent || 'Start The Conversation';

    const closeModal = () => {
        modal.style.display = 'none';
        // Restore main form submit button loading states
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = '';
        
        // Restore focus
        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }
    };

    // Modal action handlers
    modalSubmitBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        submitForm('Resubmitted', 'Matched (<24 Hours)');
    });

    modalEmailBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = 'mailto:NitinMishra.me@outlook.com?subject=Additional%20Information%20-%20Portfolio%20Inquiry';
    });

    modalCancelBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Close on clicking outside container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Duplicate checking function with 3000ms timeout
    const checkDuplicate = async (email) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        try {
            const response = await fetch(`${checkEmailUrl}?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                mode: 'cors',
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error('Check response status not ok');
            }
            const result = await response.json();
            if (typeof result.exists !== 'boolean') {
                throw new Error('Invalid duplicate response');
            }
            return result;
        } catch (error) {
            clearTimeout(timeoutId);
            console.warn('Duplicate check failed, failing open:', error);
            return { exists: false, failedOpen: true };
        }
    };

    // Inner form submission runner
    async function submitForm(decision, checkSource) {
        const payload = {
            name: nameInput.value.trim(),
            email: normalizedEmail,
            business_type: businessTypeInput.value.trim(),
            service_type: helpInput.value,
            operational_challenge: challengeInput.value.trim(),
            current_tools: toolsInput.value.trim() || 'None Specified',
            submission_id: currentSubmissionId,
            duplicate_decision: decision,
            duplicate_check_source: checkSource,
            browser_information: navigator.userAgent,
            submission_timestamp: new Date().toISOString(),
            source_page: window.location.pathname || 'index.html'
        };

        // Save service_type for thank-you page CTA logic
        try { sessionStorage.setItem('submitted_service_type', payload.service_type); } catch(e) {}

        // Convert payload to URLSearchParams to bypass CORS preflight
        const urlEncodedPayload = new URLSearchParams();
        Object.keys(payload).forEach(key => urlEncodedPayload.append(key, payload[key]));

        try {
            // Fire request asynchronously with keepalive
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedPayload.toString(),
                keepalive: true
            }).catch(err => {
                console.warn('Background transmission failed:', err);
            });

            // Success UI state
            form.reset();
            feedback.style.display = 'block';
            feedback.style.color = 'var(--system-blue, #0070f3)';
            feedback.textContent = 'Thanks! Redirecting you...';
            
            // Redirect after 400ms
            setTimeout(() => {
                window.location.href = 'thank-you';
            }, 400);
        } catch (error) {
            console.error('Submission failed:', error);
            feedback.style.display = 'block';
            feedback.style.color = '#f87171'; // soft red
            feedback.textContent = 'Something interrupted the submission. Please try again in a moment.';
            
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '';
        }
    }

    // Form submit intercept
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous feedback
        feedback.style.display = 'none';
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        // Validation helper
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
            feedback.style.color = '#f87171'; // soft red
            feedback.textContent = 'Please fill out all required fields with a valid email format.';
            return;
        }

        // Email Normalization (Required)
        const rawEmail = emailInput.value.trim();
        normalizedEmail = rawEmail.toLowerCase();

        // Lock form during duplicate checking
        submitBtn.disabled = true;
        originalBtnText = submitBtn.textContent || 'Start The Conversation';
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.7';

        // Generate dynamic Submission ID (SUB-XXXXXXXX-XXXXXX)
        const generateSubmissionId = () => {
            const randomHex = Math.random().toString(36).substr(2, 8).toUpperCase();
            const timestamp = Date.now().toString().slice(-6);
            return `SUB-${randomHex}-${timestamp}`;
        };
        currentSubmissionId = generateSubmissionId();

        // Run duplicate check
        const checkResult = await checkDuplicate(normalizedEmail);

        if (checkResult.failedOpen) {
            // Webhook failure: fail open, submit normally
            await submitForm('Bypassed (Webhook Failure)', 'Webhook Failure');
        } else if (!checkResult.exists) {
            // New email: submit normally
            await submitForm('New Inquiry', 'New Email');
        } else {
            // Duplicate exists, check the 24-hour window
            const rawDate = checkResult.lastSubmissionDate || checkResult.last_submission_date;
            let lastDate = null;
            let isValidDate = false;

            if (rawDate) {
                const parsedDate = new Date(rawDate);
                if (!isNaN(parsedDate)) {
                    lastDate = parsedDate;
                    isValidDate = true;
                }
            }

            const now = new Date();
            const diffHours = isValidDate ? (now - lastDate) / (1000 * 60 * 60) : 0;

            if (!isValidDate || diffHours <= DUPLICATE_THRESHOLD_HOURS) {
                // Duplicate inquiry within 24 hours (or invalid date): show modal
                modalLastSubmissionDate.textContent = isValidDate ? lastDate.toLocaleString() : 'N/A';
                modal.style.display = 'flex';
                
                // Track focus
                previousActiveElement = document.activeElement;
                modalCancelBtn.focus();
            } else {
                // Duplicate inquiry older than 24 hours: bypass modal, submit normally
                await submitForm('Bypassed (>24 Hours)', 'Matched (>24 Hours)');
            }
        }
    });

    // Helper to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

/**
 * Credibility Certification Fullscreen Modal Viewer
 * Handles dynamic modal creation, keybind binds, and click-away triggers
 */
function initCertModal() {
    const previews = document.querySelectorAll('.cert-card-mini .cert-preview');
    if (previews.length === 0) return;

    // Create the modal container dynamically
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.id = 'certModal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="cert-modal-content">
            <button class="cert-modal-close" id="certModalClose" aria-label="Close Certificate">[ Close ]</button>
            <img class="cert-modal-img" id="certModalImg" src="" alt="Fullscreen Certificate">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('#certModalImg');
    const closeBtn = modal.querySelector('#certModalClose');

    const openModal = (imgSrc, imgAlt) => {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // prevent page scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // restore scrolling
    };

    previews.forEach(preview => {
        preview.addEventListener('click', () => {
            const img = preview.querySelector('img');
            if (img) {
                openModal(img.src, img.alt || 'Certificate View');
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if click is outside the image
        if (e.target === modal || e.target.classList.contains('cert-modal-content')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

