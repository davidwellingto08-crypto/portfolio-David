const API_KEY = "72e3c710e17cfd93880a89b02be844df";

const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";

const container = document.getElementById("movies");
const search = document.getElementById("search");

// Banner
const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerOverview = document.getElementById("banner-overview");

// Modal
const modal = document.getElementById("modal");
const video = document.getElementById("video");
const close = document.getElementById("close");

// 🎯 Cor da nota
function getColor(vote) {
    if (vote >= 7.5) return "green";
    if (vote >= 5) return "orange";
    return "red";
}

// 🎬 Banner
function showBanner(movie) {
    if (!movie) return;

    banner.style.backgroundImage =
        `linear-gradient(to top, #141414, transparent),
        url(${BACKDROP_PATH + movie.backdrop_path})`;

    bannerTitle.textContent = movie.title;
    bannerOverview.textContent = movie.overview;
}

// 🎥 Buscar trailer
async function openTrailer(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`;

    const res = await fetch(url);
    const data = await res.json();

    const trailer = data.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
    );

    if (!trailer) {
        alert("Sem trailer disponível 😢");
        return;
    }

    video.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    modal.classList.add("show");
}

// 🎬 Buscar filmes
async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            showBanner(data.results[0]);
        }

        showMovies(data.results);

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <h2 style="grid-column:1/-1; text-align:center;">
                Erro ao carregar os filmes.
            </h2>
        `;
    }
}

// 🎞️ Mostrar filmes
function showMovies(movies) {
    container.innerHTML = "";

    if (!movies || movies.length === 0) {
        container.innerHTML = `
            <h2 style="grid-column:1/-1; text-align:center;">
                Nenhum filme encontrado.
            </h2>
        `;
        return;
    }

    movies.forEach(movie => {

        const ano = movie.release_date
            ? movie.release_date.split("-")[0]
            : "----";

        const poster = movie.poster_path
            ? IMG_PATH + movie.poster_path
            : "https://via.placeholder.com/500x750?text=Sem+Imagem";

        const div = document.createElement("div");
        div.classList.add("movie-card");

        div.innerHTML = `
            <img src="${poster}" alt="${movie.title}">

            <div class="info">
                <h3>${movie.title} (${ano})</h3>

                <span class="vote ${getColor(movie.vote_average)}">
                    ⭐ ${movie.vote_average.toFixed(1)}
                </span>

                <button class="play-btn">▶ Assistir trailer</button>
            </div>

            <div class="overview">
                <h3>Sinopse</h3>
                <p>${movie.overview || "Sinopse indisponível."}</p>
            </div>
        `;

        // botão trailer
        div.querySelector(".play-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openTrailer(movie.id);
        });

        container.appendChild(div);
    });
}

// 🔥 fechar modal
close.onclick = () => {
    modal.classList.remove("show");
    video.src = "";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
        video.src = "";
    }
};

// 🔍 pesquisa
search.addEventListener("keyup", () => {
    const texto = search.value.trim();

    if (texto.length > 2) {
        const searchURL =
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(texto)}`;

        getMovies(searchURL);
    } else {
        getMovies(URL);
    }
});

// 🚀 inicial
getMovies(URL);