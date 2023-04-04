const oboe = require("oboe")

const apiURL = 'http://127.0.0.1:5000/api'
const metadataEndpoint = apiURL + '/meta'
const asteroidsEndpoint = apiURL + '/asteroids'
const surveysEndpoint = apiURL + '/surveys'

const streamAsteroids = (nodeCallback, doneCallback) => {
  oboe({url: asteroidsEndpoint})
    .node('!asteroids.*', function (data) {
      nodeCallback(data)
      return oboe.drop()
    })
    .done(() => {
      console.log("Parsed asteroid data")
      doneCallback()
    })
    .fail(() => {
      console.error('Failed to parse asteroid data')
    });
}

const getMetadata = (nodeCallback, doneCallback) => {
    let count = 0
    oboe({url: metadataEndpoint})
      .node('!.', function (data) {
        nodeCallback(data)
      })
      .done(() => {
        console.log('Got metadata')
        doneCallback()
      })
      .fail((thrown) => {
        console.error('Failed to get metadata')
        console.error(thrown)
      });
}

const getSurveys = (nodeCallback, doneCallback) => {
  oboe({url: surveysEndpoint})
    .node('!surveys.*', function (data) {
      nodeCallback(data)
    })
    .done(() => {
      console.log('Loaded survey list')
      doneCallback()
    })
    .fail(() => {
      console.error('Failed to load survey list!')
    });
}

export { streamAsteroids, getMetadata, getSurveys }
