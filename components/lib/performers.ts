//contains constants for accessing character information for use in dialogues and relationships

export enum PerformerNames {
    ALICIA="Alicia",
    ANDREW="Andrew",
    ARSENE="Arsene",
    AXEL="Axel",
    BURLY="Burly",
    CAMILLA="Camilla",
    CRAIG="Craig",
    DEVELOPER="Developer",
    DOUGLAS="Douglas",
    ELENI="Eleni",
    FRANCIS="Francis",
    GUILLAME="Guillame",
    HEINRICH="Heinrich",
    LEOPALD="Leopald",
    MARI="Mari",
    MARCUS="Marcus",
    // you can use the NULL_PERFORMER when nobody is speaking (empty portrait, empty name)
    NULL_PERFORMER="NULL",
    PHILIPPA="Philippa",
    RUPERT="Rupert",
    SADIQ="Sadiq",
    SIGMUND="Sigmund",
    TBL="Tim Berners-Lee",
    TESSA="Tessa",
    TYLER="Tyler",
    ZOE="Zoe"
}

export interface IPerformer {
    name: string;
    imgSrc: string;
    jsonld?: any;
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
    [PerformerNames.CAMILLA]: {
        name: PerformerNames.CAMILLA,
        imgSrc: "../../../public/img/camilla.webp",
    },
    [PerformerNames.CRAIG]: {
        name: PerformerNames.CRAIG,
        imgSrc: "../../../public/img/craig.webp",
    },
    [PerformerNames.DEVELOPER]: {
        name: PerformerNames.DEVELOPER,
        imgSrc: "../../../public/img/developer.png",
    },
    [PerformerNames.DOUGLAS]: {
        name: PerformerNames.DOUGLAS,
        imgSrc: "../../../public/img/douglas.webp",
    },
    [PerformerNames.ELENI]: {
        name: PerformerNames.ELENI,
        imgSrc: "../../../public/img/eleni.webp",
    },
    [PerformerNames.FRANCIS]: {
        name: PerformerNames.FRANCIS,
        imgSrc: "../../../public/img/francis.webp",
    },
    [PerformerNames.GUILLAME]: {
        name: PerformerNames.GUILLAME,
        imgSrc: "../../../public/img/guillame.webp",
    },
    [PerformerNames.HEINRICH]: {
        name: PerformerNames.HEINRICH,
        imgSrc: "../../../public/img/heinrich.webp",
    },
    [PerformerNames.LEOPALD]: {
        name: PerformerNames.LEOPALD,
        imgSrc: "../../../public/img/leopald.webp",
    },
    [PerformerNames.MARI]: {
        name: PerformerNames.MARI,
        imgSrc: "../../../public/img/mari.webp"
    },
    [PerformerNames.MARCUS]: {
        name: PerformerNames.MARCUS,
        imgSrc: "../../../public/img/marcus.webp"
    },
    [PerformerNames.NULL_PERFORMER]: {
        name: "",
        imgSrc: null
    },
    [PerformerNames.PHILIPPA]: {
        name: PerformerNames.PHILIPPA,
        imgSrc: "../../../public/img/philippa.webp"
    },
    [PerformerNames.RUPERT]: {
        name: PerformerNames.RUPERT,
        imgSrc: "../../../public/img/mayor_rupert.png"
    },
    [PerformerNames.SADIQ]: {
        name: PerformerNames.SADIQ,
        imgSrc: "../../../public/img/sadiq.webp",
    },
    [PerformerNames.SIGMUND]: {
        name: PerformerNames.SIGMUND,
        imgSrc: "../../../public/img/sigmund.webp"
    },
    [PerformerNames.TBL]: {
        name: PerformerNames.TBL,
        imgSrc: "../../../public/img/tbl.webp",
    },
    [PerformerNames.TESSA]: {
        name: PerformerNames.TESSA,
        imgSrc: "../../../public/img/tessa.webp",
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