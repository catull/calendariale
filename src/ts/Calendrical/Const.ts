// *Julian date of Gregorian epoch: 0000-01-01*
const J0000 = 1721424.5;

// *Julian date at Unix epoch: 1970-01-01*
const J1970 = 2440587.5;

// *Epoch of Modified Julian Date system*
const JMJD = 2400000.5;

// *Epoch (day 1) of Excel 1900 date system (PC)*
const J1900 = 2415020.5;

// *Epoch (day 0) of Excel 1904 date system (Mac)*
const J1904 = 2416480.5;

// *Gregorian date: 02000-01-01
const J2000 = 730120.5;

const ARYA_LUNAR_MONTH = 1577917500 / 53433336; // 29.5305818076,
const ARYA_LUNAR_DAY = ARYA_LUNAR_MONTH / 30; // 0.984352726919,
const ARYA_SOLAR_YEAR = 1577917500 / 4320000; // 365.258680556,
const ARYA_SOLAR_MONTH = ARYA_SOLAR_YEAR / 12; // 30.4382233796,

const MEAN_SIDEREAL_YEAR = 365.25636;
const MEAN_SYNODIC_MONTH = 29.530588861;
const MEAN_TROPICAL_YEAR = 365.242189;

enum Season {
  SPRING = 0,
  SUMMER = 90,
  AUTUMN = 180,
  WINTER = 270
}

enum Month {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12
}

const gregorian = {
  EPOCH: 1721425.5,
  EPOCH_RD: 730120.5,
  MONTHS: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
};

const julian = {
  EPOCH: 1721423.5,
  MONTHS: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
};

const hebrew = {
  EPOCH: 347995.5,
  MONTHS: [ 'Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul', 'Tishri', 'Marẖeshvan', 'Kislev', 'Teveth', 'Shevat', 'Adar', 'Veadar' ],
  H_MONTHS: [ 'נִיסָן', 'אייר', 'סיוון', 'תַּמּוּז', 'אָב', 'אֱלוּל', 'תִּשׁרִי', 'מרחשוון', 'כסליו', 'טֵבֵת', 'שְׁבָט', 'אֲדָר א׳', 'אֲדָר א׳' ]
};

const french = {
  EPOCH: 2375839.5,
  MOIS: [ 'Vendémiaire', 'Brumaire', 'Frimaire', 'Nivôse', 'Pluviôse', 'Ventôse', 'Germinal', 'Floréal', 'Prairial', 'Messidor', 'Thermidor', 'Fructidor', '(Sans-culottides)' ],
  DECADE: [ 'I', 'II', 'III' ],
  JOUR: [ 'du Primidi (1)', 'du Duodi (2)', 'du Tridi (3)', 'du Quartidi (4)', 'du Quintidi (5)', 'du Sextidi (6)', 'du Septidi (7)', 'du Octidi (8)', 'du Nonidi (9)', 'du Décadi (10)',
    '------------', 'de la Vertu (1)', 'du Génie (2)', 'du Travail (3)', 'de l\'Opinion (4)', 'des Récompenses (5)', 'de la Révolution (6)' ]
};

const islamic = {
  EPOCH: 1948439.5,
  WEEKDAYS: [ 'al-\'ahad', 'al-\'ithnayn', 'ath-thalatha\'', 'al-\'arb`a\'', 'al-khamis', 'al-jum`a', 'as-sabt' ],
  MONTHS: [ 'Muharram', 'Safar', 'Rabi`al-Awwal', 'Rabi`ath-Thani', 'Jumada l-Ula', 'Jumada t-Tania', 'Rajab', 'Sha`ban', 'Ramadan', 'Shawwal', 'Dhu l-Qa`da', 'Dhu l-Hijja' ]
};

const persian = {
  EPOCH: 1948320.5,
  EPOCH_RD: 226896,
  TEHRAN_LOCATION: [ 35.68, 51.42, 1100, 7 / 48 ],
  WEEKDAYS: [ 'Yekshanbeh', 'Doshanbeh', 'Seshhanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh' ],
  MONTHS: [ 'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand' ]
};

const mayan = {
  COUNT_EPOCH: 584282.5,
  HAAB_MONTHS: [ 'Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb' ],
  TZOLKIN_MONTHS: [ 'Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau' ]
};

const bahai = {
  EPOCH: 2394646.5,
  EPOCH172: 2457102.5,
  WEEKDAYS: [ 'Jamál', 'Kamál', 'Fidál', 'Idál', 'Istijlál', 'Istiqlál', 'Jalál' ],
  YEARS: [ 'Alif', 'Bá', 'Ab', 'Dál', 'Báb', 'Váv', 'Abad', 'Jád', 'Bahá', 'Hubb', 'Bahháj', 'Javáb', 'Ahad', 'Vahháb', 'Vidád', 'Badí', 'Bahí', 'Abhá', 'Vahíd' ],
  MONTHS: [ 'Bahá', 'Jalál', 'Jamál', '`Azamat', 'Núr', 'Rahmat', 'Kalimát', 'Kamál', 'Asmá', '`Izzat', 'Mashíyyat', '`Ilm', 'Qudrat', 'Qawl', 'Masáil', 'Sharaf', 'Sultán', 'Mulk', 'Ayyám-i-Há', '`Alá\'' ],
  DAYS: [ 'Bahá', 'Jalál', 'Jamál', '`Azamat', 'Núr', 'Rahmat', 'Kalimát', 'Kamál', 'Asmá', '`Izzat', 'Mashíyyat', '`Ilm', 'Qudrat', 'Qawl', 'Masáil', 'Sharaf', 'Sultán', 'Mulk', '`Alá\'' ]
};

const hindu = {
  EPOCH: 588465.5,
  EPOCH_RD: -1132959, // Julian 3102/02/18 BCE
  SIDEREAL_YEAR: 365 + 279457 / 1080000,
  CREATION: -714403429586.0, // EPOCH - 1955880000 * SIDEREAL_YEAR
  SIDEREAL_MONTH: 27 + 4644439 / 14438334,
  SYNODIC_MONTH: 29 + 7087771 / 13358334,
  ANOMALISTIC_YEAR: 1577917828000 / (4320000000 - 387),
  ANOMALISTIC_MONTH: 1577917828 / (57753336 - 488199),
  SOLAR_ERA: 3179,
  LUNAR_ERA: 3044,
  UJJAIN_LOCATION: [ 23.15, 75 + 461 / 600, 0, (5 + 461 / 9000) / 24 ],
  SIDEREAL_START: 336.13605090692613,
  WEEKDAYS: [ 'ravivara', 'somavara', 'mangalavara', 'budhavara', 'brahaspativara', 'sukravara', 'sanivara' ],
  MONTHS: [ 'Caitra', 'Vaisakha', 'Jyaistha', 'Asadha', 'Sravana', 'Bhadra', 'Asvina', 'Kartika', 'Agrahayana', 'Pausa', 'Magha', 'Phalguna' ]
};

const tibetan = {
  EPOCH: -46410 + 1721424.5, // 172/12/07 BCE (Gregorian)
  EPOCH_RD: -46410 // 172/12/07 BCE (Gregorian)
};

export { J0000, J1970, JMJD, J1900, J1904, J2000,
  ARYA_LUNAR_DAY, ARYA_LUNAR_MONTH, ARYA_SOLAR_YEAR, ARYA_SOLAR_MONTH,
  MEAN_SIDEREAL_YEAR, MEAN_SYNODIC_MONTH, MEAN_TROPICAL_YEAR, Month, Season,
  gregorian, julian, hebrew, french, islamic, persian, mayan, bahai, hindu, tibetan
}
