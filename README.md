<p align="left">
   <img src="public/google-sheets-logo.png" width="400"/>
</p>

# CMS-Sheets
----
  It's a simple API RESTful to manipulate a google spreadsheet document.<br>
  In order use it, it's necessary to have somethings:
  - A google service account and your credentials;
  - A google spreadsheet document shared with your google service accout and it ID, got it from URL

## Routes

|             method           |             url             |               description              |
|:-----------------------------|:----------------------------|:---------------------------------------|
| `get`                        | /sheets/:docId              | Lists all spreadsheets in the document |
| `get`                        | /sheets/:docId/:index       | Lists one spreadsheets in the document |
| `post`                       | /sheets/:docId/:index       | Add one row in the spreadsheet         |
| `patch`                      | /sheets/:docId/:index       | Update one row in the spreadsheet      |
| `delete`                     | /sheets/:docId/:index       | Delete one row in the spreadsheet      |


## List

Lists all spreadsheets in the document.

**URL** : `/sheets/:docId`

**Method** : `GET`

**URL params**: `:docId -> [ID obtained from the google spreadsheet URL]`

**URL params example**: `/sheets/3yFTzSjpJlpyeLywd1ygY5MiG853f4PBnfaMtrZ63P`

**Data params**:

```json
{
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]"
}
```

**Data params example**:

```json
{
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n"
}
```

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

**Data params**:

```json
{
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]"
}
```

**Data params example**:

```json
{
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n"
}
```

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
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]",
    "rowValues": [
    {"[column name]": "[value]", "[column name]": [value]},
    {"[column name]": "[value]", "[column name]": [value]}
  ]
}
```

**Data params example**:

```json
{
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n",
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
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]",
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
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n",
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
    "client_email": "[google service account email]",
    "private_key": "[private key of the google service account]",
    "rowIndex": [row index]
}
```

**Data params example**:

```json
{
    "client_email": "someGoogleServiceAccount@gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nRANDOM_STRING\n-----END PRIVATE KEY-----\n",
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
