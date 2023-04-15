import { AspectRatio, Flex, Image, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { DotSliderItemType, DotSliderType } from '../blocks';
import { WidthType } from '../fields';
import { Slider, SliderProps } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';

export interface DotSliderProps extends DotSliderType {}

interface SliderWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  width: WidthType;
}

const SliderWrapper = ({ children, width }: SliderWrapperProps) => (
  <Flex
    pos="relative"
    w={{ base: 'full', md: width }}
    h="6xl"
    flexDir="column"
    overflow="hidden"
  >
    <link
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
    {children}
  </Flex>
);

const Slide = ({
  backgroundImage,
  callToActionToggle,
  description,
  title
}: DotSliderItemType) => (
  <Flex pos="relative">
    <AspectRatio ratio={16 / 9} w="8xl">
      <Image
        objectFit="cover"
        src={backgroundImage.url}
        alt={backgroundImage.alt}
      />
    </AspectRatio>
    <Flex flexDir="column" pos="absolute" color="text.light" w="lg">
      {title && (
        <Text fontWeight="medium" fontSize="4xl">
          {title}
        </Text>
      )}
      {description && (
        <Text fontWeight="normal" fontSize="lg">
          {description}
        </Text>
      )}
      {callToActionToggle.enableCallToAction &&
        callToActionToggle.callToAction && (
          <ButtonCallToAction
            {...callToActionToggle.callToAction}
            bgColor="background.light"
            color="text.blue"
          />
        )}
    </Flex>
  </Flex>
);

export const DotSlider = ({ items, width }: DotSliderProps) => {
  const slides = items.map((item) => <Slide {...item} key={uuidv4()} />);

  const settings: Omit<SliderProps, 'slides'> = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <SliderWrapper width={width}>
      <Slider {...settings} slides={slides} />
    </SliderWrapper>
  );
};
