import { useLang } from "/src/hooks/useLang.js";

/**
 * A responsive table component that displays as cards on mobile and a table on desktop
 * @param {Object} props
 * @param {Array} props.columns - Array of column configurations
 * @param {Object} props.data - Data object to display
 * @param {string} props.headerBgColor
 * @param {string} props.headerTextColor
 */
const ResponsiveTable = ({ columns, data, headerBgColor = "bg-beige", headerTextColor = "text-black" }) => {
  const { t } = useLang();

  const getValue = (column) => {
    const value = data[column.key];
    return column.formatter ? column.formatter(value) : value;
  };

  return (
    <div>
      <div className="block md:hidden bg-white rounded-lg p-4 space-y-3">
        {columns.map((column, index) => (
          <div 
            key={column.key} 
            className={`flex justify-between items-start ${index < columns.length - 1 ? 'border-b pb-2' : ''}`}
          >
            <span className="font-semibold text-sm">
              {column.translationKey ? t(column.translationKey) : column.label}
            </span>
            <span className={`text-sm ${column.alignRight ? 'text-right max-w-[60%]' : ''} ${column.highlight ? 'font-semibold' : ''}`}>
              {getValue(column)}
            </span>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className={`${headerBgColor} ${headerTextColor}`}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-sm font-semibold">
                  {column.translationKey ? t(column.translationKey) : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              {columns.map((column) => (
                <td 
                  key={column.key} 
                  className={`px-4 py-3 text-sm ${column.highlight ? 'font-semibold' : ''}`}
                >
                  {getValue(column)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
