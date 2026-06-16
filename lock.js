// 1. HARD ANTI-ZOOM UTILITIES
// Blocks mobile pinch-to-zoom gestures
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Blocks mobile double-tap to zoom behavior completely
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Blocks desktop wheel zoom (Ctrl + Mouse Scroll)
document.addEventListener('wheel', function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });

// Blocks desktop keyboard zoom shortcuts (Ctrl +/-/=)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '+' || event.key === '_')) {
    event.preventDefault();
  }
});

// 2. HARD SELECTION & COPY BLOCKS
// Blocks right-click context menu (prevents "Inspect Element" or "Copy Image")
document.addEventListener('contextmenu', function (event) {
  // Allow inputs/selects to have standard right-click functionality
  if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'TEXTAREA') {
    event.preventDefault();
  }
});

// Blocks keyboard copy shortcuts (Ctrl+C, Ctrl+A) outside form fields
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey || event.metaKey) {
    const activeTag = document.activeElement.tagName;
    if (activeTag !== 'INPUT' && activeTag !== 'SELECT' && activeTag !== 'TEXTAREA') {
      if (event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
      }
    }
  }
});
