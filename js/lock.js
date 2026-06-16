// Block multi-touch pinch magnification zoom scaling gestures
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) { event.preventDefault(); }
}, { passive: false });

// Block rapid touch double-tap magnification vectors
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) { event.preventDefault(); }
  lastTouchEnd = now;
}, { passive: false });

// Block desktop mouse scroll manipulation (Ctrl + Scroll)
document.addEventListener('wheel', function (event) {
  if (event.ctrlKey) { event.preventDefault(); }
}, { passive: false });

// Block keyboard zoom triggers (Ctrl + Plus, Ctrl + Minus, Ctrl + Zero)
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '+' || event.key === '_')) {
    event.preventDefault();
  }
});

// Disable desktop context click selections on graphics or metadata
document.addEventListener('contextmenu', function (event) {
  if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'TEXTAREA') {
    event.preventDefault();
  }
});

// Lock text highlighting shortcuts (Ctrl + A, Ctrl + C) outside inputs
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
