import useSWR from 'swr'
import axios from 'axios'
import { useEffect } from 'react'
import { Box, Button, useToast, useDisclosure } from '@chakra-ui/react'
import ImageUpload from './components/image-upload'
import ImageGallery from './components/image-gallery'

const fallbackData = Array(6).fill()

const getImages = url => axios.get(url).then(({ data }) => data)

export default function App() {

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error } = useSWR('/api/uploads', getImages, {
    fallbackData
  })

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
    <>
      <ImageGallery images={data} />
      <ImageUpload isOpen={isOpen} onClose={onClose} />
      <Box display="flex" justifyContent="stretch" padding={6}>
        <Button colorScheme="teal" onClick={onOpen} flex={1}>
          Add an Image
        </Button>
      </Box>
    </>
  )
}
