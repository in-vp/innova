import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PostType } from '../../collections';
import { Content, Head, Hero } from '../../components';
import NotFound from '../not-found';
import { getCustomPageDataBySlug } from '../../api';

interface BlogProps {
  data: PostType | null;
}

const Blog = ({ data }: BlogProps) => {
  if (data === null) return <NotFound />;

  return (
    <>
      <Head
        title={data.meta?.title || data.name}
        description={data.meta?.description}
        keywords={data.meta?.keywords}
        noIndex={data.meta?.noIndex}
      />
      <Hero
        {...data.hero}
        breadcrumbs={data.breadcrumbs}
        activeSlug={data.slug}
      />
      <Content
        blockType="content"
        columns={[{ content: data.content, textAlign: 'left' }]}
        backgroundColor={data.backgroundColor}
        width={data.width}
      />
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug)
      ? params.slug.join('/')
      : 'blogs';

  const data = await getCustomPageDataBySlug<PaginatedDocs<PostType>>({
    endpoint: 'posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      data: data.docs[0] || null
    }
  };
};
