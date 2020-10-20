import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
                          rel="stylesheet"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
