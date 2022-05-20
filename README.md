# Gridsome Source for Google Sheets v2

![npm](https://img.shields.io/npm/dt/@adapttive/gridsome-source-google-sheets)
![npm](https://img.shields.io/npm/v/@adapttive/gridsome-source-google-sheets)
![github](https://img.shields.io/github/package-json/v/adapttive/gridsome-source-google-sheets)
<br>

> This is an updated fork of [this repository](https://github.com/spenwall/gridsome-source-google-sheets).

Gridsome source plugin for google sheets, handles multiple pages or sheets!

## Requirements

Gridsome: >0.7.0

## Install

```bash
yarn add @adapttive/gridsome-source-google-sheets
```

npm

```bash
npm install @adapttive/gridsome-source-google-sheets
```

## How to use

You will need to generate a google api key [here](https://console.developers.google.com/apis/credentials). The Spreadsheet ID can be found on the sheets url. You will also need to make your spreadsheet viewable to the public to use the api credentials.

```js
module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-source-google-sheets",
      options: {
        apiKey: "GOOGLE_API_KEY",
        spreadsheets: [
          {
            spreadsheetId: "SPREADSHEET_ID",
            sheets: [
              {
                sheetName: "SHEET_NAME", // Example: "Sheet1"
                collectionName: "COLLECTION_NAME" // Example: "Users" (Must be unique)
              }
            ]
          }
        ]
      }
    }
  ]
}
```

### How to Use Multiple Spreadsheets

```js
options.spreadsheets: [
  {
    spreadsheetId: 'SPREADSHEET_ID_1',
    sheets: [
      {
        sheetName: 'SHEET_NAME', // Example: "Sheet1"
        collectionName: 'COLLECTION_NAME', // Example: "Users" (Must be unique)
      },
    ],
  },
  {
    spreadsheetId: 'SPREADSHEET_ID_2',
    sheets: [
      {
        sheetName: 'SHEET_NAME', // Example: "Sheet2"
        collectionName: 'COLLECTION_NAME', // Example: "Projects" (Must be unique)
      },
    ],
  },
]
```

### How to Use Multiple Sheets from the Same Spreadsheet

```js
options.spreadsheets: [
  {
    spreadsheetId: 'SPREADSHEET_ID',
    sheets: [
      {
        sheetName: 'SHEET_NAME', // Example: "Sheet1"
        collectionName: 'COLLECTION_NAME', // Example: "Projects" (Must be unique)
      },
      {
        sheetName: 'SHEET_NAME', // Example: "Sheet2"
        collectionName: 'COLLECTION_NAME', // Example: "Users" (Must be Unique)
      },
    ],
  },
]
```

### Example query on page template

This plugin assumes that the first row in your table is the column name. In this example the 2 columns that exist are named `title` and `body`, with `id` being a key that this plugin generates automatically.

```js
<page-query>
  query {
    allCollectionName {
      edges {
        node {
          id, // Automatically generated
          title,
          body
        }
      }
    }
  }
</page-query>
```

### To use data in page

`$page.allCollectionName.edges` will be an array of each row of your Google Sheet.

```js
<template>
    <!--  Example: "{{ $page.allUsers.edges }}" -->
    <div v-for="row in $page.allCollectionName.edges" v-key="row.node.id">
      {{ row.node.id }}
    </div>
</template>
```

### Using Templates

To use this in a template first setup the template route in gridsome.config.js

```js
module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-source-google-sheets",
      options: {
        apiKey: "GOOGLE_API_KEY",
        spreadsheets: [
          {
            spreadsheetId: "SPREADSHEET_ID",
            sheets: [
              {
                sheetName: "SHEET_NAME", // Example: "Sheet1"
                collectionName: "COLLECTION_NAME" // Example: "Users" (Must be unique)
              }
            ]
          }
        ]
      }
    }
  ],
  templates: {
    collectionName: [
      {
        path: "/somePath/:id", // Example: "/user/:id"
        component: "./src/templates/collectionName.vue" // Example: "./src/templates/users.vue"
      }
    ]
  }
}
```

### Example template in src/template/collectionName.vue

```html
<template>
  <layout>
    <!--  Example: "{{ $page.users.title }}" -->
    <div>{{ $page.collectionName.title }}</div>

    <!--  Example: "{{ $page.users.body }}" -->
    <div>{{ $page.collectionName.body }}</div>
  </layout>
</template>
```

```js
<page-query>
query ($id: ID!) {
  collectionName(id: $id) { // Example: "users(id: $id)"
    title,
    body
  }
}
</page-query>
```
