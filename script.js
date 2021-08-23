window.saveDataAcrossSessions = true
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)


webgazer.setGazeListener((data, timestamp) => {
    console.log(data, timestamp)
})
.begin()

function getNewImage(next = false){
    const img = document.createElement("img")
    img.src="https://picsum.photos/1000?" + Math.random()
    if(next) img.classList.add("next")

    document.body.append(img)
    return img
}