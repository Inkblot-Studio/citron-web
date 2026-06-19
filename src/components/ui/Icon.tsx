import {
  Users,
  TrendingUp,
  Megaphone,
  Target,
  Workflow,
  ListChecks,
  MessagesSquare,
  CalendarClock,
  ReceiptText,
  Landmark,
  BarChart3,
  Bot,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Megaphone,
  Target,
  Workflow,
  ListChecks,
  MessagesSquare,
  CalendarClock,
  ReceiptText,
  Landmark,
  BarChart3,
  Bot,
  Sparkles,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
