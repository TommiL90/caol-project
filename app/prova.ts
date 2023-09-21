"use server"

import { prisma } from "@/lib/prisma";

export const test = async () => {
  return await prisma.cao_fatura.findMany();
};
