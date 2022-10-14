
# Synopsis

Big City meets the Big Pop! In a mere moment, when the Great Pop hit, the Old World disappeared and the player, as well as the rest of the world around them, have forgotten who they are and how the world worked. All that is left is the grasp of language, and it is up to the player to negotiate with the people they find around them the ultimate question: "How do we want to live together?"

The Utopian Dialogue is a browser-rendered text based adventure game which asks the player to consider utopia, balancing the needs and interpreations of the other characters whom they meet in this new and yet familiar world. The actions of the player will shape how the world is, who they are and develop the characters around them

## Creating Stories

Create custom stories and play them with our engine!

[Ink](https://www.inklestudios.com/ink/) is a simple but powerful programming language used to develop branching narratives. We support importing ink files to load self-contained games into the dialogue engine, which can then be played out just like the base narrative

We have some custom syntax in Ink which allows for some new features (e.g. character portraits). See below

### Quickstart

* [Install Inky](https://www.inklestudios.com/ink/) and write your first narrative (start with something simple!)
* Export your file to JSON (File -> Export to JSON). Save the file, e.g. as `mystory.ink.json`
* Now we will need to serve the JSON file over HTTP. Don't worry if this sounds complicated, see steps below for an easy way to do this
* [Sign up for a Solid Pod](https://solidcommunity.net/register). It's free
* Click the folder icon, then under the sub-menu "public", click on the + icon, and then the icon `<>` which means "create a file". Choose a filename ending `.json` (e.g. `mystory.ink.json`), and click the tick
* Copy the contents of the file you saved earlier (`mystory.ink.json`) into the text box that appears. Click the tick icon to save
* If you minimise the editor (click the downward arrow to the left of your file name), you'll see that in the menu the file has an icon to the right of it which looks like an arrow leaving a circle. Click this icon, it will open up in your browser as a big splurge of code within some curly brackets `{}`. This is a JSON object. Copy the **URL** of the page, e.g. `https://calum.inrupt.net/public/utopian-dialogue/achilles.ink.json`
* Open Utopian Dialogue, and from the main menu select `Load a Custom Narrative`
* Paste the URL of your story, and play!

### Custom Ink Syntax

See the [Ink docs](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md) for the base syntax. Beyond this, we add some custom syntax for new features

#### Adding Character Portraits

To add a portrait to some text, to indicate who is saying it, start a new line like so:

```
=== introduce_achilles ===
    <Craig:> "Greetings! I am Achilles, Champion of all the Greeks! And who are <em>you</em>, strange humanoid?"
    
    <Rupert:> "And <em>I</em> am King Rupert"
```

Here the words `<Craig:>` will be stripped from the story content and Craig's portrait will be displayed as the speaker

Note that currently custom portraits are not supported - please select a portrait name from the [list here](https://github.com/Multi-User-Domain/utopian-dialogue/blob/master/components/lib/performers.ts#L3), e.g. `Mari`, `Craig` or `Andrew`

#### Continue Prompts

Displaying everything in the story in one prose will be too fast for many readers to follow. It's better to include `<Continue>` whenever you want one message to end:

```
<Douglas:> "Do you remember who you are?!". He is addressing you <Continue>
```

Note that a continue prompt can only be placed at the end of the line (at least, placing it twice in the same paragraph will only have the effect once). If there are choices following the message, the continue prompt will be ignored

#### Pauses

To make the text animation Pause manually, use `<Pause 100>`, replacing `100` with the milliseconds the pause should last for. The recommendation is to use your own variables in ink which you can control:

```
VAR long_pause = 2000

<Craig:> "Greetings! I am Achilles,<Pause {long_pause}> Champion of all the Greeks! And who are <em>you</em>, strange humanoid?"
```

#### Effects

Some special animation effects are available, see below:

* **Shake**: makes the screen shake. <Effect Shake _timeout_>, e.g. `<Effect Shake 500>`. Timeout optional, defaults to 500

#### Text Markup

Some basic text markup is supported: `<em>emphasis</em>` and `<b>bold</b>`

Text can be colored using `<color "#ffffff">text</color>`
