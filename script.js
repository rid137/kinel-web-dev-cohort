/*
  ============================================================
  ALEX DEV PORTFOLIO — script.js

  WEEK 6 — JavaScript Fundamentals: Variables & Functions
  WEEK 7 — DOM Manipulation, Events & Interactive Elements

  TABLE OF CONTENTS:
  1.  WEEK 6 — Selecting elements (DOM entry points)
  2.  WEEK 6 — The current year (Date object, variables)
  3.  WEEK 6 — A greeting function
  4.  WEEK 7 — Dark mode toggle (classList.toggle)
  5.  WEEK 7 — Mobile navigation toggle
  6.  WEEK 7 — Contact form submission handler
  7.  WEEK 7 — Card entrance animations
  ============================================================
*/


/* ============================================================
   1. SELECTING ELEMENTS FROM THE PAGE (DOM)
   ============================================================
   WEEK 7 — DOM Manipulation

   The DOM (Document Object Model) is JavaScript's view of the HTML.
   Think of it as a tree: every element is a node on the tree.

   document.querySelector(selector)
     → Returns the FIRST element that matches the CSS selector.
     → If nothing is found, it returns null (no crash).
     → Uses the same syntax as CSS selectors.

   Examples:
     document.querySelector('#id')      → element with id="id"
     document.querySelector('.class')   → first element with class="class"
     document.querySelector('button')   → first button on the page

   We use const because we select these ONCE and don't reassign them.
   ============================================================ */

// --- DARK MODE ---
// querySelector('#darkToggle') looks for: <button id="darkToggle">
const darkToggleBtn = document.querySelector('#darkToggle');

// --- MOBILE MENU ---
const menuToggleBtn = document.querySelector('#menuToggle');  // The ☰ button
const mainNav       = document.querySelector('#mainNav');      // The <nav> element

// --- FOOTER YEAR ---
// This span will display the current year: <span id="currentYear"></span>
const yearSpan = document.querySelector('#currentYear');

// --- CONTACT FORM ---
// These only exist on contact.html — they'll be null on other pages.
// That's fine! We check for null before using them.
const contactForm   = document.querySelector('#contactForm');
const formFeedback  = document.querySelector('#formFeedback');


/* ============================================================
   2. THE CURRENT YEAR — Dynamic Footer
   ============================================================
   WEEK 6 — Variables, the Date object, and DOM updates

   new Date()              → Creates a Date object for RIGHT NOW
   .getFullYear()          → Extracts just the 4-digit year (e.g. 2025)

   element.textContent = value
     → Sets the TEXT inside an element.
     → Safer than innerHTML because it doesn't interpret HTML tags.
     → Good for injecting plain text values.

   WHY DO THIS IN JS instead of just typing the year in HTML?
   If you typed "2025" directly in HTML, you'd need to update it
   every year manually. This way, it updates itself automatically.
   ============================================================ */

// WEEK 6: const declares a variable that won't be reassigned.
const currentYear = new Date().getFullYear(); // e.g. 2025

// Only update if the element exists on this page
if (yearSpan) {
  yearSpan.textContent = currentYear;   // Writes "2025" into the <span>
}


/* ============================================================
   3. A GREETING FUNCTION — Week 6 Review
   ============================================================
   WEEK 6 — Functions

   A function is a reusable block of code.
   You DEFINE it once, then CALL it whenever you need it.

   function name(parameters) { body; return value; }

   This function figures out if it's morning, afternoon, or evening
   and returns the right greeting. It's called at the bottom of the file.
   ============================================================ */

// WEEK 6: function declaration with one parameter (name)
function getGreeting(name) {
  // WEEK 6: new Date().getHours() returns the hour (0–23)
  const hour = new Date().getHours();

  // WEEK 6: let (not const) because greeting will be reassigned below
  let greeting;

  // WEEK 6: if / else if / else — conditional logic
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';    // 5:00am – 11:59am
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';  // 12:00pm – 4:59pm
  } else {
    greeting = 'Good evening';    // 5:00pm – 4:59am
  }

  // WEEK 6: Template literals use backticks and ${} for variables
  return `${greeting}, ${name}!`;
}

// Call the function and log to the browser console (F12 → Console tab)
// Students can see this output while learning.
console.log(getGreeting('Alex'));


/* ============================================================
   4. DARK MODE TOGGLE
   ============================================================
   WEEK 7 — Events & DOM Manipulation

   addEventListener(event, callback)
     → Listens for an event on an element.
     → When the event fires, it runs the callback function.
     → Common events: 'click', 'submit', 'input', 'keydown'

   classList.toggle('class-name')
     → If the class IS on the element: REMOVES it.
     → If the class is NOT on the element: ADDS it.
     → Perfect for on/off states like dark mode.

   classList.contains('class-name')
     → Returns true if the element has that class.
     → Returns false if it doesn't.
   ============================================================ */

if (darkToggleBtn) {

  // WEEK 7: 'click' fires when the button is clicked
  darkToggleBtn.addEventListener('click', function() {

    // WEEK 7: Toggle 'dark-mode' class on <body>
    // This activates all the CSS rules inside: body.dark-mode { ... }
    document.body.classList.toggle('dark-mode');

    // WEEK 7: Check if dark mode is NOW active, and update the button text
    const isDarkMode = document.body.classList.contains('dark-mode');

    // WEEK 6: Ternary operator — a short if/else on one line:
    // condition ? value_if_true : value_if_false
    darkToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

    // WEEK 6: Save user's preference to localStorage
    // localStorage persists between page refreshes.
    localStorage.setItem('darkMode', isDarkMode);
  });

  // On page load: restore the saved preference
  const savedPreference = localStorage.getItem('darkMode');

  // WEEK 6: "=== 'true'" because localStorage stores strings, not booleans
  if (savedPreference === 'true') {
    document.body.classList.add('dark-mode');
    darkToggleBtn.textContent = '☀️ Light Mode';
  }
}


/* ============================================================
   5. MOBILE NAVIGATION TOGGLE
   ============================================================
   WEEK 7 — DOM Manipulation & Events

   On mobile screens, the navigation is hidden (display: none in CSS).
   The ☰ hamburger button adds/removes the class "open" to the nav.
   CSS then shows the nav when it has the "open" class.

   CSS rules (in style.css):
     .main-nav        { display: none; }   ← hidden by default on mobile
     .main-nav.open   { display: block; }  ← shown when .open class is added
   ============================================================ */

if (menuToggleBtn && mainNav) {

  menuToggleBtn.addEventListener('click', function() {
    // WEEK 7: Toggle 'open' class on the nav element
    mainNav.classList.toggle('open');

    // Update the button symbol for the open/closed state
    const isOpen = mainNav.classList.contains('open');
    menuToggleBtn.textContent = isOpen ? '✕' : '☰';

    // Accessibility: aria-expanded tells screen readers if the menu is open
    menuToggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // WEEK 7: Close the mobile menu when any nav LINK is clicked
  // querySelectorAll returns ALL matching elements as a NodeList
  const navLinks = mainNav.querySelectorAll('a');

  // WEEK 6: forEach loops over every item in the list
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mainNav.classList.remove('open');
      menuToggleBtn.textContent = '☰';
    });
  });
}


/* ============================================================
   6. CONTACT FORM — Prevent Default & Show Feedback
   ============================================================
   WEEK 7 — Events: The 'submit' event and event.preventDefault()

   Normally, clicking a submit button:
   1. Validates required fields
   2. Sends the form data to the URL in action="..."
   3. Reloads the page

   event.preventDefault() stops step 3.
   This lets us handle the submission with JavaScript instead —
   useful for showing success messages without a page reload.

   In a real project, you'd use fetch() to send the data to a server.
   Here, we simulate success for the learning demo.
   ============================================================ */

if (contactForm) {

  // WEEK 7: 'submit' fires when the form is submitted (button click or Enter key)
  contactForm.addEventListener('submit', function(event) {

    // WEEK 7: Stop the form from actually submitting (no page reload)
    event.preventDefault();

    // WEEK 6: Get the values from the name and email fields
    const nameInput    = document.querySelector('#name');
    const emailInput   = document.querySelector('#email');
    const subjectInput = document.querySelector('#subject');

    const name    = nameInput.value.trim();    // .value gets the typed text
    const email   = emailInput.value.trim();   // .trim() removes whitespace
    const subject = subjectInput.value;

    // WEEK 6: Basic validation — check all required fields have values
    if (!name || !email || !subject) {
      // WEEK 7: Show an error message in the feedback paragraph
      showFeedback('Please fill in all required fields.', 'error');
      return; // Stop here — don't continue to the success step
    }

    // ─── Simulate a successful form submission ───
    // In a real project, you'd send data to a server with fetch() here.

    // Disable the submit button to prevent double-submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // WEEK 6: setTimeout simulates a network delay (like waiting for a server)
    // Syntax: setTimeout(function, milliseconds)
    setTimeout(function() {

      // WEEK 7: Show the success message
      showFeedback(
        `✅ Thanks ${name}! Your message has been sent. I'll reply to ${email} soon.`,
        'success'
      );

      // Reset the form fields to blank
      contactForm.reset();

      // Re-enable the button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✉️';

    }, 1500); // Wait 1.5 seconds to simulate the network

  });
}

/*
  Helper function — shows feedback in the form's feedback paragraph.

  WEEK 6: A function that takes two parameters.
  WEEK 7: Sets textContent and className dynamically.
*/
function showFeedback(message, type) {
  if (!formFeedback) return;  // Guard: don't crash if element doesn't exist

  formFeedback.textContent = message;   // Set the message text
  formFeedback.className = `form-feedback ${type}`;  // 'success' or 'error'

  // Scroll the feedback into view (good UX on long forms)
  formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


/* ============================================================
   7. CARD ENTRANCE ANIMATIONS
   ============================================================
   WEEK 7 — querySelectorAll & forEach

   When the page loads, we add a staggered entrance animation
   to the cards. Each card fades in slightly after the previous one.

   This uses:
   - querySelectorAll('.card') → gets ALL cards
   - forEach(callback)         → loops through each card
   - The index (i) parameter   → gives us the position number
   - style.animationDelay      → staggers the timing
   ============================================================ */

// WEEK 7: querySelectorAll returns a NodeList of ALL elements with class "card"
const allCards = document.querySelectorAll('.card');

// WEEK 7: forEach loops over every card
// The callback receives the card element AND its index (0, 1, 2, ...)
allCards.forEach(function(card, index) {

  // Stagger: card 0 starts at 0ms, card 1 at 100ms, card 2 at 200ms...
  // WEEK 6: Template literal with arithmetic inside ${}
  card.style.animationDelay = `${index * 0.1}s`;
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  // After a short delay, animate the card to its final position
  setTimeout(function() {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 + index * 100);
});
