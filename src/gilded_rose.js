const itemsArray = [];

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    // nombre de jours restant pour vendre l'article.
    this.sellIn = sellIn;
    // dénote combien l'article est précieux
    this.quality = quality;

    itemsArray.push(this);
  }

  updateItemQuality() {
    if (this.quality > 0) {
      if (this.sellIn < 0) {
        this.quality = this.quality - 2;
      } else if (this.sellIn >= 0) {
        this.quality = this.quality - 1;
      }
    } else if (this.quality < 0) {
      this.quality = 0;
    }
  }

  looseSellIn() {
    this.updateItemQuality();
    this.sellIn = this.sellIn - 1;

    return this;
  }
}

export class SulfurasItem extends Item {
  // "Sulfuras", étant un objet légendaire,
  // n'a pas de date de péremption et ne perd jamais en qualité (quality)

  constructor(name = "") {
    super("Sulfuras, Hand of Ragnaros " + name, 1, 80);
    // this.name = "Sulfuras, Hand of Ragnaros " + name;
    // this.quality = 80;
    // this.sellIn = 1;
  }

  updateItemQuality() {
    if (this.quality != 80) {
      this.quality = 80;
    }
    console.log("On parle de Sulfuras, ça ne perd pas en qualité enfin !");
  }

  looseSellIn() {
    if (this.sellIn != 1) {
      this.sellIn = 1;
    }
    this.updateItemQuality();
    this.sellIn = this.sellIn - 1;

    return this;
  }
}

export class AgedItem extends Item {
  // Aged Brie" augmente sa qualité (quality) plus le temps passe.

  constructor(name = "", sellIn, quality) {
    super("Aged Brie" + name, sellIn, quality);
  }

  updateItemQuality() {
    if (this.sellIn >= 0) {
      if (this.sellIn <= 10 && this.sellIn > 5) {
        this.quality = this.quality + 2;
      } else if (this.sellIn <= 5 && this.sellIn >= 0) {
        this.quality = this.quality + 3;
      } else if (this.sellIn > 10) {
        this.quality = this.quality + 1;
      }

      if (this.quality > 50) {
        this.quality = 50;
      }
    }
  }
}

export class BackstageItem extends AgedItem {
  constructor(name, sellIn, quality) {
    super("Backstage passes" + name, sellIn, quality);

    // this.name = name;
    // this.sellIn = sellIn;
    // this.quality = quality;
  }
  updateItemQuality() {
    super.updateItemQuality();
    if (this.sellIn <= 0) {
      this.quality = 0;
    }
  }
}

export class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super("Conjured" + name, sellIn, quality);

    // this.name = "Conjured " + name;
    // this.sellIn = sellIn;
    // this.quality = quality;
  }

  updateItemQuality() {
    if (this.quality > 0) {
      if (this.sellIn < 0) {
        this.quality = this.quality - 4;
      } else if (this.sellIn >= 0) {
        this.quality = this.quality - 2;
      }
    }
    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

export class Shop {
  constructor(items = itemsArray, leftDays) {
    this.items = items;
    this.leftDays = leftDays;
  }
  updateQuality() {
    // for(i=0; i <= this.leftDays; i++){
    this.items.map((item) => {
      item.looseSellIn();
    });
    // }

    return this.items;

    // // On parcourt tous les produits (items) de la boutique
    // for (let i = 0; i < this.items.length; i++) {
    //   // si pas AGED + BACKSTAGE
    //   if (
    //     this.items[i].name != "Aged Brie" &&
    //     this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //   ) {
    //     // qualité du product sup à 0
    //     if (this.items[i].quality > 0) {
    //       // si pas SULFURAS :  perd 1 unité de qualité, au fil du tps
    //       if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //         this.items[i].quality = this.items[i].quality - 1;
    //       }
    //     }
    //   } else {
    //     // Si AGED OU BACKSTAGE
    //     if (this.items[i].quality < 50) {
    //       // la qualité prend 1 au cours du temps
    //       this.items[i].quality = this.items[i].quality + 1;

    //       // BACKSTAGE augmente sa qualité (quality) plus le temps passe (sellIn) ;
    //       // La qualité augmente de 2 quand il reste 10 jours ou moins et
    //       // de 3 quand il reste 5 jours ou moins, mais la qualité tombe à
    //       // 0 après le concert.
    //       if (
    //         this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //       }
    //     }
    //   }

    //   // Si pas SULFURAS, produit perd 1j de péremption
    //   if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }

    //   // Si nb jours restants (péremption) inférieur à 0
    //   if (this.items[i].sellIn < 0) {
    //     // Si product est != de AGED/BACKSTAGE
    //     if (this.items[i].name != "Aged Brie") {
    //       if (
    //         this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
    //       ) {
    //         // Si qualité sup à 0
    //         if (this.items[i].quality > 0) {
    //           // Si product est != de SULFURAS
    //           if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
    //             // perd 1pt de qualité
    //             this.items[i].quality = this.items[i].quality - 1;
    //           }
    //         }
    //       } else {
    //         // Sinon, qualité reste constante
    //         this.items[i].quality =
    //           this.items[i].quality - this.items[i].quality;
    //       }
    //     } else {
    //       // else : si product = AGED
    //       // Si qualité inf à 50
    //       if (this.items[i].quality < 50) {
    //         // On gagne un pt de qualité
    //         this.items[i].quality = this.items[i].quality + 1;
    //       }
    //     }
    //   }
    // }
  }
}
