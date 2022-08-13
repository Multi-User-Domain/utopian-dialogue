
# Synopsis

Big City meets the Big Pop! In a mere moment, when the Great Pop hit, the Old World disappeared and the player, as well as the rest of the world around them, have forgotten who they are and how the world worked. All that is left is the grasp of language, and it is up to the player to negotiate with the people they find around them the ultimate question: "How do we want to live together?"

The Utopian Dialogue is a browser-rendered text based adventure game which asks the player to consider utopia, balancing the needs and interpreations of the other characters whom they meet in this new and yet familiar world. The actions of the player will shape how the world is, who they are and develop the characters around them

## A New Era of Adventure Game

Optionally, the experience can be taken further into the new and exciting world of decentralised adventure games. Using the [Multi User Domain](https://github.com/Multi-User-Domain/mud-lib), the player can activate their game data. Later they will be able to use their city as a setting in the dialogues created by other players, play other games within the setting and expose it to their friends to be transformed in unforseen ways

## Creating Stories

### Extending the Base Dialogue

Our intention is to build a game which engages the reader in a utopian dialogue and explore the question "how do we want to live together?"

If you have an interesting expansion to our game, then please feel free to write it and open a PR!

Our process for writing stories is as follows:
* We prototype the story using [Ink](https://www.inklestudios.com/ink/) ([repo](https://github.com/inkle/ink)). Please see the agora dialogue in the `ink` directory for an example of how this works
* Playtest it to see if your choices work!
* Create a new React component in `components/frames`. Please refer to `agora` as a reference. You can now use the `Dialogue` and other providers to write and animate your story using JavaScript. We use [Windups](https://windups.gwil.co) to provide much of the text animation but you can try custom things as well

### Writing and Sharing Semantic Dialogue

TODO!