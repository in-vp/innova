import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex, Image, Text } from '@chakra-ui/react';
import { PostType } from '../../collections';
import {
  CardGroup,
  CardItem,
  Content,
  Head,
  Hero,
  Template
} from '../../components';
import Custom404 from '../404';
import {
  getCustomPageDataByCondition,
  getCustomPageDataBySlug
} from '../../api';

interface BlogProps {
  data: PostType | null;
  relatedData: PostType[];
}

const Blog = ({ data, relatedData }: BlogProps) => {
  if (data === null) return <Custom404 />;

  const cardGroupItems = relatedData.map((item) => {
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
          content: undefined
        }
      }
    };

    return cardItem;
  });

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
      {data.featuredImage && (
        <Template
          backgroundColor={data.backgroundColor}
          width={data.width}
          maxWidth="890px"
        >
          <Image
            objectFit="cover"
            src={data.featuredImage.url}
            alt={data.featuredImage.alt}
            h="lg"
            w="full"
            borderRadius="lg"
          />
        </Template>
      )}
      <Content
        blockType="content"
        columns={[{ content: data.content, align: 'left' }]}
        backgroundColor={data.backgroundColor}
        width={data.width}
        maxWidth="890px"
      />
      {relatedData.length > 0 && (
        <Template backgroundColor="background.secondary" width="100%">
          <Flex w="full" direction="column" gap={7}>
            <Text color="text.primary" fontSize="xl" fontWeight="semibold">
              İlgili Postlar
            </Text>
            <CardGroup items={cardGroupItems} />
          </Flex>
        </Template>
      )}
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
    endpoint: `${locale}-blogs`,
    slug,
    locale,
    defaultLocale
  });

  let relatedData;

  if (data.totalDocs > 0) {
    const condition = slug
      ? `[group.slug][equals]=blog&where[category.slug][equals]=${data.docs[0].category?.slug}`
      : `[group.slug][equals]=blog`;

    relatedData = await getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: `${locale}-blogs`,
      condition,
      locale,
      defaultLocale
    });
  }

  return {
    props: {
      data: data.docs[0] || null,
      relatedData: relatedData?.docs || []
    }
  };
};
