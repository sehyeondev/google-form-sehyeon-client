import { useState } from 'react'
import Cookies from 'js-cookie'

export default function Signin () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const onSignout = async () => {
    alert("signout")
    
    Cookies.remove('jwtToken')
  }

  const getJwtToken = () => {
    const jwtToken = Cookies.get('jwtToken')
    console.log(jwtToken)
  }

  return (
    <div  style={{margin:"10px"}}>
      <input placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button onClick={() => onSignout()}>logout</button>
      <button onClick={() => getJwtToken()}>jwtToken</button>
    </div>
  )
}