const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
// const accessKey = "e3W-XI0Mlk3s4-ljk7z2c4W39ADKQwqeuMoglVYa2J4"
const accessKey = "RDtdJY-Noy5hAK2DoAx_EggsxZOarE4gQVJ2r5svoos";

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    searchResult.innerHTML = "";

    const results = data.results;
    results.map((result) =>{
        const image = document.createElement("img");
        // image.src = result.urls.small;
        image.src = `/30-Days-JS-Challenge/Day%204/${result.urls.small}`;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})