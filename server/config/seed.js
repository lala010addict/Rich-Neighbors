/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import fs from 'fs';
import path from 'path';
import jsf from 'json-schema-faker';
import User from '../api/user/user.model';
import Campaign from '../api/campaign/campaign.model';
import campaignJson from './seed.campaign.json'
var campaignSchema;


User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });


campaignSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.campaign.json')));


Campaign.find({}).removeAsync()
  .then(function() {
    Campaign.createAsync({
  "title": "Nullam varius.",
  "description": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
  "contributors": [
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d7e7300"
      },
      "amount": 30.28
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d7f7300"
      },
      "amount": 99.93
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d807300"
      },
      "amount": 34.72
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d817300"
      },
      "amount": 67.38
    }
  ],
  "google_map": {
    "long": "-90.2185",
    "lat": "38.6128"
  },
  "address": {
    "street": "11454 Lillian Terrace",
    "city": "Saint Louis",
    "zip": "63104",
    "state": "Missouri",
    "country": "United States"
  },
  "goal": 43195.80,
  "active": true,
  "url": "/amet/justo/morbi.js",
  "picture_url": "http://lorempixel.com/g/800/600/people/"
}, {
  "title": "In quis justo.",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  "contributors": [
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d827300"
      },
      "amount": 64.33
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d837300"
      },
      "amount": 46.72
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d847300"
      },
      "amount": 19.19
    }
  ],
  "google_map": {
    "long": "-79.9579",
    "lat": "37.2742"
  },
  "address": {
    "street": "17 Victoria Street",
    "city": "Roanoke",
    "zip": "24034",
    "state": "Virginia",
    "country": "United States"
  },
  "goal": 18848.62,
  "active": true,
  "url": "/donec/ut.png",
  "picture_url": "http://lorempixel.com/800/600/people/"
}, {
  "title": "Maecenas ut massa quis augue luctus tincidunt.",
  "description": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.",
  "contributors": [
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d857300"
      },
      "amount": 86.21
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d867300"
      },
      "amount": 96.96
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d877300"
      },
      "amount": 46.88
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d887300"
      },
      "amount": 49.22
    }
  ],
  "google_map": {
    "long": "-83.1087",
    "lat": "42.3749"
  },
  "address": {
    "street": "246 Schurz Way",
    "city": "Detroit",
    "zip": "48206",
    "state": "Michigan",
    "country": "United States"
  },
  "goal": "53652.29",
  "active": true,
  "url": "/purus/eu/magna/vulputate/luctus/cum.json",
  "picture_url": "http://lorempixel.com/g/800/600/people/"
}, {
  "title": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
  "description": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.",
  "contributors": [
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d897300"
      },
      "amount": "69.95"
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d8a7300"
      },
      "amount": "71.29"
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d8b7300"
      },
      "amount": "51.86"
    },
    {
      "user_id": {
        "$oid": "5669a1134d6f63382d8c7300"
      },
      "amount": "46.90"
    }
  ],
  "google_map": {
    "long": "-85.0707",
    "lat": "41.0938"
  },
  "address": {
    "street": "540 Springview Court",
    "city": "Fort Wayne",
    "zip": "46857",
    "state": "Indiana",
    "country": "United States"
  },
  "goal": "69923.70",
  "active": true,
  "url": "/erat/vestibulum/sed/magna/at.xml",
  "picture_url": "http://lorempixel.com/800/600/people/"
});
  })
  .then(function() {
    console.log('finished populating campaigns');
  });;
