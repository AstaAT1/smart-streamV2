import { searchChannels } from './search.js'
import { updateFavorite } from '../services/api.js'
const category = document.querySelector('#categoryView')
const section1 = document.querySelector('#section1')
const section2 = document.querySelector('#section2')
const documentaires = document.querySelector('#documentaires')
const films = document.querySelector('#films')
const series = document.querySelector('#series')
const sports = document.querySelector('#sports')
const actualites = document.querySelector('#actualites')
const musique = document.querySelector('#musique')
const channelsList = document.querySelector('#channelsList')
const searchChannel = document.querySelector('#searchChannel')
const isFavorite = document.querySelector('.isFavorite')
let currentChannels = []
// let isFavorite


function showCategory() {
    category.classList.remove('hidden')
    category.classList.add('flex')

    section1.classList.remove('flex')
    section1.classList.add('hidden')
    section2.classList.remove('flex')
    section2.classList.add('hidden')
}

export function change(arr) {
    documentaires.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Documentaires')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    films.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Films')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    series.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Séries')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    sports.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Sports')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    musique.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Musique')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    actualites.addEventListener('click', function () {
        showCategory()
        const arrdata = filterByCategory(arr, 'Actualités')
        currentChannels = arrdata
        renderChannels(currentChannels)
    })

    isFavorite.addEventListener('click' , function () {
           const arrdata = arr.filter(p => p.isFavorite === true)
           renderChannels(arrdata)
    })
    handelSearch()
}
export function filterByCategory(channels, selectedCategory) {
    const filterCategory = channels.filter(function (channel) {
        return selectedCategory === channel.category
    })

    return filterCategory
}

export function renderChannels(arr) {
    console.log("renderChannels called", arr.length)
    channelsList.innerHTML = arr.map(function (channel) {
        
        return `
<div class=" channel-card flex justify-between items-center gap-4 bg-[#202020] border border-white/10 rounded-xl p-4 cursor-pointer ">

    <div class="flex items-center justify-center gap-2">
    <div class="w-14 h-14  bg-[#303030] rounded-lg flex items-center justify-center overflow-hidden">
        <img
            src="${channel.logo}"
            alt="${channel.name}"
            class="w-full h-full object-contain"
        >
    </div>

    <div class="flex flex-col gap-2 ">
        <span class="text-xs font-semibold text-red-500">
            CH ${channel.channelNumber}
        </span>

        <h3 class="font-semibold text-sm md:text-base truncate">
            ${channel.name}
        </h3>

        <span class="text-xs text-gray-400">
            ${channel.category}
        </span>
    </div>
    </div>
    
    <div class="flex gap-3">
    <i class="fa-solid fa-ban text-2xl ban text-gray-500 "></i>
    <i class="fa-star favorite text-2xl ${channel.isFavorite ? 'fa-solid text-yellow-500' : 'fa-regular text-gray-500'}"></i>
    </div>

</div> `
    }).join("")
    const cardChannel = document.querySelectorAll('.channel-card')

    const favorite = document.querySelectorAll('.favorite')
    favorite.forEach(function (e , index) {
        e.addEventListener('click', function (event) {
            event.stopPropagation()
            const favoriteIndex = arr[index]
            if (!favoriteIndex.isFavorite) {
                favoriteIndex.isFavorite = true
                e.classList.add('fa-solid')
                e.classList.remove('fa-regular')
                e.classList.add('text-yellow-500')
                e.classList.remove('text-gray-500')
                
            }
            else{
                favoriteIndex.isFavorite = false
                e.classList.remove('fa-solid')
                e.classList.add('fa-regular')
                e.classList.remove('text-yellow-500')
                e.classList.add('text-gray-500')
            }
            updateFavorite(favoriteIndex)

        })
    })
    function selectChannel(arr) {

        const previewImage = document.querySelector('#previewImage')
        const previewName = document.querySelector('#previewName')
        console.log(cardChannel.length)
        console.log("Cards found:", cardChannel.length)
        cardChannel.forEach(function (e, index) {
            e.addEventListener('click', function () {
                const selectedChannel = arr[index]
                previewImage.src = selectedChannel.previewImage
                previewName.textContent = selectedChannel.name
                previewImage.classList.remove('hidden')
                console.log(selectedChannel)
            })
        })
    }
    selectChannel(arr)
}
function handelSearch() {
    searchChannel.addEventListener('input', function () {
        const valueSearch = searchChannel.value.trim()
        const result = searchChannels(currentChannels, valueSearch)
        renderChannels(result)
    })
}