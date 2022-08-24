import { useState } from "react"

import Head from "next/head"

export const getServerSideProps = async (context) => {
  console.log(context.query)
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
  const [phoneInfo, setInfo] = useState(null)

  return (
    <>
      <Head>
        <title>{phoneName}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <a href={link}>{phoneName}</a>
    </>
  )
}