import { Location } from './Location'

// *Days in Julian century*
const JULIAN_CENTURY = 36525

// *Days in Julian millennium*
// const JULIAN_MILLENIUM = 365250;

// *Astronomical unit in kilometres*
// const ASTRONOMICAL_UNIT = 149597870.0;

// *Julian day number (JDN) of Gregorian epoch: 0000-01-01*
const J0000 = 1721424.5

// *Julian day number (JDN) at Unix epoch: 1970-01-01*
const J1970 = 2440587.5

// *Epoch of Modified Julian day number (JDN) system*
const JMJD = 2400000.5

// *Epoch (day 1) of Excel 1900 date system (PC)*
const J1900 = 2415020.5

// *Epoch (day 0) of Excel 1904 date system (Mac)*
const J1904 = 2416480.5

// *Gregorian date: 02000-01-01
const J2000 = 730120.5

// *Julian day number (JDN) of J2000 epoch*
// const J2000_JDN = 2451545.0;

const ARYA_LUNAR_MONTH: number = 1577917500 / 53433336 // 29.5305818076,
const ARYA_LUNAR_DAY: number = ARYA_LUNAR_MONTH / 30 // 0.984352726919,
const ARYA_SOLAR_YEAR: number = 1577917500 / 4320000 // 365.258680556,
const ARYA_SOLAR_MONTH: number = ARYA_SOLAR_YEAR / 12 // 30.4382233796,

const MEAN_SIDEREAL_YEAR = 365.25636
const MEAN_SYNODIC_MONTH = 29.530588861
const MEAN_TROPICAL_YEAR = 365.242189

// *Mean solar tropical year*
const TROPICAL_YEAR = 365.24219878

enum WeekDay {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

enum Season {
  SPRING = 0,
  SUMMER = 90,
  AUTUMN = 180,
  WINTER = 270,
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
  DECEMBER = 12,
}

enum RomanEvent {
  KALENDS = 1,
  NONES = 2,
  IDES = 3,
}

const akan = {
  EPOCH: 1721461.5, // 00001/02/08 Julian C.E.
  EPOCH_RD: 37,
  DELTA: 7.5 // == (EPOCH % 42)
}

const armenian = {
  EPOCH: 1922867.5, // 522/07/11 Julian C.E.
  EPOCH_RD: 201443
}

const aztec = {
  CORRELATION: 2276827.5, // 1521/08/13 Julian C.E.
  CORRELATION_RD: 555404,
  TONALPOHUALLI_CORRELATION: 2276723.5,
  TONALPOHUALLI_CORRELATION_RD: 555300,
  XIHUITL_CORRELATION: 2276626.5,
  XIHUITL_CORRELATION_RD: 555203
}

const babylonian = {
  EPOCH: 1607922.5, // 0311/04/03 Julian B.C.E.  /  -310/Apr/29 Gregorian
  EPOCH_RD: -113502,
  LOCATION_BABYLON: new Location(32.4794, 44.4328, 26, 7 / 48)
}

const bahai = {
  EPOCH: 2394646.5, // 1844/03/21 Gregorian C.E.
  EPOCH_RD: 673222,
  EPOCH172: 2457102.5, // 2015/03/21 Gregorian C.E.
  WEEKDAYS: ['Jamál', 'Kamál', 'Fidál', 'Idál', 'Istijlál', 'Istiqlál', 'Jalál'],
  YEARS: [
    'Alif',
    'Bá',
    'Ab',
    'Dál',
    'Báb',
    'Váv',
    'Abad',
    'Jád',
    'Bahá',
    'Hubb',
    'Bahháj',
    'Javáb',
    'Ahad',
    'Vahháb',
    'Vidád',
    'Badí',
    'Bahí',
    'Abhá',
    'Vahíd'
  ],
  MONTHS: [
    'Bahá',
    'Jalál',
    'Jamál',
    '`Azamat',
    'Núr',
    'Rahmat',
    'Kalimát',
    'Kamál',
    'Asmá',
    '`Izzat',
    'Mashíyyat',
    '`Ilm',
    'Qudrat',
    'Qawl',
    'Masáil',
    'Sharaf',
    'Sultán',
    'Mulk',
    'Ayyám-i-Há',
    "`Alá'"
  ],
  DAYS: [
    'Bahá',
    'Jalál',
    'Jamál',
    '`Azamat',
    'Núr',
    'Rahmat',
    'Kalimát',
    'Kamál',
    'Asmá',
    '`Izzat',
    'Mashíyyat',
    '`Ilm',
    'Qudrat',
    'Qawl',
    'Masáil',
    'Sharaf',
    'Sultán',
    'Mulk',
    "`Alá'"
  ],
  LOCATION_TEHRAN: new Location(35.696111, 51.423056, 1100, 7 / 48)
}

const balinese = {
  EPOCH: 145.5, // 4713/05/26 Julian B.C.E.
  EPOCH_RD: -1721278
}

const chinese = {
  DAY_NAME_EPOCH: 1721468.5, // 00001/02/15 Julian C.E.
  DAY_NAME_EPOCH_RD: 45,
  EPOCH: 758324.5, // 2637/03/08 Julian B.C.E.
  EPOCH_RD: -963099,
  EPOCH_1929: 2425612.5,
  EPOCH_1929_RD: 704189,
  LOCATION_BEFORE_1929: new Location(479 / 12, 1397 / 12, 43.5, 1397 / 4320),
  LOCATION_SINCE_1929: new Location(479 / 12, 1397 / 12, 43.5, 1 / 3)
}

const coptic = {
  EPOCH: 1825029.5, // 284/08/29 Julian C.E.
  EPOCH_RD: 201443
}

const egyptian = {
  EPOCH: 1448637.5, // 747/02/26 Julian B.C.E.
  EPOCH_RD: -272787
}

const ethiopic = {
  EPOCH: 1724220.5, // 008/08/29 Julian C.E.
  EPOCH_RD: 2796
}

const french = {
  EPOCH: 2375839.5, // 1792/09/22 Gregorian C.E.
  EPOCH_RD: 654416,
  MOIS: [
    'Vendémiaire',
    'Brumaire',
    'Frimaire',
    'Nivôse',
    'Pluviôse',
    'Ventôse',
    'Germinal',
    'Floréal',
    'Prairial',
    'Messidor',
    'Thermidor',
    'Fructidor',
    '(Sans-culottides)'
  ],
  DECADE: ['I', 'II', 'III'],
  JOUR: [
    'du Primidi (1)',
    'du Duodi (2)',
    'du Tridi (3)',
    'du Quartidi (4)',
    'du Quintidi (5)',
    'du Sextidi (6)',
    'du Septidi (7)',
    'du Octidi (8)',
    'du Nonidi (9)',
    'du Décadi (10)',
    '------------',
    'de la Vertu (1)',
    'du Génie (2)',
    'du Travail (3)',
    "de l'Opinion (4)",
    'des Récompenses (5)',
    'de la Révolution (6)'
  ]
}

const gregorian = {
  EPOCH: 1721425.5, // 001/01/03 Julian C.E.
  EPOCH_RD: 730120.5,
  MONTHS: [
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
    'December'
  ]
}

enum HebrewMonth {
  NISAN = 1,
  IYYAR = 2,
  SIVAN = 3,
  TAMMUZ = 4,
  AV = 5,
  ELUL = 6,
  TISHRI = 7,
  MARHESHVAN = 8,
  KISLEV = 9,
  TEVETH = 10,
  SHEVAT = 11,
  ADAR = 12,
  VEADAR = 13,
}

const hebrew = {
  EPOCH: 347995.5, // 3761/10/07 Julian B.C.E.
  EPOCH_RD: -1373428,
  MONTHS: [
    'Nisan',
    'Iyyar',
    'Sivan',
    'Tammuz',
    'Av',
    'Elul',
    'Tishri',
    'Marẖeshvan',
    'Kislev',
    'Teveth',
    'Shevat',
    'Adar',
    'Veadar'
  ],
  H_MONTHS: [
    'נִיסָן',
    'אייר',
    'סיוון',
    'תַּמּוּז',
    'אָב',
    'אֱלוּל',
    'תִּשׁרִי',
    'מרחשוון',
    'כסליו',
    'טֵבֵת',
    'שְׁבָט',
    'אֲדָר א׳',
    'אֲדָר א׳'
  ],
  LOCATION_JAFFA: new Location(961 / 30, 139 / 4, 0, 1 / 12)
}

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
  LOCATION_UJJAIN: new Location(23.15, 75 + 461 / 600, 0, (5 + 461 / 9000) / 24),
  SIDEREAL_START: 336.13605090692613,
  WEEKDAYS: ['ravivara', 'somavara', 'mangalavara', 'budhavara', 'brahaspativara', 'sukravara', 'sanivara'],
  MONTHS: [
    'Caitra',
    'Vaisakha',
    'Jyaistha',
    'Asadha',
    'Sravana',
    'Bhadra',
    'Asvina',
    'Kartika',
    'Agrahayana',
    'Pausa',
    'Magha',
    'Phalguna'
  ]
}

const icelandic = {
  EPOCH: 1721533.5, // 0001/04/21 Julian C.E.  /  0001-Apr-19 Gregorian A.D.
  EPOCH_RD: 109
}

const islamic = {
  EPOCH: 1948439.5, // 622/07/16 Julian C.E.
  EPOCH_RD: 227015,
  WEEKDAYS: ["al-'ahad", "al-'ithnayn", "ath-thalatha'", "al-'arb`a'", 'al-khamis', 'al-jum`a', 'as-sabt'],
  MONTHS: [
    'Muharram',
    'Safar',
    'Rabi`al-Awwal',
    'Rabi`ath-Thani',
    'Jumada l-Ula',
    'Jumada t-Tania',
    'Rajab',
    'Sha`ban',
    'Ramadan',
    'Shawwal',
    'Dhu l-Qa`da',
    'Dhu l-Hijja'
  ],
  LOCATION_CAIRO: new Location(30.1, 31.3, 200, 1 / 12),
  LOCATION_MECCA: new Location(6427 / 300, 11947 / 300, 298, 0.125)
}

const japanese = {
  EPOCH: 2410636.5, // 1888/01/01 Gregorian C.E.
  EPOCH_RD: 689213,
  LOCATION_BEFORE_1888: new Location(35.7, 139.766666, 24, 0.38824075),
  LOCATION_SINCE_1888: new Location(35, 135, 0, 0.375)
}

const julian = {
  EPOCH: J0000, // 0001/01/01 Julian C.E.
  EPOCH_RD: 0,
  MONTHS: [
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
    'December'
  ]
}

const korean = {
  EPOCH: 869359.5, // 2333/03/06 Julian B.C.E.
  EPOCH_RD: -852065,
  LOCATION_BEFORE_1904_04: new Location(37.566666, 126.96667, 0, 0.35268518),
  LOCATION_FROM_1904_04_TO_1911: new Location(37.566666, 126.96667, 0, 0.35416666),
  LOCATION_FROM_1954_04_TO_1961_08: new Location(37.566666, 126.96667, 0, 0.35416666),
  LOCATION_SEOUL: new Location(37.566666, 126.96667, 0, 0.375)
}

const mayan = {
  EPOCH: 584282.5, // 3114/09/06 Julian B.C.E.
  EPOCH_RD: -1137141,
  HAAB_MONTHS: [
    'Pop',
    'Uo',
    'Zip',
    'Zotz',
    'Tzec',
    'Xul',
    'Yaxkin',
    'Mol',
    'Chen',
    'Yax',
    'Zac',
    'Ceh',
    'Mac',
    'Kankin',
    'Muan',
    'Pax',
    'Kayab',
    'Cumku',
    'Uayeb'
  ],
  TZOLKIN_MONTHS: [
    'Imix',
    'Ik',
    'Akbal',
    'Kan',
    'Chicchan',
    'Cimi',
    'Manik',
    'Lamat',
    'Muluc',
    'Oc',
    'Chuen',
    'Eb',
    'Ben',
    'Ix',
    'Men',
    'Cib',
    'Caban',
    'Etznab',
    'Cauac',
    'Ahau'
  ]
}

const olympiad = {
  EPOCH: 1437989.5, // -0776/01/01 Julian B.C.E.
  EPOCH_JULIAN_YEAR: -776
}

const persian = {
  EPOCH: 1948320.5, // 622/03/19 Julian C.E.
  EPOCH_RD: 226896,
  LOCATION_TEHRAN: bahai.LOCATION_TEHRAN,
  WEEKDAYS: ['Yekshanbeh', 'Doshanbeh', 'Seshhanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh'],
  MONTHS: [
    'Farvardin',
    'Ordibehesht',
    'Khordad',
    'Tir',
    'Mordad',
    'Shahrivar',
    'Mehr',
    'Aban',
    'Azar',
    'Dey',
    'Bahman',
    'Esfand'
  ]
}

const samaritan = {
  EPOCH: 1122851.5, // 1639/03/15 Julian B.C.E.
  EPOCH_RD: -598573,
  LOCATION_SAMARITAN: new Location(32.1994, 35.2728, 881, 1 / 12)
}

const tibetan = {
  EPOCH: 1675014.5, // 128/12/10 Julian B.C.E.
  EPOCH_RD: -46410
}

const yermEpoch = {
  EPOCH: 1948379, // 622/05/16 12:00 Julian C.E.
  EPOCH_RD: 226955.5
}

const ROMAN_MONTH_MAX_DAYS: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

enum MoonPhase {
  NEW = 0,
  FIRST_QUARTER = 90,
  FULL = 180,
  LAST_QUARTER = 270,
}

const INVALID_DAY = 'Invalid day'
const INVALID_LEAP_DAY = 'Invalid leap day'
const INVALID_LEAP_MONTH = 'Invalid leap month'
const INVALID_MONTH = 'Invalid month'
const INVALID_VAHID = 'Invalid vahid'
const INVALID_WEEK = 'Invalid week'
const INVALID_YEAR = 'Invalid year'
const INVALID_YERM = 'Invalid yerm'

const INVALID_DECADI = 'Invalid decadi'
const INVALID_JOUR = 'Invalid jour'
const INVALID_MOIS = 'Invalid mois'

const INVALID_KIN = 'Invalid kin'
const INVALID_UINAL = 'Invalid uinal'
const INVALID_TUN = 'Invalid tun'
const INVALID_KATUN = 'Invalid katun'
const INVALID_BAKTUN = 'Invalid baktun'

const INVALID_COUNT = 'Invalid count'

const INVALID_SEASON = 'Invalid season'

export {
  ARYA_LUNAR_DAY,
  ARYA_LUNAR_MONTH,
  ARYA_SOLAR_MONTH,
  ARYA_SOLAR_YEAR,
  // ASTRONOMICAL_UNIT,
  HebrewMonth,
  INVALID_BAKTUN,
  INVALID_COUNT,
  INVALID_DAY,
  INVALID_DECADI,
  INVALID_JOUR,
  INVALID_KATUN,
  INVALID_KIN,
  INVALID_LEAP_DAY,
  INVALID_LEAP_MONTH,
  INVALID_MOIS,
  INVALID_MONTH,
  INVALID_SEASON,
  INVALID_TUN,
  INVALID_UINAL,
  INVALID_VAHID,
  INVALID_WEEK,
  INVALID_YEAR,
  INVALID_YERM,
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
  ROMAN_MONTH_MAX_DAYS,
  Season,
  TROPICAL_YEAR,
  WeekDay,
  akan,
  armenian,
  aztec,
  babylonian,
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
  icelandic,
  islamic,
  japanese,
  korean,
  julian,
  olympiad,
  mayan,
  persian,
  samaritan,
  tibetan,
  yermEpoch
}
