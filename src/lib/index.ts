import { m } from "./paraglide/messages"
import type { LanguageType } from "./types";

export const writeDays = (days: number, locale: string) => {
    if(days == 0) return m.day0({}, { locale: locale as LanguageType});
    else if(days == 1) return m.day1({}, { locale: locale as LanguageType});
    else if(days <= 4) return m.day234({}, { locale: locale as LanguageType});
    else return m.dayP({}, { locale: locale as LanguageType});
}

export const writeMinutes = (minutes: number, locale: string) => {
    if(minutes == 0) return m.minute0({}, { locale: locale as LanguageType});
    else if(minutes == 1) return m.minute1({}, { locale: locale as LanguageType});
    else if(minutes <= 4) return m.minute234({}, { locale: locale as LanguageType});
    else return m.minuteP({}, { locale: locale as LanguageType});
}

export const writeSeconds = (seconds: number, locale: string) => {
    if(seconds == 0) return m.second0({}, { locale: locale as LanguageType});
    else if(seconds == 1) return m.second1({}, { locale: locale as LanguageType});
    else if(seconds <= 4) return m.second234({}, { locale: locale as LanguageType});
    else return m.secondP({}, { locale: locale as LanguageType});
}

export const writeHours = (hours: number, locale: string) => {
    if(hours == 0) return m.hour0({}, { locale: locale as LanguageType});
    else if(hours == 1) return m.hour1({}, { locale: locale as LanguageType});
    else if(hours <= 4) return m.hour234({}, { locale: locale as LanguageType});
    else return m.hourP({}, { locale: locale as LanguageType});
}

export const writeMilliseconds = (milliseconds: number, locale: string) => {
    if(milliseconds == 0) return m.millisecond0({}, { locale: locale as LanguageType});
    else if(milliseconds == 1) return m.millisecond1({}, { locale: locale as LanguageType});
    else if(milliseconds <= 4) return m.millisecond234({}, { locale: locale as LanguageType});
    else return m.millisecondP({}, { locale: locale as LanguageType});
}