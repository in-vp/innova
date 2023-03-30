import { CollectionConfig } from 'payload/types';
import {
  Content,
  MediaBlock,
  MediaBlockType,
  MediaContent,
  MediaContentType,
  MediaSlider,
  MediaSliderType
} from '../blocks';
import { Meta, Slug } from '../fields';
import { ContentProps as ContentType } from '../components';

export type PageLayout =
  | MediaContentType
  | ContentType
  | MediaSliderType
  | MediaBlockType;

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [MediaContent, Content, MediaSlider, MediaBlock]
    },
    Slug,
    Meta
  ]
};
