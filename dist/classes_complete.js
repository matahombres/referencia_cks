function with_inherited(prop, node_key, exclude = []) {
    let ret = {};
    const node = CLASSES_DETAILS[node_key];
    if (node) {
        const myCommands = Object.fromEntries(Object.entries(node[prop])
            .filter(([k]) => !exclude.includes(k)));
        const myCommandsKeys = Object.keys(myCommands);
        if (myCommandsKeys.length > 0) {
            ret[node_key] = myCommands;
        }
        if (node.parent) {
            ret = {...ret, ...with_inherited(prop, node.parent, exclude.concat(myCommandsKeys))};
        }
    }
    return ret;
}

function route(className) {
    let node = CLASSES_DETAILS[className];
    let route = [];
    while (node.parent) {
        route.push(node.parent);
        node = CLASSES_DETAILS[node.parent];
    }
    return route.reverse();
}

const defaultCmds = with_inherited.bind(null, 'def_cmds');
const commands = with_inherited.bind(null, 'commands');
const properties = with_inherited.bind(null, 'properties');

const CLASSES_DETAILS =
    {
        "EGate5": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "StaminaBoost": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "CGule": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MWallsS": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "MTavern": {
            "properties": {
                "race": "ImperialRome",
                "display_name": "Tavern",
                "icon": "gameres/icons/RTavern.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Tavern SW",
                "help": "/contents/buildings/RTavern"
            }, "commands": {"buyfoodforgold": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "RVelit": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "200",
                "damage": "18",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "60",
                "unit_specials": "Offensive tactics, Learning",
                "projectile_class": "Javelin",
                "building_projectile_class": "Javelin",
                "icon": "gameres/icons/RVelit.bmp",
                "display_name": "Velit",
                "display_name_plural": "Velites",
                "help": "contents/units/RVelit",
                "edittree_pos": "Units/Roman/Velit"
            }, "commands": {}, "def_cmds": {}, "parent": "ShortRanged"
        },
        "TOutpost": {
            "properties": {
                "race": "German",
                "maxhealth": "10000",
                "icon": "gameres/icons/TOutpost.bmp",
                "display_name": "Trade post",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Trade post (German)",
                "help": "/contents/buildings/TOutpost",
                "description": "Sells the food stored in the outpost to acquire gold",
                "range": "1000",
                "settlement_food": "0",
                "settlement_gold": "1000",
                "defender_cls_1": "TValkyrie",
                "defenders_max_1": "10",
                "defenders_out_1": "10",
                "start_level_1": "8",
                "end_level_1": "24"
            }, "commands": {"goutpost_sellfood": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Outpost"
        },
        "RTavern": {
            "properties": {
                "race": "RepublicanRome",
                "display_name": "Tavern",
                "icon": "gameres/icons/RTavern.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Tavern SW",
                "help": "/contents/buildings/RTavern"
            }, "commands": {"buyfoodforgold": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "Ceasefire2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Crack 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Cracks/Crack 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ShipL": {
            "properties": {
                "icon": "gameres/icons/Ship.bmp",
                "display_name": "Ship",
                "display_name_plural": "Ships",
                "help": "/contents/units/Ship",
                "edittree_pos": "Units/Others/Ship"
            }, "commands": {}, "def_cmds": {}, "parent": "ShipBattle"
        },
        "Horse": {
            "properties": {
                "maxhealth": "300",
                "formation_priority": "2000",
                "formation_radius": "35",
                "radius": "30",
                "selection_radius": "32",
                "speed": "160"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Rock Medium 04": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 4"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BVikingLord": {
            "properties": {
                "race": "Britain",
                "maxhealth": "1200",
                "damage": "120",
                "armor_slash": "6",
                "armor_pierce": "6",
                "speed": "80",
                "unit_specials": "Life steal, Ferocity, Freedom",
                "icon": "gameres/icons/BVikingLord.bmp",
                "display_name": "Viking Lord",
                "display_name_plural": "Viking Lords",
                "help": "contents/units/BVikingLord",
                "edittree_pos": "Units/Britain/Viking Lord"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "CWallsS": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TWallsNE": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "GHero3b": {
            "properties": {
                "display_name": "Brand",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "EHero1a": {
            "properties": {
                "display_name": "Payneferher",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "BHero1a": {
            "properties": {
                "display_name": "Thrydwulf",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "MGate0": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "SummoningObj": {
            "properties": {"stamina_dec_time": "1000"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GWallsS": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "STAT03": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Statue"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GShipyard2": {
            "properties": {
                "race": "Gaul",
                "radius": "400",
                "selection_radius": "420",
                "importsettlement": "Shipyard 2",
                "edittree_pos": "Structures/Shipyards/Wooden SE",
                "exit_vector_x": "120",
                "exit_vector_y": "100",
                "build_ship_variation": "3"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "WallRuined": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Wall (Ruined)"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BaseAnimal": {
            "properties": {
                "feeds": "0",
                "max_food": "0",
                "repair_rate": "0",
                "damaged_by_ghost": "0",
                "damage": "0",
                "can_be_invisible": "0",
                "always_visible_on_minimap": "1",
                "unit_specials": "Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Unit"
        },
        "EPriest": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "300",
                "armor_slash": "2",
                "armor_pierce": "2",
                "speed": "50",
                "unit_specials": "Cripple",
                "icon": "gameres/icons/EPriest.bmp",
                "display_name": "Priest",
                "display_name_plural": "Priests",
                "help": "contents/units/EPriest",
                "edittree_pos": "Units/Egypt/Priest"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "learn": [["Obj", "This"], ["Obj", "target"]],
                "cripple": [["Obj", "This"], ["Obj", "target"]],
                "zombify": [["Obj", "This"]],
                "mist": [["Obj", "This"], ["point", "pt"]]
            },
            "def_cmds": {
                "Military": [{"cmd": "cripple", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "CGateSW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Ritual Stone 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Sacred/Ritual Stone 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TWVillager": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWVillager.bmp",
                "edittree_pos": "Units/Germany/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "EHorusWarrior": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "320",
                "damage": "36",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "80",
                "unit_specials": "Bleeding attack",
                "icon": "gameres/icons/EHorusWarrior.bmp",
                "display_name": "Horus Warrior",
                "display_name_plural": "Horus Warriors",
                "help": "contents/units/EHorusWarrior",
                "edittree_pos": "Units/Egypt/Horus Warrior"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "TTownhall": {
            "properties": {
                "race": "Germany",
                "foodperpop": "45",
                "icon": "gameres/icons/TTownhall.bmp",
                "display_name": "German Townhall",
                "radius": "160",
                "selection_radius": "190",
                "auto_repair": "no",
                "help": "/contents/buildings/ITownhall",
                "edittree_pos": "Structures/Stronghold (Germany)/Townhall",
                "produces_gold": "1",
                "produces_food": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "ITempleAnim": {"properties": {}, "commands": {"idle": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Object"},
        "DSkeleton2": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Skeleton 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BBlacksmithFire": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "Unit": {
            "properties": {
                "maxhealth": "200",
                "maxstamina": "10",
                "sight": "500",
                "speed": "50",
                "water_unit": "0",
                "repair_rate": "15",
                "damage_type": "slash",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "inventory_size": "4",
                "does_not_regenerate": "0",
                "healthbar_type": "1",
                "max_food": "20",
                "feeds": "1",
                "damaged_by_ghost": "1",
                "can_be_invisible": "1",
                "interface": "thumb,unit,items",
                "ignore_passability": "0",
                "formation_radius": "26",
                "radius": "15",
                "selection_radius": "15",
                "icon": "gameres/icons/multi.bmp",
                "display_name": "Unit",
                "display_name_plural": "Units",
                "help": "/contents/units"
            }, "commands": {
                "idle": [["Obj", "me"]],
                "standstill": [["Obj", "me"]],
                "advance": [["Obj", "me"], ["point", "pt"]],
                "advancealone": [["Obj", "me"], ["point", "pt"]],
                "attach": [["Obj", "me"], ["Obj", "h"]],
                "attack": [["Obj", "me"], ["point", "pt"]],
                "engage": [["Obj", "me"]],
                "enter": [["Obj", "This"], ["Obj", "bld"]],
                "enteralone": [["Obj", "This"], ["Obj", "bld"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "smartmove": [["Obj", "This"], ["point", "pt"]],
                "form_move": [["Obj", "This"]],
                "patrol": [["Obj", "This"], ["point", "pt"]],
                "protect": [["Obj", "me"], ["Obj", "master_obj"]],
                "follow": [["Obj", "This"], ["Obj", "other"]],
                "approach": [["Obj", "This"], ["Obj", "other"]],
                "approach_hero": [["Obj", "This"], ["Obj", "other"]],
                "giveitem": [["Obj", "me"], ["Item", "item"], ["Obj", "h"]],
                "putitem": [["Obj", "me"], ["Item", "item"], ["Obj", "h"]],
                "dropitem": [["Obj", "me"], ["Item", "item"], ["point", "pt"]],
                "getitems": [["Obj", "This"], ["Obj", "other"]],
                "getitem": [["Obj", "me"], ["Item", "item"], ["Obj", "h"]],
                "stay_hidden": [["Obj", "This"], ["Obj", "target"]],
                "build_catapult": [["Obj", "This"], ["Obj", "bld"]],
                "hold_position": [["Obj", "me"]],
                "selfdestroy": [["Obj", "this"]],
                "wander": [["Obj", "me"], ["point", "pt"]],
                "explore": [["Obj", "This"], ["point", "pt"]],
                "teleport": [["Obj", "This"], ["Obj", "bld"]],
                "advanceenter": [["Obj", "This"], ["Obj", "bld"]],
                "face": [["Obj", "This"], ["point", "pt"]],
                "ai_attack_gate": [["Obj", "u"], ["Obj", "g"]],
                "ai_killall": [["Obj", "u"]],
                "boardship": [["Obj", "This"], ["Obj", "obj"]],
                "boardshipcommon": [["Obj", "This"], ["Obj", "Other"]],
                "capture": [["Obj", "me"], ["Obj", "u"]],
                "attack_independent": [["Obj", "me"], ["Obj", "u"]],
                "transport": [["Obj", "This"], ["Obj", "other"]],
                "disappear": [["Obj", "This"]],
                "dismiss": [["Obj", "This"]],
                "grab_water": [["Obj", "This"]],
                "grab_goods": [["Obj", "This"]],
                "grab_free": [["Obj", "This"]],
                "talk": [["Obj", "obj"], ["Obj", "other"]],
                "walkanddie": [["Obj", "This"], ["point", "pt"]],
                "moveenter": [["Obj", "This"], ["point", "pt"]],
                "stand_position": [["Obj", "me"]],
                "attack_unit_type": [["Obj", "me"], ["Obj", "target"]],
                "engage_unit_type": [["Obj", "me"], ["Obj", "tgt"]],
                "engage_unit_type_exclusive": [["Obj", "me"], ["Obj", "tgt"]],
                "go_talk": [["Obj", "This"], ["Obj", "other"]],
                "boar_tooth_use": [["Obj", "This"], ["Obj", "target"]],
                "onkill": [["Obj", "this"], ["Obj", "Victim"]],
                "onenter": [["Obj", "this"], ["Settlement", "sett"]],
                "convert": [["Obj", "This"]],
                "enter_parry_mode": [["Obj", "me"]],
                "leave_parry_mode": [["Obj", "me"]],
                "hero_set_final_party_orientation": [["Obj", "This"], ["point", "pt"]]
            }, "def_cmds": {
                "": [{"cmd": "move", "ctrl": false}, {"cmd": "advance", "ctrl": true}],
                "Inn": [{"cmd": "transport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Wagon": [{"cmd": "capture", "ctrl": false}],
                "Unit": [{"cmd": "attack", "ctrl": false}, {"cmd": "stay_hidden", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }, {"cmd": "attack_unit_type", "ctrl": true}],
                "Hero": [{"cmd": "attach", "ctrl": false}, {"cmd": "attack", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Tower": [{"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Gate": [{"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Wall": [{"cmd": "attack", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "TTent": [{"cmd": "attack_independent", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Building": [{"cmd": "attack_independent", "ctrl": false}, {
                    "cmd": "capture",
                    "ctrl": false
                }, {"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Teleport": [{"cmd": "teleport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "ItemHolder": [{"cmd": "getitems", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            }, "parent": "Object"
        },
        "MGate6": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RGateN": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IGateNE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BBowman": {
            "properties": {
                "race": "Britain",
                "maxhealth": "180",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Triple strike",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/BBowman.bmp",
                "display_name": "Bowman",
                "display_name_plural": "Bowmen",
                "help": "contents/units/BBowman",
                "edittree_pos": "Units/Britain/Bowman"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "CCatapult": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/cbalista.bmp",
                "shot_tan": "600",
                "shot_height": "100",
                "projectile_class": "CGule",
                "projectile_shadow": "CGule_shadow",
                "projectile_fire": "Gule_fire",
                "projectile_explosion": "CGule_explosion"
            },
            "commands": {"attack_ground": [["Obj", "me"], ["point", "pt"]]},
            "def_cmds": {"": [{"cmd": "attack_ground", "ctrl": false}, {"cmd": "attack_ground", "ctrl": true}]},
            "parent": "Catapult"
        },
        "MHero2": {
            "properties": {
                "display_name": "Damasus",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero2.bmp",
                "edittree_pos": "Units/Roman/Hero (Imperial) 2"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "ship_wreck": {
            "properties": {"edittree_pos": "Structures/Water/Ship wreck (large)", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "EHero2b": {
            "properties": {
                "display_name": "Ishpi",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "EHouse3": {
            "properties": {
                "race": "Egypt",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/ehouse.bmp",
                "edittree_pos": "Structures/Village (Egypt)/House 3",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Sed2": {
            "properties": {
                "health": "100",
                "maxhealth": "100",
                "edittree_pos": "Structures/Others/Sacred/Statue 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RGateSW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IWallsSW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "COLUMNS2": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Columns2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RibCage": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Rib cage",
                "icon": "gameres/icons/Rib cage.bmp",
                "radius": "28",
                "selection_radius": "30",
                "display_name": "Rib cage"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "MHero3": {
            "properties": {
                "display_name": "Sabucius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero3.bmp",
                "edittree_pos": "Units/Roman/Hero (Imperial) 3"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "MWallsN": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CVillage": {
            "properties": {
                "race": "Carthage",
                "radius": "230",
                "selection_radius": "250",
                "icon": "gameres/icons/CStorage.bmp",
                "edittree_pos": "Structures/Village (Carthage)/Village hall",
                "foodperpop": "100",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "DRuins3": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BWallsNE": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "ISentry": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "180",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/IArcher.bmp",
                "unit_specials": "Drain, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "RUIN04": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Ruin04"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IGule_shadow": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "EHero2": {
            "properties": {
                "display_name": "Nebnufer",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero2.bmp",
                "edittree_pos": "Units/Egypt/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "MGate7": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RHastatus": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "200",
                "damage": "16",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "60",
                "unit_specials": "Deflection",
                "icon": "gameres/icons/RHastatus.bmp",
                "display_name": "Hastatus",
                "display_name_plural": "Hastati",
                "help": "contents/units/RHastatus",
                "edittree_pos": "Units/Roman/Hastatus"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "RUIN02": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Ruin 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CWallsSW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CampWeaponRack2": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Weapon rack 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "DRuins8": {
            "properties": {
                "radius": "30",
                "selection_radius": "30",
                "edittree_pos": "Structures/Others/Desert/Ruins 8"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CHero1b": {
            "properties": {
                "display_name": "Himilco",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "Ritual Stone 03": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Sacred/Ritual Stone 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GShipyard1": {
            "properties": {
                "race": "Gaul",
                "radius": "410",
                "selection_radius": "430",
                "edittree_pos": "Structures/Shipyards/Wooden SW",
                "importsettlement": "Shipyard 1",
                "build_ship_variation": "0",
                "exit_vector_x": "-120",
                "exit_vector_y": "100"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "IGateNW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Ruin_Door02": {
            "properties": {
                "health": "100",
                "maxhealth": "100",
                "edittree_pos": "Structures/Others/Ruins/Ruin Door 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "plet": {
            "properties": {"radius": "0", "selection_radius": "0"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CHero3": {
            "properties": {
                "display_name": "Carthalo",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero3.bmp",
                "edittree_pos": "Units/Carthage/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "EHero3b": {
            "properties": {
                "display_name": "Sepi",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "CGule_shadow": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Stonehenge2": {
            "properties": {
                "edittree_pos": "Structures/Interactive/Stonehenge 2",
                "icon": "gameres/icons/Stonehenge.bmp",
                "radius": "250",
                "selection_radius": "255"
            }, "commands": {}, "def_cmds": {}, "parent": "Stonehenge"
        },
        "Frenzy2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "SPHINXBIG1": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Big 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ITownhall": {
            "properties": {
                "race": "Iberia",
                "foodperpop": "45",
                "icon": "gameres/icons/Itownhall.bmp",
                "display_name": "Iberian Townhall",
                "radius": "160",
                "selection_radius": "165",
                "auto_repair": "no",
                "help": "/contents/buildings/ITownhall",
                "edittree_pos": "Structures/Stronghold (Iberia)/Townhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "GHero2": {
            "properties": {
                "display_name": "Ogox",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero2.bmp",
                "edittree_pos": "Units/Gaul/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "TWallsSE": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TBlacksmithFire": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "CHero3c": {
            "properties": {
                "display_name": "Barka",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "Larax": {
            "properties": {
                "race": "Gaul",
                "sight": "500",
                "display_name": "Larax",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/Larax.bmp",
                "edittree_pos": "Units/Heroes/Larax (Gaul)",
                "HeroSkills": "Leadership, Epic attack, Epic endurance, Defensive cry, Battle cry"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "IGateSW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IHero1": {
            "properties": {
                "display_name": "Tantamo",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero1.bmp",
                "edittree_pos": "Units/Iberia/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "Disease2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "IPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/IPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IHero4": {
            "properties": {
                "race": "Iberia",
                "display_name": "Unknown",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero4.bmp",
                "edittree_pos": "Units/Heroes/Unknown (Iberian)",
                "HeroSkills": "Healing, Ceasefire, Team defense, Epic endurance, Euphoria"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "DestLock": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "RTribune": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "600",
                "damage": "40",
                "armor_slash": "14",
                "armor_pierce": "14",
                "speed": "60",
                "unit_specials": "Penetration, Parry",
                "formation_priority": "1000",
                "formation_radius": "26",
                "display_name": "Tribune",
                "display_name_plural": "Tribunes",
                "icon": "gameres/icons/RTribune.bmp",
                "help": "contents/units/RTribune",
                "edittree_pos": "Units/Roman/Tribune"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "GGateN": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RWVillager": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWoman.bmp",
                "edittree_pos": "Units/Roman/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "AdvArea": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Area"},
        "CGateNE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RBarracks": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RBarracks.bmp",
                "display_name": "Barracks",
                "radius": "245",
                "selection_radius": "250",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Barracks",
                "auto_repair": "no",
                "help": "/contents/buildings/RBarracks"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "CHouse02": {
            "properties": {
                "race": "Carthage",
                "radius": "178",
                "selection_radius": "180",
                "icon": "gameres/icons/chouse.bmp",
                "edittree_pos": "Structures/Village (Carthage)/House 2",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Object": {
            "properties": {
                "race": "None",
                "maxhealth": "100",
                "maxstamina": "0",
                "damage": "0",
                "armor_slash": "0",
                "armor_pierce": "0",
                "sight": "0",
                "range": "15",
                "min_range": "5",
                "speed": "10",
                "can_be_cloned": "1",
                "desync_hash": "1",
                "water_unit": "0",
                "hides_units": "0",
                "is_central_building": "0",
                "house_pop_bonus": "0",
                "target_factor": "100",
                "healthbaroffset": "-70",
                "always_visible_on_minimap": "0",
                "healthbar_type": "0",
                "repair_rate": "0",
                "decor_always_animate": "0",
                "display_name": "Object",
                "display_name_plural": "Objects",
                "radius": "0",
                "selection_radius": "0",
                "interface": "thumb"
            }, "commands": {"idle": [["Obj", "this"]], "wait": [["Obj", "this"], ["point", "pt"]]}, "def_cmds": {}
        },
        "IHero3b": {
            "properties": {
                "display_name": "Poemana",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "Rock Medium 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IVillager": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IVillager.bmp",
                "edittree_pos": "Units/Iberia/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "GHouse1": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "110",
                "selection_radius": "112",
                "edittree_pos": "Structures/Village (Gaul)/House 1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "TempleOfThorFire2": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "TBarrackHorse5": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "LionM": {
            "properties": {
                "maxhealth": "300",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "39",
                "selection_radius": "40",
                "sight": "600",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/lionM.bmp",
                "display_name": "Lion",
                "display_name_plural": "Lions",
                "help": "contents/units/Lion",
                "edittree_pos": "Units/Animals/Lion (aggressive)"
            },
            "commands": {
                "idle": [["Obj", "me"]],
                "attack": [["Obj", "me"], ["Obj", "tgt"]],
                "lead": [["Obj", "This"]],
                "engage": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "advance": [["Obj", "me"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BaseAnimal"
        },
        "SummoningUnit": {
            "properties": {"stamina_dec_time": "1000"},
            "commands": {},
            "def_cmds": {},
            "parent": "BaseAnimal"
        },
        "WatchEye": {
            "properties": {"sight": "550"},
            "commands": {"spy": [["Obj", "this"]], "infinite_spy": [["Obj", "this"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "ItemHolder": {
            "properties": {
                "interface": "thumb,items",
                "can_be_captured": "0",
                "inventory_size": "16",
                "help": "/contents/items"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ITavern": {
            "properties": {
                "race": "Iberia",
                "display_name": "Tavern",
                "radius": "170",
                "selection_radius": "180",
                "edittree_pos": "Structures/Stronghold (Iberia)/Tavern",
                "auto_repair": "no",
                "icon": "gameres/icons/ITavern.bmp",
                "help": "/contents/buildings/ITavern"
            },
            "commands": {"sellfoodforgold": [["Obj", "this"]], "calltoarms": [["Obj", "this"]]},
            "def_cmds": {},
            "parent": "BaseTavern"
        },
        "Stonehenge1": {
            "properties": {
                "edittree_pos": "Structures/Interactive/Stonehenge 1",
                "icon": "gameres/icons/Stonehenge.bmp",
                "radius": "250",
                "selection_radius": "255"
            }, "commands": {}, "def_cmds": {}, "parent": "Stonehenge"
        },
        "RGateE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RHero2a": {
            "properties": {
                "display_name": "Glycon",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "bcatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "CPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/CPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CSentry": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "150",
                "damage": "26",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/CJavelinThrower.bmp",
                "unit_specials": "Penetration, Keen sight, Freedom",
                "projectile_class": "Javelin",
                "building_projectile_class": "Javelin"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "LionFUnit": {
            "properties": {
                "maxhealth": "300",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "40",
                "selection_radius": "40",
                "sight": "600",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/lionF.bmp",
                "display_name": "Lioness",
                "display_name_plural": "Lionesses",
                "help": "contents/units/Lioness",
                "edittree_pos": "Units/Animals/Lioness"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseAnimal"
        },
        "MultiOneShip": {
            "properties": {"interface": "thumb,unit,holder"},
            "commands": {},
            "def_cmds": {},
            "parent": "MultiOne"
        },
        "TWallsN": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "RChariot": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "500",
                "damage": "30",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "120",
                "unit_specials": "Triple strike, Ferocity, Freedom",
                "healthbar_type": "3",
                "radius": "40",
                "selection_radius": "60",
                "icon": "gameres/icons/RChariot.bmp",
                "display_name": "Chariot",
                "display_name_plural": "Chariots",
                "help": "contents/units/RChariot",
                "edittree_pos": "Units/Roman/Chariot"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "IEliteGuard": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "420",
                "damage": "30",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "80",
                "unit_specials": "Bleeding attack",
                "formation_priority": "1000",
                "formation_radius": "26",
                "icon": "gameres/icons/IEliteguard.bmp",
                "display_name": "Elite Guard",
                "display_name_plural": "Elite Guards",
                "help": "contents/units/IEliteGuard",
                "edittree_pos": "Units/Iberia/Elite Guard"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "EWallsW": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Egyptian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "IHouse3": {
            "properties": {
                "race": "Iberia",
                "display_name": "House",
                "icon": "gameres/icons/ihouse.bmp",
                "radius": "110",
                "selection_radius": "112",
                "edittree_pos": "Structures/Village (Iberia)/House 3"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Swamp1": {
            "properties": {"edittree_pos": "Structures/Others/Swamps/Swamp 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CWVillager": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWVillager.bmp",
                "edittree_pos": "Units/Carthage/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "RArcher": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "150",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Defense skill",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/RArcher.bmp",
                "display_name": "Archer",
                "display_name_plural": "Archers",
                "help": "contents/units/RArcher",
                "edittree_pos": "Units/Roman/Archer"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "COLUMN ALONE1": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Column Alone 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GHouse3": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "110",
                "selection_radius": "112",
                "edittree_pos": "Structures/Village (Gaul)/House 3"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "THero2b": {
            "properties": {
                "display_name": "Rusto",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "TWallsNW": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CampTent3": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tent 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "SphinxSmall2": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Small 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Trader": {
            "properties": {
                "maxhealth": "400",
                "display_name": "Caravan",
                "display_name_plural": "Caravans",
                "help": "contents/units/Caravan",
                "icon": "gameres/icons/Wagon.bmp",
                "radius": "40",
                "selection_radius": "45",
                "speed": "80",
                "edittree_pos": "Units/Others/Caravan Mule"
            }, "commands": {}, "def_cmds": {}, "parent": "Wagon"
        },
        "ESentry": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "140",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/EArcher.bmp",
                "unit_specials": "Drain, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "DefensiveStand": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Building": {
            "properties": {
                "maxhealth": "5000",
                "sight": "600",
                "armor_slash": "0",
                "armor_pierce": "0",
                "radius": "600",
                "selection_radius": "600",
                "target_priority": "100",
                "auto_repair": "yes",
                "capture_health_percent": "100",
                "exit_interval": "20",
                "help": "/contents/buildings",
                "interface": "thumb, building"
            }, "commands": {"repair": [["Obj", "b"]], "broken": [["Obj", "this"]]}, "def_cmds": {}, "parent": "Object"
        },
        "CarthaginianHero": {
            "properties": {
                "maxhealth": "1000",
                "damage": "50",
                "armor_slash": "12",
                "armor_pierce": "12",
                "race": "Carthage",
                "help": "/contents/units/CHero",
                "HeroSkills": "Vigor, Frenzy, Rush, Egoism, Wisdom"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "Big_Arrow": {
            "properties": {"projectile_explosion": "CGule_fire"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Column Bullhead": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Column Bullhead"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ShamanGhost": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "600",
                "damage": "1",
                "armor_slash": "4",
                "armor_pierce": "4",
                "speed": "60",
                "range": "250",
                "unit_specials": "",
                "target_factor": "200",
                "max_food": "0",
                "feeds": "0",
                "damaged_by_ghost": "0",
                "icon": "gameres/icons/Ghost.bmp",
                "display_name": "Ghoul",
                "display_name_plural": "Ghouls",
                "help": "contents/units/Ghost"
            },
            "commands": {
                "advance": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "This"], ["point", "pt"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "me"]],
                "spawn": [["Obj", "me"]]
            },
            "def_cmds": {},
            "parent": "Peaceful"
        },
        "EGate2": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "GGateSW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RHero3c": {
            "properties": {
                "display_name": "Dexion",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "RTownhall": {
            "properties": {
                "race": "RepublicanRome",
                "foodperpop": "100",
                "display_name": "Republican Roman Townhall",
                "icon": "gameres/icons/Rtownhall.bmp",
                "radius": "170",
                "selection_radius": "175",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Townhall",
                "help": "/contents/buildings/RTownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "MGate2": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "NHero1": {
            "properties": {
                "race": "Gaul",
                "display_name": "Heardred",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/NHero1.bmp",
                "edittree_pos": "Units/Heroes/Heardred",
                "HeroSkills": "Leadership, Epic attack, Epic endurance, Defensive cry, Battle cry"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "GWVillagerAmbient": {
            "properties": {"race": "Gaul", "icon": "gameres/icons/GWoman.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "RHero2b": {
            "properties": {
                "display_name": "Kaeso",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "MHero1": {
            "properties": {
                "display_name": "Rutilanus",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero1.bmp",
                "edittree_pos": "Units/Roman/Hero (Imperial) 1"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "Swamp2": {
            "properties": {"edittree_pos": "Structures/Others/Swamps/Swamp 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "MHero1c": {
            "properties": {
                "display_name": "Granius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "IGateSE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "GWallsSW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TripleStrike": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "CHero2": {
            "properties": {
                "display_name": "Hamack",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero2.bmp",
                "edittree_pos": "Units/Carthage/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "DLion": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Lion"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "RVillager": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RMan.bmp",
                "edittree_pos": "Units/Roman/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "RHero1": {
            "properties": {
                "display_name": "Anteros",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero1.bmp",
                "edittree_pos": "Units/Roman/Hero (Republican) 1"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "SiloRuined": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Silo (Ruined)"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BHero2b": {
            "properties": {
                "display_name": "Hunuald",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "CBlacksmith": {
            "properties": {
                "race": "Carthage",
                "display_name": "Blacksmith",
                "icon": "gameres/icons/CBlacksmith.bmp",
                "radius": "255",
                "selection_radius": "260",
                "edittree_pos": "Structures/Stronghold (Carthage)/Blacksmith",
                "help": "/contents/buildings/CBlacksmith"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "CBlacksmithAnim": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "Javelin": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Death_Magic": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BaseVillage": {
            "properties": {
                "house_pop_bonus": "10",
                "interface": "thumb,building,queue",
                "radius": "230",
                "selection_radius": "250",
                "auto_repair": "yes",
                "repair_rate": "250",
                "is_central_building": "1",
                "can_be_captured": "1",
                "can_be_attacked": "1",
                "produces_gold": "0",
                "produces_food": "1",
                "is_single_building": "0",
                "settlement_food": "100",
                "settlement_gold": "0",
                "settlement_maxfood": "5000",
                "settlement_maxgold": "5000",
                "population": "12",
                "efficiency": "1",
                "max_population": "20",
                "max_units": "0",
                "minimap_icon_type": "color",
                "display_name": "Village Hall"
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "tribute": [["Obj", "this"], ["Obj", "To"]],
                "tribute_default": [["Obj", "this"], ["Obj", "To"]],
                "stoptribute": [["Obj", "this"]],
                "createfoodmulesmall": [["Obj", "This"]],
                "createfoodmulebig": [["Obj", "This"]],
                "creategoldmulesmall": [["Obj", "This"]],
                "creategoldmulebig": [["Obj", "This"]],
                "trainpeasant": [["Obj", "This"]],
                "repopulate": [["Obj", "b"]]
            },
            "def_cmds": {
                "BaseTownhall": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseVillage": [{"cmd": "tribute_default", "ctrl": false}],
                "Outpost": [{"cmd": "tribute_default", "ctrl": false}],
                "TTent": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseShipyard": [{"cmd": "tribute_default", "ctrl": false}]
            },
            "parent": "BaseBuilding"
        },
        "well1": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Small well",
                "icon": "gameres/icons/Small well.bmp",
                "radius": "70",
                "selection_radius": "75",
                "help": "/contents/buildings/Well"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "GVillage": {
            "properties": {
                "race": "Gaul",
                "foodperpop": "45",
                "icon": "gameres/icons/GWarehouse.bmp",
                "edittree_pos": "Structures/Village (Gaul)/Village hall",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "Column Small": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Column Small"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BWallsS": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "GHero3a": {
            "properties": {
                "display_name": "Darhinnox",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "CHero1": {
            "properties": {
                "display_name": "Mago",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero1.bmp",
                "edittree_pos": "Units/Carthage/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "GArena2": {
            "properties": {
                "race": "Gaul",
                "display_name": "Arena",
                "radius": "240",
                "selection_radius": "300",
                "edittree_pos": "Structures/Stronghold (Gaul)/Arena SE",
                "help": "/contents/buildings/GArena",
                "icon": "gameres/icons/GArena.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "BWallsN": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "kolona1": {
            "properties": {"edittree_pos": "Structures/Others/Ruins/Roman pillar"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TVillager": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TVillager.bmp",
                "edittree_pos": "Units/Germany/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "RGateNW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "STAT01": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Egypt/Statue1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "DElephantSkeleton2": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Elephant Skeleton 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "IHero2": {
            "properties": {
                "display_name": "Caraunio",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero2.bmp",
                "edittree_pos": "Units/Iberia/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "EVillage": {
            "properties": {
                "race": "Egypt",
                "radius": "230",
                "selection_radius": "250",
                "icon": "gameres/icons/EVillage.bmp",
                "edittree_pos": "Structures/Village (Egypt)/Village hall",
                "foodperpop": "100",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "EBlacksmithFire": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "ERuins1": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Ruins1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Ritual Stone 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Sacred/Ritual Stone 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IVillagerAmbient": {
            "properties": {"race": "Iberia", "icon": "gameres/icons/IVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "ESwordsman": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "400",
                "damage": "16",
                "armor_slash": "4",
                "armor_pierce": "4",
                "speed": "80",
                "unit_specials": "Cripple",
                "icon": "gameres/icons/ESwordsman.bmp",
                "display_name": "Swordsman",
                "display_name_plural": "Swordsmen",
                "help": "contents/units/ESwordsman",
                "edittree_pos": "Units/Egypt/Swordsman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Wall": {
            "properties": {
                "num_sentry_slots": "5",
                "sentry_class_name": "RSentry",
                "display_name": "Wall",
                "help": "/contents/buildings/Fortification",
                "non_selectable": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "Building"
        },
        "Obelisk1": {
            "properties": {
                "radius": "30",
                "selection_radius": "30",
                "sight": "0",
                "edittree_pos": "Structures/Item holders/Obelisk 1",
                "display_name": "Obelisk",
                "icon": "gameres/icons/Obelisk1.bmp",
                "help": "/contents/buildings/Obelisk 1"
            }, "commands": {"idle": [["Obj", "This"]]}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "RamUnit": {
            "properties": {
                "sight": "850",
                "range": "80",
                "min_range": "0",
                "speed": "40",
                "damage": "300",
                "armor_slash": "20",
                "armor_pierce": "20",
                "damage_type": "siege",
                "maxhealth": "1000",
                "max_food": "0",
                "feeds": "0",
                "does_not_regenerate": "1",
                "radius": "80",
                "selection_radius": "80",
                "display_name": "Ram"
            },
            "commands": {"idle": [["Obj", "me"]], "attack": [["Obj", "me"], ["Obj", "target1"]]},
            "def_cmds": {
                "Inn": [{"cmd": "approach", "ctrl": false}],
                "ShipBattle": [{"cmd": "approach", "ctrl": false}],
                "Wagon": [{"cmd": "approach", "ctrl": false}],
                "Unit": [{"cmd": "approach", "ctrl": false}],
                "Hero": [{"cmd": "approach", "ctrl": false}],
                "Building": [{"cmd": "attack", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "ItemHolder": [{"cmd": "approach", "ctrl": false}]
            },
            "parent": "Military"
        },
        "MTemple": {
            "properties": {
                "race": "ImperialRome",
                "display_name": "Temple",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Temple",
                "auto_repair": "no",
                "icon": "gameres/icons/MTemple.bmp",
                "help": "/contents/buildings/RTemple"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "BHero2a": {
            "properties": {
                "display_name": "Edric",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "BritonHero": {
            "properties": {
                "race": "Britain",
                "maxhealth": "1000",
                "range": "500",
                "damage": "50",
                "armor_slash": "14",
                "armor_pierce": "14",
                "damage_type": "pierce",
                "HeroSkills": "Charge, Leadership, Assault, Epic armor, Epic attack",
                "projectile_class": "Arrow",
                "building_projectile_class": "Fire_Arrow",
                "help": "/contents/units/BHero"
            }, "commands": {}, "def_cmds": {}, "parent": "Hero"
        },
        "CampWeaponRack3": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Weapon rack 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TWallsSW": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "IWallsE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "GTower01": {
            "properties": {"race": "Gaul", "wall_set": "Gaul walls", "icon": "gameres/icons/GTower.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Tower"
        },
        "ITemple": {
            "properties": {
                "race": "Iberia",
                "display_name": "Sanctuary",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/ISanctuary",
                "edittree_pos": "Structures/Stronghold (Iberia)/Sanctuary",
                "auto_repair": "no",
                "icon": "gameres/icons/ISanctuary.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "GWVillager": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWoman.bmp",
                "edittree_pos": "Units/Gaul/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "MTower": {
            "properties": {
                "race": "ImperialRome",
                "wall_set": "Imperial Roman walls",
                "icon": "gameres/icons/RTower.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Tower"
        },
        "DCube2": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Cube 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "IEnchantress": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "120",
                "armor_slash": "4",
                "armor_pierce": "4",
                "speed": "50",
                "unit_specials": "Teaching, Active",
                "icon": "gameres/icons/IEnchantress.bmp",
                "display_name": "Enchantress",
                "display_name_plural": "Enchantresses",
                "help": "contents/units/IEnchantress",
                "edittree_pos": "Units/Iberia/Enchantress"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "learn": [["Obj", "This"], ["Obj", "target"]],
                "teach": [["Obj", "This"], ["Obj", "target"]],
                "coverofmercy": [["Obj", "This"], ["point", "pt"]],
                "mass_heal": [["Obj", "This"]]
            },
            "def_cmds": {
                "Unit": [{"cmd": "teach", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "CJavelinThrower": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "150",
                "damage": "26",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Penetration",
                "projectile_class": "Javelin",
                "building_projectile_class": "Javelin",
                "icon": "gameres/icons/CJavelinThrower.bmp",
                "display_name": "Numidian Javelin Thrower",
                "display_name_plural": "Numidian Javelin Throwers",
                "help": "contents/units/CJavelinThrower",
                "edittree_pos": "Units/Carthage/Javelin Thrower"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "ShortRanged"
        },
        "GHero4": {
            "properties": {
                "display_name": "Ercenberht",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero4.bmp",
                "edittree_pos": "Units/Gaul/Hero 4"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "SphinxSmall4": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Small 4"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Mist": {
            "properties": {"radius": "100", "range": "200", "stamina_dec_time": "1200"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "SummoningObj"
        },
        "CTavern": {
            "properties": {
                "race": "Carthage",
                "display_name": "Market",
                "icon": "gameres/icons/CMarket.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Carthage)/Tavern",
                "help": "/contents/buildings/CMarket"
            },
            "commands": {
                "buyfoodforgold": [["Obj", "This"]],
                "heal": [["Obj", "THIS"]],
                "expedition": [["Obj", "this"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BaseTavern"
        },
        "CMaceman": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "400",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Bleeding attack",
                "icon": "gameres/icons/CMaceman.bmp",
                "display_name": "Maceman",
                "display_name_plural": "Macemen",
                "help": "contents/units/CMaceman",
                "edittree_pos": "Units/Carthage/Maceman"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "Melee"
        },
        "TSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "TSentry"},
        "BWallsSE": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Witch hut": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Witch hut",
                "icon": "gameres/icons/Witch hut.bmp",
                "radius": "50",
                "selection_radius": "50",
                "display_name": "Witch hut",
                "respawn_time": "300000",
                "respawn_item": "Rye spikes"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "MGate3": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "GGateS": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Slingstone": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "IArena": {
            "properties": {
                "race": "Iberia",
                "display_name": "Arena",
                "radius": "240",
                "selection_radius": "300",
                "edittree_pos": "Structures/Stronghold (Iberia)/Arena",
                "help": "/contents/buildings/IArena",
                "icon": "gameres/icons/IArena.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "Damage2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "rcatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "BHero3c": {
            "properties": {
                "display_name": "Egbert",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "THouse2": {
            "properties": {
                "race": "Germany",
                "radius": "60",
                "selection_radius": "60",
                "icon": "gameres/icons/Thouse.bmp",
                "edittree_pos": "Structures/Village (Germany)/House 2",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BattleCry2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Teleport_1": {
            "properties": {
                "radius": "200",
                "selection_radius": "210",
                "health": "100",
                "maxhealth": "100",
                "edittree_pos": "Structures/Interactive/Cave SW",
                "exit_vector_x": "-250",
                "exit_vector_y": "250",
                "description": "Allows armies to go from one cave entrance to the other instantly"
            }, "commands": {}, "def_cmds": {}, "parent": "Teleport"
        },
        "Crack 03": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Cracks/Crack 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CWallsNE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BTempleOfThor": {
            "properties": {
                "race": "Britain",
                "display_name": "Temple of Thor",
                "radius": "165",
                "selection_radius": "165",
                "help": "/contents/buildings/BTempleOfThor",
                "edittree_pos": "Structures/Stronghold (Britain)/Temple of Thor",
                "auto_repair": "no",
                "icon": "gameres/icons/BTempleOfThor.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "BHero2": {
            "properties": {
                "display_name": "Alvin",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero2.bmp",
                "edittree_pos": "Units/Britain/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "RHero3b": {
            "properties": {
                "display_name": "Marcipor",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "MBlacksmith": {
            "properties": {
                "race": "ImperialRome",
                "display_name": "Blacksmith",
                "icon": "gameres/icons/RBlacksmith.bmp",
                "radius": "255",
                "selection_radius": "260",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Blacksmith",
                "help": "/contents/buildings/RBlacksmith"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "Ghost_sacrifice": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Sacrifice"
        },
        "IWallsS": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "SPHINXBIG2": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Big 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TTavern": {
            "properties": {
                "race": "Germany",
                "display_name": "Tavern",
                "radius": "170",
                "selection_radius": "180",
                "edittree_pos": "Structures/Stronghold (Germany)/Tavern",
                "auto_repair": "no",
                "icon": "gameres/icons/TTavern.bmp",
                "help": "/contents/buildings/TTavern"
            }, "commands": {"buyfoodforgold": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "RWallsSW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CArena": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/carena.bmp",
                "display_name": "Arena",
                "radius": "360",
                "selection_radius": "365",
                "edittree_pos": "Structures/Stronghold (Carthage)/Arena",
                "help": "/contents/buildings/CArena"
            }, "commands": {"mahout_school": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseArena"
        },
        "TSanctuaryOfVotan": {
            "properties": {
                "race": "Germany",
                "display_name": "Sanctuary of Votan",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Germany)/Sanctuary of Votan",
                "auto_repair": "no",
                "icon": "gameres/icons/TSanctuaryOfVotan.bmp",
                "help": "/contents/buildings/TArena"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "Rock Small 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Small 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RHero2c": {
            "properties": {
                "display_name": "Bellator",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "BWallsE": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "DCube1": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Cube 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BHouse02": {
            "properties": {
                "race": "Britain",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/bhouse.bmp",
                "edittree_pos": "Structures/Village (Britain)/House 2",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BWallsNW": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BSentry": {
            "properties": {
                "race": "Britain",
                "maxhealth": "180",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/BBowman.bmp",
                "unit_specials": "Triple strike, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "COLUMN CONNECTION1": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Column Connection 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Stonehenge": {
            "properties": {
                "display_name": "Stonehenge",
                "icon": "gameres/icons/wagon.bmp",
                "maxhealth": "15000",
                "sight": "400",
                "help": "/contents/buildings/Stonehenge",
                "description": "Allows spells which have an effect on the entire map. In order to cast these spells a sage must be present near the Stonehenge, to ensure that it accumulates enough power for such rituals",
                "is_central_building": "1",
                "can_be_captured": "0",
                "can_be_attacked": "0",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "0",
                "settlement_maxgold": "0",
                "population": "0",
                "efficiency": "1",
                "max_population": "0",
                "max_units": "0",
                "settlement_icon_name": "",
                "hides_units": "1"
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "soothing": [["Obj", "This"]],
                "wisdom": [["Obj", "This"]],
                "starvation": [["Obj", "This"]],
                "sacrifice": [["Obj", "This"]],
                "bloodlust": [["Obj", "This"]]
            },
            "def_cmds": {},
            "parent": "Building"
        },
        "THouse3": {
            "properties": {
                "race": "Germany",
                "radius": "60",
                "selection_radius": "60",
                "icon": "gameres/icons/Thouse.bmp",
                "edittree_pos": "Structures/Village (Germany)/House 3",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "CGateE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RWallsNE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Rock Small 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Small 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TWallsW": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "German walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "IOutpost": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "10000",
                "icon": "gameres/icons/ioutpost.bmp",
                "display_name": "Military post",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Military post (Iberian)",
                "help": "/contents/buildings/ITrainingCamp",
                "description": "Gradually increases the experience of all warriors inside the outpost until they reach level 8",
                "range": "1000",
                "settlement_food": "0",
                "settlement_gold": "1000",
                "defender_cls_1": "ISlinger",
                "defenders_max_1": "12",
                "defenders_out_1": "4",
                "start_level_1": "8",
                "end_level_1": "20",
                "defender_cls_2": "IDefender",
                "defenders_max_2": "10",
                "defenders_out_2": "10",
                "start_level_2": "8",
                "end_level_2": "8"
            }, "commands": {}, "def_cmds": {}, "parent": "Outpost"
        },
        "Military": {
            "properties": {"healthbar_type": "2"},
            "commands": {
                "train": [["Obj", "This"]],
                "ondie": [["Obj", "THIS"]],
                "enter_tent": [["Obj", "This"], ["Obj", "bld"]],
                "guardadvance": [["Obj", "me"], ["point", "pt"]],
                "guardpatrol": [["Obj", "This"], ["point", "pt"]],
                "guardengage": [["Obj", "me"]]
            },
            "def_cmds": {},
            "parent": "Unit"
        },
        "DLleldoryn": {
            "properties": {
                "race": "Gaul",
                "damage": "1",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "65",
                "unit_specials": "Freedom",
                "range": "200",
                "minrange": "0",
                "sight": "400",
                "icon": "gameres/icons/Lleo.bmp",
                "display_name": "Lleldoryn",
                "display_name_plural": "Druids",
                "edittree_pos": "Units/Heroes/Lleldoryn (Druid)"
            },
            "commands": {},
            "def_cmds": {"ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]},
            "parent": "BaseMage"
        },
        "CampFire": {
            "properties": {"decor_always_animate": "1", "edittree_pos": "Structures/Others/Camp/Fireplace"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TVillagerAmbient": {
            "properties": {"race": "Germany", "icon": "gameres/icons/TVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "Peasant": {
            "properties": {
                "maxhealth": "100",
                "damage": "0",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "damage_type": "none",
                "sight": "150",
                "formation_priority": "100",
                "formation_radius": "26",
                "radius": "15",
                "selection_radius": "15",
                "select_class": "Peasant",
                "display_name": "Peasant",
                "display_name_plural": "Peasants",
                "help": "contents/units/Villagers"
            },
            "commands": {"enter": [["Obj", "This"], ["Obj", "bld"]], "transport": [["Obj", "This"], ["Obj", "other"]]},
            "def_cmds": {
                "Inn": [{"cmd": "transport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Catapult": [{"cmd": "approach", "ctrl": false}],
                "Building": [{"cmd": "enter", "ctrl": false}]
            },
            "parent": "Peaceful"
        },
        "BHero3": {
            "properties": {
                "display_name": "Wuffa",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero3.bmp",
                "edittree_pos": "Units/Britain/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "Toro 2": {
            "properties": {
                "radius": "70",
                "selection_radius": "70",
                "edittree_pos": "Structures/Others/Ruins/Bull 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "MVillagerAmbient": {
            "properties": {"race": "ImperialRome", "icon": "gameres/icons/RMan.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "CGateS": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "TPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/TPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CVillagerAmbient": {
            "properties": {"race": "Carthage", "icon": "gameres/icons/CVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "STAT02": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Egypt/Statue2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "EHero3c": {
            "properties": {
                "display_name": "Tefibi",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "MSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "MSentry"},
        "Gate": {
            "properties": {
                "icon": "gameres/icons/GGates.bmp",
                "target_priority": "200",
                "display_name": "Gate",
                "auto_repair": "no",
                "help": "/contents/buildings/Fortification",
                "sentry_class_name": "RSentry1"
            },
            "commands": {
                "idle": [["Obj", "gate"]],
                "open": [["Obj", "gate"]],
                "close": [["Obj", "gate"]],
                "open_permanent": [["Obj", "gate"]],
                "close_permanent": [["Obj", "gate"]]
            },
            "def_cmds": {},
            "parent": "BaseBuilding"
        },
        "DRuins9": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 9"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CampWeaponRack1": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Weapon rack 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Lightning2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "GHero3": {
            "properties": {
                "display_name": "Dumnorix",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero3.bmp",
                "edittree_pos": "Units/Gaul/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "CWallsNW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "EVillager": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EVillager.bmp",
                "edittree_pos": "Units/Egypt/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "GHouse5": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "112",
                "selection_radius": "115",
                "edittree_pos": "Structures/Village (Gaul)/House 5"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "SPHINXBIG3": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Big 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Fire_Arrow": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "RGateNE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "EWVillager": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWVillager.bmp",
                "edittree_pos": "Units/Egypt/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "BaseMage": {
            "properties": {
                "damage": "1",
                "armor_slash": "2",
                "armor_pierce": "2",
                "target_factor": "100",
                "healthbar_type": "2",
                "range": "200",
                "min_range": "0",
                "sight": "400"
            },
            "commands": {
                "globalspell": [["Obj", "me"], ["Obj", "target"]],
                "train": [["Obj", "this"]],
                "learn": [["Obj", "This"], ["Obj", "target"]]
            },
            "def_cmds": {"Hero": [{"cmd": "attach", "ctrl": false}]},
            "parent": "Peaceful"
        },
        "IMilitiaman": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "180",
                "damage": "14",
                "armor_slash": "6",
                "armor_pierce": "6",
                "speed": "80",
                "unit_specials": "Defense skill",
                "formation_priority": "1200",
                "formation_radius": "26",
                "icon": "gameres/icons/IMilitiaman.bmp",
                "display_name": "Militiaman",
                "display_name_plural": "Militiamen",
                "help": "contents/units/IMilitiaman",
                "edittree_pos": "Units/Iberia/Militiaman"
            }, "commands": {"convert": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Melee"
        },
        "THero1b": {
            "properties": {
                "display_name": "Hildegaud",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "CampFence1": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Fence 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "COLUMN CONNECTION2": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Column Connection 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Ruins 04": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 4"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Ruins 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Hen": {
            "properties": {
                "display_name": "Hen",
                "damage_type": "none",
                "damage": "0",
                "radius": "7",
                "selection_radius": "7",
                "sight": "100",
                "speed": "30",
                "maxhealth": "20",
                "feeds": "0",
                "healthbaroffset": "-30",
                "target_factor": "-1",
                "no_transparent_draw": "1",
                "always_visible_on_minimap": "0",
                "healthbar_type": "0"
            }, "commands": {"idle": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Animal"
        },
        "RPrinciple": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "300",
                "damage": "16",
                "armor_slash": "16",
                "armor_pierce": "16",
                "speed": "80",
                "unit_specials": "Attack skill, Active",
                "icon": "gameres/icons/RPrinciple.bmp",
                "display_name": "Principle",
                "display_name_plural": "Principles",
                "help": "contents/units/RPrinciple",
                "edittree_pos": "Units/Roman/Principle"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "MHero3b": {
            "properties": {
                "display_name": "Vinicius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "DRuins4": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 4"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TBarrackHorse1": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "Gule": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Sacrifice": {"properties": {"radius": "10"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "THero2a": {
            "properties": {
                "display_name": "Malo",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "EVillagerAmbient": {
            "properties": {"race": "Egypt", "icon": "gameres/icons/RMan.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "RHero2": {
            "properties": {
                "display_name": "Chilo",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero2.bmp",
                "edittree_pos": "Units/Roman/Hero (Republican) 2"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "BHero1c": {
            "properties": {
                "display_name": "Osuald",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "EHero3a": {
            "properties": {
                "display_name": "Paneb",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "EagleSummoned": {
            "properties": {
                "does_not_regenerate": "1",
                "icon": "gameres/icons/eagle.bmp",
                "unit_specials": "Keen sight",
                "stamina_dec_time": "10000"
            }, "commands": {}, "def_cmds": {}, "parent": "Eagle"
        },
        "ROutpost": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "10000",
                "icon": "gameres/icons/ROutpost.bmp",
                "display_name": "Fort",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Fort (Roman)",
                "help": "/contents/buildings/ROutpost",
                "description": "Produces additional gold as long as there is 2000 gold stored in the outpost",
                "range": "1000",
                "settlement_food": "0",
                "settlement_gold": "1000",
                "defender_cls_1": "RLiberatus",
                "defenders_max_1": "20",
                "defenders_out_1": "8",
                "start_level_1": "4",
                "end_level_1": "12"
            }, "commands": {"routpost_interest": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Outpost"
        },
        "TAxeman": {
            "properties": {
                "race": "Germany",
                "maxhealth": "240",
                "damage": "30",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "80",
                "unit_specials": "Triple strike",
                "icon": "gameres/icons/TAxeman.bmp",
                "display_name": "Axeman",
                "display_name_plural": "Axemen",
                "help": "contents/units/Axeman",
                "edittree_pos": "Units/Germany/Axeman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "WatchEyeSmall": {
            "properties": {"sight": "300"},
            "commands": {"spy": [["Obj", "this"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "EHouse2": {
            "properties": {
                "race": "Egypt",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/ehouse.bmp",
                "edittree_pos": "Structures/Village (Egypt)/House 2",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "TGate5": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BGate2": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IberianHero": {
            "properties": {
                "maxhealth": "1000",
                "damage": "40",
                "armor_slash": "16",
                "armor_pierce": "16",
                "race": "Iberia",
                "HeroSkills": "Healing, Ceasefire, Team defense, Epic endurance, Euphoria",
                "help": "/contents/units/IHero"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "AdditionalDefense": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Gule_shadow": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Death": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BHouse03": {
            "properties": {
                "race": "Britain",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/bhouse.bmp",
                "edittree_pos": "Structures/Village (Britain)/House 3",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Ruins 05": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 5"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TempleOfThorFire1": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "ShipEgypt": {
            "properties": {
                "icon": "gameres/icons/ShipEgypt.bmp",
                "display_name": "Egypt Ship",
                "display_name_plural": "Ships",
                "edittree_pos": "Units/Others/Egypt Ship"
            }, "commands": {}, "def_cmds": {}, "parent": "ShipBattle"
        },
        "Caesar": {
            "properties": {
                "race": "ImperialRome",
                "display_name": "Caesar",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/Caesar.bmp",
                "edittree_pos": "Units/Heroes/Caesar (Roman)",
                "HeroSkills": "Administration, Team attack, Team defense, Quick March, Discipline"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "CGateNW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "CVillager": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CVillager.bmp",
                "edittree_pos": "Units/Carthage/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "IWallsSE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Assault": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Tradecar_Donkey": {
            "properties": {
                "maxhealth": "400",
                "display_name": "Caravan",
                "display_name_plural": "Caravans",
                "help": "contents/units/Tradecar_Donkey",
                "icon": "gameres/icons/CaravanDonkey.bmp",
                "radius": "50",
                "selection_radius": "50",
                "speed": "80",
                "edittree_pos": "Units/Others/Caravan Donkey"
            }, "commands": {}, "def_cmds": {}, "parent": "Wagon"
        },
        "Field2": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Field 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Lightning3": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "SPHINXBIG4": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Big 4"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RUIN": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Ruin"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ESentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "ESentry"},
        "CHouse01": {
            "properties": {
                "race": "Carthage",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/chouse.bmp",
                "edittree_pos": "Structures/Village (Carthage)/House 1",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "EWallsN": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TWallsE": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "TSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "DRuins5": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 5"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "MWallsW": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Imperial Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CartTrader": {
            "properties": {
                "maxhealth": "400",
                "display_name": "Caravan",
                "display_name_plural": "Caravans",
                "help": "contents/units/CartTrader",
                "icon": "gameres/icons/CaravanHorse.bmp",
                "radius": "50",
                "selection_radius": "50",
                "speed": "80",
                "edittree_pos": "Units/Others/Caravan Cart"
            }, "commands": {}, "def_cmds": {}, "parent": "Wagon"
        },
        "WolfUnit": {
            "properties": {
                "maxhealth": "240",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "19",
                "selection_radius": "20",
                "sight": "600",
                "speed": "150",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/wolf.bmp",
                "display_name": "Wolf",
                "display_name_plural": "Wolves",
                "help": "contents/units/Wolf",
                "edittree_pos": "Units/Animals/Wolf"
            },
            "commands": {},
            "def_cmds": {
                "": [{"cmd": "move", "ctrl": false}, {"cmd": "advance", "ctrl": true}],
                "Unit": [{"cmd": "attack", "ctrl": false}]
            },
            "parent": "AttackAnimal"
        },
        "ship_wreck2": {
            "properties": {"edittree_pos": "Structures/Water/Ship wreck (small)", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "SphinxSmall1": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Small 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BHero3b": {
            "properties": {
                "display_name": "Alric",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "WaterRocks01": {
            "properties": {"edittree_pos": "Structures/Water/Rocks 1", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Gule_fire": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BleedingAttack": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "OldManA": {
            "properties": {
                "race": "Egypt",
                "radius": "20",
                "selection_radius": "20",
                "edittree_pos": "Units/Others/Old Man Africa"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantAmbient"
        },
        "ChimneySmoke": {
            "properties": {"decor_always_animate": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GBarracks": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/Gbarracks.bmp",
                "display_name": "Barracks",
                "display_name_plural": "Barracks",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/GBarracks",
                "edittree_pos": "Structures/Stronghold (Gaul)/Barracks",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Area": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Silo": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Silo"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Experience": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "TGate6": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "GHero4a": {
            "properties": {
                "display_name": "Beow",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero4.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "Fountain2": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Fountain 2",
                "icon": "gameres/icons/fountain2.bmp",
                "radius": "30",
                "selection_radius": "30",
                "help": "/contents/buildings/Fountain 2",
                "display_name": "Fountain"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "DRuins1": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "RArch": {
            "properties": {
                "race": "RepublicanRome",
                "display_name": "Roman Arch",
                "radius": "150",
                "selection_radius": "170",
                "edittree_pos": "Structures/Others/Ruins/Roman Arch",
                "icon": "gameres/icons/RArch.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "MultiOneRanged": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "MultiOne"},
        "RWallsNW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "FireSmoke": {"properties": {"decor_always_animate": "1"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MArena": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MArena.bmp",
                "display_name": "Arena",
                "radius": "360",
                "selection_radius": "365",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Arena",
                "help": "/contents/buildings/MArena"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "Rock Large 03": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Large 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "WaterRocks02": {
            "properties": {"edittree_pos": "Structures/Water/Rocks 2", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "CSentry"},
        "Haystack Big": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Fields/Haystack Big"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Chest": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Chest",
                "icon": "gameres/icons/Chest.bmp",
                "radius": "28",
                "selection_radius": "30",
                "display_name": "Chest"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "EWallsE": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "GShipyard4": {
            "properties": {
                "race": "Gaul",
                "radius": "350",
                "selection_radius": "400",
                "importsettlement": "Shipyard 4",
                "edittree_pos": "Structures/Shipyards/Wooden NW",
                "exit_vector_x": "-120",
                "exit_vector_y": "-100",
                "build_ship_variation": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "RGateW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "CTemple": {
            "properties": {
                "race": "Carthage",
                "display_name": "Temple",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Carthage)/Temple",
                "auto_repair": "no",
                "icon": "gameres/icons/CTemple.bmp",
                "help": "/contents/buildings/CTemple"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Pyramide2": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Pyramide2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BaseBlacksmith": {
            "properties": {"interface": "thumb,building,queue", "auto_repair": "no"},
            "commands": {},
            "def_cmds": {},
            "parent": "BaseTownBuilding"
        },
        "CLibyanFootman": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "180",
                "damage": "14",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "80",
                "unit_specials": "Revenge",
                "damage_type": "slash",
                "icon": "gameres/icons/CLibyanFootman.bmp",
                "display_name": "Libyan Footman",
                "display_name_plural": "Libyan Footmen",
                "help": "contents/units/CLibyanFootman",
                "edittree_pos": "Units/Carthage/Libyan Footman"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "Melee"
        },
        "CNumidianRider": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "400",
                "damage": "30",
                "armor_slash": "10",
                "armor_pierce": "10",
                "speed": "120",
                "unit_specials": "Regeneration, Keen sight",
                "damage_type": "slash",
                "healthbar_type": "3",
                "icon": "gameres/icons/CNumidianRider.bmp",
                "display_name": "Numidian Rider",
                "display_name_plural": "Numidian Riders",
                "help": "contents/units/CNumidianRider",
                "edittree_pos": "Units/Carthage/Numidian Rider"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "Horse"
        },
        "Ritual Stone 04": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Sacred/Ritual Stone 4"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CoverOfMercy": {
            "properties": {"radius": "1000", "range": "200", "stamina_dec_time": "2000"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "SummoningObj"
        },
        "LionMUnit": {
            "properties": {
                "maxhealth": "300",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "39",
                "selection_radius": "40",
                "sight": "600",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/lionM.bmp",
                "display_name": "Lion",
                "display_name_plural": "Lions",
                "help": "contents/units/Lion",
                "edittree_pos": "Units/Animals/Lion"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseAnimal"
        },
        "WagonGold": {
            "properties": {"icon": "gameres/icons/wagon.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "THero1": {
            "properties": {
                "display_name": "Otho",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero1.bmp",
                "edittree_pos": "Units/Germany/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "DRuins2": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "FormDir": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "IGateW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "TWallsS": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "German walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "fountain": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Fountain",
                "icon": "gameres/icons/Fountain.bmp",
                "radius": "54",
                "selection_radius": "56",
                "display_name": "Fountain"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "DRuins6": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 6"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GTownhall": {
            "properties": {
                "race": "Gaul",
                "foodperpop": "45",
                "icon": "gameres/icons/Gtownhall.bmp",
                "display_name": "Gaul Townhall",
                "radius": "160",
                "selection_radius": "165",
                "auto_repair": "no",
                "help": "/contents/buildings/GTownhall",
                "edittree_pos": "Structures/Stronghold (Gaul)/Townhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "GGateW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BHero3a": {
            "properties": {
                "display_name": "Alchfrid",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "EWallsSE": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "GHouse6": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "100",
                "selection_radius": "110",
                "edittree_pos": "Structures/Village (Gaul)/House 6"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "TGate3": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "TGate2": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "GPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/GPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IDefender": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "200",
                "damage": "16",
                "armor_slash": "22",
                "armor_pierce": "22",
                "speed": "80",
                "unit_specials": "Deflection, Toughness",
                "icon": "gameres/icons/IDefender.bmp",
                "display_name": "Defender",
                "display_name_plural": "Defenders",
                "help": "contents/units/IDefender",
                "edittree_pos": "Units/Iberia/Defender"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "EHero3": {
            "properties": {
                "display_name": "Imhotep",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero3.bmp",
                "edittree_pos": "Units/Egypt/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "Teleport_2": {
            "properties": {
                "radius": "200",
                "selection_radius": "210",
                "health": "100",
                "maxhealth": "100",
                "edittree_pos": "Structures/Interactive/Cave SE",
                "exit_vector_x": "250",
                "exit_vector_y": "250",
                "description": "Allows armies to go from one cave entrance to the other instantly"
            }, "commands": {}, "def_cmds": {}, "parent": "Teleport"
        },
        "dolmen1": {
            "properties": {"edittree_pos": "Structures/Others/Sacred/Dolmen 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BWVillager": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWVillager.bmp",
                "edittree_pos": "Units/Britain/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "ETower": {
            "properties": {"race": "Egypt", "wall_set": "Egyptian walls", "icon": "gameres/icons/ETower.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Tower"
        },
        "Axe": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BGate0": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "THuntress": {
            "properties": {
                "race": "Germany",
                "maxhealth": "240",
                "damage": "40",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Penetration, Sneak",
                "projectile_class": "Javelin",
                "building_projectile_class": "Javelin",
                "icon": "gameres/icons/THuntress.bmp",
                "display_name": "Huntress",
                "display_name_plural": "Huntresses",
                "help": "contents/units/THuntress",
                "edittree_pos": "Units/Germany/Huntress"
            }, "commands": {}, "def_cmds": {}, "parent": "ShortRanged"
        },
        "Rage": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Obelisk2": {
            "properties": {
                "radius": "30",
                "selection_radius": "30",
                "sight": "0",
                "edittree_pos": "Structures/Item holders/Obelisk 2",
                "display_name": "Obelisk",
                "icon": "gameres/icons/Obelisk2.bmp",
                "help": "/contents/buildings/Obelisk 2"
            }, "commands": {"idle": [["Obj", "This"]]}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "EHero1b": {
            "properties": {
                "display_name": "Tjety",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "RGateSE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BaseBarracks": {
            "properties": {
                "radius": "245",
                "selection_radius": "250",
                "interface": "thumb,building,queue",
                "auto_repair": "no"
            },
            "commands": {"idle": [["Obj", "This"]], "train": [["Obj", "This"]], "trainex": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "BaseTownBuilding"
        },
        "Sentry": {
            "properties": {
                "maxhealth": "150",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "sight": "700",
                "range": "600",
                "unit_specials": "Freedom",
                "min_range": "2",
                "damage_type": "pierce",
                "select_class": "Sentry",
                "ignore_passability": "1",
                "max_food": "0",
                "feeds": "0",
                "display_name": "Sentry",
                "display_name_plural": "Sentries"
            },
            "commands": {
                "goto": [["Obj", "me"], ["point", "pt"]],
                "patrol": [["Obj", "me"], ["Obj", "wall1"]],
                "guard": [["Obj", "me"], ["Obj", "wall_gate"]],
                "attack": [["Obj", "me"], ["Obj", "u"]],
                "disappear": [["Obj", "me"], ["Obj", "wall"]],
                "idle": [["Obj", "me"]]
            },
            "def_cmds": {
                "Unit": [{"cmd": "attack", "ctrl": false}, {"cmd": "stay_hidden", "ctrl": false}],
                "Building": [{"cmd": "attack", "ctrl": false}]
            },
            "parent": "Ranged"
        },
        "THero3c": {
            "properties": {
                "display_name": "Raginmund",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "COutpost": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "10000",
                "icon": "gameres/icons/COutpost.bmp",
                "display_name": "Garrison",
                "radius": "333",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Garrison",
                "help": "/contents/buildings/CForth",
                "description": "Converts villagers inside the outpost into a capable Macemen",
                "range": "1000",
                "settlement_food": "2000",
                "settlement_gold": "0",
                "defender_cls_1": "CMaceman",
                "defenders_max_1": "24",
                "defenders_out_1": "12",
                "start_level_1": "1",
                "end_level_1": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "Outpost"
        },
        "EOutpost": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "10000",
                "icon": "gameres/icons/EOutpost.bmp",
                "display_name": "Fort",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Fort (Egypt)",
                "help": "/contents/buildings/EOutpost",
                "description": "Produces additional gold as long as there is 2000 gold stored in the outpost",
                "range": "1000",
                "settlement_food": "500",
                "settlement_gold": "500"
            }, "commands": {"routpost_interest": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Outpost"
        },
        "EBarracks": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EBarracks.bmp",
                "display_name": "Barracks",
                "display_name_plural": "Barracks",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/EBarracks",
                "edittree_pos": "Structures/Stronghold (Egypt)/Barracks",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Ruins1": {
            "properties": {
                "edittree_pos": "Structures/Interactive/Ruins",
                "radius": "250",
                "selection_radius": "255",
                "display_name": "Ruins",
                "hides_units": "0",
                "icon": "gameres/icons/Oracul.bmp",
                "minimap_icon_type": "black"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseRuins"
        },
        "IHouse2": {
            "properties": {
                "race": "Iberia",
                "display_name": "House",
                "icon": "gameres/icons/ihouse.bmp",
                "radius": "106",
                "selection_radius": "110",
                "edittree_pos": "Structures/Village (Iberia)/House 2"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Column Lion 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Column Lion 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IHero2c": {
            "properties": {
                "display_name": "Obana",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "Deflection": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "GWallsE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "icatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "BSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "BSentry"},
        "ShipRome": {
            "properties": {
                "icon": "gameres/icons/ShipRome.bmp",
                "display_name": "Rome Ship",
                "display_name_plural": "Ships",
                "edittree_pos": "Units/Others/Rome Ship"
            }, "commands": {}, "def_cmds": {}, "parent": "ShipBattle"
        },
        "EWallsNW": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "RShipyard4": {
            "properties": {
                "race": "RepublicanRome",
                "edittree_pos": "Structures/Shipyards/Stone NE",
                "icon": "gameres/icons/RShipyard.bmp",
                "importsettlement": "RShipyard 4",
                "radius": "390",
                "selection_radius": "395",
                "exit_vector_x": "120",
                "exit_vector_y": "90",
                "build_ship_variation": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "kolona2": {
            "properties": {"edittree_pos": "Structures/Others/Ruins/Tilted column"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Exclamation_Mark": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MWallsNE": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "MWVillagerAmbient": {
            "properties": {"race": "ImperialRome", "icon": "gameres/icons/RWoman.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "Field3": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Field 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TSwordsman": {
            "properties": {
                "race": "Germany",
                "maxhealth": "200",
                "damage": "10",
                "armor_slash": "4",
                "armor_pierce": "4",
                "speed": "80",
                "unit_specials": "Attack skill, Active",
                "icon": "gameres/icons/TSwordsman.bmp",
                "display_name": "Swordsman",
                "display_name_plural": "Swordsmen",
                "help": "contents/units/TSwordsman",
                "edittree_pos": "Units/Germany/Swordsman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "IWallsW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Iberian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "RShipyard3": {
            "properties": {
                "race": "RepublicanRome",
                "edittree_pos": "Structures/Shipyards/Stone SE",
                "icon": "gameres/icons/RShipyard.bmp",
                "radius": "410",
                "selection_radius": "415",
                "importsettlement": "RShipyard 3",
                "exit_vector_x": "120",
                "exit_vector_y": "-100",
                "build_ship_variation": "2"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "WaterRocks03": {
            "properties": {"edittree_pos": "Structures/Water/Rocks 3", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CBarracks": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CBarracks.bmp",
                "display_name": "Barracks",
                "radius": "245",
                "selection_radius": "250",
                "edittree_pos": "Structures/Stronghold (Carthage)/Barracks",
                "auto_repair": "no",
                "help": "/contents/buildings/CBarracks"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "AttackAnimal": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "BaseAnimal"},
        "RBlacksmith": {
            "properties": {
                "race": "RepublicanRome",
                "display_name": "Blacksmith",
                "icon": "gameres/icons/RBlacksmith.bmp",
                "radius": "255",
                "selection_radius": "260",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Blacksmith",
                "help": "/contents/buildings/RBlacksmith"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "CWallsN": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "DElephantSkeleton1": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Elephant Skeleton 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BWVillagerAmbient": {
            "properties": {"race": "Britain", "icon": "gameres/icons/BWVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "BaseTavern": {
            "properties": {"interface": "thumb,building,queue", "auto_repair": "no"},
            "commands": {
                "addpop": [["Obj", "This"]],
                "buyslaves": [["Obj", "This"]],
                "invest": [["Obj", "This"]],
                "getloan": [["Obj", "This"]],
                "repayloan": [["Obj", "This"]],
                "trainpeasant": [["Obj", "This"]],
                "Scout Area": [["Obj", "this"], ["point", "pt"]],
                "Gossip": [["Obj", "this"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BaseTownBuilding"
        },
        "Swamp": {
            "properties": {"edittree_pos": "Structures/Others/Swamps/Swamp (large)"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TBarrackHorse3": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "Boulder": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Boulder",
                "icon": "gameres/icons/Boulder.bmp",
                "radius": "35",
                "selection_radius": "37",
                "respawn_item": "Snake skin",
                "respawn_time": "600000",
                "display_name": "Boulder"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "RScout": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "200",
                "damage": "20",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "200",
                "unit_specials": "Rage, Defense skill",
                "healthbar_type": "3",
                "icon": "gameres/icons/RScout.bmp",
                "display_name": "Scout",
                "display_name_plural": "Scouts",
                "help": "contents/units/RScout",
                "edittree_pos": "Units/Roman/Scout"
            }, "commands": {}, "def_cmds": {}, "parent": "Horse"
        },
        "STHEAD": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Egypt/Statue Head"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CHero3a": {
            "properties": {
                "display_name": "Clitomacus",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "GWallsW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Gaul walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CGateSE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Crow": {
            "properties": {
                "display_name": "Crow",
                "display_name_plural": "Crows",
                "help": "contents/units/Crow",
                "icon": "gameres/icons/crow.bmp",
                "damage_type": "none",
                "damage": "0",
                "radius": "9",
                "selection_radius": "20",
                "edittree_pos": "Units/Animals/Crow",
                "sight": "900",
                "feeds": "0",
                "target_factor": "-1",
                "healthbaroffset": "-30",
                "maxhealth": "30",
                "no_transparent_draw": "1",
                "speed": "160",
                "healthbar_type": "0"
            },
            "commands": {"idle": [["Obj", "This"]], "move": [["Obj", "This"], ["point", "pt"]]},
            "def_cmds": {},
            "parent": "Animal"
        },
        "GSpearman": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "200",
                "damage": "20",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "80",
                "unit_specials": "Deflection",
                "icon": "gameres/icons/GSpearman.bmp",
                "display_name": "Spearman",
                "display_name_plural": "Spearmen",
                "help": "contents/units/GSpearman",
                "edittree_pos": "Units/Gaul/Spearman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "EArcher": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "140",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "80",
                "unit_specials": "Drain",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/EArcher.bmp",
                "display_name": "Archer",
                "display_name_plural": "Archers",
                "help": "contents/units/EArcher",
                "edittree_pos": "Units/Egypt/Archer"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "BHero2c": {
            "properties": {
                "display_name": "Cadmon",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "GGateNE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BCatapultUnit": {
            "properties": {"race": "Britain", "icon": "gameres/icons/bram.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "RamUnit"
        },
        "GHero2a": {
            "properties": {
                "display_name": "Beorht",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "TEnchantress": {
            "properties": {
                "race": "Germany",
                "maxhealth": "180",
                "armor_slash": "16",
                "armor_pierce": "16",
                "speed": "50",
                "unit_specials": "Curse",
                "icon": "gameres/icons/TEnchantress.bmp",
                "display_name": "Enchantress",
                "display_name_plural": "Enchantresses",
                "help": "contents/units/TEnchantress",
                "edittree_pos": "Units/Germany/Enchantress"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "tlearn": [["Obj", "This"], ["Obj", "target"]],
                "curse": [["Obj", "This"], ["Obj", "target"]],
                "twolf_summoning": [["Obj", "This"]],
                "teagle_summoning": [["Obj", "This"]],
                "t_mass_heal": [["Obj", "This"]]
            },
            "def_cmds": {
                "Military": [{"cmd": "curse", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "RShipyard2": {
            "properties": {
                "race": "RepublicanRome",
                "edittree_pos": "Structures/Shipyards/Stone NW",
                "icon": "gameres/icons/RShipyard.bmp",
                "radius": "410",
                "selection_radius": "415",
                "importsettlement": "RShipyard 2",
                "exit_vector_x": "-120",
                "exit_vector_y": "-100",
                "build_ship_variation": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "MPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/MPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GHero1b": {
            "properties": {
                "display_name": "Gyrth",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "THero2": {
            "properties": {
                "display_name": "Eidhart",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero2.bmp",
                "edittree_pos": "Units/Germany/Hero 2"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "Ranged": {
            "properties": {
                "formation_priority": "500",
                "sight": "600",
                "range": "500",
                "min_range": "2",
                "damage_type": "pierce",
                "maxhealth": "150",
                "radius": "15",
                "selection_radius": "15",
                "projectile_class": "Arrow",
                "building_projectile_class": "Fire_Arrow"
            }, "commands": {}, "def_cmds": {}, "parent": "Military"
        },
        "IVillage": {
            "properties": {
                "race": "Iberia",
                "foodperpop": "45",
                "icon": "gameres/icons/IStorage.bmp",
                "edittree_pos": "Structures/Village (Iberia)/Village hall",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "Rock Large 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Large 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Flag": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Flag"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ccatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "TTent": {
            "properties": {
                "maxhealth": "15000",
                "sight": "900",
                "display_name": "Teuton Tent",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Interactive/Teuton Tent",
                "icon": "gameres/icons/TTent.bmp",
                "interface": "thumb,building,holder",
                "help": "/contents/buildings/TTent",
                "description": "Keeps up to 40 Teuton Riders and Archers that attack any enemy in sight",
                "is_central_building": "1",
                "is_single_building": "1",
                "can_be_captured": "1",
                "can_be_attacked": "0",
                "produces_gold": "0",
                "produces_food": "0",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "100000000",
                "settlement_maxgold": "100000000",
                "population": "0",
                "efficiency": "1",
                "max_population": "0",
                "max_units": "0",
                "settlement_icon_name": "",
                "minimap_icon_type": "color"
            }, "commands": {}, "def_cmds": {"": [{"cmd": "unitsout", "ctrl": false}]}, "parent": "Building"
        },
        "CGule_explosion": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Ruins 06": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 6"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Fish": {
            "properties": {
                "maxhealth": "240",
                "damage_type": "none",
                "damage": "0",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "100",
                "sight": "500",
                "target_factor": "-1",
                "max_food": "10",
                "water_unit": "1",
                "always_visible_on_minimap": "0",
                "radius": "19",
                "selection_radius": "100",
                "healthbar_type": "0",
                "display_name": "Fish",
                "display_name_plural": "Fish",
                "edittree_pos": "Units/Animals/Fish"
            },
            "commands": {"idle": [["Obj", "me"]], "move": [["Obj", "This"], ["point", "pt"]]},
            "def_cmds": {},
            "parent": "Animal"
        },
        "Crack 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Cracks/Crack 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "THero3": {
            "properties": {
                "display_name": "Amalrich",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero3.bmp",
                "edittree_pos": "Units/Germany/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "Ruins 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Curse": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Frenzy": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MutableVillage": {
            "properties": {
                "race": "Mutable",
                "foodperpop": "45",
                "display_name": "Any Race Village",
                "icon": "gameres/icons/GWarehouse.bmp",
                "edittree_pos": "Structures/Any Race Village",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "CBerberAssassin": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "300",
                "damage": "20",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "80",
                "unit_specials": "Rage, Parry",
                "icon": "gameres/icons/CBerberAssassin.bmp",
                "display_name": "Berber Assassin",
                "display_name_plural": "Berber Assassins",
                "help": "contents/units/CBerberAssassin",
                "edittree_pos": "Units/Carthage/Berber Assassin"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "Melee"
        },
        "Ceasefire": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "ecatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "Gule_explosion": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "TBarracks": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TBarracks.bmp",
                "display_name": "Barracks",
                "display_name_plural": "Barracks",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/TBarracks",
                "edittree_pos": "Structures/Stronghold (Germany)/Barracks",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "dolmen2": {
            "properties": {"edittree_pos": "Structures/Others/Sacred/Dolmen 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BaseTownBuilding": {
            "properties": {"auto_repair": "no", "interface": "thumb,building"},
            "commands": {
                "research": [["Obj", "This"]],
                "immediate_research": [["Obj", "This"]],
                "getcharm": [["Obj", "This"]]
            },
            "def_cmds": {},
            "parent": "BaseBuilding"
        },
        "GCatapult": {
            "properties": {
                "race": "Gaul",
                "shot_tan": "2000",
                "shot_height": "150",
                "projectile_class": "Gule",
                "projectile_shadow": "Gule_shadow",
                "projectile_fire": "Gule_fire",
                "projectile_explosion": "Gule_explosion"
            },
            "commands": {"attack_ground": [["Obj", "me"], ["point", "pt"]]},
            "def_cmds": {"": [{"cmd": "attack_ground", "ctrl": false}, {"cmd": "attack_ground", "ctrl": true}]},
            "parent": "Catapult"
        },
        "RUIN03": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Ruin 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Fire": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "ISlinger": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "200",
                "damage": "40",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Expertise, Toughness",
                "projectile_class": "Slingstone",
                "building_projectile_class": "Slingstone",
                "icon": "gameres/icons/ISlinger.bmp",
                "display_name": "Slinger",
                "display_name_plural": "Slingers",
                "help": "contents/units/ISlinger",
                "edittree_pos": "Units/Iberia/Slinger"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "RGladiator": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "300",
                "damage": "30",
                "armor_slash": "10",
                "armor_pierce": "10",
                "speed": "80",
                "unit_specials": "Expertise, Learning",
                "icon": "gameres/icons/RGladiator.bmp",
                "display_name": "Gladiator",
                "display_name_plural": "Gladiators",
                "help": "contents/units/RGladiator",
                "edittree_pos": "Units/Roman/Gladiator"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "StonePile": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Stone pile",
                "icon": "gameres/icons/Stone pile.bmp",
                "radius": "35",
                "selection_radius": "37",
                "respawn_item": "Poison Mushroom",
                "respawn_time": "300000",
                "display_name": "Stone Pile"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "Peaceful": {
            "properties": {
                "damage_type": "none",
                "damage": "0",
                "range": "17",
                "min_range": "2",
                "radius": "15",
                "selection_radius": "15",
                "formation_priority": "100",
                "formation_radius": "26",
                "target_factor": "1000"
            },
            "commands": {
                "advance": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "This"], ["point", "pt"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "me"]]
            },
            "def_cmds": {},
            "parent": "Unit"
        },
        "Cross": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Cross"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "CGateN": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Charge": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "TGate4": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "WagonFood": {
            "properties": {"icon": "gameres/icons/Wagon.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "RWVillagerAmbient": {
            "properties": {"race": "RepublicanRome", "icon": "gameres/icons/RWoman.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "RShipyard1": {
            "properties": {
                "race": "RepublicanRome",
                "edittree_pos": "Structures/Shipyards/Stone SW",
                "icon": "gameres/icons/RShipyard.bmp",
                "radius": "410",
                "selection_radius": "415",
                "importsettlement": "RShipyard 1",
                "build_ship_variation": "0",
                "exit_vector_x": "-120",
                "exit_vector_y": "80"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "DRuins10": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 10"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CWarElephant": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "2000",
                "range": "15",
                "min_range": "0",
                "damage": "60",
                "armor_slash": "20",
                "armor_pierce": "20",
                "speed": "60",
                "unit_specials": "Trample, Regeneration, Freedom",
                "healthbar_type": "3",
                "max_food": "100",
                "radius": "40",
                "selection_radius": "40",
                "icon": "gameres/icons/CWarElephant.bmp",
                "display_name": "War Elephant",
                "display_name_plural": "War Elephants",
                "help": "contents/units/CWarElephant",
                "edittree_pos": "Units/Carthage/War Elephant"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Fogs": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BaseRuins": {
            "properties": {
                "is_central_building": "1",
                "can_be_captured": "0",
                "can_be_attacked": "0",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "0",
                "settlement_maxgold": "0",
                "population": "0",
                "efficiency": "0",
                "max_population": "0",
                "max_units": "1",
                "settlement_icon_name": "",
                "interface": "thumb,building,items",
                "itemmanage": "0",
                "minlevel": "4",
                "levelperitem": "4",
                "itemtype": "Ring of Power",
                "icon": "gameres/icons/Oracul.bmp",
                "description": "Allows heroes of the specified level to enter and obtain the item inside. Upon exiting the hero is at 10% of his full health",
                "inventory_size": "1",
                "help": "/contents/buildings/Ruins"
            }, "commands": {}, "def_cmds": {}, "parent": "Building"
        },
        "BWallsSW": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "MGate1": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Tower": {
            "properties": {
                "radius": "47",
                "selection_radius": "49",
                "non_selectable": "1",
                "auto_repair": "no",
                "display_name": "Tower",
                "help": "/contents/buildings/Fortification"
            }, "commands": {}, "def_cmds": {}, "parent": "Building"
        },
        "GBlacksmith": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GBlacksmith.bmp",
                "display_name": "Blacksmith",
                "radius": "220",
                "selection_radius": "230",
                "edittree_pos": "Structures/Stronghold (Gaul)/Blacksmith",
                "help": "/contents/buildings/GBlacksmith",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "GWallsSE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "ETownhall": {
            "properties": {
                "race": "Egypt",
                "foodperpop": "100",
                "display_name": "Egyptian Townhall",
                "icon": "gameres/icons/ETownhall.bmp",
                "radius": "170",
                "selection_radius": "175",
                "edittree_pos": "Structures/Stronghold (Egypt)/Townhall",
                "help": "/contents/buildings/ETownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "ETempleofOsirisFire": {
            "properties": {"decor_always_animate": "1"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "FakeTower": {
            "properties": {
                "sight": "600",
                "range": "600",
                "min_range": "100",
                "speed": "0",
                "maxhealth": "1500",
                "damage": "40",
                "armor_slash": "0",
                "armor_pierce": "0",
                "attack_delay": "400",
                "damage_type": "pierce",
                "projectile_class": "Arrow",
                "target_priority": "150",
                "radius": "45",
                "non_selectable": "1",
                "auto_repair": "no"
            },
            "commands": {"idle": [["Obj", "me"]], "attack": [["Obj", "This"], ["Obj", "target"]]},
            "def_cmds": {},
            "parent": "Building"
        },
        "mist_placing": {
            "properties": {"desync_hash": "0", "radius": "50", "selection_radius": "200", "sight": "95"},
            "commands": {},
            "def_cmds": {},
            "parent": "catapult_placing"
        },
        "DElephantSkeleton3": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Elephant Skeleton 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CTownhall": {
            "properties": {
                "race": "Carthage",
                "foodperpop": "100",
                "display_name": "Carthaginian Townhall",
                "icon": "gameres/icons/CTownhall.bmp",
                "radius": "170",
                "selection_radius": "175",
                "edittree_pos": "Structures/Stronghold (Carthage)/Townhall",
                "help": "/contents/buildings/CTownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "Crops1": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Crops 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GHeroWoman": {
            "properties": {
                "race": "Gaul",
                "display_name": "Morgatha",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHeroWoman.bmp",
                "edittree_pos": "Units/Heroes/Morgatha (Gaul)",
                "HeroSkills": "Leadership, Epic attack, Epic endurance, Defensive cry, Battle cry"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "Tent03": {
            "properties": {
                "display_name": "Teuton tent",
                "radius": "90",
                "selection_radius": "92",
                "edittree_pos": "Structures/Others/Tents/Tent 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Wagons": {
            "properties": {"icon": "gameres/icons/Wagon.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "MTavern2": {
            "properties": {
                "race": "ImperialRome",
                "display_name": "Tavern",
                "icon": "gameres/icons/RTavern.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Tavern SE",
                "help": "/contents/buildings/RTavern"
            }, "commands": {"buyfoodforgold": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "ERuins2": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Ruins2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GDruidHouse": {
            "properties": {
                "race": "Gaul",
                "display_name": "Druid House",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/GDruidHouse",
                "edittree_pos": "Structures/Stronghold (Gaul)/Druid House",
                "auto_repair": "no",
                "icon": "gameres/icons/Gdruidhouse.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Boat_wreck": {
            "properties": {"edittree_pos": "Structures/Water/Boat wreck", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Shrine": {
            "properties": {
                "edittree_pos": "Structures/Interactive/Shrine",
                "icon": "gameres/icons/Shrine.bmp",
                "radius": "250",
                "selection_radius": "255",
                "description": "Allows spells which have an effect on the entire map. In order to cast these spells a sage must be present near the Shrine, to ensure that it accumulates enough power for such rituals"
            }, "commands": {}, "def_cmds": {}, "parent": "Stonehenge"
        },
        "THero3b": {
            "properties": {
                "display_name": "Willamar",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "RTower01": {
            "properties": {
                "race": "RepublicanRome",
                "wall_set": "Republican Roman walls",
                "icon": "gameres/icons/RTower.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Tower"
        },
        "BGate1": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RWallsSE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CHero2c": {
            "properties": {
                "display_name": "Phameas",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "OakStump": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Oak stump",
                "icon": "gameres/icons/Oak stump.bmp",
                "radius": "70",
                "selection_radius": "72",
                "display_name": "Oak stump",
                "respawn_time": "300000",
                "respawn_item": "Healing water"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "Impassable": {
            "properties": {
                "sight": "500",
                "range": "500",
                "min_range": "100",
                "speed": "0",
                "radius": "50",
                "selection_radius": "50"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownBuilding"
        },
        "Tombstone": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Tombstone",
                "icon": "gameres/icons/Tombstone.bmp",
                "radius": "38",
                "selection_radius": "40",
                "display_name": "Tombstone",
                "respawn_time": "120000",
                "respawn_item": "Healing water"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "catapult_placing": {
            "properties": {
                "desync_hash": "0",
                "radius": "50",
                "selection_radius": "800",
                "sight": "95",
                "help": "/contents/units/Catapult"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "THero1c": {
            "properties": {
                "display_name": "Hrodric",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "IHero1b": {
            "properties": {
                "display_name": "Frouida",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "IHero2a": {
            "properties": {
                "display_name": "Pindusa",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "RHero1a": {
            "properties": {
                "display_name": "Epicydes",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "EGuardian": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "320",
                "damage": "30",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "80",
                "unit_specials": "Deflection, Ferocity",
                "icon": "gameres/icons/EGuardian.bmp",
                "display_name": "Guardian",
                "display_name_plural": "Guardians",
                "help": "contents/units/EGuardian",
                "edittree_pos": "Units/Egypt/Guardian"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Rock Medium 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "DeadTree": {
            "properties": {
                "delete_empty": "0",
                "edittree_pos": "Structures/Item holders/Dead tree",
                "icon": "gameres/icons/Dead tree.bmp",
                "radius": "30",
                "selection_radius": "40",
                "respawn_item": "Eagle feather",
                "respawn_time": "600000",
                "display_name": "Dead tree"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "GSwordsman": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "200",
                "damage": "12",
                "armor_slash": "6",
                "armor_pierce": "6",
                "speed": "80",
                "unit_specials": "Penetration, Learning",
                "formation_priority": "1200",
                "formation_radius": "26",
                "icon": "gameres/icons/GSwordsman.bmp",
                "display_name": "Swordsman",
                "display_name_plural": "Swordsmen",
                "help": "contents/units/GSwordsman",
                "edittree_pos": "Units/Gaul/Swordsman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "CWallsW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Carthaginian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Penetration": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BGate7": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IHero3c": {
            "properties": {
                "display_name": "Ataecina",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "TGate0": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Revenge": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Rhouse03": {
            "properties": {
                "race": "RepublicanRome",
                "radius": "178",
                "selection_radius": "180",
                "icon": "gameres/icons/rhouse.bmp",
                "edittree_pos": "Structures/Village (Rome)/House 1",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BearUnit": {
            "properties": {
                "maxhealth": "400",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "20",
                "selection_radius": "40",
                "sight": "400",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/Bear.bmp",
                "display_name": "Bear",
                "display_name_plural": "Bears",
                "help": "contents/units/Bear",
                "edittree_pos": "Units/Animals/Bear"
            },
            "commands": {},
            "def_cmds": {
                "": [{"cmd": "move", "ctrl": false}, {"cmd": "advance", "ctrl": true}],
                "Unit": [{"cmd": "attack", "ctrl": false}]
            },
            "parent": "AttackAnimal"
        },
        "GVillager": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GMan.bmp",
                "edittree_pos": "Units/Gaul/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "FacePillar": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Face pillar",
                "icon": "gameres/icons/Face pillar.bmp",
                "radius": "57",
                "selection_radius": "58",
                "display_name": "Face Pillar"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "GGateSE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "CampFence4": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Fence 4"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GTavern": {
            "properties": {
                "race": "Gaul",
                "display_name": "Tavern",
                "radius": "170",
                "selection_radius": "180",
                "edittree_pos": "Structures/Stronghold (Gaul)/Tavern",
                "auto_repair": "no",
                "icon": "gameres/icons/GTavern.bmp",
                "help": "/contents/buildings/GTavern"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "HeroFootman": {
            "properties": {"radius": "20", "selection_radius": "20"},
            "commands": {},
            "def_cmds": {},
            "parent": "Hero"
        },
        "GaulHero": {
            "properties": {
                "maxhealth": "1000",
                "damage": "50",
                "armor_slash": "12",
                "armor_pierce": "12",
                "race": "Gaul",
                "help": "/contents/units/GHero",
                "HeroSkills": "Leadership, Epic attack, Epic endurance, Defensive cry, Battle cry"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "CHero4": {
            "properties": {
                "race": "Carthage",
                "display_name": "Unknown",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/Anibal.bmp",
                "edittree_pos": "Units/Heroes/Unknown (Carthaginian)",
                "HeroSkills": "Vigor, Frenzy, Rush, Egoism, Wisdom"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "Bridge 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Bridges/Bridge 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Ruins 03": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Ruins 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GWallsNE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BBlacksmith": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BBlacksmith.bmp",
                "display_name": "Blacksmith",
                "radius": "220",
                "selection_radius": "230",
                "edittree_pos": "Structures/Stronghold (Britain)/Blacksmith",
                "help": "/contents/buildings/BBlacksmith",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "IGule": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MGate4": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "CTower01": {
            "properties": {
                "race": "Carthage",
                "wall_set": "Carthaginian walls",
                "icon": "gameres/icons/CTower.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Tower"
        },
        "GGateE": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "TBarrackHorse4": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "MHero3c": {
            "properties": {
                "display_name": "Claudius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "ScullTree": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Skull tree",
                "icon": "gameres/icons/Scull tree.bmp",
                "radius": "28",
                "selection_radius": "30",
                "display_name": "Skull tree"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "tcatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "RWallsS": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Death_Magic2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Field4": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Field 4"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BTower": {
            "properties": {"race": "Britain", "icon": "gameres/icons/BTower.bmp", "wall_set": "British walls"},
            "commands": {},
            "def_cmds": {},
            "parent": "Tower"
        },
        "Melee": {
            "properties": {
                "range": "17",
                "min_range": "2",
                "damage_type": "slash",
                "formation_priority": "1100",
                "formation_radius": "26",
                "radius": "15",
                "selection_radius": "15",
                "speed": "80"
            }, "commands": {"attack": [["Obj", "me"], ["Obj", "u"]]}, "def_cmds": {}, "parent": "Military"
        },
        "EWallsS": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "ICatapult": {
            "properties": {
                "race": "Iberia",
                "shot_tan": "900",
                "shot_height": "100",
                "projectile_class": "IGule",
                "projectile_shadow": "IGule_shadow",
                "projectile_fire": "Gule_fire",
                "projectile_explosion": "IGule_explosion",
                "icon": "gameres/icons/icatapult.bmp"
            },
            "commands": {"attack_ground": [["Obj", "me"], ["point", "pt"]]},
            "def_cmds": {"": [{"cmd": "attack_ground", "ctrl": false}, {"cmd": "attack_ground", "ctrl": true}]},
            "parent": "Catapult"
        },
        "RHero3": {
            "properties": {
                "display_name": "Dioges",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero3.bmp",
                "edittree_pos": "Units/Roman/Hero (Republican) 3"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "dolmen4": {
            "properties": {"edittree_pos": "Structures/Others/Sacred/Dolmen 4"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "RSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "RSentry"},
        "IWallsN": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Teleport": {
            "properties": {
                "is_central_building": "1",
                "can_be_captured": "0",
                "can_be_attacked": "0",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "0",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "0",
                "settlement_maxgold": "0",
                "population": "0",
                "efficiency": "1",
                "max_population": "0",
                "max_units": "10000",
                "settlement_icon_name": "",
                "can_be_cloned": "0",
                "icon": "gameres/icons/Teleport.bmp",
                "display_name": "Cave",
                "minimap_icon_type": "black",
                "help": "/contents/buildings/Caves",
                "description": "Allows armies to go from one cave entrance to the other instantly"
            }, "commands": {}, "def_cmds": {}, "parent": "Building"
        },
        "IWallsNE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BGate6": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RWallsN": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BJavelineer": {
            "properties": {
                "race": "Britain",
                "maxhealth": "200",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "80",
                "unit_specials": "Death blow",
                "icon": "gameres/icons/BJavelineer.bmp",
                "display_name": "Javelineer",
                "display_name_plural": "Javelineers",
                "help": "contents/units/BJavelineer",
                "edittree_pos": "Units/Britain/Javelineer"
            }, "commands": {}, "def_cmds": {}, "parent": "ShortRanged"
        },
        "BPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/BPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IHero1a": {
            "properties": {
                "display_name": "Tullonio",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "Hero": {
            "properties": {
                "range": "17",
                "min_range": "2",
                "damage_type": "slash",
                "heroarmyexpgain": "40",
                "maxhealth": "1000",
                "sight": "600",
                "speed": "120",
                "max_army": "50",
                "formation_priority": "1100",
                "formation_radius": "45",
                "radius": "30",
                "selection_radius": "32",
                "damage": "40",
                "armor_slash": "20",
                "armor_pierce": "20",
                "target_factor": "200",
                "interface": "thumb,hero,items,holder",
                "healthbar_type": "3"
            }, "commands": {
                "sleep": [["Obj", "this"]],
                "idle": [["Obj", "This"]],
                "uiadvance": [["Obj", "This"], ["point", "pt"]],
                "uipatrol": [["Obj", "This"], ["point", "pt"]],
                "uimove": [["Obj", "This"], ["point", "pt"]],
                "patrol": [["Obj", "This"], ["point", "pt"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "This"], ["point", "pt"]],
                "smartmove": [["Obj", "This"], ["point", "pt"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "enter": [["Obj", "This"], ["Obj", "bld"]],
                "formation": [["Obj", "this"]],
                "form-ranged-wings": [["Obj", "this"]],
                "approach": [["Obj", "This"], ["Obj", "other"]],
                "unittrain": [["Obj", "This"]],
                "train": [["Obj", "This"]],
                "explore": [["Obj", "This"], ["point", "pt"]],
                "teleport": [["Obj", "This"], ["Obj", "bld"]],
                "sneak": [["Obj", "This"], ["point", "pt"]],
                "retreat": [["Obj", "This"], ["point", "pt"]],
                "moveinfight": [["Obj", "This"], ["point", "pt"]],
                "engage": [["Obj", "This"]],
                "giveitem": [["Obj", "me"], ["Item", "item"], ["Obj", "h"]],
                "putitem": [["Obj", "me"], ["Item", "item"], ["Obj", "h"]],
                "getitems": [["Obj", "This"], ["Obj", "other"]],
                "dropitem": [["Obj", "me"], ["Item", "item"], ["point", "pt"]],
                "leavearmy": [["Obj", "this"]],
                "stay_hidden": [["Obj", "This"], ["Obj", "target"]],
                "unit_stay_hidden": [["Obj", "This"], ["Obj", "target"]],
                "hold_position": [["Obj", "me"]],
                "stand_position": [["Obj", "me"], ["point", "pt"]],
                "ai_attack_gate": [["Obj", "h"], ["Obj", "g"]],
                "ai_killall": [["Obj", "h"]],
                "boardshiphero": [["Obj", "This"], ["Obj", "obj"]],
                "transport": [["Obj", "This"], ["Obj", "other"]],
                "capture": [["Obj", "me"], ["Obj", "u"]],
                "attack_unit_type": [["Obj", "me"], ["Obj", "target"]],
                "engage_unit_type": [["Obj", "me"], ["Obj", "target"]],
                "taunt": [["Obj", "This"]],
                "divine_grace": [["Obj", "me"]]
            }, "def_cmds": {
                "": [{"cmd": "moveinfight", "ctrl": false}, {"cmd": "move", "ctrl": false}, {
                    "cmd": "advance",
                    "ctrl": true
                }],
                "Inn": [{"cmd": "transport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardshiphero", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Tower": [{"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Gate": [{"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Wall": [{"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "TTent": [{"cmd": "attack_independent", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Building": [{"cmd": "attack_independent", "ctrl": false}, {
                    "cmd": "capture",
                    "ctrl": false
                }, {"cmd": "attack", "ctrl": false}, {"cmd": "enter", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Teleport": [{"cmd": "teleport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Wagon": [{"cmd": "capture", "ctrl": false}],
                "Unit": [{"cmd": "stay_hidden", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}, {"cmd": "attack", "ctrl": false}],
                "ItemHolder": [{"cmd": "getitems", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            }, "parent": "Military"
        },
        "RPriest": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "120",
                "armor_slash": "10",
                "armor_pierce": "10",
                "speed": "50",
                "unit_specials": "Healing",
                "icon": "gameres/icons/RPriest.bmp",
                "display_name": "Priest",
                "display_name_plural": "Priests",
                "help": "contents/units/RPriest",
                "edittree_pos": "Units/Roman/Priest"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "THIS"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "learn": [["Obj", "This"], ["Obj", "target"]],
                "heal": [["Obj", "This"], ["point", "pt"]],
                "mist": [["Obj", "This"], ["point", "pt"]],
                "wrath_of_jupiter": [["Obj", "THIS"], ["Obj", "tgt"]]
            },
            "def_cmds": {
                "Unit": [{"cmd": "heal", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "BaseHouse": {
            "properties": {
                "house_pop_bonus": "10",
                "interface": "thumb,building",
                "auto_repair": "yes",
                "maxhealth": "1000",
                "help": "/contents/buildings/House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBuilding"
        },
        "CWallsSE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "EHouse1": {
            "properties": {
                "race": "Egypt",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/ehouse.bmp",
                "edittree_pos": "Structures/Village (Egypt)/House 1",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Wolf": {
            "properties": {"edittree_pos": "Units/Animals/Wolf (aggressive)"},
            "commands": {
                "idle": [["Obj", "me"]],
                "attack": [["Obj", "me"], ["Obj", "tgt"]],
                "lead": [["Obj", "This"]],
                "engage": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "advance": [["Obj", "me"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "WolfUnit"
        },
        "RWallsE": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Republican Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TTempleOfNeptus": {
            "properties": {
                "race": "Germany",
                "display_name": "Temple of Neptus",
                "radius": "165",
                "selection_radius": "170",
                "auto_repair": "no",
                "icon": "gameres/icons/TTempleOfNeptus.bmp",
                "help": "/contents/buildings/TTemple",
                "edittree_pos": "Structures/Stronghold (Germany)/Temple of Neptus"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "BaseShipyard": {
            "properties": {
                "display_name": "Shipyard",
                "icon": "gameres/icons/GShipyard.bmp",
                "radius": "410",
                "selection_radius": "430",
                "interface": "thumb,building,queue",
                "maxhealth": "5000",
                "sight": "900",
                "auto_repair": "yes",
                "repair_rate": "250",
                "help": "/contents/buildings/Shipyard",
                "is_central_building": "1",
                "can_be_captured": "1",
                "can_be_attacked": "1",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_food": "150",
                "settlement_gold": "0",
                "settlement_maxfood": "10000",
                "settlement_maxgold": "10000",
                "population": "0",
                "efficiency": "0",
                "max_population": "0",
                "max_units": "0",
                "snapdistance": "64",
                "minimap_icon_type": "color"
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "tribute": [["Obj", "this"], ["Obj", "To"]],
                "tribute_default": [["Obj", "this"], ["Obj", "To"]],
                "stoptribute": [["Obj", "this"]],
                "build_ship": [["Obj", "This"]],
                "createfoodmulesmall": [["Obj", "This"]],
                "createfoodmulebig": [["Obj", "This"]],
                "creategoldmulesmall": [["Obj", "This"]],
                "creategoldmulebig": [["Obj", "This"]],
                "createfoodboatsmall": [["Obj", "This"]],
                "createfoodboatbig": [["Obj", "This"]],
                "creategoldboatsmall": [["Obj", "This"]],
                "creategoldboatbig": [["Obj", "This"]]
            },
            "def_cmds": {
                "BaseTownhall": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseVillage": [{"cmd": "tribute_default", "ctrl": false}],
                "Outpost": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseShipyard": [{"cmd": "tribute_default", "ctrl": false}]
            },
            "parent": "Building"
        },
        "EgyptianHero": {
            "properties": {
                "maxhealth": "1200",
                "damage": "40",
                "armor_slash": "20",
                "armor_pierce": "20",
                "race": "Egypt",
                "HeroSkills": "Recovery, Vigor, Survival, Quick March, Healing",
                "help": "/contents/units/EHero"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "IGateN": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Keltill": {
            "properties": {
                "race": "Gaul",
                "sight": "500",
                "display_name": "Keltill",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/Keltil.bmp",
                "edittree_pos": "Units/Heroes/Keltill (Gaul)",
                "HeroSkills": "Leadership, Epic attack, Epic endurance, Defensive cry, Battle cry"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "BoarUnit": {
            "properties": {
                "maxhealth": "400",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "20",
                "selection_radius": "40",
                "sight": "400",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/Boar.bmp",
                "display_name": "Boar",
                "display_name_plural": "Boars",
                "help": "contents/units/Boar",
                "edittree_pos": "Units/Animals/Boar"
            },
            "commands": {},
            "def_cmds": {
                "": [{"cmd": "move", "ctrl": false}, {"cmd": "advance", "ctrl": true}],
                "Unit": [{"cmd": "attack", "ctrl": false}]
            },
            "parent": "AttackAnimal"
        },
        "DefensiveCry": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "CWVillagerAmbient": {
            "properties": {"race": "Carthage", "icon": "gameres/icons/CWVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "BDruid": {
            "properties": {
                "race": "Britain",
                "maxhealth": "140",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "50",
                "unit_specials": "Invisibility",
                "icon": "gameres/icons/BDruid.bmp",
                "display_name": "Druid",
                "display_name_plural": "Druids",
                "help": "contents/units/BDruid",
                "edittree_pos": "Units/Britain/Druid"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "me"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "blearn": [["Obj", "This"], ["Obj", "target"]],
                "hide": [["Obj", "This"], ["point", "pt"]],
                "b_ghoul_summoning": [["Obj", "This"]],
                "ghost": [["Obj", "This"]],
                "wolf_summoning": [["Obj", "This"]],
                "b_mass_heal": [["Obj", "This"]]
            },
            "def_cmds": {
                "Unit": [{"cmd": "hide", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "GermanHero": {
            "properties": {
                "maxhealth": "1300",
                "damage": "70",
                "armor_slash": "10",
                "armor_pierce": "10",
                "race": "Germany",
                "HeroSkills": "Concealment, Defensive cry, Quick March, Assault, Euphoria",
                "help": "/contents/units/THero"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "IWVillager": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWVillager.bmp",
                "edittree_pos": "Units/Iberia/Peasant (female)"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantFemale"
        },
        "GGateNW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "DColumn": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Column"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CShaman": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "120",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "50",
                "unit_specials": "Curse",
                "icon": "gameres/icons/CShaman.bmp",
                "display_name": "Shaman",
                "display_name_plural": "Shamans",
                "help": "contents/units/CShaman",
                "edittree_pos": "Units/Carthage/Shaman",
                "shaman_food_gain": "2"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "learn": [["Obj", "This"], ["Obj", "target"]],
                "curse": [["Obj", "This"], ["Obj", "target"]],
                "zombify": [["Obj", "This"]]
            },
            "def_cmds": {
                "Military": [{"cmd": "curse", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "MHero2c": {
            "properties": {
                "display_name": "Flavius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "Bear": {
            "properties": {"edittree_pos": "Units/Animals/Bear (aggressive)"},
            "commands": {
                "idle": [["Obj", "This"]],
                "engage": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "me"], ["Obj", "tgt"]],
                "advance": [["Obj", "me"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BearUnit"
        },
        "ShipS": {
            "properties": {
                "display_name": "Boat",
                "display_name_plural": "Boats",
                "armor_slash": "0",
                "armor_pierce": "5",
                "maxhealth": "400",
                "sight": "400",
                "radius": "90",
                "selection_radius": "80",
                "speed": "100",
                "help": "/contents/units/Boat",
                "healthbar_type": "0",
                "edittree_pos": "Units/Others/Boat",
                "icon": "gameres/icons/Boat.bmp",
                "water_unit": "1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wagon"
        },
        "Parry": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Assault2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BHouse01": {
            "properties": {
                "race": "Britain",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/bhouse.bmp",
                "edittree_pos": "Structures/Village (Britain)/House 1",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "RUIN01": {
            "properties": {
                "radius": "10",
                "selection_radius": "10",
                "edittree_pos": "Structures/Others/Europe/Ruin 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GHorseman": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "380",
                "damage": "26",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "160",
                "unit_specials": "Charge",
                "healthbar_type": "3",
                "icon": "gameres/icons/GHorseman.bmp",
                "display_name": "Horseman",
                "display_name_plural": "Horsemen",
                "help": "contents/units/GHorseman",
                "edittree_pos": "Units/Gaul/Horseman"
            }, "commands": {}, "def_cmds": {}, "parent": "Horse"
        },
        "GSentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "GSentry"},
        "CropsField": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Crops field"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "GHero2b": {
            "properties": {
                "display_name": "Unferth",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "Column Lion 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Column Lion 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Feedback": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "Arrow": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "ICavalry": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "240",
                "damage": "34",
                "armor_slash": "4",
                "armor_pierce": "4",
                "speed": "160",
                "unit_specials": "Charge",
                "healthbar_type": "3",
                "icon": "gameres/icons/ICavalry.bmp",
                "display_name": "Cavalry",
                "display_name_plural": "Cavalry",
                "help": "contents/units/ICavalry",
                "edittree_pos": "Units/Iberia/Cavalry"
            }, "commands": {}, "def_cmds": {}, "parent": "Horse"
        },
        "MGate5": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/MGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "TTower": {
            "properties": {"race": "Germany", "wall_set": "German walls", "icon": "gameres/icons/TTower.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Tower"
        },
        "TWVillagerAmbient": {
            "properties": {"race": "Germany", "icon": "gameres/icons/TWVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "EBlacksmith": {
            "properties": {
                "race": "Egypt",
                "display_name": "Blacksmith",
                "icon": "gameres/icons/EBlacksmith.bmp",
                "radius": "255",
                "selection_radius": "260",
                "edittree_pos": "Structures/Stronghold (Egypt)/Blacksmith",
                "help": "/contents/buildings/EBlacksmith"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "DefItemHolder": {
            "properties": {
                "delete_empty": "1",
                "edittree_pos": "Structures/Item holders/Leather bag",
                "icon": "gameres/icons/Leather bag.bmp",
                "radius": "19",
                "selection_radius": "20",
                "display_name": "Leather bag"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "Animal": {
            "properties": {"unit_specials": "Freedom"},
            "commands": {"move": [["Obj", "This"], ["point", "pt"]]},
            "def_cmds": {"": [{"cmd": "move", "ctrl": false}]},
            "parent": "BaseAnimal"
        },
        "EPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/EPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "WolfSummoned": {
            "properties": {"edittree_pos": "", "does_not_regenerate": "1", "stamina_dec_time": "18000"},
            "commands": {},
            "def_cmds": {},
            "parent": "WolfUnit"
        },
        "IGateS": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Lightning": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BVillage": {
            "properties": {
                "race": "Britain",
                "foodperpop": "45",
                "icon": "gameres/icons/BVillage.bmp",
                "edittree_pos": "Structures/Village (Britain)/Village hall",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "EAxetrower": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "260",
                "damage": "20",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "60",
                "unit_specials": "Triple strike",
                "projectile_class": "Axe",
                "building_projectile_class": "Axe",
                "icon": "gameres/icons/EAxetrower.bmp",
                "display_name": "Axe Thrower",
                "display_name_plural": "Axe Throwers",
                "help": "contents/units/EAxetrower",
                "edittree_pos": "Units/Egypt/Axe Thrower"
            }, "commands": {}, "def_cmds": {}, "parent": "ShortRanged"
        },
        "GTridentWarrior": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "1200",
                "damage": "80",
                "armor_slash": "14",
                "armor_pierce": "14",
                "speed": "80",
                "unit_specials": "Triumph, Freedom",
                "icon": "gameres/icons/GTridentWarrior.bmp",
                "display_name": "Trident Warrior",
                "display_name_plural": "Trident Warriors",
                "help": "contents/units/GTridentWarrior",
                "edittree_pos": "Units/Gaul/Trident Warrior"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "COLUMNS1": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Columns1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Boar": {
            "properties": {"edittree_pos": "Units/Animals/Boar (aggressive)"},
            "commands": {
                "idle": [["Obj", "This"]],
                "engage": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "me"], ["Obj", "tgt"]],
                "advance": [["Obj", "me"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BoarUnit"
        },
        "THouse1": {
            "properties": {
                "race": "Germany",
                "radius": "60",
                "selection_radius": "60",
                "icon": "gameres/icons/Thouse.bmp",
                "edittree_pos": "Structures/Village (Germany)/House 1",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "ERUINS": {
            "properties": {
                "radius": "20",
                "selection_radius": "20",
                "edittree_pos": "Structures/Others/Egypt/Ruins"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "WELL": {
            "properties": {
                "radius": "20",
                "selection_radius": "30",
                "edittree_pos": "Structures/Item holders/Stone Well",
                "icon": "gameres/icons/stone well.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "BattleCry": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "CGateW": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Carthaginian walls",
                "sentry_class_name": "CSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "ruins": {
            "properties": {"edittree_pos": "Structures/Others/Ruins"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TBlacksmith": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TBlacksmith.bmp",
                "display_name": "Blacksmith",
                "radius": "220",
                "selection_radius": "230",
                "edittree_pos": "Structures/Stronghold (Germany)/Blacksmith",
                "help": "/contents/buildings/TBlacksmith",
                "auto_repair": "no"
            },
            "commands": {
                "axemen_school": [["Obj", "This"]],
                "huntress_school": [["Obj", "This"]],
                "teutonrider_school": [["Obj", "This"]],
                "macemen_school": [["Obj", "This"]]
            },
            "def_cmds": {},
            "parent": "BaseBlacksmith"
        },
        "ImperialRomanHero": {
            "properties": {
                "maxhealth": "1300",
                "damage": "30",
                "armor_slash": "16",
                "armor_pierce": "16",
                "race": "ImperialRome",
                "help": "/contents/units/RHero",
                "HeroSkills": "Administration, Team attack, Team defense, Quick March, Discipline"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "BOutpost": {
            "properties": {
                "race": "Britain",
                "maxhealth": "10000",
                "icon": "gameres/icons/BOutpost.bmp",
                "display_name": "Military post",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Military post (Britain)",
                "help": "/contents/buildings/BOutpost",
                "description": "Gradually increases the experience of all warriors inside the outpost until they reach level 8",
                "range": "1000",
                "settlement_food": "2000",
                "settlement_gold": "0",
                "defender_cls_1": "BHighlander",
                "defenders_max_1": "10",
                "defenders_out_1": "6",
                "start_level_1": "1",
                "end_level_1": "12"
            }, "commands": {}, "def_cmds": {}, "parent": "Outpost"
        },
        "EGate7": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Rock Medium 05": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 5"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "GVillagerAmbient": {
            "properties": {"race": "Gaul", "icon": "gameres/icons/GMan.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "MWallsSW": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "Toro 1": {
            "properties": {
                "radius": "70",
                "selection_radius": "70",
                "edittree_pos": "Structures/Others/Ruins/Bull 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BaseTownhall": {
            "properties": {
                "radius": "160",
                "selection_radius": "165",
                "auto_repair": "no",
                "is_central_building": "1",
                "can_be_captured": "1",
                "can_be_attacked": "1",
                "produces_gold": "1",
                "produces_food": "0",
                "is_single_building": "0",
                "settlement_food": "200",
                "settlement_gold": "2500",
                "settlement_maxfood": "100000000",
                "settlement_maxgold": "100000000",
                "population": "40",
                "efficiency": "1",
                "max_population": "100",
                "max_units": "10000",
                "interface": "thumb,building,holder",
                "minimap_icon_type": "color"
            },
            "commands": {
                "unitsout": [["Obj", "This"], ["point", "pt"]],
                "createfoodmulesmall": [["Obj", "This"]],
                "createfoodmulebig": [["Obj", "This"]],
                "creategoldmulesmall": [["Obj", "This"]],
                "creategoldmulebig": [["Obj", "This"]],
                "autotrain_start": [["Obj", "This"]],
                "autotrain_stop": [["Obj", "This"]],
                "military_training": [["Obj", "This"]],
                "refreshment": [["Obj", "This"]],
                "healing": [["Obj", "This"]]
            },
            "def_cmds": {"": [{"cmd": "unitsout", "ctrl": false}]},
            "parent": "BaseTownBuilding"
        },
        "tent01": {
            "properties": {
                "display_name": "Teuton tent",
                "radius": "90",
                "selection_radius": "92",
                "edittree_pos": "Structures/Others/Tents/Tent 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BGate4": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "OffensiveTactics": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "TTeutonRider": {
            "properties": {
                "race": "Germany",
                "maxhealth": "300",
                "damage": "30",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "160",
                "unit_specials": "Attack skill",
                "healthbar_type": "3",
                "icon": "gameres/icons/TTeutonRider.bmp",
                "display_name": "Teuton Rider",
                "display_name_plural": "Teuton Riders",
                "help": "contents/units/TRider",
                "edittree_pos": "Units/Germany/Teuton Rider"
            },
            "commands": {"toTeutonArcher": [["Obj", "This"]], "enter_tent": [["Obj", "This"], ["Obj", "bld"]]},
            "def_cmds": {},
            "parent": "Horse"
        },
        "CampTent2": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tent 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "IArcher": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "180",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Drain",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/IArcher.bmp",
                "display_name": "Archer",
                "display_name_plural": "Archers",
                "help": "contents/units/IArcher",
                "edittree_pos": "Units/Iberia/Archer"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "RWallsW": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "Republican Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "RSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "LionF": {
            "properties": {
                "maxhealth": "300",
                "damage": "16",
                "armor_slash": "2",
                "armor_pierce": "2",
                "damage_type": "slash",
                "radius": "40",
                "selection_radius": "40",
                "sight": "600",
                "speed": "50",
                "healthbaroffset": "-30",
                "icon": "gameres/icons/lionF.bmp",
                "display_name": "Lioness",
                "display_name_plural": "Lionesses",
                "help": "contents/units/Lioness",
                "edittree_pos": "Units/Animals/Lioness (aggressive)"
            },
            "commands": {
                "idle": [["Obj", "me"]],
                "attack": [["Obj", "me"], ["Obj", "tgt"]],
                "lead": [["Obj", "This"]],
                "engage": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "advance": [["Obj", "me"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "BaseAnimal"
        },
        "GDruid": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "120",
                "armor_slash": "2",
                "armor_pierce": "2",
                "speed": "50",
                "unit_specials": "Healing, Sneak",
                "icon": "gameres/icons/GDruid.bmp",
                "display_name": "Druid",
                "display_name_plural": "Druids",
                "help": "contents/units/GDruid",
                "edittree_pos": "Units/Gaul/Druid"
            },
            "commands": {
                "stand_position": [["Obj", "This"]],
                "ondie": [["Obj", "This"]],
                "advance": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "This"]],
                "glearn": [["Obj", "This"], ["Obj", "target"]],
                "heal": [["Obj", "This"], ["point", "pt"]],
                "ghoul_summoning": [["Obj", "This"]],
                "eagle_summoning": [["Obj", "This"]],
                "restoration": [["Obj", "This"]]
            },
            "def_cmds": {
                "Unit": [{"cmd": "heal", "ctrl": false}],
                "Hero": [{"cmd": "attach", "ctrl": false}],
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "BaseMage"
        },
        "RPeasantMulti": {
            "properties": {
                "icon": "gameres/icons/RPeasants.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "MTownhall": {
            "properties": {
                "race": "ImperialRome",
                "foodperpop": "100",
                "display_name": "Imperial Roman Townhall",
                "icon": "gameres/icons/MTownhall.bmp",
                "radius": "170",
                "selection_radius": "175",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Townhall",
                "help": "/contents/buildings/RTownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "CHero2b": {
            "properties": {
                "display_name": "Asdrubal",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "TTempleofNeptusWell": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "EMarket": {
            "properties": {
                "race": "Egypt",
                "display_name": "Market",
                "icon": "gameres/icons/EMarket.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Egypt)/Market",
                "help": "/contents/buildings/ETavern"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "RVillage": {
            "properties": {
                "race": "RepublicanRome",
                "radius": "230",
                "selection_radius": "250",
                "icon": "gameres/icons/RStorage.bmp",
                "edittree_pos": "Structures/Village (Rome)/Village hall",
                "foodperpop": "100",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        },
        "HeroMounted": {
            "properties": {"radius": "30", "selection_radius": "32"},
            "commands": {},
            "def_cmds": {},
            "parent": "Hero"
        },
        "GHero1a": {
            "properties": {
                "display_name": "Hengest",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "EWallsSW": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CHero1c": {
            "properties": {
                "display_name": "Bythia",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "BHero1b": {
            "properties": {
                "display_name": "Reduald",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "BWallsW": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BWalls.bmp",
                "radius": "80",
                "selection_radius": "80",
                "wall_set": "British walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "BSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "BHighlander": {
            "properties": {
                "race": "Britain",
                "maxhealth": "500",
                "damage": "50",
                "armor_slash": "6",
                "armor_pierce": "6",
                "speed": "80",
                "unit_specials": "Deflection",
                "icon": "gameres/icons/BHighlander.bmp",
                "display_name": "Highlander",
                "display_name_plural": "Highlanders",
                "help": "contents/units/BHighlander",
                "edittree_pos": "Units/Britain/Highlander"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "DefensiveCry2": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BVillagerAmbient": {
            "properties": {"race": "Britain", "icon": "gameres/icons/BVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "RHero1b": {
            "properties": {
                "display_name": "Gallio",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "CHero3b": {
            "properties": {
                "display_name": "Saunites",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "Crops2": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Crops 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BSwordsman": {
            "properties": {
                "race": "Britain",
                "maxhealth": "160",
                "damage": "12",
                "armor_slash": "6",
                "armor_pierce": "6",
                "speed": "80",
                "unit_specials": "Attack skill",
                "icon": "gameres/icons/BSwordsman.bmp",
                "display_name": "Swordsman",
                "display_name_plural": "Swordsmen",
                "help": "contents/units/BSwordsman",
                "edittree_pos": "Units/Britain/Swordsman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "MultiOne": {
            "properties": {
                "icon": "gameres/icons/multi.bmp",
                "help": "contents/units",
                "interface": "thumb,unit"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TSentry": {
            "properties": {
                "race": "Germany",
                "maxhealth": "200",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/TArcher.bmp",
                "unit_specials": "Attack skill, Active, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "StaminaLoss": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "ShipBattle": {
            "properties": {
                "maxhealth": "3000",
                "sight": "700",
                "damage": "100",
                "armor_slash": "10",
                "armor_pierce": "15",
                "range": "700",
                "max_units_to_board": "60",
                "unit_specials": "",
                "healthbar_type": "0",
                "damage_type": "pierce",
                "water_unit": "1",
                "radius": "90",
                "selection_radius": "90",
                "speed": "240",
                "interface": "thumb,unit,holder",
                "projectile_class": "Big_Arrow",
                "building_projectile_class": "Big_Arrow",
                "icon": "gameres/icons/Ship.bmp",
                "display_name": "Ship",
                "display_name_plural": "Ships",
                "help": "/contents/units/Ship",
                "edittree_pos": "Units/Others/Ship"
            },
            "commands": {
                "boardunit": [["Obj", "This"], ["Obj", "ToBoard"]],
                "unboard": [["Obj", "This"], ["ObjList", "ol"], ["point", "pt"]],
                "unboardall": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "me"]],
                "aitransport": [["Obj", "obj"]],
                "enter": [["Obj", "This"], ["Obj", "Bld"]],
                "move": [["Obj", "This"], ["point", "pt"]]
            },
            "def_cmds": {
                "ShipBattle": [{"cmd": "attack", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "ShipS": [{"cmd": "attack", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Unit": [{"cmd": "boardunit", "ctrl": false}, {"cmd": "attack", "ctrl": false}, {
                    "cmd": "approach",
                    "ctrl": false
                }],
                "Building": [{"cmd": "attack", "ctrl": false}, {"cmd": "approach", "ctrl": false}]
            },
            "parent": "Ranged"
        },
        "RHero1c": {
            "properties": {
                "display_name": "Durio",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "IHero3": {
            "properties": {
                "display_name": "Baraeco",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero3.bmp",
                "edittree_pos": "Units/Iberia/Hero 3"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "RArena": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/rarena.bmp",
                "display_name": "Arena",
                "radius": "360",
                "selection_radius": "365",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Arena",
                "help": "/contents/buildings/RArena"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "EWallsNE": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "EGate0": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BGate3": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Ruin_Door01": {
            "properties": {
                "health": "100",
                "maxhealth": "100",
                "edittree_pos": "Structures/Others/Ruins/Ruin Door 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Outpost": {
            "properties": {
                "maxhealth": "5000",
                "sight": "1400",
                "display_name": "Outpost",
                "radius": "345",
                "selection_radius": "350",
                "capture_health_percent": "50",
                "is_central_building": "1",
                "can_be_captured": "1",
                "can_be_attacked": "1",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_maxfood": "10000",
                "settlement_maxgold": "10000",
                "population": "0",
                "efficiency": "0",
                "max_population": "0",
                "max_units": "10000",
                "minimap_icon_type": "color",
                "description": "Outpost building",
                "interface": "thumb,building,holder"
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "tribute": [["Obj", "this"], ["Obj", "To"]],
                "tribute_default": [["Obj", "this"], ["Obj", "To"]],
                "createfoodmulesmall": [["Obj", "This"]],
                "createfoodmulebig": [["Obj", "This"]],
                "creategoldmulesmall": [["Obj", "This"]],
                "creategoldmulebig": [["Obj", "This"]],
                "stoptribute": [["Obj", "this"]],
                "attack": [["Obj", "This"], ["Obj", "target"]]
            },
            "def_cmds": {
                "": [{"cmd": "unitsout", "ctrl": false}],
                "BaseTownhall": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseVillage": [{"cmd": "tribute_default", "ctrl": false}],
                "Outpost": [{"cmd": "tribute_default", "ctrl": false}],
                "BaseShipyard": [{"cmd": "tribute_default", "ctrl": false}]
            },
            "parent": "Building"
        },
        "Inn": {
            "properties": {
                "display_name": "Inn",
                "icon": "gameres/icons/inn.bmp",
                "radius": "270",
                "selection_radius": "280",
                "edittree_pos": "Structures/Interactive/Inn",
                "maxhealth": "15000",
                "sight": "900",
                "minimap_icon_type": "black",
                "is_central_building": "1",
                "can_be_captured": "0",
                "can_be_attacked": "1",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "0",
                "settlement_maxgold": "0",
                "population": "0",
                "efficiency": "1",
                "max_population": "0",
                "max_units": "0",
                "settlement_icon_name": "",
                "help": "/contents/buildings/Inn"
            }, "commands": {"transport_request": [["Obj", "b"]]}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BBarracks": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BBarracks.bmp",
                "display_name": "Barracks",
                "display_name_plural": "Barracks",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/BBarracks",
                "edittree_pos": "Structures/Stronghold (Britain)/Barracks",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Haystack Small": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Fields/Haystack Small"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "TValkyrie": {
            "properties": {
                "race": "Germany",
                "maxhealth": "400",
                "damage": "30",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "160",
                "unit_specials": "Power strike, Toughness",
                "healthbar_type": "3",
                "icon": "gameres/icons/TValkyrie.bmp",
                "display_name": "Valkyrie",
                "display_name_plural": "Valkyries",
                "help": "contents/units/TValkyrie",
                "edittree_pos": "Units/Germany/Valkyrie"
            }, "commands": {}, "def_cmds": {}, "parent": "Horse"
        },
        "EHero2c": {
            "properties": {
                "display_name": "Hekatef",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "COLUMN ALONE2": {
            "properties": {
                "radius": "40",
                "selection_radius": "40",
                "edittree_pos": "Structures/Others/Egypt/Column Alone 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RPraetorian": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "600",
                "damage": "40",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "60",
                "unit_specials": "Spike armor, Combat skill",
                "formation_priority": "1000",
                "formation_radius": "26",
                "icon": "gameres/icons/RPraetorian.bmp",
                "display_name": "Praetorian",
                "display_name_plural": "Praetorians",
                "help": "contents/units/RPraetorian",
                "edittree_pos": "Units/Roman/Praetorian"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Watersteps": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "GSentry": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "140",
                "damage": "6",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/GArcher.bmp",
                "unit_specials": "Attack skill, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "EChariot": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "600",
                "damage": "40",
                "armor_slash": "16",
                "armor_pierce": "16",
                "speed": "120",
                "unit_specials": "Disease attack, Freedom",
                "healthbar_type": "3",
                "radius": "40",
                "selection_radius": "60",
                "icon": "gameres/icons/EChariot.bmp",
                "display_name": "Chariot of Osiris",
                "display_name_plural": "Chariots of Osiris",
                "help": "contents/units/EChariot",
                "edittree_pos": "Units/Egypt/Chariot of Osiris"
            }, "commands": {"engage": [["Obj", "me"]]}, "def_cmds": {}, "parent": "Ranged"
        },
        "TTeutonArcher": {
            "properties": {
                "race": "Germany",
                "maxhealth": "300",
                "damage": "10",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "160",
                "unit_specials": "Attack skill",
                "healthbar_type": "3",
                "formation_radius": "35",
                "radius": "30",
                "selection_radius": "32",
                "icon": "gameres/icons/TTeutonArcher.bmp",
                "display_name": "Teuton Archer",
                "display_name_plural": "Teuton Archers",
                "help": "contents/units/TArcher",
                "edittree_pos": "Units/Germany/Teuton Archer"
            },
            "commands": {"toTeutonRider": [["Obj", "This"]], "enter_tent": [["Obj", "This"], ["Obj", "bld"]]},
            "def_cmds": {},
            "parent": "Ranged"
        },
        "GArena1": {
            "properties": {
                "race": "Gaul",
                "display_name": "Arena",
                "radius": "240",
                "selection_radius": "300",
                "edittree_pos": "Structures/Stronghold (Gaul)/Arena SW",
                "help": "/contents/buildings/GArena",
                "icon": "gameres/icons/GArena.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "IGule_fire": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "RTavern2": {
            "properties": {
                "race": "RepublicanRome",
                "display_name": "Tavern",
                "icon": "gameres/icons/RTavern.bmp",
                "radius": "190",
                "selection_radius": "195",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Tavern SE",
                "help": "/contents/buildings/RTavern"
            }, "commands": {"buyfoodforgold": [["Obj", "This"]]}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "GHero1": {
            "properties": {
                "display_name": "Mraxis",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero1.bmp",
                "edittree_pos": "Units/Gaul/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "OldManE": {
            "properties": {
                "race": "Gaul",
                "radius": "20",
                "selection_radius": "20",
                "edittree_pos": "Units/Others/Old Man Europe"
            }, "commands": {}, "def_cmds": {}, "parent": "PeasantAmbient"
        },
        "SpikedArmor": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "DSkeleton1": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Skeleton 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Heal": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "TreeTrunk": {
            "properties": {
                "delete_empty": "0",
                "edittree_pos": "Structures/Item holders/Tree trunk",
                "icon": "gameres/icons/Tree trunk.bmp",
                "radius": "30",
                "selection_radius": "40",
                "display_name": "Tree trunk",
                "respawn_item": "Healing herbs",
                "respawn_time": "120000"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "BaseArena": {
            "properties": {"interface": "thumb,building,queue", "auto_repair": "no"},
            "commands": {"hirehero": [["Obj", "This"]], "trainex": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "BaseTownBuilding"
        },
        "GHouse2": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "106",
                "selection_radius": "110",
                "edittree_pos": "Structures/Village (Gaul)/House 2"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "Invisibility": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "IHouse1": {
            "properties": {
                "race": "Iberia",
                "display_name": "House",
                "icon": "gameres/icons/ihouse.bmp",
                "radius": "110",
                "selection_radius": "112",
                "edittree_pos": "Structures/Village (Iberia)/House 1"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "MWallsNW": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "well2": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Large well",
                "icon": "gameres/icons/Large well.bmp",
                "radius": "350",
                "selection_radius": "275",
                "help": "/contents/buildings/Well"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseWell"
        },
        "MHero1b": {
            "properties": {
                "display_name": "Nasennius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "IHero3a": {
            "properties": {
                "display_name": "Verora",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "GetItem": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "GAxeman": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "220",
                "damage": "40",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "60",
                "unit_specials": "Offensive tactics, Ferocity",
                "icon": "gameres/icons/GAxeman.bmp",
                "display_name": "Axeman",
                "display_name_plural": "Axemen",
                "help": "contents/units/GAxeman",
                "edittree_pos": "Units/Gaul/Axeman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "Column Tall": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Ruins/Column Tall"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Damage1": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "BHero1": {
            "properties": {
                "display_name": "Gawain",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/BHero1.bmp",
                "edittree_pos": "Units/Britain/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "BritonHero"
        },
        "THero3a": {
            "properties": {
                "display_name": "Mangod",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "WaterRocks04": {
            "properties": {"edittree_pos": "Structures/Water/Rocks 4", "water_unit": "1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "TBarrackHorse2": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "Pyramid1": {
            "properties": {
                "radius": "40",
                "selection_radius": "120",
                "edittree_pos": "Structures/Others/Egypt/Pyramid1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "LionThrone": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Lion throne",
                "icon": "gameres/icons/Lion throne.bmp",
                "radius": "57",
                "selection_radius": "58",
                "display_name": "Lion Throne"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "IHero1c": {
            "properties": {
                "display_name": "Atennes",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "RHero3a": {
            "properties": {
                "display_name": "Tarautas",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/RHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "RepublicanRomanHero"
        },
        "ECatapult": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/ebalista.bmp",
                "shot_tan": "600",
                "shot_height": "100",
                "projectile_class": "CGule",
                "projectile_shadow": "CGule_shadow",
                "projectile_fire": "Gule_fire",
                "projectile_explosion": "CGule_explosion"
            },
            "commands": {"attack_ground": [["Obj", "me"], ["point", "pt"]]},
            "def_cmds": {"": [{"cmd": "attack_ground", "ctrl": false}, {"cmd": "attack_ground", "ctrl": true}]},
            "parent": "Catapult"
        },
        "Rock Medium 07": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 7"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "THero1a": {
            "properties": {
                "display_name": "Gautbehrt",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "BTownhall": {
            "properties": {
                "race": "Britain",
                "foodperpop": "100",
                "display_name": "British Townhall",
                "icon": "gameres/icons/BTownhall.bmp",
                "radius": "170",
                "selection_radius": "175",
                "edittree_pos": "Structures/Stronghold (Britain)/Townhall",
                "help": "/contents/buildings/BTownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "Rock Large 02": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Large 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "IGule_explosion": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "DRuins7": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Ruins 7"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Empty": {"properties": {"interface": "empty"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MHero2b": {
            "properties": {
                "display_name": "Bruttius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "SphinxSmall3": {
            "properties": {
                "radius": "60",
                "selection_radius": "60",
                "edittree_pos": "Structures/Others/Egypt/Sphynx Small 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "Rock Medium 03": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 3"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RCatapult": {
            "properties": {
                "display_name": "Tower",
                "race": "RepublicanRome",
                "icon": "gameres/icons/Roman Tower.bmp",
                "range": "700",
                "min_range": "201"
            },
            "commands": {"attack": [["Obj", "me"], ["Obj", "target"]], "autofire": [["Obj", "This"]]},
            "def_cmds": {
                "Building": [{"cmd": "catapult_attack", "ctrl": false}, {
                    "cmd": "catapult_attack",
                    "ctrl": true
                }], "Unit": [{"cmd": "catapult_attack", "ctrl": false}, {"cmd": "catapult_attack", "ctrl": true}]
            },
            "parent": "Catapult"
        },
        "GWallsNW": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "sentry_class_name": "GSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TMaceman": {
            "properties": {
                "race": "Germany",
                "maxhealth": "600",
                "damage": "50",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "80",
                "unit_specials": "Expertise",
                "icon": "gameres/icons/TMaceman.bmp",
                "display_name": "Maceman",
                "display_name_plural": "Macemen",
                "help": "contents/units/TMaceman",
                "edittree_pos": "Units/Germany/Maceman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "CHero2a": {
            "properties": {
                "display_name": "Muttines",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "MHero1a": {
            "properties": {
                "display_name": "Plinius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "Eagle": {
            "properties": {
                "display_name": "Eagle",
                "display_name_plural": "Eagles",
                "help": "contents/units/Eagle",
                "damage_type": "none",
                "damage": "0",
                "radius": "25",
                "selection_radius": "25",
                "edittree_pos": "Units/Animals/Eagle",
                "sight": "900",
                "feeds": "0",
                "target_factor": "-1",
                "healthbaroffset": "-30",
                "maxhealth": "30",
                "initial_z": "200",
                "speed": "180",
                "no_transparent_draw": "1",
                "icon": "gameres/icons/eagle.bmp",
                "healthbar_type": "0"
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "hover": [["Obj", "This"], ["point", "pt"]],
                "lesser_hover": [["Obj", "This"], ["point", "pt"]]
            },
            "def_cmds": {"": [{"cmd": "move", "ctrl": false}]},
            "parent": "Animal"
        },
        "MutableStronghold": {
            "properties": {
                "race": "Mutable",
                "foodperpop": "100",
                "display_name": "Any Race Stronghold",
                "icon": "gameres/icons/Rtownhall.bmp",
                "radius": "1000",
                "selection_radius": "1000",
                "edittree_pos": "Structures/Any Race Stronghold",
                "help": "/contents/buildings/RTownhall"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTownhall"
        },
        "GWallsN": {
            "properties": {
                "race": "Gaul",
                "icon": "gameres/icons/GWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Gaul walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "GSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "CHero1a": {
            "properties": {
                "display_name": "Xanthippus",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/CHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "CarthaginianHero"
        },
        "GHero4b": {
            "properties": {
                "display_name": "Selred",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/GHero4.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GaulHero"
        },
        "TGate1": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "EHero1c": {
            "properties": {
                "display_name": "Unis",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero1.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "BCatapult": {
            "properties": {
                "race": "Britain",
                "display_name": "Ram",
                "damage_type": "siege",
                "damage": "300",
                "maxhealth": "1000",
                "icon": "gameres/icons/bram.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Catapult"
        },
        "CampTent1": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tent 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "BShieldBearer": {
            "properties": {
                "race": "Britain",
                "maxhealth": "240",
                "damage": "20",
                "armor_slash": "10",
                "armor_pierce": "10",
                "speed": "80",
                "unit_specials": "Defense skill, Combat skill",
                "icon": "gameres/icons/BShieldBearer.bmp",
                "display_name": "Shield Bearer",
                "display_name_plural": "Shield Bearers",
                "help": "contents/units/BShieldBearer",
                "edittree_pos": "Units/Britain/Shield Bearer"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "CampFence3": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Fence 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "IWallsNW": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "MWallsE": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "IBlacksmithAnim": {
            "properties": {},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "EGate6": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "BMorrigansMonument": {
            "properties": {
                "race": "Britain",
                "display_name": "Morrigan's monument",
                "radius": "165",
                "selection_radius": "165",
                "help": "/contents/buildings/BArena",
                "edittree_pos": "Structures/Stronghold (Britain)/Morrigan's monument",
                "auto_repair": "no",
                "icon": "gameres/icons/BMorrigansMonument.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "CampTower1": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tower 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CampFence2": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Fence 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Rhouse06": {
            "properties": {
                "race": "RepublicanRome",
                "radius": "160",
                "selection_radius": "165",
                "icon": "gameres/icons/rhouse.bmp",
                "edittree_pos": "Structures/Village (Rome)/House 3",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BTavern": {
            "properties": {
                "race": "Britain",
                "display_name": "Tavern",
                "radius": "170",
                "selection_radius": "180",
                "edittree_pos": "Structures/Stronghold (Britain)/Tavern",
                "auto_repair": "no",
                "icon": "gameres/icons/BTavern.bmp",
                "help": "/contents/buildings/BTavern"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseTavern"
        },
        "GArcher": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "140",
                "damage": "6",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "unit_specials": "Attack skill",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/GArcher.bmp",
                "display_name": "Archer",
                "display_name_plural": "Archers",
                "help": "contents/units/GArcher",
                "edittree_pos": "Units/Gaul/Archer"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "TArcher": {
            "properties": {
                "race": "Germany",
                "maxhealth": "200",
                "damage": "10",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "80",
                "unit_specials": "Attack skill, Active",
                "projectile_class": "Arrow",
                "icon": "gameres/icons/TArcher.bmp",
                "display_name": "Archer",
                "display_name_plural": "Archers",
                "help": "contents/units/TArcher",
                "edittree_pos": "Units/Germany/Archer"
            }, "commands": {}, "def_cmds": {}, "parent": "Ranged"
        },
        "ShortRanged": {
            "properties": {"formation_priority": "500", "sight": "500", "range": "300"},
            "commands": {},
            "def_cmds": {},
            "parent": "Ranged"
        },
        "EAnubisWarrior": {
            "properties": {
                "race": "Egypt",
                "maxhealth": "320",
                "damage": "36",
                "armor_slash": "8",
                "armor_pierce": "8",
                "speed": "80",
                "unit_specials": "Death blow",
                "icon": "gameres/icons/EAnubisWarrior.bmp",
                "display_name": "Anubis Warrior",
                "display_name_plural": "Anubis Warriors",
                "help": "contents/units/EAnubisWarrior",
                "edittree_pos": "Units/Egypt/Anubis Warrior"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "EHero2a": {
            "properties": {
                "display_name": "Amenwahsu",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "TCatapult": {
            "properties": {
                "race": "Germany",
                "display_name": "Ram",
                "damage_type": "siege",
                "damage": "300",
                "maxhealth": "1000",
                "icon": "gameres/icons/tram.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "Catapult"
        },
        "RSentry": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "150",
                "damage": "24",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/RArcher.bmp",
                "unit_specials": "Defense skill, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "RVillagerAmbient": {
            "properties": {"race": "RepublicanRome", "icon": "gameres/icons/RMan.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "GWomanWarrior": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "240",
                "damage": "30",
                "armor_slash": "16",
                "armor_pierce": "16",
                "speed": "80",
                "unit_specials": "Death blow, Revenge",
                "formation_priority": "1000",
                "formation_radius": "26",
                "icon": "gameres/icons/GWomanWarrior.bmp",
                "display_name": "Woman Warrior",
                "display_name_plural": "Woman Warriors",
                "help": "contents/units/GWWarrior",
                "edittree_pos": "Units/Gaul/Woman Warrior"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "EGate4": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "Wagon": {
            "properties": {
                "healthbar_type": "1",
                "select_class": "Wagon",
                "icon": "gameres/icons/Wagon.bmp",
                "armor_slash": "0",
                "armor_pierce": "0",
                "damage_type": "none",
                "attack": "0",
                "max_load": "1000",
                "feeds": "0",
                "inventory_size": "0"
            },
            "commands": {
                "unload": [["Obj", "This"], ["Obj", "Bld"]],
                "loadgoldbig": [["Obj", "This"]],
                "loadfoodbig": [["Obj", "This"]],
                "loadgoldsmall": [["Obj", "This"]],
                "loadfoodsmall": [["Obj", "This"]],
                "follow": [["Obj", "This"], ["Obj", "other"]],
                "transport": [["Obj", "This"], ["Obj", "other"]],
                "boardship": [["Obj", "This"], ["Obj", "obj"]],
                "boardshipcommon": [["Obj", "This"], ["Obj", "Other"]]
            },
            "def_cmds": {
                "ShipBattle": [{"cmd": "boardship", "ctrl": false}],
                "Inn": [{"cmd": "transport", "ctrl": false}, {"cmd": "approach", "ctrl": false}],
                "Catapult": [{"cmd": "approach", "ctrl": false}],
                "Tower": [{"cmd": "approach", "ctrl": false}],
                "Wall": [{"cmd": "approach", "ctrl": false}],
                "Gate": [{"cmd": "approach", "ctrl": false}],
                "Building": [{"cmd": "unload", "ctrl": false}],
                "Teleport": [{"cmd": "teleport", "ctrl": false}],
                "": [{"cmd": "move", "ctrl": false}],
                "Unit": [{"cmd": "follow", "ctrl": false}]
            },
            "parent": "Peaceful"
        },
        "CatapultTower": {
            "properties": {
                "range": "800",
                "min_range": "150",
                "sight": "0",
                "projectile_class": "Arrow",
                "building_projectile_class": "Fire_Arrow"
            },
            "commands": {"idle": [["Obj", "me"]], "attack": [["Obj", "me"], ["Obj", "u"]]},
            "def_cmds": {},
            "parent": "FakeTower"
        },
        "Disease": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "statue1": {
            "properties": {"edittree_pos": "Structures/Others/Ruins/Roman statue"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CampTent4": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tent 4"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "Multi": {
            "properties": {
                "icon": "gameres/icons/multi.bmp",
                "help": "contents/units",
                "interface": "thumb,unit,holder"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "ISentry1": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "ISentry"},
        "gcatapult_placing": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "catapult_placing"},
        "MWallsSE": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Imperial Roman walls",
                "sentry_class_name": "MSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "IBarracks": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IBarracks.bmp",
                "display_name": "Barracks",
                "display_name_plural": "Barracks",
                "radius": "190",
                "selection_radius": "220",
                "help": "/contents/buildings/IBarracks",
                "edittree_pos": "Structures/Stronghold (Iberia)/Barracks",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "DStatue": {
            "properties": {"edittree_pos": "Structures/Others/Desert/Statue"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "CampTower2": {
            "properties": {"edittree_pos": "Structures/Others/Camp/Tower 2"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "ITower01": {
            "properties": {"race": "Iberia", "wall_set": "Iberian walls", "icon": "gameres/icons/ITower.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "Tower"
        },
        "Rock Medium 06": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Rocks/Rock Medium 6"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "RLiberatus": {
            "properties": {
                "race": "RepublicanRome",
                "maxhealth": "440",
                "damage": "40",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "80",
                "unit_specials": "Regeneration, Learning, Freedom",
                "icon": "gameres/icons/RLiberatus.bmp",
                "display_name": "Liberatus",
                "display_name_plural": "Liberati",
                "help": "contents/units/RLiberatus",
                "edittree_pos": "Units/Roman/Liberatus"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "GOutpost": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "10000",
                "icon": "gameres/icons/goutpost.bmp",
                "display_name": "Trade post",
                "radius": "345",
                "selection_radius": "350",
                "edittree_pos": "Structures/Outposts/Trade post (Gaul)",
                "help": "/contents/buildings/GOutpost",
                "description": "Sells the food stored in the outpost to acquire gold",
                "range": "1000",
                "settlement_food": "500",
                "settlement_gold": "1000",
                "defender_cls_1": "GTridentWarrior",
                "defenders_max_1": "4",
                "defenders_out_1": "2",
                "start_level_1": "12",
                "end_level_1": "24"
            }, "commands": {"goutpost_sellfood": [["Obj", "This"]]}, "def_cmds": {}, "parent": "Outpost"
        },
        "CGule_fire": {"properties": {"desync_hash": "0"}, "commands": {}, "def_cmds": {}, "parent": "Object"},
        "MBarracks": {
            "properties": {
                "race": "ImperialRome",
                "icon": "gameres/icons/RBarracks.bmp",
                "display_name": "Barracks",
                "radius": "245",
                "selection_radius": "250",
                "edittree_pos": "Structures/Stronghold (Imperial Rome)/Barracks",
                "auto_repair": "no",
                "help": "/contents/buildings/MBarracks"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Flame": {
            "properties": {"edittree_pos": "Structures/Others/Flame", "sight": "0"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "Object"
        },
        "PeasantAmbient": {
            "properties": {
                "maxhealth": "100",
                "damage": "0",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "60",
                "damage_type": "none",
                "sight": "150",
                "formation_priority": "100",
                "formation_radius": "26",
                "radius": "15",
                "selection_radius": "15",
                "select_class": "PeasantAmbient",
                "no_transparent_draw": "1",
                "healthbar_type": "0"
            },
            "commands": {"enter": [["Obj", "This"], ["Obj", "bld"]], "transport": [["Obj", "This"], ["Obj", "other"]]},
            "def_cmds": {"Inn": [{"cmd": "transport", "ctrl": false}], "Building": [{"cmd": "enter", "ctrl": false}]},
            "parent": "Peaceful"
        },
        "BVillager": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BVillager.bmp",
                "edittree_pos": "Units/Britain/Peasant (male)"
            }, "commands": {}, "def_cmds": {}, "parent": "Peasant"
        },
        "Catapult": {
            "properties": {
                "radius": "50",
                "selection_radius": "90",
                "range": "800",
                "min_range": "301",
                "sight": "850",
                "damage": "120",
                "armor_slash": "0",
                "armor_pierce": "0",
                "damage_type": "siege",
                "attack_delay": "500",
                "splash_radius": "100",
                "maxhealth": "1000",
                "icon": "gameres/icons/catapult.bmp",
                "exit_interval": "1000",
                "help": "contents/units/Catapult",
                "interface": "thumb,building,holder",
                "display_name": "Catapult",
                "is_central_building": "1",
                "can_be_captured": "0",
                "can_be_attacked": "1",
                "produces_gold": "0",
                "produces_food": "0",
                "is_single_building": "1",
                "settlement_food": "0",
                "settlement_gold": "0",
                "settlement_maxfood": "0",
                "settlement_maxgold": "0",
                "population": "0",
                "efficiency": "1",
                "max_population": "0",
                "max_units": "10",
                "settlement_icon_name": ""
            },
            "commands": {
                "idle": [["Obj", "This"]],
                "attack": [["Obj", "me"], ["Obj", "target"]],
                "autofire": [["Obj", "This"]],
                "stop": [["Obj", "me"]],
                "disband": [["Obj", "This"]]
            },
            "def_cmds": {},
            "parent": "Building"
        },
        "ETempleOfHorusAndAnubis": {
            "properties": {
                "race": "Egypt",
                "display_name": "Temple of Horus and Anubis",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Egypt)/Temple of Horus and Anubis",
                "auto_repair": "no",
                "icon": "gameres/icons/ETempleOfAnubis.bmp",
                "help": "/contents/buildings/ETempleOfHorusAndAnubis"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseArena"
        },
        "RGateS": {
            "properties": {
                "race": "RepublicanRome",
                "icon": "gameres/icons/RGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Republican Roman walls",
                "sentry_class_name": "RSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "HeroGrave": {
            "properties": {
                "edittree_pos": "Structures/Item holders/Hero grave",
                "icon": "gameres/icons/Tombstone.bmp",
                "radius": "38",
                "selection_radius": "40",
                "range": "450",
                "signt": "0",
                "display_name": "Hero grave",
                "description": "Heroes of the same player visiting the grave will benefit from the experience of the dead hero.\\nWarriors of the same player visiting the grave will receive charms that improve their combat skills until they kill an enemy"
            }, "commands": {}, "def_cmds": {}, "parent": "ItemHolder"
        },
        "TGate7": {
            "properties": {
                "race": "Germany",
                "icon": "gameres/icons/TGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "German walls",
                "sentry_class_name": "TSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "MSentry": {
            "properties": {
                "race": "ImperialRome",
                "maxhealth": "150",
                "damage": "20",
                "armor_slash": "0",
                "armor_pierce": "0",
                "icon": "gameres/icons/RArcher.bmp",
                "unit_specials": "Defense skill, Keen sight, Freedom"
            }, "commands": {}, "def_cmds": {}, "parent": "Sentry"
        },
        "IHero2b": {
            "properties": {
                "display_name": "Adaegina",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/IHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "IberianHero"
        },
        "dolmen3": {
            "properties": {"edittree_pos": "Structures/Others/Sacred/Dolmen 3"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "test": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Building"},
        "CNoble": {
            "properties": {
                "race": "Carthage",
                "maxhealth": "360",
                "damage": "50",
                "armor_slash": "20",
                "armor_pierce": "20",
                "speed": "60",
                "unit_specials": "Triumph",
                "formation_priority": "1000",
                "formation_radius": "26",
                "icon": "gameres/icons/CNoble.bmp",
                "display_name": "Noble",
                "display_name_plural": "Nobles",
                "help": "contents/units/CNoble",
                "edittree_pos": "Units/Carthage/Noble"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "PeasantFemale": {
            "properties": {"display_name": "Peasant", "display_name_plural": "Peasants"},
            "commands": {},
            "def_cmds": {},
            "parent": "Peasant"
        },
        "Rhouse05": {
            "properties": {
                "race": "RepublicanRome",
                "radius": "140",
                "selection_radius": "145",
                "icon": "gameres/icons/rhouse.bmp",
                "edittree_pos": "Structures/Village (Rome)/House 2",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "MHero3a": {
            "properties": {
                "display_name": "Tadius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero3.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "GHouse4": {
            "properties": {
                "race": "Gaul",
                "display_name": "House",
                "icon": "gameres/icons/ghouse.bmp",
                "radius": "100",
                "selection_radius": "110",
                "edittree_pos": "Structures/Village (Gaul)/House 4"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "BBronzeSpearman": {
            "properties": {
                "race": "Britain",
                "maxhealth": "200",
                "damage": "20",
                "armor_slash": "12",
                "armor_pierce": "12",
                "speed": "80",
                "unit_specials": "Penetration, Deflection",
                "icon": "gameres/icons/BBronzeSpearman.bmp",
                "display_name": "Bronze Spearman",
                "display_name_plural": "Bronze Spearmen",
                "help": "contents/units/BBronzeSpearman",
                "edittree_pos": "Units/Britain/Bronze Spearman"
            }, "commands": {}, "def_cmds": {}, "parent": "Melee"
        },
        "RepublicanRomanHero": {
            "properties": {
                "maxhealth": "1000",
                "damage": "40",
                "armor_slash": "16",
                "armor_pierce": "16",
                "race": "RepublicanRome",
                "help": "/contents/units/RHero",
                "HeroSkills": "Administration, Team attack, Team defense, Quick March, Epic endurance"
            }, "commands": {}, "def_cmds": {}, "parent": "HeroMounted"
        },
        "EGate3": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "EHero1": {
            "properties": {
                "display_name": "Mentuhotep",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/EHero1.bmp",
                "edittree_pos": "Units/Egypt/Hero 1"
            }, "commands": {}, "def_cmds": {}, "parent": "EgyptianHero"
        },
        "EGate1": {
            "properties": {
                "race": "Egypt",
                "icon": "gameres/icons/EGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Egyptian walls",
                "sentry_class_name": "ESentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "ETempleOfOsiris": {
            "properties": {
                "race": "Egypt",
                "display_name": "Temple of Osiris",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Egypt)/Temple of Osiris",
                "auto_repair": "no",
                "icon": "gameres/icons/ETempleOfOsiris.bmp",
                "help": "/contents/buildings/ETempleOfOsiris"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "Deer": {
            "properties": {
                "damage_type": "none",
                "target_factor": "-1",
                "damage": "0",
                "armor_slash": "0",
                "armor_pierce": "0",
                "speed": "150",
                "radius": "20",
                "selection_radius": "20",
                "range": "17",
                "min_range": "2",
                "icon": "gameres/icons/deer.bmp",
                "display_name": "Deer",
                "display_name_plural": "Deer",
                "help": "contents/units/Deer",
                "edittree_pos": "Units/Animals/Deer"
            },
            "commands": {
                "idle": [["Obj", "me"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "unitmove": [["Obj", "This"], ["point", "pt"]]
            },
            "def_cmds": {},
            "parent": "Animal"
        },
        "BaseWell": {
            "properties": {"sight": "0", "display_name": "Well"},
            "commands": {"idle": [["Obj", "This"]]},
            "def_cmds": {},
            "parent": "ItemHolder"
        },
        "CHouse03": {
            "properties": {
                "race": "Carthage",
                "radius": "140",
                "selection_radius": "145",
                "icon": "gameres/icons/chouse.bmp",
                "edittree_pos": "Structures/Village (Carthage)/House 3",
                "display_name": "House"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseHouse"
        },
        "GShipyard3": {
            "properties": {
                "race": "Gaul",
                "radius": "370",
                "selection_radius": "390",
                "importsettlement": "Shipyard 3",
                "edittree_pos": "Structures/Shipyards/Wooden NE",
                "exit_vector_x": "120",
                "exit_vector_y": "-100",
                "build_ship_variation": "2"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseShipyard"
        },
        "THero2c": {
            "properties": {
                "display_name": "Manifred",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/THero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "GermanHero"
        },
        "IBlacksmith": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IBlacksmith.bmp",
                "display_name": "Blacksmith",
                "radius": "220",
                "selection_radius": "230",
                "edittree_pos": "Structures/Stronghold (Iberia)/Blacksmith",
                "help": "/contents/buildings/IBlacksmith",
                "auto_repair": "no"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBlacksmith"
        },
        "GGhost": {
            "properties": {
                "race": "Gaul",
                "maxhealth": "600",
                "damage": "1",
                "armor_slash": "4",
                "armor_pierce": "4",
                "stamina_dec_time": "1000",
                "speed": "60",
                "unit_specials": "Freedom",
                "range": "250",
                "target_factor": "200",
                "healthbar_type": "2",
                "max_food": "0",
                "feeds": "0",
                "does_not_regenerate": "1",
                "damaged_by_ghost": "0",
                "icon": "gameres/icons/Ghost.bmp",
                "display_name": "Ghoul",
                "display_name_plural": "Ghouls",
                "help": "contents/units/Ghost",
                "edittree_pos": "Units/Others/Ghoul"
            },
            "commands": {
                "advance": [["Obj", "This"], ["point", "pt"]],
                "attack": [["Obj", "This"], ["point", "pt"]],
                "move": [["Obj", "This"], ["point", "pt"]],
                "idle": [["Obj", "me"]],
                "spawn": [["Obj", "me"]]
            },
            "def_cmds": {},
            "parent": "SummoningUnit"
        },
        "IMountaineer": {
            "properties": {
                "race": "Iberia",
                "maxhealth": "400",
                "damage": "50",
                "armor_slash": "14",
                "armor_pierce": "14",
                "speed": "80",
                "unit_specials": "Sneak, Offensive tactics, Freedom",
                "feeds": "0",
                "icon": "gameres/icons/IMountaineer.bmp",
                "display_name": "Mountaineer",
                "display_name_plural": "Mountaineers",
                "help": "contents/units/IMountaineer",
                "edittree_pos": "Units/Iberia/Mountaineer"
            }, "commands": {"ondie": [["Obj", "THIS"]]}, "def_cmds": {}, "parent": "Melee"
        },
        "Field1": {
            "properties": {"edittree_pos": "Structures/Others/Fields/Field 1"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "EWVillagerAmbient": {
            "properties": {"race": "Egypt", "icon": "gameres/icons/EWVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "TCatapultUnit": {
            "properties": {"race": "Germany", "icon": "gameres/icons/tram.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "RamUnit"
        },
        "Bridge 01": {
            "properties": {
                "radius": "300",
                "selection_radius": "300",
                "edittree_pos": "Structures/Others/Bridges/Bridge 1"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "BGate5": {
            "properties": {
                "race": "Britain",
                "icon": "gameres/icons/BGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "British walls",
                "sentry_class_name": "BSentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "IGateE": {
            "properties": {
                "race": "Iberia",
                "icon": "gameres/icons/IGates.bmp",
                "radius": "170",
                "selection_radius": "170",
                "wall_set": "Iberian walls",
                "sentry_class_name": "ISentry1"
            }, "commands": {}, "def_cmds": {}, "parent": "Gate"
        },
        "RTemple": {
            "properties": {
                "race": "RepublicanRome",
                "display_name": "Temple",
                "radius": "165",
                "selection_radius": "170",
                "edittree_pos": "Structures/Stronghold (Republican Rome)/Temple",
                "auto_repair": "no",
                "icon": "gameres/icons/RTemple.bmp",
                "help": "/contents/buildings/RTemple"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseBarracks"
        },
        "BaseBuilding": {"properties": {}, "commands": {}, "def_cmds": {}, "parent": "Building"},
        "Tent02": {
            "properties": {
                "display_name": "Teuton tent",
                "radius": "150",
                "selection_radius": "152",
                "edittree_pos": "Structures/Others/Tents/Tent 2"
            }, "commands": {}, "def_cmds": {}, "parent": "Object"
        },
        "MHero2a": {
            "properties": {
                "display_name": "Cispius",
                "display_name_plural": "Heroes",
                "icon": "gameres/icons/MHero2.bmp"
            }, "commands": {}, "def_cmds": {}, "parent": "ImperialRomanHero"
        },
        "sanctuary": {
            "properties": {"edittree_pos": "Structures/Others/Sacred/Sanctuary"},
            "commands": {},
            "def_cmds": {},
            "parent": "Object"
        },
        "IWVillagerAmbient": {
            "properties": {"race": "Iberia", "icon": "gameres/icons/IWVillager.bmp"},
            "commands": {},
            "def_cmds": {},
            "parent": "PeasantAmbient"
        },
        "Camel": {
            "properties": {
                "maxhealth": "400",
                "display_name": "Caravan",
                "display_name_plural": "Caravans",
                "help": "contents/units/Camel",
                "icon": "gameres/icons/CaravanCamel.bmp",
                "radius": "40",
                "selection_radius": "45",
                "speed": "80",
                "edittree_pos": "Units/Others/Caravan Camel"
            }, "commands": {}, "def_cmds": {}, "parent": "Wagon"
        },
        "CWallsE": {
            "properties": {
                "race": "Carthage",
                "icon": "gameres/icons/CWalls.bmp",
                "radius": "110",
                "selection_radius": "110",
                "wall_set": "Carthaginian walls",
                "num_sentry_slots": "4",
                "sentry_class_name": "CSentry"
            }, "commands": {}, "def_cmds": {}, "parent": "Wall"
        },
        "TVillage": {
            "properties": {
                "race": "Germany",
                "radius": "230",
                "selection_radius": "250",
                "icon": "gameres/icons/TVillage.bmp",
                "edittree_pos": "Structures/Village (Germany)/Village hall",
                "foodperpop": "100",
                "help": "/contents/buildings/Village"
            }, "commands": {}, "def_cmds": {}, "parent": "BaseVillage"
        }
    };

const CLASSES_DETAILS_ROOT_ID = 'Object';
const CLASSES_DETAILS_ROOT = CLASSES_DETAILS[CLASSES_DETAILS_ROOT_ID];
