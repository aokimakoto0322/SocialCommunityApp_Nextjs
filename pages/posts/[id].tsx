import { GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from 'next/head';
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";


type PostProps = {
    id: String
}

const Post: NextPage<PostProps> = (props) => {
    const {id} = props
    const router = useRouter()

    if (router.isFallback) {
        //フォールバック向けページ
        //TODO: フォールバックとはどのような状態の事なのか調べること
        return <div>Loading...</div>
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
                <p>{`/posts/${id}に対応するページです`}</p>
            </main>
        </div>
    )
}

//GetStaticPathは生成したいページのパスパラメータを組み合わせて返す
//このファイルはpages/post/[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {

    //それぞれのページのパスパラメータをまとめたもの
    const paths = [
        {
            params: {
                id: '1'
            }
        },
        {
            params: {
                id: '2'
            }
        },
        {
            params: {
                id: '3'
            }
        },
    ]

    //fallbackをfalseにすると、pathで定義されたページ以外は404ページを表示する
    return {paths, fallback: false}
}

//パラメータの型定義
interface PostParams extends ParsedUrlQuery {
    id: string
}

//getStaticPath実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
    return {
        props: {
            //paramsにgetStaticPathに設定した値がそれぞれ入っている
            id: context.params!['id']
        }
    }
}

export default Post