import { Experience } from '@/components/experience/Experience';
import { PasswordGate } from '@/components/experience/PasswordGate';

export default function HomePage() {
  return (
    <PasswordGate>
      <Experience />
    </PasswordGate>
  );
}
