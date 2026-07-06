import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_REVALIDATE_SECRET;

const TYPE_TO_TAGS: Record<string, string[]> = {
  websitePage: ['websitePage'],
  siteSettings: ['siteSettings'],
  headerNavigation: ['headerNavigation'],
  footerNavigation: ['footerNavigation'],
};

export async function POST(req: NextRequest) {
  if (!secret) {
    return NextResponse.json({ message: 'Missing SANITY_REVALIDATE_SECRET' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? '';

  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const { _type, _id, slug } = JSON.parse(body) as {
    _type: string;
    _id: string;
    slug?: { current?: string };
  };

  const tags = TYPE_TO_TAGS[_type];

  if (!tags) {
    return NextResponse.json({ message: `Unknown type: ${_type}` }, { status: 200 });
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  // Revalidate the specific page cache entry if available
  if (_type === 'websitePage') {
    revalidateTag(`websitePage:${_id}`);
    if (slug?.current) {
      revalidateTag(`websitePage:slug:${slug.current}`);
    }
  }

  return NextResponse.json({ revalidated: true, tags });
}
