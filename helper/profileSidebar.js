export function SidebarItem({ label, tabName, activeTab, setActiveTab, icon }) {
  const isActive = activeTab === tabName;
  return (
    <li>
      <button
        onClick={() => setActiveTab(tabName)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-right text-sm font-medium transition-colors ${
          isActive
            ? "bg-green-100 text-green-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
}
