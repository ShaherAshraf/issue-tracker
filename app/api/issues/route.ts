import authOptions from '@/app/auth/authOptions';
import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { $Enums, Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)!;
    const statusParam = url.searchParams.get('status');
    const status: Status | undefined = statusParam as Status | undefined;

    const count = await prisma.issue.count({
      where: {
        status,
      },
    });

    return NextResponse.json(count);
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
