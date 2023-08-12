import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
interface HeadingProps {
    title: string;
    description: string;
    icon: IconType;
    iconColor?: string;
    bgColor?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description, icon: Icon, iconColor, bgColor }) => {
    return (
        <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
            <div className={cn("p-2 rounded-md w-fit", bgColor)}>
                <Icon className={cn("w-10 h-10", iconColor)} />
            </div>
            <div>
                <h2 className="text-3xl font-bold">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}