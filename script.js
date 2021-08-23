window.saveDataAcrossSessions = true

 
const LOOK_DELAY = 1000
const LEFT_CUTTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

let startLookTime= Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)


webgazer.setGazeListener((data, timestamp) => {
    if(data==null || lookDirection === "STOP") return

    if(data.x < LEFT_CUTTOFF && lookDirection !== "LEFT" && lookDirection!=="RESET") {
        startLookTime = timestamp
        lookDirection = "LEFT"
    } else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT" && lookDirection!=="RESET"){
        startLookTime = timestamp
        lookDirection = "RIGHT"
    } else if (data.x >= LEFT_CUTTOFF && data.x <= RIGHT_CUTOFF){
        startLookTime = Number.POSITIVE_INFINITY
        lookDirection = null
    }

    if(startLookTime + LOOK_DELAY < timestamp){
        if(lookDirection === "LEFT"){
            imageElement.classList.add("left")
        } else{
            imageElement.classList.add("right")
        }
    
    startLookTime=Number.POSITIVE_INFINITY
    lookDirectio="STOP"
    setTimeout(() => {
        imageElement.remove()
        nextImageElement.classList.remove('next')
        imageElement = nextImageElement
        nextImageElement=getNewImage(true)
        lookDirection="RESET"
    }, 200)
}
})
.begin()

webgazer.showVideoPreview(false).showPredictionPoints(false)

function getNewImage(next = false){
    const img = document.createElement("img")
    img.src="https://picsum.photos/1000?" + Math.random()
    if(next) img.classList.add("next")

    document.body.append(img)
    return img
}