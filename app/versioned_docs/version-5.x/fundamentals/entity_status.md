Entity status
=============================================

A recurring pattern in OTM5 is the split between:

* **Entity status** - the state of the entity itself within its business or
   administrative workflow. The allowed values depend on the entity and profile
   and describe progress such as requested, confirmed, inTransit, completed,
   cancelled, accepted or closed.
* **Action lifecycle** - the time phase of an action or event. It tells you
   whether the same action data is represented as requested, planned,
   projected, actual or realized.

The two are related, but they are not the same axis: entity status describes
the workflow state of the entity, while action lifecycle describes when the
action data applies.

<small><em>Disclaimer: This example does not mean that every application has to
follow the actor role and responsibilities. It might depend on the use case to
determine the exact details. This documentation simply tries to illustrate the
two concepts by explaining them with an example.</em></small>

---

### Consignment - status lifecycle overview

```mermaid
stateDiagram-v2
   direction LR

   [*] --> draft

   draft --> requested: shipper requests
   requested --> confirmed: carrier confirms
   requested --> rejected: carrier rejects

   rejected --> requested: shipper requests again
   rejected --> draft: shipper revises

   confirmed --> inTransit: carrier updates (start event)
   inTransit --> completed: carrier updates (delivered)
   completed --> closed: shipper updates

   requested --> cancelled: shipper cancels
   confirmed --> cancelled: shipper cancels
   inTransit --> cancelled: shipper cancels

   closed --> [*]
   cancelled --> [*]

   classDef start fill:#cce5cc,stroke:#5a9367,color:#1b3a26;
   classDef active fill:#fdebc0,stroke:#d9a441,color:#5e3e0a;
   classDef transit fill:#cfe2f3,stroke:#6fa8dc,color:#1c3d5a;
   classDef done fill:#fdd9b5,stroke:#e08e45,color:#5a3010;

   class draft,requested,rejected start
   class confirmed active
   class inTransit transit
   class completed,closed,cancelled done
```

---

### Walkthrough of contracting a carrier with a single consignment

**1. Draft -> requested**

The shipper drafts a transport order containing one consignment, determining
when and how the goods must be delivered. This stage is about defining the
requested actions and their constraints. This status is rarely communicated
since it is often part of an internal application. Once the draft is ready it
switches to **requested** and can be shared with carriers. At this point all
underlying actions (stops, moves, loads, etc.) are in the **requested** action
status.

```mermaid
flowchart LR
   subgraph TRANSPORTORDER["TransportOrder - requested"]
      subgraph CONS["Consignment - requested"]
         L["Load action<br/>requested"] --> U["Unload action<br/>requested"]
      end
   end
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
   style TRANSPORTORDER fill:#faeeda,stroke:#854f0b,color:#412402;
```

**2.1 Requested -> rejected**

The carrier may decide to decline the request by rejecting it. This then depends
on the application how to deal with this. It may decide to do one of the
following:

* The transport order and consignment may be offered to another carrier and will
  be requested again.
* They can be revisited and constraints might be changed. In this case they will
  go back to **draft**.
* It might be possible that the transport order simply stays **rejected**. The
  shipper might decide then to create a new **requested** transport order
  containing the same or new consignments.

```mermaid
flowchart LR
   subgraph TRANSPORTORDER["TransportOrder - rejected"]
      subgraph CONS["Consignment - rejected"]
         L["Load action<br/>requested"] --> U["Unload action<br/>requested"]
      end
   end
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   style TRANSPORTORDER fill:#faeeda,stroke:#854f0b,color:#412402;
```

**2.2 Requested -> confirmed**

If the carrier accepts the terms of delivery then it can respond with a
**confirmed** message.

Now in this example, confirming a transport order and planning it into a trip
happens at different points in time. The carrier might first just confirm an
order but does not yet have planned delivery times. Then it could just share a
**confirmed** message without updating actions containing planned times.

This might be as simple as the following message:

```json
{
   "entity": {
      "id": "01736a8f-6b8e-5262-86ec-ce2eeb1d3647",
      "status": "confirmed",
      "entityType": "transportOrder"
   },
   "eventType": "updateEvent"
}
```

In this case the consignment could have the status **confirmed** but all
related actions are still in **requested**.

```mermaid
flowchart LR
   subgraph TRANSPORTORDER["TransportOrder - confirmed"]
      subgraph CONS["Consignment - confirmed"]
         L["Load action<br/>requested"] --> U["Unload action<br/>requested"]
      end
   end
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
   style TRANSPORTORDER fill:#faeeda,stroke:#854f0b,color:#412402;
```

Further in the process the carrier can optionally consolidate multiple
consignments within a trip planning update so that eventually all the actions
will be **planned**.

```mermaid
flowchart LR
   subgraph TRIP["Trip - confirmed"]
      subgraph CONS["Consignment - confirmed"]
         L["Load action<br/>planned"] --> U["Unload action<br/>planned"]
      end
   end
   classDef trip fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a;
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style TRIP fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
```

**3. Confirmed -> inTransit -> completed**

Eventually the status of that trip becomes **inTransit** - typically as soon as
a start event such as a GPS location update is registered. This includes that
the consignment also becomes **inTransit**. Meanwhile, its actions progress
through the action lifecycle phases *projected*, *actual* and *realized*.
such as a GPS location update is registered. This includes that the consignment
also becomes **inTransit**. Meanwhile, its actions progress through the action
lifecycle phases *projected*, *actual* and *realized*.

```mermaid
flowchart LR
   subgraph TRIP["Trip - inTransit"]
      subgraph CONS["Consignment - inTransit"]
         L["Load action<br/>realized"] --> U["Unload action<br/>projected"]
      end
   end
   classDef trip fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a;
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style TRIP fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
```

Often if the **unload** action for a consignment is *realized*, then the
consignment can be considered **completed**. But this is application dependent.
Note: An unsuccessful action still becomes *realized*, but with a `failed`
result status.

```mermaid
flowchart LR
   subgraph TRIP["Trip - completed"]
      subgraph CONS["Consignment - completed"]
         L["Load action<br/>realized"] --> U["Unload action<br/>realized"]
      end
   end
   classDef trip fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a;
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style TRIP fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
```

**4. completed -> closed**

The status **completed** is more of an operational state while the status
**closed** is used to indicate that the entity is also administratively closed.
Often the status of an entity can only be determined by the owner of the entity,
in contrast to the lifecycles of an action. Once all administrative tasks are
done then the status will reach **closed**.
by the owner of the entity. Once all administrative tasks are done then the
status will reach **closed**.

```mermaid
flowchart LR
   subgraph TRIP["Trip - completed"]
      subgraph CONS["Consignment - closed"]
         L["Load action<br/>realized"] --> U["Unload action<br/>realized"]
      end
   end
   classDef trip fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a;
   classDef cons fill:#e6f1fb,stroke:#185fa5,color:#042c53;
   classDef load fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   classDef unload fill:#e1f5ee,stroke:#0f6e56,color:#04342c;
   class L load
   class U unload
   style TRIP fill:#f1efe8,stroke:#5f5e5a,color:#2c2c2a
   style CONS fill:#e6f1fb,stroke:#185fa5,color:#042c53
```

**5. Cancellation**

At any step before status **completed**, the owner can cancel. The transport
order or consignment becomes `cancelled` and, conceptually, all actions become
*realized* with a `cancelled` result. In practice only the single
consignment-level `cancelled` reference needs to be communicated - the
individual actions do not each have to be present.

```mermaid
flowchart LR
   subgraph TRIP["Trip - inTransit"]
      subgraph CONS["Consignment - cancelled"]
      end
   end
   classDef load fill:#fcebeb,stroke:#a32d2d,color:#501313;
   class L,U load
   style TRIP fill:#f1efe8,stroke:#5f5e4a,color:#2c2c2a
   style CONS fill:#fcebeb,stroke:#a32d2d,color:#501313
```

This can be achieved by the owner simply sending a message containing:

```json
{
   "entity": {
      "id": "01736a8f-6b8e-5262-86ec-ce2eeb1d3647",
      "status": "cancelled",
      "entityType": "consignment"
   },
   "eventType": "updateEvent"
}
```