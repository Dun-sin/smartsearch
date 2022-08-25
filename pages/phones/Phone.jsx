import { useState } from "react"

import Head from "next/head"
import Image from "next/image"

import styles from '../../styles/Phone.module.css'

export const getServerSideProps = async (context) => {
  const result = context.query

  return {
    props: {
      image: result.image,
      link: result.link,
      phoneName: result.phoneName
    }
  }
}

export default function PhonePage({
  image, link, phoneName
}) {
  const [phoneInfo, setInfo] = useState({})

  return (
    <>
      <Head>
        <title>{phoneName}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.phoneType}>
        <h1>{phoneName}</h1>

        <section>
          <article>
            <div style={{ width: "calc(20vw + 2rem)", height: "60vh", position: "relative" }}>
              <Image
                src={image}
                alt={phoneName}
                objectFit="contain"
                layout="fill"
                quality={100}
              />
            </div>

            <section style={{ marginLeft: "10px" }}>
              <div>
                <h3>Price:</h3>
                <p>{phoneInfo.price ? '' : 'Not available'}</p>
              </div>

              <br />

              <div>
                <h3>Storage:</h3>
                <p>{phoneInfo.storage ? '' : 'Not available'}</p>
              </div>

              <br />

              <div>
                <h3>Camera:</h3>
                <p>{phoneInfo.camera ? '' : 'Not available'}</p>
              </div>

              <br />

              <div>
                <h3>Battery:</h3>
                <p>{phoneInfo.battery ? '' : 'Not available'}</p>
              </div>

              <br />

              <div>
                <h3>Display:</h3>
                <p>{phoneInfo.display ? '' : 'Not available'}</p>
              </div>

              <br />

              <div>
                <h3>Popularity:</h3>
                <p>{phoneInfo.popularity ? '' : 'Not available'}</p>
              </div>
            </section>
          </article>

          <aside>
            <h2>Reviews</h2>
            <article>
              {phoneInfo.reviews ? '' : 'oops, Looks like no one is talking about this phone'}
            </article>
          </aside>
        </section>
      </main>
    </>
  )
}