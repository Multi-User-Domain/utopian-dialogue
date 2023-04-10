
VAR long_pause = 2000
VAR short_pause = 1000
VAR is_champion = false
VAR achilles_img = "http:\/\/images.fineartamerica.com/images-medium-large/achilles-arturas-slapsys.jpg"
VAR character_jsonld = "https:\/\/github.com/Multi-User-Domain/utopian-dialogue/raw/master/public/rdf/ospreyWithers.json"

->introduce_achilles

=== introduce_achilles ===
    <{achilles_img}:> "Greetings! I am Achilles,<Pause {short_pause * 0.5}> Champion of all the Greeks! And who are <em>you</em>, strange humanoid?"
    
    <{character_jsonld}:> "And I am being read from a character JSON-LD"
    
    * <Player:> I am Player One, number one of all players -> champion
    * <Player:> Greetitudes! I am Player One -> not_champion
    
== champion ==
    <{achilles_img}:> "Champion, eh?". Achilles seems impressed
    <Effect Shake>
    
    -> DONE

== not_champion ==
    <{achilles_img}:> "Ha! Just Player One. Champion of nothing and superior to nobody"
    -> DONE
