// Archived code I may or may not use again

// H1 TEXT FLOAT DOWN
// Wait for fonts to load before running animations
document.fonts.ready.then(() => {
  // Text float down setup
  const parentElement = document.querySelector('[data-gsap="text-float-down"]');
  parentElement.style.lineHeight = "0.95";
  parentElement.style.paddingBottom = "0.35em";

  const text = new SplitType('[data-gsap="text-float-down"]', {
    types: "words",
    wrap: true,
  });

  text.words.forEach((word) => {
    if (word.closest(".u-text-highlight")) return;
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

  // Add text float down animation at the end of the timeline
  tl.to(text.words, {
    yPercent: 0,
    opacity: 1,
    ease: "circ.out",
    stagger: { from: "left", amount: 1.2 },
  });
  ("-=0.2");
});
