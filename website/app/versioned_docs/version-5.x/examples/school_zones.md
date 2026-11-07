School Zones
============

Overview
------
School Zones in OpenTripModel are critical areas intended to ensure the safety and efficient flow of traffic around educational institutions. These zones encompass various measures aimed at enhancing safety, such as speed limits, designated drop-off and pick-up points, and additional signage to alert drivers of the presence of children. Just as roadworks improve road conditions, School Zones contribute to safer road environments for students, parents, and commuters alike.

This OTM profile provides a detailed description of how School Zones are represented in OpenTripModel. The core idea is to restrict access to these areas on school days to ensure the safety of students and staff. These restrictions are enforced through a series of measures designed to manage traffic flow and enhance safety within the designated zones.

Additionally, the profile includes time window constraints to demonstrate recurring periods during which access restrictions apply. These time windows typically align with school operating hours, including drop-off and pick-up times. By clearly defining these time constraints, the profile ensures that the safety measures are consistently applied and easily understood by all stakeholders, including drivers, school administrators, and traffic authorities.



General structure
-----------------
The structure of school zones data is similar to that of Environmental Zones and is organized as an OTM Location. Each OTM Location entity includes details such as the name of the location, address, geographical coordinates representing the school zone, and constraints specifying regulations for the zone, such as speed limits and restricted access.

A typical OTM Location entity consists of the following elements:
- School name
- Geographical representation of the school zone
- Constraints of the school zone, such as applicable traffic measures


### Typical constraints for School Zones

Constraints for school zones govern their operational regulations and can vary in their enforcement status. They can either be enforced, meaning the regulations they specify must be adhered to, or not-enforced, indicating that compliance is optional.

These constraints also include recurring start and end times, which define the periods during which the regulations are applicable. For example, school zones might have specific start and end times corresponding to school hours, such as from 08:30 to 12:30 and from 13:30 to 15:30 on weekdays. These time frames can recur on a regular basis, such as weekly, and may exclude certain dates, like holidays or vacation periods. This recurring nature ensures that the regulations align with the operational schedule of the school zone over time.

The recurrence format applied is based on the iCalendar specification, which is commonly used for defining recurring events. Specifically, it follows the RFC 5545 standard, which defines the iCalendar format. The recurrence rules in the JSON use the RRULE property, which specifies the frequency, interval, and other parameters for recurring events.

The JSON also includes EXDATE properties, which specify dates to be excluded from the recurrence pattern.


Example
-------
Imagine we need to document current road regulations for a route called "School zone". This route aims to bypass a school zone located at "Basisschool OBS De Cirkel" on Atjehstraat 35A, 2022 BL Haarlem, NL. The school operates on weekdays, with operating hours from 08:30 to 12:30 and from 13:30 to 15:30, except during school holidays such as summer and autumn vacations. 

The template begins with a `location` entity, which is part of a larger JSON structure defining various constraints for the school zone:

```json
{
    "id": "<locationId>",
    "name": "OBS De Cirkel",
    "geoReference": {
        "type": "latLonArrayGeoReference",
        "points": []
    },
    "type": "school",
    "administrativeReference": {
        "street": "Atjehstraat 35A",
        "houseNumber": "35",
        "houseNumberAddition": "A",
        "postalCode": "2022 BL",
        "city": "Haarlem",
        "country": "NL"
    },
    "contactDetails": [
        {
            "type": "phone",
            "value": "+31 23 5254380"
        },
        {
            "type": "email",
            "value": "info@obscirkel.nl"
        }
    ],
    "constraint": {
        "associationType": "inline",
        "entity": {
            "value": {
                "type": "orConstraint",
                "enforceability": "preference",
                "or": [
                    {
                        "type": "andConstraint",
                        "and": [
                            {
                                "type": "timeWindowConstraint",
                                "startTime": "2001-12-17T08:30:00+01:00", // first occurence of the event
                                "endTime": "2001-12-17T12:30:00+01:00",
                                "recurrence": [
                                    "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,TH,FR", // recurringDayWeekMonthPeriod
                                    "EXDATE:20220701T000000Z/20220801T000000Z", // Summer Vacation
                                    "EXDATE:20221016T000000Z/20221023T000000Z" // Autumn Vacation
                                ]
                            },
                            {
                                "type": "accessConstraint",
                                "access": "closed"
                            }
                        ]
                    },
                    {
                        "type": "andConstraint",
                        "and": [
                            {
                                "type": "timeWindowConstraint",
                                "startTime": "2001-12-17T13:30:00+01:00",
                                "endTime": "2001-12-17T15:30:00+01:00",
                                "recurrence": [
                                    "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,TH,FR", // recurringDayWeekMonthPeriod
                                    "EXDATE:20220701T000000Z/20220801T000000Z", // Summer Vacation
                                    "EXDATE:20221016T000000Z/20221023T000000Z" // Autumn Vacation
                                ]
                            },
                            {
                                "type": "accessConstraint",
                                "access": "closed"
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```
