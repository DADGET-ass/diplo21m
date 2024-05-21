import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import favicon from '@/public/favicon.png';
import { IMeta } from './meta.interface';


const getTitle = (title: string) => `${title} | АТК ДГТУ`;

const Meta: FC<PropsWithChildren<IMeta>> = ({ title, description, type, children }) => {
    return (
        <>
            <Head>
                <title>{getTitle(title)}</title>
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="format-detection" content="telephone=no"/>
                {/* ?<meta name="theme-color" content='#242A2F'/> */}
                <link rel="shortcut icon" href={"/favicon.png"} type="image/x-icon" />
                {
                    description ? (
                        <>
                            <meta name='description' content={description} />
                            <meta name='og:title' content={getTitle(title)} />
                            <meta name='og:description' content={getTitle(title)} />
                        </>
                    ) : (
                        <>
                            <meta name='robots' content='noindex, nofollow' />
                        </>
                    )
                }
            </Head>
            {children}
        </>
    );
};

export default Meta;