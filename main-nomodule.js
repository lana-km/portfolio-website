// Main JavaScript file (no-module version)
// This exists so the site also works when opening index.html via file:// (double click)

document.addEventListener('DOMContentLoaded', function () {
  console.log('Website loaded successfully!');

  // Initialize all modules (now attached to window)
  window.initNavigation?.();
  window.initSmoothScroll?.();
  window.initScrollAnimations?.();
  window.initContactForm?.();
  window.initVisualEffects?.();
});
