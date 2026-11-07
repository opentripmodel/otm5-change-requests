Shipping Goods
==============

Introduction
------------

Goods turn out to be a surpringly hard thing to model. Since different parties
deal with 'shipping' goods on different levels of detail. For example, in
multimodal transport the first leg might be on land, where every good in the
truck is tracked individually. However, once at the port, everything is put into
containers, which are then loaded onto the ships and the level of detail
changes. OTM allows to model such cases by distinquishing goods into two
different types of goods; _items_ and _transport equipment_. Where the former is
used to model individual goods or small items, and the latter can be used for
larger 'equipment' that itself can contain multiple goods. These transport
equipments can be nested, so it becomes possible to model a box of bananas on a
pallet, in a container, on a ship.

Hierarchy examples
------------------

Here is an example of simple goods items containing two boxes of bananas of one
kilo _each_:

```json
{
  "id": "7f3e7e94-355a-4ea8-ab77-2423e337aef5",
  "description": "Goods without any nesting",
  "barCode": "12345",
  "quantity": 2,
  "weight": {
    "value": 1,
    "unit": "kg"
  },
  "productType": "Bananas",
  "type": "items"
}
```

And here is an example of a pallet containing two boxes of shirts, and 1 box of
shoes:

```json
{
  "id": "09331266-fd13-4d12-8ddf-5583cad2aa07",
  "description": "Nested goods on a pallet",
  "quantity": 1,
  "width": {
    "value": 1,
    "unit": "m"
  },
  "height": {
    "value": 0.2,
    "unit": "m"
  },
  "length": {
    "value": 1,
    "unit": "m"
  },
  "containedGoods": [
    {
      "entity": {
        "id": "1c7d90dd-fffd-4124-ba15-c87a3bda218a",
        "description": "inner goods 1",
        "barCode": "123",
        "quantity": 2,
        "weight": {
          "value": 0.5,
          "unit": "kg"
        },
        "productType": "Shirts",
        "type": "items"
      },
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "36e441a2-7807-46e9-9e5f-0fc99493559c",
        "description": "inner goods 2",
        "barCode": "456",
        "quantity": 1,
        "weight": {
          "value": 0.7,
          "unit": "kg"
        },
        "productType": "Shoes",
        "type": "items"
      },
      "associationType": "inline"
    }
  ],
  "equipmentType": "pallet",
  "type": "transportEquipment"
}
```