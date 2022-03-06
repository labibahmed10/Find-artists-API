const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const albumContainer = elementById("albums");
  const artistContainer = elementById("artist");
  const keywordText = elementById("keyword");
  const keyword = keywordText.value;

  if (keyword === "" || !isNaN(keyword)) {
    document.getElementById("error").style.display = "block";
    keywordText.value = "";
    albumContainer.textContent = "";
    artistContainer.textContent = "";
  } else {
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showArtists(data));

    keywordText.value = "";
    albumContainer.textContent = "";
    artistContainer.textContent = "";
  }
};

const showArtists = ({ artists }) => {
  const artistContainer = elementById("artist");
  artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const artistContainer = elementById("artist");
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  artistContainer.innerHTML = "";
};

const showAlbum = ({ album }) => {
  console.log(album);
  const albumContainer = elementById("albums");

  album.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
