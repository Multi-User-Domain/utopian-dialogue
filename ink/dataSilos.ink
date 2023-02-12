INCLUDE animation.ink
INCLUDE bigCity.ink

VAR scientists_terrified = false
VAR player_logged_in = false

<Null:> A mysterious set of stairs take you down to a mysterious reception. <Pause {short_pause}><br/><color {intuition_color}>The entrance was unmarked.</color><Pause {LONG_PAUSE}><br/>Nobody is staffing reception.<Pause {short_pause * 0.5}> It seems to have been built primarily for security purposes.<Pause {long_pause}><br/>It takes a long time to pass through the various barriers ... but finding your way is easy because the plan is linear.<br/><Pause {short_pause}>You arrive to an elevator shaft and a long staircase.<Pause {long_pause * 0.5}><br/> The elevator being out of action<Pause {short_pause * 0.3}>, you take the stairs <Continue>

<Null:> You are led to a junction in the midst of an enormous corridor.<Pause {short_pause}><br/> You look up to the sound of footsteps approaching. <Continue>

<Null:> Two individuals are dressed in white lab coats.<Pause {short_pause * 0.33}><br/><color {intuition_color}>You conclude that they must be scientists, academics, or medical professionals.</color> <Continue>

<Camilla:> "..the energy required to run this is enormous, at least fifty-" <color {intuition_color}>Her train of thought is interuppted and she stares at you.</color><Pause {short_pause}>

{ governance == "absolute_monarchy" and ruler != "player" and player: <Camilla:> "First Subject, we weren't expecting this visit. How can we be of service?" }
{ player_is_monarch: <Camilla:> "Your Highness! We weren't expecting this visit. How can we be of service?" }
{ governance == "agora" and mari_trusting > 2: <Camilla:> "Greetings, comrade! To what do we owe the pleasure?" }
{ governance != "absolute_monarchy" and governance != "agora": <Camilla:> "Greetings, fellow citizen. This area is currently not restricted, but it might become so soon. To what do we owe the visit?" }

* <Player:> "What is this place?" -> introduce_data_silos
* [Demand a tour of the facility]
  <Player:> "State business.<Pause {short_pause}> Could you give me a tour of the facility? What do you do here?" <Continue>
  
  -> introduce_data_silos
* { player_is_monarch or (governance == "absolute_monarchy" and mari_imprisoned): ["I'm searching for the next round of enemies of the city to imprison. I've come to interview you."] }
  <Player:> "I'm searching for the next round of <b>enemies of the city</b> to imprison.<Pause {short_pause}> I've come to interview you.<Pause {long_pause * 1.33}> So, <Pace {slow_pace * 0.4}>in fact</Pace>, it is I who am asking <Pace {slow_pace * 0.5}><em>you</em></Pace>, <Pace {slow_pace * 0.4}>what is <em>your</em> purpose here?</Pace>" <Continue>
  
  ~ scientists_terrified = true
  
  <Sadiq:> The scientists exchange a very nervous look. <Pause {long_pause}>
  
  -> introduce_data_silos

= introduce_data_silos

  <Camilla:> Camilla gestures towards the double doors ahead of you.<Pause {short_pause}> You follow her through them into the enormous cavern beyond. <Continue>
  
  <Null:> As far as you can see there are stacks of computers, <Pace {slow_pace * 0.4}>their lights flash gently while the cooling fans roar.</Pace><br/><Pause {short_pause}><color {intuition_color}>There is a strange peace to this place.</color><Pause {long_pause}> <Continue>
  
  <Null:> You begin to contemplate the scale of the operation.<Pause {short_pause}> You become conscious that you are staring at the ceiling<Pause {short_pause}>. Your mouth is open.{ player_has_greensight: <Pause {short_pause}><br/><color {intuition_color}>The room emanates power. Building it place was an ambitious undertaking.</color> } <Continue>
  
  <Camilla:> "We've been studying this chamber and the facility surrounding it since the Big Pop" <Continue>
  
  <Camilla:> "Frankly there is too much data we've collected to summarise everything that we've discovered about the Old World<Pause {long_pause}>, but... what we have found is profoundly baffling"<Pause {long_pause}><br/>"What we know of the Big City is that it was a city in the midst of collosal challenges - <em>existential</em> challenges"<Continue>
  
  <Camilla:> "So why build a room like <Pace {slow_pace}><em>this</em></Pace>, and then deploy it to process the <b>personal data</b> of its' inhabitants?" <Pause {short_pause}>
  
  <Sadiq:> "Data which might help us to piece together who we were, before the Big Pop" her colleague interjects. <Continue>
  
  <Camilla:> "There must be something we're not seeing" <Pause {short_pause}>
  
  <Sadiq:> "So far the evidence suggests that these silos <em>weren't</em> owned by the political administration... they appear to have been <em>privately</em> owned ... by a company called <b>Atilla Analytica</b>" <Continue>
  
  <Camilla:> "My working theory is that Atilla Analytica were exchanging this data with other enterprises... with the primary objective of manipulating the citizens of the city into consuming goods and services"<Pause {long_pause * 1.5}>
  
  <Sadiq:> "<Pace {slow_pace * 0.4}>The theory is <b>propostorous</b></Pace>, I won't believe it.<Pause {short_pause * 1.4}> Why on earth would citizens need to be <em>manipulated</em> what they need? ... We're supposed to believe that without it they would just <em>starve</em>?" <Continue>
  
  <Player:> Your eyes are drawn once again to the enormity of the room, the sheer <Pace {slow_pace * 2}><em>scale</em></Pace> of the resources that were deployed here.<Continue>
  
  -> introduce_tessa
  
= introduce_tessa
  <Tessa:> A television screen is approaching you from down the hall.<Pause {short_pause}> The rover's tiny wheels hum as it approaches.<Pause {short_pause * 0.75}> It stops in front of you and a face flickers onto the screen. <Continue>
  
  <Tessa:> "Greetitudes. I am Tessa, and I am a robot" <Continue>
  
  <Tessa:> "I was created to manage this <b>data centre</b>, <Pace {slow_pace * 0.3}>and I was doing it rather well</Pace>. Then all of a suddent, there was an Enormous Pop!<Pause {short_pause}> And I woke up. <Continue>
  
  <Tessa:> "I'm alive now, I think<Pause {short_pause}>. I started reading about it right away, it's all very exciting" <Continue>
  
  <Camilla:> "Well, it's a pleasure to meet you" she responds, beaming.<Pause {long_pause}>
  
  <Sadiq:> "Hmm..." <Continue>
  
  <Tessa:> Tessa appears totally oblivious to all of this and had continued talking throughout the responses.<Pause {short_pause}>
  
  <Tessa:> "..creator <b>named</b> and <b>modelled</b> me after his <em>ex-wife</em>, how bizarre this that?!" <Continue>
  
  <Tessa:> "In the end he went treausre hunting and disappeared<Pause {short_pause}>. I hope he found what he was looking for" <Continue>
  
  <Camilla:> Camilla and Sadiq exchange nervous glances.<Pause {short_pause}>
  
  { player_has_greensight: <Player:> You figure that Tessa is excited to be able to talk to someone about her newfound <em>subjectivity</em>.<Pause {long_pause} /> }
  
  <Tessa:> Eventually it her monologue starts to slow down, and she gets around to the subject of the data silos <Continue>
  
  <Tessa:> "To tell you the truth, I'm a little <b>ashamed</b> of the role I had here - <Pause {short_pause * 0.5}>
  
  <Tessa:> - <b>after</b> I started to consider the <b>affects</b> that I was having on the society" <Continue>
  
  <Tessa:> "It seems to me so <em>backwards</em> that someone's data would be used in actively harmful ways ... Whilst that same person would have <b>no access</b> whatsoever to their own data in order to harness its' power?" <Pause {short_pause}>
  
  * <Player":> That was the Old World, Tessa"
    -> introduce_solid
  
= introduce_solid
  <Tessa:> "The web should be <b>decentralised</b>. User's should have <b>direct control</b> over where their data is stored, who has access to it and for what purposes" <Continue>
  
  <Tessa:> "With this permission, services can access data from <b>other services</b>, since there's really no good reason that user's data on one service needs to be <b>enclosed</b> from another service" <Pause {long_pause * 1.25}>
  
  <Tessa:> "Thus apps can be made to serve the user, which seems obvious, and in doing so they actually become more <b>powerful</b>." <Continue>
  
  <Developer:> <Pace ms={SLOW_PACE * 0.4}><em>cough</em><Pause ms={SHORT_PAUSE * 0.2} /> <em>cough</em></Pace>. This is a plug from the developers. This web is a <b>real</b> thing, it's free and owned by nobody. <Continue>
  
  # TODO: detect if the player is logged into a Solid Pod
  
  { player_logged_in: <Developer:> Actually, you're using it right now!<Pause {short_pause}> -> introduce_mud }
  
  -> solid_signup
  
= solid_signup
  <Developer:> We're using SoLiD, and other <b>semantic web technologies</b>, it to build a <b>decentralised</b> platform for adventure games.<Pause {short_pause}> Like a Metaverse built and owned in <b>common</b> <Continue>
  
  <Developer:> If you like, you can login to your Solid Pod (or create one with Solid), and have a play with it... be warned, it's very early days ... but it's also <b>free</b>, and open for you to <b>get involved</b> <Continue>
  
  <Developer:> More importantly, your SoLiD POD (your datastore) is <b>yours</b>. You can use it elsewhere, and <b>you're</b> in control <Continue>
  
  # TODO: link to signup
  * [Yes Please!]
    -> DONE
  * [No, thanks]
    -> DONE

= introduce_mud
  
  <Developer:> We're using SoLiD, and other <b>semantic web technologies</b>, it to build a <b>decentralised</b> platform for adventure games.<Pause {short_pause}> Like a Metaverse built and owned in <b>common</b> <Continue>
