/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { useEffect, useState } from 'react';
import { Calendar } from '@tailrocks/framerock/ui/calendar';
import { defineStory } from '../../lib/story';
function CalendarExample({ month = 10 }: { month?: number }) {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, month, 5));
  useEffect(() => {
    setDate(new Date(2026, month, 5));
  }, [month]);
  return <Calendar mode="single" month={date} onMonthChange={setDate} selected={date} onSelect={setDate} className="rounded-md" />;
}
export const story = defineStory({ id: 'primitives/calendar', registryItem: 'ui-calendar', displayName: 'Calendar', Component: CalendarExample, frame: { height: 420 }, args: [{ variant: 'November', initial: { month: 10 } }, { variant: 'December', initial: { month: 11 } }] });
