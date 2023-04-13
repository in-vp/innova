import { ChakraProps, Flex, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface TextIconCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    Pick<ChakraProps, 'color'> {
  icon: IconType;
  label: string;
}

export const TextIconCallToAction = ({
  label,
  type,
  page,
  url,
  icon,
  color
}: TextIconCallToActionProps) => (
  <Flex
    align="center"
    gap={2}
    color={color}
    // transitionProperty="all"
    // transitionDuration="100ms"
    // transitionTimingFunction="ease-in-out"
    // transition="all 100ms ease-in-out"
    // _hover={{ textDecoration: 'none', transform: 'translateX(0.15em)' }}
  >
    <CallToAction type={type} page={page} url={url}>
      {label}
    </CallToAction>
    <Icon as={icon} />
  </Flex>
);
