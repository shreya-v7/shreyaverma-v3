import React, { useState } from 'react';
import { blogs } from '../../data/blogs';
import { formatDate } from '../../utils';
import { SortOrder } from '../../types';

export default function BlogList() {
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const handleLike = (blogTitle: string) => {
    if (!likes[blogTitle]) {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [blogTitle]: true,
      }));
    }
  };

  const sortedBlogs = [...blogs]
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'latest'
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 4);
  };

  return (
    <section className="p-4 text-neutral-900 dark:text-neutral-100">
      {/* Header with Sorting Options and Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSortOrder('latest')}
            className={`px-2 py-1 rounded-md transition-colors duration-300 
              ${
                sortOrder === 'latest'
                  ? 'bg-neutral-800 text-neutral-100'
                  : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
              }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-2 py-1 rounded-md transition-colors duration-300 
              ${
                sortOrder === 'oldest'
                  ? 'bg-neutral-800 text-neutral-100'
                  : 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
              }`}
          >
            Oldest
          </button>
          {/* Search Bar */}
          <div className="flex items-center border-b border-neutral-400">
            <span className="material-icons cursor-pointer" style={{ fontSize: '20px' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none pl-2 w-28 bg-transparent text-neutral-900 dark:text-neutral-100"
            />
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {sortedBlogs.slice(0, visibleBlogs).map((blog, index) => (
          <a
            key={index}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-neutral-900"
          >
            {/* Blog Content */}
            <div className="flex flex-col pr-4">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-700 mt-1 dark:text-neutral-200">
                {blog.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(blog.date)} · {blog.author}
              </p>
              {/* Tags Display */}
              <div className="mt-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Like Button */}
            <div className="flex items-center justify-end mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(blog.title);
                }}
                className={`text-lg ${
                  likes[blog.title] ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {likes[blog.title] ? '❤️' : '🤍'}
              </button>
            </div>
          </a>
        ))}

        {/* Read More Button */}
        {visibleBlogs < sortedBlogs.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreBlogs}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Read More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
