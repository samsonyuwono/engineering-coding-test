let value;
let page = 1;

function assignSearchValue(event) {
  value = event.target.value;
  document.getElementById("search").value = event.target.value;
}

function showResults() {
  showPagination();
  fetchImages();
}

function fetchImages() {
  if (value.length > 0) {
    fetch(
      `${secrets.BASE_URL}${secrets.API_KEY}&tags=${value}${
        secrets.FORMAT_URL
      }${page}`
    )
      .then(res => res.json())
      .then(json => {
        renderPhotos(json.photos.photo);
      });
  } else {
    alert("Please enter a value");
  }
}

function renderPhotos(photos) {
  let images = formatResults(photos);
  images = removeCommas(images);
  document.getElementById("output").innerHTML = images;
}

function removeCommas(images) {
  return images.replace(/,/g, "");
}

function formatResults(photos) {
  return `${photos.map(
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
}

function pagination(next) {
  modifyPageNumber(next);
  fetchImages();
}
function showPagination() {
  if (page >= 1) {
    document.getElementById("pagination").style.display = "block";
  }
}

function modifyPageNumber(next) {
  if (next) {
    page++;
  } else if (page > 1) {
    page--;
  } else {
    page;
  }
  return page;
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
