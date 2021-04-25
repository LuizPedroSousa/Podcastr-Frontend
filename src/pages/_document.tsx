import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps
} from 'next/document'

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="UTF-8" />
          <meta property="og:locale" content="pt_BR"/>
          <meta name="author" content="Luiz Pedro" />
          <meta name="twitter:image:width" content="860" />
          <meta name="twitter:image:height" content="630" />
          <meta property="og:image:width" content="860" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Podcastr" />
          <meta name="twitter:image:alt" content="Podcastr" />
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg-icon" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
