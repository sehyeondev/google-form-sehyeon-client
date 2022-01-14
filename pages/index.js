import Link from 'next/link'
import Head from 'next/head'

function Home() {
  return (
    // <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <ul>
      <li>
          <Link href="/form/create">
            <a>Go to create page</a>
          </Link>
        </li>
        <li>
          <Link href="/result/1">
            <a>Go to sample result page</a>
          </Link>
        </li>
      </ul>
  )
}

export default Home