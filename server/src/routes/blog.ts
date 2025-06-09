import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from '@xlence/medium-blog' 

const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// Updated featured route with new fields
blogRoutes.get('/featured', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const recentPosts = await prisma.post.findMany({
            where: {
                published: true  // Only show published posts
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                publishedAt: 'desc' // Order by publish date, not create date
            },
            take: 10
        });

        if (recentPosts.length === 0) {
            return c.json({
                blogs: []
            });
        }

        const shuffled = recentPosts.sort(() => 0.5 - Math.random());
        const selectedPosts = shuffled.slice(0, Math.min(7, recentPosts.length));

        // Include all new fields
        const featuredBlogs = selectedPosts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || post.content.substring(0, 150) + '...',
            imageUrl: post.imageUrl,
            author: post.author,
            category: post.category,        // New field
            createdAt: post.createdAt,
            publishedAt: post.publishedAt,  // New field
            likes: post.likes               // New field
        }));

        return c.json({
            blogs: featuredBlogs
        });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error fetching featured posts" });
    }
});

// Auth middleware (same as before)
blogRoutes.use('/*', async (c, next) => {
    if (c.req.path.endsWith('/featured')) {
        await next();
        return;
    }

    const header = c.req.header("authorization") || "";
    if(!header) {
        c.status(401);
        return c.json({
            error: "unauthorized"
        });
    }

    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    
    try {
        if(user && typeof user.id === 'string') {
            c.set("userId", user.id);
            await next();
        }
        else {
            c.status(403);
            return c.json({
                error: "Unauthorized"
            });
        }
    } catch(error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

// Updated POST route with new fields
blogRoutes.post('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    
    const { success, error } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({
            error: "Invalid request",
            details: error
        });
    }
    
    const userId = c.get("userId");

    try {
        const imageUrl = body.imageUrl || "https://picsum.photos/800/400?random=" + Date.now();

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                excerpt: body.excerpt || body.content.substring(0, 150) + '...',
                imageUrl: imageUrl,
                category: body.category || "General",
                authorId: userId,
                published: body.published || false,
                publishedAt: body.published ? new Date() : null
            }
        });
        
        return c.json({
            id: blog.id,
            imageUrl: imageUrl,
            category: blog.category,
            publishedAt: blog.publishedAt,
            success: true
        });
    } catch (error) {
        console.error('Database error:', error);
        c.status(500);
        return c.json({
            error: "Failed to create blog post"
        });
    }
})

// Like a post
blogRoutes.post('/:id/like', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const id = c.req.param("id");
    const body = await c.req.json();
    const action = body.action; // 'like' or 'unlike'

    try {
        const post = await prisma.post.findUnique({
            where: { id: String(id) }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        let updatedPost;
        
        if (action === 'like') {
            // Increment likes
            updatedPost = await prisma.post.update({
                where: { id: String(id) },
                data: {
                    likes: {
                        increment: 1
                    }
                }
            });
        } else if (action === 'unlike') {
            // Decrement likes (but don't go below 0)
            updatedPost = await prisma.post.update({
                where: { id: String(id) },
                data: {
                    likes: Math.max(0, post.likes - 1)
                }
            });
        } else {
            c.status(400);
            return c.json({ error: "Invalid action. Use 'like' or 'unlike'" });
        }

        return c.json({ 
            success: true,
            likes: updatedPost.likes,
            action: action
        });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to update like" });
    }
});

// Updated PUT route with new fields
blogRoutes.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({
            error: "Invalid request"
        });
    }
    const userId = c.get("userId");

    // Check if this is being published for the first time
    const existingPost = await prisma.post.findUnique({
        where: { id: body.id },
        select: { published: true, publishedAt: true }
    });

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            excerpt: body.excerpt || body.content.substring(0, 150) + '...',
            imageUrl: body.imageUrl || null,
            category: body.category || "General",
            authorId: userId,
            published: body.published,
            publishedAt: body.published && !existingPost?.published ? new Date() : existingPost?.publishedAt
        }
    })
    return c.json({
        id: blog.id,
        publishedAt: blog.publishedAt
    })
})

// Updated bulk route with new fields
blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        where: {
            published: true
        },
        select: {
            title: true,
            content: true,
            excerpt: true,
            imageUrl: true,
            category: true,
            likes: true,
            publishedAt: true,
            author: {
                select: {
                    name: true
                }
            },
            id: true
        },
        orderBy: {
            publishedAt: 'desc'
        }
    });

    return c.json({
        blogs
    })
})

// Updated single blog route with new fields
blogRoutes.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: String(id)
            },
            select: {
                title: true,
                content: true,
                excerpt: true,
                imageUrl: true,
                category: true,
                likes: true,
                publishedAt: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                },
                id: true
            }
        })
        
        return c.json({
            blog
        })
    } catch (error) {
        c.status(500);
        return c.json({
            status: 'error',
        })
    }
})

export default blogRoutes