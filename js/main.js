// Selectors
const auth = '563492ad6f91700001000001843ec828148f46a88d543dfded47c30d'
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form')
let fetchLink
let searchValue
let page = 1
const more = document.querySelector('.more')
let currentSearch




// Event Listeners
searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    currentSearch = searchValue
    searchPhotos(searchValue)
})
more.addEventListener('click', loadMore)



function updateInput(e){
    searchValue = e.target.value
}

// Fetch API
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        }
    })
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(e => {
        const imgData = document.createElement('div')
        imgData.classList.add('gallery-list')
        imgData.innerHTML = `
            <div class='title'>
                <p>${e.photographer}</p>
                <a href=${e.src.large}>Download</a>
            </div>
            <img src=${e.src.large}></img>
        `
        gallery.append(imgData)
    });
}

async function curatedPhotos(){
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15$page_1")
    generatePictures(data)
}

curatedPhotos()

async function searchPhotos(query){
    gallery.innerHTML = ''
    searchInput.innerHTML = ''
    let fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePictures(data)
}


// Load more
async function loadMore(){
    page++
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    const data = await fetchApi(fetchLink)
    generatePictures(data)
}


























































/*function generatePictures(data){
    data.photos.forEach(e => {
        const img = document.createElement('div')
        img.classList.add('gallery_img')
        img.innerHTML = `
            <div class='gallery-info'>
                <p>${e.photographer}</p>
                <a href=${e.src.large}>Download</a>
            </div>
            <img src=${e.src.large}>
        `
        gallery.append(img)

    });
  console.log(gallery)
}

async function curatedPhotos(){
    const fetchData = await fetchApi("https://api.pexels.com/v1/curated?per_page=6&page_1")
    generatePictures(fetchData)
}

curatedPhotos()*/