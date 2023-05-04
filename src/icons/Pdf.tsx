import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface PdfProps extends IconProps {}

export const Pdf = ({ ...rest }: PdfProps) => (
  <Icon viewBox="0 0 32 32" color="text.primary" {...rest}>
    <path
      fill="currentColor"
      d="M30 18V16H24V26H26V22H29V20H26V18H30ZM19 26H15V16H19C19.7954 16.0009 20.5579 16.3172 21.1204 16.8796C21.6828 17.4421 21.9991 18.2046 22 19V23C21.9991 23.7954 21.6828 24.5579 21.1204 25.1204C20.5579 25.6828 19.7954 25.9991 19 26ZM17 24H19C19.2651 23.9997 19.5193 23.8943 19.7068 23.7068C19.8943 23.5193 19.9997 23.2651 20 23V19C19.9997 18.7349 19.8943 18.4807 19.7068 18.2932C19.5193 18.1057 19.2651 18.0003 19 18H17V24ZM11 16H6V26H8V23H11C11.5302 22.9993 12.0385 22.7883 12.4134 22.4134C12.7883 22.0385 12.9993 21.5302 13 21V18C12.9994 17.4698 12.7885 16.9614 12.4135 16.5865C12.0386 16.2115 11.5302 16.0006 11 16ZM8 21V18H11L11.001 21H8Z"
    />
    <path
      fill="currentColor"
      d="M22 14V10C22.0036 9.86858 21.9786 9.73793 21.9268 9.61708C21.875 9.49623 21.7976 9.38806 21.7 9.30001L14.7 2.30001C14.612 2.20234 14.5038 2.12493 14.3829 2.07314C14.2621 2.02134 14.1314 1.99639 14 2.00001H4C3.47005 2.00156 2.96224 2.21278 2.58751 2.58751C2.21277 2.96225 2.00156 3.47005 2 4.00001V28C2 28.5304 2.21071 29.0391 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H20V28H4V4.00001H12V10C12.0016 10.53 12.2128 11.0378 12.5875 11.4125C12.9622 11.7872 13.47 11.9985 14 12H20V14H22ZM14 10V4.40001L19.6 10H14Z"
    />
  </Icon>
);
