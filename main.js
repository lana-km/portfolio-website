// Main JavaScript file - imports all modules
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './scroll.js';
import { initScrollAnimations } from './animations.js';
import { initContactForm } from './contact.js';
import { initVisualEffects } from './effects.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully!');

    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initVisualEffects();
});