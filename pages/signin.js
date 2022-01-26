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
    const url = "https://sehyeondev.com/api/user/signin"
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
          <h3>You are logged in</h3>
          
          <div style={{marginBottom: 10}}>Click form title</div>
          <Link href="/form/10">  
            <button>DeathValley Survey</button>
          </Link>
          <br/>
          <br/>
          <br/>
          <Link href="/">
            <button>Go to Homepage</button>
          </Link>
        </div>
      }
      {
        !loggedIn && <div>
        <br/>
          <h3>You are not logged in</h3>
          <br/>
          <Link href="/signup">
            <button>Click here to signup</button>
          </Link>
        </div>
      }
    </div>
  )
}