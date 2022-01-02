// constants for relationship names

export enum Relationships {
    BETRAYAL="betrayal",
    COMRADE="comrade",
    GRATITUDE="gratitude",
    IMPRISONED="imprisoned",
    DEAD="dead",
    KIND="kind",
    KING="king",
    CO_RULER="coruler",
    TERRIFIED="terrified",
}

export enum SelfIdentityLabels {
    PSYCHIATRIST="psychiatrist",
    REVOLUTIONARY="revolutionary",
    RUTHLESS="ruthless"
}

export enum TarotCardNames {
    COURAGE="courage",
    GREENSIGHT="greensight",
}

export interface ITarotCard {
    name: string;
    imgSrc: string;
}

export const tarotCards: {[key: string]: ITarotCard} = {
    [TarotCardNames.COURAGE]: {
        name: TarotCardNames.COURAGE,
        imgSrc: "../../../public/img/tarot/courage.jpg"
    },
    [TarotCardNames.GREENSIGHT]: {
        name: TarotCardNames.GREENSIGHT,
        imgSrc: "../../../public/img/tarot/greensight.jpg"
    },
}