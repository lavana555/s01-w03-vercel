import { BlogTypes } from "./blog-types";
import { db } from "./db";

export const blogsRepository = {
    async create(input: Omit<BlogTypes, 'id'>): Promise<{ error?: string; blog?: BlogTypes }> {
        const newBlog: BlogTypes = {
            ...input,
            id: Math.floor(Date.now() + Math.random() * 1000).toString(),
        };
        try {
            db.blogs.push(newBlog);
            const createdBlog = await this.find(newBlog.id);
            return { ...createdBlog };
        } catch (e) {
            return { error: 'Error creating blog' };
        }
    },

    async find(blogId: string): Promise<BlogTypes | null> {
        return db.blogs.find(({ id }) => id === blogId) || null;
    },

    async findIndex(blogId: string): Promise<number> {
        return db.blogs.findIndex(({ id }) => id === blogId);
    },

    async update(id: string, updates: Omit<BlogTypes, 'id'>): Promise<{ success: boolean; error?: string }> {
        const index = await this.findIndex(id);
        if (index !== -1) {
            db.blogs[index] = {
                ...db.blogs[index],
                ...updates,
            };
            return { success: true };
        }
        return { success: false, error: "Blog not found" };
    },

    async delete(blogId: string): Promise<{ success: boolean; error?: string }> {
        const blogIndex = await this.findIndex(blogId);
        if (blogIndex !== -1) {
            db.blogs.splice(blogIndex, 1);
            return { success: true };
        }
        return { success: false, error: "Blog not found" };
    }
};
