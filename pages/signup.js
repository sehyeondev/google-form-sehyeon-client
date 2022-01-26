import { useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'

export default function Signup () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const getJwtToken = () => {
    const jwtToken = Cookies.get('jwtToken')
    console.log(jwtToken)
  }

  const onSignup = async () => {
    // alert("signup")
    const url = "https://sehyeondev.com/api/user/signup"
    // const url = "http://localhost:8000/api/user/signup"

    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password, username: username})
    })

    const content = await rawResponse.json();

    if (!content.success) {
      alert(content.message + "! go to login page")
    } else {
      alert("signup success")
    }

    console.log(content)
    window.location.href=`/signin`
  }

  return (
    <div  style={{margin:"10px"}}>
    <h1>Signup Page</h1>
      <input placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button onClick={() => onSignup()}>signup</button>
      {/* <button onClick={() => getJwtToken()}>jwtToken</button> */}
      <br/>
      <br/>
      <div>If you already have an account</div>
      <Link href="/signin">
        <a>Click here to go login page</a>
      </Link>
    </div>
  )
}