const { google } = require('googleapis')

class GoogleSheetSource {
  constructor(api, options) {
    const spreadsheetData = google.sheets({
      version: 'v4',
      auth: options.apiKey,
    })

    options.spreadsheets.forEach(spreadsheet => {
      spreadsheet.sheets.forEach(sheet => {
        api.loadSource(async actions => {
          const collection = actions.addCollection(sheet.collectionName)

          await spreadsheetData.spreadsheets.values
            .get({
              spreadsheetId: spreadsheet.spreadsheetId,
              range: `'${sheet.sheetName}'`,
            })
            .then(response => {
              const sheetData = response.data.values
              const titles = sheetData.shift()
              const nodes = sheetData.map((value, nodeIndex) => {
                return titles.reduce(
                  (title, key, index) => ({
                    ...title,
                    [key]: value[index],
                    id: nodeIndex,
                  }),
                  {}
                )
              })
              nodes.map(value => {
                collection.addNode(value)
              })
            })
            .catch(err => console.log(err))
        })
      })
    })
  }
}

module.exports = GoogleSheetSource
