import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Home() {
  const hidden = false;
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
        <div className={cx({
          hidden: true,
          flag: true,
        })}> sample </div>
      </ul>
  )
}

export default Home