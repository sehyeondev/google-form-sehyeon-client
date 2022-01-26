import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'


function Home() {
  return (
    <div style={{margin:"10px"}}>
      <h1>Welcome!</h1>
      <Link href="signup">
        <button>Click here to signup</button>        
      </Link>
      <br/>
      <br/>
      <Link href="signin">
        <button>Click here to login</button>        
      </Link>
    </div>
  )
}

export default Home