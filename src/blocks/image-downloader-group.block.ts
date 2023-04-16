import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  WidthType
} from '../fields';
import { UploadedMediaType } from '../collections';

export interface ImageDownloaderGroupItemType {
  image: UploadedMediaType;
}

export interface ImageDownloaderGroupType {
  blockType: 'imageDownloaderGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: ImageDownloaderGroupItemType[];
}

export const ImageDownloaderGroup: Block = {
  slug: 'imageDownloaderGroup',
  labels: {
    singular: 'Image Downloader Group',
    plural: 'Image Downloader Groups'
  },
  fields: [
    {
      type: 'row',
      fields: [BackgroundColor, Width]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
