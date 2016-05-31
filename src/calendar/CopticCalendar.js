"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Astro_1 = require('../Astro');
var Const_1 = require('../Const');
var Calendar_1 = require('../Calendar');
var CopticCalendar = (function (_super) {
    __extends(CopticCalendar, _super);
    function CopticCalendar(jdn, year, month, day) {
        _super.call(this, jdn, year, month, day, CopticCalendar.isLeapYear(year));
    }
    CopticCalendar.isLeapYear = function (year) {
        return Astro_1.mod(year, 4) === 3;
    };
    CopticCalendar.toJdn = function (year, month, day) {
        this.validate(year, month, day);
        return Const_1.coptic.EPOCH - 1 + 365 * (year - 1) +
            Math.floor(year / 4) + 30 * (month - 1) + day;
    };
    CopticCalendar.fromJdn = function (jdn) {
        var year = Math.floor((4 * (jdn - Const_1.coptic.EPOCH) + 1463) / 1461);
        var month = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);
        var day = jdn + 1 - this.toJdn(year, month, 1);
        return new CopticCalendar(jdn, year, month, day);
    };
    CopticCalendar.validate = function (year, month, day) {
        if (month < 1 || month > 13) {
            throw new Calendar_1.CalendarValidationException('Invalid month');
        }
        var days = this.isLeapYear(year) ? 6 : 5;
        if (month === 13 && day > days) {
            throw new Calendar_1.CalendarValidationException('Invalid day');
        }
        if (day < 1 || day > 30) {
            throw new Calendar_1.CalendarValidationException('Invalid day');
        }
    };
    return CopticCalendar;
}(Calendar_1.LeapCalendar));
exports.CopticCalendar = CopticCalendar;
