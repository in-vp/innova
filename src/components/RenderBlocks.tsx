/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { PageBlockType, PageLayout } from '../collections';
import { Accordion } from './Accordion';
import { ImageTagGroup } from './ImageTagGroup';
import { TagGroup } from './TagGroup';
import { Content } from './Content';
import { MediaContent } from './MediaContent';
import { TabGroup } from './TabGroup';
import { DotSlider } from './DotSlider';
import { DocumentDownloaderGroup } from './DocumentDownloaderGroup';
import { ImageDownloaderGroup } from './ImageDownloaderGroup';
import { ContentCardGroup } from './ContentCardGroup';

export interface RenderBlocksProps {
  layout: PageLayout[];
}

const COMPONENTS: Record<PageBlockType, React.FC<any>> = {
  accordion: Accordion,
  imageTagGroup: ImageTagGroup,
  tagGroup: TagGroup,
  content: Content,
  mediaContent: MediaContent,
  tabGroup: TabGroup,
  dotSlider: DotSlider,
  documentDownloaderGroup: DocumentDownloaderGroup,
  imageDownloaderGroup: ImageDownloaderGroup,
  contentCardGroup: ContentCardGroup
};

export const RenderBlocks = ({ layout }: RenderBlocksProps) => (
  <>
    {layout.map((block) => {
      const Block = COMPONENTS[block.blockType];

      return (
        <React.Fragment key={uuidv4()}>
          {Block && <Block {...block} />}
        </React.Fragment>
      );
    })}
  </>
);
