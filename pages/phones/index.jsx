import { useState } from "react";
import Image from 'next/image'

import styles from '../../styles/Phone.module.css'
import search from '../../assets/akar-icons_search.svg';

export default function Phones() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('/api/phones', { method: 'GET', mode: 'same-origin' })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setData(data.result)
  //       setLoading(false)
  //     })
  // }, [])

  // if (isLoading || data === null) return <p>Still Loading, Please Wait</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>SmartSearch</h2>
      <div className={styles.searchBar}>
        <Image
          src={search}
          alt="search icon"
          width={20}
          height={20}
          className="searchIcon"
        />
        <input type="text" name="search" placeholder="What's Your Favourite Phone Brand?" />
      </div>
      <div>

      </div>
      {/* <ul>
        {data?.map((item, i) => (
          <div key={i}>
            <li>
              <Image
                src={item.image}
                alt={item.phoneName}
                layout="fill"
              />
            </li>
            <li>
              {item.phoneName}
            </li>
          </div>
        ))}
      </ul> */}
    </div>
  )
}

