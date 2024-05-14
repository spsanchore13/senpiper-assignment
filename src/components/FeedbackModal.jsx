import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const FeedbackModal = ({ isOpen, onOpen, onClose, selectedFeedback }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading px={2}>{selectedFeedback.customerName}</Heading>
            <Flex p={2} flexDir={"column"} rowGap={2}>
              <Text>Mail: {selectedFeedback.email}</Text>
              <Text>Phone: {selectedFeedback.phone}</Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  1.{" "}
                </Text>
                Please rate the quality of service you received from your host:{" "}
                [{selectedFeedback.serviceQuality}]
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  2.{" "}
                </Text>
                Please rate the quality of your beverage: [
                {selectedFeedback.beverageQuality}]
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  3.{" "}
                </Text>
                Please rate the cleanliness of restaurant: [
                {selectedFeedback.restaurantCleanliness}]
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  4.{" "}
                </Text>
                Please rate your overall dining experience: [
                {selectedFeedback.overallExperience}]
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackModal;
