import Head from 'next/head';
import Link from 'next/link'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SmartSearch</title>
        <meta name='description' content='Find the right phone for you' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <h2><span>S</span>mart<span>S</span>earch</h2>

        <div>
          <Link href="/">Login</Link>
          <Link href="/">
            <div>
              SignUp
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section>
          <h1>Find the <span>Right</span><br />smartphone for you</h1>
          <p>Get the phone that fits your life.</p>
          <div>Start Here</div>
        </section>
      </main>
    </div>
  );
}
