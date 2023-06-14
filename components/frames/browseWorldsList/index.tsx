import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Container
} from "@chakra-ui/react";

import GridSelect from "../../lib/gridSelect";
import { API_URL } from "../../lib/constants";

export default function BrowseWorldsList(): React.ReactElement {

    const navigate = useNavigate();
    const [worlds, setWorlds] = useState([]); // the raw JSON-LD data of the worlds
    const [worldDisplay, setWorldsDisplay] = useState([]); // treated JSON objects for the GridSelectComponent

    // TODO: this shouldn't be explicit - use a content negotiation
    const worldEndpoint = API_URL + "ud/worlds/";

    useEffect(() => {
        axios.get(worldEndpoint).then(res => {
            let arr = [];
            for(let i = 0; i < res.data.length; i++) {
                arr.push({
                    "title": res.data[i]["n:fn"]
                })
            }
            setWorldsDisplay(arr);
            setWorlds(res.data);
        });
    }, []);

    const selectWorld = (i: number) => {
        //navigate("/readFromInk", {state: { url: worlds[i]["@id"]}});
        console.log("TODO: do something here");
    }

    return (
        <Container>
            <GridSelect gridComponents={worldDisplay} onSelect={selectWorld} itemsPerRow={3} gap={5}/>
        </Container>
    );
}