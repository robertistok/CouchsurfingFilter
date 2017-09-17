#!/usr/bin/env python

"""
Python wrapper for hapi.couchsurfing.com
"""

import json
from api import Api

CSApi = Api("nzoakhvi@sharklasers.com","qwerty");


searchParams = {
        "page": 1,
        "perPage": 25,
        "placeId": "ChIJOfBn8mFuQUYRmh4j019gkn4",
        "sort": "best_match",
        "couchStatus": "yes,maybe",
        "radius": 10,
        "placeDescription": "Oslo, Norway",
        # "minGuestsWelcome": 1,
        # "hasReferences": 1
}
location = CSApi.search_hosts(searchParams);
locationToJson = json.dumps(location);
print json.dumps(location, indent=4, sort_keys=True)

# randomUser = CSApi.get_profile_by_id(2000558459);
# print json.dumps(randomUser, indent=4, sort_keys=True)

# parsedLocation = json.loads(location);
# print json.dumps(parsedLocation, indent=4, sort_keys=True)
