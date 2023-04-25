import { CollectionConfig } from 'payload/types';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import {
  FullTitle,
  Hero,
  HeroType,
  Meta,
  MetaType,
  Slug,
  ParentPage,
  Breadcrumbs,
  BackgroundColor,
  Width,
  BackgroundColorType,
  WidthType
} from '../fields';
import {
  Accordion,
  AccordionType,
  Content,
  ContentCardGroup,
  ContentCardGroupType,
  ContentType,
  DocumentDownloaderGroup,
  DocumentDownloaderGroupType,
  DotSlider,
  DotSliderType,
  ImageDownloaderGroup,
  ImageDownloaderGroupType,
  ImageTagGroup,
  ImageTagGroupType,
  MediaContent,
  MediaContentType,
  TabGroup,
  TabGroupType,
  TagGroup,
  TagGroupType
} from '../blocks';
import { regeneratePage } from '../utils';

export type PageLayout =
  | AccordionType
  | ImageTagGroupType
  | TagGroupType
  | ContentType
  | MediaContentType
  | TabGroupType
  | DotSliderType
  | DocumentDownloaderGroupType
  | ImageDownloaderGroupType
  | ContentCardGroupType;

export type PageBlockType =
  | AccordionType['blockType']
  | ImageTagGroupType['blockType']
  | TagGroupType['blockType']
  | ContentType['blockType']
  | MediaContentType['blockType']
  | TabGroupType['blockType']
  | DotSliderType['blockType']
  | DocumentDownloaderGroupType['blockType']
  | ImageDownloaderGroupType['blockType']
  | ContentCardGroupType['blockType'];

export interface PageType {
  slug: string;
  title: string;
  fullTitle: string;
  hero: HeroType;
  backgroundColor: BackgroundColorType;
  width: WidthType;
  breadcrumbs: Breadcrumb[];
  meta: MetaType;
  layout: PageLayout[];
}

export const Page: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'parent', 'createdAt', 'updatedAt']
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        regeneratePage({
          collection: 'pages',
          doc
        });
      }
    ]
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [Hero]
        },
        {
          label: 'Content',
          fields: [
            BackgroundColor,
            Width,
            {
              name: 'layout',
              label: 'Layout',
              type: 'blocks',
              // minRows: 1,
              blocks: [
                Accordion,
                ImageTagGroup,
                TagGroup,
                Content,
                MediaContent,
                TabGroup,
                DotSlider,
                DocumentDownloaderGroup,
                ImageDownloaderGroup,
                ContentCardGroup
              ]
            }
          ]
        }
      ]
    },
    FullTitle,
    Breadcrumbs,
    Slug,
    ParentPage,
    Meta
  ]
};
