// Business details from the TIC Wireless Google Business Profile, store signage and business card.
export const PHONE = "(713) 339-9300";
export const TEL = "tel:+17133399300";
export const STREET = "3640 Hillcroft St";
export const CITY = "Houston, TX 77057";
export const ADDRESS = `${STREET}, ${CITY}`;
export const MAPS =
  "https://www.google.com/maps/place/TIC+Wireless/@29.7262272,-95.5014118,17z/data=!4m6!3m5!1s0x8640c3b44896128b:0x940a798f479d3bdf!8m2!3d29.7262272!4d-95.5014118!16s%2Fg%2F1tplqq2l";
export const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=TIC+Wireless&destination_place_id=ChIJixKWSLTDQIYR3zudR495CpQ";
export const FACEBOOK = "https://www.facebook.com/ticwireless";
export const RATING = 4.7;

// [open, close] in 24h Houston time; day 0 is Sunday.
export const hoursOn = (day: number): [number, number] => (day === 0 ? [9, 17] : [9, 20]);
export const HOURS = [
  ["Monday – Saturday", "9:00 AM – 8:00 PM"],
  ["Sunday", "9:00 AM – 5:00 PM"],
];
