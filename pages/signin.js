import { useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'


export default function Signin () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);

  const onSignin = async () => {
    // alert("signin")
    const url = "https://valley.sehyeondev.com/api/user/signin"
    // const url = "http://localhost:8000/api/user/signin"

    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password, username: username})
    })

    const content = await rawResponse.json();
    console.log(content)
    if (!content.success) {
      alert(content.message)
      return
    }
    alert(content.message)
    setLoggedIn(true)
    Cookies.set('jwtToken', content.user.accessToken)

    console.log(content.user.accessToken) //jwtToken
  }

  const getJwtToken = () => {
    const jwtToken = Cookies.get('jwtToken')
    console.log(jwtToken)
  }

  return (
    <div  style={{margin:"10px"}}>
      <h1>Login Page</h1>
      <input placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button onClick={() => onSignin()}>login</button>
      {/* <button onClick={() => getJwtToken()}>jwtToken</button> */}
      {
        loggedIn && <div>
          <br/>
          <div>You are logged in</div>
          <br/>
          <Link href="/form/2">
            <a>Click here to submit answer 2022.01.21</a>
          </Link>
          <br/>
          <br/>
          <Link href="/">
            <a>Click here to go Homepage</a>
          </Link>
        </div>
      }
      {
        !loggedIn && <div>
        <br/>
          <div>You are not logged in</div>
          <br/>
          <Link href="/signup">
            <a>Click here to signup</a>
          </Link>
        </div>
      }
    </div>
  )
}