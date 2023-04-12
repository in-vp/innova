import { CollectionConfig } from 'payload/types';
import { Meta, MetaType, Slug } from '../fields';
import { generateFullTitle } from '../utils';

export interface PageType {
  slug: string;
  title: string;
  meta: MetaType;
}

export const Page: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'fullTitle',
      type: 'text',
      localized: true,
      hooks: {
        beforeChange: [
          async ({ data, originalDoc }) =>
            generateFullTitle(data?.breadcrumbs || originalDoc.breadcrumbs)
        ]
      },
      admin: {
        components: {
          Field: () => null
        }
      }
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          maxDepth: 0,
          admin: {
            disabled: true
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                width: '50%'
              }
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%'
              }
            }
          ]
        }
      ],
      admin: {
        disabled: true
      }
    },
    Slug,
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    Meta
  ]
};
