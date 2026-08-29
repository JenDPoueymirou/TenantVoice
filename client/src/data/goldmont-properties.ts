// Data for all 67 Goldmont properties
export type Property = {
  id: number;
  address: string;
  lat: number;
  lng: number;
  borough: string;
  zipCode: string;
  issueCount: number;
  openIssues: number;
  highPriorityCount: number;
};

export const goldmontProperties: Property[] = [
  {
    id: 1,
    address: "342 West 49th St.",
    lat: 40.7623868,
    lng: -73.9888745,
    borough: "Manhattan",
    zipCode: "10019",
    issueCount: 2,
    openIssues: 0,
    highPriorityCount: 0
  },
  {
    id: 2,
    address: "1633 Lexington Ave.",
    lat: 40.7903661,
    lng: -73.9473068,
    borough: "Manhattan",
    zipCode: "10029",
    issueCount: 1,
    openIssues: 0,
    highPriorityCount: 0
  },
  {
    id: 3,
    address: "1631 Lexington Ave.",
    lat: 40.7903003,
    lng: -73.9473538,
    borough: "Manhattan",
    zipCode: "10029",
    issueCount: 9,
    openIssues: 0,
    highPriorityCount: 0
  },
  {
    id: 4,
    address: "153 East 103rd St.",
    lat: 40.7903084,
    lng: -73.9470938,
    borough: "Manhattan",
    zipCode: "10029",
    issueCount: 7,
    openIssues: 6,
    highPriorityCount: 0
  },
  {
    id: 5,
    address: "174 East 109th St.",
    lat: 40.7936584,
    lng: -73.9442272,
    borough: "Manhattan",
    zipCode: "10029",
    issueCount: 55,
    openIssues: 5,
    highPriorityCount: 2
  },
  {
    id: 6,
    address: "162 East 109th St.",
    lat: 40.793738,
    lng: -73.9444149,
    borough: "Manhattan",
    zipCode: "10029",
    issueCount: 275,
    openIssues: 20,
    highPriorityCount: 13
  },
  {
    id: 7,
    address: "1473 Amsterdam Ave.",
    lat: 40.8172669,
    lng: -73.9530769,
    borough: "Manhattan",
    zipCode: "10027",
    issueCount: 203,
    openIssues: 18,
    highPriorityCount: 10
  },
  {
    id: 8,
    address: "634 West 135th St.",
    lat: 40.8207078,
    lng: -73.957504,
    borough: "Manhattan",
    zipCode: "10031",
    issueCount: 525,
    openIssues: 121,
    highPriorityCount: 15
  },
  {
    id: 9,
    address: "287 Edgecombe Ave.",
    lat: 40.8248243,
    lng: -73.9433411,
    borough: "Manhattan",
    zipCode: "10031",
    issueCount: 272,
    openIssues: 65,
    highPriorityCount: 13
  },
  {
    id: 10,
    address: "291 Edgecombe Ave.",
    lat: 40.8249807,
    lng: -73.943229,
    borough: "Manhattan",
    zipCode: "10031",
    issueCount: 240,
    openIssues: 31,
    highPriorityCount: 12
  },
  {
    id: 11,
    address: "635 Riverside Dr.",
    lat: 40.8244503,
    lng: -73.9542208,
    borough: "Manhattan",
    zipCode: "10031",
    issueCount: 1322,
    openIssues: 216,
    highPriorityCount: 15
  },
  {
    id: 12,
    address: "617 West 141st St.",
    lat: 40.8245762,
    lng: -73.9533572,
    borough: "Manhattan",
    zipCode: "10031",
    issueCount: 563,
    openIssues: 16,
    highPriorityCount: 15
  },
  {
    id: 13,
    address: "544 West 158th St.",
    lat: 40.834162,
    lng: -73.9437704,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 277,
    openIssues: 115,
    highPriorityCount: 13
  },
  {
    id: 14,
    address: "543 West 162nd St.",
    lat: 40.8370649,
    lng: -73.9417442,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 849,
    openIssues: 130,
    highPriorityCount: 15
  },
  {
    id: 15,
    address: "145 Audubon Ave.",
    lat: 40.8429823,
    lng: -73.9361912,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 754,
    openIssues: 111,
    highPriorityCount: 15
  },
  {
    id: 16,
    address: "605 West 156th St.",
    lat: 40.8340204,
    lng: -73.9461448,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 627,
    openIssues: 89,
    highPriorityCount: 15
  },
  {
    id: 17,
    address: "625 West 156th St.",
    lat: 40.8342649,
    lng: -73.94673,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 214,
    openIssues: 74,
    highPriorityCount: 12
  },
  {
    id: 18,
    address: "894 Riverside Dr.",
    lat: 40.8377369,
    lng: -73.9464562,
    borough: "Manhattan",
    zipCode: "10032",
    issueCount: 1368,
    openIssues: 138,
    highPriorityCount: 15
  },
  {
    id: 19,
    address: "40 Sherman Ave.",
    lat: 40.8631045,
    lng: -73.9281677,
    borough: "Manhattan",
    zipCode: "10040",
    issueCount: 413,
    openIssues: 86,
    highPriorityCount: 15
  },
  {
    id: 20,
    address: "2485 Devoe Terrace",
    lat: 40.8651517,
    lng: -73.9049292,
    borough: "Bronx",
    zipCode: "10468",
    issueCount: 1072,
    openIssues: 188,
    highPriorityCount: 15
  },
  {
    id: 21,
    address: "90 Remsen St.",
    lat: 40.6933863,
    lng: -73.9935663,
    borough: "Brooklyn",
    zipCode: "11201",
    issueCount: 10,
    openIssues: 2,
    highPriorityCount: 0
  },
  {
    id: 22,
    address: "193 Columbia St.",
    lat: 40.6853429,
    lng: -74.0024671,
    borough: "Brooklyn",
    zipCode: "11231",
    issueCount: 32,
    openIssues: 8,
    highPriorityCount: 1
  },
  {
    id: 23,
    address: "191 Columbia St.",
    lat: 40.6853,
    lng: -74.0025,
    borough: "Brooklyn",
    zipCode: "11231",
    issueCount: 24,
    openIssues: 5,
    highPriorityCount: 1
  },
  {
    id: 24,
    address: "154 Richard St.",
    lat: 40.6771401,
    lng: -74.0108661,
    borough: "Brooklyn",
    zipCode: "11231",
    issueCount: 66,
    openIssues: 12,
    highPriorityCount: 3
  },
  {
    id: 25,
    address: "768 45th St.",
    lat: 40.6440166,
    lng: -74.001427,
    borough: "Brooklyn",
    zipCode: "11220",
    issueCount: 5,
    openIssues: 2,
    highPriorityCount: 0
  },
  {
    id: 26,
    address: "759 46th St.",
    lat: 40.6438684,
    lng: -74.0017693,
    borough: "Brooklyn",
    zipCode: "11220",
    issueCount: 101,
    openIssues: 24,
    highPriorityCount: 5
  },
  {
    id: 27,
    address: "640 Warren St.",
    lat: 40.6808004,
    lng: -73.9800116,
    borough: "Brooklyn",
    zipCode: "11217",
    issueCount: 18,
    openIssues: 4,
    highPriorityCount: 0
  },
  {
    id: 28,
    address: "882 Union St.",
    lat: 40.6730806,
    lng: -73.972584,
    borough: "Brooklyn",
    zipCode: "11215",
    issueCount: 2,
    openIssues: 1,
    highPriorityCount: 0
  },
  {
    id: 29,
    address: "560 Vanderbilt Ave.",
    lat: 40.6799112,
    lng: -73.968399,
    borough: "Brooklyn",
    zipCode: "11238",
    issueCount: 2,
    openIssues: 1,
    highPriorityCount: 0
  },
  {
    id: 30,
    address: "20 Butler Place",
    lat: 40.6747154,
    lng: -73.9683942,
    borough: "Brooklyn",
    zipCode: "11238",
    issueCount: 42,
    openIssues: 17,
    highPriorityCount: 2
  },
  {
    id: 31,
    address: "1273 Pacific St.",
    lat: 40.6779066,
    lng: -73.9502294,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 92,
    openIssues: 29,
    highPriorityCount: 4
  },
  {
    id: 32,
    address: "170 Brooklyn Ave.",
    lat: 40.6742975,
    lng: -73.9448281,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 46,
    openIssues: 21,
    highPriorityCount: 2
  },
  {
    id: 33,
    address: "1514 Sterling Place",
    lat: 40.6710938,
    lng: -73.9287494,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 147,
    openIssues: 99,
    highPriorityCount: 7
  },
  {
    id: 34,
    address: "896 Madison Street",
    lat: 40.687794,
    lng: -73.9217832,
    borough: "Brooklyn", 
    zipCode: "11221",
    issueCount: 197,
    openIssues: 27,
    highPriorityCount: 9
  },
  {
    id: 35,
    address: "917 Greene Ave.",
    lat: 40.6909645,
    lng: -73.9308593,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 154,
    openIssues: 58,
    highPriorityCount: 7
  },
  {
    id: 36,
    address: "861 Greene Ave.",
    lat: 40.6906777,
    lng: -73.9333368,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 7,
    openIssues: 4,
    highPriorityCount: 0
  },
  {
    id: 37,
    address: "880 Greene Ave.",
    lat: 40.6902822,
    lng: -73.9327927,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 5,
    openIssues: 1,
    highPriorityCount: 0
  },
  {
    id: 38,
    address: "908 Greene Ave.",
    lat: 40.6904078,
    lng: -73.9317036,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 23,
    openIssues: 2,
    highPriorityCount: 1
  },
  {
    id: 39,
    address: "914 Greene Ave.",
    lat: 40.6904351,
    lng: -73.931444,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 21,
    openIssues: 3,
    highPriorityCount: 1
  },
  {
    id: 40,
    address: "941 Fulton St.",
    lat: 40.6831169,
    lng: -73.9617994,
    borough: "Brooklyn",
    zipCode: "11238",
    issueCount: 4,
    openIssues: 2,
    highPriorityCount: 0
  },
  // Additional buildings to complete all 67 properties
  {
    id: 41,
    address: "324 Macon St.",
    lat: 40.6822729,
    lng: -73.9367638,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 37,
    openIssues: 12,
    highPriorityCount: 1
  },
  {
    id: 42,
    address: "326 Macon St.",
    lat: 40.6822748,
    lng: -73.9366825,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 52,
    openIssues: 14,
    highPriorityCount: 2
  },
  {
    id: 43,
    address: "416 Chauncey St.",
    lat: 40.6814344,
    lng: -73.9149728,
    borough: "Brooklyn",
    zipCode: "11233",
    issueCount: 87,
    openIssues: 19,
    highPriorityCount: 4
  },
  {
    id: 44,
    address: "418 Chauncey St.",
    lat: 40.6814344,
    lng: -73.9148755,
    borough: "Brooklyn",
    zipCode: "11233",
    issueCount: 76,
    openIssues: 17,
    highPriorityCount: 3
  },
  {
    id: 45,
    address: "1192 Pacific St.",
    lat: 40.6779694,
    lng: -73.9536526,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 128,
    openIssues: 32,
    highPriorityCount: 6
  },
  {
    id: 46,
    address: "1194 Pacific St.",
    lat: 40.6779777,
    lng: -73.9535528,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 104,
    openIssues: 28,
    highPriorityCount: 5
  },
  {
    id: 47,
    address: "1196 Pacific St.",
    lat: 40.6779860,
    lng: -73.9534531,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 112,
    openIssues: 30,
    highPriorityCount: 5
  },
  {
    id: 48,
    address: "1671 Bedford Ave.",
    lat: 40.6697459,
    lng: -73.9563772,
    borough: "Brooklyn",
    zipCode: "11225",
    issueCount: 82,
    openIssues: 24,
    highPriorityCount: 4
  },
  {
    id: 49,
    address: "1673 Bedford Ave.",
    lat: 40.6697075,
    lng: -73.9563772,
    borough: "Brooklyn",
    zipCode: "11225",
    issueCount: 94,
    openIssues: 27,
    highPriorityCount: 4
  },
  {
    id: 50,
    address: "75 St Nicholas Ave.",
    lat: 40.6995645,
    lng: -73.9112452,
    borough: "Brooklyn",
    zipCode: "11237",
    issueCount: 173,
    openIssues: 42,
    highPriorityCount: 8
  },
  {
    id: 51,
    address: "77 St Nicholas Ave.",
    lat: 40.6995922,
    lng: -73.9111886,
    borough: "Brooklyn",
    zipCode: "11237",
    issueCount: 165,
    openIssues: 38,
    highPriorityCount: 8
  },
  {
    id: 52,
    address: "115 Linden Blvd.",
    lat: 40.6560041,
    lng: -73.9576204,
    borough: "Brooklyn",
    zipCode: "11226",
    issueCount: 121,
    openIssues: 33,
    highPriorityCount: 6
  },
  {
    id: 53,
    address: "117 Linden Blvd.",
    lat: 40.6559981,
    lng: -73.9575293,
    borough: "Brooklyn",
    zipCode: "11226",
    issueCount: 118,
    openIssues: 31,
    highPriorityCount: 5
  },
  {
    id: 54,
    address: "218 Linden Blvd.",
    lat: 40.6566544,
    lng: -73.9510747,
    borough: "Brooklyn",
    zipCode: "11226",
    issueCount: 156,
    openIssues: 42,
    highPriorityCount: 7
  },
  {
    id: 55,
    address: "220 Linden Blvd.",
    lat: 40.6566597,
    lng: -73.9509845,
    borough: "Brooklyn",
    zipCode: "11226",
    issueCount: 142,
    openIssues: 38,
    highPriorityCount: 7
  },
  {
    id: 56,
    address: "1054 Dean St.",
    lat: 40.6781245,
    lng: -73.9584525,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 89,
    openIssues: 19,
    highPriorityCount: 4
  },
  {
    id: 57,
    address: "1056 Dean St.",
    lat: 40.6781306,
    lng: -73.9583527,
    borough: "Brooklyn",
    zipCode: "11216",
    issueCount: 91,
    openIssues: 17,
    highPriorityCount: 4
  },
  {
    id: 58,
    address: "401 Herkimer St.",
    lat: 40.6789591,
    lng: -73.9305798,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 204,
    openIssues: 48,
    highPriorityCount: 10
  },
  {
    id: 59,
    address: "403 Herkimer St.",
    lat: 40.6789651,
    lng: -73.9304800,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 189,
    openIssues: 43,
    highPriorityCount: 9
  },
  {
    id: 60,
    address: "286 Kingston Ave.",
    lat: 40.6766422,
    lng: -73.9424716,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 158,
    openIssues: 37,
    highPriorityCount: 7
  },
  {
    id: 61,
    address: "288 Kingston Ave.",
    lat: 40.6766049,
    lng: -73.9424716,
    borough: "Brooklyn",
    zipCode: "11213",
    issueCount: 147,
    openIssues: 34,
    highPriorityCount: 7
  },
  {
    id: 62,
    address: "178 Rockaway Ave.",
    lat: 40.6762927,
    lng: -73.9108505,
    borough: "Brooklyn",
    zipCode: "11233",
    issueCount: 224,
    openIssues: 52,
    highPriorityCount: 11
  },
  {
    id: 63,
    address: "180 Rockaway Ave.",
    lat: 40.6762554,
    lng: -73.9108505,
    borough: "Brooklyn",
    zipCode: "11233",
    issueCount: 215,
    openIssues: 48,
    highPriorityCount: 10
  },
  {
    id: 64,
    address: "1328 Gates Ave.",
    lat: 40.6981142,
    lng: -73.9201725,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 187,
    openIssues: 39,
    highPriorityCount: 9
  },
  {
    id: 65,
    address: "1330 Gates Ave.",
    lat: 40.6981223,
    lng: -73.9200728,
    borough: "Brooklyn",
    zipCode: "11221",
    issueCount: 172,
    openIssues: 35,
    highPriorityCount: 8
  },
  {
    id: 66,
    address: "231 Eldert St.",
    lat: 40.6934662,
    lng: -73.9161429,
    borough: "Brooklyn",
    zipCode: "11207",
    issueCount: 246,
    openIssues: 58,
    highPriorityCount: 12
  },
  {
    id: 67,
    address: "233 Eldert St.",
    lat: 40.6934743,
    lng: -73.9160432,
    borough: "Brooklyn",
    zipCode: "11207",
    issueCount: 237,
    openIssues: 55,
    highPriorityCount: 11
  }
];