'use client';

import { CreateEmailForm } from './CreateEmailForm';
import { EmailList } from './EmailList';

export function EmailPanel() {
  return (
    <div className="space-y-6">
      <CreateEmailForm />
      <EmailList />
    </div>
  );
}