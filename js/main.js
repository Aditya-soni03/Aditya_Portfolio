/**
 * ADITYA SONI - PORTFOLIO INTERACTIVITY & LOGIC
 * High-performance UI interactions, theme toggle, animations & data triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDataGridCanvas();
  initTypewriter();
  initScrollSpy();
  initCounters();
  initProjectFilters();
  initChartControls();
  initCodeViewer();
  initContactForm();
  initResumeModal();
  initMobileNavigation();
  initMobileCustomizer();
  initQrModal();
  initMobileAutoDetect();
});

/* ==========================================
   1. Theme Management (Dark / Light)
   ========================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('as_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateMobileThemeColor(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('as_theme', nextTheme);
      updateMobileThemeColor(nextTheme);

      // Re-render charts with updated theme palette
      if (typeof updateAllChartsTheme === 'function') {
        updateAllChartsTheme();
      }

      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

function updateMobileThemeColor(theme) {
  const themeMeta = document.getElementById('themeColorMeta');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#0a0f1d' : '#f8fafc');
  }
}

/* ==========================================
   2. Background Animated Data Grid Canvas
   ========================================== */
function initDataGridCanvas() {
  const canvas = document.getElementById('data-grid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const totalNodes = Math.min(45, Math.floor(width / 35));

  for (let i = 0; i < totalNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nodeColor = isLight ? 'rgba(59, 130, 246, 0.4)' : 'rgba(56, 189, 248, 0.4)';
    const lineColor = isLight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.12)';

    // Draw connecting edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - dist / 130;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw node vertices
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================
   3. Typewriter Effect
   ========================================== */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const roles = [
    "Data Analyst",
    "Business Intelligence Specialist",
    "Python & SQL Developer",
    "Statistical Problem Solver",
    "Dashboard Architect"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 60;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 120;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400; // Pause before typing new word
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================
   4. Scroll Spy & Sticky Header (Desktop & Mobile)
   ========================================== */
function initScrollSpy() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        // Desktop nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        // Mobile bottom dock items
        dockItems.forEach(item => {
          item.classList.remove('active');
          const targetSection = item.getAttribute('data-section');
          if (targetSection === id || (id === 'about' && targetSection === 'hero')) {
            item.classList.add('active');
          }
        });

        // Mobile drawer links
        drawerLinks.forEach(dlink => {
          dlink.classList.remove('active');
          if (dlink.getAttribute('href') === `#${id}`) {
            dlink.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================
   5. Dynamic Count-Up Numbers
   ========================================== */
function initCounters() {
  const countElements = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        countElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-counter'));
          const duration = 1600;
          const isDecimal = target % 1 !== 0;
          let startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * target;

            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(animateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================
   6. Project Category Filtering
   ========================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('[data-project-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-project-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   7. Chart View Toggle Controls
   ========================================== */
function initChartControls() {
  // Loan Risk Chart View Buttons
  const loanBtns = document.querySelectorAll('[data-loan-view]');
  loanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loanBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-loan-view');
      if (typeof initLoanRiskChart === 'function') {
        initLoanRiskChart(view);
      }
    });
  });

  // Accident Chart View Buttons
  const accBtns = document.querySelectorAll('[data-accident-view]');
  accBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      accBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-accident-view');
      if (typeof initAccidentChart === 'function') {
        initAccidentChart(view);
      }
    });
  });

  // BI Dashboard Quarter Dropdown
  const biSelect = document.getElementById('biQuarterSelect');
  if (biSelect) {
    biSelect.addEventListener('change', (e) => {
      if (typeof initBIDashboardCharts === 'function') {
        initBIDashboardCharts(e.target.value);
      }
    });
  }
}

/* ==========================================
   8. Code Showcase Tabs & Copy Action
   ========================================== */
function initCodeViewer() {
  const codeBtns = document.querySelectorAll('.code-tab-btn');
  const codeBody = document.getElementById('codeDisplayBody');
  const codeDesc = document.getElementById('codeDescText');
  const copyBtn = document.getElementById('copyCodeBtn');

  const descriptions = {
    sql: "Production MySQL CTE query aggregating borrower credit scores, calculating DTI, and computing default rates partitioned by loan purpose.",
    python: "Python data cleaning pipeline utilizing Pandas & NumPy with median/mode imputation and Interquartile Range (IQR) outlier clipping.",
    dax: "Power BI DAX measures for calculating real-time Loan Default %, Year-over-Year (YoY) volume trends, and risk index exposure."
  };

  codeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const lang = btn.getAttribute('data-code-lang');
      if (portfolioData && portfolioData.codeSnippets[lang]) {
        if (codeBody) {
          codeBody.textContent = portfolioData.codeSnippets[lang];
        }
        if (codeDesc) {
          codeDesc.textContent = descriptions[lang] || '';
        }
      }
    });
  });

  // Initial code load
  if (codeBody && portfolioData && portfolioData.codeSnippets.sql) {
    codeBody.textContent = portfolioData.codeSnippets.sql;
  }

  // Copy code to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = codeBody ? codeBody.textContent : '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Code copied to clipboard!");
      }).catch(() => {
        showToast("Failed to copy code", true);
      });
    });
  }
}

/* ==========================================
   9. Contact Form & Quick Copy Actions
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields", true);
        return;
      }

      // Generate mailto link as direct action
      const mailtoLink = `mailto:adityasoni852452@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject || 'Data Analyst Opportunity'} from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoLink;
      showToast("Preparing your email client to connect with Aditya!");
      form.reset();
    });
  }

  // Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText("adityasoni852452@gmail.com").then(() => {
        showToast("Email address copied: adityasoni852452@gmail.com");
      });
    });
  }

  // Copy Phone Button
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText("+919522593749").then(() => {
        showToast("Phone number copied: +91 9522593749");
      });
    });
  }
}

/* ==========================================
   10. Resume Preview Modal
   ========================================== */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('viewResumeBtn');
  const closeBtn = document.getElementById('closeResumeModalBtn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================
   11. Toast Notification System
   ========================================== */
function showToast(message, isError = false) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="${isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}" style="color: ${isError ? '#ef4444' : '#10b981'};"></i>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================
   12. Mobile Off-Canvas Drawer & Gesture System
   ========================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawerNav');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const dockItems = document.querySelectorAll('.dock-item');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Mobile Touch Swipe-to-Close gesture on drawer
  let touchStartX = 0;
  let touchEndX = 0;

  if (drawer) {
    drawer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    drawer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      // If swiped right by more than 50px, close drawer
      if (touchEndX - touchStartX > 50) {
        closeDrawer();
      }
    }, { passive: true });
  }

  // Mobile Bottom Dock Smooth Navigation
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(di => di.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ==========================================
   13. Interactive Mobile Customizer & View Controls
   ========================================== */
function triggerMobileHaptic(duration = 15) {
  const isEnabled = localStorage.getItem('as_haptics') !== 'false';
  if (isEnabled && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {}
  }
}

function initMobileCustomizer() {
  const modal = document.getElementById('mobileCustomizerModal');
  const triggerBtns = [
    document.getElementById('mobileCustomizeTriggerBtn'),
    document.getElementById('dockCustomizeBtn'),
    document.getElementById('openMobilePreviewBtn')
  ];
  const closeBtn = document.getElementById('closeCustomizerModalBtn');
  const resetBtn = document.getElementById('resetCustomizerBtn');
  const modalShareBtn = document.getElementById('modalShareBtn');
  const fabShareBtn = document.getElementById('mobileShareBtn');

  // Load Saved Preferences
  const savedFont = localStorage.getItem('as_font_scale') || 'medium';
  const savedDensity = localStorage.getItem('as_density') || 'standard';
  const savedTheme = localStorage.getItem('as_theme') || 'dark';
  const savedHaptics = localStorage.getItem('as_haptics') !== 'false';

  document.documentElement.setAttribute('data-font-scale', savedFont);
  document.body.setAttribute('data-density', savedDensity);

  // Sync active states on load
  document.querySelectorAll('[data-font-scale]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-font-scale') === savedFont);
  });
  document.querySelectorAll('[data-density-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-density-mode') === savedDensity);
  });
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === savedTheme);
  });
  const hapticToggle = document.getElementById('hapticToggleCheck');
  if (hapticToggle) hapticToggle.checked = savedHaptics;

  // Open & Close
  function openCustomizer() {
    triggerMobileHaptic(20);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCustomizer() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  triggerBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCustomizer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCustomizer);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCustomizer();
    });
  }

  // 1. Font Scale Buttons
  document.querySelectorAll('[data-font-scale]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const scale = btn.getAttribute('data-font-scale');
      document.documentElement.setAttribute('data-font-scale', scale);
      localStorage.setItem('as_font_scale', scale);
      document.querySelectorAll('[data-font-scale]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Font scaled to: ${btn.querySelector('span').textContent}`);
    });
  });

  // 2. Card Density Mode Buttons
  document.querySelectorAll('[data-density-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const mode = btn.getAttribute('data-density-mode');
      document.body.setAttribute('data-density', mode);
      localStorage.setItem('as_density', mode);
      document.querySelectorAll('[data-density-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(mode === 'compact' ? "⚡ Switched to Fast Executive Summary" : "📊 Switched to Full Visuals");
    });
  });

  // 3. Theme Choice Buttons
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const choice = btn.getAttribute('data-theme-choice');
      document.documentElement.setAttribute('data-theme', choice);
      localStorage.setItem('as_theme', choice);
      updateMobileThemeColor(choice);
      document.querySelectorAll('[data-theme-choice]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof updateAllChartsTheme === 'function') {
        updateAllChartsTheme();
      }
      showToast(`Theme updated: ${btn.querySelector('span').textContent}`);
    });
  });

  // 4. Haptic Toggle Checkbox
  if (hapticToggle) {
    hapticToggle.addEventListener('change', () => {
      localStorage.setItem('as_haptics', hapticToggle.checked);
      if (hapticToggle.checked) triggerMobileHaptic(30);
      showToast(hapticToggle.checked ? "Haptic vibration enabled" : "Haptic vibration disabled");
    });
  }

  // 5. Native Share Implementation
  function handleNativeShare() {
    triggerMobileHaptic(20);
    const shareData = {
      title: "Aditya Soni - Data Analyst Portfolio",
      text: "Explore Aditya Soni's Data Analyst & BI Portfolio with interactive dashboards & case studies!",
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        showToast("Portfolio link copied to clipboard!");
      });
    }
  }

  if (modalShareBtn) modalShareBtn.addEventListener('click', handleNativeShare);
  if (fabShareBtn) fabShareBtn.addEventListener('click', handleNativeShare);

  // 6. Reset Settings
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      triggerMobileHaptic(25);
      document.documentElement.setAttribute('data-font-scale', 'medium');
      document.body.setAttribute('data-density', 'standard');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.removeItem('as_font_scale');
      localStorage.removeItem('as_density');
      localStorage.removeItem('as_theme');
      localStorage.removeItem('as_haptics');
      if (hapticToggle) hapticToggle.checked = true;

      document.querySelectorAll('[data-font-scale]').forEach(b => b.classList.toggle('active', b.getAttribute('data-font-scale') === 'medium'));
      document.querySelectorAll('[data-density-mode]').forEach(b => b.classList.toggle('active', b.getAttribute('data-density-mode') === 'standard'));
      document.querySelectorAll('[data-theme-choice]').forEach(b => b.classList.toggle('active', b.getAttribute('data-theme-choice') === 'dark'));

      if (typeof updateAllChartsTheme === 'function') updateAllChartsTheme();
      showToast("Reset to default mobile settings");
    });
  }
}

/* ==========================================
   14. Desktop to Smartphone QR Code Modal
   ========================================== */
function initQrModal() {
  const modal = document.getElementById('qrModal');
  const openBtn = document.getElementById('openMobileModalBtn');
  const closeBtn = document.getElementById('closeQrModalBtn');
  const copyBtn = document.getElementById('copySiteUrlBtn');
  const qrImage = document.getElementById('qrCodeImage');

  if (qrImage) {
    const currentUrl = encodeURIComponent(window.location.href.split('#')[0]);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currentUrl}`;
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeQr() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeQr);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQr();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Mobile link copied to clipboard!");
      });
    });
  }
}

/* ==========================================
   15. Automatic Mobile Detection & Touch Gestures
   ========================================== */
function initMobileAutoDetect() {
  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.documentElement.classList.add('mobile-detected');
    
    // Show Welcome Pill if not dismissed in session
    const pill = document.getElementById('mobileWelcomePill');
    const isDismissed = sessionStorage.getItem('as_mobile_pill_dismissed');
    if (pill && !isDismissed) {
      pill.style.display = 'flex';
      setTimeout(() => pill.classList.add('visible'), 250);
    }
  }

  // Dismiss action
  const dismissBtn = document.getElementById('dismissMobilePill');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      const pill = document.getElementById('mobileWelcomePill');
      if (pill) {
        pill.classList.remove('visible');
        setTimeout(() => { pill.style.display = 'none'; }, 350);
        sessionStorage.setItem('as_mobile_pill_dismissed', 'true');
      }
    });
  }

  // Mobile Chart Touch Swipe Gestures
  setupSwipeableChart('loanRiskChart', ['creditScore', 'purpose', 'income'], (nextView) => {
    const loanBtns = document.querySelectorAll('[data-loan-view]');
    loanBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-loan-view') === nextView));
    if (typeof initLoanRiskChart === 'function') {
      initLoanRiskChart(nextView);
      triggerMobileHaptic(15);
      showToast(`Swiped view: ${nextView}`);
    }
  });

  setupSwipeableChart('accidentChart', ['hourly', 'weather'], (nextView) => {
    const accBtns = document.querySelectorAll('[data-accident-view]');
    accBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-accident-view') === nextView));
    if (typeof initAccidentChart === 'function') {
      initAccidentChart(nextView);
      triggerMobileHaptic(15);
      showToast(`Swiped view: ${nextView}`);
    }
  });
}

function setupSwipeableChart(canvasId, views, callback) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let startX = 0;
  let currentIdx = 0;

  canvas.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;

    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        currentIdx = (currentIdx + 1) % views.length;
      } else {
        currentIdx = (currentIdx - 1 + views.length) % views.length;
      }
      callback(views[currentIdx]);
    }
  }, { passive: true });
}
