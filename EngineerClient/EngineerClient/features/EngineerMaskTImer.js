import data  from "../data"
const Data = data.masks
let help = false
register("command", (command, x, y, scale) => { 
    switch (command) {
    case undefined: ;
    case "": 
    const toggleName = Data.toggled ? "on" : "off";
    const toggleColor = Data.toggled ? "&a" : "&c";
    ChatLib.chat(`\n                         &cEngineer&bMaskTimer\n`);

    new TextComponent(`                            ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/Masks toggle`).setClick("run_command", `/Masks toggle`).chat()

    ChatLib.chat(`
&3 /Masks&b move &7(&bWidth&7) (&bHeight&7) &8(&7Scale&8)&b:&9 Changes position and size of mask display
&3 /Masks&b show:&9 Shows mask display
&3 /Masks&b simulate &7(&bspirit&7/&bphoenix&7/&bbonzo&7)&b:&9 Simulates mask being popped
`);
        break;

    case "toggle":
        Data.toggled = !Data.toggled;
        data.save()
        mainToggle(Data.toggled)
        ChatLib.chat(` &3Mask display &9toggled ${Data.toggled ? "&aon" : "&coff"}`);
        break;

    case "move":
        if (x) Data.x = x
        if (y) Data.y = y
        if (scale) Data.scale = scale
        ChatLib.chat(` &3Masks display &9moved to &7(&b${Data.x}&7) (&b${Data.y}&7) &8(&7${Data.scale}&8)`)
        data.save()
        break;

    case "show":
        if (guiOn) {
            overlay.unregister();
            ChatLib.chat(` &cHiding &3Mask display`);
        } else {
            overlay.register();
            ChatLib.chat(` &aShowing &3Mask display`)
        }
        guiOn = !guiOn
        data.save()
        break;


    case "simulate":
        switch (x) {
            case "spirit":
                masksTimes[0] = 30
                ChatLib.chat("Simulated spirit popping")
                break;
            case "phoenix":
                masksTimes[1] = 60
                ChatLib.chat("Simulated phoenix popping")
                break;
            case "bonzo":
                masksTimes[2] = 180
                ChatLib.chat("Simulated bonzo popping")
                break;
        
            default:
                ChatLib.chat("&4INVALID INVALID INVALID INVALID INVALID  INVALID");
        }
        
        break;

    default:
        ChatLib.chat(`&ccouldnt find /Masks "${command}"`)
}}).setName("masks")

const masksTimes = [0, 0, 0]// spirit, phoenix, bonzo


const toggle1 = register("step", () => { if (!Data.toggled) return
    masksTimes.forEach((v, i) => masksTimes[i] -= 0.1)
    const masksDisplay = [` `, ` `,` `]
    masksDisplay.forEach((v, i) => masksDisplay[i] = masksTimes[i] <= 0? "&aReady" : (masksTimes[i]).toFixed(1))
    title = `Spirit &b>&r ${masksDisplay[0]}\n&6Phoenix &b>&6 ${masksDisplay[1]}\n&cBonzo &b>&c ${masksDisplay[2]}`
}).setFps(10)


register("worldload", () => {masksTimes[2] = 0;overlay.unregister(); guiOn = false})

const toggle2 = register("chat", (message) => { if (!Data.toggled) return
    if (message == "Second Wind Activated! Your Spirit Mask saved your life!") masksTimes[0] = 30
    if (message == "Your Phoenix Pet saved you from certain death!") masksTimes[1] = 60
    if (message == "Your Bonzo's Mask saved your life!") masksTimes[2] = 180
    if (message == "Your ⚚ Bonzo's Mask saved your life!") masksTimes[2] = 180
    if (message == "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!") {overlay.register(); guiOn = true}
}).setCriteria("${message}");

let title = ` `; let guiOn = false
const overlay = register("renderOverlay", () => {
    text = new Text(title, Data.x, Data.y).setShadow(true).setScale(Data.scale)
    text.draw()
}).unregister()

function mainToggle(bool){
    if(bool){
        toggle1.register()
        toggle2.register()
        overlay.register()
    } else {
        toggle1.unregister()
        toggle2.unregister()
        overlay.register()
    }
};mainToggle(Data.toggled) 