import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { InstantSearch, Hits, Highlight } from 'react-instantsearch-dom';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import React from 'react';

interface HitProps {
  hit: unknown;
}

const Hit = ({ hit }: HitProps) => <Highlight hit={hit} />;

export const SearchBox = () => {
  const [expanded, setExpanded] = React.useState(false);

  const meiliSearchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700'
  );

  return (
    <InstantSearch indexName="" searchClient={meiliSearchClient}>
      <InputGroup w={expanded ? 'full' : 'fit-content'}>
        {expanded && (
          <>
            <InputLeftElement pos="relative">
              <Icon as={FiSearch} boxSize={5} />
            </InputLeftElement>
            <Input variant="unstyled" />
          </>
        )}
        <InputRightElement
          pos="relative"
          onClick={() => setExpanded(!expanded)}
        >
          <Icon as={expanded ? IoClose : FiSearch} boxSize={expanded ? 7 : 5} />
        </InputRightElement>
      </InputGroup>
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};
