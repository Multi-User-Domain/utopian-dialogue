import React from "react";
import useBigCity from "../../../hooks/useBigCity";
import {ILocation} from "../../../context/bigCityContext";
import useNarrative from "../../../hooks/useNarrative";
import { Container, Stack, Box, Text } from "@chakra-ui/react";


function Location({location, onClick} : {location: ILocation, onClick: (name: string) => void}) : React.ReactElement {
    return <Box onClick={() => onClick(location.frameKey)}><Text>{location.name}</Text></Box>;
}


export default function MapNavigation({}) : React.ReactElement {
    const { locations, visitLocation } = useBigCity();
    const { setFrame } = useNarrative();

    const selectLocation = (name: string) => {
        setFrame(name);
        visitLocation(name);
    }

    let locationsNotVisited = locations.filter((value) => !value.visited);
    let locationsDisplay = locationsNotVisited.map((value, index) => {
        return <Location location={value} key={index} onClick={selectLocation} />
    });

    return (
        <Container>
            <Stack>
                {locationsDisplay}
            </Stack>
        </Container>
    );
}