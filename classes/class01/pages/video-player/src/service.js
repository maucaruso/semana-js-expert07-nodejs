export default class Service {
  #model = null
  #faceLandMarksDetection
  
  constructor({ faceLandmarksDetection }) {
    this.#faceLandMarksDetection = faceLandmarksDetection
  }
  
  async loadModel() {
    this.#model = await this.#faceLandMarksDetection.load(
      this.#faceLandMarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    )
  }
  
  async handBlinked(video) {
    const predictions = await this.#estimateFaces(video)
    console.log(predictions)
  }
  
  #estimateFaces(video) {
    return this.#model.estimateFaces({
      input: video,
      returnTensors: false,
      flipHorizontal: true,
      predictIrises: true
    })
  }
}