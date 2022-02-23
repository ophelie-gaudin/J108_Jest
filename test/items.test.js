import {
  Item,
  Shop,
  SulfurasItem,
  AgedItem,
  BackstageItem,
  ConjuredItem,
} from "../src/gilded_rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const itemsArray = [
      new Item("foo", 0, 0),
      new Item("Item", 5, 20),
      new Item("Item bis", 30, 50),
      new SulfurasItem("SulfurasItem"),
      new AgedItem("aged", 5, 20),
      new AgedItem("aged bis", 30, 50),
      new BackstageItem("back", 5, 20),
      new BackstageItem("back bis", 30, 50),
      new ConjuredItem("balbla bis", 30, 50),
    ];

    const gildedRose = new Shop(itemsArray, 1);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(19);
    expect(items[2].quality).toBe(49);
    expect(items[3].quality).toBe(80);
    expect(items[4].quality).toBe(23);
    expect(items[5].quality).toBe(50);
    expect(items[6].quality).toBe(23);
    expect(items[7].quality).toBe(50);
    expect(items[8].quality).toBe(48);
  });
});
