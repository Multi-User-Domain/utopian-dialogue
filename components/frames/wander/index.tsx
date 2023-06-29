import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Text } from "@chakra-ui/react";
import { WindupChildren, Pace } from "windups";

import Dialogue from "../../lib/dialogue";
import { performers, PerformerNames, IPerformer } from "../../lib/performers";

import { IMessage, DialogueProvider } from "../../../context/dialogueContext";
import usePlayer from "../../../hooks/usePlayer";
import useDialogue from "../../../hooks/useDialogue";
import { useRemoteWorld } from "../../../hooks/useRemoteWorld";

import ReadFromInkStoryDialogue from "../readFromInkStoryFrame";
import { SLOW_PACE } from "../../lib/constants";

function WanderDialogue() : React.ReactElement {
    const navigate = useNavigate();
    const { addMessage } = useDialogue();
    const { playerPerformer } = usePlayer();
    const { world, describeObject } = useRemoteWorld();

    const [ activeScene, setActiveScene ] = useState(null);

    const addMessageWithTravelChoice = (choices) => {
        addMessage({
            content: <Text>Where to next?</Text>,
            performer: playerPerformer,
            getResponses: async () => {
                let responses: IMessage[] = [];

                for(let choice of choices) {
                    responses.push({
                        shorthandContent: <p>{choice["n:fn"]}</p>,
                        content: <p><Pace ms={SLOW_PACE}>...</Pace></p>,
                        performer: performers[PerformerNames.NULL_PERFORMER],
                        selectFollowup: () => {
                            setActiveScene(choice);
                        }
                    });
                }

                return responses;
            }
        });
    }

    const displaySubRegionsTravelChoice = () => {
        if(Object.keys(activeScene).includes("mudworld:hasRegions")) 
            addMessageWithTravelChoice(activeScene["mudworld:hasRegions"]);
    }

    useEffect(() => {
        if(activeScene == null) return;

        // describe the region stumbled upon
        describeObject(activeScene).then((response) => {
            addMessage(response);

            // TODO: consider whether to find and run a story

            // display the next choice any sub-regions that might be contained
            displaySubRegionsTravelChoice();

            // TODO: no regions, no stories. What to do next?
        })
        .catch((err) => {
            console.error(err);
            displaySubRegionsTravelChoice();
        });
    
    }, [activeScene]);

    useEffect(() => {
        if(world == null) navigate("/browseWorldList");
        if(!Object.keys(world).includes("mudworld:hasRegions")) {
            console.error("ERR (Wander): active world is missing hasRegions property for feature");
            navigate("/browseWorldList");
        }

        addMessageWithTravelChoice(world["mudworld:hasRegions"]);
    }, []);

    return (
        <Container>
            <WindupChildren>
                <Dialogue>
                </Dialogue>
            </WindupChildren>
        </Container>
    );
}

export default function Wander(): React.ReactElement {

    // for navigating the world, feeding descriptions and such
    // run into stories and render these

    return (
        <DialogueProvider>
            <WanderDialogue />
        </DialogueProvider>
    );
}