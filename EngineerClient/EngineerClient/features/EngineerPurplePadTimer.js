
import data  from "../data"
const Data = data.purpPad

register("command", (command, x, y, scale) => { 
    switch (command) {
    case undefined: ;
    case "": 
    ChatLib.chat(`\n                         &cEngineer&bPurplePadTimer\n`);

    new TextComponent(`                              ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/PurplePadTimer toggle`).setClick("run_command", `/purplepadtimer toggle`).chat()

    ChatLib.chat(`
&3 /PurplePadTimer&b show:&9 Shows PurplePadTimer for 2s
&3 /PurplePadTimer&b move &7(&bWidth&7) (&bHeight&7)&b &8(&7Scale&8)&b:&9 Changes position and size of PurplePadTimer
`);
        break;

        case "toggle":
            Data.toggled = !Data.toggled;
            data.save()
            mainToggle(Data.toggled)
            ChatLib.chat(` &3PurplePadTimer &9toggled ${Data.toggled ? "&aon" : "&coff"}`);
            break;

        case "show":
            title = `&d4.65`
            setTimeout(() => {
                title = ` `
            }, 2000);
            break;
    
        case "move":
            if (x) Data.x = x;
            if (y) Data.y = y;
            if (scale) Data.scale = scale
            ChatLib.chat(` &3PurplePadTimer &9moved to &7(&b${Data.x}&7) (&b${Data.y}&7) &8(&7${Data.scale}&8)`)
            data.save()
            title = `&d4.65`
            setTimeout(() => {
                title = ` `
            }, 2000);
            break;
    
    default:
        ChatLib.chat(`&cCouldnt find /PurplePadTimer "${command}"`)
}}).setName("purplepadtimer")


const overlay = register("renderOverlay", () => {
    text2 = new Text(
        title, Data.x, Data.y)
        .setAlign("CENTER").setShadow(true).setScale(Data.scale)
    text2.draw()
}).unregister()

let title = ` `

const toggle1 = register("step", () => {
    if (serverTicks < 1 || Player.getRenderY() < 158) {
        title = ` `
        toggle1.unregister()
        toggle3.unregister()
        return 
    }
    title = `&d${((serverTicks) / 20).toFixed(2)}`
}).setFps(30).unregister()


const toggle2 = register("chat", (message) => {
    toggle1.register()
    toggle3.register()
    serverTicks = 96
}).setCriteria(/\[BOSS\] Storm: (ENERGY HEED MY CALL|THUNDER LET ME BE YOUR CATALYST)!/);

/// TICKS ///

const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");
let serverTicks

const toggle3 = register("packetReceived", (packet) => {
    if (packet.func_148890_d() <= 0 && serverTicks > 0) serverTicks--
}).setFilteredClass(S32PacketConfirmTransaction)



function mainToggle(bool){
    if(bool){
        overlay.register()
        toggle2.register()
    } else {
        overlay.unregister()
        toggle2.unregister()
    }
};mainToggle(Data.toggled)
