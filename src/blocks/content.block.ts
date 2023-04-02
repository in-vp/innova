import { Block } from 'payload/types';
import { BackgroundColor } from '../fields';

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks'
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Column',
        plural: 'Columns'
      },
      fields: [
        BackgroundColor,
        {
          type: 'row',
          fields: [
            {
              name: 'width',
              label: 'Column Width',
              type: 'select',
              defaultValue: 'full',
              required: true,
              options: [
                {
                  label: 'One Third',
                  value: 'oneThird'
                },
                {
                  label: 'Half',
                  value: 'half'
                },
                {
                  label: 'Two Thirds',
                  value: 'twoThirds'
                },
                {
                  label: 'Full Width',
                  value: 'full'
                }
              ],
              admin: {
                width: '50%'
              }
            },
            {
              name: 'alignment',
              label: 'Alignment',
              type: 'select',
              defaultValue: 'left',
              required: true,
              options: [
                {
                  label: 'Left',
                  value: 'left'
                },
                {
                  label: 'Center',
                  value: 'center'
                },
                {
                  label: 'Right',
                  value: 'right'
                }
              ],
              admin: {
                width: '50%'
              }
            }
          ]
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
