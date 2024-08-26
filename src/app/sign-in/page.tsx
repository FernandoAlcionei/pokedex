"use client"

import LoginForm from '@/components/LoginForm';
import { useTranslations } from 'next-intl';

export default function SignIn() {
  const t = useTranslations();

  return (
    <div className="bg-gray-50 font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="p-8 rounded-2xl bg-white shadow max-w-md w-full">
        <h2 className="text-primary text-center text-2xl font-bold">
          { t('signIn') }
        </h2>

        <LoginForm />
      </div>
    </div>
  );
}
