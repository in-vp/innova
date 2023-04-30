/* eslint-disable no-console */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { SERVER_URL } = publicRuntimeConfig;

const BASE_URL = `${SERVER_URL}/api`;

export const getCustomPageDataBySlug = async <T>({
  endpoint,
  slug,
  locale,
  defaultLocale
}: {
  endpoint: string;
  slug: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${BASE_URL}/${endpoint}?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getPageBySlug = async <T>({
  slug,
  locale,
  defaultLocale
}: {
  slug: string;
  locale?: string;
  defaultLocale?: string;
}) =>
  getCustomPageDataBySlug<T>({
    endpoint: 'pages',
    slug,
    locale,
    defaultLocale
  });

export const getCustomPageData = async <T>({
  endpoint,
  locale,
  defaultLocale
}: {
  endpoint: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${BASE_URL}/${endpoint}?locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getCustomPageDataByCondition = async <T>({
  endpoint,
  condition,
  locale,
  defaultLocale
}: {
  endpoint: string;
  condition: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${BASE_URL}/${endpoint}?where${condition}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getAll = async <T>({ endpoint }: { endpoint: string }) => {
  const query = await fetch(`${BASE_URL}/${endpoint}`);

  const data: T = await query.json();

  return data;
};
