import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'


function Home() {
  return (
    <div style={{margin:"10px"}}>
      <Link href="signup">
        <a>signup</a>        
      </Link>
      <br/>
      <Link href="signin">
        <a>login</a>        
      </Link>
    </div>
  )
}

export default Home