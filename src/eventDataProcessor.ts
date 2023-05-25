function lookupMonthName(number: number) {
  const lookupArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return lookupArray[number - 1];
}
function objectifyTsv(tableData: string) {
  const [headerString, ...objectValueStrings] = tableData
    .replaceAll('﻿', '')
    .replaceAll(/(\r\n){2}/g, 'BREAK')
    .split(/[\r\n]+/);
  const objectKeys = headerString.replaceAll(/[ ]/g, '').split('\t');
  const objectArray = createObjectArray(objectValueStrings, objectKeys);
  sortByDate(objectArray);
  return sortByDate(objectArray);
}

function createObjectArray(objectValueStrings: string[], objectKeys: string[]) {
  const returnArray: Array<Record<string, string>> = [];
  objectValueStrings.forEach((objectValueString) => {
    const newObject: Record<string, string> = makeNewObject(objectValueString.trim(), objectKeys);
    returnArray.push(newObject);
  });
  return returnArray;
}

function makeNewObject(objectValueString: string, objectKeys: string[]) {
  const valueArray = objectValueString.trim().split('\t');
  const returnObject: Record<string, string> = {};
  valueArray.forEach((value, index) => {
    returnObject[`${objectKeys[index]}`] = value.trim().replaceAll(',', ', ').replaceAll(',  ', ', ');
  });
  [returnObject.dayNumber, returnObject.monthNumber, returnObject.yearNumber] = returnObject.Date.split('/');
  const newDate = new Date(`${returnObject.monthNumber}/${returnObject.dayNumber}/${returnObject.yearNumber}`);
  const newDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(newDate);
  returnObject.dayName = newDay;
  const newMonthName = lookupMonthName(Number(returnObject.monthNumber));
  returnObject.monthName = newMonthName;
  const hasColon = returnObject.Name.includes(':');
  returnObject.title = hasColon ? `${returnObject.Name.split(':')[0]}:` : returnObject.Name;
  returnObject.subtitle = hasColon ? returnObject.Name.split(':')[1] : '';
  return returnObject;
}

function sortByDate(arrayOfObjects: Array<Record<string, string>>) {
  const sortedArray: Array<Array<Record<string, string>>> = [];
  arrayOfObjects.forEach((object) => {
    const [month, day] = object.Date.split('/');
    const number = Number(`${month}${day.padStart(2, '0')}`);
    if (sortedArray[number] === undefined) sortedArray[number] = [];
    sortedArray[number].push(object);
  });
  const sortedValues = Object.values(sortedArray);
  return sortedValues;
}

async function fetchData() {
  const response = await fetch('/ADDEVENTDATA/eventdata.tsv');
  const tsvData = await response.text();

  return objectifyTsv(tsvData.trim());
}

const hardData = `Name	Organiser	Date	Time	Location	EventType	Description	MoreInfo
AI and Sustainable Cities (Day 2)	The Alan Turing Institute, UCL, QMUL	4/7/2023	09:00-17:30	North West Wing, Lecture Theatre G22, WC1E 6BT	Public Conversations	This event a scoping workshop activity centred on the theme of ‘Cities’ that examines the role of data science and artificial intelligence in paving the way for sustainable cities. Speakers will be invited from academia, industry, and governmental authorities to present diverse efforts that aim to instigate sustainability in UK cities. Day 2 focuses on: Active Transport, Economics of Cities, and Sustainability in Cities.	https://www.eventbrite.co.uk/e/the-alan-turing-institute-ucl-qmul-ai-and-sustainable-cities-workshop-tickets-630674894587
London Data Today & Tomorrow	Greater London Authority (GLA)	3/7/2023	09:30 - 16:00	City Hall	Public Conversations	Kicking off London Data Week, this event hosted by the GLA at City Hall will convene data leaders, practitioners and enthusiasts from across the city for a daylong event highlighting London’s unique flavour of data innovation and looking forward to how data & technology can support creating a better London of tomorrow. Limited tickets are available - please fill out the following form to express your interest in attending the event.	TBA
Statisticians for Society	The Royal Statistical Society	4/7/2023	10:00 - 16:00	RSS offices, Errol Street, EC1Y 8LX	Data Education	The RSS is putting on an event to bring together local London charities to explore ways in which data and statistical analysis can support their team’s objectives. Charities will be paired with expert statisticians to identify and scope projects that can be supported pro bono by the RSS Statisticians for Society initiative during and after the event. Charities interested in participating can express their interest at the link below.	https://rss.org.uk/training-events/events/events-2023/rss-events/statisticians-for-society-london-data-week/#fulleventinfo
Data in the High Street	Greater London Authority (GLA)	5/7/2023	10:00 - 17:00	32 Shoreditch High Street - Sook	Exhibits & Experiences	The High Streets Data Service team is planning a popup exhibition showcasing interesting data visualisations and interactive tools which are built using datasets available via the HSDS.The purpose is to celebrate the impact of the High Streets Data Service and partnership, inspire subscribers on how HSDS data can be used to impact policy & strategy, and share key policy-relevant insights on high streets present and future with resident audiences.	https://www.eventbrite.co.uk/e/data-in-the-high-street-a-london-data-week-pop-up-exhibition-tickets-642276324777
AI and Sustainable Cities (Day 1)	The Alan Turing Institute, UCL, QMUL	3/7/2023	10:30-17:30	1-19 Torrington Place, Lecture Theatre G12, WC1E 7HB	Public Conversations	This event a scoping workshop activity centred on the theme of ‘Cities’ that examines the role of data science and artificial intelligence in paving the way for sustainable cities. Speakers will be invited from academia, industry, and governmental authorities to present diverse efforts that aim to instigate sustainability in UK cities. Day 1 focuses on: Digital Twins and Liveability / Inequality.	https://www.eventbrite.co.uk/e/the-alan-turing-institute-ucl-qmul-ai-and-sustainable-cities-workshop-tickets-630674894587
AI: Who’s Looking After Me?	King’s College London	4/7/2023	10:30-17:30	Science Gallery London	Exhibits & Experiences	The Science Gallery, in collaboration with FutureEverything, is hosting a free exhibition and public events programme that takes a questioning, surprisingly, playful look at the way AI is already shaping many areas of our lives, and asks if we can rely on these technologies for our wellbeing and happiness. The exhibit runs from 21 June 2023 – 20 January 2024.	https://london.sciencegallery.com/ai-season
AI: Who’s Looking After Me?	King’s College London	5/7/2023	10:30-17:30	Science Gallery London	Exhibits & Experiences	The Science Gallery, in collaboration with FutureEverything, is hosting a free exhibition and public events programme that takes a questioning, surprisingly, playful look at the way AI is already shaping many areas of our lives, and asks if we can rely on these technologies for our wellbeing and happiness. The exhibit runs from 21 June 2023 – 20 January 2024.	https://london.sciencegallery.com/ai-season
AI: Who’s Looking After Me?	King’s College London	6/7/2023	10:30-17:30	Science Gallery London	Exhibits & Experiences	The Science Gallery, in collaboration with FutureEverything, is hosting a free exhibition and public events programme that takes a questioning, surprisingly, playful look at the way AI is already shaping many areas of our lives, and asks if we can rely on these technologies for our wellbeing and happiness. The exhibit runs from 21 June 2023 – 20 January 2024.	https://london.sciencegallery.com/ai-season
AI: Who’s Looking After Me?	King’s College London	7/7/2023	10:30-17:30	Science Gallery London	Exhibits & Experiences	The Science Gallery, in collaboration with FutureEverything, is hosting a free exhibition and public events programme that takes a questioning, surprisingly, playful look at the way AI is already shaping many areas of our lives, and asks if we can rely on these technologies for our wellbeing and happiness. The exhibit runs from 21 June 2023 – 20 January 2024.	https://london.sciencegallery.com/ai-season
AI: Who’s Looking After Me?	King’s College London	8/7/2023	10:30-17:30	Science Gallery London	Exhibits & Experiences	The Science Gallery, in collaboration with FutureEverything, is hosting a free exhibition and public events programme that takes a questioning, surprisingly, playful look at the way AI is already shaping many areas of our lives, and asks if we can rely on these technologies for our wellbeing and happiness. The exhibit runs from 21 June 2023 – 20 January 2024.	https://london.sciencegallery.com/ai-season
Geomob London	Geomob	5/7/2023	18:00	Geovation Hub	Public Conversations	Join geodata enthusiasts for a free event featuring community projects with an open data focus for London Data Week. This GeoMob features talks from the London Ambulance Service, on using open geospatial data to improve emergency response, and Lightbug, a UK company producing the "smallest GPS trackers".	https://thegeomob.com/post/july-5th-2023-geomoblon-details
The Turing's Cabaret of Dangerous Ideas	The Alan Turing Institute	6/7/2023	19:00 - 21:00	The Camden Club	Exhibits & Experiences	What do you get if you combine top academics, contentious research and a comedian compère? Answer: the Cabaret of Dangerous Ideas (CoDI)! Join us at The Camden Club for a night of edgy, exciting AI and data science-based entertainment with a comedy twist. Adult content, suitable for 18+.	https://www.turing.ac.uk/events/turings-cabaret-dangerous-ideas-london
All the Docks	All the Docks	9/7/2023	All Day	All over London	Citizen Science	All The Docks is a cycling challenge where 5 teams visit all 800+ Santander Cycles Docking stations in one day. Along the way they will collect data on the road conditions across London that will be released as open data after the event. To get involved, you can register to join a cycling team, follow their progress on a live visualisation, or join for a final celebration after the event.	allthedocks.com
Citi Map Data Collection Campaign	Citi Map	3/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	4/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	5/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	6/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	7/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	8/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/
Citi Map Data Collection Campaign	Citi Map	9/7/2023	All Day	All over London	Citizen Science	To contribute to an open dataset of poo, rubbish, and puddles, click below!	https://citimap.org/`;

export default async function eventData() {
  const dataObject = await fetchData();
  if (dataObject.length === 0) {
    return getHardData();
  }
  return dataObject;
}
export function getHardData() {
  return objectifyTsv(hardData);
}
