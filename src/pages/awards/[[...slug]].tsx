import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType, PostType } from '../../collections';
import { getCustomPageDataByCondition, getPageBySlug } from '../../api';
import NotFound from '../not-found';
import { CardGroup, CardItem, Head, Hero, Template } from '../../components';

export interface AwardsProps {
  page: PageType | null;
  data: PostType[];
}

const Awards = ({ page, data }: AwardsProps) => {
  if (page === null) return <NotFound />;

  const cardGroupItems = data.map((item) => {
    const { category, featuredImage, publishDate, name, slug } = item;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title: name,
      category,
      callToAction: {
        label: 'Read More',
        type: 'page',
        page: {
          ...item,
          slug: `/award/${slug}`,
          content: undefined
        }
      }
    };

    return cardItem;
  });

  return (
    <>
      <Head
        title={page.meta?.title || page.name}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      <Hero
        {...page.hero}
        breadcrumbs={page.breadcrumbs}
        activeSlug={page.slug}
      />
      {page.content && Object.keys(page.content).length > 0 && (
        <Template backgroundColor="gray" width="100%">
          <CardGroup items={cardGroupItems} />
        </Template>
      )}
    </>
  );
};

export default Awards;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, data] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: 'awards',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition: `[group.slug][equals]=award`,
      locale,
      defaultLocale
    })
  ]);

  return {
    props: {
      page: page.docs[0] || null,
      data: data.docs
    }
  };
};
