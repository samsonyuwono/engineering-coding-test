let value;
let page = 1;
function assignValue(event) {
  value = event.target.value;
  document.getElementById("search").value = event.target.value;
}

function fetchImages() {
  fetch(
    `${secrets.BASE_URL}${secrets.API_KEY}&tags=${value}${
      secrets.FORMAT_URL
    }${page}`
  )
    .then(res => res.json())
    .then(json => {
      renderPhotos(json.photos.photo);
    });
}

function renderPhotos(photos) {
  let images = `${photos.map(
    photo =>
      '<div class="photo-container"><img onclick="displayModal(event)" src=' +
      "http://farm" +
      photo.farm +
      ".staticflickr.com/" +
      photo.server +
      "/" +
      photo.id +
      "_" +
      photo.secret +
      ".jpg>" +
      "</img></div>"
  )}`;

  images = images.replace(/,/g, "");
  document.getElementById("output").innerHTML = images;
}

function hidePaginate() {}

function nextPage(next) {
  if (next) {
    page++;
  }
  fetchImages();
}

function previousPage() {
  if (page > 1) {
    page--;
  } else {
    page;
  }
  fetchImages();
}

function displayModal(event) {
  let modal = document.getElementById("modal");
  let modalImage = document.getElementById("modal-image");
  modalImage.src = event.target.src;
  modal.style.display = "flex";
}

function closeImageModal() {
  document.getElementById("modal").style.display = "none";
}
