export const options: Intl.DateTimeFormatOptions = {
  calendar: "islamic",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const todayDate = new Date();

export const monthInArabic = todayDate.toLocaleDateString("ar", {
  calendar: "islamic",
  month: "long",
});

export const todayDateInIslamicCalendar = todayDate.toLocaleDateString(
  "fr",
  options,
);

export class CustomDate {}
