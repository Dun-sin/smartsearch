import { useRef, useState, useEffect } from "react";

import Image from 'next/image'
import Head from "next/head";
import Link from "next/link";

import styles from '../../styles/Phone.module.css'
import search from '../../assets/akar-icons_search.svg';
import logo from '../../assets/logo.png'

export default function Phones() {
  const [content, setContent] = useState('nothing')
  const [result, setResult] = useState({})

  const inputPhoneRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('result')) {
      console.log(sessionStorage.getItem('result'))
      setResult(JSON.parse(sessionStorage.getItem('result')))
      setContent('available')
    }
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getPhones(inputPhoneRef.current.value)
      inputPhoneRef.current.value = ''
    }
  }

  async function getPhones(phone) {
    setContent('searching')
    let response = await fetch(`/api/phones?phone=${phone}`, {
      method: "GET",
    });

    let data = await response.json();
    sessionStorage.setItem('result', JSON.stringify(data))
    setResult(data)
    setContent('available')
  }

  function handleDisplayContent() {
    switch (content) {
      case 'nothing':
        return <div>Nothing to see yet, try searching...</div>
      case 'searching':
        return <div>Please wait..</div>
      case 'available':
        return result.map(({ image, link, phoneName }, id) => (
          <Link key={id} href={{
            pathname: "/phones/Phone",
            query: {
              image,
              link,
              phoneName
            }
          }} >
            <div className={styles.phone}>
              <Image
                src={image}
                alt={phoneName}
                width={50}
                height={50}
              />
              <p >{phoneName}</p>
            </div>
          </Link>))
    }
  }

  return (
    <>
      <Head>
        <title>Search a Phone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.container}>
        <header className={styles.header}>
          <Image
            src={logo}
            height={150}
            width={150}
            alt="SmartSearch"
          />
          <div className={styles.searchBar}>
            <Image
              src={search}
              alt="search icon"
              width={20}
              height={20}
              className="searchIcon"
            />
            <input type="text" name="search" placeholder="What's Your Favourite Phone Brand?" ref={inputPhoneRef} onKeyPress={handleKeyPress} />
          </div>
        </header>
        <section className={styles.result}>
          <h2>Results</h2>
          <div>
            {handleDisplayContent()}
          </div>
        </section>
      </main>
    </>
  )
}

