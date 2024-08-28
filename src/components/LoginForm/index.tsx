import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from '../Form/TextInput';
import { Credentials } from '@/types/login.types';
import Link from 'next/link';

type LoginFormProps = {
    onSubmit: (credentials: Credentials) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const t = useTranslations();

    const formSchema = z
        .object({
            username: z.string().min(1, { message: t('username-is-required') }),
            password: z.string().min(1, { message: t('password-is-required') }),
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <TextInput
                    label={t('username')}
                    placeholder={t('enter-username')}
                    name="username"
                    form={form}
                />

                <TextInput
                    type="password"
                    label={t('password')}
                    placeholder={t('enter-password')}
                    name="password"
                    form={form}
                />

                <Link href="#" className="text-primary hover:underline">
                    {t('forgot-your-password')}
                </Link>

                <Button type="submit">
                    {t('sign-in')}
                </Button>

                <p className="text-gray-800 text-sm flex justify-center gap-1">
                    {t('dont-have-an-account')}

                    <Link href="#" className="text-primary hover:underline">
                        {t('register-here')}
                    </Link>
                </p>
            </form>
        </Form>
    );
}

export default LoginForm;