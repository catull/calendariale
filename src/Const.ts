import { Location } from './Location';

// *Days in Julian century*
const JULIAN_CENTURY = 36525;

// *Days in Julian millennium*
// const JULIAN_MILLENIUM = 365250;

// *Astronomical unit in kilometres*
// const ASTRONOMICAL_UNIT = 149597870.0;

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

// *Julian day of J2000 epoch*
// const J2000_JDN = 2451545.0;

const ARYA_LUNAR_MONTH: number = 1577917500 / 53433336; // 29.5305818076,
const ARYA_LUNAR_DAY: number = ARYA_LUNAR_MONTH / 30; // 0.984352726919,
const ARYA_SOLAR_YEAR: number = 1577917500 / 4320000; // 365.258680556,
const ARYA_SOLAR_MONTH: number = ARYA_SOLAR_YEAR / 12; // 30.4382233796,

const MEAN_SIDEREAL_YEAR = 365.25636;
const MEAN_SYNODIC_MONTH = 29.530588861;
const MEAN_TROPICAL_YEAR = 365.242189;

// *Mean solar tropical year*
const TROPICAL_YEAR = 365.24219878;

enum WeekDay {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

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

enum RomanEvent {
  KALENDS = 1,
  NONES = 2,
  IDES = 3
}

const armenian = {
  EPOCH: 1922867.5, // 522/07/11 Julian C.E.
  EPOCH_RD: 201443
};

const aztec = {
  CORRELATION: 2276827.5, // 1521/08/13 Julian C.E.
  CORRELATION_RD: 555404,
  TONALPOHUALLI_CORRELATION: 2276723.5,
  TONALPOHUALLI_CORRELATION_RD: 555300,
  XIHUITL_CORRELATION: 2276626.5,
  XIHUITL_CORRELATION_RD: 555203
};

const bahai  = {
  EPOCH: 2394646.5,    // 1844/03/21 Gregorian C.E.
  EPOCH172: 2457102.5, // 2015/03/21 Gregorian C.E.
  WEEKDAYS: [ 'Jamál', 'Kamál', 'Fidál', 'Idál', 'Istijlál', 'Istiqlál', 'Jalál' ],
  YEARS: [ 'Alif', 'Bá', 'Ab', 'Dál', 'Báb', 'Váv', 'Abad', 'Jád', 'Bahá', 'Hubb', 'Bahháj', 'Javáb', 'Ahad', 'Vahháb', 'Vidád', 'Badí', 'Bahí', 'Abhá', 'Vahíd' ],
  MONTHS: [ 'Bahá', 'Jalál', 'Jamál', '`Azamat', 'Núr', 'Rahmat', 'Kalimát', 'Kamál', 'Asmá', '`Izzat',
    'Mashíyyat', '`Ilm', 'Qudrat', 'Qawl', 'Masáil', 'Sharaf', 'Sultán', 'Mulk', 'Ayyám-i-Há', '`Alá\'' ],
  DAYS: [ 'Bahá', 'Jalál', 'Jamál', '`Azamat', 'Núr', 'Rahmat', 'Kalimát', 'Kamál', 'Asmá', '`Izzat',
    'Mashíyyat', '`Ilm', 'Qudrat', 'Qawl', 'Masáil', 'Sharaf', 'Sultán', 'Mulk', '`Alá\'' ]
};

const balinese = {
  EPOCH: 145.5, // 4713/05/26 Julian B.C.E.
  EPOCH_RD: -1721278
};

const chinese = {
  DAY_NAME_EPOCH: 1721468.5, // 00001/02/15 Julian C.E.
  DAY_NAME_EPOCH_RD: 45,
  EPOCH: 758324.5, // 2637/03/07 Julian B.C.E.
  EPOCH_RD: -963099,
  EPOCH_1929: 2425612.5,
  EPOCH_1929_RD: 704189,
  LOCATION_BEFORE_1929: new Location (479 / 12, 1397 / 12, 43.5, 1397 / 4320),
  LOCATION_SINCE_1929: new Location (479 / 12, 1397 / 12, 43.5, 1 / 3)
};

const coptic = {
  EPOCH: 1825029.5, // 284/08/29 Julian C.E.
  EPOCH_RD: 201443
};

const egyptian = {
  EPOCH: 1448637.5, // 747/02/26 Julian B.C.E.
  EPOCH_RD: -272787
};

const ethiopic = {
  EPOCH: 1724220.5, // 008/08/29 Julian C.E.
  EPOCH_RD: 2796
};

const french = {
  EPOCH: 2375839.5, // 1792/09/22 Gregorian C.E.
  EPOCH_RD: 654416,
  MOIS: [ 'Vendémiaire', 'Brumaire', 'Frimaire', 'Nivôse', 'Pluviôse', 'Ventôse', 'Germinal', 'Floréal', 'Prairial', 'Messidor', 'Thermidor', 'Fructidor', '(Sans-culottides)' ],
  DECADE: [ 'I', 'II', 'III' ],
  JOUR: [ 'du Primidi (1)', 'du Duodi (2)', 'du Tridi (3)', 'du Quartidi (4)', 'du Quintidi (5)',
    'du Sextidi (6)', 'du Septidi (7)', 'du Octidi (8)', 'du Nonidi (9)', 'du Décadi (10)',
  '------------', 'de la Vertu (1)', 'du Génie (2)', 'du Travail (3)', 'de l\'Opinion (4)', 'des Récompenses (5)', 'de la Révolution (6)' ]
};

const gregorian = {
  EPOCH: 1721425.5, // 001/01/03 Julian C.E.
  EPOCH_RD: 730120.5,
  MONTHS: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
};

enum HebrewMonth {
  NISAN = 1, IYYAR = 2, SIVAN = 3, TAMMUZ = 4, AV = 5, ELUL = 6, TISHRI = 7,
  MARHESHVAN = 8, KISLEV = 9, TEVETH = 10, SHEVAT = 11, ADAR = 12, VEADAR = 13
}

const hebrew = {
  EPOCH: 347995.5, // 3761/10/07 Julian B.C.E.
  EPOCH_RD: -1373428,
  MONTHS: [ 'Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul', 'Tishri', 'Marẖeshvan', 'Kislev', 'Teveth', 'Shevat', 'Adar', 'Veadar' ],
  H_MONTHS: [ 'נִיסָן', 'אייר', 'סיוון', 'תַּמּוּז', 'אָב', 'אֱלוּל', 'תִּשׁרִי', 'מרחשוון', 'כסליו', 'טֵבֵת', 'שְׁבָט', 'אֲדָר א׳', 'אֲדָר א׳' ],
  JAFFA_LOCATION: new Location (961 / 30, 139 / 4, 0, 1 / 12)
};

const hindu = {
  EPOCH: 588465.5, // 3102/02/18 Julian B.C.E.
  EPOCH_RD: -1132959,
  SIDEREAL_YEAR: 365 + 279457 / 1080000,
  CREATION: -714403429586.0, // EPOCH - 1955880000 * SIDEREAL_YEAR
  SIDEREAL_MONTH: 27 + 4644439 / 14438334,
  SYNODIC_MONTH: 29 + 7087771 / 13358334,
  ANOMALISTIC_YEAR: 1577917828000 / (4320000000 - 387),
  ANOMALISTIC_MONTH: 1577917828 / (57753336 - 488199),
  SOLAR_ERA: 3179,
  LUNAR_ERA: 3044,
  UJJAIN_LOCATION: new Location (23.15, 75 + 461 / 600, 0, (5 + 461 / 9000) / 24),
  SIDEREAL_START: 336.13605090692613,
  WEEKDAYS: [ 'ravivara', 'somavara', 'mangalavara', 'budhavara', 'brahaspativara', 'sukravara', 'sanivara' ],
  MONTHS: [ 'Caitra', 'Vaisakha', 'Jyaistha', 'Asadha', 'Sravana', 'Bhadra', 'Asvina', 'Kartika', 'Agrahayana', 'Pausa', 'Magha', 'Phalguna' ]
};

const islamic = {
  EPOCH: 1948439.5, // 622/07/16 Julian C.E.
  EPOCH_RD: 227015,
  WEEKDAYS: [ 'al-\'ahad', 'al-\'ithnayn', 'ath-thalatha\'', 'al-\'arb`a\'', 'al-khamis', 'al-jum`a', 'as-sabt' ],
  MONTHS: [ 'Muharram', 'Safar', 'Rabi`al-Awwal', 'Rabi`ath-Thani', 'Jumada l-Ula', 'Jumada t-Tania', 'Rajab', 'Sha`ban', 'Ramadan', 'Shawwal', 'Dhu l-Qa`da', 'Dhu l-Hijja' ],
  CAIRO_LOCATION: new Location (30.1, 31.3, 200, 1 / 12)
};

/*
const julian = {
  EPOCH: J0000, // 0001/01/01 Julian C.E.
  EPOCH_RD: 0,
  MONTHS: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
};
*/

const mayan = {
  EPOCH: 584282.5, // 3114/09/06 Julian B.C.E.
  EPOCH_RD: -1137141,
  HAAB_MONTHS: [ 'Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin',
    'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb' ],
  TZOLKIN_MONTHS: [ 'Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben',
    'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau' ]
};

const persian = {
  EPOCH: 1948320.5, // 622/03/19 Julian C.E.
  EPOCH_RD: 226896,
  TEHRAN_LOCATION: new Location (35.68, 51.42, 1100, 7 / 48),
  WEEKDAYS: [ 'Yekshanbeh', 'Doshanbeh', 'Seshhanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh' ],
  MONTHS: [ 'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand' ]
};

const tibetan = {
  EPOCH: 1675014.5, // 128/12/10 Julian B.C.E.
  EPOCH_RD: -46410
};

const yerm_ = {
  EPOCH: 1948379, // 622/05/16 12:00 Julian C.E.
  EPOCH_RD: 226955.5
};

enum MoonPhase {
  NEW = 0,
  FIRST_QUARTER = 90,
  FULL = 180,
  LAST_QUARTER = 270
}

export {
  ARYA_LUNAR_DAY,
  ARYA_LUNAR_MONTH,
  ARYA_SOLAR_MONTH,
  ARYA_SOLAR_YEAR,
  // ASTRONOMICAL_UNIT,
  HebrewMonth,
  J0000,
  J1900,
  J1904,
  J1970,
  J2000,
  // J2000_JDN,
  JMJD,
  JULIAN_CENTURY,
  // JULIAN_MILLENIUM,
  MEAN_SIDEREAL_YEAR,
  MEAN_SYNODIC_MONTH,
  MEAN_TROPICAL_YEAR,
  Month,
  MoonPhase,
  RomanEvent,
  Season,
  TROPICAL_YEAR,
  WeekDay,
  armenian,
  aztec,
  bahai,
  balinese,
  chinese,
  coptic,
  egyptian,
  ethiopic,
  french,
  gregorian,
  hebrew,
  hindu,
  islamic,
  // julian,
  mayan,
  persian,
  tibetan,
  yerm_
};
