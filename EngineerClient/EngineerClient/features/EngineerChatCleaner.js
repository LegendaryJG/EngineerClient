import data  from "../data"
const Data = data.chatCleaner

register("command", (command) => { 
    switch (command) {
    case undefined: ;
    case "": 
    const toggle1 = Data.friendJoinMessages ? `&a` : `&c`
    const toggle2 = Data.partyChat ? `&a` : `&c`
    const toggle3 = Data.dungeonSpam ? `&a` : `&c`
    const toggle4 = Data.randomMessages ? `&a` : `&c`
    const toggle5 = Data.watcherMessages ? `&a` : `&c`
    const toggle6 = Data.bossMessages ? `&a` : `&c`
    const components = [
        { name: `&3Clean Friend join messages ${Data.friendJoinMessages ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner friendJoinMessages`, hoverText: "Toggle Clean Friend join messages" },
        { name: `&3Clean Party Chat ${Data.partyChat ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner partyChat`, hoverText: "Toggle Clean Party Chat" },
        { name: `&3Hide Dungeon spam ${Data.dungeonSpam ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner dungeonSpam`, hoverText: "Toggle Dungeon spam" },
        { name: `&3Hide Random messages ${Data.randomMessages ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner randomMessages`, hoverText: "Toggle Random messages" },
        { name: `&3Hide Watcher messages ${Data.watcherMessages ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner watcherMessages`, hoverText: "Toggle Watcher messages" },
        { name: `&3Hide Boss messages ${Data.bossMessages ? "&aenabled" : "&cdisabled"}`, command: `/ChatCleaner bossMessages`, hoverText: "Toggle Boss messages" },
    ];
    const toggleName = Data.toggled ? "on" : "off";
    const toggleColor = Data.toggled ? "&a" : "&c";
    ChatLib.chat(`\n                         &cEngineer&bChatCleaner`);
    new TextComponent(`                              ${Data.toggled ? "&a" : "&c"}&nMain toggle ${Data.toggled ? "on" : "off"}`).setHover("show_text", `/ChatCleaner toggle`).setClick("run_command", `/ChatCleaner toggle`).chat()
    ChatLib.chat(`\n                              &7Click to toggle\n`);
    components.forEach(({ name, command, hoverText }) => {new TextComponent(`         ${name}`).setHover("show_text", hoverText).setClick("run_command", command).chat();});    
        break;

    case "toggle":
        Data.toggled = !Data.toggled;
        data.save()
        mainToggle(Data.toggled)
        ChatLib.chat(` &3chatCleaner &9toggled ${Data.toggled ? "&aon" : "&coff"}`);
        break;

    case "friendJoinMessages":
        Data.friendJoinMessages = !Data.friendJoinMessages;
        const toggled1 = Data.friendJoinMessages ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Clean &bFriend join messages &9toggled ${Data.friendJoinMessages ? "&aon" : "&coff"}`);
        break;

    case "partyChat":
        Data.partyChat = !Data.partyChat;
        const toggled2 = Data.partyChat ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Clean &bParty Chat &9toggled ${Data.partyChat ? "&aon" : "&coff"}`);
        break;

    case "dungeonSpam":
        Data.dungeonSpam = !Data.dungeonSpam;
        const toggled4 = Data.dungeonSpam ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Hide &bDungeon spam &9toggled ${Data.dungeonSpam ? "&aon" : "&coff"}`);
        break;

    case "randomMessages":
        Data.randomMessages = !Data.randomMessages;
        const toggled3 = Data.randomMessages ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Hide &bRandom messages &9toggled ${Data.randomMessages ? "&aon" : "&coff"}`);
        break;

    case "watcherMessages":
        Data.watcherMessages = !Data.watcherMessages;
        const toggled5 = Data.watcherMessages ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Hide &bWatcher messages &9toggled ${Data.watcherMessages ? "&aon" : "&coff"}`);
        break;

    case "bossMessages":
        Data.bossMessages = !Data.bossMessages;
        const toggled6 = Data.bossMessages ? `&aon` : `&coff`;
        data.save()
        ChatLib.chat(` &3Hide &bBoss messages &9toggled ${Data.bossMessages ? "&aon" : "&coff"}`);
        break;

    default:
        ChatLib.chat(`&ccouldnt find /ChatCleaner "${command}"`)
}}).setName("chatcleaner")

// if (!bloodStartMessage.includes(message)) return

const randomMessages = [
    /Your pickaxe ability is on cooldown for .+s./,
    /AUTO-PICKUP! Drop sent to your inventory! \[I GET IT\]/,
    /Warping you to your SkyBlock island.../,
    /You earned .+ Event EXP from playing SkyBlock!/,
    /Warping.../,
    /Watchdog has banned .+ players in the last 7 days./,
    /RARE REWARD!.+/,
    /You are playing on profile\: .+/,
    /Profile ID\:.+/,
    /Whow! Slow down there!/,
    /Woah slow down, you're doing that too fast!/,
    /Command Failed: This command is on cooldown! Try again in about a second!/,
    /Autopet equipped your.+/,
    /Your Auto Recombobulator recombobulated/,
    /Blacklisted modifications are a bannable offense!/,
    /\[WATCHDOG ANNOUNCEMENT\]/,
    /Staff have banned an additional .+/,
    /You sold .+ x.* for .+/,
    /You don't have enough space in your inventory to pick up this item!.*/,
    /Inventory full\? Don't forget to check out your Storage inside the SkyBlock Menu!/,
    /You are not allowed to use Potion Effects.+/,
    /You summoned your.+/,
    /Moved .+ Ender Pearl from your Sacks to your inventory./,
    /There are blocks in the way!/,
    /Click here to view them!/,
    /.+ joined the lobby! .*/,
    /Welcome to Hypixel SkyBlock!/,
    /Latest update: SkyBlock .+/,
    /BONUS! Temporarily earn 5% more skill experience!/,
    /Sending to server .+/,
    /Queuing... .+/,
    /Your .+ hit .+ for [\d,.]+ damage./,
    /You do not have enough mana to do this!/,
    /\w+ Kill Combo+/,
    /You earned .+ GEXP .*/,
    /This menu is disabled here!/,
    /This item is on cooldown.+/,
    /This ability is on cooldown.+/,
    /Please wait a few seconds between refreshing!/,
    /You cannot hit the silverfish while it's moving!/,
    /Your Kill Combo has expired! You reached a .+ Kill Combo!/,
    /Your active Potion Effects have been paused and stored. They will be restored when you leave Dungeons! You are not allowed to use existing Potion Effects while in Dungeons./,
    /FISHING FESTIVAL The festival is now underway! Break out your fishing rods and watch out for sharks!/,
    /Attempting to add you to the party.../,
    /Mythological Rituals! A mythological creature spawned!/
]

const dungeonSpam = [
        /Creeper Veil Activated!/,
        /Creeper Veil De-activated!/,
        /\w+ has obtained Revive Stone!/,
        /\[NPC\] Mort: .+/,
        /The Crusher hit you for .+ damage!/,
        /Your Spirit Pet healed .+ for .+ health!/,
        /.+ Granted you .+/,
        /Goldor's TNT Trap hit you for 1,788.9 true damage./,
        /A Blood Key was picked up/,
        /This Terminal doesn't seem to be responsive at the moment./,
        /⚠ Maxor is enraged! ⚠/,
        /⚠ Storm is enraged! ⚠/,
        /Giga Lightning.+/,
        /Necron's Nuclear Frenzy hit you for .+ damage./,
        /Someone has already activated this lever!/,
        /Goldor's Greatsword hit you for .+ damage./,
        /A mystical force in this room prevents you from using that ability!/,
        /The Frozen Adventurer used Ice Spray on you!/,
        /It isn't your turn!/,
        /That chest is locked!/,
        /Don't move diagonally! Bad!/,
        /Oops! You stepped on the wrong block!/,
        /A shiver runs down your spine.../,
        /The BLOOD DOOR has been opened!/,
        /Your Ultimate is currently on cooldown for .+ more seconds./,
        /ESSENCE! .+ found .+ Essence!/,
        /This lever has already been used./,
        /You hear the sound of something opening.../,
        /This chest has already been searched!/,
        /.+ has obtained .+!/,
        /.*Also granted you.+/,
        /The Lost Adventurer used Dragon's Breath on you!/,
        /Throwing Axe is now available!/,
        /Used Throwing Axe!/,
        /\[STATUE\] Oruo the Omniscient: [^I am Oruo the Omniscient.].+/,
        /\[NPC\] (Hugo)/,
        /PUZZLE SOLVED!.+/,
        /DUNGEON BUFF! .+/,
        /A Crypt Wither Skull exploded, hitting you for .+ damage./,
        /\w+ opened a WITHER door!/,
        /\[[Tank|Healer|Mage|Archer|Berserk]+\] .+/,
        /\[SKULL\] .+/,
        /\[BOMB\] Creeper:.+/,
        /\[Boss\].+/,
        /\[Sacks\] .+ item.+/,
        /The .+ Trap hit you for .+ damage!/,
        /Healer Milestone.+/,
        /Archer Milestone.+/,
        /Mage Milestone.+/,
        /Tank Milestone.+/,
        /Berserk Milestone.+/,
        /RARE DROP!.+/,
        /Your .+ stats are doubled because you are the only player using this class!/,
        /.+ is now available!/,
        /.+ is now ready!/,
        /\w+ Milestone .+:.+ /,
        /Your CLASS stats are doubled because you are the only player using this class!/,
        /RIGHT CLICK on .+ to open it. .+/,
        /Thunderstorm is ready to use! Press DROP to activate it!/,
        /.+ unlocked .+ Essence!/,
        /.+ unlocked .+ Essence x\d+!/,
        /You do not have the key for this door!/,
        /The Stormy .+ struck you for .+ damage!/,,
        /You cannot move the silverfish in that direction!/,
        /You cannot hit the silverfish while it's moving!/,
        /.+ has obtained Blood Key!/,
        /The Flamethrower hit you for .+ damage!/,
        /.+ found a Wither Essence! Everyone gains an extra essence!/,
        /.+ is ready to use! Press DROP to activate it!/,
        /This creature is immune to this kind of magic!/,
        /Moved .+ from your Sacks to your inventory./,
        /◕ \w+ picked up your .+ Orb!/,
        /Your tether with .+ healed you for .+ health./
]

//[\[VIP\]|\[VIP+\]|\[MVP\]|\[MVP+\]|\[MVP++\]] \w

randomMessages.forEach(msg => {
    register("chat", event => {
        if (!Data.randomMessages || !Data.toggled) return
        cancel(event)
    }).setCriteria(msg)
})

dungeonSpam.forEach(msg => {
    register("chat", event => {
        if (!Data.dungeonSpam || !Data.toggled) return
        cancel(event)
    }).setCriteria(msg)
})

const toggle1 = register("chat", (aaaaaaaa,dbfdb,event) => {
    if (!Data.friendJoinMessages || !Data.toggled) return
    cancel(event)
    if (dbfdb == "joined") ChatLib.chat(`&2 >>&a ${aaaaaaaa}`)
    if (dbfdb == "left") ChatLib.chat(`&4 <<&c ${aaaaaaaa}`)
    
}).setCriteria(/Friend > (.+) (.+)\./)

const toggle2 = register("chat", (aaaaaaaa,dbfdb,event) => {
    if (!Data.friendJoinMessages || !Data.toggled) return
    cancel(event)
    if (dbfdb == "joined") ChatLib.chat(`&2 >> &a${aaaaaaaa}`)
    if (dbfdb == "left") ChatLib.chat(`&4 <<&c ${aaaaaaaa}`)
    
}).setCriteria(/Guild > (.+) (.+)\./)


const toggle3 = register("chat", (nbgweriuhbiuwerg,aaaaaaaa,bbbbbbbbbb,event) => {
    if (!Data.partyChat || !Data.toggled) return
    cancel(event)
    ChatLib.chat(`  &9> &b${aaaaaaaa}&f: ${bbbbbbbbbb}`)
}).setCriteria(/Party > (\[.+\])? ?(.+)?: (.*)/)

const toggle4 = register("chat", event => {
    if (!Data.watcherMessages) return
    cancel(event)
}).setCriteria(/\[BOSS\] The Watcher: (?!Things feel a little more roomy now, eh?|Oh.. hello?|I'm starting to get tired of seeing you around here...|You've managed to scratch and claw your way here, eh?|So you made it this far... interesting.|Ah, we meet again...|Ah, you've finally arrived.).+/)

const toggle5 = register("chat", event => {
    if (!Data.bossMessages) return
    cancel(event)
}).setCriteria(/\[BOSS\] [^The Watcher].+/)

function mainToggle(bool){ 
    if (bool){
        toggle1.register()
        toggle2.register()
        toggle3.register()
        toggle4.register()
        toggle5.register()
    } else {
        toggle1.unregister()
        toggle2.unregister()
        toggle3.unregister()
        toggle4.unregister()
        toggle5.unregister()
    }
};mainToggle(Data.toggled)

// function mainToggle(bool){ 
//     if (bool){
//     } else {
//     }
// }