import {
  Box, Button,
  FormControl, FormLabel, Input, FormHelperText,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton
} from '@chakra-ui/react'

export default function ImageUpload({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Image</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <Box padding={6}>
          <form>
            <FormControl isRequired>
              <FormLabel htmlFor="caption">Image Caption</FormLabel>
              <Input id="caption" type="text" />
              <FormHelperText>What is this a picture of?</FormHelperText>
            </FormControl>
            <Box mt={6} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="solid" colorScheme="teal">
                Upload
              </Button>
            </Box>
          </form>
        </Box>
      </ModalContent>
    </Modal>
  )
}
