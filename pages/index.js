import Link from 'next/link'

function Home() {
  return (
    <ul>
    <li>
        <Link href="/form/create">
          <a>Go to create page</a>
        </Link>
      </li>
      <li>
        <Link href="/form/result/1">
          <a>Go to sample result page</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home