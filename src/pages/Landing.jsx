import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import checkImg from "../assets/check.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceQuality: "",
    beverageQuality: "",
    restaurantCleanliness: "",
    overallExperience: "",
  });

  const [formErrors, setFormErrors] = useState({
    customerName: false,
    email: false,
    phone: false,
    serviceQuality: false,
    beverageQuality: false,
    restaurantCleanliness: false,
    overallExperience: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...formErrors };

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        newErrors[key] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFormErrors(newErrors);
    } else {
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        serviceQuality: "",
        beverageQuality: "",
        restaurantCleanliness: "",
        overallExperience: "",
      });

      let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
      formData.id = feedbacks.length + 1;
      feedbacks.push(formData);
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

      setSubmitted(true);
    }
  };

  return (
    <>
      {submitted ? (
        <VStack h={"100vh"} justify={"center"}>
          <Flex
            flexDir={"column"}
            justify={"center"}
            alignItems={"center"}
            rowGap={3}
          >
            <Image src={checkImg} h={100} w={100} />
            <Text color={"#263c62"} fontSize={20} fontWeight={"bold"}>
              Thank you for providing the feedback
            </Text>
            <Text color={"gray"}>
              We will work towards improving your experience
            </Text>
            <Button
              onClick={() => setSubmitted(false)}
              colorScheme="purple"
              px={7}
            >
              Close
            </Button>
          </Flex>
        </VStack>
      ) : (
        <Box bgColor={"#f8fafb"} height="100vh" p={5}>
          <HStack
            py={2}
            bgColor={"white"}
            borderRadius={"10px"}
            px={10}
            justify={"space-between"}
          >
            <Heading>Aromatic Bar</Heading>
            <Button colorScheme="blue" onClick={() => navigate("/feedback")}>
              See All Feedbacks
            </Button>
          </HStack>

          <Box py={3} bgColor={"white"} borderRadius={"10px"} mt={10}>
            <form onSubmit={handleSubmit}>
              <SimpleGrid columns={[1, 1, 2, 2]} gap={5} p={5}>
                <FormControl isRequired isInvalid={formErrors.customerName}>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Customer name..."
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                  />
                  {formErrors.customerName && (
                    <FormErrorMessage>
                      Customer name is required
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email..."
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <FormErrorMessage>Email is required</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={formErrors.phone}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter number..."
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && (
                    <FormErrorMessage>Phone is required</FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={[1, 1, 2, 2]} gap={5} p={5}>
                <FormControl isInvalid={formErrors.serviceQuality}>
                  <FormLabel>
                    Please rate the quality of service you received from your
                    host.
                  </FormLabel>
                  <HStack spacing={10} onChange={handleInputChange}>
                    <Checkbox
                      name="serviceQuality"
                      value="Excellent"
                      isChecked={formData.serviceQuality === "Excellent"}
                    >
                      Excellent
                    </Checkbox>
                    <Checkbox
                      name="serviceQuality"
                      value="Good"
                      isChecked={formData.serviceQuality === "Good"}
                    >
                      Good
                    </Checkbox>
                    <Checkbox
                      name="serviceQuality"
                      value="Fair"
                      isChecked={formData.serviceQuality === "Fair"}
                    >
                      Fair
                    </Checkbox>
                    <Checkbox
                      name="serviceQuality"
                      value="Bad"
                      isChecked={formData.serviceQuality === "Bad"}
                    >
                      Bad
                    </Checkbox>
                  </HStack>
                </FormControl>

                <FormControl isInvalid={formErrors.beverageQuality}>
                  <FormLabel>
                    Please rate the quality of your beverage.
                  </FormLabel>
                  <HStack spacing={10} onChange={handleInputChange}>
                    <Checkbox
                      name="beverageQuality"
                      value="Excellent"
                      isChecked={formData.beverageQuality === "Excellent"}
                    >
                      Excellent
                    </Checkbox>
                    <Checkbox
                      name="beverageQuality"
                      value="Good"
                      isChecked={formData.beverageQuality === "Good"}
                    >
                      Good
                    </Checkbox>
                    <Checkbox
                      name="beverageQuality"
                      value="Fair"
                      isChecked={formData.beverageQuality === "Fair"}
                    >
                      Fair
                    </Checkbox>
                    <Checkbox
                      name="beverageQuality"
                      value="Bad"
                      isChecked={formData.beverageQuality === "Bad"}
                    >
                      Bad
                    </Checkbox>
                  </HStack>
                </FormControl>

                <FormControl isInvalid={formErrors.restaurantCleanliness}>
                  <FormLabel>
                    Please rate the cleanliness of restaurant.
                  </FormLabel>
                  <HStack spacing={10} onChange={handleInputChange}>
                    <Checkbox
                      name="restaurantCleanliness"
                      value="Excellent"
                      isChecked={formData.restaurantCleanliness === "Excellent"}
                    >
                      Excellent
                    </Checkbox>
                    <Checkbox
                      name="restaurantCleanliness"
                      value="Good"
                      isChecked={formData.restaurantCleanliness === "Good"}
                    >
                      Good
                    </Checkbox>
                    <Checkbox
                      name="restaurantCleanliness"
                      value="Fair"
                      isChecked={formData.restaurantCleanliness === "Fair"}
                    >
                      Fair
                    </Checkbox>
                    <Checkbox
                      name="restaurantCleanliness"
                      value="Bad"
                      isChecked={formData.restaurantCleanliness === "Bad"}
                    >
                      Bad
                    </Checkbox>
                  </HStack>
                </FormControl>

                <FormControl isInvalid={formErrors.overallExperience}>
                  <FormLabel>
                    Please rate your overall dining experience.
                  </FormLabel>
                  <HStack spacing={10} onChange={handleInputChange}>
                    <Checkbox
                      name="overallExperience"
                      value="Excellent"
                      isChecked={formData.overallExperience === "Excellent"}
                    >
                      Excellent
                    </Checkbox>
                    <Checkbox
                      name="overallExperience"
                      value="Good"
                      isChecked={formData.overallExperience === "Good"}
                    >
                      Good
                    </Checkbox>
                    <Checkbox
                      name="overallExperience"
                      value="Fair"
                      isChecked={formData.overallExperience === "Fair"}
                    >
                      Fair
                    </Checkbox>
                    <Checkbox
                      name="overallExperience"
                      value="Bad"
                      isChecked={formData.overallExperience === "Bad"}
                    >
                      Bad
                    </Checkbox>
                  </HStack>
                </FormControl>
              </SimpleGrid>

              <HStack justify={"end"} px={10}>
                <Button type="submit" px={8} colorScheme="blue">
                  Submit Feedback
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Landing;
