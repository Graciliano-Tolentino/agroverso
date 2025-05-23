import React from 'react';

export default function BlogSection({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Publicado em: {post.date}</p>
        </div>
      ))}
    </div>
  );
}
