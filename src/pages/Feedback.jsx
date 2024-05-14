import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedbackModal from "../components/FeedbackModal";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbackData(storedFeedback);
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const delayedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 1000);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    delayedSearch(value);
  };

  console.log(searchQuery);
  const filteredFeedbackData = feedbackData.filter((feedback) =>
    Object.values(feedback).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    onOpen();
  };

  return (
    <VStack bgColor={"#f8fafb"} h={"100vh"} p={5}>
      <HStack
        w={"100%"}
        py={2}
        bgColor={"white"}
        borderRadius={"10px"}
        px={5}
        justify={"space-between"}
      >
        <Box>
          <Heading as="h2" size="lg">
            Aromatic bar
          </Heading>
          <Text>{feedbackData.length} records found.</Text>
        </Box>
        <Box>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearchChange(e)}
            />
          </InputGroup>
        </Box>
      </HStack>
      <TableContainer w={"100%"}>
        <Table variant="simple">
          <Thead>
            <Tr bgColor={"#efe9fb"}>
              <Th>Form Details</Th>
              <Th>Customer Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>
                Please rate the quality of service you received from your host.
              </Th>
              <Th>Please rate the quality of your beverage.</Th>
              <Th>Please rate the cleanliness of restaurant.</Th>
              <Th>Please rate your overall dining experience.</Th>
            </Tr>
          </Thead>
          <Tbody>
            {feedbackData &&
              filteredFeedbackData.map((feedback) => (
                <Tr>
                  <Td>
                    <Button
                      variant="link"
                      colorScheme="blue"
                      onClick={() => handleViewDetails(feedback)}
                    >
                      View Details
                    </Button>
                    {selectedFeedback && (
                      <FeedbackModal
                        selectedFeedback={selectedFeedback}
                        onOpen={onOpen}
                        isOpen={isOpen}
                        onClose={onClose}
                      />
                    )}
                  </Td>
                  <Td>{feedback.customerName}</Td>
                  <Td>{feedback.email}</Td>
                  <Td>{feedback.phone}</Td>
                  <Td>{feedback.serviceQuality}</Td>
                  <Td>{feedback.beverageQuality}</Td>
                  <Td>{feedback.restaurantCleanliness}</Td>
                  <Td>{feedback.overallExperience}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default Feedback;
