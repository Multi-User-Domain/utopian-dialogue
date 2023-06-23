import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Container
} from "@chakra-ui/react";

import GridSelect from "../../lib/gridSelect";
import { API_URL } from "../../lib/constants";
import { useRemoteWorld } from "../../../hooks/useRemoteWorld";

export default function CreateNewWorld(): React.ReactElement {

    const navigate = useNavigate();
    const [worlds, setWorlds] = useState([]); // the raw JSON-LD data of the worlds
    const [worldDisplay, setWorldsDisplay] = useState([]); // treated JSON objects for the GridSelectComponent
    const { setWorld } = useRemoteWorld();

    // TODO: this shouldn't be explicit - use a content negotiation
    const worldTemplateEndpoint = API_URL + "worlds/templates/";

    useEffect(() => {
        axios.get(worldTemplateEndpoint).then(res => {
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
        let selectedWorld = worlds[i];
        setWorld(selectedWorld);

        // TODO: post world to server

        navigate("/wander");
    }

    return (
        <Container>
            <GridSelect gridComponents={worldDisplay} onSelect={selectWorld} itemsPerRow={3} gap={5}/>
        </Container>
    );
}