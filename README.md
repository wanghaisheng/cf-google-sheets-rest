<p align="left">
   <img src="public/google-sheets-logo.png" width="400"/>
</p>

# CMS-Sheets
----
  It's a simple API RESTful to manipulate a google spreadsheet document.<br>
  In order use it, it's necessary to have somethings:
  - A google service account and your credentials;
  - A google spreadsheet document shared with your google service accout and it ID, got it from URL


## :rocket: Technologies

This project was developed with the following technologies:

-  [NodeJS](https://nodejs.org/en/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Typeorm](https://typeorm.io/#/)
-  [Google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)
-  [VS Code][vc]

## 📋 Features

### Documentation

- [x] Lists all spreadsheets in the document
- [x] Lists one spreadsheets in the document
- [x] Add one row in the spreadsheet
- [x] Update one row in the spreadsheet
- [x] Delete one row in the spreadsheet

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.20.0][nodejs] or higher + [Yarn 1.22.5][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/isaac-allef/cms-sheets.git

# Go into the repository
$ cd cms-sheets

# Install dependencies and run it
$ yarn install
$ yarn dev:server
```

## Routes

|             method           |               url               |               description              |
|:-----------------------------|:--------------------------------|:---------------------------------------|
| `get`                        | [/sheets/:docId](#list)         | Lists all spreadsheets in the document |
| `get`                        | [/sheets/:docId/:index](#find)  | Lists one spreadsheets in the document |
| `post`                       | [/sheets/:docId/:index](#add)   | Add one row in the spreadsheet         |
| `patch`                      | [/sheets/:docId/:index](#alter) | Update one row in the spreadsheet      |
| `delete`                     | [/sheets/:docId/:index](#drop)  | Delete one row in the spreadsheet      |

**All routes need this headers**:
```json
{
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]"
}
```

**Example**:

```json
{
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n"
}
```

## List

Lists all spreadsheets in the document.

**URL** : `/sheets/:docId`

**Method** : `GET`

**URL params**: `:docId -> [ID obtained from the google spreadsheet URL]`

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P`


### Success Response

**Code** : `200 OK`

**Content example**:

```json
{  
  "sheets": [
    {
      "index": 0,
      "data": [
        {
          "name": "Isaac",
          "age": "25",
          "birth day": "25/12/1995"
        },
        {
          "name": "lavinia",
          "age": "20",
          "birth day": "23/08/2000"
        }
      ]
    },
    {
      "index": 1,
      "data": [
        {
          "fruit": "banana",
          "color": "yellow"
        },
        {
          "fruit": "strawberry",
          "color": "red"
        }
      ]
    }
  ]   
}
```

<!--
### Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Unable to login with provided credentials."
    ]
}
```
-->

## Find

Lists one spreadsheets in the document.

**URL** : `/sheets/:docId/:index`

**Method** : `GET`

**URL params**: 
```
:docId -> [ID obtained from the google spreadsheet URL]
:index -> [spreadsheet index]
```

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P/0`


### Success Response

**Code** : `200 OK`

**Content example**:

```json
{  
  "sheet": {
    "index": 0,
    "data": [
      {
        "name": "Isaac",
        "age": "25",
        "birth day": "25/12/1995"
      },
      {
        "name": "lavinia",
        "age": "20",
        "birth day": "23/08/2000"
      }
    ]
  }
}
```

## Add

Add one row in the spreadsheet.

**URL** : `/sheets/:docId/:index`

**Method** : `POST`

**URL params**: 
```
:docId -> [ID obtained from the google spreadsheet URL]
:index -> [spreadsheet index]
```

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P/0`

**Data params**:

```json
{
    "rowValues": [
    {"[column name]": "[value]", "[column name]": [value]},
    {"[column name]": "[value]", "[column name]": [value]}
  ]
}
```

**Data params example**:

```json
{
    "rowValues": [
    {"name": "Dilma", "age": 53},
    {"name": "Pedro", "age": 56}
  ]
}
```

### Success Response

**Code** : `200 OK`

**Content example**:

```json
{  
  "rows": [
    {
      "name": "dilma",
      "age": "53"
    },
    {
      "name": "pedro",
      "age": "56"
    }
  ]
}
```

## Alter

Update one row in the spreadsheet.

**URL** : `/sheets/:docId/:index`

**Method** : `PATCH`

**URL params**: 
```
:docId -> [ID obtained from the google spreadsheet URL]
:index -> [spreadsheet index]
```

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P/0`

**Data params**:

```json
{
    "rowIndex": [row index],
    "columnsValues": [
      {"column": "[column name]", "value": "[new value]"},
      {"column": "[column name]", "value": "[new value]"}
    ]
}
```

**Data params example**:

```json
{
    "rowIndex": 2,
    "columnsValues": [
      {"column": "name", "value": "Isaac Allef"},
      {"column": "age", "value": "26"}
    ]
}
```

### Success Response

**Code** : `200 OK`

**Content example**:

```json
{  
  "rows": {
    "name": "Isaac Allef",
    "age": "26",
    "birth day": "25/12/1995"
  }
}
```

## Drop

Delete one row in the spreadsheet.

**URL** : `/sheets/:docId/:index`

**Method** : `PATCH`

**URL params**: 
```
:docId -> [ID obtained from the google spreadsheet URL]
:index -> [spreadsheet index]
```

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P/0`

**Data params**:

```json
{
    "rowIndex": [row index]
}
```

**Data params example**:

```json
{
    "rowIndex": 2
}
```

### Success Response

**Code** : `200 OK`

**Content example**:

```json
{  
  "row": {
    "name": "Isaac",
    "age": "25",
    "birth day": "25/12/1995",
    "_deleted": true
  }
}
```
## :memo: License
This project is under the MIT license. See the [LICENSE](LICENSE) for more information.

---

Made with ♥ by Isaac Allef :wave:

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
