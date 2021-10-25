//contains constants for accessing character information for use in dialogues and relationships

export enum PerformerNames {
    ALICIA="Alicia",
    ANDREW="Andrew",
    ARSENE="Arsene",
    AXEL="Axel",
    BURLY="Burly",
    FRANCIS="Francis",
    GUILLAME="Guillame",
    LEOPALD="Leopald",
    MARI="Mari",
    RUPERT="Rupert",
    SIGMUND="Sigmund",
    TYLER="Tyler",
    ZOE="Zoe"
}

export interface IPerformer {
    name: string;
    imgSrc: string;
}

export const performers: {[key: string]: IPerformer} = {
    [PerformerNames.ALICIA]: {
        name: PerformerNames.ALICIA,
        imgSrc: "../../../public/img/alicia.webp"
    },
    [PerformerNames.ANDREW]: {
        name: PerformerNames.ANDREW,
        imgSrc: "../../../public/img/andrew.webp",
    },
    [PerformerNames.ARSENE]: {
        name: PerformerNames.ARSENE,
        imgSrc: "../../../public/img/arsene.webp",
    },
    [PerformerNames.AXEL]: {
        name: PerformerNames.AXEL,
        imgSrc: "../../../public/img/axel.webp",
    },
    [PerformerNames.BURLY]: {
        name: PerformerNames.BURLY,
        imgSrc: "../../../public/img/bodyguard.webp",
    },
    [PerformerNames.FRANCIS]: {
        name: PerformerNames.FRANCIS,
        imgSrc: "../../../public/img/francis.webp",
    },
    [PerformerNames.GUILLAME]: {
        name: PerformerNames.GUILLAME,
        imgSrc: "../../../public/img/guillame.webp",
    },
    [PerformerNames.LEOPALD]: {
        name: PerformerNames.LEOPALD,
        imgSrc: "../../../public/img/leopald.webp",
    },
    [PerformerNames.MARI]: {
        name: PerformerNames.MARI,
        imgSrc: "../../../public/img/mari.webp"
    },
    [PerformerNames.RUPERT]: {
        name: PerformerNames.RUPERT,
        imgSrc: "../../../public/img/mayor_rupert.png"
    },
    [PerformerNames.SIGMUND]: {
        name: PerformerNames.SIGMUND,
        imgSrc: "../../../public/img/sigmund.webp"
    },
    [PerformerNames.TYLER]: {
        name: PerformerNames.TYLER,
        imgSrc: "../../../public/img/tyler.webp"
    },
    [PerformerNames.ZOE]: {
        name: PerformerNames.ZOE,
        imgSrc: "../../../public/img/zoe.webp"
    }
}