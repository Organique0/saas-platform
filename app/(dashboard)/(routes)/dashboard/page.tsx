import { UserButton } from "@clerk/nextjs";


export default function DashboardPage() {
    return (
        <div>
            <p>dashboard page</p>
            <UserButton afterSignOutUrl="/" />
        </div>

    )
}