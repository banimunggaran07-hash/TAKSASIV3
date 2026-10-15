// Progressive Web App (PWA) & iOS Installation Support
(function() {
  if (typeof window === 'undefined') return;

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('PWA ServiceWorker registered successfully:', reg.scope);
      }).catch(function(err) {
        console.warn('PWA ServiceWorker registration failed:', err);
      });
    });
  }

  // 2. Check if already installed / standalone
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                     window.navigator.standalone === true ||
                     document.referrer.includes('android-app://');

  if (isStandalone) {
    console.log('App is running in standalone mode (installed).');
    return;
  }

  // 3. Device detection
  var ua = window.navigator.userAgent.toLowerCase();
  var isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = isIOS && /safari/.test(ua) && !/crios|fxios|opios/.test(ua);

  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallTrigger(false);
  });

  window.addEventListener('appinstalled', function() {
    deferredPrompt = null;
    removeInstallTrigger();
    console.log('App successfully installed.');
  });

  function removeInstallTrigger() {
    var existing = document.getElementById('pwa-install-trigger');
    if (existing) existing.remove();
  }

  function showInstallTrigger(forceIOS) {
    if (document.getElementById('pwa-install-trigger')) return;

    var btn = document.createElement('div');
    btn.id = 'pwa-install-trigger';
    btn.innerHTML = `
      <button type="button" id="pwa-install-btn" class="pwa-floating-btn" aria-label="Install Aplikasi Smart Taksasi">
        <div class="pwa-icon-glow">
          <svg class="pwa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <div class="pwa-btn-text">
          <span class="pwa-btn-title">Install di ${isIOS ? 'iPhone / iOS' : 'Smartphone'}</span>
          <span class="pwa-btn-sub">Bisa offline & tanpa browser</span>
        </div>
        <span class="pwa-close-x" id="pwa-btn-dismiss" title="Tutup">&times;</span>
      </button>
    `;

    document.body.appendChild(btn);

    var installBtn = document.getElementById('pwa-install-btn');
    var dismissBtn = document.getElementById('pwa-btn-dismiss');

    if (dismissBtn) {
      dismissBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeInstallTrigger();
        sessionStorage.setItem('pwa_prompt_dismissed', 'true');
      });
    }

    if (installBtn) {
      installBtn.addEventListener('click', function() {
        if (isIOS) {
          openIOSGuideModal();
        } else if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function(choice) {
            if (choice.outcome === 'accepted') {
              removeInstallTrigger();
            }
            deferredPrompt = null;
          });
        } else {
          openGeneralGuideModal();
        }
      });
    }
  }

  function openIOSGuideModal() {
    var existingModal = document.getElementById('pwa-ios-modal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'pwa-ios-modal';
    modal.className = 'pwa-modal-backdrop';
    modal.innerHTML = `
      <div class="pwa-modal-card">
        <div class="pwa-modal-header">
          <div class="pwa-app-badge">
            <img src="/apple-touch-icon.png" alt="Smart Taksasi" class="pwa-app-icon" />
            <div>
              <h3 class="pwa-modal-title">Smart Taksasi V2.1.3</h3>
              <p class="pwa-modal-sub">Panduan Install di Apple iOS (iPhone & iPad)</p>
            </div>
          </div>
          <button type="button" class="pwa-modal-close" id="pwa-modal-close-btn">&times;</button>
        </div>

        <div class="pwa-steps">
          <div class="pwa-step-item">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Buka di Safari & Klik Tombol <strong>Share</strong></p>
              <p class="pwa-step-desc">
                Pastikan membuka link di browser <strong>Safari</strong> bawaan iOS. Ketuk ikon <strong>Share</strong> 
                <span class="pwa-inline-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </span> 
                di bilah navigasi bawah (atau atas pada iPad).
              </p>
            </div>
          </div>

          <div class="pwa-step-item">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Pilih <strong>"Tambah ke Layar Utama"</strong></p>
              <p class="pwa-step-desc">
                Gulir ke bawah pada menu pop-up, lalu ketuk opsi <strong>"Tambah ke Layar Utama"</strong> (atau <em>Add to Home Screen</em> 
                <span class="pwa-inline-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </span>).
              </p>
            </div>
          </div>

          <div class="pwa-step-item">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Ketuk <strong>"Tambah"</strong> di Kanan Atas</p>
              <p class="pwa-step-desc">
                Konfirmasi nama aplikasi, lalu ketuk <strong>Tambah (Add)</strong>. Ikon Smart Taksasi akan langsung terpasang di Homescreen iOS Anda seperti aplikasi App Store!
              </p>
            </div>
          </div>
        </div>

        <div class="pwa-ios-benefits">
          <div class="pwa-benefit-item">
            <span class="pwa-benefit-dot"></span> Tampilan layar penuh tanpa navbar browser
          </div>
          <div class="pwa-benefit-item">
            <span class="pwa-benefit-dot"></span> Buka instan langsung dari Homescreen
          </div>
          <div class="pwa-benefit-item">
            <span class="pwa-benefit-dot"></span> Terkoneksi otomatis ke Google Cloud SQL
          </div>
        </div>

        <button type="button" class="pwa-done-btn" id="pwa-done-btn">Mengerti, Saya Siap Install</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('pwa-modal-close-btn').addEventListener('click', function() {
      modal.remove();
    });
    document.getElementById('pwa-done-btn').addEventListener('click', function() {
      modal.remove();
    });
        var apkLink = modal.querySelector('a[href*="SmartTaksasi.apk"]');
    if (apkLink) {
      apkLink.addEventListener('click', function(e) {
        e.preventDefault();
        var orig = apkLink.innerHTML;
        apkLink.innerHTML = '<span>Mengunduh berkas APK...</span>';
        fetch('/SmartTaksasi.apk')
          .then(function(r) { return r.blob(); })
          .then(function(b) {
            var u = URL.createObjectURL(b);
            var a = document.createElement('a');
            a.href = u;
            a.download = 'SmartTaksasi-v2.1.3.apk';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function() { URL.revokeObjectURL(u); }, 10000);
            apkLink.innerHTML = '<span>Selesai Tersimpan!</span>';
            setTimeout(function() { apkLink.innerHTML = orig; }, 2500);
          })
          .catch(function() {
            window.location.href = '/SmartTaksasi.apk';
          });
      });
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.remove();
    });
  }

  function openGeneralGuideModal() {
    var existingModal = document.getElementById('pwa-ios-modal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'pwa-ios-modal';
    modal.className = 'pwa-modal-backdrop';
    modal.innerHTML = `
      <div class="pwa-modal-card">
        <div class="pwa-modal-header">
          <div class="pwa-app-badge">
            <img src="/apple-touch-icon.png" alt="Smart Taksasi" class="pwa-app-icon" />
            <div>
              <h3 class="pwa-modal-title">Smart Taksasi V2.1.3</h3>
              <p class="pwa-modal-sub">Instalasi Aplikasi di Smartphone / Laptop</p>
            </div>
          </div>
          <button type="button" class="pwa-modal-close" id="pwa-modal-close-btn">&times;</button>
        </div>

        <div style="margin-bottom: 16px;">
          <a href="/SmartTaksasi.apk" download="SmartTaksasi-v2.1.3.apk" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 16px; border-radius: 12px; background: linear-gradient(135deg, #06b6d4, #10b981); color: #070b14; font-weight: bold; text-decoration: none; font-size: 14px; box-shadow: 0 4px 15px rgba(6,182,212,0.3); box-sizing: border-box; text-align: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Unduh File APK Android Langsung (.apk)
          </a>
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 6px;">Ukuran 830 KB &bull; Kompatibel semua perangkat Android</p>
        </div>

        <div class="pwa-steps">
          <div class="pwa-step-item">
            <div class="pwa-step-num">&#9679;</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Cara 1: Unduh APK Langsung (Direkomendasikan)</p>
              <p class="pwa-step-desc">Klik tombol hijau di atas untuk mengunduh <strong>SmartTaksasi-v2.1.3.apk</strong>. Buka file hasil unduhan lalu pilih "Install". Aplikasi langsung terpasang mandiri di HP Anda.</p>
            </div>
          </div>
          <div class="pwa-step-item">
            <div class="pwa-step-num">&#9679;</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Cara 2: Pasang via Google Chrome (PWA)</p>
              <p class="pwa-step-desc">Buka link ini di browser <strong>Google Chrome</strong> (bukan browser in-app WhatsApp), ketuk menu titik tiga (&#8942;) di kanan atas &rarr; pilih <strong>"Instal aplikasi"</strong> atau <strong>"Tambahkan ke layar utama"</strong>.</p>
            </div>
          </div>
          <div class="pwa-step-item">
            <div class="pwa-step-num">&#9679;</div>
            <div class="pwa-step-content">
              <p class="pwa-step-title">Solusi jika muncul "Aplikasi tidak dapat dibuka"</p>
              <p class="pwa-step-desc">Hal ini terjadi bila tautan dibuka di browser internal media sosial atau cache browser terblokir. Gunakan <strong>Cara 1 (Unduh APK Langsung)</strong> untuk membuka aplikasi tanpa kendala.</p>
            </div>
          </div>
        </div>

        <button type="button" class="pwa-done-btn" id="pwa-done-btn">Mengerti, Tutup Panduan</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('pwa-modal-close-btn').addEventListener('click', function() {
      modal.remove();
    });
    document.getElementById('pwa-done-btn').addEventListener('click', function() {
      modal.remove();
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.remove();
    });
  }

  // Trigger button display
  if (!sessionStorage.getItem('pwa_prompt_dismissed')) {
    // Show trigger for iOS or when beforeinstallprompt fires
    if (isIOS) {
      setTimeout(function() {
        showInstallTrigger(true);
      }, 1000);
    } else {
      setTimeout(function() {
        showInstallTrigger(false);
      }, 2000);
    }
  }

  // Expose global helper so any button in Settings / Header can trigger it anytime
  window.openPWAInstallGuide = function() {
    if (isIOS) {
      openIOSGuideModal();
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
    } else {
      openGeneralGuideModal();
    }
  };
})();
