import '../styles/globals.css';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import { theme } from '../theme';
import { Header, ContactUs, Footer } from '../components';
import {
  ContactUsType,
  FooterType,
  ScriptType,
  SocialMediaType
} from '../globals';
import { MenuType } from '../collections';

interface MyAppProps extends AppProps {
  menuList?: MenuType[];
  externalScripts?: string[];
  contactUs: ContactUsType;
  socialMedia: SocialMediaType;
  footer: FooterType;
}

const MyApp = ({
  Component,
  pageProps,
  menuList,
  externalScripts,
  contactUs,
  socialMedia,
  footer
}: MyAppProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        {externalScripts?.map((script) => (
          <script key={uuidv4()} dangerouslySetInnerHTML={{ __html: script }} />
        ))}
      </Helmet>
      {menuList && <Header menuList={menuList} />}
      <Component {...pageProps} />
      {isLargerThanMd && Object.keys(contactUs?.form).length && (
        <ContactUs {...contactUs} />
      )}
      <Footer socialMedia={socialMedia} footer={footer} />
    </ChakraProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [
    menuQuery,
    scriptsQuery,
    contactUsQuery,
    socialMediaQuery,
    footerQuery
  ] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menus?limit=100&locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/scripts?limit=100`
    ).then((res) => res.json()) as Promise<ScriptType | undefined>,
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/contactUs?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/socialMedia?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/footer?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json())
  ]);

  return {
    ...appProps,
    menuList: menuQuery.docs,
    externalScripts: scriptsQuery?.scripts?.map((script) => script.script),
    contactUs: contactUsQuery,
    socialMedia: socialMediaQuery,
    footer: footerQuery
  };
};
