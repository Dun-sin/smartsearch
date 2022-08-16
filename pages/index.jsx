import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SmartSearch</title>
        <meta name='description' content='Find the right phone for you' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <p className={`${styles.headerText}`}><span>S</span>mart<span>S</span>earch</p>

        <div>
          <Link href="/">
            <span className={styles.headerText}>Login</span>
          </Link>
          <Link href="/">
            <span>
              SignUp
            </span>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <p>Find the <span>RIGHT</span><br />smartphone for you</p>
          <p>Get the phone that fits your life.</p>
          <Link href="/">
            <div>Start Here</div>
          </Link>
        </section>

        {/* <Image
          loading='lazy'
          src="/assets/landing-page-image.png"
          alt='3d phone illustration'
          quality='100'
          height='500'
          width='600'
        /> */}
      </main>
    </div>
  );
}
