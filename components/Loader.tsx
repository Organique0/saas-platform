import { InfinitySpin } from "react-loader-spinner";

interface LoaderProps {
    color: string;
}

const Loader: React.FC<LoaderProps> = ({ color }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="relative">
                <InfinitySpin width="200" color={color} />
            </div>
        </div>
    );
}

export default Loader;