import data  from "../data"
const Data = data.sheepHider

register("command", (command, distance) => { 
    switch (command) {
    case undefined: ;
    case "": 
    ChatLib.chat(`\n                            &cEngineer&bSheepHider                           
                       &7Disables sheep rendering\n`);

    new TextComponent(`                                  ${Data.toggled ? "&a" : "&c"}&nToggled ${Data.toggled ? "on" : "off"}`)
    .setHover("show_text", `/SheepHider toggle`).setClick("run_command", `/SheepHider toggle`).chat()
    ChatLib.chat(`
&3 /SheepHider&b distance &7(&bDistance&7)&b:&9 Disables sheep rendering at set distance from player
`);
        break;

    case "toggle":
        Data.toggled = !Data.toggled;
        data.save()
        mainToggle(Data.toggled)
        ChatLib.chat(` &3SheepHider &9toggled ${Data.toggled ? "&aon" : "&coff"}`)
        break;

    case "distance":
        if (distance) Data.distance = parseFloat(distance)
        data.save()
        ChatLib.chat(` &3SheepHider &9distance set to &7(&b${Data.distance}&7)`)
        break;

    default:
        ChatLib.chat(`&ccouldnt find /Speed "${command}"`)
}}).setName("SheepHider")

const toggle1 =  register("renderEntity", (entity, poss, pt, event) => {
    x = entity.getX()
    y = entity.getY()
    z = entity.getZ()
    if (parseFloat(Math.abs(x - Player.getRenderX())) < Data.distance &&
    parseFloat(Math.abs(y - Player.getRenderY())) < Data.distance &&
    parseFloat(Math.abs(z - Player.getRenderZ())) < Data.distance &&
    entity.getName() == "Sheep") {
        cancel(event)
        abilityready = false
        cooldownstart = Date.now()
        oncooldown = true
    }
})

function mainToggle(bool){
    if(bool){
        toggle1.register()
    } else {
        toggle1.unregister()
    }
};mainToggle(Data.toggled)