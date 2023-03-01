import { GetServerSideProps, NextPage } from "next";
import Head from 'next/head';

type SSRProps = {
    message: string
}

//処理①
const SSR: NextPage<SSRProps> = (props) => {
    const { message } = props

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>

            <main>
                <p>このページはサーバーサイドレンダリングによってアクセス時にサーバーで描画されたページです</p>

                <p>{message}</p>
            </main>
        </div>
    )
}

//処理②
export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にこのページのgetServerSidePropsが実行されました。`

    console.log(message)

    return {
        props: {
            message
        }
    }
}

//実行順
// 処理②　→　処理①

export default SSR