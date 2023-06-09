import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Box,
  Text,
  Flex,
  Center,
  ChakraProps
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Player } from '@lottiefiles/react-lottie-player';
import { TagGroupItemType } from '../blocks';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface TagProps extends ChakraProps {
  tag: TagGroupItemType;
}

interface LottieAnimationProps {
  src: string;
}

const LottieAnimation = ({ src }: LottieAnimationProps) => (
  <Player
    loop
    hover
    src={src}
    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
  />
);

export const Tag = ({ tag, ...rest }: TagProps) => (
  <Card
    w="full"
    overflow="hidden"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
    {...rest}
  >
    <CardBody>
      <Flex flexDir="column" gap={4}>
        <Flex align="center" gap={4}>
          <Center bgColor="background.secondary" borderRadius="lg" p={2}>
            <Box boxSize="48px">
              {tag.imageType === 'icon' && tag.icon && (
                <Image
                  objectFit="cover"
                  src={tag.icon.url}
                  alt={tag.icon.alt}
                  boxSize="full"
                />
              )}
              {tag.imageType === 'lottie' && tag.lottie && (
                <LottieAnimation src={tag.lottie.url} />
              )}
            </Box>
          </Center>
          <Text color="text.primary" fontWeight="medium" fontSize="md">
            {tag.title}
          </Text>
        </Flex>
        {tag.content && (
          <Text color="text.primary" fontWeight="normal" fontSize="md">
            {tag.content}
          </Text>
        )}
      </Flex>
    </CardBody>
    {tag.callToAction && Object.keys(tag.callToAction).length > 0 && (
      <CardFooter>
        <TextIconCallToAction
          {...tag.callToAction}
          icon={FiArrowRight}
          color="text.blue"
        />
      </CardFooter>
    )}
  </Card>
);
