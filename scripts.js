// Signup a new user test script =============================================
/*
const res = await fetch('http://localhost:3000/api/v1/user/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'mheino', password: 'archie' }),
})

console.log(await res.json())
*/
/*
// Login test script ========================================================
const res = await fetch('http://localhost:3000/api/v1/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'mheino', password: 'archie' }),
})

console.log(await res.json())
*/

fetch('http://localhost:3000/api/v1/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGVjZmZlYzVjMzQ5MDI4ZTQ0NjE1YmYiLCJpYXQiOjE3NjAzNjI1MDUsImV4cCI6MTc2MDQ0ODkwNX0.E_2Dbec47Mm4GdnZvV5INvwqKEDiaqqFtKJCyb7p2so',
  },
  body: JSON.stringify({ title: 'Test Post' }),
})
  .then((res) => res.json())
  .then(console.log)
