import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();
app.register(cors, { origin: ['http://localhost:3000'] });

app.get('/hello', async () => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app.listen({ port: 3000 });
