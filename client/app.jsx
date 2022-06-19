import useSWR from 'swr'
import axios from 'axios'
import { useEffect } from 'react'
import { Box, Button, useToast, useDisclosure } from '@chakra-ui/react'
import ImageUpload from './components/image-upload'
import ImageGallery from './components/image-gallery'

const fallbackData = Array(12).fill()

const minDelay = (delay, operation) => (...args) => Promise.all([
  operation(...args),
  new Promise(resolve => setTimeout(resolve, delay))
]).then(([result]) => result)

const getImages = minDelay(1500, url => axios.get(url).then(({ data }) => data))

export default function App() {

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error, mutate } = useSWR('/api/uploads', getImages, {
    fallbackData
  })

  const addImage = async formData => {
    try {
      const { data: newImage } = await axios.post('/api/uploads', formData)
      mutate([...data, newImage])
    } catch (err) {
      console.error(err)
      toast({
        title: 'Uh-oh!',
        description: 'There was a problem uploading your image!',
        status: 'error',
        position: 'bottom-left'
      })
    } finally {
      onClose()
    }
  }

  useEffect(() => {
    if (typeof error !== 'undefined') {
      console.error(error)
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
      <ImageUpload isOpen={isOpen} onClose={onClose} addImage={addImage} />
      <Box display="flex" justifyContent="stretch" padding={6}>
        <Button colorScheme="teal" onClick={onOpen} flex={1}>
          Add an Image
        </Button>
      </Box>
    </>
  )
}
