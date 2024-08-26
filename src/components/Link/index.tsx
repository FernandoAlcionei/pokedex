import { cn } from "@/lib/utils";

type LinkProps = {
	label: string;
    href: string;
    className?: string;
};

const Link = ({ label, href, className }: LinkProps) => (
    <a href={href} className={cn('text-primary hover:underline', className)}>
        { label }
    </a>
);

export default Link;