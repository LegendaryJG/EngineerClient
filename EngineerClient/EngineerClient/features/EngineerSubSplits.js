
import data  from "../data"
const Data = data.subSplits

let debug = false

register("command", (command, x, y) => { 
    switch (command) {
    case undefined: ;
    case "": 
    ChatLib.chat(`\n                         &cEngineer&bSubSplits\n`);

    new TextComponent(`                              ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/Splits toggle`).setClick("run_command", `/subsplits toggle`).chat()

    ChatLib.chat(`
&3 /SubSplits&b worldload:&9 Hides splits on worldload
&3 /SubSplits&b show:&9 Shows SubSplits for 2s
&3 /SubSplits&b move &7(&bWidth&7) (&bHeight&7)&b:&9 Changes position of SubSplits
&3 /SubSplits&b start:&9 Starts SubSplits
&3 /SubSplits&b next:&9 Starts the next SubSplit
`);
        break;

        case "toggle":
            Data.toggled = !Data.toggled;
            data.save()
            mainToggle(Data.toggled)
            ChatLib.chat(` &3SubSplits &9toggled ${Data.toggled ? "&aon" : "&coff"}`);
            break;

        case "worldload":
            Data.onWorldLoad = !Data.onWorldLoad;
            data.save()
            ChatLib.chat(` &3SubSplits &9WorldLoad ${Data.onWorldLoad ? "&aon" : "&coff"}`);
            break;
    
        case "show":
            const time = x ? (x*1000) : null;
            updateTestTitle(time)
            break;
    
        case "move":
            if (x) Data.x = x;
            if (y) Data.y = y;
            ChatLib.chat(` &3SubSplits &9moved to &7(&b${Data.x}&7) (&b${Data.y}&7)`)
            data.save()
            updateTestTitle()
            break;
    
        case "start":
            resetSplits();
            newSubSplit()
            break;
    
        case "next":
            if (subSplit > 25) return;
            newSubSplit();
            break;

    default:
        ChatLib.chat(`&cCouldnt find /SubSplits "${command}"`)
}}).setName("subsplits")

register("worldLoad", () => {
    subSubSplits.forEach((name, i) =>{subSubSplits[i] = 0})
    subSplit = 0
    termsOver = false
    gate[0] = false
    gate[1] = false
    playersInCore = 0
    alivePlayers = 0
    ignsInCore = ''
    aliveIgns = ''
    serverTicks = 0
    Playersincoremessage = 'Time Into Core'
    delaybetweenscanandstart = 0.050
    accountfortpsdifference = false
    if (Data.onWorldLoad) {
        resetSplits()
        title = ` `
    }
})

const overlay = register("renderOverlay", () => {
    text1 = new Text(
        title, Data.x, Data.y)
        .setShadow(true).setScale(1)
    text1.draw()
})

let title = ` `



const Splits = {};
    ["S1", "S2", "S3", "S4", "Leaps", "Kill"]
    .forEach((name, i) => {Splits[i + 1] = {name, color: 
    ['&6', '&6', '&6', '&6', '&5', '&c'][i],
    display: ` `, serverStart: null, serverEnd: null, clientStart: null, clientEnd: null};
});
let subSplit = 0

const updateSplits = register("step", () => {
    if (subSplit > 6 || subSplit == 0) return
    termsDisplay = subSplit > 0 ? `&6&lTerminals` : ` `;
    goldorDisplay = subSplit > 4 ? `&e&lGoldor` : ` `;

    const p = Splits[subSplit]
    const clientTime = Math.abs((p.clientStart - Date.now()) / 1000).toFixed(2);
    const serverTime = (serverTicks / 20).toFixed(2);
    p.display = `${p.color}${p.name} &b> ${p.color}${clientTime}s &8(&7${serverTime}s&8)`;
    
    title = 
`${termsDisplay}
${Splits[1].display}
${Splits[2].display}
${Splits[3].display}
${Splits[4].display}

${goldorDisplay}
${Splits[5].display}
${Splits[6].display}
`}).setFps(100)

function updateTestTitle(time){
    const t = time ? time : 2000;
    updateSplits.unregister();
    title = [`&6&lTerms
&6S1 &b>&6 12.56s &8(&710.55s&8)
&6S2 &b>&6 6.33s &8(&76.30s&8)
&6S3 &b>&6 5.82s &8(&75.60s&8)
&6S4 &b>&6 5.28s &8(&75.28s&8)

&e&lGoldor
&5Leaps &b>&5 1.24s &8(&71.20s&8)
&cKill &b>&c 5.66s &8(&75.50s&8)`]
    setTimeout(() => {
        title = " ";
        updateSplits.register();
    }, t);
};

function resetSplits() {
    subSplit = 0
    playersInCore = 0
    alivePlayers = 0
    ignsInCore = ''
    aliveIgns = ''
    Object.keys(Splits).forEach((key) => {
        Splits[key] = { 
        name: Splits[key].name, 
        color: Splits[key].color, 
        display: ` `, 
        serverStart: null, 
        serverEnd: null, 
        clientStart: null, 
        clientEnd: null 
        };
    });
}

function newSubSplit(){
    resetTicks()
    if (subSplit > 6) resetSplits()
    if (subSplit > 0){
        ChatLib.chat(Splits[subSplit].display)
        Splits[subSplit].clientEnd = Date.now();
        Splits[subSplit].serverEnd = serverTicks;
    }
    subSplit++
    if (subSplit > 6) return
    Splits[subSplit].clientStart = Date.now();
}

function setSubSplit(i){
    resetTicks()
    if (i > 0){
        Splits[i].clientEnd = Date.now();
        Splits[i].serverEnd = serverTicks;
        // ChatLib.chat(Splits[i].display) // coffee this creates an empty line when storm starts in your chat, idk what its supposed to do
    }
    subSplit = i
    if (i > 6) return
    Splits[i].clientStart = Date.now();
}

function scanWhoseInRenderAndAlive() {
    World.getAllPlayers().forEach(entity => {
        if (entity.isInvisible() || entity.getPing() !== 1) return
        if (aliveIgns.includes(entity.getName())) return
        aliveIgns = aliveIgns + ' ' + entity.getName()
        alivePlayers++
        if (debug) console.log(entity.getName() + ' is alive, there are now ' + alivePlayers + ' alive players')
    })
}

// X 

const subSubSplits = [0, 0, 0, 0]// maxor, storm, terms, necron

const toggle2 = register("chat", (message) => {
    switch (message) {

        /// MAXOR ///

        case "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!":
            toggle5.register()
            break;

        /// GOLDOR /// 

        case "[BOSS] Goldor: Who dares trespass into my domain?":
            setSubSplit(1)
            break;

        /// NECRON ///

        case "[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.":
            if (subSplit == 5) ChatLib.chat(aliveIgns + " are alive and " + ignsInCore + " are in core")
            leapinFrogs.unregister()
            newSubSplit()
            break;
        case "[BOSS] Necron: You went further than any human before, congratulations.":
            if (subSplit == 5) ChatLib.chat(aliveIgns + " are alive and " + ignsInCore + " are in core")
            leapinFrogs.unregister()
            newSubSplit()
            break;

        default:
            break;
    }
}).setCriteria("${message}");

let alivePlayers = 0
let playersInCore = 0
let ignsInCore = ''
let aliveIgns = ''
let termsOver = false

register("chat", (ign) => {
    if (ign == 'You') ign = Player.getName()
    if (!aliveIgns.includes(ign)) return
    alivePlayers--
    aliveIgns = aliveIgns.replace(new RegExp(`\\s*${ign}\\s*`), ' ').trim()
    if (debug) ChatLib.chat(alivePlayers + ' alive players')
    if (ignsInCore.includes(ign)) {
        playersInCore--
        ignsInCore = ignsInCore.replace(new RegExp(`\\s*${ign}\\s*`), ' ').trim()
        if (debug) console.log(alivePlayers + ' alive players after ' + ign + ' died in core')
    } else {
        if (debug) console.log(alivePlayers + ' alive players after ' + ign + ' died')
    }
}).setCriteria(/ ☠ (\w+) .+ and became a ghost./)

register("chat", (ign) => {
    if (ign == 'You') ign = Player.getName()
    if (aliveIgns.includes(ign)) return
    alivePlayers++
    aliveIgns = aliveIgns + ' ' + ign
    if (debug) ChatLib.chat(alivePlayers + ' alive players')
    if (debug) console.log(alivePlayers + ' alive players after ' + ign + ' revived')
}).setCriteria(/ ❣ (\w+) was revived by .+/)

const gate = [false, false]// blown, waiting

register("chat", (action, object, completed, total) => {
    if (completed !== total) return
    if (subSplit == 4) {
        accountfortpsdifference = true
        p3DoneTime = Date.now()
        termsOver = true
        newSubSplit()
        if (debug) ChatLib.chat(alivePlayers + ' alive players')
    } if (subSplit == 3) {
        leapinFrogs.register()
    }
    if (gate[0] == false) {
        gate[1] = true
    } else {
        newSubSplit()
        gate[0] = false
        gate[1] = false
    }
}).setCriteria(/.+ (activated|completed) a (terminal|device|lever)! \((\d)\/(\d)\)/)

register("chat", () => {
    if (gate[1] == false) {
        gate[0] = true
    } else {
        newSubSplit()
        gate[0] = false
        gate[1] = false
    }
}).setCriteria("The gate has been destroyed!")

/// TICKS ///

const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");

const toggle1 = register("packetReceived", (packet) => {
    if (packet.func_148890_d() <= 0) serverTicks++
} ).setFilteredClass(S32PacketConfirmTransaction)

const toggle5 = register("packetReceived", () => {
    enterBossTicks++
    if (enterBossTicks !== 10) return
    toggle5.unregister()
    enterBossTicks = 0
    scanWhoseInRenderAndAlive()
    ChatLib.chat("&bBELL LMK IF YOU SEE THIS!")
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

let serverTicks
let enterBossTicks
let Playersincoremessage = 'Time Into Core'
let p3DoneTime
let delaybetweenscanandstart = 0.050
let accountfortpsdifference = false

function resetTicks(){
    serverTicks = 0
}

const checkTicks = register("packetReceived", () => {
    if (serverTicks == 166 && subSubSplits[1] == 0) {
        newSubSplit()
        checkTicks.unregister()
    }
    if (serverTicks == 688 && subSubSplits[2] == 0) {
        newSubSplit()
        checkTicks.unregister()
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

const leapinFrogs = register("packetReceived", () => {
    if (accountfortpsdifference) {
        accountfortpsdifference = false
        delaybetweenscanandstart = parseFloat((((Date.now() - p3DoneTime) / 1000).toFixed(3)) + 0.001)
    }
    World.getAllPlayers().forEach(entity => {
        if (entity.isInvisible() || entity.getPing() !== 1) return
        if (!ignsInCore.includes(entity.getName()) && ((entity.getX()) < 71) && ((entity.getX()) >= 39) && ((entity.getY()) < 155.5) && ((entity.getY()) >= 112) && ((entity.getZ()) < 118) && ((entity.getZ()) >= 54)) {
            playersInCore++
            ignsInCore = ignsInCore + ' ' + entity.getName()
            if (termsOver) Playersincoremessage += ' | ' + (entity.getName()) + ' took ' + (((Date.now() - p3DoneTime) / 1000) - delaybetweenscanandstart).toFixed(3) + 's'
            if (debug) console.log(alivePlayers + ' alive players, ' + playersInCore + ' players in core, ' + ignsInCore)
            if (playersInCore == alivePlayers && termsOver) {
                leapinFrogs.unregister()
                ChatLib.command('party chat ' + (Playersincoremessage))
                if (debug) console.log('detected that playersInCore = alivePlayers, ended leap split')
                newSubSplit()
            }
        } if (termsOver) return
        if (!ignsInCore.includes(entity.getName())) return
        if (((entity.getX()) >= 71) || ((entity.getX()) < 39) || ((entity.getY()) >= 155.5) || ((entity.getY()) < 112) || ((entity.getZ()) >= 118) || ((entity.getZ()) < 54)) {
            playersInCore--
            ignsInCore = ignsInCore.replace(new RegExp(`\\s*${entity.getName()}\\s*`), ' ').trim()
            if (debug) console.log(alivePlayers + ' alive players, ' + playersInCore + ' players in core, ' + ignsInCore)
        }
    })
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

function mainToggle(bool){
    if(bool){
        overlay.register()
        updateSplits.register()
        toggle1.register()
        toggle2.register()
    } else {
        overlay.unregister()
        updateSplits.register()
        toggle1.unregister()
        toggle2.unregister()
    }
};mainToggle(Data.toggled)

// MAXOR
/* Intro Dialogue
[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!
[BOSS] Maxor: I'VE BEEN TOLD I COULD HAVE A BIT OF FUN WITH YOU.
[BOSS] Maxor: DON'T DISAPPOINT ME, I HAVEN'T HAD A GOOD FIGHT IN A WHILE.
*/

/* Stunned by laser
[BOSS] Maxor: YOU TRICKED ME!
[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!
*/

/* Enraged
⚠ Maxor is enraged! ⚠
*/

/* Maxor used a special attack
[BOSS] Maxor: Eat Wither Skulls, scum!
[BOSS] Maxor: How about you taste some rapid fire Wither Skulls!
[BOSS] Maxor: Time for me to blast you away for good!
*/

/* Maxor killed
[BOSS] Maxor: I'M TOO YOUNG TO DIE AGAIN!
[BOSS] Maxor: I'LL MAKE YOU REMEMBER MY DEATH!!
*/



/* Run failed
[BOSS] Maxor: FINALLY! This took way too long.
[BOSS] Maxor: Now that you're a Ghost, can you help me clean up?
*/

/* "Random Messages"
[BOSS] Maxor: YOUR WEAPONS CAN'T PIERCE THROUGH MY SHIELD!
[BOSS] Maxor: I HOPE YOU LIKE EXPLOSIONS TOO!
[BOSS] Maxor: MY MINIONS WILL HAVE TO WIPE THE FLOOR AFTER I'M DONE WITH YOU ALL!
[BOSS] Maxor: YOUR MOBILITY TRICKS DON'T WORK IN MY DOMAIN!
*/





// STORM
/* Intro Dialogue
[BOSS] Storm: Pathetic Maxor, just like expected.
[BOSS] Storm: Don't boast about beating this simple minded Wither.
[BOSS] Storm: My abilities are unparalleled, in many ways I am the last bastion.
[BOSS] Storm: The memory of your death will be your fondest, focus up!
[BOSS] Storm: The power of lightning is quite phenomenal. A single strike can vapourise a person whole.
[BOSS] Storm: I'd be happy to show you what that's like!
*/

/* Lightning
[BOSS] Storm: ENERGY HEED MY CALL!
[BOSS] Storm: THUNDER LET ME BE YOUR CATALYST!
*/

/* Storm crushed
[BOSS] Storm: Ouch, that hurt!
[BOSS] Storm: Oof
*/

/* Ability to damage over
[BOSS] Storm: THAT WAS ONLY IN MY WAY!
[BOSS] Storm: Slowing me down will be your greatest accomplishment!
[BOSS] Storm: This factory is too small for me!
*/

/* Storm killed
[BOSS] Storm: I should have known that I stood no chance.
[BOSS] Storm: At least my son died by your hands.
*/



/* Someone died to lightning
[BOSS] Storm: Fool, I'd hide under something next time if I were you!
[BOSS] Storm: Foolish, a broken pillar won't provide you any cover!
*/

/* Storm locked
[BOSS] Storm: Bahahaha! Not a single intact pillar remains!
[BOSS] Storm: Rejoice, your last moments are with me and my lightning.
*/

/* Run failed
[BOSS] Storm: FINALLY! This took way too long.
[BOSS] Storm: Now that you're a Ghost, can you help me clean up?
*/

/* "Random Messages"
[BOSS] Storm: The Age of Men is over, we are creating tens, hundreds of withers!!
[BOSS] Storm: Not just your land, but every kingdom will soon be ruled by our army of undead!
[BOSS] Storm: No more adventurers, no more heroes, death and thunder!
[BOSS] Storm: The days are numbered until I am finally unleashed again on the world!
*/