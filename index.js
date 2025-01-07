gsap.registerPlugin(ScrollTrigger);

// Add this helper function at the top
function isDesktop() {
  return window.matchMedia("(min-width: 768px)").matches;
}

// HERO CARDS ANIMATION ON LOAD

// Wait for document to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Only run animations if on desktop
  if (!isDesktop()) return;

  const tl = gsap.timeline();

  // Initial setup - hide everything
  gsap.set('[data-gsap="card-load-animation"][data-card-position="left"]', {
    xPercent: 100, // Start at center (100% to the right of its final position)
    x: 0,
    zIndex: 1,
  });
  gsap.set('[data-gsap="card-load-animation"][data-card-position="right"]', {
    xPercent: -100, // Start at center (-100% to the left of its final position)
    x: 0,
    zIndex: 1,
  });
  gsap.set('[data-gsap="card-circle-load-animation"]', {
    opacity: 0,
    scale: 0.8,
  });
  gsap.set('[data-gsap="card-border-path"]', {
    strokeDasharray: function (index, element) {
      return element.getTotalLength() + " " + element.getTotalLength();
    },
    strokeDashoffset: function (index, element) {
      return element.getTotalLength();
    },
  });
  gsap.set('[data-gsap="card-line-load-aniamtion"]', {
    scaleX: 0,
    transformOrigin: "right center",
  });
  gsap.set('[data-gsap="card-title-load-animation"]', { opacity: 0, y: 20 });
  gsap.set('[data-gsap="card-body-load-animation"]', { opacity: 0, y: 15 });

  // Initial setup - add image setup
  gsap.set('[data-gsap="image-load-in"]', {
    opacity: 0,
  });

  // 1. Fade in circles
  tl.to('[data-gsap="card-circle-load-animation"]', {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: {
      from: "left",
      amount: 0.3,
    },
  })

    // 2. Move cards to final positions and fade in images
    .to('[data-gsap="card-load-animation"][data-card-position="left"]', {
      xPercent: 0,
      duration: 0.8,
      ease: "power2.inOut",
    })
    .to(
      '[data-gsap="card-load-animation"][data-card-position="right"]',
      {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "<"
    )
    // Add image fade in after cards arrive
    .to(
      '[data-gsap="image-load-in"]',
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    )

    // 3. Draw card borders
    .to('[data-gsap="card-border-path"]', {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.inOut",
      stagger: 0.15,
    })
    .to(
      '[data-gsap="card-line-load-aniamtion"]',
      {
        scaleX: 1,
        duration: 0.6,
        ease: "circ.inOut",
        transformOrigin: "right center",
      },
      "-=1"
    )

    // 4. Fade in titles
    .to('[data-gsap="card-title-load-animation"]', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.1,
    })

    // 5. Fade in body text
    .to(
      '[data-gsap="card-body-load-animation"]',
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.2"
    );
});

/* Code for text scramble effect
// TEXT SCRAMBLE
// Split the text into characters
const scrambleText = new SplitType('[data-gsap="text-scramble"]', {
  types: "words,chars",
  wrap: true,
});

// Hide characters initially
gsap.set(scrambleText.chars, { opacity: 0 });

// Create the scramble effect
const scrambleAnimation = gsap.to(scrambleText.chars, {
  duration: 0.8,
  opacity: 1,
  delay: 0.8,
  scale: 1,
  y: 0,
  rotation: 0,
  // Start from random positions
  stagger: {
    amount: 1,
    from: "random",
  },
  ease: "power4.out",
  // Initial state for each character
  immediateRender: true,
  from: {
    opacity: 0,
    scale: 0.5,
    y: () => gsap.utils.random(-100, 100),
    rotation: () => gsap.utils.random(-120, 120),
  },
});

// Function to create the shuffle effect
function createShuffleEffect(element, initialText, finalText) {
  // Split both texts into characters
  const initialSplit = new SplitType(element, {
    types: "words,chars",
    wrap: true,
  });

  // Set initial text
  element.textContent = initialText;

  // Create the timeline (paused initially)
  const tl = gsap.timeline({ paused: true });

  // First animation: fade out initial text
  tl.to(initialSplit.chars, {
    duration: 0.4,
    opacity: 0,
    scale: 0.5,
    y: () => gsap.utils.random(-50, 50),
    rotation: () => gsap.utils.random(-90, 90),
    stagger: {
      amount: 0.2,
      from: "random",
    },
    ease: "power4.out",
  })
    // Update text content and create new split
    .call(() => {
      element.textContent = finalText;
      const finalSplit = new SplitType(element, {
        types: "words,chars",
        wrap: true,
      });
      // Set initial state for final text characters
      gsap.set(finalSplit.chars, {
        opacity: 0,
        scale: 0.5,
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-120, 120),
      });
      // Animate in the final text
      tl.to(finalSplit.chars, {
        duration: 0.2,
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        ease: "power4.out",
      });
    });

  // Add hover events
  element.addEventListener("mouseenter", () => {
    if (!tl.isActive()) {
      tl.restart();
    }
  });

  // Reset on mouse leave
  element.addEventListener("mouseleave", () => {
    if (!tl.isActive()) {
      element.textContent = initialText;
      const resetSplit = new SplitType(element, {
        types: "words,chars",
        wrap: true,
      });
      gsap.set(resetSplit.chars, { opacity: 1, scale: 1, y: 0, rotation: 0 });
    }
  });
}

// Initialize the effect
const headlineElement = document.querySelector(
  '[data-gsap="text-shuffle-hover"]'
);
createShuffleEffect(
  headlineElement,
  "[No stone unturned]]",
  "[Not just things we use, things we cherish]"
);
*/
