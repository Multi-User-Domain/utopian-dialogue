import React, { useEffect, useState } from "react";
import InkJs from 'inkjs';
import { Text } from "@chakra-ui/react";

import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../../components/lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";

import { performers, PerformerNames, IPerformer } from "../../lib/performers";

/*
*   A component which renders a dialogue directly from an ink file
*/

function ReadFromInkDialogue({followLink} : IStoryFrame) : React.ReactElement {
    const { addMessage, dialogueEnded, setDialogueEnded, selectRandomFrom } = useDialogue();
    const { playerPerformer } = usePlayer();

    const storyJson = {"inkVersion":20,"root":[["\n","\n",{"->":"introduce_agora"},["done",{"#f":5,"#n":"g-0"}],null],"done",{"introduce_agora":["^\"Salutations!\" Says a young lady, with a beaming smile. \"My name is Mari- \" ",{"#":"Mari"},"\n","^\"Do you remember who you are?!\" a man interrupts her. \"I don't remember who I am, perhaps you know?\" ",{"#":"Douglas"},"\n","^\"Of course they don't, Douglas. None of us do\" ",{"#":"Mari"},"\n",{"->":".^.do_you_remember"},{"do_you_remember":[["ev","str",["ev","visit",1,"MIN","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"nop",{"s0":["pop","^\"I remember who I am\" ",{"->":".^.^.17"},null],"s1":["pop","^ \"Yes I remember who I am\"",{"->":".^.^.17"},null],"#f":5}],"/str","/ev",{"*":".^.c-0","flg":20},"ev","str",["ev","visit",1,"MIN","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"nop",{"s0":["pop","^\"I don't remember who I am\" ",{"->":".^.^.17"},null],"s1":["pop","^ \"No, I don't remember\"",{"->":".^.^.17"},null],"#f":5}],"/str","/ev",{"*":".^.c-1","flg":20},["ev",{"^->":"introduce_agora.do_you_remember.0.12.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":18},{"s":["^\"I am gifted with the Greensight, I see things that others do not\"",{"->":"$r","var":true},null]}],{"c-0":["\n","^\"Wow! Then perhaps there is hope for all of us!\" ",{"#":"Douglas"},"\n","^His eyes are sparkling as he says it","\n","ev",true,"/ev",{"VAR=":"player_self_knowledge_claim","re":true},"ev",{"VAR?":"douglas_hope_represent"},1,"+",{"VAR=":"douglas_hope_represent","re":true},"/ev",["ev","visit",4,"seq","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"ev","du",2,"==","/ev",{"->":".^.s2","c":true},"ev","du",3,"==","/ev",{"->":".^.s3","c":true},"nop",{"s0":["pop","^Mari mumbles disapprovingly",{"->":".^.^.29"},null],"s1":["pop","^Mari seems disrupted by your statement",{"->":".^.^.29"},null],"s2":["pop","^Mari says nothing",{"->":".^.^.29"},null],"s3":["pop","^Mari is frowning",{"->":".^.^.29"},null],"#f":5}],"\n","ev",{"VAR?":"mari_suspicious"},1,"+",{"VAR=":"mari_suspicious","re":true},"/ev",{"->":".^.^.^.^.agora_meeting"},{"#f":5}],"c-1":["\n","^Douglas seems disappointed by this","\n",{"->":".^.^.^.^.agora_meeting"},{"#f":5}],"c-2":["ev",{"^->":"introduce_agora.do_you_remember.0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.12.s"},[{"#n":"$r2"}],"\n","^\"Like... knowing who you are?\" ",{"#":"Douglas"},"\n","ev",true,"/ev",{"VAR=":"player_has_greensight","re":true},{"->":".^.^.^"},{"#f":5}]}],{"#f":1}],"agora_meeting":["^<em>Your choices are affecting how other characters view you, and how you view them</em>","\n","ev",{"VAR?":"mari_suspicious"},"!","/ev",[{"->":".^.b","c":true},{"b":["^ Mari addresses you: \"We've been meeting here, for several days, since the Great Pop. We call this the Agora, it's where we ask 'How do we want to live together'\"",{"->":".^.^.^.7"},null]}],"nop","\n","ev",{"VAR?":"mari_suspicious"},"/ev",[{"->":".^.b","c":true},{"b":["^ Douglas address you: \"We've been meeting here at the Agora, it's a governance of sorts. We've been piecing together what life was like, before the Great Pop. Perhaps then you will be the key to recovering the Old World, and rebuilding it!\"",{"->":".^.^.^.13"},null]}],"nop","\n",{"->":".^.^.pre_meeting_questions"},{"#f":1}],"pre_meeting_questions":[[["ev",{"^->":"introduce_agora.pre_meeting_questions.0.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^How long since the Great Pop?",{"->":"$r","var":true},null]}],["ev",{"^->":"introduce_agora.pre_meeting_questions.0.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"asked_how_many"},"!","/ev",{"*":".^.^.c-1","flg":19},{"s":["^How many people are here, in attendance?",{"->":"$r","var":true},null]}],["ev",{"^->":"introduce_agora.pre_meeting_questions.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"asked_how_many"},"/ev",{"*":".^.^.c-2","flg":19},{"s":["^And how many people, in the city?",{"->":"$r","var":true},null]}],["ev",{"^->":"introduce_agora.pre_meeting_questions.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":18},{"s":["^Is the city governed here, in the Agora?",{"->":"$r","var":true},null]}],["ev",{"^->":"introduce_agora.pre_meeting_questions.0.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-4","flg":18},{"s":["^No more questions",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"introduce_agora.pre_meeting_questions.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^\"Have you just woken up?\"","\n","^Evidently this surprises her","\n",{"#":"Alicia"},"^\"It's been ","ev",{"VAR?":"days_since_great_pop"},"out","/ev","^ days\" Mari answers. \"We've been meeting here for ","ev",{"VAR?":"days_since_great_pop"},1,"-","out","/ev","^\"","\n",{"->":".^.^.^"},{"#f":5}],"c-1":["ev",{"^->":"introduce_agora.pre_meeting_questions.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"\n","^\"Around fifty, in total\" Mari answers","\n",{"->":".^.^.^"},{"#f":5}],"c-2":["ev",{"^->":"introduce_agora.pre_meeting_questions.0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","^\"A lot more than that\" ",{"#":"Alicia"},"\n","^\"Our numbers are growing, little by little\" ",{"#":"Mari"},"\n",{"->":".^.^.^"},{"#f":5}],"c-3":["ev",{"^->":"introduce_agora.pre_meeting_questions.0.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","^Nobody seems sure how to answer this, there is a pause","\n","^\"Not so much 'governance', as far as I understand the term\" ",{"#":"Alicia"},"\n","^\"Not in an everday sense\" Mari admits. \"But it's becoming known as the central place to engage in the city politics\"","\n",{"->":".^.^.^"},{"#f":5}],"c-4":["ev",{"^->":"introduce_agora.pre_meeting_questions.0.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n",{"->":"rupert_confrontation"},{"#f":5}]}],{"#f":1}],"#f":1}],"rupert_confrontation":[["^A man dressed in fine clothing is approaching, his face is red and puffy with sweat.","\n","^He is leading a procession of five other men, dressed in bright uniform.","\n",{"#":"<Pause ms={LONG_PAUSE} />"},"^\"And just <b>what</b> is the meaning of all this <em>nonsense</em>?!\"","\n",{"#":"include_continue_prompt"},{"#":"Rupert"},"^He calls out to the audience, his arms waving theatrically:","\n","^\"Good citizens of <b>Rupertston</b>, I am your leader!\"","\n",{"#":"<Pause ms={SHORT_PAUSE * 0.75} />"},"^\"I understand that The Great Pop seems to have affected our memories but nevertheless! <em>I am your mayor!</em>\"","\n",{"#":"<Pause ms={SHORT_PAUSE * 1.25} />"},"^\"Nevertheless I have all of the necessary <em>*ahem*</em> records to prove it\"","\n",{"#":"include_continue_prompt"},{"#":"performer: rupert"},"^\"Yeah! Your gathering here is illegal!\" Says the tallest of the guardsmen, in a fiercely bright orange and white blouse.","\n",{"#":"include_continue_prompt"},{"#":"Burly"},["ev",{"^->":"rupert_confrontation.0.25.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^\"Who are you?\"",{"->":"$r","var":true},null]}],["ev",{"^->":"rupert_confrontation.0.26.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^\"Illegal? Says who?\"",{"->":"$r","var":true},null]}],"ev","str","^Say nothing","/str","/ev",{"*":".^.c-2","flg":20},{"c-0":["ev",{"^->":"rupert_confrontation.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.25.s"},[{"#n":"$r2"}],"\n","ev",{"VAR?":"burly_suspicious"},1,"+",{"VAR=":"burly_suspicious","re":true},"/ev",{"->":".^.^.^.burly_who"},{"#f":5}],"c-1":["ev",{"^->":"rupert_confrontation.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.26.s"},[{"#n":"$r2"}],"\n","ev",{"VAR?":"burly_suspicious"},2,"+",{"VAR=":"burly_suspicious","re":true},"/ev","ev",{"VAR?":"player_courageous"},1,"+",{"VAR=":"player_courageous","re":true},"/ev","ev",{"VAR?":"player_has_greensight"},"/ev",[{"->":".^.b","c":true},{"b":["^ This man's aura has become tense and carries the potential of violence ",{"->":".^.^.^.23"},null]}],"nop","\n",{"->":".^.^.^.burly_who"},{"#f":5}],"c-2":["\n","^\"Who are you?\"","\n",{"#":"Mari"},{"->":".^.^.^.burly_who"},{"#f":5}]}],{"burly_who":["^He is taken aback by the question, a little stung.","\n","^He feels as though his relevance has been brought into question. ",{"#":"INTUITION"},"\n",{"#":"<Pause ms={SHORT_PAUSE * 1.33} />"},"^\"I- I- the Burly Bodyguard\"","\n",{"#":"<Pause ms={SHORT_PAUSE * 0.5} />"},"^He gathers himself and stands up taller.","\n","^\"I'm Mayor Rupert's lead bodyguard\"","\n",{"#":"include_continue_prompt"},{"#":"Burly"},"^\"Oh, well\"","\n",{"#":"<Pause ms={SHORT_PAUSE * 0.75} />"},"^\"That sounds like a real honour\" Mari responds.","\n","^She is grinning widely as she says it. ",{"#":"INTUITION"},"\n",{"#":"include_continue_prompt"},{"#":"Mari"},"^\"It is an honour\" the burly bodyguard responds bitterly.","\n","^His face folds, his frown a deepening grotesque.","\n","^He folds his arms protectively.","\n",{"#":"include_continue_prompt"},{"#":"Burly"},{"->":".^.^.rupert_confrontation_conclusion"},{"#f":1}],"rupert_confrontation_conclusion":["^Mari stands up onto the platform in the centre of the arena and calls out to the crowd.","\n","^\"Good people, what do we need a false mayor for? We are organising fine on our own!\"","\n",{"#":"Mari"},"^A number of cheers go up.","\n",{"#":"<Pause ms={SHORT_PAUSE * 0.5} />"},"^Others seem unsure. ",{"#":"INTUITION"},"\n","^The crowd is mumbling.","\n","^Now is your chance to speak.","\n",{"#":"* [Appeal to the mayor to permit the agora]"},"end",{"#f":1}],"#f":1}],"global decl":["ev",4,{"VAR=":"days_since_great_pop"},"str","^","/str",{"VAR=":"player_name"},false,{"VAR=":"player_self_knowledge_claim"},false,{"VAR=":"player_has_greensight"},0,{"VAR=":"player_courageous"},0,{"VAR=":"burly_suspicious"},0,{"VAR=":"douglas_hope_represent"},0,{"VAR=":"mari_suspicious"},false,{"VAR=":"asked_how_many"},"/ev","end",null],"#f":1}],"listDefs":{}}

    const inkStory = new InkJs.Story(storyJson);

    const getPerformerFromContent = (content) => {
        return performers[PerformerNames.NULL_PERFORMER]
    }

    const getResponses = (choices) => {
        let responses: IMessage[] = [];

        for(let i = 0; i < choices.length; i++) {
            let choice = choices[i];

            responses.push({
                shorthandContent: choice.text,
                performer: getPerformerFromContent(choice.text),
                selectFollowup: () => getNext(inkStory.ChooseChoiceIndex(i))
            });
        }

        return responses;
    }

    const getNext = (s: string = null) => {
        if(s == null) s = inkStory.Continue();

        let hasChoices: boolean = inkStory.currentChoices.length > 0;

        addMessage({
            content: <Text>{s}</Text>,
            performer: getPerformerFromContent(s),
            includeContinuePrompt: hasChoices ? false : true,
            getResponses: hasChoices ? () => getResponses(inkStory.currentChoices) : null,
            selectFollowup: inkStory.canContinue ? getNext : null
        });
    }

    useEffect(() => {
        getNext();
    }, []);

    return (
        <Dialogue>
        </Dialogue>
    );
    
}

export default function ReadFromInkStoryFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <ReadFromInkDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
