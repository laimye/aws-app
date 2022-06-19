import { useState, useEffect, useRef } from 'react'
import {
  Box, Image, Button, VisuallyHidden,
  FormControl, FormLabel, Input, FormHelperText,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton
} from '@chakra-ui/react'

const isValidFileType = filename => (
  ['.jpeg', '.jpg', '.png', '.webp', '.gif'].some(ext => filename.endsWith(ext))
)

export default function ImageUpload({ isOpen, onClose, addImage }) {

  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState(null)

  const handleCaptionChange = event => {
    setCaption(event.target.value)
  }

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const handleImageClick = event => {
    fileInputRef.current?.click()
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    const filename = file?.name.toLowerCase() ?? ''
    if (!isValidFileType(filename)) return
    setFile(file)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (file === null || caption.trim() === '') return
    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)
    await addImage(formData)
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  useEffect(() => {
    if (file !== null) setPreview(URL.createObjectURL(file))
  }, [file])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Image</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <Box
          height={200}
          onDrop={handleDrop}
          onClick={handleImageClick}
          onDragOver={handleDragOver}>
          { preview !== null &&
            <Image
              fit="contain" height={200}
              width="100%" src={preview} alt={caption} />
          }
        </Box>
        <Box padding={6}>
          <form onSubmit={handleSubmit}>
            <VisuallyHidden>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png, .webp,.gif" />
            </VisuallyHidden>
            <FormControl isRequired>
              <FormLabel htmlFor="caption">Image Caption</FormLabel>
              <Input id="caption" type="text" onChange={handleCaptionChange} />
              <FormHelperText>What is this a picture of?</FormHelperText>
            </FormControl>
            <Box mt={6} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="solid" colorScheme="teal">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </ModalContent>
    </Modal>
  )
}
