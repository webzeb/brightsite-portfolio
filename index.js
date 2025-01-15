console.log("Connected");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);

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

// Scramble text on hover
const scrambleTextElement = document.querySelector(
  '[data-gsap="text-hover-scramble"]'
);
const scrambleTextInstance = new ScrambleText(scrambleTextElement, {
  text: scrambleTextElement.textContent,
  speed: 3, // Adjust the speed of the scrambling
});

// Add event listeners for mouse enter and leave
scrambleTextElement.addEventListener("mouseenter", () => {
  scrambleTextInstance.scramble();
});

scrambleTextElement.addEventListener("mouseleave", () => {
  scrambleTextInstance.reveal();
});
