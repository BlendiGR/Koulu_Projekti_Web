import { useLang } from "/src/hooks/useLang";

const LangButton = ({color}) => {
  const { lang, setLang } = useLang();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className={`px-3 py-2 rounded-md border border-${color}`}
    >
      <option className="text-black" value="fi">
        FI
      </option>
      <option className="text-black" value="en">
        EN
      </option>
    </select>
  );
};

export default LangButton;
