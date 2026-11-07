Lifecycles
==========

Introduction
------------

In logistic operations it is quite common that data changes over time based on
new information. This information can either be historic, in the present or
model expected future events. To model this OTM introduced lifecycle phases.
Lifecycle phases can be used on actions and events. A lifecycle indicates in
what phase the data was provided. It can either be:

* _requested_: this pre-execution phase can be used to indicate that something
  is requested, but not yet confirmed by the authorizing party. This is a new
  lifecyle that did not exist in OTM before.

* _planned_: this pre-execution phase is all about planning. Actions and events
  in this phase represent planned relationships, i.e. it is planned that a
  certain stop will be visited at 10:00. Planned actions/events typically
  originate from a planning system. For organizations which do not rely on
  planning systems this phase can be omitted.

* _projected_: this phase models projected (or estimated) lifecyles. Given a
  series of "planned" events and some associated real-time data (i.e. traffic
  jams) projected actions/events can be calculated. E.g. when an event is
  planned to happen at 8:00, but the "actual" event happens at 8:30, all events
  that are planned after that delayed event can be projected 30 minutes later.
  Projections can also take into consideration other factors, such as traffic
  and weather conditions.

* _actual_: this during-execution phase models the reality that is happening at
  present time. As opposed to planned events, actual actions/events typically
  originate from GPS tracking devices or traffic information systems.

* _realized_: this post-execution phase can be used to view and analyze a
  logistic operation in retrospect. Actions and events in this phase are
  recorded and archived events from the `actual` phase.

Lifecycles can be added to both actions and events. If you want to enrich an
existing action (or event) by providing data in _another_ lifecycle you should
create an action with the **same** UUID, since it represents the same action.
Just with data in another lifecycle. If you retrieve an action or event by its
UUID, it should return the action/event with the _latest_ lifecycle, unless
specified otherwise using path-parameters.

Example
-------

It is possible to have data in different lifecycles within the same message.
This happens whenever the various actions within an entity are executing and
some might already have been finished, whereas others are still planned to
happen. For example in a trip that already visited some stops, but is still
underway to the others. In OTM5 this could look like (details about
loading/unload are left out for brevity):

```json
{
  "id": "f2aa2a48-f003-48ce-9c86-d3d81acbe0bf",
  "entityType": "trip",
  "actions": [
    {
      "entity": {
        "id": "57be4a68-7ad7-4ca4-b7ac-da7b3100ece5",
        "name": "Stop that was already visited",
        "lifecycle": "realized",
        "startTime": "2022-08-17T10:03:00Z",
        "endTime": "2022-08-17T10:14:00Z",
        "actionType": "stop"
      },
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "56c016a0-c38f-4cd2-9a03-0594cf4e7d22",
        "name": "Stop that is up next and has an ETA",
        "lifecycle": "projected",
        "startTime": "2022-08-17T10:48:00Z",
        "endTime": "2022-08-17T10:57:00Z",
        "actionType": "stop"
      },
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "76098a75-1dae-4866-bed4-d2463c0b6b5a",
        "name": "Stop that has no ETA yet but is planned",
        "lifecycle": "planned",
        "startTime": "2022-08-17T11:15:00Z",
        "endTime": "2022-08-17T11:30:00Z",
        "actionType": "stop"
      },
      "associationType": "inline"
    }
  ]
}
```