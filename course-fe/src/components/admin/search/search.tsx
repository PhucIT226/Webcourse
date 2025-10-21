import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../services/axiosClient";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios.get(`/admin/search?query=${encodeURIComponent(query)}`)
      .then(res => setResults(res.data))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Kết quả tìm kiếm: "{query}"</h1>
      {loading ? (
        <p>Đang tìm...</p>
      ) : results.length === 0 ? (
        <p>Không tìm thấy kết quả nào</p>
      ) : (
        <ul>
          {results.map((item, idx) => (
            <li key={idx} className="p-2 border-b hover:bg-gray-50 cursor-pointer">
              {item.type}: {item.name || item.title || item.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
