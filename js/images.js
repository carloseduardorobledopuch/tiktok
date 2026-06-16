document.addEventListener("DOMContentLoaded", function () {
  const processedImages = [];
  const galleryContainer = document.getElementById("js-gallery-container");
  const counterContainer = document.getElementById("js-gallery-counter");
  let activeIdx = 0;

  fetch('images.txt')
    .then(response => response.text())
    .then(data => {
      const regexPattern = /(data:image\/[a-zA-Z]+;base64,[^\s]+|https?:\/\/[^\s]+)/g;
      const matches = data.match(regexPattern);
      if (matches) {
        matches.forEach(url => processedImages.push(url.trim()));
      }
      renderGallery();
    })
    .catch(err => console.error("Data pipeline load exception: ", err));

  function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";
    if (processedImages.length === 0) return;

    processedImages.forEach((imgSrc, index) => {
      const imgEl = document.createElement("img");
      imgEl.src = imgSrc;
      imgEl.className = `gallery-img img-${index + 1}${index === activeIdx ? ' active' : ''}`;
      imgEl.alt = "Product Display Variant Node " + (index + 1);
      galleryContainer.appendChild(imgEl);
    });
    updateCounter();
  }

  function updateCounter() {
    if (!counterContainer) return;
    if (processedImages.length === 0) {
      counterContainer.innerText = "0 / 0";
      return;
    }
    counterContainer.innerText = `${activeIdx + 1} / ${processedImages.length}`;
  }

  function changeSlide(direction) {
    const total = processedImages.length;
    if (total === 0) return;
    
    const targets = document.querySelectorAll(".gallery-img");
    if(targets.length === 0) return;
    
    targets[activeIdx].classList.remove("active");
    activeIdx = (activeIdx + direction + total) % total;
    targets[activeIdx].classList.add("active");
    updateCounter();
  }

  const prevBtn = document.getElementById("js-prev-btn");
  const nextBtn = document.getElementById("js-next-btn");
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
});
