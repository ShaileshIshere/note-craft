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

blogRoutes.use('/*', async (c, next) => {
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

blogRoutes.post('/', async (c) => {
	const prisma = new PrismaClient({
	  datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	
	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if(!success) {
		c.status(400);
		return c.json({
			error: "Invalid request"
		});
	}
	const userId = c.get("userId");

	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	})
	return c.json({
		id: blog.id
	})
})

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

	const blog = await prisma.post.update({
		where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	})
	return c.json({
		id: blog.id
	})
})

blogRoutes.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
	  datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const blogs = await prisma.post.findMany({
        select: {
			title: true,
            content: true,
            author: {
				select: {
					name: true
                }
            },
			id: true
        }
    });

	return c.json({
		blogs
	})
})

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