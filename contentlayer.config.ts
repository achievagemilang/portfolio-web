import { defineDocumentType, makeSource } from 'contentlayer/source-files';

// Define a minimal Post document type
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

// Define a minimal Experience document type
export const Experience = defineDocumentType(() => ({
  name: 'Experience',
  filePathPattern: 'experiences/**/*.mdx',
  contentType: 'mdx',
  fields: {
    company: { type: 'string', required: true },
    position: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false },
    description: { type: 'string', required: true },
    achievements: { type: 'list', of: { type: 'string' }, default: [] },
  },
}));

// Create a minimal source configuration
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Experience],
});
