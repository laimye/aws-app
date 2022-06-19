import useSWR from 'swr'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  Box, Image, SimpleGrid, GridItem, Skeleton, SkeletonText, Text, useToast
} from '@chakra-ui/react'

const fallbackData = Array(6).fill()

const getImages = url => axios.get(url).then(({ data }) => data)

export default function App() {

  const { data, error } = useSWR('/api/uploads', getImages, {
    fallbackData
  })

  const toast = useToast()

  useEffect(() => {
    if (typeof error !== 'undefined') {
      toast({
        title: 'Uh-oh!',
        description: 'There was a problem loading the images...',
        status: 'warning',
        position: 'bottom-left'
      })
    }
  }, [toast, error])

  return (
    <Box padding={4}>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {
          data.map((image, index) => (
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
