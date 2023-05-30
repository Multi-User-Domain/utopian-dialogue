import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Container
} from "@chakra-ui/react";

import GridSelect from "../../lib/gridSelect";

export default function BrowseWorldsList(): React.ReactElement {

    const navigate = useNavigate();
    const [stories, setStories] = useState(null);

    // TODO: belongs in a Federation provider
    //const storyEndpoint = "https://api.realm.games.coop/ud/stories/";
    const storyEndpoint = "http://localhost:5001/ud/stories/";

    useEffect(() => {
        axios.get(storyEndpoint).then(res => {
            setStories(res.data);
        });
    }, []);

    const selectStory = (i: number) => {
        console.log(stories[i].url);
        //navigate(stories[i].url);
    }

    return (
        <Container>
            <GridSelect gridComponents={stories} onSelect={selectStory} itemsPerRow={3} gap={5}/>
        </Container>
    );
}