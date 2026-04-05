const fs = require('fs');
const path = require('path');

const b = 'd:/Training Platform/atcms/src/app/(dashboard)';

const stubs = {
  admin: ['enrollments', 'revenue', 'analytics', 'settings'],
  trainer: ['courses', 'students', 'submissions', 'sessions', 'analytics'],
  student: ['assignments', 'progress'],
  mentor: ['students', 'sessions', 'feedback']
};

for (const [role, pages] of Object.entries(stubs)) {
  for (const p of pages) {
    const dir = path.join(b, role, p);
    fs.mkdirSync(dir, { recursive: true });
    
    const title = p.charAt(0).toUpperCase() + p.slice(1);
    const code = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const metadata = {
  title: "${title} | ATCMS",
};

export default function ${title}Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">${title}</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Manage your ${p} here.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Construction className="w-16 h-16 text-[var(--brand-400)] mb-6 opacity-80" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Under Construction</h2>
          <p className="text-[var(--text-secondary)] max-w-md text-center">
            This module is currently being built. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
`;
    fs.writeFileSync(path.join(dir, 'page.tsx'), code);
  }
}
