import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from '../Form/TextInput';
import Link from '../Link';
import { Credentials } from '@/types/login.types';

type LoginFormProps = {
    onSubmit: (credentials: Credentials) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const t = useTranslations();

    const formSchema = z
        .object({
            username: z.string().min(1, { message: t('usernameIsRequired') }),
            password: z.string().min(1, { message: t('passwordIsRequired') }),
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
                    placeholder={t('enterUsername')}
                    name="username"
                    form={form}
                />

                <TextInput
                    type="password"
                    label={t('password')}
                    placeholder={t('enterPassword')}
                    name="password"
                    form={form}
                />

                <Link
                    className="text-sm"
                    href="javascript:void(0);"
                    label={t('forgotYourPassword')}
                />

                <Button type="submit">
                    {t('signIn')}
                </Button>

                <p className="text-gray-800 text-sm flex justify-center gap-1">
                    {t('dontHaveAnAccount')}
                    
                    <Link
                        href="javascript:void(0);"
                        label={t('registerHere')}
                    />
                </p>
            </form>
        </Form>
    );
}

export default LoginForm;