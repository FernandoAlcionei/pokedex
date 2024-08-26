"use client"

import Loader from '@/components/Loader';
import LoginForm from '@/components/LoginForm';
import { useLogin } from '@/hooks/login/useLogin';
import { Credentials } from '@/types/login.types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Login() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('');
  const { mutateAsync: login, isPending } = useLogin();
  const t = useTranslations();

  const onSubmit = (credentials: Credentials) => {
    login(credentials)
      .then(() => {
        router.push('/');
      }).catch((error) => {
        setErrorMsg(error.response?.data.message)
      })
  }

  return (
    <div className="bg-gray-50 font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="p-8 rounded-2xl bg-white shadow max-w-md w-full flex flex-col gap-6">
        <h2 className="text-primary text-center text-2xl font-bold">
          { t('signIn') }
        </h2>

        { errorMsg && (
          <span className="text-red-500">
            { errorMsg }
          </span>
        )}

        <LoginForm onSubmit={onSubmit} />

        { isPending && (
          <Loader />
        )}
      </div>
    </div>
  );
}
