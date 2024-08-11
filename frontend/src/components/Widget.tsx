interface WidgetProps {
    title: string;
    children: React.ReactNode;
}

const Widget : React.FC<WidgetProps> = ({title, children}) => {
    return(
        <div className="p-6 bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg max-w-md mx-auto space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="text-gray-500">{children}</div>
        </div>
    )
}

export default Widget;