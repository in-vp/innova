/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import formBuilder from '@payloadcms/plugin-form-builder';
import { Category, Media, Page, Post, PostGroup, User } from './collections';
import { Footer, Menu, NotFound, SocialMedia } from './globals';
import { Logo } from './icons';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: process.env.CORS_ORIGIN?.split('') || '*',
  graphQL: {
    disable: true
  },
  collections: [Category, PostGroup, Post, Page, Media, User],
  globals: [Menu, SocialMedia, Footer, NotFound],
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  },
  i18n: {
    debug: false,
    supportedLngs: ['en', 'tr'],
    fallbackLng: 'tr'
  },
  admin: {
    user: User.slug,
    meta: {
      titleSuffix: '- İnnova',
      favicon: '/images/logo-icon.svg',
      ogImage: '/images/logo.svg'
    },
    components: {
      graphics: {
        Logo,
        Icon: Logo
      }
    }
  },
  plugins: [
    formBuilder({
      formOverrides: {},
      formSubmissionOverrides: {},
      redirectRelationships: [Page.slug]
    }),
    redirects({
      collections: [Post.slug, Page.slug]
    }),
    seo({
      collections: [Post.slug, Page.slug],
      generateTitle: ({ doc }: any) => `İnnova - ${doc.title.value}`,
      generateDescription: ({ doc }: any) => doc.excerpt.value
    }),
    nestedDocs({
      collections: [Post.slug, Page.slug],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, page) => (page.title as string) || '',
      generateURL: (pages) =>
        pages.reduce((url, page) => `${url}/${page.slug}`, '')
    })
  ]
});
