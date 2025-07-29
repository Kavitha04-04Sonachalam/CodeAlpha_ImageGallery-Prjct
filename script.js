const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const buttons = document.querySelectorAll(".filter-buttons button");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const darkModeToggle = document.getElementById("darkModeToggle");

let allImages = [];
let currentIndex = 0;

function fetchImages(category = "") {
  gallery.innerHTML = "";
  allImages = [];

  const keywords = category || "nature,city,animals,technology";
  const topics = keywords.split(",");

  for (let i = 0; i < 12; i++) {
    const topic = category ? category : topics[i % topics.length];
    const randomId = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/seed/${topic + randomId}/400/300`;

    allImages.push(url);

    const imgCard = document.createElement("div");
    imgCard.classList.add("image-card");

    const img = document.createElement("img");
    img.src = url;
    img.alt = topic;

    img.addEventListener("click", () => openLightbox(i));

    imgCard.appendChild(img);
    gallery.appendChild(imgCard);
  }
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = allImages[index];
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  lightboxImg.src = allImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % allImages.length;
  lightboxImg.src = allImages[currentIndex];
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    fetchImages(filter === "all" ? "" : filter);
  });
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();
  fetchImages(value);
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

fetchImages(); // initial


