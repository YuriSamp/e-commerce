import { Html, Head, Main, NextScript } from 'next/document'

//incluir o title

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}