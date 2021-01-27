# cms-sheets
----
  It's a simple API RESTful to manipulate a google spreadsheet document.<br>
  In order use it, it's necessary to have somethings:
  - A google service account and your credentials;
  - A google spreadsheet document shared with your google service accout and it ID, got it from URL

## Routes

|             method           |             url             |               description              |
|:-----------------------------|:----------------------------|:---------------------------------------|
| `get`                        | /sheets/:docId              | Lists all spreadsheets in the document |
| `get`                        | /sheets/:docId/:index       |
| `post`                       | /sheets/:docId/:index       |
| `patch`                      | /sheets/:docId/:index       |
| `delete`                     | /sheets/:docId/:index       |


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
