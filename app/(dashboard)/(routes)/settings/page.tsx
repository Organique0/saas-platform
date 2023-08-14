import { Heading } from "@/components/Heading";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { Badge } from "@/components/ui/badge";
import { checkSubscription } from "@/lib/subscription";
import { LuSettings } from "react-icons/lu";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return (
        <div>
            <Heading title="Settings" description="Manage account settings" icon={LuSettings} iconColor="text-gray-700" bgColor="bg-gray-700/10" />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-md">
                    {isPro ?
                        <div>
                            You are currently on a
                            <Badge className="uppercase text-sm py-1 mx-2" variant="premium">
                                pro
                            </Badge>
                            plan
                        </div>

                        : "You are currently on a FREE plan"}

                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    );
}

export default SettingsPage;