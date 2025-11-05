// Shared theme (dark/light) with persistence + broadcast to other scripts
(function () {
    const btn = document.getElementById('modeToggle');
  
    function apply(mode) {
      document.body.classList.toggle('dark-mode', mode === 'dark');
      document.body.classList.toggle('light-mode', mode === 'light');
      if (btn) btn.textContent = (mode === 'dark') ? 'Light Mode' : 'Dark Mode';
    }
  
    // Initial mode
    let mode = 'dark';
    try {
      mode = (localStorage.getItem('theme') === 'light') ? 'light' : 'dark';
    } catch (e) {}
    apply(mode);
  
    // Toggle button (if present on the page)
    if (btn) {
      btn.addEventListener('click', () => {
        mode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        apply(mode);
        try { localStorage.setItem('theme', mode); } catch (e) {}
        // Let listeners (e.g., map) know the theme changed
        window.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
      });
    }
  })();

  