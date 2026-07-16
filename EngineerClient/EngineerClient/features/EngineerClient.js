




register("command", () => { 
    const main = [
        { name: `&nSplits`, command: "/eSplits", hoverText: "/eSplits" },
        { name: `&nTerms`, command: "/eTerms", hoverText: "/eTerms" },
        { name: `&nMisc`, command: "/eMisc", hoverText: "/eMisc" },
    ];
    ChatLib.chat(`                        
                    &cEngineer&bClient
                     &7Click to open`) 
    main.forEach(({ name, command, hoverText }) => {new TextComponent(`\n         &5${name}`).setHover("show_text", hoverText).setClick("run_command", command).chat();});    
}).setName("EngineerClient").setAliases("e", "en", "eng", "engineer", "engineering", "engineeringitup", "enginerclient").setTabCompletions("help", "rat")



register("command", () => { 
    const splits = [
        { name: `&nSplits`, command: "/Splits", hoverText: "/Splits" },
        { name: `&nSubSplits`, command: "/SubSplits", hoverText: "/SubSplits" },
        { name: `&nPurplePadTimer`, command: "/PurplePadTimer", hoverText: "/PurplePadTimer" },
    ];
    ChatLib.chat(`\n  &5&nSplits`)  
    splits.forEach(({ name, command, hoverText }) => {new TextComponent(`\n       &3${name}`).setHover("show_text", hoverText).setClick("run_command", command).chat();});   
}).setName("eSplits")

register("command", () => { 
    const terms = [
        { name: `&nCoreMessage`, command: "/CoreMessage", hoverText: "/CoreMessage" },
        { name: `&nEEAlert`, command: "/EEAlert", hoverText: "/EEAlert" },
        { name: `&nEEMove`, command: "/EEMove", hoverText: "/EEMove" },
        { name: `&nTermInfo`, command: "/TermInfo", hoverText: "/TermInfo" },
    ];
    ChatLib.chat(`\n  &5&nTerminals`)  
    terms.forEach(({ name, command, hoverText }) => {new TextComponent(`\n       &3${name}`).setHover("show_text", hoverText).setClick("run_command", command).chat();});   
}).setName("eTerms")

register("command", () => { 
    const misc = [
        { name: `&nChatCleaner`, command: "/ChatCleaner", hoverText: "/ChatCleaner" },
        { name: `&nMasks`, command: "/Masks", hoverText: "/masks" },
        { name: `&nSheepHider`, command: "/SheepHider", hoverText: "/SheepHider" },
    ];
    ChatLib.chat(`\n  &5&nMisc`)  
    misc.forEach(({ name, command, hoverText }) => {new TextComponent(`\n       &3${name}`).setHover("show_text", hoverText).setClick("run_command", command).chat();});  
}).setName("eMisc")

// auto superboom (cheat)
// register("chat",()=>{const boomStack=Player.getInventory().getItems().find(a=>a?.getName()=="§9Superboom TNT")
// if(!boomStack)returnChatLib.command(`gfs superboom_tnt 64`,false);const toGiveBoom=64-boomStack.getStackSize()
// if(toGiveBoom==0)return;if(toGiveBoom!=0)ChatLib.command(`gfs superboom_tnt ${toGiveBoom}`,false) }).setCriteria
// ("Starting in 2 seconds.");

register("command",()=>{const pearlStack=Player.getInventory().getItems().find(a=>a?.getName()==
    "§fEnder Pearl");if(!pearlStack) return ChatLib.command(`gfs ender_pearl 16`, false);const toGive=16- 
    pearlStack.getStackSize();if (toGive>0) ChatLib.command(`gfs ender_pearl ${toGive}`, false)}).setName("ep")

register("chat", (ign) => {
    if (ign !== Player.getName()) return
    ChatLib.command("gfs architect's first draft 1")
}).setCriteria(/PUZZLE FAIL! (\w+) .+/)

register("chat", (ign) => {
    if (ign !== Player.getName()) return
    ChatLib.command("gfs architect's first draft 1")
}).setCriteria(/^\[STATUE\] Oruo the Omniscient: (\w{1,16}) chose the wrong answer! I shall never forget this moment of misrememberance\.$/)