import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Head from 'next/head';
import { useRouter } from "next/router";

//nextjsを使ったリンク
import Link from 'next/link';

type ISRProps = {
    message: string
}

const ISR: NextPage<ISRProps> = (props) => {
    const { message } = props

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="ico" href="/favicon.ico"></link>
            </Head>

            <main>
                <p>
                    このページはISRによってビルド時に生成されたページです。
                </p>
                <p>{message}</p>

                <Link href={{pathname: "/ssg", query: {keyword: "fromisrpage"}}}>Go To SSG</Link>
            </main>
        </div>
        //queryにkeyとvalueを指定するとGetパラメーターに追加される
    )
}

export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にこのページのgetStaticPropsが実行されました`

    return {
        props: {
            message
        },
        //ページの有効期限を秒単位で指定
        revalidate: 60
    }
}

export default ISR