import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Container,
    Button,
    Text
} from "@chakra-ui/react";

import GridSelect from "../../lib/gridSelect";
import { API_URL } from "../../lib/constants";
import { useRemoteWorld } from "../../../hooks/useRemoteWorld";

export default function BrowseWorldsList(): React.ReactElement {

    const navigate = useNavigate();
    const [worlds, setWorlds] = useState([]); // the raw JSON-LD data of the worlds
    const [worldDisplay, setWorldsDisplay] = useState([]); // treated JSON objects for the GridSelectComponent
    const { setWorld } = useRemoteWorld();

    // TODO: this shouldn't be explicit - use a content negotiation
    const worldEndpoint = API_URL + "worlds/";

    useEffect(() => {
        axios.get(worldEndpoint).then(res => {
            let arr = [];
            for(let i = 0; i < res.data.length; i++) {
                arr.push({
                    "title": res.data[i]["n:fn"],
                    "imgSrc": Object.keys(res.data[i]).includes("foaf:depiction") ? res.data[i]["foaf:depiction"] : null
                })
            }
            setWorldsDisplay(arr);
            setWorlds(res.data);
        });
    }, []);

    const selectWorld = (i: number) => {
        setWorld(worlds[i]);
        navigate("/wander");
    }

    return (
        <Container>
            <Button onClick={() => navigate("/createNewWorld")}><Text>Create New World</Text></Button>
            <GridSelect gridComponents={worldDisplay} onSelect={selectWorld} itemsPerRow={3} gap={5}/>
        </Container>
    );
}