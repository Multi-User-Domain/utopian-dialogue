import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Container
} from "@chakra-ui/react";

import GridSelect from "../../lib/gridSelect";
import { API_URL } from "../../lib/constants";

export default function BrowseStoryList(): React.ReactElement {

    const navigate = useNavigate();
    const [stories, setStories] = useState([]); // the raw JSON-LD data of the stories
    const [storiesDisplay, setStoriesDisplay] = useState([]); // treated JSON objects for the GridSelectComponent

    // TODO: this shouldn't be explicit - use a content negotiation
    const storyEndpoint = API_URL + "ud/stories/";

    useEffect(() => {
        axios.get(storyEndpoint).then(res => {
            let arr = [];
            for(let i = 0; i < res.data.length; i++) {
                arr.push({
                    "title": res.data[i]["n:fn"],
                    "imgSrc": Object.keys(res.data[i]).includes("foaf:depiction") ? res.data[i]["foaf:depiction"] : null
                })
            }
            setStoriesDisplay(arr);
            setStories(res.data);
        });
    }, []);

    const selectStory = (i: number) => {
        navigate("/readFromInk", {state: { url: stories[i]["@id"]}});
    }

    return (
        <Container>
            <GridSelect gridComponents={storiesDisplay} onSelect={selectStory} itemsPerRow={3} gap={5}/>
        </Container>
    );
}