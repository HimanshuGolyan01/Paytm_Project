export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" class=" w-30 text-white bg-blue-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}