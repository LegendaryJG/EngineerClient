import data from "../../data"
const Data = data.termInfo

register("command", (command, x, y, scale) => { 
    switch (command) {
    case undefined:
    case "": 
    ChatLib.chat(`\n                            &cEngineer&bTermInfo\n`);

    new TextComponent(`                                 ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/TermInfo toggle`).setClick("run_command", `/TermInfo toggle`).chat()

    ChatLib.chat(`
&3 /TermInfo&b move &7(&bWidth&7) (&bHeight&7) &8(&7Scale&8)&b:&9 Changes position TermInfo display
&3 /TermInfo&b show:&9 Shows TermInfo display for 2s
&3 /TermInfo&b ${Data.totalTerms ? "&a" : "&c"}totalTerms:&9 show how many terms everyone did
&3 /TermInfo&b ${Data.i4 ? "&a" : "&c"}assume i4:&9 Assumes &3i4&9 is under &39s&9 and ss is over &39s&9 &8(&4Always on&8)
&3 /TermInfo&b ${Data.i2 ? "&a" : "&c"}assume i2:&9 Assumes &32nd dev&9 will be done in under &33s&9
&3 /TermInfo&b ${Data.i3 ? "&a" : "&c"}assume i3:&9 Assumes &33rd dev&9 will be done in under &33s&9
&3 /TermInfo&b ${Data.fi2 ? "&a" : "&c"}assume fi2:&9 Assumes &32nd dev&9 will be done after &38s &9and before &3ss is done
&3 /TermInfo&b ${Data.ifast ? "&a" : "&c"}assume ifast:&9 Assumes &3i2/i3&9 will be done in under &31s&9 &8(&7use if i4 has chance to 0 mask&8)
`);
        break;

    case "toggle":
        Data.toggled = !Data.toggled;
        data.save()
        mainToggle(Data.toggled)
        ChatLib.chat(` &3TermInfo &9toggled ${Data.toggled ? "&aon" : "&coff"}`)
        break;

    case "move":
        if (x) Data.x = x
        if (y) Data.y = y
        if (scale) Data.scale = scale
        data.save()
        ChatLib.chat(` &3TermInfo &9moved to &7(&b${Data.x}&7) (&b${Data.y}&7) &8(&7${Data.scale}&8)`)
        title = `&6Terms &c2&7/&c5
&6Levers &e1&7/&e2
&6Device &cx
&6Gate &a✔`
        overlay.register()
        setTimeout(() => {
            title = ` `
            overlay.unregister()
        }, 2000);
        break;

    case "show":
        overlay.register()
        toggle1.unregister()
        title = 
        `&6Terms &c2&7/&c5
&6Levers &e1&7/&e2
&6Device &cx
&6Gate &a✔`
        setTimeout(() => {
            overlay.unregister()
            title = ` `
        }, 2000);
        break;

    case "simulate":
        switch (x) {
            case "term":
                thingsDone[0]++
                if (thingsDone[0] >= 4) check()
                break;
            case "lever":
                thingsDone[1]++
                switch (thingsDone[1]) {
                    case 1:
                        termsDisplay[1] = `&e1&7/&e`
                        break;
                    case 2:
                        termsDisplay[1] = `&a2&7/&a`
                        check()
                        break;
                
                    default:
                        break;
                }
                break;
            case "dev":
                check()
                if (!intop3(3)) return
                break;
        
            default:
                break;
        }
             

    case "totalterms":
        Data.totalTerms = !Data.totalTerms;
        data.save()
        ChatLib.chat(` &3TotalTerms &9toggled ${Data.totalTerms ? "&aon" : "&coff"}`)
        break;

    case "assume":
        switch (x) {
            case "i4":
                Data.i4 = !Data.i4;
                data.save()
                ChatLib.chat(` &3Assume i4 &9toggled ${Data.i4 ? "&aon" : "&coff"}`)
                break;
            case "i2":
                Data.i2 = !Data.i2;
                data.save()
                ChatLib.chat(` &3Assume i2 &9toggled ${Data.i2 ? "&aon" : "&coff"}`)
                break;
            case "fi2":
                Data.fi2 = !Data.fi2;
                data.save()
                ChatLib.chat(` &3Assume fi2 &9toggled ${Data.fi2 ? "&aon" : "&coff"}`)
                break;
            case "i3":
                Data.i3 = !Data.i3;
                data.save()
                ChatLib.chat(` &3Assume i3 &9toggled ${Data.i3 ? "&aon" : "&coff"}`)
                break;
            case "ifast":
                Data.ifast = !Data.ifast;
                data.save()
                ChatLib.chat(` &3Assume ifast &9toggled ${Data.ifast ? "&aon" : "&coff"}`)
                break;
        
            default:
                break;
        }
        break;

    default:
        ChatLib.chat(`&ccouldnt find /TermInfo "${command}"`)
}}).setName("TermInfo")

register("command", (command) => { 
    switch (command) {
        case "s":
            toggleTriggers(true)
            newSection()
            startTime = Date.now()
            break;
        case "t":
            thingsDone[0]++
            switch (thingsDone[0]) {
                case 1:termsDisplay[0] = `&c1&7/&c`;break
                case 2:termsDisplay[0] = `&e2&7/&e`;break
                case 3:termsDisplay[0] = `&e3&7/&e`;break
                case 4: switch (termsDisplay[4]) {
                    case 4:termsDisplay[0] = `&a4&7/&a`;break
                    case 5:termsDisplay[0] = `&e4&7/&e`;break
                };break
                case 5:termsDisplay[0] = `&a5&7/&a`;break
            }
            if (thingsDone[0] >= 4) check()
            break;
        case "l":
            thingsDone[1]++
            switch (thingsDone[1]) {
                case 1:
                    termsDisplay[1] = `&e1&7/&e`;break
                case 2:
                    termsDisplay[1] = `&a2&7/&a`
                    check()
                    break;
            
                default:
                    break;
            }
            break;
        case "d":
            ChatLib.chat((intop3(3) && !intop3(9)))
            if (Data.ifast && !intop3(1.5)) return
            else if (!Data.ifast && !intop3(3)) return 
            else if (intop3(3) && !intop3(9) && !thingsDone[5]) {
                ChatLib.chat(`&3i4 &6done at &7[&a${((Date.now() - startTime) / 1000)}s&7]`)
                thingsDone[5] = true
                return
            }
            else if (Data.fi2 && thingsDone[4] == 1 && intop3(8)) return
            thingsDone[2]++
            termsDisplay[2] = `&a✔`
            check()
            break;
        case "g":
            thingsDone[3] = true
            termsDisplay[3] = `&a✔`
            check()
            break;
    
        default:
            break;
    }
}).setName("sim")



// `&a✔`; else devbleeded = `&cx`
const overlay = register("renderOverlay", () => { 
    text = new Text(title, Data.x, Data.y)
    .setShadow(true).setScale(Data.scale)
    text.draw()
}).unregister()

let title = 
`&6Terms &c2&7/&c5
&6Levers &e1&7/&e2
&6Device &cx
&6Gate &a✔`



const defaultTerms = {terms: [0, 4], levers: [0, 2], dev: false, gate: false,};

const terms = ["s1", "s2", "s3", "s4"].reduce((a, i) => {
    a[i] = { ...defaultTerms }
    if (i === "s2") a[i].terms = [0, 5]
    return a
}, {})






const termsDisplay = [` `, ` `, ` `, ` `, 4]// terms, levers, devs, gate, sectionTerms
const thingsDone = [0, 0, 0, false, 0, false] // terms, levers, devs, gate, section, i4



function newSection() {
    thingsDone[0] = 0
    thingsDone[1] = 0
    thingsDone[4]++
    // ChatLib.chat("&eSection: " + thingsDone[4])
    if (thingsDone[4] == 2 && (Data.i2 || Data.fi2)) termsDisplay[2] = `&a✔`;else termsDisplay[2] = `&cx`
    if (thingsDone[4] == 3 && Data.i3) termsDisplay[2] = `&a✔`;else termsDisplay[2] = `&cx`
    if (thingsDone[4] == 4 && thingsDone[5]) termsDisplay[2] = `&a✔`;else termsDisplay[2] = `&cx`
    thingsDone[2]--
    thingsDone[3] = false
    if (thingsDone[4] == 2) {
        termsDisplay[0] = `&c0&7/&c`
        termsDisplay[4] = 5
    }
    else {
        termsDisplay[0] = `&c0&7/&c`
        termsDisplay[4] = 4
    }
    termsDisplay[1] = `&c0&7/&c`
    termsDisplay[3] = `&cx`
}

function intop3(time) {
    if (((Date.now() - startTime) / 1000) > time) return true
    return false
}

function check() {
    if (thingsDone[1] == 2 && thingsDone[2] >= 1 && thingsDone[3]){
        if (thingsDone[4] == 2) {if (thingsDone[0] == 5) newSection()}
        else if (thingsDone[0] == 4) newSection()
    }
}



const toggle1 = register("step", () => title = 
`&6Terms ${termsDisplay[0]}${termsDisplay[4]}
&6Levers ${termsDisplay[1]}2
&6Device ${termsDisplay[2]}
&6Gate ${termsDisplay[3]}`
).setFps(30).unregister()



const toggle3 = register("chat", (name, action, object, completed, total, event) => {
    switch (object) {
        case "terminal":
            thingsDone[0]++
            switch (thingsDone[0]) {
                case 1:termsDisplay[0] = `&c1&7/&c`;break
                case 2:termsDisplay[0] = `&e2&7/&e`;break
                case 3:termsDisplay[0] = `&e3&7/&e`;break
                case 4: switch (termsDisplay[4]) {
                    case 4:termsDisplay[0] = `&a4&7/&a`;break
                    case 5:termsDisplay[0] = `&e4&7/&e`;break
                };break
                case 5:termsDisplay[0] = `&a5&7/&a`;break
            }
            if (thingsDone[0] >= 4) check()
            break;
        case "lever":
            thingsDone[1]++
            switch (thingsDone[1]) {
                case 1:
                    termsDisplay[1] = `&e1&7/&e`;break
                case 2:
                    termsDisplay[1] = `&a2&7/&a`
                    check()
                    break;
            
                default:
                    break;
            }
            break;
        case "device":
            // Data.ifast ? (!intop3(1.5)? ChatLib.chat("") : false) : (intop3(3)? ChatLib.chat("") : false)
            if (Data.ifast && !intop3(1.5)) {
                return
            } else if (!intop3(3)){
                return
            }
            thingsDone[2]++
            termsDisplay[2] = `&a✔`
            check()
            break;
    
        default:
            break;
    }
}).setCriteria(/(.+) (activated|completed) a (terminal|device|lever)! \((\d)\/(\d)\)/).unregister()


// [BOSS] Goldor: Who dares trespass into my domain?
// undonecoffee completed a device! (2/8)
// The gate has been destroyed!
// The Core entrance is opening!

const toggle4 = register("chat", () => {
    thingsDone[3] = true
    termsDisplay[3] = `&a✔`
    check()
}).setCriteria("The gate has been destroyed!").unregister()



let startTime
const toggleMain = register("chat", () => {
    if (!Data.toggled) return
    thingsDone.forEach((v, i) =>{if (i !== 3) thingsDone[i] = 0})
    thingsDone[3] = false
    toggleTriggers(true)
    newSection()
    startTime = Date.now()
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?").unregister()

const toggle2 = register("chat", () => worldLoad()).setCriteria("The Core entrance is opening!").unregister()
register("worldload", () => worldLoad())

function worldLoad(){
    toggleTriggers(false)
    thingsDone.forEach((v, i) =>{if (i < 3) thingsDone[i] = 1})
    thingsDone[3] = false
    thingsDone[4] = 0
    termsDisplay[0] = `&c0&7/&c`
    termsDisplay[1] = `&c0&7/&c`
    termsDisplay[2] = `&cx`
    termsDisplay[3] = `&cx`
    termsDisplay[4] = 4
};

function toggleTriggers(bool){
    if (bool){
        overlay.register()
        toggle1.register()
        toggle2.register()
        toggle3.register()
        toggle4.register()
    } else {
        overlay.unregister()
        toggle1.unregister()
        toggle2.unregister()
        toggle3.unregister()
        toggle4.unregister()
    }
}

function mainToggle(bool){ 
    if (bool) toggleMain.register()
    else { toggleTriggers(false)
        toggleMain.unregister()}
};mainToggle(Data.toggled)

