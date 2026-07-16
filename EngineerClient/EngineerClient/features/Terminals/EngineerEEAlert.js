import data  from "../../data"
const Data = data.eeAlert

register("command", (command, x, y, scale) => { 
    switch (command) {
    case undefined: ;
    case "": 
    const toggleName = Data.toggled ? "on" : "off";
    const toggleColor = Data.toggled ? "&a" : "&c";
    ChatLib.chat(`\n                            &cEngineer&bEEAlert\n`);

    new TextComponent(`                                 ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/EEAlert toggle`).setClick("run_command", `/EEAlert toggle`).chat()

    ChatLib.chat(`
&3&l EE2 Alerts:
&3 /EEAlert&b move &7(&bWidth&7) (&bHeight&7) &8(&7Scale&8)&b:&9 Changes position EEAlert display
`);
        break;

    case "toggle":
        Data.toggled = !Data.toggled;
        data.save()
        mainToggle(Data.toggled)
        ChatLib.chat(` &3EEAlert &9toggled ${Data.toggled ? "&aon" : "&coff"}`)
        break;

    case "move":
        if (x) Data.x = x
        if (y) Data.y = y
        if (scale) Data.scale = scale
        ChatLib.chat(` &3EEAlert display &9moved to &7(&b${Data.x}&7) (&b${Data.y}&7) &8(&7${Data.scale}&8)`)
        data.save()
        overlay.register()
        setTimeout(() => {
            overlay.unregister()
        }, 2000);
        break;

    default:
        ChatLib.chat(`&ccouldnt find /EEAlert "${command}"`)
}}).setName("EEAlert")

let title = `&dPlayer At EE3`

const overlay = register("renderOverlay", () => { if (!Data.toggled) return
    text = new Text(title, Data.x, Data.y)
    .setShadow(true).setScale(Data.scale)
    text.draw()
}).unregister()