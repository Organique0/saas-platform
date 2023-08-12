import Image from "next/image";

interface EmtpyProps {
    label: string;
}

export const Empty = ({ label }: EmtpyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center">
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    )
}