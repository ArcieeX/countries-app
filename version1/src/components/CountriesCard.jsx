import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button.jsx";


<Card.Root flexDirection="row" overflow="hidden" maxW="xl" m="auto" mt="4">
    <Image></Image>
    <Box>
        <Card.Body>
            <Card.Title mb="2"></Card.Title>
            <Card.Description>
                <p>
                    <strong>Population:</strong>{" "}
                </p>
                <p>
                    <strong>Region:</strong> 
                </p>
                <p>
                    <strong>Languages:</strong>{" "}
                </p>
            </Card.Description>
            <HStack mt="4">
                <Badge colorScheme="green">Population</Badge>
                <Badge colorScheme="blue">Region</Badge>
            </HStack>
        </Card.Body>
        <Card.Footer>
            <Button colorScheme="teal">Save</Button>
        </Card.Footer>
    </Box>
</Card.Root> 