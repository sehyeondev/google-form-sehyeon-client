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
        <Link href="/form/abc">
          <a>Go to pages/form/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href="/form/abc?foo=bar">
          <a>Also goes to pages/form/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href="/form/abc/a-comment">
          <a>Go to pages/form/[pid]/[comment].js</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home