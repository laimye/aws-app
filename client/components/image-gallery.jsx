import { useState } from 'react'
import {
  Box, Image, SimpleGrid, GridItem, Skeleton, SkeletonText, Text
} from '@chakra-ui/react'

export default function ImageGallery({ images }) {
  return (
    <Box padding={4}>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {
          images.map((image, index) => (
            <GridItem key={index}>
              <ImageGalleryItem image={image} />
            </GridItem>
          ))
        }
      </SimpleGrid>
    </Box>
  )
}

function ImageGalleryItem({ image = {} }) {

  const { imageId, location, caption } = image
  const isDataLoaded = typeof imageId !== 'undefined'

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Box shadow="lg">
      <Skeleton height="200px" isLoaded={isImageLoaded}>
        <Image
          fit="contain"
          width="100%"
          height="200px"
          alt={caption}
          src={location}
          onLoad={() => setIsImageLoaded(true)} />
      </Skeleton>
      <SkeletonText noOfLines={2} padding={4} isLoaded={isDataLoaded}>
        <Text as="p" noOfLines={2}>
          {caption}
        </Text>
      </SkeletonText>
    </Box>
  )
}
