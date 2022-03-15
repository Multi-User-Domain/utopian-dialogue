import { IDialogueDisplayable } from "./dialogueTypes";

// constants for relationship names

export enum Relationships {
    BETRAYAL="betrayal",
    CO_RULER="coruler",
    COMRADE="comrade",
    DEAD="dead",
    EXILED="exiled",
    GRATITUDE="gratitude",
    HOPE_SURROGATE="hope_surrogate",
    IMPRISONED="imprisoned",
    KIND="kind",
    KING="king",
    NOSTALGIA="nostalgia",
    TERRIFIED="terrified",
    TRUST="trust",
}

export enum Values {
    ORDER="order"
}

export enum SelfIdentityLabels {
    AUTHORITY="authority",
    COURAGEOUS="courageous",
    HAS_GREENSIGHT="greensight",
    PSYCHIATRIST="psychiatrist",
    REVOLUTIONARY="revolutionary",
    RUTHLESS="ruthless",
    SELF_KNOWLEDGE_CLAIM="selfKnowledge",
}

export enum TarotCardNames {
    COURAGE="courage",
    GREENSIGHT="greensight",
}

export interface ITarotCard extends IDialogueDisplayable {
    name: string;
    imgSrc: string;
    description: string;
    alt: string;
    webId: string;
}

export const tarotCards: {[key: string]: ITarotCard} = {
    [TarotCardNames.COURAGE]: {
        name: TarotCardNames.COURAGE,
        imgSrc: "../../../public/img/tarot/courage.jpg",
        alt: "An artists' sketch of the Cowardly Lion from the Wonderful Wizard of Oz",
        description: "",
        webId: "",
    },
    [TarotCardNames.GREENSIGHT]: {
        name: TarotCardNames.GREENSIGHT,
        imgSrc: "../../../public/img/tarot/greensight.jpg",
        alt: "An abstract drawing in which a lone figure is walking away from the viewer, towards a staircase leading towards a large and mysterious green gem. All of the objects in the image are aligned vertically",
        description: "",
        webId: "",
    },
}