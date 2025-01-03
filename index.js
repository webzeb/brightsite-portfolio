console.log("project connected");

gsap.registerPlugin(ScrollTrigger);

// TEXT FLOAT DOWN
// Wait for fonts to load before running animations
document.fonts.ready.then(() => {
  // Set line height and padding on the parent element
  const parentElement = document.querySelector('[data-gsap="text-float-down"]');
  parentElement.style.lineHeight = "0.95";
  parentElement.style.paddingBottom = "0.35em";

  // Split text into words
  const text = new SplitType('[data-gsap="text-float-down"]', {
    types: "words",
    wrap: true,
  });

  // Create wrapper spans around each word
  text.words.forEach((word) => {
    if (word.closest(".u-text-highlight")) {
      return;
    }

    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "baseline";
    wrapper.style.paddingBottom = "0.35em";
    wrapper.style.marginBottom = "-0.35em";
    word.parentNode.insertBefore(wrapper, word);
    wrapper.appendChild(word);
  });

  gsap.set('[data-gsap="text-float-down"]', { autoAlpha: 1 });
  gsap.set(text.words, { yPercent: -120, opacity: 10 });

  const initialAnimation = gsap.to(text.words, {
    yPercent: 0,
    opacity: 1,
    ease: "circ.out",
    stagger: { from: "left", amount: 1.2 },
  });
});

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
