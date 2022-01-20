import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'


function Home() {
  return (
    <div style={{margin:"10px"}}>
      <h1>Welcome!</h1>
      <Link href="signup">
        <a>Click here to signup</a>        
      </Link>
      <br/>
      <br/>
      <Link href="signin">
        <a>Click here to login</a>        
      </Link>
    </div>
  )
}

export default Home