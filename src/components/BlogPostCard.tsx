'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article
      style={{
        background: 'var(--color-surface)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Category & Read Time */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px',
          }}
        >
          <span
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-btn-primary-text)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: 'var(--color-text)',
            lineHeight: '1.4',
          }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
            lineHeight: '1.6',
            flex: 1,
          }}
        >
          {post.description}
        </p>

        {/* Date */}
        <time
          dateTime={post.date}
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
          }}
        >
          {new Date(post.date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-primary)',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'gap 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.gap = '12px')}
          onMouseOut={(e) => (e.currentTarget.style.gap = '8px')}
        >
          Leer artículo
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;
