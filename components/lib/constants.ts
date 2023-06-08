export const LONG_PAUSE = 2000;
export const SHORT_PAUSE = 1000;
export const SLOW_PACE = 150;
export const FAST_PACE = 40;

export const INTUITION_COLOUR = "#9246d9"

// TODO: this should be handled by a FederationContext
export const API_URL = "https://api.realm.games.coop/";
//export const API_URL = "http://localhost:5001/";

// LIT terms

export const MUD_CHAR_BASE_URL = "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudchar.ttl#"
export const MUD_CHAR = {
    DEFAULT_CONTEXT: {
        "dcterms": "http://purl.org/dc/terms/",
        "foaf": "http://xmlns.com/foaf/0.1/",
        "mud": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mud.ttl#",
        "mudcard": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcard.ttl#",
        "mudchar": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudchar.ttl#",
        "mudcombat": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#",
        "mudworld": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudworld.ttl#",
        "n": "http://www.w3.org/2006/vcard/ns#",
        "twt2023": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/games/twt2023.ttl#"
    },
    Character: MUD_CHAR_BASE_URL + "Character"
}