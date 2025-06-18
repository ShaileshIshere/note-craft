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
    c.status(400);
    return c.json({
      message: 'Please fill in all required fields correctly'
    })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
    
    if(existingUser) {
      c.status(409);
      return c.json({
        message: "An account with this email already exists"
      });
    }

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
    console.error('Signup error:', e);
    c.status(500);
    return c.json({
      message: "Unable to create account. Please try again later"
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
    c.status(400);
    return c.json({
      message: 'Please provide valid email and password'
    })
  }

  try {
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!userByEmail) {
      c.status(401);
      return c.json({
        message: "No account found with this email address"
      });
    }

    if (userByEmail.password !== body.password) {
      c.status(401);
      return c.json({
        message: "Incorrect password. Please try again"
      });
    }

    const token = await sign({
      id: userByEmail.id
    }, c.env.JWT_SECRET);
    
    return c.json({
      JWT_token: token,
      name: userByEmail.name
    });
    
  } catch (e) {
    console.error('Signin error:', e);
    c.status(500);
    return c.json({
      message: "Unable to sign in. Please try again later"
    });
  }
})

userRoutes.get('/count', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const count = await prisma.user.count();
    return c.json({ count });
  } catch (error) {
    console.error('Error getting users count:', error);
    c.status(500);
    return c.json({
      error: 'Failed to get users count' 
    });
  }
})

export default userRoutes