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
    MINION="minion",
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

export interface ITarotCard extends IDialogueDisplayable {
    name: string;
    imgSrc: string;
    description: string;
    alt: string;
    webId: string;
}