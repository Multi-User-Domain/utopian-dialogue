
VAR long_pause = 2000
VAR is_champion = false
VAR text = "<GET_TEXT https:\/\/calum.inrupt.net/public/mudcard.ttl>"

->introduce_achilles

=== introduce_achilles ===
    <Craig:> "Greetings! I am Achilles,<Pause {long_pause}> Champion of all the Greeks! And who are <em>you</em>, strange humanoid?"
    
    <Rupert:> "And <em>I</em>... am King Rupert"
    
    <Craig:> "Nobody cares who you are"
    
    * <Player:> I am Player One, number one of all players -> champion
    * <Player:> Greetitudes! I am Player One -> not_champion
    
== champion ==
    <Craig:> "Champion, eh?". Achilles seems impressed
    <Effect Shake>
    
    #{"MATCH_GRAPH https:\/\/calum.inrupt.net/public/mudcard.ttl":
    #    <Craig:> "I know about you"
    #- else:
    #    <Craig:> "I do not know about you yet"
    #}
    
    #{ world.hello != "test":
    #    {world.hello}
    #- else:
    #    "test"
    #}
    
    -> DONE

== not_champion ==
    <Craig:> "Ha! Just Player One. Champion of nothing and superior to nobody"
    -> DONE
