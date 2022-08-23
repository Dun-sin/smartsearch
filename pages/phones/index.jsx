import { useRef, useState } from "react";
import Image from 'next/image'

import styles from '../../styles/Phone.module.css'
import search from '../../assets/akar-icons_search.svg';

export default function Phones() {
  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState({})

  const inputPhoneRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getPhones(inputPhoneRef.current.value)
      inputPhoneRef.current.value = ''
    }
  }

  async function getPhones(phone) {
    let response = await fetch(`http://localhost:3000/api/phones?phone=${phone}`, {
      method: "GET",
    });

    let data = await response.json();
    setResult(data)
    setLoading(true)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>SmartSearch</h2>
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
          {isLoading ? result.map(({ image, link, phoneName }, id) => (
            <a key={id} href={link} className={styles.phone} target="_blank" rel="noreferrer">
              <Image
                src={image}
                alt={phoneName}
                width={50}
                height={50}
              />
              <p>{phoneName}</p>
            </a>))
            : <div>Still loarding</div>}
        </div>
      </section>
    </div>
  )
}

