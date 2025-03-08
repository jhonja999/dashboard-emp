/**
 * Archivo: app/(routes)/tasks/components/Calendar.types.ts
 */

import { Company, Event } from "@prisma/client";

export type CalendarProps = {
  companies: Company[];
  events: Event[];
};
