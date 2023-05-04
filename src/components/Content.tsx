import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { RichText } from './RichText';

export interface ContentProps extends ContentType {}

export const Content = ({ columns }: ContentProps) => (
  <Grid
    templateColumns={{
      base: 'repeat(1, 1fr)',
      md: `repeat(${columns.length}, 1fr)`
    }}
    gap={6}
  >
    {columns.map((column) => (
      <GridItem key={uuidv4()}>
        <Flex justify="center">
          <Flex textAlign={{ base: 'justify', md: column.textAlign }} w="full">
            <RichText content={column.content} />
          </Flex>
        </Flex>
      </GridItem>
    ))}
  </Grid>
);
