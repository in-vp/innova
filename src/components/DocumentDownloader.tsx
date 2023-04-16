import { Card, CardBody, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { DocumentDownloaderGroupItemType } from '../blocks';
import { Pdf } from '../icons';

export interface DocumentDownloaderProps {
  documentDownloader: DocumentDownloaderGroupItemType;
}

interface DocumentIconProps {
  mimeType: string;
}

const DocumentIcon = ({ mimeType }: DocumentIconProps): JSX.Element => {
  const extensionMap: Record<string, JSX.Element> = {
    'application/pdf': <Pdf boxSize={8} />
  };

  return extensionMap[mimeType] || extensionMap['application/pdf'];
};

export const DocumentDownloader = ({
  documentDownloader
}: DocumentDownloaderProps) => {
  const handleDownload = async () => {
    const doc = documentDownloader.document;

    const response = await fetch(doc.url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = doc.filename;
    link.click();
  };

  return (
    <Card>
      <CardBody>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4} w="full">
            <DocumentIcon mimeType={documentDownloader.document.mimeType} />
            <Flex direction="column">
              <Text color="text.primary" fontWeight="medium" fontSize="md">
                {documentDownloader.title}
              </Text>
              <Text
                color="text.secondary.100"
                fontWeight="medium"
                fontSize="sm"
              >
                {documentDownloader.language.toUpperCase()},
                {Intl.DateTimeFormat('tr-TR', {
                  month: 'long',
                  year: 'numeric'
                }).format(new Date(documentDownloader.date))}
              </Text>
            </Flex>
          </Flex>
          <IconButton
            variant="unstyled"
            aria-label="Download"
            icon={<FiDownload size="1.5em" />}
            color="background.blue"
            onClick={handleDownload}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};
