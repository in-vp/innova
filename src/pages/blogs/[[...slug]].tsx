import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { PageType, PostType } from '../../collections';
import { getCustomPageDataByCondition, getPageBySlug } from '../../api';
import NotFound from '../not-found';
import {
  AutoPosition,
  BackgroundColor,
  CardGroup,
  CardItem,
  Head,
  Hero
} from '../../components';

export interface BlogsProps {
  pageData: PageType | null;
  data: PostType[];
}

const Blogs = ({ pageData, data }: BlogsProps) => {
  if (pageData === null) return <NotFound />;

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
          slug: `/blog/${slug}`,
          layout: []
        }
      }
    };

    return cardItem;
  });

  return (
    <>
      <Head
        title={pageData.meta?.title || pageData.name}
        description={pageData.meta?.description}
        keywords={pageData.meta?.keywords}
        noIndex={pageData.meta?.noIndex}
      />
      <Hero
        {...pageData.hero}
        breadcrumbs={pageData.breadcrumbs}
        activeSlug={pageData.slug}
      />
      <BackgroundColor bgColor={pageData.backgroundColor}>
        <AutoPosition>
          <Flex w={{ base: 'full', md: pageData.width }}>
            <CardGroup items={cardGroupItems} />
          </Flex>
        </AutoPosition>
      </BackgroundColor>
    </>
  );
};

export default Blogs;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale
}) => {
  const [pageData, data] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: 'blogs',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition: `[group.slug][equals]=blog`,
      locale,
      defaultLocale
    })
  ]);

  return {
    props: {
      pageData: pageData.docs[0] || null,
      data: data.docs
    }
  };
};
