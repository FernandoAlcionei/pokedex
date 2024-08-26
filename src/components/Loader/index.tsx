import { Loader2 } from "lucide-react";

const Loader = () => (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000042] flex items-center justify-center">
        <Loader2 color='#FFF' className="mr-2 h-14 w-14 animate-spin" />
    </div>
);

export default Loader;