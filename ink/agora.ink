
INCLUDE bigCity.ink
INCLUDE relationships.ink

-> introduce_agora

=== introduce_agora ===

    "Salutations!" Says a young lady, with a beaming smile. "My name is Mari- " # Mari
    
    "Do you remember who you are?!" a man interrupts her. "I don't remember who I am, perhaps you know?" # Douglas
    
    "Of course they don't, Douglas. None of us do" # Mari
    
    -> do_you_remember
    
    = do_you_remember
    
        * [{"I remember who I am" | "Yes I remember who I am"}]
            "Wow! Then perhaps there is hope for all of us!" # Douglas
            His eyes are sparkling as he says it
            ~ player_self_knowledge_claim = true
            ~ douglas_hope_represent += 1
            
            {~Mari mumbles disapprovingly|Mari seems disrupted by your statement|Mari says nothing|Mari is frowning}
            ~ mari_trusting -= 1
            ->agora_meeting
          
        * [{"I don't remember who I am" | "No, I don't remember"}]
            Douglas seems disappointed by this
            ->agora_meeting
        * "I am gifted with the Greensight, I see things that others do not"
          "Like... knowing who you are?" # Douglas
          ~ player_has_greensight = true
          -> do_you_remember

    = agora_meeting
    
        <em>Your choices are affecting how other characters view you, and how you view them</em>
    
        {mari_trusting >= 0: Mari addresses you: "We've been meeting here, for several days, since the Great Pop. We call this the Agora, it's where we ask 'How do we want to live together'"}
        {mari_trusting < 0: Douglas address you: "We've been meeting here at the Agora, it's a governance of sorts. We've been piecing together what life was like, before the Great Pop. Perhaps then you will be the key to recovering the Old World, and rebuilding it!"}
        
        -> pre_meeting_questions
        
    = pre_meeting_questions
    
        VAR asked_how_many = false
        
        * How long since the Great Pop?
            "Have you just woken up?"
            Evidently this surprises her
            # Alicia
            
            "It's been {days_since_great_pop} days" Mari answers. "We've been meeting here for {days_since_great_pop - 1}"
            -> pre_meeting_questions
        * {not asked_how_many } How many people are here, in attendance?
            "Around fifty, in total" Mari answers
            ->pre_meeting_questions
        * {asked_how_many} And how many people, in the city?
            "A lot more than that" # Alicia
            "Our numbers are growing, little by little" # Mari
            -> pre_meeting_questions
        * Is the city governed here, in the Agora?
            Nobody seems sure how to answer this, there is a pause
            "Not so much 'governance', as far as I understand the term" # Alicia
            "Not in an everday sense" Mari admits. "But it's becoming known as the central place to engage in the city politics"
            -> pre_meeting_questions
        * No more questions
            -> rupert_introduction

=== rupert_introduction ===

    A man dressed in fine clothing is approaching, his face is red and puffy with sweat.
    He is leading a procession of five other men, dressed in bright uniform.
    # <Pause ms={LONG_PAUSE} />
    "And just /*<Pause ms={SHORT_PAUSE *0.25}/>*/<b>what</b> is the meaning of all this <em>nonsense</em>?!"
    # include_continue_prompt
    # Rupert
    
    He calls out to the audience, his arms waving theatrically:
    "Good citizens of <b>Rupertston</b>, I am your leader!"
    # <Pause ms={SHORT_PAUSE * 0.75} />
    "I understand that The Great Pop seems to have affected our memories but nevertheless!/*<Pause ms={SHORT_PAUSE * 0.25} />*/ <em>I am your mayor!</em>"
    # <Pause ms={SHORT_PAUSE * 1.25} />
    "Nevertheless I have all of the necessary /*<Pause ms={SHORT_PAUSE*0.25}/>*/<em>\*ahem\*</em> records to prove it"
    He is waving a ledger of papers in his hand
    # include_continue_prompt
    # performer: rupert
    
    * [Take a look at the records]
      It is a thick ledger of semi-organised documents bound in leather. The documents are pertaining to credits and debts owed the local City Mayoral, and to property records
      
      "Ledgers.. of property records, debts"
      
      "And the most recent ones... Signed and stamped by Yours Truly" Rupert adds smugly
      
      Douglas is reading the ledgers keenly over your shoulder
      
      A tall guardsman wrestles the ledger from your grip roughly. Your ribcage is sore from his efforts
    * [Say nothing]
      Mari snatches the ledger from his hand, and scans them scrupulously
      "Ledgers.. of property records, debts"
      
      "And the most recent ones... Signed and stamped by Yours Truly" Rupert adds smugly
      
      Douglas is reading the ledgers keenly over Mari's shoulder
      
      The tallest of his guardsmen wrestles the ledger from her grip roughly. Mari holds her ribcage and frowns deeply
    
    - "Your gathering here is illegal!" shrieks the tall guardsman, who is wearing a fiercely bright orange and white blouse.
    # include_continue_prompt
    # Burly
    
    * "Who are you?"
        ~ burly_trusting -= 1
        -> burly_who
    * "Illegal? Says who?"
        ~ burly_trusting -= 2
        ~ player_courageous += 1
        
        {player_has_greensight: This man's aura has become tense and carries the potential of violence }
        -> burly_who
    * [Say nothing]
        "Who are you?"
        # Mari
        
        -> burly_who
    
    = burly_who
    
        He is taken aback by the question, a little stung.
        He feels as though his relevance has been brought into question. #INTUITION
        # <Pause ms={SHORT_PAUSE * 1.33} /> 
        "I- I- the Burly Bodyguard"
        # <Pause ms={SHORT_PAUSE * 0.5} />
        He gathers himself and stands up taller.
        "I'm Mayor Rupert's lead bodyguard"
        # include_continue_prompt
        # Burly
    
        "Oh, well"
        # <Pause ms={SHORT_PAUSE * 0.75} />
        "That sounds like a real honour" Mari responds.
        She is grinning widely as she says it. # INTUITION
        # include_continue_prompt
        # Mari
    
        "It is an honour" the burly bodyguard responds bitterly.
        His face folds, his frown a deepening grotesque.
        He folds his arms protectively.
        # include_continue_prompt
        # Burly
        
        -> mari_questions_rupert
    
== function king_rupert_chastises_burly ==
   "Burly, what have we discussed about speaking before you're spoken to?"
    "And it's <em>Your Grace</em>, now."
    He stands straighter as he says it. He likes the sound of it, <em>Your Grace</em>.

=== mari_questions_rupert ===
    
    Mari stands up onto the platform in the centre of the arena and calls out to the crowd.
    "Good people, what do we need a false mayor for, and why do we need his ledger?"
    # Mari
    
    A few people in the agora cheer, but others seem unsure
    
    -> debt_discussion
    
    = debt_discussion
    
        "What is in the ledger?" Douglas asks
        
        "<b>Debts</b>". She pronounces the word with clear distaste. "Obligations to pay, forced by the state. You need to find a way to pay them, and until you do you are not free"
        
        There is a concerned mumbling, at the thought of "unfree"
        
        "The debts are taken from us, paid to men like <em>him</em>, as a way to manipulate our activities into funding their enterprise"
        
        "That <em>enterprise</em> is serving the community" Rupert protests
        "The debts are to eachother, in principle"
        "You are all naturally self-interested, and you act in order to serve yourself! However we each can provide for things that the other needs, and so it follows that we offer things to each other in <b>exchange</b>, need for need"
        "By paying eachother using my <em>currency</em>, you are able to transfer the debt to me, knowing safely that it is <em>guaranteed</em> by the vitality of my force. You can trust that the debt is <em>protected</em>"
        
        Burly is radiating pride when Rupert discusses the vitality of his force
        
        "In return, you pay me a portion of that debt back each month, and respect my order. This forms our <b>social contract</b>, and ensures that we don't descend into chaos"
        
        * "Without a powerful state, it is a war of all against all"
          "We are selfish by nature, and will not provide for eachother unless we are to gain"
          "Friends, we <em>need</em> a powerful state, to bind us into the common interest, to serve the collective will"
          
          ~ mari_trusting -= 1
          ~ rupert_trusting += 1
          
          "To serve the collective will, and <em>me</em>, its' arbritor!" Rupert adds eagerly
          -> debt_challenge
        * "There is only a need for this trust if there is hostility"
          "We are motivated by <em>care</em>, and we regularly care for eachother beyond our immediate selves. There are any number of ways that we can pool resources, and we really only need <b>trust</b>, when we are not <em>caring</em> of the person to whom we are <em>giving</em>"
          
          ~ mari_trusting += 1
          ~ rupert_trusting -= 2
          
          "Sedition!" Burly complains
          
          "I will <em>not</em> let you subvert my sacred right to distribute wealth!"
          
          ** They have to be stopped!
              ~ player_courageous += 1
              ~ mari_trusting += 1
              
              <em>You must not allow them to take your collective property!</em>
              A voice calls from deep within you
              
              You know now what you have to do
              
              *** Sing!
                 From the deep pool of resistance which goes down to your very core and into the abyss of your soul, a voice calls out
                 
                 "NOOO!" it roars, fading softly into silence, before rising once more as a soft melody:
                 
                 "We'll be eating soup of stone til what we grow is what we own.."
                 "But we won't steal from the land what's freely given"
                 "Tear up the deeds to the land, throw the debts into the furnace, debts to <em>God</em> to the <em>banks</em> and to the <em>landlord</em>"
                 "And even if we're just one pistol against an army of policemen, I <em>insist</em> that we are many and they are few"
                 "If we don't stand up now then we might never and we'll never know again our freedom taken"
                 
                 "Enough!" Rupert calls, cutting your song short
                 
                 -> debt_challenge
          ** Let it go
            -> debt_challenge
          
    = debt_challenge
      "You are all already in debt, you have just forgotten about it. But you still need to pay it. Your ancestors made the social contract, and so you are bound to it"
      
      "Our existence is a debt to God" # Francis
      
      "And it is repaid in service of the Nation" # Rupert
      
      "Why should we repay debts for loans that weren't made by us?" # Mari
      
      "Because if you don't, we'll lock you up" # Burly
      
      "Why should you get to decide which loans to make and how they should be repaid? Why don't we decide together?" # 
      
      "What <em>you lot</em>? Don't make me laugh. You'll all just compete constantly to maximise your own benefit. You need the state to limit your crude greed"
      
      -> rupert_conclusion
     
    = rupert_conclusion
      
      * {rupert_trusting >= 0} [Appeal to the mayor to permit the agora]
          "Your Grace" you propose softly, your voice sweet like a song
          
          "Permit us in your wise benevolence, to recommence our discussions under your supervision?"
          
          {burly_trusting < 0: Burly does not trust you}
          
          "I <em>am</em> benevolent" Rupert admits, chewing it over slowly
          
          {player_has_greensight: There is a dark hunger beneath this man's jovial exterior. It is gnawing at him and crying for power}
          
          "But I will not permit sedition"
          
          -> rupert_conclusion
        * [Crown Rupert King] -> player_claim_rupert_king
        * [Banish the Impostor] -> player_exile_rupert
          
    = player_claim_rupert_king
      You fill your lungs with air and stand straight.
      You are projecting such a lionesque dominance that everyone is watching you, silent.
      "My liege, forgive me to be telling you this but you mistake yourself"
      "Look at the uniform of these men" you declare, making eye contact with each citizen in the crowd in turn.
      "This is not the uniform worthy of a mayor's troop, NAE!"
      
      The burly man makes a motion to interrupt you but he is silenced by his boss.
      
      "This man... was our KING!"
      There is a collective gasp.
      "It is God's will that he rule over us. When we excercise our activity to his will, we are also exercising our activity to God's will!"
      <em>They're buying it!</em> you think to yourself
      Rupert is grinning very widely
      It must be the sensational <em>authority</em> that you're projecting.
      ~ player_authority += 1
      
      Slowly, the crowd turns in your favour, and the dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert.
      Big City is now an <b>Absolute Monarchy</b>.
      Rupert is now King!
      ~ governance = "absolute_monarchy"
      ~ rupert_trusting = 20
      ~ burly_trusting += 1
      ~ city_name = "Rupertston"
      ~ ruler = "Rupert"
      
      <em>King Rupert's eyes have started to sparkle whenever he looks at you.</em>
      
      Mari's face is a picture of her lost utopia.
      "But.."
      The cheers of the crowd drown her out
      
      "Long live the King!"
      "Long live the King!"
      "Long live the King!"
      
      The King and his men are gazing at you in stupified admiration.
      "You've done well today, old sport!"
      "Your ambition is remarkable"
      He turns to the crowd and hushes them to silence
      "In my grace, I will allow this meeting to continue, as my <em>court</em>!"
      "You there, fetch me a throne!"
      
      Douglas finds a nearby picnic bench and heaves it to the centre of the ampitheatre
      As Rupert takes a seat Burly eagerly bounds over to his side. Rupert beckons you to stand by his left
      
      * [Join Rupert loyally]
        
        ~ player_loyal_to_rupert = true
      * [Join Rupert reluctantly]
        
        ~ burly_trusting -= 1
        ~ player_loyal_to_rupert = false
      
      - "My people! Come to me with your problems and I will rule on them fairly and <b>absolutely</b>!"
      
      -> introduce_leopald
      
      
    = player_exile_rupert
      ~ player_courageous = 3
      
      "This man <b>is</b> an impostor! Worse still he is a leech!"
      "If you ask me, {player_self_knowledge_claim: and I am the Chosen One, }then I say we're better off without him!"
      "All power to the people! All power to the <em>Polis</em>!" # Player
      
      Just a few at first, then the crowd, chant in unison: "Long live the Polis!" # repeat
      
      The would-be mayor looks around nervously.
      Indignant fury crosses his face.
      "You <b><em>need</em></b> me"
      The crowd does not hear him through the chanting.
      # <Pause ms={LONG_PAUSE * 1.5} />
      His protests become increasingly desparate.
      He throws a sharp look to the his lead guard.
      "Burly. <em>Do something</em>."
      
      "Get 'em men!"
      He lifts a proud fist into the air to accompany the command.
      # <Pause ms={LONG_PAUSE} />
      Nothing happens.
      # <Pause ms={SHORT_PAUSE} />
      Burly looks about him, most of his men have gone.
      Those who remain are chanting with the others.
      
      "Long live the Polis!"
      
      Burly and the would-be mayor beat a slow retreat from the crowd.
      
      ~ rupert_trusting = -10
      ~ burly_trusting = -10
      ~ rupert_exiled = true
      
      * [Mock them as they leave]
        "Yeah you better run! And your outfits are terrible!"
        # <Pause ms={SHORT_PAUSE * 1.25} />
        That hit its' mark. You can hear the wound from here.
      * [Say nothing]
      
      - "Yeeeahh!"
      Mari is elated as she watches the exiled pretenders flee.
      # <Pause ms={SHORT_PAUSE} />
      "Long live the Polis!"
      
      Rupert is looking over his shoulder as he leaves, his face is a picture.
      # <Pause ms={SHORT_PAUSE} />
      
      "This is such an <em>exhillarating</em> feeling!"
      
      "There is no burden of power over us, no burden of tradition behind us" she says with a long sigh
      # <Pause ms={SHORT_PAUSE * 0.5} />
      "We are held back only by the capabilities of our language and the limits of our abilities"
      "We are the masters of our own destiny"
      
      ~ mari_trusting = 2
      {player_has_greensight: Mari looks to you as an ally}
      
      -> introduce_leopald
      
    = introduce_leopald
      "Are we ready for this?"
      Douglas gestures around him
      "We - our ancestors - surely built this city, and it's impressive to be sure, but we don't even remember <em>how</em> we did it"
      {rupert_exiled: You said that we are masters of our own destiny}{not rupert_exiled: We may be the masters of our own destiny}. But how can we ensure that we are not just masters of our own peril, if not by following from tradition?" # Douglas
      
      "Yes!" a man shouts, all in a rush.
      "These are my concerns exactly"
      
      "My name is <b>Leopald</b>, and I am a general in the {ruler == "Rupert": Royal} <em>army</em>"
      
      "Here, now, when all this is so fresh, <em>of course</em> we will all co-operate with eachother but a week from now? A month?"
      "It's been <b>{days_since_great_pop} days</b> since the Big Pop. I've flicked through some of the <b>history books</b> I found down by the library. Do you know what I saw?"
      
      "I've only flicked through and looked at the pictures but..."
      "I saw a lot of pain and suffering. Soldiers and wars, famines and plagues. Most of it was <em>man-made</em>"
      
      { player_has_greensight: There is a look of deep concern on Douglas' face. He is engrossed by the potential lessons of history }
      
      "I think that it's clear that we need to establish a strong <b>state apparatus</b> to help ensure that we do not revert into a state of chaos"
      { ruler == "Rupert": "At its' head, of course, our wise King" }
      
      -> responding_to_leopalds_initial_suggestion
      
    = responding_to_leopalds_initial_suggestion
    
      VAR asked_about_old_world_state = false
      
      * "Did the Old World have a state apparatus?"
        "I don't recall" Leopald answers evasively
        "But if they did, it certainly wasn't strong enough!"
        
        "If the Old World needed to use some force to make things fit into a certain way.. maybe it was necessary?" Douglas suggests
        
        { player_has_greensight: Douglas' words are said through significant discomfort }
        ~ douglas_faith_in_old_world -= 1
        ~ asked_about_old_world_state = true
        -> responding_to_leopalds_initial_suggestion
    
      * "People must be kept in line, for our own protection"
        
        "There are a wide variety of <b>dangerous people</b> who would do us harm. To an extent we are all potentially dangerous. The only way to ensure that we are all civil is to coerce us in line"
        
        { ruler == "Rupert": "To maintain the Kings' peace, some force must be necessary" Rupert agrees with a certain macabre tone. { player_has_greensight: It is not genuine } }
        ~ player_values_order = true
        
        -> prison_dilemma
      
      * "A state is necessary, but only to ensure that the People's will is carried out"
    
        "This, surely, is the only justification of force" Leopald agrees. { ruler == "Rupert": "And the essence of a King's divine right" }
        
        "The State has the power to coerce those who will not bend"
        
        ~ player_values_order = true
        
        -> prison_dilemma
        
      * "People must be free from the State's inherent tyranny!"
        
        { ruler == "Rupert": Rupert begins to cough uncontrollably. "And what about the <b>tyranny</b> of <b>sedition</b>?!. No. Unacceptable" -> responding_to_leopalds_initial_suggestion }
        
        Mari is nodding in agreement
        
        "But there may be times where we <em>have</em> to use force, to defend our liberty" a man complains
        
        "We can always use force later, if we have to. But we cannot un-use force" Francis observes
        
        "We do not need to <b>institutionalise</b> violence" Mari agrees
        
        -> prison_dilemma
        
      * {ruler != "Rupert"} "The violence of the State is detestable!"
        "Since when was <b>organised violence</b> a part of 'how we want to live together'?"
        
        -> prison_dilemma
        
      * [Say Nothing]
        "Pish!" Mari complains
        { not asked_about_old_world_state: "I read up on some history too, and they <em>had</em> a State apparatus }
        "Since when was <b>organised violence</b> a part of 'how we want to live together'?"
        
        -> prison_dilemma

== prison_dilemma ==
  { not player_values_order: "My dear you're being <b>naïve</b>" }
  
  "It only takes one <b>murderer</b> to spoil a <b>picnic</b>" # Leopald
  
  { player_has_greensight: Leopald introduced himself as a <b>general</b>. He is a military man and sees society through a military lens }
  { player_has_greensight: You perceive a similar quality in Mari's perspective }
  
  -> murderer_question
  
  = murderer_question
  
  * "I do not believe that it's in our nature to kill one another"
    "And yet it does happen" Leopald refutes
    -> murderer_question
  * "Should we not try to prevent murder from happening by targetting its' causes?"
  
    "Certainly. But this objective is remote and difficult to reach. We have to ask ourselves, what do we do with the murderers who exist in the meantime, and how do we <b>deter</b> them from murdering"
    
    "Which murderers?" Mari complains, evidently frustrated by the hypotheticals at play
    
    -> prison_introduction
    
  * "And what would we do with these 'murderers'"? -> prison_introduction
  
  = prison_introduction
  
    "When I woke I was in a collosal building, <b>'{city_name} Prison'</b>. I was with others, we realised we were <b>guards</b> there"
    "Its' purpose was to hold <b>prisoners</b>, to keep them away from society and cleanse them of their demons" # Craig
  
    "I was a prisoner there. They were locking us up in there. <em>Human beings</em> locked into tiny cells. It makes me feel sick"
    "Some of the guards let us out" # Andrew
    
    { player_has_greensight: He has visions of traumatic memories locked away. He pushes them to the back of his mind }
    
    "The prisoners were locked away for the good of society. And for their <em>own</em> good, too. You need to be <b>rehabilitated</b> before you're ready to rejoin society"
    
    "I don't see how any of that could have been for my own good. And I'm not going back in there"
    There is some distress in his voice
    
    "Perhaps they were not <em>always</em> right then, clearly. But neither surely were they <em>always</em> wrong?" # Zoe
    The statement is intended to relieve the tension.
    
    * "The prison was primarily a tool of oppression"
    
      "Yes. The <b>old ways</b> are something to be overcome" # Mari
      
      ~ mari_trusting += 1
      ~ andrew_trusting += 1
      ~ player_revolutionary += 2
      ~ douglas_hope_represent -= 1
      ~ rupert_trusting -= 1
      
      -> prison_abolition
      
    * "The prison was not necessary, it was cruel"
     
      <em>Andrew visibly appreciates your solidarity</em>
      
      ~ andrew_trusting += 2
      ~ player_revolutionary += 1
      
      -> prison_abolition
     
    * "We do not need a prison. We can resolve conflicts collectively"
      "Locking someone up only serves to alienate them from society further"
      "It's sweeping a problem under the rug, instead of dealing with it"
      "Before we build this kind of system, we should ask ourselves - what do we want it to achieve?"
      
      "It should be <em>restorative</em> as much as possible, focussed on allowing me to repair the relationships I may have damaged" Andrew suggests
      
      "It should be focussed on <em>preventing</em> the behaviour from happening again" Mari suggests
      
      Other suggestions are made by many in the discussion. Douglas has started to take notes.
      
      "... Decisions will be made collectively and based on consent, with a circle being delegated to <em>implement</em> the process." # Mari
      
      This is found to be acceptable by the majority of the agora. Andrew and several others volunteered to be a part of this circle, their actions under the supervision and authority of the agora as a whole.
      
      Leopald is at first adamently opposed to the suggestions, when all of a sudden he is convinced.
      "Yes, yes... I see the value in what you are saying now, Mari"
      "And the body which you are leading, Andrew, will be responsible for establishing our new... <em>egalitarian</em> infrastructure"
      
      "And naturally, of course, another body will be needed, to <em>enforce</em> our new regime"
      "To deal with those who would oppose us. To protect ourselves"
      
      ~ prison = "restorative"
      
      { ruler == "Rupert": -> attempt_abolish_prison_rupert_king }
      
      -> organised_violence_dilemma
    
    * "We should replace the prison with something more focussed on <em>reform</em>"
      "The old ways were necessarily cruel"
      "Or else it would not have been an effective detterant"
      "Clearly at least an <em>element</em> of our nature is sinful"
      "To shape the society that we wish to live in we must punish wrongdoing and reward goodness"
      
      You feel a little tense about your use of the word cruel
      ~ andrew_trusting -= 1
      ~ leopald_trusting += 1
      
      "The old society... used to reward goodness? Did you see this in the history books, Leopald? Could you tell use more?" # Douglass
      
      "I.. er.. I don't know if I could say for definite. As I say, I just skimmed the pages. I believe this was always their aim"
      
      ~ douglas_hope_represent += 1
      
      "You <em>believe?</em> So you don't know" # Mari
      
      "What else would their aim be? It's our aim, isn't it?"
      
      "I think that the prison might not <em>always</em> be necessary, perhaps we can use it sparingly"
      "But it can be a powerful tool, in order to shape <em>our citizens</em> to be the way we want them to be"
      "Naturally.. it will require enforcement, it requires us to form a <b>state</b>, capable of pursuing - and protecting - our <b>utopian vision</b>"
      
      ~ prison = "reforming"
      
      { ruler == "Rupert": -> attempt_abolish_prison_rupert_king }
      
      -> organised_violence_dilemma
      
    * "The prison was absolutely necessary, it is a <em>deterrant</em>"
      "Within each of us is a <b>beast</b>. We are <b>selfish</b>, <b>sinful</b> beings always seeking to maximise our own gain, and we have a great proclivity to violence"
      "We <em>must</em> use the prison, to ensure <b>order</b>. Without it would be chaos"
      
      Leopald is nodding emphatically
      
      Mari and Andrew are significantly less pleased
      
      ~ andrew_trusting -= 1
      ~ mari_trusting -= 3
      
      Your arguments sway the agora. The prison is here to stay!
      
      ~ leopald_trusting += 1
      ~ player_values_order = true
      ~ prison = "strict"
      
      "And this, of course, implies a <b>strong state</b> capable of maintaining order" # Leopald
      
      -> organised_violence_dilemma
      
  = prison_abolition
    "We should try to resolve all of our issues face-to-face" You begin.
    "We should focus on restorative justice, and on solving the issues which cause transgressions"
    "If it comes to it, we can discuss transgressions and punishments collectively to find solutions"
    
    ~ player_revolutionary += 2
    
    { ruler == "Rupert": -> attempt_abolish_prison_rupert_king }
    
    -> prison_abolition_resolved

  = attempt_abolish_prison_rupert_king
    "The prison will <em>not</em> be abolished. Or reformed, for that matter. Your king has thus spoken"
    
    * Accept Rupert's decision
      You bow low and make exaggerated apologies for your myopic imprudence. Rupert appreciates this greatly and he tips his head as a token of his forgiveness.
      
      ~ rupert_trusting += 1
      ~ player_loyal_to_rupert = true
      
      "My liege" Leopald begins, kneeling and bowing his head to mimic your reverance
      
      -> leopald_imprison_dissidents
      
    * Turn Rupert into a cat
      Really?! Are you a wizard?
      ~ player_loyal_to_rupert = false
      
      ** Yes I am
        You outstretch your hands and close your eyes, and concentrate all of your magic energy into your fingertips
        Silently you allow yourself to be lost in your power, to disappear from your physical body into a metaphysical world of hairballs, of mice and little saucers of milk
        <em>'Ruppperrtttttt'</em> comes a voice from far beyond the real world
        <em>'Here puss puss puss puss'</em>
        
        When your eyes open again, you are back in the agora. There is an air of absolute awe at your abilities
        
        King Rupert has become a fluffy white cat, and perched atop his throne he is drinking eagerly from a little milk saucer
        
        -> rupert_is_a_cat
        
      ** No I am not
        You outstretch your eyes and close your eyes, wiggling your fingertips. You can sense the whole agora watching you and waiting in suspense
        
        Moments pass. You are deep beyond the veil of reality, deep in the magical realm
        Then you are back. You suddenly become conscious that you are stood with your eyes closed, wiggling your finger. "Here puss puss puss puss" you are saying. "Here Rupey Rupey Rupert. Come and get your milk"
        
        There is a long pause, and then an uproar of laughter. Burly is evidently furious with your antics. Rupert less so, but he is looking at you like you're a fool
        
        ~ player_is_failed_wizard = true
        ~ rupert_trusting -= 1
        ~ burly_trusting -= 2
        
        *** How dare he look at me that way?!
            "How dare you?!" You demand. "You sit on a fool's throne and you have the gall to look at <em>me</em> that way? I am a <em>WIZARD!</em>"
            
            **** When my power is back, they'll be sorry.
            - <em>You have emphatically rejected the identity of the fool</em>
            
            ~ player_fool = "resistance"
        *** How embarrassing!
            <em>You have accepted the identity of the fool, and it shames you</em>
            ~ player_fool = "shame"
        *** A fool? Why not, we're all fools are we not?
            <em>You have accepted the identity of the fool, and you revel in it</em>
            ~ player_fool = "embrace"
        *** [This does not bother me]
        
        - "Er.. my liege? There was something I wanted to ask you before we were.. interrupted". Rupert nods. "Speak" he commands -> leopald_imprison_dissidents
        
  = rupert_is_a_cat
    ~ douglas_hope_represent += 1
    ~ rupert_exiled = "cat"
    
    The agora is watching you in stunned silence. You notice that Douglas in particular is shocked, stood there with an open mouth. It is a long time before the silence is broken again
    
    * "I am your monarch now!"
      ~ ruler = "player"
      
      The word 'Monarch' seems to bring Burly crashing back into reality. His face is pale with fear and he has been staring at Rupert for a while. Rupert is purring happily and licking his fur
      "Boss?" he says, looking up at you from confused grey eyes
      
      ** Accept your minion
         You nod, sweeping the cat from your throne and causing it to complain loudly. When you sit Burly stands straight and proud at your side
         ~ burly_trusting = 5
         ~ burly_minion = true
      ** Magic up a better minion
         "Get lost Burly!" you shout decisively. You add nothing, and wait for him to awkardly oblige, shuffling off towards the back of the crowd
         You close your eyes again and return to the spirit realm, preparing to summon your ideal 'assistant'. You picture them and they are..
         
         ~ player_alt_minion = true
         
         *** A cybernetic warrior, fierce and caluclating!
         *** A special agent, cunning and resourceful
         *** An Elven prince!
         *** A mortal man, stern and scrupulously attentive
         *** A military captain, diligent and strategic
         - Poof! The crowd is stunned once again by your brilliance
         - You grant a name to your new minion # Name cue
      ** I don't need a minion!
         "Get lost Burly!" you shout decisively. "This monarch doesn't need a minion"
         "I'm a lone wolf"
         
         { player_has_greensight: Burly is rather distressed }
         ~ burly_trusting -= 5
      - <>
      
    * "Forget what I said about the whole... King thing... it was just a phase..."
      You go to add more, but you're not sure of what to say
      
      ~ ruler = false
      ~ governance = "agora"
      
    - In the end it is Leopald who brings the conversation back to a semblence of normality -> leopald_insists_on_statehood
      
  = prison_abolition_resolved
    Leopald eyes each of you coldly, but he does not speak for a long while.
    
    The others are anticipating what he might say.
    
    -> leopald_insists_on_statehood

  = leopald_insists_on_statehood
    "My comrades and peers, I share in your vision of creating a utopian society, really I do"
    "I felt that a prison apparatus would be necessary it is true, necessary to protect our vision from those who would do it ill"
    "But there is a greater threat to us than the sin of individuals - and that is the threat of <b>armed gangs</b>"
    "What is the worth of all we will build, if someone decided to <em>take</em> it from us?"
    "Naturally - and to protect ourselves - it is imperative that we form our own armed group - a <b>state</b> - staffed by our trustworthy Utopianists, and capable of protecting our vision"
    
    ~ prison = "abolished"
    
    -> organised_violence_dilemma

== organised_violence_dilemma ==
  // not currently possible that Rupert is king and you arrive here
  // * {ruler == "Rupert" && player_fool != "shame" && player_fool != "resistance" && prison != "strict" } "Our King has no need of Terror. We should consider him instead as a counsellor to the people"
    
    //"I'll be the judge of that!" Rupert complains
    //~ rupert_trusting -= 1
    
    //** {not player_has_greensight} [Warn Rupert of Leopald's ambition]
    //** {player_has_greensight} [Claim to have forseen Leopald's treachery]
    //** [Propose yourself as Rupert's lead general]
    //** [Say nothing]
    //   "Wisely said, oh wise and handsome King" Leopald grovels
    //   "A strong army will ensure 
    
  * {ruler == "player"} "My rule will not be tainted by the use of Terror. Consider me instead as your counsellor"
    "A counsellor who can turn people into cats" Leopald jests
    
    { player_is_wizard: -> leopald_disables_player_magic }
    { not player_is_wizard: -> coup_dilemma }
    
  * {governance == "agora"} "Violence is justifiable out of necessity, but organised violence would hamper the freedom of our agora"
    "There are times when violence is necessary, for example in self-defence it is justified"
    "But this simple fact does not mean that we will abandon our dreams of a direct democracy without tyranny"
    "The agora is the <em>only</em> state apparatus that we need"
    -> coup_dilemma
    
  * "We must destroy the armoury, lest it become a <b>threat</b> to our nonviolent utopia!"
  
    ~ armoury_destroyed = true
    -> coup_dilemma
    
  * [Violence is exclusively the right of an estbalished state which will be kept in check by representation]
    "I believe that Leopald is right in the need of an established state, to protect us from the threat of <b>mob rule</b>"
    
    "What makes this 'state' any different from any other armed mob?!" Mari demands
    ~ mari_trusting -= 1
    
    "<b>Representation</b>", you begin
    "The armed group will be <b>organised</b>, and structured on discipline and <b>self-restraint</b>. We will vote from those among us who will represent us in the leadership positions of this organisation, and in so doing we will keep it in check"
    
    { not ruler: As the majority think over your proposition it is becoming popular}
    { ruler == "player": <em>You have abdicated your throne!</em> }
    
    ~ governance = "representative_democracy"
    ~ ruler = false
    
    It soon surfaces that Leopald in particular is not content.
    
    -> coup_dilemma
   * "Let us instead empty the armoury to arm the mob!"
     "There will be no <b>armed minority</b>, because instead we will arm the <b>majority</b>! There will never be a <b>coup</b>, because we will <b>outgun</b> them!"
     "Long live the People! May their aim be ever true!"
     
     "Hurrah!" Andrew cheers. He is emphatically in agreement with your aims. { governance == "agora": Most of the others seem less sure, but you are betting that your armed 'mob' will carry enough to take over }
     
     -> coup_dilemma
    
  = leopald_disables_player_magic
    Leopald throws you a rock and you catch it instinctively
    
    Oh no, a Hellebite rock! The one weakness of your magic
    { player_alt_minion: Your minion vanishes into steam, your magic fading you are unable to maintain the conjuring }
    You shake your hand, pull at the rock and try to dislodge it by every means that you can, but to no avail. Something is keeping it attached to you
    
    { burly_minion: Burly is stood frozen to the ground with fear. He doesn't know what to do }
    
    -> coup_dilemma
    
== coup_dilemma==
  "I already left for the <b>arsenal</b> this morning" Leopald reveals..
  "I went with some <b>likeminded individuals</b>, and we armed ourselves to the teeth"
  "These proud defenders of liberty are lurking in the <b>shrub</b> with our guns, awaiting my word"
  
  You notice a rustling in the bushes
  
  "The utopia we wish to build must be built on virtue <em>and</em> terror, in equal measure"
  "Will you stand in our way, and fall by the sword of virtue, or repent, and live?!"
  
  * You believe Leopald has an armed force in waiting
    So then... you are surrounded
    -> leopald_has_you_surrounded
    
  * You are sure that Leopald is bluffing
    You scoff. "Oh yeah?!"
    "I don't believe you could find <b>ONE</b> fool to follow you Leopald, let alone a dozen!"
    
    Leopald is looking at you from behind a poker face
    "Arsene" he requests at a raised voice
    
    A man steps out from beyond the bush, he is carrying a carbine rifle
    You feel a lump in the back of your throat
    
    ** [One man.. well that doesn't prove anything]
       "What does <b>one man</b> prove?! Even with a rifle. I could take him"
       
       { burly_minion: "You could take him boss" }
       { burly_minion: "Yeah I could take him" }
       
       "Would you like to try?" the gruesome looking man asks. Something about the way he says it is quite intense
       
       -> player_silent
       
    ** [Okay, he might be telling the truth] -> leopald_has_you_surrounded
    
  = leopald_has_you_surrounded
    * There's only one thing for it [PANIC]
    
      ~ player_courageous -= 3
      -> player_panics
    * {player_courageous > 0} [You're not scared!] -> player_defiant
    * Your face goes a ghostly white. You remain still as stone -> player_silent
    * You remain silent, stoicly
      ~ player_courageous += 1
      -> player_silent
  
  = player_panics
    You are willing with great ferocity to speak, the energy builds and builds until finally the words burst from your lips
    "Have mercy!"
    
    -> player_silent

  = player_defiant
    <em>"I'm not scared!"</em> you tell yourself convincingly
    "I'm not scared of you!"
    
    Leopald is looking at you with a sort of gleeful look of a toddler, he is thoroughly enjoying your defiance and it has taken him by surprise
    
    -> player_silent
  
  = player_silent
    Mari has turned on her heels and ran away. Leopald laughs smugly as she runs
    He licks his lips. { player_has_greensight: He has been eager for this moment, he is revelling in it }
    
    Leopald's co-conspirators have begun to step out from the line of bushes. You count seven in total
    <em>A coup, with seven soldiers?!</em> you wonder
    
    Leopald glances at you nervously, as if reading your mind
    "There are many more of us!" he announces. "Those of you who comply will be amply rewarded. Resist and you will be crushed"
    He looks about the faces in the crumbling Agora
    "We will be reinstating the police force, and returning them to their former prestige"
    { douglas_hope_represent <= 0: "We will be restoring the order and rationality of the <em>Old World</em>" }
    
    He turns to face you now. "{ player_name } you are under arrest, for your crimes against the Big City Republic"
    "Round up the other <b>troublemakers</b> and throw them in the prison" he commands the soldiers
    "We'll decide what to do with them later"
    
    A soldier grabs you by your arm and roughly jerks you in front of him, his rifle to your back. Another ties your wrists together. They drive you from the agora and through the park, to the gates. Andrew is taken prisoner as well, you are dimly aware
    By the gates there are two more armed guards. They watch on nervously as a crowd is gathering outside
    {player_has_greensight: It seems that word has been spreading}
    
    "Disperse!"
    He shouts it into a crowd that does not hear him
    "Disperse!"
    
    A troop approaches over the horizon, making a lot of noise. You cannot see how many there are, maybe three dozen
    They are calling people onto the street to join them
    They are full of energy
    You spot Mari at the head of the crowd. She must be spreading the word
    
    * [Call for help]
      "Mari!" you call out, but the soldier <em>SLAMS</em> the butt of his rifle into your stomach and you keel over in pain # Slam effect
      -> battle
      
    * [Shout a warning]
      "Mari!" you call out, but the soldier <em>SLAMS</em> the butt of his rifle into your stomach and you keel over in pain # Slam effect
      -> battle
      
    * [Say nothing] -> battle
    
  = battle
    { mari_trusting > 0: "{player_name}!"} {mari_trusting <= 0: "Andrew!"} she calls, rushing forward to help.
    Where she treads the crowd follows, despite the danger. Leopald and his followers have now caught up, and their rifles pointed into the crowd.
    
    <em>They will not fire</em> you think to yourself. That would be madness.
    
    <b>BOOM!</b> a rifle sounds. # shake effect
    You do not know if it was on purpose
    The echo rings through your body into a terrible abyss # fade out transition
    
    "{player_name}?" # fade in and out
    "{player_name}?"
    "Are you alright?" # fade in
    You flutter back into consciousness, and the world seems to flutter with you.
    Andrew is stood over you. He is holding a rifle. There is blood across his chest
    
    You look about you, dizzy. There are bodies strewn everywhere.
    You see Leopalds first, and his guards.
    You see other faces, some you recognise dimly, others the faces of complete strangers.
    You see Mari, her face pale and her eyes icy. The life has left them
    You cannot hear what Andrew is saying
    All the death you around you is making a racket, and you are being bounced back and forth
    Someone is helping you to your feet and guiding you away, back to the Agora.
    The birds are chirping. It's so peaceful here
    
    "When you are recovered enough there will be a meeting in the Agora to discuss what happened" Andrew is explaining
    
    -> DONE

== leopald_imprison_dissidents ==
  "It is evident to us all, of course, the wise benevolence in which your prisons operate. We see that they are as much a service for the imprisoned themselves as for society at large"
      "But it pains me to admit the scale of <b>dissidence</b> which exists in the hearts of some here today"
      
      { player_has_greensight: the space has become very tense }

  He points to Mari and Andrew in turn, slowly. "THEM!" he shouts
  "These heretical MALCONTENTS, my liege! They would see you overthrown!"
  "I have seen it time and again in the history records. Malcontents from the lower classes who blame those of <b>success</b> for the makings of their own <b>failures</b>" He seems to be explaining that part especially to Douglas
  "Your Highness it is my counsel that we imprison them <em>immediately</em> and <em>indefinitely</em> before their evil sedition should spread. We must outlaw ill words spoken of the King or his decrees. For after all what place is it of the clay to question the judgement of its' maker?"
  
  * "No! These are my friends!"
  * "No! My liege, we must protect <b>free speech</b>!"
  * Accept their imprisonment


-> END