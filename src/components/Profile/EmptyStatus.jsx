export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-16 h-16 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        لا توجد رسائل
      </h3>
      <p className="text-gray-500">شارك رابطك لاستقبال رسائل بصراحة!</p>
    </div>
  );
}
