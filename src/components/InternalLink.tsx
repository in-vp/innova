import React from 'react';
import Link from 'next/link';
import { ChakraProps } from '@chakra-ui/react';

export interface InternalLinkProps extends ChakraProps {
  children: React.ReactNode | React.ReactNode[];
  slug: string;
  newTab?: boolean;
}

export const InternalLink = ({
  slug,
  children,
  newTab,
  ...rest
}: InternalLinkProps) => {
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link href={slug} as={slug} scroll={false} {...newTabProps} {...rest}>
      {children}
    </Link>
  );
};
