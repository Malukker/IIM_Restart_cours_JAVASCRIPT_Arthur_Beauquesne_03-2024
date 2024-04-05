//console.log('Hello World !')

//Mise en pratique 1

/* var a = 10
console.log(a)
var b = 5
console.log(b)

if (a < 15) {
    console.log('a < 15')
} 

var c = (a/b)

console.log(c) */

//Mise en pratique 2

/* var nom = "John Malukker"
var flouze = 1000
var compteurAchats = 0

var produit = "sacs de farine"
var quantité = 25
var prix = 30

function begone(flouze, prix) {
    return flouze-prix
}

while (quantité != 0 && flouze > 30) {
    flouze = begone(flouze, prix)
    quantité --
    compteurAchats ++
}

console.log("quantité possédée de", produit, ":", compteurAchats)
console.log("quantité restante en magasin de", produit, ":", quantité)
if (quantité == 0) {
    console.log("produit en rupture de stock")
}
else {
    console.log("stocks encore suffisants")
}
console.log("argent restant :", flouze, "$") */

//Mise en pratique 3

class Unit {
    constructor(name, attacks, hit, strength, ap, dmg, hp, toughness, save, speed){
        this.name = name
        this.attacks = parseFloat(attacks)
        this.hit = parseFloat(hit)
        this.strength = parseFloat(strength)
        this.ap = parseFloat(ap)
        this.dmg = parseFloat(dmg)
        this.hp = parseFloat(hp)
        this.toughness = parseFloat(toughness)
        this.save = parseFloat(save)
        this.speed = speed
    }

    hitRoll() {
        let missed = this.attacks
        let i = 0
        while (i<this.attacks) {
            if ((Math.random()*6)+1 >= this.hit) { //Correspond à un jet de dé à six faces, et sa comparaison à une des statistiques
                missed --
            }
            i++
        }
        return this.attacks - missed
    }

    woundRoll(hits, toughness) {
        let plonk = hits

        let i = 0
        while (i<hits) {
            if( this.strength >= toughness*2 ){
                if (((Math.random()*6)+1) >= 2){
                    plonk--
                }
            }
            
            else if( this.strength > toughness){
                if (((Math.random()*6)+1) >= 3){
                    plonk--
                }
            }
            
            else if( this.strength == toughness){
                if (((Math.random()*6)+1) >= 4){
                    plonk--
                }
            }
            

            else if( toughness > this.strength*2 ){
                if (((Math.random()*6)+1) >= 6){
                    plonk--
                }
            }
                
            else if( toughness > this.strength ){
                if (((Math.random()*6)+1) >= 5){
                    plonk--
                }
            }
            
            i++
        }
        return hits - plonk
    }

    saveRoll (wounds, ap, dmg) {
        let saved = wounds
        
        let i = 0
        while (i<wounds) {
            let e = ((Math.random()*6)+1)
            if (e <= (this.save)+ap){
                saved--
            }
            i++
        }
        
        return dmg*(wounds-saved)
    }
}

let unit1 = new Unit("Grey Knights Brotherhood Terminators unit", 20.0, 3.0, 6.0, 2.0, 2.0, 15.0, 5.0, 2.0, 5)
let unit2 = new Unit("Heldrake", 5.0, 3.0, 7.0, 1.0, 2.0, 12.0, 9.0, 3.0, 20)

console.log("Welcome to the Warhammer 10th edition simplified melee simulator !")
console.log("Today's match : the", unit1.name, "against the", unit2.name, "!")
console.log("IT'S TIME ! TO DU-DU-DU-DU-DU-DU-DUELLLLLL !")  

let i = 1
while (i < 6 && unit1.hp > 0 && unit2.hp > 0) {
    console.log("Turn", i, '!')
    if (Math.max(unit1.speed, unit2.speed) == unit2.speed) {
        console.log(unit2.name, "attacks first !")
        let a = unit2.hitRoll()
        console.log("Hits :", a)
        let b = unit1.woundRoll(a, unit1.toughness)
        console.log("Wounds :", b)

        console.log(unit1.name, "try to save !")
        let c = unit1.saveRoll(b, unit2.ap, unit2.dmg)
        console.log("Damage :",c)   
        if (unit1.hp <0) {
            unit1.hp =0
        }
        unit1.hp -= c
        console.log(unit1.name, "is left with", unit1.hp, "hp remaining !")

        console.log(unit1.name, "counterattack !")
        let d = unit1.hitRoll()
        console.log("Hits :", d)
        let e = unit1.woundRoll(d, unit2.toughness)
        console.log("Wounds :", e)

        console.log(unit2.name, "try to save !")
        let f = unit2.saveRoll(e, unit1.ap, unit1.dmg)
        console.log("Damage :",f)
        unit2.hp -= f
        if (unit2.hp <0) {
            unit2.hp =0
        }
        console.log(unit2.name, "is left with", unit2.hp, "hp remaining !")
    }
    else {
        console.log(unit1.name, "attacks first !")
        let d = unit1.hitRoll()
        console.log("Hits :", d)
        let e = unit1.woundRoll(d, unit2.toughness)
        console.log("Wounds :", e)

        console.log(unit2.name, "try to save !")
        let f = unit2.saveRoll(e, unit1.ap, unit1.dmg)
        console.log("Damage :",f)
        if (unit2.hp <0) {
            unit2.hp =0
        }
        unit2.hp -= f
        console.log(unit2.name, "is left with", unit2.hp, "hp remaining !")

        console.log(unit2.name, "counterattack !")
        let a = unit2.hitRoll()
        console.log("Hits :", a)
        let b = unit1.woundRoll(a, unit1.toughness)
        console.log("Wounds :", b)

        console.log(unit1.name, "try to save !")
        let c = unit1.saveRoll(b, unit2.ap, unit2.dmg)
        console.log("Damage :",c)   
        if (unit1.hp <0) {
            unit1.hp =0
        }
        unit1.hp -= c
        console.log(unit1.name, "is left with", unit1.hp, "hp remaining !")
    }
    i++
}
if (unit1.hp == 0) {
    console.log(unit2.name, "won !")
}
else {
    console.log(unit1.name, "won !")
}