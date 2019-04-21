
//create variables
var character1 = {
    team: "Jedi",
    name: "Yoda",
    source: "assets/images/yoda.jpg",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}

var character2 = {
    team: "Jedi",
    name: "Mace Windu",
    source: "assets/images/mace-windu.jpg",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}

var character3 = {
    team: "Jedi",
    name: "Rey",
    source: "assets/images/rey.jpeg",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}

var character4 = {
    team: "Sith",
    name: "Darth Vader",
    source: "assets/images/darth-vader.png",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}

var character5 = {
    team: "Sith",
    name: "Darth Jar Jar",
    source: "assets/images/jar-jar.jpg",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}

var character6 = {
    team: "Sith",
    name: "Kylo Ren",
    source: "assets/images/kylo-ren.jpg",
    hp: 0,
    attack: 0,
    counterAttack: 0,
}


var hpValue = [100, 125, 150, 175, 200]

var attackValue = [6, 7, 8, 9, 10]

var counterAttackValue = [5, 10, 15, 20, 25]

var mainCharacter = ""

var adversary = ""

var characterChoices = [character1, character2, character3, character4, character5, character6]

var enemies = []

//put character choices on screen as buttons
for (var i = 0; i < characterChoices.length; i++) {
    var characterDiv = $("<div>");
    var nameHeading = $("<h4>")
    var characterImage = $("<img>");
    nameHeading.text(characterChoices[i].name)
    characterDiv.attr("class", "character-button");
    characterDiv.attr("name", characterChoices[i].name)
    characterDiv.attr("team", characterChoices[i].team)
    characterDiv.attr("hp", characterChoices[i].hp)
    characterDiv.attr("attack", characterChoices[i].attack)
    characterDiv.attr("counter-attack", characterChoices[i].counterAttack)
    characterImage.attr("src", characterChoices[i].source);
    characterImage.attr("class", "character-image");
    characterDiv.append(nameHeading)
    characterDiv.append(characterImage);
    $("#character-choices").append(characterDiv);
}

// create on-click events that choose main character to use throughout game and randomly assigns his hp, attack and counter attack, and removes other choices from the display, pushing enemies into the enemy section
$(".character-button").on("click", function () {
    if ($("#main-character").html().length == 0) {
        var newHeading = $("<h2>");
        var hpDiv = $("<h3>");
        mainCharacter = this;
        $("#main-character").append(mainCharacter);
        $("#choose").text("Your Character")
        $(mainCharacter).removeClass("character-button");
        $(mainCharacter).attr("class", "main-character");
        $(mainCharacter).attr("hp", hpValue[Math.floor(Math.random() * hpValue.length)]);
        $(mainCharacter).attr("attack", attackValue[Math.floor(Math.random() * attackValue.length)]);
        $(mainCharacter).attr("base-attack", $(".main-character").attr("attack"));
        hpDiv.attr("class", "hp")
        hpDiv.attr("id", "hp1")
        hpDiv.text($(mainCharacter).attr("hp"))
        $("#main-character").append(hpDiv);
        console.log(mainCharacter);
        if (($(mainCharacter).attr("team")) == "Jedi") {
            $("[team = Sith").removeClass("character-button");
            $("[team = Sith").attr("class", "enemy");
            console.log("You chose Jedi!");
            newHeading.text("Defeat the Sith!");
            $("#defeat").append(newHeading);
            $("#enemies").append($("[team = Sith]"));
            $("#character-choices").empty();
        }
        else {
            $("[team = Jedi").removeClass("character-button");
            $("[team = Jedi").attr("class", "enemy");
            console.log("You chose Sith!")
            newHeading.text("Destroy the Jedi!")
            $("#defeat").append(newHeading);
            $("#enemies").append($("[team = Jedi]"));
            $("#character-choices").empty();
        }
    }
    //create on-click event that chooses adversary to fight and randomly assigns his hp, attack, and counter attack
    $(".enemy").on("click", function () {
        if ($("#adversary").html().length == 0) {
            var hpDiv2 = $("<h3>");
            adversary = this;
            $("#adversary").append(adversary);
            $(adversary).removeClass("enemy");
            $(adversary).attr("class", "adversary");
            $(adversary).attr("hp", hpValue[Math.floor(Math.random() * hpValue.length)]);
            $(adversary).attr("counter-attack", counterAttackValue[Math.floor(Math.random() * counterAttackValue.length)]);
            hpDiv2.attr("class", "hp")
            hpDiv2.attr("id", "hp2")
            hpDiv2.text($(adversary).attr("hp"))
            $("#adversary").append(hpDiv2);
            console.log(adversary);
            var newButton = $("<button>");
            newButton.attr("class", "btn btn-danger");
            newButton.attr("id", "attack-button")
            newButton.text("Attack");
            $("#attack").append(newButton);
            //create on-click event for attacking, increasing unit's base attack, and taking the counter attack
            $("#attack").on("click", function () {
                var adversaryHp = $(".adversary").attr("hp");
                var mainCharacterHP = $(".main-character").attr("hp");
                var adversaryCounterAttack = $(".adversary").attr("counter-attack");
                var mainCharacterAttack = $(".main-character").attr("attack");
                var mainCharacterBaseAttack = $(".main-character").attr("base-attack");
                $(".adversary").attr("hp", parseInt(adversaryHp) - parseInt(mainCharacterAttack));
                hpDiv2.text($(".adversary").attr("hp"));
                $(".main-character").attr("attack", parseInt(mainCharacterAttack) + parseInt(mainCharacterBaseAttack));
                //create conditional that checks hp of adversary
                if (parseInt($(".adversary").attr("hp")) <= 0) {
                    console.log("you defeated an enemy");
                    $("#graveyard").append($(".adversary"));
                    $(".adversary").attr("team", "dead");
                    $(".adversary").attr("class", "dead");
                    $(".dead").off("click");
                    $("#adversary").empty();
                    $("#attack").off("click");
                    $("#attack").empty();
                }
                else {
                    $(".main-character").attr("hp", parseInt(mainCharacterHP) - parseInt(adversaryCounterAttack));
                    hpDiv.text($(".main-character").attr("hp"));
                }
                //create conditional that checks hp of main character
                if (parseInt($(".main-character").attr("hp")) <= 0) {
                    console.log("you died :(");
                    $("#main-character").empty();
                    setTimeout(function () {
                        alert("You lose! Try again!");
                    }, 10)
                    setTimeout(function () {
                        location.reload();
                    }, 25)
                }
                //win condition
                else if ($("#enemies").is(':empty') && $("#adversary").is(':empty')) {
                    setTimeout(function () {
                        alert("You win!");
                        location.reload();
                    }, 25)

                }

            });

        }
    });
});