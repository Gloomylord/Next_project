export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Component {...pageProps}/>
            <style jsx global>{`
        html,
        body {
          font-family: Open Sans;
          padding: 0;
          margin: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
        </>
    )
}