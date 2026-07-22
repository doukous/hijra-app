import monthsJson from "@/data/months.json";
import eventsJson from "@/data/events.json";

export type EventType = "historic" | "observance";

export type MonthData = {
  number: number;
  slug: string;
  name: string;
  description: string;
};

export type EventData = {
  id: string;
  monthNumber: number;
  monthSlug: string;
  monthName: string;
  date: number | null;
  year: string | null;
  type: EventType;
  title: string;
  description: string;
};

type MonthsJson = Record<string, { slug: string; name: string; description: string }>;
type EventsJson = Record<
  string,
  {
    month: string;
    events: Record<
      string,
      {
        date: number | null;
        year: string | null;
        event_type: EventType;
        title: string;
        description: string;
      }
    >;
  }
>;

const MONTHS_RAW = monthsJson as MonthsJson;
const EVENTS_RAW = eventsJson as EventsJson;

export const MONTHS_DATA: MonthData[] = Object.entries(MONTHS_RAW)
  .sort(([a], [b]) => Number(a) - Number(b))
  .map(([num, m]) => ({
    number: Number(num),
    slug: m.slug,
    name: m.name,
    description: m.description,
  }));

const buildEventId = (monthSlug: string, index: string, date: number | null): string =>
  `${monthSlug}-${index}-${date ?? "none"}`;

const buildEvent = (
  monthNumber: number,
  monthSlug: string,
  monthName: string,
  index: string,
  raw: {
    date: number | null;
    year: string | null;
    event_type: EventType;
    title: string;
    description: string;
  }
): EventData => ({
  id: buildEventId(monthSlug, index, raw.date),
  monthNumber,
  monthSlug,
  monthName,
  date: raw.date,
  year: raw.year,
  type: raw.event_type,
  title: raw.title,
  description: raw.description,
});

export const EVENTS_DATA: EventData[] = Object.entries(EVENTS_RAW).flatMap(
  ([monthNum, monthBlock]) => {
    const month = MONTHS_DATA.find((m) => m.number === Number(monthNum));
    if (!month) return [];
    return Object.entries(monthBlock.events).map(([index, raw]) =>
      buildEvent(month.number, month.slug, month.name, index, raw)
    );
  }
);

const EVENTS_BY_ID: Record<string, EventData> = EVENTS_DATA.reduce(
  (acc, event) => {
    acc[event.id] = event;
    return acc;
  },
  {} as Record<string, EventData>
);

const MONTH_BY_NUMBER: Record<number, MonthData> = MONTHS_DATA.reduce(
  (acc, m) => {
    acc[m.number] = m;
    return acc;
  },
  {} as Record<number, MonthData>
);

export const getMonthByNumber = (n: number): MonthData | undefined => MONTH_BY_NUMBER[n];

export const getMonthName = (n: number): string =>
  getMonthByNumber(n)?.name ?? `Month ${n}`;

export const getMonthSlug = (n: number): string =>
  getMonthByNumber(n)?.slug ?? `month-${n}`;

export const getMonthDescription = (n: number): string | undefined =>
  getMonthByNumber(n)?.description;

export const getAllEventsForMonth = (n: number): EventData[] =>
  EVENTS_DATA.filter((e) => e.monthNumber === n);

export const getEventsForDay = (n: number, day: number): EventData[] =>
  EVENTS_DATA.filter((e) => e.monthNumber === n && e.date === day);

export const getEventById = (id: string): EventData | undefined => EVENTS_BY_ID[id];

export const getAllEventIds = (): string[] => EVENTS_DATA.map((e) => e.id);

export const getDaysWithEvents = (n: number): Set<number> => {
  const set = new Set<number>();
  for (const e of EVENTS_DATA) {
    if (e.monthNumber === n && e.date !== null) set.add(e.date);
  }
  return set;
};

export const EVENT_TYPE_COLORS: Record<
  EventType,
  { badge: string; text: string; dot: string; label: string }
> = {
  historic: {
    badge: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
    label: "Historic",
  },
  observance: {
    badge: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    label: "Observance",
  },
};
