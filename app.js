const sheetUrl = 'https://docs.google.com/spreadsheets/d/1kUpTGLGYXhgrJhwCIrDKZd2zBJDSItpCdSQWKjaboZo/edit?usp=sharing'
//sheetAsJSON is how we pull the data as JSON (Javascript Object Notation)
let sheetAsJSON = 'https://spreadsheets.google.com/feeds/list/1kUpTGLGYXhgrJhwCIrDKZd2zBJDSItpCdSQWKjaboZo/od6/public/values?alt=json'
const $navButtons=$('nav button')
const $nav= $('nav')
const $mobileNav=$('.mobile-anchor')

$navButtons.on('click', () => {
    $nav.toggleClass('open')
})
$mobileNav.on('click', () => {
    $nav.removeClass('open')
})


$.ajax({
    url: sheetAsJSON,
}).then(data => {
    let projects= data.feed.entry.map((project) =>{
        return {
            title: project.gsx$title.$t,
            image: project.gsx$image.$t,
            description: project.gsx$description.$t,
            url: project.gsx$url.$t
        }
    })
    app(projects)
})
//.catch is meant to handle errors
.catch( err => console.log('the error is ', err))
let $divProjectOnClick=$('.project-onclick')
function app(projectsArr) {
    const createTable =() =>{
        projectsArr.forEach(projectData =>{
            let $p1=$(`<div class="card" style="width: 18rem;">
                        <img src=${projectData.image} class="card-img-top" alt=${projectData.title}>
                        <div class="card-body">
                            <h5 class="card-title">${projectData.title}</h5>
                            <p class="card-text">${projectData.description}</p>
                            <a href="${projectData.url}" class="btn btn-primary">Check it Out!</a>
                        </div>    
                        </div>`)
                        console.log($p1)
                        $divProjectOnClick.append($p1)
        })
    }
    createTable()
}
