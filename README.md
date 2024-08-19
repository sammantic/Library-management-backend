# Library-management-backend
Backend for a Library management system, It's written in NodeJs, Express, and MongoDB.

## API
the backend is exposing REST API for Books, Authors, Users

### Books
- Get all books
GET http://localhost:5000/api/books/
- GET book by ID
http://127.0.0.1:5000/api/books/:id
- POST add new book
```json
http://127.0.0.1:5000/api/books/
{
    "title": "The Forty Rules Of Love",
    "author": "66a8bd4168d518abd1e3f72d",
    "description": "description 1",
    "price": 12,
    "cover": "hard cover"
}
```
- PUT update a book
```json
http://127.0.0.1:5000/api/books/:id
{
	"description":"about this book"
}
```
- DELETE delete a book
http://127.0.0.1:5000/api/books/:id

### Author
- GET all authors
http://127.0.0.1:5000/api/authors
- GET author by id
http://127.0.0.1:5000/api/authors:id
- POST add new author
```json
http://127.0.0.1:5000/api/authors
{
	"firstName": "Elif",
    "lastName": "Shafak",
    "nationality": "Turky"
}
```
- PUT update a author by id
```json
http://127.0.0.1:5000/api/authors/66a8bafec807a4aa70359eac
{
    "firstName": "updated author 1",
    "lastName": "updated last name author 1"
}
```
- DELETE delete author by id
http://127.0.0.1:5000/api/authors/66a8bafec807a4aa70359eac

### Users
- POST Login user
```json
http://127.0.0.1:5000/api/auth/login
{
	"email": "max@lib.com",
    "password": "1234567"
}
```
- POST Register new user
```json
http://127.0.0.1:5000/api/auth/register

{
	"email": "max@lib.com",
    "username": "max",
    "password": "123456"
}
```
- PUT update a user by id
Header token="your-JWT-token"
```json
http://127.0.0.1:5000/api/user/66c0a7d5c133d2dc74aec0fd
{
	"username": "Semax",
    "password": "1234567"
}
```
- Delete a user by ID
Header Token="your-JWT-Token"
```json
http://127.0.0.1:5000/api/user/66c0a7d5c133d2dc74aec0fd
```
