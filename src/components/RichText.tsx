/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import escapeHTML from 'escape-html';
import { v4 as uuidv4 } from 'uuid';
import { Text as SlateText } from 'slate';
import {
  Image,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  chakra
} from '@chakra-ui/react';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { UploadedMediaType } from '../fields';

export interface RichTextContentType {
  text: string;
  type?: string;
  linkType?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  value?: UploadedMediaType;
  children?: RichTextContentType[];
}

export interface RichTextProps {
  content: RichTextContentType[];
}

const serialize = (
  nodes: RichTextContentType[],
  customIcon?: IconType
): (React.ReactElement | null)[] =>
  nodes.map((node) => {
    if (!node) {
      return null;
    }

    if (SlateText.isText(node)) {
      let text = (
        <Text
          dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
          as="span"
        />
      );

      if (node.bold) {
        text = (
          <Text key={uuidv4()} as="b">
            {text}
          </Text>
        );
      }

      if (node.code) {
        text = (
          <Text key={uuidv4()} as="code">
            {text}
          </Text>
        );
      }

      if (node.italic) {
        text = (
          <Text key={uuidv4()} as="i">
            {text}
          </Text>
        );
      }

      if (node.underline) {
        text = (
          <Text key={uuidv4()} as="u">
            {text}
          </Text>
        );
      }

      if (node.strikethrough) {
        text = (
          <Text key={uuidv4()} as="s">
            {text}
          </Text>
        );
      }

      return (
        <Text key={uuidv4()} as="span" my="0">
          {text}
        </Text>
      );
    }

    if (!(node as RichTextContentType).children) {
      return null;
    }

    switch ((node as RichTextContentType).type) {
      case 'h1':
        return (
          <h1 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h6>
        );
      case 'quote':
        return (
          <blockquote key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </blockquote>
        );
      case 'ul':
        return (
          <UnorderedList key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </UnorderedList>
        );
      case 'ol':
        return (
          <OrderedList key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </OrderedList>
        );
      case 'li':
        return (
          <ListItem key={uuidv4()}>
            {customIcon && (
              <ListIcon
                as={customIcon}
                color="background.blue"
                fontSize="2xl"
              />
            )}
            {serialize((node as RichTextContentType).children!)}
          </ListItem>
        );
      case 'link':
        return (
          <a
            key={uuidv4()}
            href={escapeHTML((node as RichTextContentType).url)}
          >
            {serialize((node as RichTextContentType).children!)}
          </a>
        );
      case 'upload':
        return (
          <Image
            key={uuidv4()}
            objectFit="cover"
            src={(node as RichTextContentType).value?.url}
            alt={(node as RichTextContentType).value?.alt}
            h="lg"
            w="full"
            borderRadius="lg"
          />
        );
      case 'check':
        return (
          <List key={uuidv4()} spacing={3}>
            {serialize((node as RichTextContentType).children!, FiCheck)}
          </List>
        );
      case 'check-circle':
        return (
          <List key={uuidv4()} spacing={3}>
            {serialize((node as RichTextContentType).children!, FiCheckCircle)}
          </List>
        );
      default:
        return (
          <Text key={uuidv4()} as="p">
            {serialize((node as RichTextContentType).children!)}
          </Text>
        );
    }
  });

export const RichText = ({ content }: RichTextProps) => (
  <chakra.div
    sx={{
      '&': {
        '& *': {
          my: '16px'
        },
        '& svg': {
          my: 0
        },
        '& a': {
          color: 'text.blue'
        }
      }
    }}
  >
    {serialize(content)}
  </chakra.div>
);
