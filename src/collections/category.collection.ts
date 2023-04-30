import { CollectionConfig } from 'payload/types';
import { populateValueAfterCaseChange } from '../hooks';

export interface CategoryType {
  name: string;
}

export const Category: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
      hooks: {
        beforeChange: [populateValueAfterCaseChange('name')]
      }
    }
  ]
};
