#### Things to do:

- We could add a description to the job like in a modal for example with a button. than can be object itselft, like salary, requerimients, description, etc.
- we could add the date that the user select, instead of the default date which is the current date.
- For search we could use algolia for example to look for jobs descriptions, etc
- the createdAt could be at right bottom in small letters.. to show where the job was added.
- ADD A MESSAGE LIKE A MODAL WHEN THE USER LOGIN WITH TEST USER SAYING IS READ ONLY AND is not going be able to add jobs, etc
- the fact you can choose between differents chart is not very clear, see can I can do about it. in the stats page, below monthly applications
- ADD A MEANINFUL DESCRIPTION OF THE APP THE LANDING

#### 24) HTTP Methods

- GET - get resources from the server
- POST - submit resource to the server
- PUT/PATCH - modify resource on the server
- DELETE - delete resource form the server

```js
// GET
axios.get(url, options);
// POST
axios.post(url, resource, options);
// PATCH
axios.patch(url, resource, options);
// DELETE
axios.delete(url, options);
```

```sh
npm install axios
```

#### 25) API

- Root URL
- https://jobify-prod.herokuapp.com/api/v1/toolkit

- NODE COURSE

###### Register USER

- https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register

- POST /auth/register
- {name:'john',email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Register USER - TESTING()

- POST /auth/testingRegister
- {name:'john',email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Login USER

- POST /auth/login
- {email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Update USER

- PATCH /auth/updateUser
- { email:'john@gmail.com', name:'john', lastName:'smith', location:'my location' }
- sends back the user object with token
