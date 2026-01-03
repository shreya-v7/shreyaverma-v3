import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { blogs } from '../../data/blogs';
import { formatDate } from '../../utils';
import { SortOrder } from '../../types';

const SORT_BUTTON_CLASS = 'px-2 py-1 rounded-md transition-colors duration-300';
const ACTIVE_SORT_CLASS = 'bg-neutral-800 text-neutral-100';
const INACTIVE_SORT_CLASS = 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200';

export default function BlogList() {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const sortedBlogs = useMemo(() => {
    const filtered = blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return filtered.sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return sortOrder === 'latest' ? diff : -diff;
    });
  }, [searchQuery, sortOrder]);

  return (
    <section className="p-4 text-neutral-900 dark:text-neutral-100">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {(['latest', 'oldest'] as SortOrder[]).map(order => (
            <button key={order} onClick={() => setSortOrder(order)} className={`${SORT_BUTTON_CLASS} ${sortOrder === order ? ACTIVE_SORT_CLASS : INACTIVE_SORT_CLASS}`}>
              {order.charAt(0).toUpperCase() + order.slice(1)}
            </button>
          ))}
          <div className="flex items-center border-b border-neutral-400">
            <FiSearch className="w-5 h-5" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="outline-none pl-2 w-28 bg-transparent text-neutral-900 dark:text-neutral-100" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {sortedBlogs.slice(0, visibleBlogs).map((blog, index) => (
          <a key={index} href={blog.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-neutral-900">
            <div className="flex flex-col pr-4">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-700 mt-1 dark:text-neutral-200">{blog.description}</p>
              <p className="text-sm text-gray-500 mt-2">{formatDate(blog.date)} · {blog.author}</p>
              <div className="mt-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end mt-2">
              <button onClick={(e) => { e.preventDefault(); if (!likes[blog.title]) setLikes(prev => ({ ...prev, [blog.title]: true })); }} className={`text-lg ${likes[blog.title] ? 'text-red-500' : 'text-gray-400'}`}>
                {likes[blog.title] ? '❤️' : '🤍'}
              </button>
            </div>
          </a>
        ))}
        {visibleBlogs < sortedBlogs.length && (
          <div className="flex justify-center mt-4">
            <button onClick={() => setVisibleBlogs(prev => prev + 4)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Read More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
