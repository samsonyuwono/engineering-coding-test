let value;
function assignValue(event) {
  value = event.target.value;
  document.getElementById("search").value = event.target.value;
}

function fetchImages() {
  fetch(
    `${secrets.BASE_URL}${secrets.API_KEY}&tags=${value}${secrets.FORMAT_URL}`
  )
    .then(res => res.json())
    .then(json => {
      renderPhotos(json.photos.photo);
    });
}

function renderPhotos(photos) {
  let images = `${photos.map(
    photo =>
      '<div class="photo-container"><img src=' +
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
