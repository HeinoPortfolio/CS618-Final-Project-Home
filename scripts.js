// Signup a new user test script =============================================
/*
const res = await fetch('http://localhost:3000/api/v1/user/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'mheino', password: 'archie' }),
})

console.log(await res.json())
*/

// Login test script ========================================================
const res = await fetch('http://localhost:3000/api/v1/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'mheino', password: 'archie' }),
})

console.log(await res.json())
