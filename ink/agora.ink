
INCLUDE bigCity.ink
INCLUDE relationships.ink
INCLUDE animation.ink

-> introduce_agora

=== introduce_agora ===

    <Null:> You follow the path which leads downhill, taking care on the slope.<br/>You come upon a large circular clearing enclosed by the remains of ancient stonework steps, steep and incomplete.<Pause {long_pause}><br/>There is a crowd of people here, in between the ruins.<br/>They are talking as a group with some energy.<Pause {short_pause}><br/>It becomes apparent that you are not the only one who does not remember.<br/>In fact, nobody does.<Pause {long_pause}><br/>The others have been awake for longer, they are discussing what they are supposed to do next. <Continue>

    <Mari:> "Salutations!" Says a young lady, with a beaming smile. "My name is Mari- "<Pause {short_pause * 0.5}>
    
    <Douglas:> "Do you remember who you are?!". He is addressing you <Continue>
    
    <Mari:> "Of course they don't, Douglas. None of us do"
    
    -> do_you_remember
    
    = do_you_remember
    
        * <Player:> { "I remember who I am" | "Yes I remember who I am"}
            <Douglas:> "Really?<Pause {short_pause}> Wow!<Pause {short_pause * 0.3}> Then perhaps there is hope for all of us!"
            <Null:> His eyes are sparkling as he says it <Continue>
            ~ player_self_knowledge_claim = true
            ~ douglas_hope_represent += 1
            
            <Mari:> {~Mari mumbles disapprovingly|Mari seems disrupted by your statement|Mari says nothing|Mari is frowning} <Continue>
            ~ mari_trusting -= 1
            ->agora_meeting
          
        * <Player:> {"I don't remember who I am" | "No, I don't remember"}
           <Douglas:> He seems disappointed by this <Continue>
            ~ mari_trusting += 1
            ->agora_meeting
        * <Player:> "I am gifted with the Greensight, I see things that others do not"
          <Douglas:> Douglas looks skeptical <Pause {short_pause * 0.5}>
          <Douglas:> "Like... remembering who you are?"
          ~ player_has_greensight = true
          -> do_you_remember
          
    = mari_introduces_agora
      <Mari:> Mari addresses you: "We've been meeting here for the last few days, ever since the Great Pop" <Continue>
      
      <Mari:> "Once we woke up we needed to figure out again how to live, we were all disoriented and without purpose" <Continue>
      
      <Mari:> "We call this the Agora. Here we ask the question 'How do we want to live together?' and then we delegate and organise to make the answers reality"
      
      -> pre_meeting_questions
    
    = agora_meeting
    
        <Player:> <em>Your choices are affecting how other characters view you, and how you view them</em> <Continue>
    
        {mari_trusting >= 0: -> mari_introduces_agora}
        
        <Douglas:> Douglas address you. "We've been meeting here for the last few days, ever since the Great Pop" <Continue>
        <Douglas:> "It's a governance of sorts. <Pause {short_pause}> Once we woke up we needed to figure out again how to live, so we've been piecing together what life was like... you know, before" <Continue>
        <Douglas:> "Now that you're here,<Pause {short_pause * 0.2}> maybe we can set about recovering the Old World, and rebuilding it... <em>exactly</em> as it was!"
        
        -> pre_meeting_questions
        
    = pre_meeting_questions
    
        VAR asked_how_many = false
        
        * <Player:> "How long has it been since the Great Pop?"
            <Alicia:> "What?<Pause {short_pause}> Have you only just woken up?"<Pause {short_pause * 0.5}>
            <Null:> Evidently this surprises her <Continue>
            
            <Mari:> "It's been {days_since_great_pop} days" Mari answers. "We've been meeting here for {days_since_great_pop - 1}"
            -> pre_meeting_questions
        * {not asked_how_many } <Player:> "How many people are here, in attendance?"
            <Mari:> "Around fifty, in total" Mari answers
            ->pre_meeting_questions
        * {asked_how_many} <Player:> "And how many people, in the city?"
            <Alicia:> "A lot more than that"<Pause {short_pause}>
            <Mari:> "Our numbers are growing, little by little"
            -> pre_meeting_questions
        * <Player:> "Is the city governed here, in the Agora?"
            <Null:> Nobody seems sure how to answer this. <Continue>
            <Alicia:> "Not so much 'governance', as far as I understand the term" <Continue>
            <Mari:> "Not in an everday sense" Mari admits.<Pause {long_pause}> "But it's becoming known as the central place <Pace {slow_pace * 0.33}> to engage in the city politics</Pace>"
            -> pre_meeting_questions
        * [No more questions] <Player:> ...
            -> rupert_introduction

=== rupert_introduction ===

    <Rupert:> A man dressed in fine clothing is approaching, his face is red and puffy with sweat. <Pause {short_pause * 0.5}>
    <Rupert:> He is leading a procession of five other men, dressed in bright uniform. <Continue>
    
    <Rupert:> "And just <Pause {short_pause * 0.25}><b>what</b> is the meaning of all this <em>nonsense</em>?!" <Continue>
    
    <Rupert:> He calls out to the audience, his arms waving theatrically:
    <Rupert:> "Good citizens of <b>Rupertston</b>, I am your leader!"
    <Pause {short_pause * 0.75}>
    <Rupert:>"I understand that this <b>Great Pop</b> seems to have affected our memories but nevertheless!<Pause {short_pause * 0.25}> <em>I am your mayor!</em>"<Continue>
    
    <Rupert:> "Nevertheless I have all of the necessary <Pause {short_pause*0.25}><em>\*ahem\*</em> records to prove it"
    <Null:> He is waving a ledger of papers in his hand <Continue>
    
    * [Take a look at the records]
      <Player:> It is a thick ledger<Pace {slow_pace * 0.33}> of semi-organised documents</Pace><Pause {short_pause * 0.75}> bound in leather.<Pause {short_pause * 0.5}> The documents are pertaining to credits and debts owed the local City Mayoral,<Pause {short_pause * 0.5}> and to property records <Continue>
      
      <Player:> "Ledgers.. of property records, debts"
      
      <Rupert:> "And the most recent ones... Signed and stamped by Yours Truly" <Pause {short_pause * 0.33}>Rupert adds smugly <Pause {long_pause}>
      
      <Douglas:> Douglas is reading the ledgers keenly over your shoulder <Continue>
      
      <Burly:> A tall guardsman wrestles the ledger from your grip roughly.<Pause {short_pause}> Your ribcage is sore from his efforts
    * [Say nothing]
      <Mari:> Mari snatches the ledger from his hand and scans them scrupulously <Pause {long_pause}>
      <Mari:> "Ledgers.. of property records, debts"<Pause {short_pause * 0.5}>
      
      <Rupert:> "And the most recent ones... Signed and stamped by Yours Truly" <Pause {short_pause * 0.33}>Rupert adds smugly <Pause {long_pause}>
      
      <Douglas:> Douglas is reading the ledgers keenly over Mari's shoulder <Continue>
      
      <Burly:> The tallest of his guardsmen wrestles the ledger from her grip roughly.<Pause {short_pause}>
      
      <Mari:> Mari holds her ribcage and frowns deeply <Continue>
    
    - <Burly:> "Your gathering here is illegal!" shrieks the tall guardsman,<Pause {short_pause * 0.5}> who is wearing a fiercely bright orange and white blouse.
    
    * <Player:> "Who are you?" <Continue>
        ~ burly_trusting -= 1
        -> burly_who
    * <Player:> "Illegal? Says who?" {not player_has_greensight: <Continue>}
        ~ burly_trusting -= 2
        ~ player_courageous += 1
        
        {player_has_greensight: <Burly:> <color {greensight_text_color}>This man's aura has become tense.<Pause {short_pause * 0.5}> It carries the potential of violence</color> <Continue> }
        -> burly_who
    * [Say nothing]
        <Player:> ...
        <Mari:> "Who are you?" <Continue>
        
        -> burly_who
    
    = burly_who
    
       <Burly:> He is taken aback by the question, a little stung.
       <Burly:> <color {intuition_color}>He feels as though his relevance has been brought into question.</color><Pause {short_pause * 1.33}>
       <Burly:> "I- I- the Burly Bodyguard" <Pause {short_pause * 0.5}>
       <Burly:> He gathers himself and stands up taller. <Pause {short_pause}>"I'm Mayor Rupert's lead bodyguard" <Continue>
       
       <Mari:> "Oh, well" ... "That sounds like a real honour"
       <Mari:> <color {intuition_color}>She is grinning widely as she says it.</color> <Continue>
       
       <Burly:> "It is an honour" the burly bodyguard responds bitterly.<Pause {short_pause * 0.75}> His face folds, his frown a deepening grotesque, and folds his arms protectively <Continue>
        
        -> mari_questions_rupert
    
== function king_rupert_chastises_burly ==
   <Rupert:> "Burly,<Pause {short_pause * 0.2}> what have we discussed about speaking before you're spoken to?"<Pause {short_pause}>
   <Rupert:> "And it's <em>Your Grace</em>, now."<Pause {short_pause * 0.66}>
   <Rupert:> He stands straighter as he says it.<Pause {short_pause * 0.25}> He likes the sound of it, <Pace {slow_pace * 2}><em>Your Grace</em></Pace>. <Continue>

=== mari_questions_rupert ===
    
    <Mari:> Mari stands up onto the platform in the centre of the arena and calls out to the crowd. <Pause {short_pause}>
    <Mari:> "Good people!<Pause {long_pause}> what do we need a false mayor for?<Pause {short_pause}> and why do we need this ledger of his,<Pause {short_pause * 0.5}> marking our names as debts and credits?"<Pause {short_pause}>
    
    <Axel:> A few people in the agora cheer.<Pause {long_pause}>
    <Douglas:> Others seem unsure <Continue>
    
    -> debt_discussion
    
    = debt_discussion
    
        <Douglas:> <Pace {slow_pace * 0.25}>"What <em>is</em> in the ledger?"</Pace> Douglas asks <Continue>
        
        <Mari:> "<b>Debts</b>".<Pause {short_pause * 0.25}> She pronounces the word with enunciated distaste.<Pause {short_pause * 1.5}> "Obligations to pay, forced by the state.<Pause {short_pause * 1.5}> You need to find a way to pay them, <Pace {slow_pace * 0.3}>and pay them regularly</Pace><Pause {short_pause * 0.5}>, and as long as you have them you are not free" <Continue>
        
        <Rupert:> "Do you expect to receive everything for <em>free</em>?" <Pause {short_pause}> ... "Taxes and currency are how we direct ourselves to a common goal!" <Continue>
        
        <Mari:> "The debts are taken from us,<Pause {short_pause * 0.4}> paid to men like <em>him</em> - as a way to manipulate our activities into funding their enterprise" <Continue>
        
        <Rupert:> "<em>My</em> enterprise?!<Pause {long_pause}> Nae, 'tis the enterprise of our <em>nation</em>!"
        
        <Rupert:> "By paying eachother using my <em>currency</em>,<Pause {short_pause * 0.1}>  you are able to hold your debt through me,<Pause {short_pause}> Safe in the knowledge that it is <Pace {slow_pace * 0.33}><em>guaranteed</em></Pace> by the vitality of my force"<Pause {long_pause}>
        
        <Burly:> <color {intuition_color}>Burly is radiating pride when Rupert discusses the vitality of his force</color> <Continue>
        
        <Rupert:> "In return, you pay me a portion of that debt back each month,<Pause {short_pause * 0.2}> and respect my order.<Pause {long_pause}> This forms the basis of our <b>social contract</b><Pause {short_pause * 0.2}>... and ensures that we don't descend into chaos" <Continue>
        
        <Mari:> "Our debts could be to eachother,<Pause {short_pause * 0.1}> in principle.<Pause {short_pause * 0.2}> To our <Pause {short_pause * 0.1}><em>shared</em> enterprise"<Pause {short_pause * 0.2}>
        
        * <Player:> "Without debt nobody would be moved to doing anything which doesn't benefit them immediately" <Pause {long_pause}>
          <Player:> "We are selfish by nature and won't provide for eachother unless we are to gain in doing so ... we need a means to direct this drive towards the collective will" <Continue>
          
          ~ mari_trusting -= 1
          ~ rupert_trusting += 1
          ~ player_favours_debt = true
          
          <Rupert:> Rupert is nodding eagerly.<Pause {long_pause}>
          <Rupert:> "To serve the collective will, and <em>me</em>, its' arbritor!"<Pause {short_pause}>
          <Rupert:> "As is <Pause {short_pause*0.25}><em>\*ahem\*</em> <Pause {short_pause * 0.1}> - written in law <Continue>
          
          <Mari:> "But can we really <b>separate</b> the individual from the collective in this way? Isn't it already in our nature to seek the common good?"
          
          ** ["The market will guide us to the common good"]
            <Player:> "The <b>market</b> will guide us to the common good ... like an <b>invisible hand</b>.<Pause {long_pause}> Conveniently, <Pace {slow_pace}><em>we</em></Pace> don't have to do <em>anything</em>!" <Continue>
            
            <Douglas:> "Did the Old World run on the market principle?"
            
            <Douglas:> "And each person seeking their own gain ... brings them to <em>exchange</em> things ... and this is the market?" <Pause {short_pause}>
            
            <Rupert:> "Precisely! Debt is just the IOUs which are created in the process" <Continue>
            
            <Douglas:> "And how does that lead to the common good?" <Pause {long_pause}>
            
            <Player:> "My own interest <b>must</b> involve the interest of the collective - because I <em>need</em> the collective to be well.<Pause {short_pause}> My suppliers, my workers, without them I can't make a profit!" <Continue>
            
            ~ rupert_trusting += 1
            ~ mari_trusting -= 2
            
            <Mari:> "And only to the extent that it makes me a <b>profit</b>, and no more" Mari adds grumpily. <Pause {long_pause}> "Tell me, do we see your utopia around us now, from the market world which existed before?"
            
            -> old_world_and_utopia_question
            
          ** ["Being a good person and doing the right thing is outside of the market"]
             <Player:> "What you have is what you have, we can't all be equal.<Pause {short_pause}> Being rich doesn't make you bad as long as you give some of your wealth away" <Pause {long_pause}>
             
             <Francis:> "What if <em>everyone</em> gave <em>all</em> of their wealth away?"<Pause {long_pause}>
             
             <Rupert:> "... to who?"<Pause {short_pause}>
             
             <Francis:> "Well... we could store it all in the church?" <Continue>
             
             # TODO: a conversation about values and Good?
             
             <Null:> The idea continues without really going anywhere.<Pause {short_pause}> Eventually, people begin to talk about what makes a good person, if it's something which is innate or if some people are bad. <Continue>
             
             -> introduce_craig
          
          ** ["What do we know about our nature?"]
            <Player:> "What can we know about our nature?<Pause {short_pause * 0.5} {not player_self_knowledge_claim: After all we just woke up. } <Pause {short_pause}> Surely nothing beyond what we know about ourselves?" <Continue>
            
            <Francis:> "I've observed that I care for the needs of others ... and that I generally try to fulfill them, in the time since I've been awake" one man offers <Pause {long_pause}>
            
            <Alicia:> "I seem to habitually look for things which don't make me and attempt to solve them.<Pause {short_pause}> But does that make me a problem <b>solver</b> ... or a problem <b>creator</b>?" <Continue>
            
            -> meeting_continues
            
        * <Player:> "I don't see why we need to formalise debt at all"
          <Player:> "We are motivated by <em>care</em>,<Pause {short_pause * 0.5} we regularly care for eachother beyond our immediate selves"<Pause {long_pause}><br/>"There are any number of ways that we can pool resources,<Pause {short_pause * 0.25}> and we really only need <b>trust</b> if we have a reason not to trust the other to whom we are <em>giving</em>" <Continue>
          
          ~ mari_trusting += 1
          ~ rupert_trusting -= 2
          ~ player_sedition = true
          
          <Burly:> "Sedition!"<Pause {short_pause * 3}>
          
          <Mari:> "I think that we could organise our society to establish trust in giving"<Pause {short_pause}> Mari agrees pensively <Pause {short_pause}>
          
          <Rupert:> "Sedition!" <Pause {short_pause * 0.2}>
          <Rupert:> "I will <em>not</em> let you subvert my sacred right to distribute wealth!"
          
          ** [Rupert has to be stopped!]
          
              ~ player_courageous += 1
              ~ mari_trusting += 1
              
              <Player:> <color {intuition_color}><em>You must <Pace {slow_pace}>not</Pace> allow them to take your collective property!</em></color><Pause {short_pause}><br/>You know now what you have to do
              
              *** [Sing!]
                <Player:> Deep inside the pool of your soul a primordial force of Resistance wants to make itself known<Pause {long_pause}><br/><Pace {slow_pace}>"NOOOOO!"</Pace> it roars with your voice, <Pace {slow_pace * 0.33}>fading softly into silence</Pace> <Continue>
                 
                <Player:> "We'll be eating soup of stone,<Pause {short_pause * 0.5}> 'til what we grow is what we own.."<Pause {short_pause}><br/>"But we won't steal from the land what's freely given"<Pause {short_pause}><br/><Pace {slow_pace * 0.33}>"Tear up the deeds to the land</Pace>,<Pause {short_pause * 0.25}> throw the debts into the furnace ... debts to <em>God</em>,<Pause {short_pause * 0.25}> to the <em>banks</em>,<Pause {short_pause * 0.2}> and to the <em>landlord</em>" <Continue>
                
                <Player:> "And even if we're just one pistol,<Pause {short_pause * 0.5}> against an army of policemen,<Pause {short_pause * 0.3}> I <Pace {slow_pace * 0.4}><em>insist</em></Pace> that we are many<Pause {short_pause * 0.25}> and they are few ..."<br/>"And if we don't stand up now then we might never and we'll never know again our freedom taken"<Pause {short_pause}>
                 
                <Rupert:> "ENOUGH!" Rupert shouts and puts you off.<Pause {short_pause}> Just as you were gearing up for the second verse <Continue>
                
                ~ rupert_trusting -= 1
                ~ burly_trusting -= 1
                
                -> rupert_conclusion
                
          ** [Let it go]
            
            <Mari:> "A society motivated by debt is a miserable society, is it not?" <Pause {long_pause}><br/>"As far as practicality is concerned I came into existence {days_since_great_pop} days' ago. Since then I've had a fascination for this world we're in.<Pause {short_pause * 0.75}>I'm <Pace {slow_pace}>alive</Pace> ... and I know you all are, too" <Continue>
            
            <Douglas:> "What's your point?"<Pause {long_pause}>
            
            <Mari:> "My point is that there are any number of ways we can structure our society.<Pause {short_pause}> A world built on debt sounds miserable,<Pause {short_pause}> instead I think we can build our society towards the ideals which <em>we</em> want" <Continue>
            
            <Douglas:> Douglas thinks on this for a moment, he seems inclined to agree.<Pause {short_pause}><br/>"But surely ... surely this is what we were doing before ... you know,<Pause {short_pause * 0.25}> in the <Pace {slow_pace * 0.3}><em>Old World</em></Pace>?" <Continue>
            
            <Douglas:> "If debt existed in the Old World, then surely that means that it <em>had</em> to exist.<Pause {short_pause}> If indeed it was an evil, then surely it was a <em>necessary</em> one?" <Continue>
            
            <Mari:> "I think in our nature there is something <em>better</em>,<Pause {short_pause * 0.25}> at least I feel it in mine.<Pause {short_pause}> Surely we ought not to give up on utopia before we even <Pace {slow_pace * 0.3}><em>try</em></Pace>?" <Continue>
            
            <Craig:> A man pushes himself ahead of the crowd,<Pause {short_pause}> eager to speak on the subject <Continue> 
            
            -> introduce_craig
            
    = old_world_and_utopia_question
      * ["If the Old World was not a utopia it's because utopia was not possible"]
        <Player:> "Everything is how it is out of necessity.<Pause {short_pause}> There <em>is</em> no alternative" <Pause {long_pause}>
        
        <Mari:> "What a bizarre suggestion" <Continue>
        
        -> burly_attempts_to_use_force
            
      * ["The Old World was developing towards utopia, it just takes time"]
      
        <Player:> "Utopia ... heaven on earth ... is a <b>distant</b> goal, for our great grandchildren.<Pause {short_pause}> We're making <b>progress</b>, that's what counts.<Pause {short_pause}> And we can continue in that carrying the proud legacy of our ancestors" <Continue>
      
        ~ douglas_hope_represent += 1
        
        <Player:> "I think we should piece together where the Old World was ... exactly ... in its' progress towards inevitable utopia" <Continue>
        
        -> meeting_continues
    
      * [Insist that the Old World was a utopia]
      
        <Player:> "The Old World <em>was</em> a utopia. It's not going to be as obvious flying cars you know.<Pause {short_pause}> But everyone had what they needed and then some - they -<Pause {short_pause}> we ... were <em>happy</em> <Continue>
        
        <Douglas:> "<em>Oh really?</em> Douglas asks with shining eyes.<Pause {short_pause * 0.5}> How can you tell?" <Pause {long_pause}>
        
        <Player:> "Well... just look at all the <em>food</em> they were throwing out... they clearly had <em>way</em> more than they needed..." <Pause {long_pause * 0.8}>
        
        ~ douglas_hope_represent += 10
        
        <Rupert:> "The market provides" Rupert adds tastefully <Continue>
        
        <Null:> But others seem less sure,<Pause {short_pause * 0.5}> and the conversation develops around what life was like for people in the World Before... were they happy? <Continue>
        
        -> introduce_craig
      
      * <Player:> "The Old World was waiting on the right conditions for a revolution... all at once"
        <Null:> <Pause {long_pause}> You pause as you take a moment to consider if that's what happened with the Big Pop <Continue>
        
        ~ player_sedition = true
        
        -> meeting_continues
    
    = burly_attempts_to_use_force
      <Burly:> "There is no alternative because we'll back it up with <em>force</em>.<Pause {short_pause}> That's your alternative!" <Continue>
      
      <Philippa:> "Oh you think so?! What gives you that right?"
      
      * [Make the case for a monopoly of violence]
        <Player:> "Well, <em>someone</em> has to have a monopoly on violence! It should be Rupert because ..."
        ~ rupert_trusting += 1
        ~ player_favours_rupert = true
        
        ** ["He is King!"] -> player_claim_rupert_king
        
        ** ["He has the biggest gang!"]
           <Player:> "The world is going to be a war of all against all,<Pause {short_pause * 0.5}> so we might as well just accept it and submit to the biggest gang"<Pause {short_pause}> you say bluntly <Continue>
           
           <Philippa:> "But there's plenty of us here ... there's no <b>reason</b> for us to accept it!"
           
           -> burly_force_conclusion
           
      * [Say nothing]
        <Burly:> At the challenge, Burly shrinks back into his shell. {not player_has_greensight: <Continue>}
        
        {player_has_greensight: <Player:> You sense that he craves acceptance <Continue> }
        
        -> meeting_continues
    
    = burly_force_conclusion
      * ["He is King!"] -> player_claim_rupert_king
      * [Say nothing]
        <Burly:> At the challenge, Burly shrinks back into his shell. <Continue>
        
        -> meeting_continues
    
    = rupert_conclusion
      
      * {rupert_trusting >= 0} [Appeal to the mayor to permit the agora]
          <Player:> "Your Benevolence" you propose softly<Pause {short_pause}>. your voice is soft and sweet like a song<Pause {short_pause * 1.5}>.
          
          <Player:> "Permit us in your wise... fatherliness... to recommence our discussions under your supervision?" <Continue>
          
          {burly_trusting < 0: <Burly:> <color {intuition_color}>Burly does not trust you</color><Continue>}
          
          <Rupert:> "I <em>am</em> benevolent" Rupert admits<Pause {short_pause}>. He is chewing it over slowly ... <Continue>
          
          <Rupert:> "But I will not permit sedition" <Continue>
          
          -> rupert_conclusion
        * [Crown Rupert King] -> player_claim_rupert_king
        * [Banish the Impostor] -> player_exile_rupert
          
    = player_claim_rupert_king
      <Player:> You fill your lungs with air and stand straight<Pause {short_pause * 0.75}>.<br/><color {intuition_color}>You are projecting such a lionesque dominance that everyone is watching you, silent</color>.<Pause {long_pause}>
      <Player:> "My liege, forgive me to be telling you this but you mistake yourself"<Pause {short_pause}><br/>"Look at the uniform of these men" you declare,<Pause {short_pause * 0.25}> making eye contact with each citizen in the crowd in turn.<Pause {short_pause}><br/>"This is not the uniform worthy of a mayor's troop - <Pace {fast_pace}> NAE!</Pace>" <Continue>
      
      <Burly:> The burly man makes a motion to interrupt you but he is silenced by his boss. <Continue>
      
      <Player:> "This man... was our KING!"<Pause {short_pause * 1.25}><br/>There is a collective gasp.<Pause {short_pause * 0.75}><Continue>
      
      <Player:> "It is God's will that he rule over us.<Pause {short_pause}> When we excercise our activity to his will, we are also exercising our activity to God's will!" <Continue>
      
      <Rupert:> <em>Rupert is grinning very widely</em>. <Continue>
      
      <Player:> <Pace {slow_pace * 0.6}>They seem to be buying it</Pace>!<Pause {short_pause}><br/><color "\#FFBF00"> It must be the sensational <em>authority</em> that you're projecting.</color> <Continue>
      ~ player_authority += 1
      
      <Player:> Slowly the crowd turns in your favour.<Pause {short_pause * 0.5}>
      <Player:> The dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert. <Continue>
      
      <Null:> Big City is now an <b>Absolute Monarchy</b>, Rupert is now King!<Pause {short_pause}>
      <Rupert:> <color "\#ff5dcb"><em>King Rupert's eyes have started to sparkle whenever he looks at you.</em></color> <Continue>
      
      ~ governance = "absolute_monarchy"
      ~ rupert_trusting = 20
      ~ burly_trusting += 1
      ~ city_name = "Rupertston"
      ~ ruler = "Rupert"
      ~ player_favours_rupert = true
      
      <Mari:> Mari's face is a picture of her lost utopia.<Pause {short_pause}><br/><br/>"But.."<br/><br/><Pause {short_pause * 0.5}>The cheers of the crowd drown her out.
      
      <Burly:> "Long live the King!"<br/><Pause {short_pause * 0.2}>"Long live the King!"<Pause {short_pause * 0.2}>
      
      <Alicia:> "Long live the King!" <Continue>
      
      <Rupert:> The King is gazing at you in stupified admiration.<Pause {short_pause}><br/>"You've done well today, old sport!"<Pause {short_pause}><br/>"I regard your ambition in high esteem.<Pause {short_pause}> We will go far together" <Continue>
      
      <Rupert:> Rupert turns graciously to the crowd and hushes them to silence.<Pause {short_pause * 1.5}><br/> "This meeting shall continue!<Pause {short_pause}>  I do declare that my <em>court</em> is now in session!"<Pause {short_pause * 1.25}> ...<br/>"I require a throne!" <Continue>
      
      <Douglas:> Douglas finds a nearby picnic bench and heaves it to the centre of the ampitheatre.<Pause {short_pause}> He is reprimanded and sent away in search of something more appropriate. <Continue>
      
      <Burly:> Burly has moved closer to Rupert's side.
      <Rupert:> The new King beckons you to stand on his left <Continue>
      
      * [Join Rupert loyally]
        
        ~ player_loyal_to_rupert = true
      * [Join Rupert reluctantly]
        
        ~ burly_trusting -= 1
        ~ player_loyal_to_rupert = false
      
      - <Rupert:> "My people! Come to me with your problems and I will rule on them fairly ... and <b>absolutely</b>!" <Continue>
      
      -> rupert_court_continues
      
    = player_exile_rupert
      ~ player_courageous = 3
      
      <Player:> You look around you and see the faces of comrades. You are confident that these people are going to back you up. <Continue>
      
      <Player:> "This man <b>is</b> an impostor! Worse still he is a leech!"<Pause {short_pause}><br/>"If you ask me then I say we're better off without him!"<Pause {short_pause * 1.25}>
      <Player:>"All power to the people!<Pause {short_pause * 0.25}> All power to the <em>Polis</em>!" <Continue>
      
      <Null:> Just a few at first, then the crowd, chant in unison:<Pause {short_pause * 0.25}>
      <Mari:> "Long live the Polis!"<Pause {short_pause * 0.25}><br/>"Long live the Polis!"<Pause {short_pause * 0.25}>
      <Alicia:> "Long live the Polis!"<Pause {short_pause * 0.25}>
      <Axel:> "Long live the Polis!" <Continue>
      
      <Rupert:> The would-be mayor looks around nervously.<Pause {short_pause * 0.5}><br/>Indignant fury flashes across his face.<Pause {short_pause * 0.25}><br/>"You <b><em>need</em></b> me"<Pause {long_pause}>
      <Axel:> The crowd does not hear him through the chanting. <Pause {short_pause}>
      <Rupert:> "Burly. <Pace {slow_pace}><em>Do something</em></Pace>." <Continue>
      
      <Burly:> "Get 'em men!"<br/>He lifts a proud fist into the air to accompany the command.<Pause {long_pause}><br/><br/>Nothing happens.<Pause {short_pause}>
      <Burly:> Burly looks about him, most of his men have gone. Those who remain are chanting with the others.<Pause {short_pause * 0.25}>
      <Marcus:> "Long live the Polis!" <Continue>
      
      <Burly:> Burly and the would-be mayor beat a slow retreat from the crowd.
      
      ~ rupert_trusting = -10
      ~ burly_trusting = -10
      ~ rupert_exiled = true
      
      * [Mock them as they leave]
        <Player:> "Yeah you better run! And your outfits are terrible!"<Pause {short_pause * 1.25}>
        <Burly:> That one hit its' mark. You can hear the wound from here. <Continue>
      * [Say nothing]
        <Player:> ... <Continue>
      
      - <Mari:> "Yeeeahh!"
      <Mari:> <color {intuition_color}>Mari is elated as she watches the exiled pretenders flee.</color><Pause {short_pause}>
      <Mari:> "Long live the Polis!" <Continue>
      
      <Rupert:> Rupert is looking over his shoulder as he leaves, his face is a picture. <Continue>
      
      <Mari:> "This is such an <em>exhillarating</em> feeling!"<Pause {short_pause}><br/>"There is no burden of power over us, no burden of tradition behind us" she says with a long <Pace {slow_pace * 0.75}>sigh</Pace><Continue>
      <Mari:> "We are held back only by the capabilities of our language and the limits of our abilities.<Pause {short_pause}> We are the <Pace {slow_pace * 1.25}><em>masters</em></Pace> of our own <b>destiny</b>" <Continue>
      
      ~ mari_trusting = 2
      {player_has_greensight: <Null:> <color {greensight_text_color}>Mari looks to you as an ally</color>}
      
      -> meeting_continues
      
    = meeting_continues
      <Null:> As the meeting continues, people begin sharing their experiences of waking up.<Pause {short_pause}> How it felt, what their life in Big City might have been like before, what it is like now. <Continue>
      
      -> introduce_craig
      
    = rupert_court_continues
      <Null:> Royal court now in session, and it becomes clear that at this stage there really is only one problem, shared by everyone.<Pause {short_pause}> Everyone has just started to exist in a strange world, and nobody knows what on earth they're doing there.<Pause {short_pause}>. The people are turn to their king for answers, and his subjects begin sharing their experiences of waking up. <Continue>
      
      -> introduce_craig
  
  = introduce_craig
  
    <Craig:> "When I woke I was in a collosal building,<Pause {short_pause}> <b>'{city_name} Prison'</b>"<br/>"Myself and others,<Pause {short_pause * 0.25}> we were dressed the same.<Pause {short_pause}> We were armed, and I think that our purpose was to keep people <Pace {slow_pace * 0.4}>locked inside</Pace>" <Continue>
  
    <Andrew:> "I was a prisoner there!" Another man calls out, and makes his way to the front.<Pause {long_pause}> He introduces himself as a man named Andrew <Continue>
    
    <Andrew:> "I was a prisoner there.<Pause {short_pause}> <em>Human beings</em> locked into tiny cells.<Pause {short_pause * 0.75}> Just the thought of it makes me feel sick"<Pause {short_pause * 0.75}>
    
    * <Player:> "How did you get out?"
      <Andrew:> "Some of the guards let us out"
    * [Say nothing]
    
    - <Craig:> A look of anger flashes across the former guard's face.<Pause {short_pause}> "The prisoners were locked away for the good of society.<Pause {short_pause}> And for their <em>own</em> good, too.<Pause {short_pause}> You should have been confirmed as <b>rehabilitated</b> before you were allowed to rejoin society"<Pause {short_pause * 0.66}><br/>"You might be dangerous!" <Continue>
    
    <Andrew:> "I don't see how any of that could have been for my own good.<Pause {short_pause * 0.6}> And I'm <em>not</em> going back in there"
    <Player:> <color {intuition_color}>You detect that there is much distress in his voice</color> <Continue>
    
    <Null:> Many of the Agora members attempt to relieve the tension ...
    
    <Zoe:> "Perhaps they were not <em>always</em> right then, clearly.<Pause {short_pause}> But neither surely were they <em>always</em> wrong?"
    
    * <Player:> "The prison was primarily a tool of oppression"
    
      <Andrew:> <Pause {short_pause * 0.5}> <color {intuition_color}><em>Andrew visibly appreciates your solidarity</em></color> <Continue>
    
      ~ andrew_trusting += 1
      ~ douglas_hope_represent -= 1
      ~ player_sedition = true
      
      -> prison_abolition
      
    * <Player:> "The prison was not necessary,<Pause {short_pause * 0.33}> it was cruel"
     
      <Andrew:> <Pause {short_pause * 0.5}> <color {intuition_color}><em>Andrew visibly appreciates your solidarity</em></color> <Continue>
      
      ~ andrew_trusting += 2
      ~ douglas_hope_represent -= 1
      ~ player_sedition = true
      
      -> prison_abolition
     
    * ["We do not need a prison. We can resolve conflicts collectively"] 

      ~ player_sedition = true
      -> prison_abolition
    
    * ["We should replace the prison with something more focussed on <em>reform</em>"]
      <Player:> "The old ways were necessarily cruel.<Pause {short_pause}> Or else prison would not have been an effective detterant"<Pause {short_pause}><br/>"Clearly at least an <em>element</em> of our nature is sinful.<Pause {short_pause}>" <Continue>
      
      { not rupert_exiled: <Burly:> "This element must be crushed" Burly agrees <Pause {long_pause}> }
      
      <Player:> "To shape the society that we wish to live in we must punish wrongdoing and reward goodness" <Continue>
      
      ~ andrew_trusting -= 1
      ~ leopald_trusting += 1
      
      <Craig:> "I think that the prison might not <em>always</em> be necessary<Pause {short_pause * 0.4}>, perhaps we could use it sparingly.<Pause {short_pause * 1.1}> But it can be a powerful tool<Pause {short_pause * 0.4}>, in order to shape <em>our citizens</em> to be the way we want them to be" <Continue>
      
      { ruler == "Rupert": <Rupert:> "The King would like to make clear the ardent necessity of being able to lock someone up and throw away the key ... as a final measure,<Pause {short_pause * 0.5}> saved for only the most vulgar sedition" <Continue> }
      
      ~ prison = "reforming"
      
      -> reimprisonning_dilemma
      
    * ["The prison was absolutely necessary, it is a <em>deterrant</em>"]
      <Player:> "The prison was absolutely necessary<Pause {short_pause * 0.5}>, it is a <em>deterrant</em>.<Pause {short_pause}><br/>Within each of us is a <b>beast</b>.<Pause {short_pause}> We are <b>selfish</b><Pause {short_pause * 0.3}>, <b>sinful</b> beings always seeking to maximise our own gain - and we have a great proclivity to violence.<Pause {long_pause}> We <em>must</em> use the prison.<Pause {short_pause * 0.5}> Without it would be chaos" <Continue>
      
      <Rupert:> Rupert is nodding emphatically.<Pause {short_pause * 0.5}>
      
      <Andrew:> Others are significantly less pleased <Continue>
      
      ~ andrew_trusting -= 1
      ~ mari_trusting -= 3
      
      <Null:> It takes some time to convince people that there is an aspect of them which is sinful<Pause {short_pause * 0.5}>, but it is much easier to convince them that there are aspects of <em>other</em> people which is sinful.<Pause {short_pause}> Their memories extend only a few days<Pause {short_pause * 0.5}>, but even so many have seen behaviours puzzling or aggressive.<Pause {long_pause}>
      
      <Player:> Your arguments sway the agora.<Pause {short_pause}> The prison is here to stay! <Continue>
      
      ~ leopald_trusting += 1
      ~ player_values_order = true
      ~ prison = "strict"
      
      -> reimprisonning_dilemma

  = abolish_prison_rupert_leaves
    <Rupert:> <color {intuition_color}>Rupert and his goons have left conspicuously<Pause {short_pause * 0.5}, you notice</color> <Continue>
    
    -> prison_abolition_resolved
  
  = prison_abolition
    <Player:> "Locking someone up only serves to alienate them from society further.<Pause {short_pause}> It's sweeping a problem under the rug, instead of dealing with it" <Continue>
      
    <Player:> "Before we build this kind of system, we should ask ourselves - what do we want it to achieve?" <Continue>
  
    <Andrew:> Andrew is the first to make a suggestion.<Pause {short_pause * 1.2}> "It should be <em>restorative</em> as much as possible<Pause {short_pause * 0.5}>, focussed on allowing me to repair the relationships I may have damaged" <Continue>
  
    <Mari:> "It should be focussed on <Pace {slow_pace * 2}><em>preventing</em></Pace> the behaviour from happening again" <Continue>
  
    <Douglas:> The suggestions continue and you notice that Douglas has started to take notes. <Pause {short_pause * 1.5}>
  
    { not ruler == "Rupert": <Douglas:> "... Decisions will be made collectively and based on consent... with a circle being delegated to <em>implement</em> the process." he eventually summarises from the decisions passed collectively. <Continue> }
    { ruler == "Rupert": -> attempt_abolish_prison_rupert_king }
  
    ~ prison = "restorative"
    ~ mari_trusting += 1
    ~ rupert_trusting -= 2
  
    { not ruler == "Rupert" and not rupert_exiled: -> abolish_prison_rupert_leaves }
  
    -> prison_abolition_resolved

  = attempt_abolish_prison_rupert_king
    <Rupert:> "The King would like to make clear the ardent necessity of being able to lock someone up and throw away the key ... as a final measure,<Pause {short_pause * 0.5}> saved for only the most vulgar sedition" <Pause {long_pause}>
    
    * [Accept Rupert's decision]
      <Player:> You bow low and make exaggerated apologies for your myopic imprudence.<Pause {short_pause}> Rupert appreciates this greatly and he tips his head<Pause {short_pause * 0.2}>, as a token of his forgiveness. <Continue>
      
      ~ rupert_trusting += 1
      ~ player_loyal_to_rupert = true
      
      <Craig:> "Speaking of..." <Continue>
      
      -> reimprisonning_dilemma
      
    * [Turn Rupert into a cat]
      <Null:> Really?!<Pause {short_pause * 0.5}> Are you a{player_has_greensight: greenseeing} wizard?<Pause {short_pause * 0.5}>
      ~ player_loyal_to_rupert = false
      ~ player_favours_rupert = false
      ~ player_sedition = true
      
      ** [Yes I am]
        <Player:> You outstretch your hands and close your eyes<Pause {short_pause * 0.5}>, and concentrate all of your magic energy into your fingertips.<Pause {short_pause}> Silently you allow yourself to be lost in your power<Pause {long_pause}> You disappear temporarily into a metaphysical world of hairballs<Pause {short_pause * 0.75}>, of mice and little saucers of milk. <Continue>
        
        <Null:> <color {greensight_text_color}><em>'Ruppperrtttttt'</em></color> ... comes a voice from far beyond the real world.<Pause {short_pause}><br/><color {greensight_text_color}><em>'Here puss puss puss puss'</em></color> <Continue>
        
        <Player:> ...<Pause {short_pause}>
        
        <Player:> Your eyes open again<Pause {short_pause * 0.3}>, you are back in the agora<Pause {short_pause * 0.75}>. The crowd has taken several steps back and is stood in stunned silence. <Continue>
        
        <Rupert:> King Rupert has become a fluffy white cat<Pause {short_pause * 0.5}>, and perched atop his throne he is drinking eagerly from a little milk saucer <Continue>
        
        -> rupert_is_a_cat
        
      ** [No I am not]
        <Player:> You outstretch your hands and close your eyes<Pause {short_pause * 0.3}>, wiggling your fingertips gently.<Pause {short_pause * 1.25}> You can sense the whole agora watching you and waiting in mounting suspense <Continue>
        
        <Player:> Moments pass.<Pause {short_pause}> You are deep beyond the veil of reality<Pause {short_pause * 0.3}>, deep into the magical realm.<Pause {long_pause * 1.25}>
        
        <Player:> Then<Pause {short_pause * 0.3}>, all of a sudden<Pause {short_pause * 0.1}>, you are back <Continue>
        
        <Player:> You become conscious that you are stood with your eyes closed<Pause {short_pause * 0.2}>, wiggling your fingers.<Pause {long_pause}> <Pace {slow_pace * 2}>"Here puss puss puss puss"</Pace> you are saying.<Pause {short_pause}> <Pace {slow_pace * 2}>"Here Rupey Rupey Rupert<Pause {short_pause * 0.75}>. Come and get your milk" <Continue>
        
        <Axel:> There is a long pause before people start to laugh.<Pause {short_pause * 0.5}>
        <Burly:> Burly is evidently furious with your antics.<Pause {short_pause}> Rupert less so<Pause {short_pause * 0.4}>, but he is looking at you like you're a fool <Continue>
        
        ~ player_is_failed_wizard = true
        ~ rupert_trusting -= 1
        ~ burly_trusting -= 2
        
        *** [How dare he look at me that way?!]
            <Player:> "How dare you?!"<Pause {long_pause}><br/>"Here you are<Pause {short_pause * 0.5}>, perched on a fool's throne with a fool's ledger and a fool for a bodyguard<Pause {short_pause}>, and you have the gall to look at <em>me</em> that way?<Pause {short_pause}> I am a <em>WIZARD!</em>"
            
            **** [When my power is back, they'll be sorry.]
            - <Player:> <em>You have emphatically rejected the identity of the fool</em> <Continue>
            
            ~ player_fool = "resistance"
        *** [How embarrassing!]
            <Player:> <em>You have accepted the identity of the fool<Pause {short_pause * 0.5}>, and it shames you</em> <Continue>
            ~ player_fool = "shame"
        *** [A fool? Why not, we're all fools after all]
            <Player:> <em>You have accepted the identity of the fool<Pause {short_pause * 0.5}>, and you revel in it.<Pause {short_pause * 0.5}> You are a rebel fool</em> <Continue>
            ~ player_fool = "embrace"
        *** [This does not bother me]
        
        - <Rupert:> "Right... <Pause {short_pause}>so then the prison is here to stay.<Pause {short_pause}> Who to <b>lock up</b> first I wonder?" <Continue>
        
        -> reimprisonning_dilemma
        
  = rupert_is_a_cat
    ~ douglas_hope_represent += 1
    ~ rupert_exiled = "cat"
    
    <Burly:> Most of Rupert's bodyguards have gone.<Pause {short_pause * 0.5}> Burly is still as stone <Pause {short_pause}> 
    
    <Axel:> Your people wait for you to speak <Pause {short_pause}>
    
    * ["I am your monarch now!"]
      <Player:> You jump up onto the former king's picnic table<Pause {short_pause * 0.3}>, brandishing your tightly clenched teeth and with your fists raised to the air.<Pause {short_pause}> A champion among minions. <Continue>
    
      ~ ruler = "player"
      
      <Burly:> The word 'Monarch' seems to have brought Burly crashing back into reality.<Pause {short_pause}> He is staring at Rupert, who is purring and brushing his cheek against your shin. <Continue>
      
      <Burly:> "Boss?" he asks<Pause {short_pause * 0.5}>, looking up at you from confused grey eyes<Pause {short_pause * 1.4}>
      
      ** [Accept your minion]
         <Player:> You nod firmly<Pause {short_pause * 0.3}>, nostrils flaring with pride as you sweep the cat from your throne<Pause {short_pause * 0.3}>, causing him to complain loudly.<Pause {short_pause}> You never once blink or look away from Burly's eyeline.<Pause {short_pause}> Burly shuffles nervously as you drop one step ... and then another - striding flamboyantly over to him.<Pause {long_pause}> After an awkward pause he shuffles to stand by your side.<Pause {short_pause}> You look to your subjects, fists raised triumphantly
         
         ~ burly_trusting = 5
         ~ burly_minion = true
         
         -> player_is_monarch
         
      ** [I don't need a minion!]
         <Player:> "Get lost Burly!" you shout decisively.<Pause {short_pause}> "This monarch doesn't need a minion"<Pause {short_pause}>
         <Player:> "I'm a lone wolf" <Continue>
         
         { player_has_greensight: <Burly:> <color {greensight_text_color}>Burly is rather distressed</color> }
         ~ burly_trusting -= 5
         
         -> player_is_monarch
      
    * ["Forget what I said about the whole.. King thing"]
      <Player:> "Forget what I said about the whole - <Pause {short_pause*0.25}><em>\*ahem\*</em> - King thing... it was just a phase..." <Continue>
    
      <Player:> You think to add more<Pause {short_pause * 0.4}>, but you're not sure of what to say<Pause {short_pause}>
      
      <Douglas:> A lot of people have been leaving the agora space<Pause {short_pause * 0.4}>, but at least they seem to accept it...
      
      <Leopald:> Just as you're about to agree to call it an end to today's meeting<Pause {short_pause * 0.4}>, a man approaches the circle with strident purpose ... <Continue>
      
      ~ ruler = false
      ~ governance = "agora"
      
      -> introduce_leopald
      
  = prison_abolition_resolved
    <Craig:> A handful of people - notably some of the former prison guards - have left the Agora behind<Pause {short_pause * 0.5}>. But others stay <Continue>
    
    <Andrew:> Andrew looks delighted <Pause {short_pause}>
    
    <Zoe:> Some of the Agora members have returned with equipment for starting a fire<Pause {short_pause * 0.3}>, and vegetables and meat<Pause {short_pause}>. There is a barbecue and much celebration <Continue>
    
    <Null:> As evening approaches... much of the Agora's numbers have reduced as people have gone back to their dwellings<Pause {short_pause}>. A group strides towards you from the park gates <Pause {short_pause}>
    <Player:> <color {intuition_color}><em>They are striding with purpose</em></color> <Continue>
    
    -> introduce_leopald
    
  = introduce_leopald
    { player_is_wizard: -> leopald_disables_player_magic }
    
    <Leopald:> "I am Leopald!" one announces, who you take to be their leader<Pause {short_pause * 0.5}>. For menacing effect<Pause {short_pause * 0.2}>, he pushes Andrew over - who others help to his feet <Continue>
    
    -> introduce_leopald_proper
    
  = introduce_leopald_proper
    <Leopald:> "I am Leopald<Pause {short_pause * 0.3}>, first of his name (as far memory goes)<Pause {short_pause}>. I am the general to {ruler == "rupert": King}{ruler != "rupert": Mayor} Rupert ... {rupert_is_a_cat: our beloved Cat... } and I've come to put an end to your antics!" <Continue>
    
    { burly_minion: <Burly:> Burly is stood frozen to the ground with fear<Pause {short_pause}>. He doesn't know what to do } <Continue>
    
    -> coup_dilemma

  = leopald_disables_player_magic
    <Leopald:> "Catch." <Pause {short_pause * 0.25}>
    <Player:> He throws you a rock<Pause {short_pause}>. You catch it instinctively<Pause {short_pause * 0.2}>, then drop it to the ground with disgust when you realise what it is <Continue>
    
    <Player:> <em>Oh no, a Hellebite rock!<Pause {short_pause * 0.5}> The one weakness of your magic<Pause {short_pause * 0.4}>. You feel your strength leaving you almost instantly <Continue>
    
    -> introduce_leopald_proper
    
  = reimprisonning_dilemma
    <Craig:> "I'm delighted that we're keeping the prison.<Pause {short_pause * 1.25}> Maybe <b>delighted</b> is the wrong word<Pause {short_pause * 0.4}>, but anyway it gives me a sense of purpose<Pause {short_pause}> <Continue>
    
    <Craig:> "We have records of all the former prisoners... I think we should look them back up again<Pause {short_pause * 0.5}>, right?" <Pause {short_pause * 1.25}>
    
    <Andrew:> Andrew lunges for Craig<Pause {short_pause * 0.4}>, the two are separated only by the efforts of the crowd<Pause {short_pause * 0.75}>
    
    <Craig:> "You see what an animal he is?!" <Pause {long_pause}>
    <Andrew:> "<b>Me?!</b> He's the animal!" <Continue>
    
    * { prison == "reforming" } ["Perhaps we can pardon the previously imprisoned, conditional on behavioural monitoring"]
      { player_is_failed_wizard and player_fool == "shame": <Player:> As you go to speak you see Burly looking at you, fury in his eyes<Pause {short_pause * 0.4}>. You choke <Continue> -> reimprison_conclusion }
      
      <Player:> "{ ruler == "rupert": My leige ... }Perhaps we should pardon Andrew, and the others previously imprisoned?<Pause {short_pause}>. We don't know yet how the Big Pop might have changed us<Pause {short_pause * 0.5}>, it seems unfair to imprison someone for something that nobody remembers?" <Continue>
      
      { player_is_failed_wizard: <Burly:> Burly spits<Pause {short_pause * 0.4}>. Rupert ignores you <Continue> -> reimprison_conclusion }
      
      <Rupert:> Rupert thinks pensively on your suggestion but says nothing<Pause {short_pause}>
      
      <Andrew:> <color {intuition_color}>Andrew seems somewhat calmer<Pause {short_pause * 0.3}>, although still very stressed</color> <Continue> -> reimprison_conclusion
      
    * { ruler != "rupert" or (player_favours_rupert and not player_sedition) } ["We should pardon all prior sentences"]
      <Player:> "It seems unfair to imprison someone for something that nobody remembers? I think we should pardon everyone imprisoned in the era of the Old World" <Continue>
      
      -> suggest_pardoning_previous_prisoners
      
    * [Agree with Prison Guard Craig]
      <Player:> "I agree with the gentleman Craig{ ruler == "rupert" and not player_is_failed_wizard: your Grace}.<Pause {short_pause * 0.5}> Some of these prisoners might have been murderers and worse.<Pause {short_pause}> They must be prevented from walking free" <Continue>
      
      { andrew_trusting > 0: <Andrew:> "You've changed your tune".<Pause {short_pause * 0.5}> Andrew is seething. <Continue> }
      
      ~ andrew_trusting -= 4
      
      { ruler == "rupert": <Rupert:> "We will judge this on a case-by-case basis.<Pause {short_pause}> Small crimes will be forgiven<Pause {short_pause * 0.5}>, big crimes will not be<Pause {short_pause * 0.5}>" }
      
      { ruler == "rupert": <Rupert:> "Debt will not be forgiven"<Pause {short_pause * 0.4}>, he adds as an afterthought <Continue> }
      
      -> reimprison_conclusion
      
    * { ruler == "rupert" or prison == "strict" } ["Yes, and what about all those guilty of sedition besides?!"]
    
      <Player:> "Yes<Pause {short_pause * 0.5}>, and what about all those guilty of sedition besides?!" <Continue>
    
      { not rupert_is_a_cat and (not player_loyal_to_rupert or player_sedition): <Burly:> <Pause {short_pause * 0.5}>Burly scoffs<Pause {short_pause}>. "You yourself are guilty of sedition!" <Continue> }
      
      -> reimprison_conclusion
      
    * [Say nothing]
      <Alicia:> "It seems unfair to imprison someone for something that nobody remembers? I think we should pardon everyone imprisoned in the era of the Old World" <Continue>
      
      { ruler != "rupert" or (player_favours_rupert and not player_sedition): -> suggest_pardoning_previous_prisoners }
      
      -> reimprison_conclusion

  = suggest_pardoning_previous_prisoners
    # you know here that the player is not in sedition against Rupert
    <Craig:> "And what if I produce a ledger of his crimes<Pause {short_pause * 0.4}>, that it might jog your memory?"
    
    * ["Reviewing it on a case-by-case basis could be a good compromise"]
      <Player:> "We can avoid conflict here with compromise.<Pause {short_pause}> I would suggest that we could review each crime individually and decide on that basis" <Continue>
      
      <Zoe:> "Yeah.<Pause {short_pause * 0.5}> Let go of the minor stuff"<Pause {short_pause}>
      
      <Andrew:> Andrew <Pace {slow_pace}>sighs</Pace><Pause {short_pause * 0.4}>, seeming to accept it - or possibly imagining that his crime could not be so bad <Continue>
      
      <Craig:>...<Pause {short_pause}> After some waiting Craig is able to provide a ledger of crimes committed by prisoners.<Pause {short_pause}> Anrew looks nervously over his shoulder <Continue>
      
      <Craig:> "Tax fraud" <Continue>
      
      <Andrew:> <color {intuition_color}>Andrew is visibly relieved</color> <Continue>
      
      { ruler != "rupert": <Rupert:> "So we're locking him up then<Pause {short_pause}>, right?" <Continue>}
      
      -> reimprison_conclusion
      
    * ["Reading the records would prevent a fresh start, we should throw the ledger out"]
      { ruler == "rupert": <Player:> "Your Grace<Pause {short_pause * 0.5}>, this ledger will prevent people like Andrew truly having a fresh start<Pause {short_pause * 0.5}>. It is the eyes of society that makes a criminal<Pause {short_pause * 0.5}>, not the deed.<Pause {short_pause}> We should throw the ledger out" <Continue> }
      { ruler == "rupert": <Mari:> "Hear, hear!<Pause {short_pause}> Sage counsel<Pause {short_pause * 0.25}>" <Continue> }
      { ruler == "rupert": <Rupert:> Rupert thinks on your counsel and nods slowly<Pause {short_pause}>. "The King should know<Pause {short_pause * 0.5}>. I'll have the ledger<Pause {short_pause * 0.5}>, but nobody else will know - and there will be no <em>public</em> record against your name... Should you reoffend I'll be forced to reconsider" <Continue> -> reimprison_conclusion }
      
      <Craig:> "I will not stand for this!"<Pause {short_pause}> He looks about him furiously.<Pause {short_pause * 0.5}> "I will return forthwith!" <Continue>
      
      -> craig_returns
      
    * [Say nothing]
      { ruler == "rupert": <Rupert:> "Very well. I shall review this ledger of yours" <Continue> -> reimprison_conclusion }
      
      <Null:> There is a long silence... it seems that nobody is very eager to see the ledger <Continue>
      
      <Philippa:> "I think we're hesitant... Craig was it?<Pause {long_pause}> We're hesitant because seeing the ledger will change how we view Andrew.<Pause {short_pause}> Until Andrew is made a criminal by your ledger<Pause {short_pause * 0.5}>, to us he's just Andrew" <Continue>
      
      <Alicia:> "I'd prefer to give Andrew the opportunity of a fresh start ..." <Continue>
      
      <Craig:> Craig looks about him with disbelief.<Pause {short_pause}> "I will not stand for this!<Pause {short_pause * 0.5}> I will return forthwith!" <Continue>
      
      -> craig_returns
  
  = craig_returns
    <Mari:> Shortly after Craig leaves<Pause {short_pause * 0.4}>, Mari announces her intention to rally a crowd to Andrew's support.<Pause {short_pause}> The pair head off with a dozen others <Continue>
    
    { not rupert_exiled: <Rupert:> Rupert and his guard leave<Pause {short_pause}>, and then only a few of you remain <Pause {short_pause}> }
    
    <Player:> <color {intuition_color}><em>This can't be good</em></color> you think to yourself <Continue>
    
    <Leopald:> A while passes before a group of armed men approach<Pause {short_pause * 0.4}>, lead by a man you do not recognise <Continue>
    
    <Craig:> You do see Craig among them<Pause {short_pause * 0.5}>, but recognise no-one else
    
    -> introduce_leopald
    
  = reimprison_conclusion
    <Arsene:> Armed guards have started arriving in numbers<Pause {short_pause * 0.5}>, and they're preventing people from leaving.<Pause {short_pause}> Anxious murmuring grows <Continue>
    
    <Rupert:> "Ah fantastic, the <b>additional guards</b> have arrived" Rupert beams <Continue>
    
    <Rupert:> "<em>\*ahem\*</em>... {ruler == "rupert": My }people!<Pause {short_pause}> Please do not be alarmed by the presence of all these <b>armed guards</b>.<Pause {short_pause}> Among you are some dangerous seditionists who need to be <Pace {slow_pace}><b>rooted out</b></Pace> and <Pace {slow_pace}><b>imprisoned</b></Pace><Pause {long_pause}>. The rest of you will not be harmed" <Continue>
    
    <Rupert:> Rupert points to Mari and Andrew in turn{ not rupert_is_a_cat and (not player_loyal_to_rupert or player_sedition):, and then to you}.<Pause {short_pause}> "THEM!" he declares<Pause {short_pause * 0.4}> ...<br/>"These heretical MALCONTENTS!<Pause {short_pause}> {ruler == "rupert":They would see me overthrown!}{ruler != "rupert": They wish to seize power for THEMSELVES!}" <Continue>
    
    ~ mari_imprisoned = true
    ~ andrew_imprisoned = true
    
    { ruler == "rupert" and not rupert_is_a_cat and (not player_loyal_to_rupert or player_sedition): <Player:> He seems to have forgotten rather quickly that it was you who put him on the throne in the first place <Continue> }
    
    <Arsene:> The armed guards begin seizing people <Pause {short_pause}>
    
    { not rupert_is_a_cat and (not player_loyal_to_rupert or player_sedition): -> player_imprisoned }
    
    <Andrew:> Andrew thuds to the floor unconscious and is dragged away<Pause {short_pause * 0.5}>, you didn't see what happened <Pause {long_pause}>
    
    <Mari:> Mari looks desparately to you as a guard is taking her by the arm <Continue>
    
    <Player:> You consider whether helping her is possible but think better of it<Pause {short_pause}>. You are stood still as stone
    
    * [I didn't want this to happen]
      <Player:> As those on the list are dragged away at gunpoint you feel an overwhelming sense of guilt<Pause {short_pause * 0.5}>. <em>what have I done?</em> you think to yourself ... <Pause {short_pause}>
      
      <Rupert:> You imagine that you may have a long reign to think it over ...<Pause {short_pause}> that is unless you plot against the King yourself.<Pause {short_pause * 0.4}> <Continue>
      
      -> thank_you_message
    * [Good, separate the wheat from the chaffe]
      <Player:> As those on the list are dragged away at gunpoint you feel a sense of pride<Pause {short_pause}>. This could be the dawning of a new era of state control ... of enormous wealth and power for the King ... and no doubt Rupert will remember his friends <Continue>
      
      -> thank_you_message
    * [I am indifferent to their suffering]
      <Player:> As those on the list are dragged away at gunpoint you feel nothing for their plight<Pause {short_pause}>. And why should you?<Pause {short_pause}> The King is in power now<Pause {short_pause * 0.5}>, and no doubt he will remember his friends <Continue>
      
      -> thank_you_message

  = player_imprisoned
    <Eleni:> As a guard seizes you by the arm tightly you realise with horror that <Pace {slow_pace}><b>you</b></Pace> are on the list as well <Continue>
    
    * [Resist the arrest physically]
      <Player:> You pull against the soldier's grip<Pause {short_pause * 0.5}>. They hit you, hard, and it is no use<Pause {short_pause}>. Before long your hands are bound and your mouth gagged and you stop resisting<Pause {short_pause}> This is the end of your story, you suppose<Pause {short_pause}>. You consider the possibility of a daring escape <Continue>
      
      -> thank_you_message
      
    * [Decry the injustice]
      <Player:> "Tyranny-!" You shout with a muffled voice, as the guard's hand is clenched over your mouth<Pause {short_pause * 0.5}>. Before not too long you are gagged, and being led to the edge of the park<Pause {short_pause * 0.5}>. Onwards to some dingy cell, you expect<Pause {short_pause}>. You wonder of your chances of escape<Pause {short_pause * 0.5}>, or of perhaps being freed <Continue>
      
      <Player:> You decide that you are not too optimistic. <Pause {short_pause}>But you never know. <Continue>
      
      -> thank_you_message
    * [Promise vengeance]
      <Player:> "I'll be back!" you announce<Pause {short_pause * 0.5}>. "Oh mark my words I'll be back<Pause {short_pause * 0.5}>. And then you'll be sorry!" <Continue>
      
      <Eleni:> "Quiet, scum!" The guard announces as she drags you towards a waiting car<Pause {short_pause}>. "Try to run and I'll shoot you" <Pause {short_pause * 0.3}>
      
      <Player:> Best save your escape attempts for later, then.<Pause {short_pause * 0.3}> You wonder what the future holds ... you suppose that escaping is unlikely<Pause {short_pause * 0.4}, if indeed you are not to be executed<Pause {short_pause}>. Yet you remain optimistic <Continue>
      
      -> thank_you_message
    * [Accept your fate stoicly]
      <Player:> You hold your head up high and with dignity as you are led to the bus which will take you into custody <Continue>
      
      <Eleni:> The guard seems to appreciate this.<Pause {short_pause}> The two of you watch Andrew's unconscious body being dragged towards the bus in front of you<Pause {short_pause}>
      
      <Player:> You wonder what will become of you<Pause {short_pause * 0.4}>, and of the rest of this procession of those inconvenient to the new status quo<Pause {short_pause}>. You may yet live, you suppose optimistically <Continue>
      
      -> thank_you_message
    * [Begin to sob]
      <Player:> You are sobbing uncontrollably as you make it towards the prison bus<Pause {short_pause * 0.5}>. You can feel like you haven't cried like this in years<Pause {short_pause}>. It's so liberating<Pause {short_pause * 0.3}>, the only thing on your mind is the tears rolling down your face <Continue>
      
      -> thank_you_message
    * { ruler == "rupert"} ["Death to the King!"]
      <Player:> "Death to the King!" you announce defiantly<Pause {short_pause * 0.5}>. "Big City will see a Republic again!" <Continue>
      
      <Eleni:> "Quiet, scum!" The guard announces as she drags you towards a waiting car<Pause {short_pause}>. "Try to run and I'll shoot you" <Pause {short_pause * 0.3}>
      
      <Player:> Best save your escape attempts for later, then.<Pause {short_pause * 0.3}> You wonder what the future holds ... you suppose that escaping is unlikely<Pause {short_pause * 0.4}, if indeed you are not to be executed<Pause {short_pause}>. Yet you remain optimistic <Continue>
      
      -> thank_you_message
    
  = player_is_monarch
    <Player:> Hands on your waist, you survey your kingdom with pride <Pause {short_pause}>. You are faintly aware of the crowd chanting your name.<Pause {short_pause}> For a brief moment, you think about imprisonning those disloyal<Pause {short_pause}> - Mari in particular seems like she might be a malcontent troublemaker<Pause {short_pause}>. You decide that your first purge can wait until at least tomorrow ... <Continue>
    
    -> thank_you_message
    
== coup_dilemma==
  <Leopald:> <ColorFade black red 5> "I left for the <b>arsenal</b> this morning" Leopald reveals ...<Pause {short_pause}><br/>"I went with some <Pace {slow_pace * 0.4}><b>likeminded individuals</b></Pace>, and we armed ourselves <Pace {slow_pace * 0.4}>to the</Pace><Pace {slow_pace * 0.35}> teeth</Pace><br/><Pause {short_pause * 1.25}>There are more proud defenders of liberty lurking in the <b>shrub</b> with our guns<Pause {short_pause * 0.5}>, awaiting my word" <Continue>
  
  <Player:> <color {intuition_color}>You think you notice a rustling in the bushes</color> <Continue>
  
  <Leopald:> "The utopia that we wish to build must be built on virtue <Pace {slow_pace * 0.6}><em>and</em></Pace> terror<Pause {short_pause * 0.5}>, in equal measure"<Pause {short_pause}><br/>"Will you stand in our way, and fall by the sword of virtue, or repent... and live?!"
  
  * [You believe Leopald has an armed force in waiting]
    <Player:> So then... you are surrounded
    
    -> leopald_has_you_surrounded
    
  * [You are sure that Leopald is bluffing]
    <Player:> You scoff<Pause {short_pause * 0.75}>. "Oh yeah?!"<Pause {short_pause}>
    <Player:> "I don't believe you could find <Pace {slow_pace * 0.4}><b>ONE</b></Pace> fool to follow you Leopald<Pause {short_pause * 0.5}>, let alone a dozen!" <Continue>
    
    <Leopald:> Leopald is looking at you from behind a poker face <Continue>
    
    <Leopald:> "Arsene"<Pause {short_pause * 0.4}>. His voice is raised <Continue>
    
    <Arsene:> A man steps out from beyond the bush<Pause {short_pause * 0.4}>, he is carrying a carbine rifle.<Pause {short_pause}>
    
    <Player:> You feel a lump in the back of your throat <Continue>
    
    ** [One man.. well that doesn't prove anything]
       <Player:> "What does <b>one man</b> prove?!<Pause {short_pause * 0.8}> Even with a rifle.<Pause {short_pause}> I could take him" <Continue>
       
       { burly_minion: <Burly:> "You could take him boss" <Continue> }
       
       <Arsene:> "Would you like to try?" the gruesome looking man asks.<Pause {short_pause}> There is malevolent intent behind his eyes <Continue>
       
       -> player_silent
       
    ** [Okay, so he might be telling the truth] -> leopald_has_you_surrounded
    
  = leopald_has_you_surrounded
    * [There's only one thing for it (PANIC)]
    
      ~ player_courageous -= 3
      -> player_panics
    * {player_courageous > 0} [You're not scared!] -> player_defiant
    * [Your face goes a ghostly white. You remain still as stone] -> player_silent
    * [You remain silent, stoicly]
      ~ player_courageous += 1
      -> player_silent
  
  = player_panics
    <Player:> You are willing with great ferocity to speak... the energy builds and builds... until finally the words burst from your lips<Pause {short_pause * 1.25}> "Have mercy!" <Continue>
    
    -> player_silent

  = player_defiant
    <Player:> <em>"I'm not scared!"</em> you tell yourself convincingly<Pause {short_pause}><br/>"I'm not scared of you!" <Continue>
    
    <Leopald:> Leopald is looking at you with a sort of gleeful look of a toddler<Pause {short_pause * 0.5}>, he is thoroughly enjoying your defiance and it has taken him by surprise <Continue>
    
    -> player_silent
  
  = player_silent
    <Mari:> Mari has turned on her heels and ran away.<Pause {short_pause}>
    <Leopald:> Leopald laughs smugly as she runs <Continue>
    
    <Leopald:> He licks his lips. { player_has_greensight: <Pause {short_pause * 0.75}>He has been eager for this moment<Pause {short_pause * 0.5}>, he is revelling in it } <Continue>
    
    <Eleni:> Leopald's co-conspirators have begun to step out from the line of bushes<Pause {short_pause * 0.5}>. You count seven in total <Pause {long_pause}>
    
    <Player:> <em>A coup, with seven soldiers?!</em><Pause {short_pause * 0.3}>, you wonder.<Continue>
    
    <Leopald:> Leopald glances at you nervously<Pause {short_pause * 0.3}>, as if reading your mind.<Pause {short_pause * 0.3}><br/>"There are many more of us!" he announces<Pause {short_pause}>. "Those of you who comply will be amply rewarded.<Pause {short_pause * 0.3}> Resist and you will be crushed" <Continue>
    
    <Leopald:> He looks about the faces in the crumbling Agora<Pause {short_pause}>.<br/>"We will be reinstating the police force<Pause {short_pause * 0.4}>, and returning them to their former prestige" <Continue>
    
    <Leopald:> "I have a list of troublemakers who are to be rounded up and placed under arrest". <Pause {short_pause * 0.75}>He turns to face you now<Pause {short_pause * 0.2}>. "Yes, <Pace {slow_pace}><b>you</b></Pace> are on it" <Continue>
    
    <Arsene:> A soldier grabs you by your arm and roughly jerks you in front of him<Pause {short_pause * 0.5}>, his rifle to your back.<Pause {short_pause}>
    <Eleni:> The other ties your wrists together <Continue>
    
    <Arsene:> They drive you from the agora and through the park<Pause {short_pause * 0.4}>, to the gates <Pause {short_pause}>
    <Andrew:> Andrew is taken prisoner as well<Pause {short_pause * 0.5}>, you are dimly aware <Continue>
    
    <Heinrich:> By the gates there are two more armed guards.<Pause {short_pause}> They watch on nervously as a crowd is gathering outside <Continue>
    
    <Arsene:> "Disperse!"<Pause {short_pause * 0.6}><br/>He shouts it into a crowd that does not hear him<Pause {short_pause}><br/>"Disperse!" <Continue>
    
    <Zoe:> A troop approaches over the horizon<Pause {short_pause * 0.4}>, making a lot of noise.<Pause {short_pause * 1.2}> You cannot see how many there are, maybe three dozen <Pause {long_pause}>
    
    <Zoe:> They are calling people onto the street to join them, and they're full of energy <Continue>
    
    <Mari:> You spot Mari at the head of the crowd.<Pause {short_pause}> She must be spreading the word
    
    * [Call for help]
      <Player:> "Mari!" you call out, but the soldier <em>SLAMS</em><Effect Shake><Pause 375> the butt of his rifle into your stomach and you keel over in pain <Continue>
      -> battle
      
    * [Shout a warning]
      <Player:> "Mari!" you call out, but the soldier <em>SLAMS</em><Effect Shake><Pause 375> the butt of his rifle into your stomach and you keel over in pain <Continue>
      -> battle
      
    * [Say nothing] -> battle
    
  = battle
    <Mari:> { mari_trusting > 0: "{player_name}!"} {mari_trusting <= 0: "Andrew!"} she calls<Pause {short_pause * 0.5}>, rushing forward to help.<Pause {short_pause}> Where she treads the crowd follows<Pause {short_pause * 0.4}>, despite the danger.<Pause {short_pause * 0.6}> Leopald and his followers have now caught up, and their rifles pointed into the crowd. <Continue>
    
    <Player:> <em>They will not fire</em> you think to yourself<Pause {short_pause}>. That would be madness. <Continue>
    
    <Leopald:> <FadeOutAll 1> <b>BOOM!</b><Effect Shake><Pause {short_pause * 0.33}> a rifle sounds.<Pause {short_pause}> The echo rings through your body into a terrible abyss ... <Continue>
    
    <Andrew:> <FadeInAll 1> "{player_name}?"<Pause {short_pause * 0.33}><br/>"{player_name}?"<Pause {short_pause * 0.33}><br/>"Are you alright?" <Continue>
    
    <Player:> Gradually you flutter back into consciousness... the world seems to flutter with you. <Pause {long_pause}>
    
    <Andrew:> Andrew is stood over you<Pause {short_pause}>. He is holding a rifle. There is blood on his clothes <Continue>
    
    <Null:> There are bodies strewn everywhere. <Pause {long_pause}> You see Leopald's, and those of some guards.<Pause {short_pause}> You see other faces you recognise dimly<Pause {short_pause * 0.3}>, on still others the faces of complete strangers. <Continue>
    
    <Mari:> You see Mari, her face pale and her eyes icy<Pause {short_pause * 0.4}>. Dead too. <Pause {short_pause}>
    
    ~ mari_died = true
    
    <Andrew:> You cannot hear what Andrew is saying<Pause {short_pause * 0.4}>, but he forcibly averts your gaze <Continue>
    
    <Null:> Someone is helping you to your feet and guiding you away<Pause {short_pause * 0.4}>, back to the Agora.<Pause {short_pause}> You notice the sound of birds chirping <Continue>
    
    <Andrew:> "We beat them<Pause {short_pause}>. You need time to recoop<Pause {short_pause * 0.5}>. We will bury our dead... and meet on the morrow to discuss what has happened... where to go from here" <Continue>
    
    * [Make yourself useful] -> thank_you_message
    * [Stay seated on the grass] -> thank_you_message
    * [Ask for help] -> thank_you_message

== thank_you_message ==
  <Null:> Thanks for playing! We plan on doing some much more interesting things with this platform.<Pause {short_pause}> We're going to open it up to allow the world to share their own stories with each other<Pause {short_pause * 0.5}>, and then to allow the data from those stories to go further<Pause {short_pause * 0.5}>, to allow characters and worlds to overlap and be read into other games in an open API.<Pause {short_pause}> If you're interested in this project<Pause {short_pause * 0.5}>, please get in touch!<br/> start@games.coop <Continue>
  
  -> END
