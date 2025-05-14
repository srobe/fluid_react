// src/config/missions.js

export const activeMissions = [
                "ARCSIX",
                "BLUEFLUX",
                "PACE-PAX",
                "SARP",
                "SCOAPE-II",
                "WHyMSIE",
]
export const recentMissions = ["AGES+"]

export const missionTypes = {
    // Missions that are "customB" will get the 2-model landing
    "ACCLIP": "customB",
    "AGES+": "customB",
    "BLUEFLUX": "customB",
    "SARP-East": "customB",
    "SCOAPE": "customB",
    "STAQS": "customB",
    "TRACER-AQ": "customB",
    // Missions that are "customA" or "base", etc. ...
    "CAMP2EX": "customA",
    "ORACLES": "customA",
    "PRDUST": "customA",
    "SCAN-OPTICAL": "customA",
    // And so on...
    "ABOVE": "base",
    "ACE-ENA": "base",
    "ACEPOL": "base",
    "AEOLUS-CALVAL": "base",
    "ATOM": "base",
    "DCOTSS": "base",
    "EPOCH": "base",
    "MOSAIC": "base",
    "PACE-PAX": "base",
    "SOCRATES": "base",
    // etc.
  };

export const mapTypes = 
{
    "fp": {
        "base": ['weather_mission','chem2d_mission','chem3d_mission'],
        "customA": ['weather_mission','chem2d_mission','chem3d_mission','custom_mission'],
        "customB": ['weather_mission','chem2d_mission','chem3d_mission','custom_mission'],
    },
    "cf": {
        "base": [],
        "customA": [],
        "customB": ['custom-2_mission'],
    }
}

export const mapTitles = 
{
    'weather_mission':'Weather Maps',
    'chem2d_mission':'2D Chem Maps',
    'chem3d_mission':'3D Chem Maps',
    'custom_mission':'Custom GEOS-FP Maps',
    'custom-2_mission':'Custom GEOS-CF Maps',
    
}
  