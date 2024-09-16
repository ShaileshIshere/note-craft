import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput, signinInput } from '@xlence/medium-blog'

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  };
}>();

userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success) {
    c.status(401);
    return c.json({
      error: 'Invalid request body'
    })
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });
  if(existingUser) {
    c.status(411);
    return c.json({
      message: "User already exists"
    });
  }
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })
  
    const token = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.json({
      JWT_token: token,
      name: user.name
    });
  } catch(e) {
    c.status(403);
    return c.json({
      error: "error while signing up"
    });
  }
})

userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success) {
    c.status(401);
    return c.json({
      error: 'Invalid request body'
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if(!user) {
      c.status(401);
      return c.json({
        message: "Invalid email or password"
      });
    }

    const token = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.json({
      JWT_token: token,
      name: user.name
    })
  } catch (e) {
    c.status(403);
    return c.json({
      error: "error while signing in"
    })
  }
})

export default userRoutes