'use client';

import { subjects } from '@/constants';
import { removeKeysFromUrlQuery, formUrlQuery } from '@jsmastery/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubjectFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    if (!subject || subject === 'all') {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
      router.push(newUrl, { scroll: false });
      return;
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'subject',
      value: subject,
    });

    router.push(newUrl, { scroll: false });
  }, [subject, router, searchParams]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
