import { useEffect, useState } from "react"

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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/phone?link=${link}`)
      .then(res => res.json())
      .then(data => {
        setInfo(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [link])


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
            <Image
              src={image}
              alt={phoneName}
              width={200}
              height={250}
              quality={100}
            />
            {isLoading ? <div>Loading Phone details</div> : (
              <section className={styles.details}>
                <div>
                  <h3>Price:</h3>
                  <p>{phoneInfo.Price ? phoneInfo.Price : 'Not available'}</p>
                </div>

                <div>
                  <h3>Storage:</h3>
                  <p>{phoneInfo.Storage ? phoneInfo.Storage : 'Not available'}</p>
                </div>

                <div>
                  <h3>Camera:</h3>
                  <p>{phoneInfo['Main Camera'] ? phoneInfo['Main Camera'].replaceAll('<br>', ' ') : 'Not available'}</p>
                </div>

                <div>
                  <h3>Battery:</h3>
                  <p>{phoneInfo.Battery ? phoneInfo.Battery : 'Not available'}</p>
                </div>

                <div>
                  <h3>Display:</h3>
                  <p>{phoneInfo.Display ? phoneInfo.Display : 'Not available'}</p>
                </div>

                <div>
                  <h3>Platform:</h3>
                  <p>{phoneInfo.Platform ? phoneInfo.Platform : 'Not available'}</p>
                </div>

                <div>
                  <h3>Features:</h3>
                  <p>{phoneInfo.Features ? phoneInfo.Features : 'Not available'}</p>
                </div>

                <div>
                  <h3>Sound:</h3>
                  <p>{phoneInfo.Sound ? phoneInfo.Sound : 'Not available'}</p>
                </div>
              </section>)}

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